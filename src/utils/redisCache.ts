import { useState, useEffect, useCallback } from 'react';

export interface CacheEntry<T = any> {
    value: T;
    expiresAt: number | null; // Timestamp in milliseconds, or null if persistent
    persist: boolean;
}

export interface RedisMetrics {
    hits: number;
    misses: number;
    totalKeys: number;
    memoryUsageEstimate: number; // approximate size in bytes
}

const LOCAL_STORAGE_PREFIX = 'redis_cache:';

class RedisCacheClient {
    private cache = new Map<string, CacheEntry>();
    private hits = 0;
    private misses = 0;
    private cleanerInterval: any = null;

    constructor() {
        this.loadFromLocalStorage();
        this.startActiveExpirationCleaner();
    }

    private loadFromLocalStorage() {
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const lsKey = localStorage.key(i);
                if (lsKey && lsKey.startsWith(LOCAL_STORAGE_PREFIX)) {
                    const key = lsKey.substring(LOCAL_STORAGE_PREFIX.length);
                    const serialized = localStorage.getItem(lsKey);
                    if (serialized) {
                        const entry: CacheEntry = JSON.parse(serialized);
                        // If it has expired, don't load it
                        if (entry.expiresAt && entry.expiresAt < Date.now()) {
                            localStorage.removeItem(lsKey);
                        } else {
                            this.cache.set(key, entry);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('[RedisCache] Error loading from localStorage:', e);
        }
    }

    private startActiveExpirationCleaner() {
        if (typeof window !== 'undefined') {
            this.cleanerInterval = setInterval(() => {
                const now = Date.now();
                let hasEvicted = false;
                for (const [key, entry] of this.cache.entries()) {
                    if (entry.expiresAt && entry.expiresAt < now) {
                        this.cache.delete(key);
                        if (entry.persist) {
                            localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
                        }
                        this.notify(key, null);
                        hasEvicted = true;
                    }
                }
                if (hasEvicted) {
                    console.debug('[RedisCache] Active cleaner completed eviction sweep.');
                }
            }, 5000);
        }
    }

    private notify(key: string, value: any) {
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('redis-cache:update', {
                detail: { key, value }
            });
            window.dispatchEvent(event);
        }
    }

    public set<T = any>(key: string, value: T, ttlSeconds?: number, persist = true): void {
        const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
        const entry: CacheEntry<T> = { value, expiresAt, persist };
        
        this.cache.set(key, entry);

        if (persist) {
            try {
                localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(entry));
            } catch (e) {
                console.warn('[RedisCache] LocalStorage full or blocked. Writing only to memory.', e);
            }
        }

        this.notify(key, value);
    }

    public get<T = any>(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) {
            this.misses++;
            return null;
        }

        // Lazy eviction
        if (entry.expiresAt && entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            if (entry.persist) {
                localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
            }
            this.notify(key, null);
            this.misses++;
            return null;
        }

        this.hits++;
        return entry.value as T;
    }

    public del(key: string): boolean {
        const entry = this.cache.get(key);
        if (!entry) return false;

        this.cache.delete(key);
        if (entry.persist) {
            localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
        }

        this.notify(key, null);
        return true;
    }

    public exists(key: string): boolean {
        const entry = this.cache.get(key);
        if (!entry) return false;
        if (entry.expiresAt && entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            if (entry.persist) {
                localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
            }
            this.notify(key, null);
            return false;
        }
        return true;
    }

    public ttl(key: string): number {
        const entry = this.cache.get(key);
        if (!entry) return -2; // Key does not exist
        if (entry.expiresAt === null) return -1; // Persistent, no expiration
        
        const remaining = entry.expiresAt - Date.now();
        if (remaining <= 0) {
            this.cache.delete(key);
            if (entry.persist) {
                localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
            }
            this.notify(key, null);
            return -2;
        }
        return Math.ceil(remaining / 1000);
    }

    public expire(key: string, ttlSeconds: number): boolean {
        const entry = this.cache.get(key);
        if (!entry) return false;

        entry.expiresAt = Date.now() + ttlSeconds * 1000;
        this.cache.set(key, entry);

        if (entry.persist) {
            try {
                localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(entry));
            } catch (e) {
                console.warn('[RedisCache] LocalStorage set failed during expiration change.', e);
            }
        }

        this.notify(key, entry.value);
        return true;
    }

    public incr(key: string): number {
        const current = this.get<number>(key);
        const nextVal = (typeof current === 'number' ? current : 0) + 1;
        this.set(key, nextVal);
        return nextVal;
    }

    public keys(pattern = '*'): string[] {
        const allKeys = Array.from(this.cache.keys());
        if (pattern === '*' || pattern === '') {
            return allKeys;
        }

        // Simple wildcard parsing (e.g. "draft:*")
        const regexPattern = '^' + pattern.replace(/\*/g, '.*') + '$';
        const regex = new RegExp(regexPattern);
        return allKeys.filter(k => regex.test(k));
    }

    public flushall(): void {
        const keysToDelete = Array.from(this.cache.keys());
        this.cache.clear();

        try {
            const lsKeysToRemove: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const lsKey = localStorage.key(i);
                if (lsKey && lsKey.startsWith(LOCAL_STORAGE_PREFIX)) {
                    lsKeysToRemove.push(lsKey);
                }
            }
            lsKeysToRemove.forEach(k => localStorage.removeItem(k));
        } catch (e) {
            console.warn('[RedisCache] Error clearing localStorage:', e);
        }

        keysToDelete.forEach(k => this.notify(k, null));
    }

    public getMetrics(): RedisMetrics {
        let estimatedBytes = 0;
        for (const [k, v] of this.cache.entries()) {
            estimatedBytes += k.length * 2;
            try {
                estimatedBytes += JSON.stringify(v).length * 2;
            } catch {
                estimatedBytes += 50;
            }
        }

        return {
            hits: this.hits,
            misses: this.misses,
            totalKeys: this.cache.size,
            memoryUsageEstimate: estimatedBytes
        };
    }
}

// Instantiate global singleton
export const RedisCache = new RedisCacheClient();

/**
 * Custom React Hook to subscribe to a Redis key reactively.
 * Auto-syncs component state with Redis cache writes and evictions.
 */
export function useRedisValue<T>(
    key: string,
    initialValue: T,
    options?: { ttl?: number; persist?: boolean }
): [T, (val: T) => void] {
    const [state, setState] = useState<T>(() => {
        const cached = RedisCache.get<T>(key);
        if (cached !== null) {
            return cached;
        }
        // If not cached, initialize it
        RedisCache.set(key, initialValue, options?.ttl, options?.persist ?? true);
        return initialValue;
    });

    useEffect(() => {
        const handleCacheUpdate = (event: Event) => {
            const customEvent = event as CustomEvent<{ key: string; value: any }>;
            if (customEvent.detail.key === key) {
                setState(customEvent.detail.value !== null ? customEvent.detail.value : initialValue);
            }
        };

        window.addEventListener('redis-cache:update', handleCacheUpdate);
        
        // Pick up any external changes that happened before this mount
        const currentVal = RedisCache.get<T>(key);
        if (currentVal !== null && currentVal !== state) {
            setState(currentVal);
        }

        return () => {
            window.removeEventListener('redis-cache:update', handleCacheUpdate);
        };
    }, [key, initialValue, state]);

    const setRedisValue = useCallback((newValue: T) => {
        RedisCache.set(key, newValue, options?.ttl, options?.persist ?? true);
    }, [key, options?.ttl, options?.persist]);

    return [state, setRedisValue];
}
