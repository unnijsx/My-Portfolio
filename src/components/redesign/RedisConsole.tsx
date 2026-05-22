import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Trash2, Cpu, Key, Play, CornerDownLeft, Info, HelpCircle } from 'lucide-react';
import { RedisCache } from '../../utils/redisCache';

interface RedisConsoleProps {
    isColorful?: boolean;
}

interface CommandLog {
    input: string;
    output: string;
    type: 'success' | 'error' | 'info';
}

export default function RedisConsole({ isColorful }: RedisConsoleProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [keys, setKeys] = useState<string[]>([]);
    const [metrics, setMetrics] = useState(RedisCache.getMetrics());
    const [cliInput, setCliInput] = useState('');
    const [cliHistory, setCliHistory] = useState<CommandLog[]>([
        { input: 'SYSTEM INIT', output: 'Welcome to Client-Side Redis CLI v1.0.0. Type HELP for commands.', type: 'info' }
    ]);
    const [ttlState, setTtlState] = useState<Record<string, number>>({});
    
    const terminalEndRef = useRef<HTMLDivElement>(null);

    // Refresh keys list and metrics
    const refreshCacheData = () => {
        const allKeys = RedisCache.keys('*');
        setKeys(allKeys);
        setMetrics(RedisCache.getMetrics());

        // Update TTL countdown values
        const ttlMap: Record<string, number> = {};
        allKeys.forEach(k => {
            ttlMap[k] = RedisCache.ttl(k);
        });
        setTtlState(ttlMap);
    };

    // Keep TTL and keys refreshed every 1s
    useEffect(() => {
        refreshCacheData();
        const interval = setInterval(refreshCacheData, 1000);

        // Listen to cache updates to refresh instantly
        const handleUpdate = () => {
            refreshCacheData();
        };
        window.addEventListener('redis-cache:update', handleUpdate);

        return () => {
            clearInterval(interval);
            window.removeEventListener('redis-cache:update', handleUpdate);
        };
    }, []);

    // Auto scroll terminal log to bottom
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [cliHistory]);

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const commandText = cliInput.trim();
        if (!commandText) return;

        const parts = commandText.split(' ');
        const op = parts[0].toUpperCase();
        let output = '';
        let type: 'success' | 'error' | 'info' = 'success';

        switch (op) {
            case 'HELP':
                output = `Available Commands:
- PING : Verify Redis client availability.
- KEYS * : List all active keys in the database.
- GET [key] : Retrieve value of [key].
- SET [key] [val] [ttl_secs] : Create/overwrite key-value entry (TTL is optional).
- DEL [key] : Evict key-value entry immediately.
- TTL [key] : Get remaining lifetime of key in seconds.
- FLUSHALL : Wipe all memory entries & persistent stores.`;
                type = 'info';
                break;
            case 'PING':
                output = 'PONG';
                break;
            case 'KEYS':
                const pattern = parts[1] || '*';
                const matchedKeys = RedisCache.keys(pattern);
                output = matchedKeys.length > 0 
                    ? `Matching Keys:\n${matchedKeys.map((k, idx) => `  ${idx + 1}) "${k}"`).join('\n')}`
                    : '(empty list or set)';
                break;
            case 'GET':
                if (!parts[1]) {
                    output = '(error) ERR wrong number of arguments for "get" command';
                    type = 'error';
                } else {
                    const val = RedisCache.get(parts[1]);
                    output = val !== null ? JSON.stringify(val, null, 2) : '(nil)';
                }
                break;
            case 'SET':
                if (parts.length < 3) {
                    output = '(error) ERR wrong number of arguments for "set" command';
                    type = 'error';
                } else {
                    const key = parts[1];
                    let valStr = parts[2];
                    
                    // Handle values with spaces if wrapped in quotes, or merge remaining parts
                    let ttlVal: number | undefined;
                    const possibleTtl = parts[parts.length - 1];
                    
                    if (parts.length > 3 && !isNaN(Number(possibleTtl))) {
                        ttlVal = Number(possibleTtl);
                        valStr = parts.slice(2, parts.length - 1).join(' ');
                    } else if (parts.length > 3) {
                        valStr = parts.slice(2).join(' ');
                    }

                    // Try to parse json/numbers/booleans out of valStr
                    let parsedVal: any = valStr;
                    if (valStr === 'true') parsedVal = true;
                    else if (valStr === 'false') parsedVal = false;
                    else if (!isNaN(Number(valStr))) parsedVal = Number(valStr);
                    else {
                        // Strip wrapping quotes if any
                        if (valStr.startsWith('"') && valStr.endsWith('"')) parsedVal = valStr.substring(1, valStr.length - 1);
                        else if (valStr.startsWith("'") && valStr.endsWith("'")) parsedVal = valStr.substring(1, valStr.length - 1);
                    }

                    RedisCache.set(key, parsedVal, ttlVal);
                    output = ttlVal ? `OK (TTL: ${ttlVal}s)` : 'OK';
                }
                break;
            case 'DEL':
                if (!parts[1]) {
                    output = '(error) ERR wrong number of arguments for "del" command';
                    type = 'error';
                } else {
                    const ok = RedisCache.del(parts[1]);
                    output = ok ? '(integer) 1' : '(integer) 0';
                }
                break;
            case 'TTL':
                if (!parts[1]) {
                    output = '(error) ERR wrong number of arguments for "ttl" command';
                    type = 'error';
                } else {
                    const t = RedisCache.ttl(parts[1]);
                    output = `(integer) ${t}`;
                }
                break;
            case 'FLUSHALL':
                RedisCache.flushall();
                output = 'OK (Entire Client Memory Database Flushed)';
                break;
            default:
                output = `(error) ERR unknown command '${op}', type HELP for guides.`;
                type = 'error';
        }

        setCliHistory(prev => [...prev, { input: commandText, output, type }]);
        setCliInput('');
        refreshCacheData();
    };

    return (
        <>
            {/* Floating Terminal Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05, boxShadow: isColorful ? '0 0 20px rgba(6,182,212,0.4)' : '0 0 20px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className={`fixed bottom-6 left-6 z-[90] flex items-center gap-2 border px-4 py-3 rounded-full shadow-2xl font-mono text-xs font-black transition-all duration-300 pointer-events-auto backdrop-blur-md ${
                    isColorful 
                    ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400' 
                    : 'bg-[#18181A]/80 border-white/10 text-white'
                }`}
            >
                <Terminal size={14} className="animate-pulse" />
                <span>REDIS CONSOLE</span>
                {keys.length > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${isColorful ? 'bg-cyan-500 text-black' : 'bg-white text-black'}`}>
                        {keys.length}
                    </span>
                )}
            </motion.button>

            {/* Sidebar drawer UI */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end pointer-events-none">
                        {/* Dim backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* Slide Drawer panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`w-full max-w-lg md:max-w-xl h-full border-l flex flex-col font-mono relative pointer-events-auto shadow-[-20px_0_40px_rgba(0,0,0,0.8)] ${
                                isColorful ? 'bg-[#060608]/90 border-cyan-500/10' : 'bg-[#0F0F10]/95 border-white/5'
                            } text-white`}
                        >
                            {/* Drawer Header */}
                            <div className={`p-6 border-b flex justify-between items-center ${isColorful ? 'border-cyan-500/10' : 'border-white/5'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`size-3 rounded-full bg-green-500 animate-ping`} />
                                    <div>
                                        <h3 className="font-black text-sm tracking-widest uppercase">Redis Cache Console</h3>
                                        <p className="text-[10px] text-zinc-400">Reactive In-Memory Client Database</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Telemetry Stats Grid */}
                            <div className={`grid grid-cols-4 border-b ${isColorful ? 'border-cyan-500/10 bg-cyan-950/5' : 'border-white/5 bg-white/[0.01]'}`}>
                                <div className="p-4 border-r border-white/5 text-center">
                                    <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Total Keys</p>
                                    <p className={`text-lg font-black ${isColorful ? 'text-cyan-400' : 'text-white'}`}>{metrics.totalKeys}</p>
                                </div>
                                <div className="p-4 border-r border-white/5 text-center">
                                    <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Cache Size</p>
                                    <p className="text-lg font-black text-white">{metrics.memoryUsageEstimate} B</p>
                                </div>
                                <div className="p-4 border-r border-white/5 text-center">
                                    <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Hits</p>
                                    <p className="text-lg font-black text-green-400">{metrics.hits}</p>
                                </div>
                                <div className="p-4 text-center">
                                    <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Misses</p>
                                    <p className="text-lg font-black text-amber-500">{metrics.misses}</p>
                                </div>
                            </div>

                            {/* Active database keys preview */}
                            <div className="p-6 flex-grow flex flex-col gap-4 overflow-y-auto max-h-[40%] border-b border-white/5">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                                        <Key size={10} />
                                        <span>Active In-Memory Keys</span>
                                    </h4>
                                    {keys.length > 0 && (
                                        <button 
                                            onClick={() => {
                                                RedisCache.flushall();
                                                setCliHistory(prev => [...prev, { input: 'FLUSHALL', output: 'Wiped active keys.', type: 'info' }]);
                                            }}
                                            className="text-[9px] uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 size={10} />
                                            <span>FLUSH</span>
                                        </button>
                                    )}
                                </div>

                                {keys.length === 0 ? (
                                    <div className="flex-grow flex flex-col items-center justify-center border border-dashed border-white/5 rounded-2xl py-8 text-center text-zinc-600">
                                        <Cpu size={24} className="mb-2 opacity-25" />
                                        <p className="text-xs">Database is empty.</p>
                                        <p className="text-[9px] text-zinc-700 max-w-[200px] mt-1">Submit feedback, fill contact forms, or toggle theme mode to create keys.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                                        {keys.map(key => {
                                            const val = RedisCache.get(key);
                                            const ttl = ttlState[key];
                                            const valDisplay = typeof val === 'object' ? JSON.stringify(val) : String(val);
                                            
                                            return (
                                                <div 
                                                    key={key} 
                                                    className="flex items-center justify-between text-xs p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                                                >
                                                    <div className="flex flex-col min-w-0 max-w-[70%]">
                                                        <span className="font-bold text-zinc-300 truncate">{key}</span>
                                                        <span className="text-[10px] text-zinc-500 font-medium truncate">{valDisplay}</span>
                                                    </div>
                                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                                        ttl === -1 
                                                        ? 'bg-zinc-800 text-zinc-400' 
                                                        : 'bg-amber-500/10 text-amber-500'
                                                    }`}>
                                                        {ttl === -1 ? 'PERSIST' : `${ttl}s`}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* CLI Interactive Section */}
                            <div className="flex-grow flex flex-col max-h-[50%]">
                                <div className="px-6 py-4 bg-black/40 border-b border-white/5 flex justify-between items-center text-[10px] text-zinc-400">
                                    <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <Terminal size={10} />
                                        Interactive redis-cli
                                    </span>
                                    <span className="opacity-50">Type 'HELP' for instructions</span>
                                </div>

                                {/* Terminal Output History */}
                                <div className="flex-grow p-6 overflow-y-auto bg-black/20 text-xs font-mono space-y-4 max-h-[220px]">
                                    {cliHistory.map((log, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex gap-2 text-zinc-400">
                                                <span className="text-cyan-400">redis-cli&gt;</span>
                                                <span>{log.input}</span>
                                            </div>
                                            <div className={`whitespace-pre-wrap leading-relaxed ${
                                                log.type === 'error' ? 'text-red-400' :
                                                log.type === 'info' ? 'text-cyan-300' : 'text-green-400'
                                            }`}>
                                                {log.output}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={terminalEndRef} />
                                </div>

                                {/* Input console */}
                                <form 
                                    onSubmit={handleCommandSubmit}
                                    className="p-4 bg-black/60 border-t border-white/5 flex items-center gap-3"
                                >
                                    <span className="text-xs text-cyan-400 font-bold font-mono">redis&gt;</span>
                                    <input 
                                        type="text"
                                        value={cliInput}
                                        onChange={(e) => setCliInput(e.target.value)}
                                        placeholder="SET user:clicks 42..."
                                        className="flex-grow bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-zinc-700"
                                        autoFocus
                                    />
                                    <button 
                                        type="submit"
                                        className={`p-2 rounded-lg transition-colors bg-white/5 hover:bg-white/10 text-cyan-400`}
                                        aria-label="Submit command"
                                    >
                                        <CornerDownLeft size={14} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
