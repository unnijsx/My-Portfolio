import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, GitBranch, GitPullRequest, Terminal, Eye } from 'lucide-react';

interface Commit {
    hash: string;
    branch: 'main' | 'education' | 'projects';
    title: string;
    date: string;
    author: string;
    details: string[];
    scope: string;
    additions: number;
    deletions: number;
}

const COMMITS: Commit[] = [
    {
        hash: 'b7c2a1e',
        branch: 'main',
        title: 'Develop Production Apps & Web Systems',
        date: 'Apr 2025 - Current',
        author: 'Srishti Innovative',
        details: [
            'Architected and built full stack production-grade applications using the MERN stack.',
            'Optimized server rendering pipelines, RESTful routing, and state integrations.',
            'Developed, tested, and maintained robust APIs and backend microservices.',
            'Provided technical support, structured code reviews, and architectural guidance.'
        ],
        scope: 'Srishti Innovative (MERN Stack Developer)',
        additions: 1240,
        deletions: 142
    },
    {
        hash: 'd4f9012',
        branch: 'education',
        title: 'Complete Bachelor of Computer Application (BCA)',
        date: '2021 - 2024',
        author: 'Kannur University',
        details: [
            'Acquired core computer science foundations in database management, networks, and algorithms.',
            'Developed web projects as part of the curriculum using modern frameworks.'
        ],
        scope: 'Kannur University (BCA Graduation)',
        additions: 840,
        deletions: 0
    },
    {
        hash: 'f6b219a',
        branch: 'projects',
        title: 'Launch Department Automation System',
        date: '2023',
        author: 'University Project',
        details: [
            'Built a secure, database-driven web application to digitalize department manual works.',
            'Utilized Django framework for robust MVC execution and secure access layers.'
        ],
        scope: 'Department Automation (Django)',
        additions: 450,
        deletions: 30
    },
    {
        hash: 'e8c5678',
        branch: 'projects',
        title: 'Deploy MERN Job Portal for Interns',
        date: '2024',
        author: 'Independent Project',
        details: [
            'Created a simple and efficient job discovery board for interns and job seekers.',
            'Engineered search indexing, authentication, and applications pipeline using Express and MongoDB.'
        ],
        scope: 'Job Portal Application (MERN)',
        additions: 620,
        deletions: 15
    },
    {
        hash: 'a1b2c3d',
        branch: 'education',
        title: 'Higher Secondary Education Complete',
        date: '2019 - 2021',
        author: 'Kerala Board of Education',
        details: [
            'Specialized in computer applications, mathematics, and physics subjects.',
            'Graduated with honors from the state educational board.'
        ],
        scope: 'Kerala Board of Higher Secondary Education',
        additions: 210,
        deletions: 0
    }
];

