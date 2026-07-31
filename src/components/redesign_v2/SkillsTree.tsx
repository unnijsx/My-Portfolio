import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Server, Cpu, Terminal, Layers } from 'lucide-react';

interface SkillNode {
    id: string;
    name: string;
    level: string;
    description: string;
    icon: React.ReactNode;
    type: 'frontend' | 'backend' | 'database' | 'language' | 'other';
    deps: string[]; // dependent skill IDs
}

const SKILL_NODES: SkillNode[] = [
    // Languages
    { id: 'js', name: 'JavaScript / ES6', level: 'Expert', description: 'Core engine of my stack. Advanced asynchronous flow, closures, Event Loop architecture, and profiling.', icon: <Terminal size={18} />, type: 'language', deps: ['react', 'node'] },
    { id: 'ts', name: 'TypeScript', level: 'Advanced', description: 'Strict typing, generic interfaces, conditional types, and schema mapping for enterprise applications.', icon: <Terminal size={18} />, type: 'language', deps: ['react', 'node'] },
    { id: 'python', name: 'Python', level: 'Intermediate', description: 'Data structures, scripting, and backend automation using frameworks like Django.', icon: <Terminal size={18} />, type: 'language', deps: ['django'] },
    
    // Frontend
    { id: 'react', name: 'React.js', level: 'Expert', description: 'Virtual DOM optimization, custom React Hooks, context state management, and performance profiling.', icon: <Cpu size={18} />, type: 'frontend', deps: ['mui'] },
    { id: 'mui', name: 'Material UI (MUI)', level: 'Expert', description: 'Premium UI kit customizing, responsive themes, custom component palettes, and layouts.', icon: <Layers size={18} />, type: 'frontend', deps: [] },
    
    // Backend
    { id: 'node', name: 'Node.js', level: 'Expert', description: 'Event-driven, non-blocking I/O architectures, cluster/child processes, streams, and system scripting.', icon: <Server size={18} />, type: 'backend', deps: ['express'] },
    { id: 'express', name: 'Express.js', level: 'Expert', description: 'Custom middleware creation, controller design patterns, JWT encrypted authentication, and rate limiting.', icon: <Server size={18} />, type: 'backend', deps: [] },
    { id: 'django', name: 'Django', level: 'Intermediate', description: 'Python-based MVC web framework, ORM modeling, Django REST framework APIs, and secure administration panels.', icon: <Server size={18} />, type: 'backend', deps: [] },
    
    // Databases
    { id: 'mongodb', name: 'MongoDB', level: 'Expert', description: 'NoSQL aggregation pipelines, schema validation, index management, and cluster replication topologies.', icon: <Database size={18} />, type: 'database', deps: [] },
    { id: 'redis', name: 'Redis', level: 'Advanced', description: 'In-memory data structures, cache eviction policies, Pub/Sub channels, and session caching strategies.', icon: <Database size={18} />, type: 'database', deps: [] }
];

export default function SkillsTree() {
    const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_NODES[0]);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section id="skills" className="relative bg-[#0B0B0C] text-[#F4F4F5] py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-900">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* Header */}
                <div className="border-b border-zinc-900 pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase block mb-3">// SKILLSET TREE</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">
                            ENGINEERING <strong className="font-extrabold text-white">ARCHITECTURE</strong>
                        </h2>
                    </div>
                    <p className="max-w-md text-zinc-400 text-sm leading-relaxed">
                        An interactive dependency chart mapping the technologies I master. Click a node to view its structural breakdown and role.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Visual Dependency Tree (Left - 7 cols) */}
                    <div className="lg:col-span-7 bg-[#101012] border border-zinc-900 rounded-3xl p-6 md:p-8 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-4 left-6 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">MAP VIEW</span>
                        </div>

                        {/* Interactive Node Grid with Connections */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-12 relative z-10">
                            {SKILL_NODES.map((node) => {
                                const isSelected = selectedSkill.id === node.id;
                                const isHovered = hoveredSkill === node.id;
                                const isDepOfHovered = hoveredSkill ? SKILL_NODES.find(n => n.id === hoveredSkill)?.deps.includes(node.id) : false;

                                return (
                                    <motion.button
                                        key={node.id}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedSkill(node)}
                                        onMouseEnter={() => setHoveredSkill(node.id)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                        className={`relative p-5 rounded-2xl border text-left flex flex-col justify-between h-32 transition-all duration-300 ${
                                            isSelected 
                                            ? 'bg-zinc-900 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] text-white' 
                                            : isDepOfHovered
                                            ? 'bg-zinc-900 border-teal-500/30 text-teal-400'
                                            : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start w-full">
                                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-900 text-zinc-400'}`}>
                                                {node.icon}
                                            </div>
                                            <span className="text-[9px] font-mono text-zinc-500 uppercase">{node.type}</span>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold tracking-tight text-white uppercase">{node.name}</h4>
                                            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{node.level}</span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-zinc-900/60 pt-6 text-[10px] font-mono text-zinc-500">
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-amber-500" />
                                <span>SELECTED NODE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-teal-500" />
                                <span>CHILD DEPENDENCY</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-zinc-700" />
                                <span>STANDARD CONNECTOR</span>
                            </div>
                        </div>
                    </div>

                    {/* Node Details / Specifications Panel (Right - 5 cols) */}
                    <div className="lg:col-span-5 h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedSkill.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 h-full flex flex-col justify-between min-h-[450px]"
                            >
                                <div>
                                    <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-500">
                                                {selectedSkill.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold uppercase tracking-tight text-white">{selectedSkill.name}</h3>
                                                <span className="text-xs font-mono text-zinc-500 uppercase">{selectedSkill.type} specification</span>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-amber-500 tracking-wider uppercase font-mono">
                                            {selectedSkill.level}
                                        </span>
                                    </div>

                                    {/* Tech Description */}
                                    <div className="mt-8 space-y-6">
                                        <div>
                                            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">CAPABILITY & SCOPE</h5>
                                            <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                                                {selectedSkill.description}
                                            </p>
                                        </div>

                                        {/* Dependencies details */}
                                        {selectedSkill.deps.length > 0 && (
                                            <div>
                                                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">DOWNSTREAM INTEGRATION</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedSkill.deps.map((depId) => {
                                                        const depNode = SKILL_NODES.find(n => n.id === depId);
                                                        return depNode ? (
                                                            <span key={depId} className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                                                                <span className="size-1.5 rounded-full bg-teal-400" />
                                                                {depNode.name}
                                                            </span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Simulation terminal console representation */}
                                <div className="mt-12 p-4 bg-[#0B0B0C] border border-zinc-900 rounded-2xl font-mono text-[11px] text-zinc-400 space-y-1">
                                    <p className="text-zinc-600">// SIMULATED ENVIRONMENT IMPORT</p>
                                    <p><span className="text-amber-500">import</span> &#123; <span className="text-teal-400">{selectedSkill.name.split(' ')[0].toLowerCase()}</span> &#125; <span className="text-amber-500">from</span> <span className="text-green-500">'{selectedSkill.id}'</span>;</p>
                                    <p className="text-zinc-500">&gt; Status: Initialized successfully.</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
}
