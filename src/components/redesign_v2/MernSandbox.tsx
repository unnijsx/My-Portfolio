import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Database, ShieldAlert, Cpu, CheckCircle, Zap } from 'lucide-react';

interface LogEntry {
    text: string;
    type: 'info' | 'success' | 'warn' | 'error';
    time: string;
}

export default function MernSandbox() {
    const [cacheEnabled, setCacheEnabled] = useState(true);
    const [indexingEnabled, setIndexingEnabled] = useState(true);
    const [selectedQuery, setSelectedQuery] = useState<'findUser' | 'aggregateStats' | 'listPortfolios'>('findUser');
    const [isRunning, setIsRunning] = useState(false);
    const [latency, setLatency] = useState<number | null>(null);
    const [cacheHit, setCacheHit] = useState<boolean | null>(null);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // History of queries to show comparison
    const [history, setHistory] = useState<{ query: string; cache: boolean; index: boolean; latency: number }[]>([
        { query: 'findUser', cache: true, index: true, latency: 2 },
        { query: 'findUser', cache: false, index: false, latency: 310 }
    ]);

    const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error') => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        setLogs(prev => [...prev.slice(-8), { text, type, time }]);
    };

    const runQuerySimulation = () => {
        if (isRunning) return;
        setIsRunning(true);
        setLatency(null);
        setCacheHit(null);
        
        addLog(`Initiating HTTP request: GET /api/${selectedQuery === 'findUser' ? 'users/unni' : selectedQuery === 'aggregateStats' ? 'analytics/stats' : 'portfolios'}`, 'info');

        setTimeout(() => {
            // Step 1: Check Cache
            if (cacheEnabled) {
                addLog('Connecting to Redis Cache... [OK]', 'info');
                // Simulate random cache hit/miss for demonstration
                const isHit = Math.random() > 0.3;
                if (isHit) {
                    addLog('CACHE HIT: Data found in Redis memory store.', 'success');
                    setLatency(2);
                    setCacheHit(true);
                    setIsRunning(false);
                    setHistory(prev => [{ query: selectedQuery, cache: true, index: indexingEnabled, latency: 2 }, ...prev.slice(0, 4)]);
                    return;
                } else {
                    addLog('CACHE MISS: Key expired or not found. Routing request to MongoDB database cluster.', 'warn');
                    setCacheHit(false);
                }
            } else {
                addLog('Caching bypassed. Routing request directly to database.', 'warn');
            }

            // Step 2: Database fetch
            setTimeout(() => {
                addLog('Querying MongoDB collection...', 'info');
                let calculatedLatency = 0;
                
                if (indexingEnabled) {
                    addLog('INDEX SCAN: Utilizing compound index (ix_userId_status). Scan index keys: 1.', 'success');
                    calculatedLatency = Math.floor(Math.random() * 20) + 15; // 15-35ms
                } else {
                    addLog('COLLSCAN: Database performing full collection scan. Examined docs: 45,210.', 'error');
                    calculatedLatency = Math.floor(Math.random() * 80) + 260; // 260-340ms
                }

                // If cache miss but cache is enabled, write it to cache
                if (cacheEnabled) {
                    addLog('Writing query response back to Redis Cache... Key: user:unni (TTL: 3600s)', 'info');
                }

                setLatency(calculatedLatency);
                setIsRunning(false);
                setHistory(prev => [{ query: selectedQuery, cache: cacheEnabled, index: indexingEnabled, latency: calculatedLatency }, ...prev.slice(0, 4)]);
            }, 600);

        }, 400);
    };

    return (
        <section id="services" className="relative bg-[#0B0B0C] text-[#F4F4F5] py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-900">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="border-b border-zinc-900 pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase block mb-3">// MERN SANDBOX & PLAYGROUND</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">
                            SYSTEM <strong className="font-extrabold text-white">PLAYGROUND</strong>
                        </h2>
                    </div>
                    <p className="max-w-md text-zinc-400 text-sm leading-relaxed">
                        Experiment with system configurations. Enable Redis memory-caching and MongoDB indexes to observe how query latency changes in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Controls Panel (Left - 4 columns) */}
                    <div className="lg:col-span-4 bg-[#101012] border border-zinc-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">// CONTROL MODULES</h3>

                            {/* Query Selector */}
                            <div className="space-y-3 mb-8">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Select Database Operation</label>
                                <div className="space-y-2">
                                    {[
                                        { id: 'findUser', name: 'findUserById()' },
                                        { id: 'aggregateStats', name: 'aggregateJobStats()' },
                                        { id: 'listPortfolios', name: 'listPortfolios()' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSelectedQuery(opt.id as any)}
                                            className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-mono transition-colors ${
                                                selectedQuery === opt.id 
                                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                                                : 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                                            }`}
                                        >
                                            db.collection. {opt.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl">
                                    <div>
                                        <span className="text-xs font-bold text-white block uppercase tracking-tight">REDIS MEMORY CACHE</span>
                                        <span className="text-[10px] text-zinc-500 font-mono">Skip database lookup on hit</span>
                                    </div>
                                    <button
                                        onClick={() => setCacheEnabled(!cacheEnabled)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${cacheEnabled ? 'bg-amber-500' : 'bg-zinc-800'}`}
                                    >
                                        <div className={`size-4 rounded-full bg-zinc-950 transition-transform ${cacheEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl">
                                    <div>
                                        <span className="text-xs font-bold text-white block uppercase tracking-tight">MONGODB INDEXES</span>
                                        <span className="text-[10px] text-zinc-500 font-mono">Bypass collection scans</span>
                                    </div>
                                    <button
                                        onClick={() => setIndexingEnabled(!indexingEnabled)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${indexingEnabled ? 'bg-amber-500' : 'bg-zinc-800'}`}
                                    >
                                        <div className={`size-4 rounded-full bg-zinc-950 transition-transform ${indexingEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Fire Query Button */}
                        <button
                            onClick={runQuerySimulation}
                            disabled={isRunning}
                            className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                                isRunning 
                                ? 'bg-zinc-900 border border-zinc-850 text-zinc-600 cursor-not-allowed' 
                                : 'bg-white text-[#0B0B0C] hover:bg-zinc-200 shadow-lg shadow-white/5'
                            }`}
                        >
                            <Play size={12} className={isRunning ? '' : 'fill-black'} />
                            {isRunning ? 'EXECUTING PIPELINE...' : 'EXECUTE PIPELINE'}
                        </button>
                    </div>

                    {/* Console & Live Metrics Panel (Right - 8 columns) */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Live Console Output Terminal (7 cols) */}
                        <div className="md:col-span-7 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between min-h-[350px]">
                            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">// EXPRESS.JS SERVER SYSTEM LOG</span>
                                <span className="text-[10px] font-mono text-zinc-600">STDOUT</span>
                            </div>

                            <div className="flex-grow my-4 font-mono text-[11px] space-y-2 overflow-y-auto max-h-[220px] scrollbar-none">
                                {logs.length === 0 ? (
                                    <p className="text-zinc-600">// Ready. Toggle settings and press Execute Pipeline above to inspect query metrics.</p>
                                ) : (
                                    logs.map((log, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                            <span className="text-zinc-650 flex-shrink-0">[{log.time}]</span>
                                            <span className={`
                                                ${log.type === 'success' ? 'text-green-400' : ''}
                                                ${log.type === 'warn' ? 'text-amber-500' : ''}
                                                ${log.type === 'error' ? 'text-red-400 font-bold' : ''}
                                                ${log.type === 'info' ? 'text-zinc-300' : ''}
                                            `}>
                                                {log.text}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                                <span>PID: 4902</span>
                                <span>STATUS: LISTENING</span>
                            </div>
                        </div>

                        {/* Metric latency Widget (5 cols) */}
                        <div className="md:col-span-5 bg-[#101012] border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between min-h-[350px]">
                            <div>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-6">// RESOLUTION METRICS</span>
                                
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">LATENCY RESPONSE</span>
                                        <div className="flex items-baseline gap-1 mt-1">
                                            <span className="text-5xl font-extrabold text-white tracking-tight">
                                                {latency !== null ? latency : '--'}
                                            </span>
                                            <span className="text-sm font-mono text-zinc-500">ms</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">CACHE RESOLUTION</span>
                                        <span className={`text-xs font-mono font-bold mt-1.5 inline-block px-2.5 py-1 rounded ${
                                            cacheHit === true 
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                            : cacheHit === false 
                                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                            : 'bg-zinc-900 text-zinc-550 border border-zinc-800'
                                        }`}>
                                            {cacheHit === true ? 'HIT (REDIS)' : cacheHit === false ? 'MISS (DATABASE)' : 'STANDBY'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Mini historical list */}
                            <div className="border-t border-zinc-900/60 pt-4 mt-6">
                                <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-wider block mb-2">RUN HISTORY</span>
                                <div className="space-y-1.5">
                                    {history.map((hist, index) => (
                                        <div key={index} className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-zinc-400">{hist.query}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-zinc-600">
                                                    {hist.cache ? 'cache' : 'no-cache'} / {hist.index ? 'index' : 'scan'}
                                                </span>
                                                <span className={hist.latency < 5 ? 'text-green-400 font-bold' : hist.latency < 50 ? 'text-zinc-300' : 'text-red-400'}>
                                                    {hist.latency}ms
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