export default function GitTimeline() {
    const [selectedHash, setSelectedHash] = useState(COMMITS[0].hash);
    const selectedCommit = COMMITS.find(c => c.hash === selectedHash) || COMMITS[0];

    return (
        <section id="experience" className="relative bg-[#0B0B0C] text-[#F4F4F5] py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-900">
            {/* Background elements */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="border-b border-zinc-900 pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase block mb-3">// WORK TIMELINE</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">
                            GIT <strong className="font-extrabold text-white">REVISION LOG</strong>
                        </h2>
                    </div>
                    <p className="max-w-md text-zinc-400 text-sm leading-relaxed">
                        My career history structured as a revision timeline. Select nodes to inspect commits, diffs, and detailed logs.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Interactive Git Graph View (6 cols) */}
                    <div className="lg:col-span-6 bg-[#101012] border border-zinc-900 rounded-3xl p-6 md:p-8 min-h-[400px] relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-4 left-6 flex items-center gap-2">
                            <GitBranch size={12} className="text-amber-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">BRANCH LOG (git log --graph)</span>
                        </div>

                        {/* Interactive Revision Lines */}
                        <div className="space-y-6 my-10 relative pl-12 border-l border-zinc-900">
                            {COMMITS.map((commit, idx) => {
                                const isSelected = commit.hash === selectedHash;
                                return (
                                    <div 
                                        key={commit.hash} 
                                        onClick={() => setSelectedHash(commit.hash)}
                                        className="relative cursor-pointer group flex items-start justify-between"
                                    >
                                        {/* Commit node indicator */}
                                        <div className={`absolute -left-[58px] top-1.5 flex items-center justify-center size-5 rounded-full border transition-all duration-300 ${
                                            isSelected 
                                            ? 'bg-amber-500 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] scale-110' 
                                            : 'bg-zinc-950 border-zinc-800 group-hover:border-zinc-500'
                                        }`}>
                                            <GitCommit size={10} className={isSelected ? 'text-zinc-950' : 'text-zinc-500'} />
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase ${
                                                    commit.branch === 'main' 
                                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                                                    : commit.branch === 'education'
                                                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                                                    : 'bg-zinc-800 text-zinc-400'
                                                }`}>
                                                    {commit.branch}
                                                </span>
                                                <span className="text-[10px] font-mono text-zinc-500">{commit.date}</span>
                                            </div>
                                            <h4 className={`text-sm md:text-base font-bold uppercase tracking-tight mt-1 transition-colors ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                                {commit.title}
                                            </h4>
                                            <span className="text-[10px] font-mono text-zinc-500 mt-1 block">commit {commit.hash} — Author: {commit.author}</span>
                                        </div>

                                        <div className={`p-1.5 rounded-lg border transition-colors opacity-0 group-hover:opacity-100 ${
                                            isSelected ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' : 'border-zinc-800 text-zinc-500 bg-zinc-900/40'
                                        }`}>
                                            <Eye size={12} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Git Branch Info */}
                        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-6">
                            <span>* main branch</span>
                            <span>o education branch</span>
                            <span>+ project branches</span>
                        </div>
                    </div>

                    {/* Right: Commit Console Panel (6 cols) */}
                    <div className="lg:col-span-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCommit.hash}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                                className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 min-h-[400px] flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    {/* Commit Top Bar */}
                                    <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
                                        <div className="flex items-center gap-2">
                                            <Terminal size={14} className="text-zinc-600" />
                                            <span className="text-xs font-mono text-zinc-400">git show {selectedCommit.hash}</span>
                                        </div>
                                        <div className="flex gap-2 text-[10px] font-mono text-zinc-500">
                                            <span className="text-green-500">+{selectedCommit.additions} insertions</span>
                                            {selectedCommit.deletions > 0 && <span className="text-red-500">-{selectedCommit.deletions} deletions</span>}
                                        </div>
                                    </div>

                                    {/* Commit details */}
                                    <div className="font-mono text-xs text-zinc-300 space-y-4">
                                        <div>
                                            <p><span className="text-zinc-600">commit:</span> <span className="text-amber-500">{selectedCommit.hash}</span></p>
                                            <p><span className="text-zinc-600">Author:</span> {selectedCommit.author} &lt;unni@rheox.online&gt;</p>
                                            <p><span className="text-zinc-600">Date:</span> {selectedCommit.date}</p>
                                            <p><span className="text-zinc-600">Scope:</span> <span className="text-teal-400">{selectedCommit.scope}</span></p>
                                        </div>

                                        <div className="pt-4 border-t border-zinc-900/60">
                                            <p className="font-bold text-white mb-3 uppercase tracking-tight">// COMMIT MESSAGE:</p>
                                            <p className="text-zinc-200 leading-relaxed font-sans text-sm pl-4 border-l-2 border-amber-500/40">
                                                {selectedCommit.title}
                                            </p>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <p className="font-bold text-white mb-2 uppercase tracking-tight">// DETAILED SPECIFICATIONS:</p>
                                            <ul className="list-none space-y-2 pl-4">
                                                {selectedCommit.details.map((detail, dIdx) => (
                                                    <li key={dIdx} className="flex items-start gap-2 text-zinc-400 font-sans text-sm leading-relaxed">
                                                        <span className="text-green-500 font-mono mt-0.5">+</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Pull Request Status */}
                                <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-zinc-600">rev-control-suite v1.0.0</span>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-mono">
                                        <GitPullRequest size={10} />
                                        COMMITTED & VERIFIED
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
}
