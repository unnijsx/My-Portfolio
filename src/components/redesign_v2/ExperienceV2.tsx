import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, MapPin } from 'lucide-react';

interface Experience {
    period: string;
    role: string;
    company: string;
    location: string;
    type: 'work' | 'education' | 'project';
    bullets: string[];
}

const EXPERIENCES: Experience[] = [
    {
        period: 'APR 2025 - JUL 2026',
        role: 'MERN Stack Developer',
        company: 'Srishti Innovative',
        location: 'Trivandrum, Kerala',
        type: 'work',
        bullets: [
            'Architected and deployed full-stack business applications utilizing MongoDB, Express, React, and Node.js.',
            'Optimized data schema design and query execution plan layouts to reduce lookup latency.',
            'Refactored legacy application features into modern, responsive components with reusable React setups.',
            'Conducted reviews, established code guidelines, and provided technical guidance across systems.'
        ]
    },
    {
        period: '2021 - 2024',
        role: 'Bachelor of Computer Application',
        company: 'Kannur University',
        location: 'Kannur, Kerala',
        type: 'education',
        bullets: [
            'Graduated with core foundations in computing systems, relational databases, software design, and networking.',
            'Designed digital management systems and MVC setups as part of academic projects.'
        ]
    },
    {
        period: '2019 - 2021',
        role: 'Higher Secondary Education',
        company: 'Kerala Board of Higher Secondary Education',
        location: 'Kerala, India',
        type: 'education',
        bullets: [
            'Focused on computer science applications, physics, and core mathematics.',
            'Graduated with honors in technical subjects.'
        ]
    }
];

export default function ExperienceV2() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section id="experience" className="relative bg-[#0B0B0C] text-[#F4F4F5] py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-900">
            {/* Background glowing elements */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="border-b border-zinc-900 pb-8 mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase block mb-3">// PROFESSIONAL HISTORY</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">
                            EXPERIENCE & <strong className="font-extrabold text-white">EDUCATION</strong>
                        </h2>
                    </div>
                    <p className="max-w-md text-zinc-400 text-sm leading-relaxed">
                        A chronological timeline of my professional work, graduation credentials, and core learning landmarks.
                    </p>
                </div>

                {/* Timeline Grid */}
                <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-0 md:before:left-1/2 before:w-[1px] before:bg-zinc-800">
                    {EXPERIENCES.map((exp, idx) => {
                        const isEven = idx % 2 === 0;
                        const isHovered = hoveredIdx === idx;

                        return (
                            <div 
                                key={idx} 
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className={`relative flex flex-col md:flex-row items-stretch justify-between md:odd:flex-row-reverse transition-all duration-500`}
                            >
                                {/* Circle Node */}
                                <div className={`absolute left-[-4px] md:left-1/2 md:translate-x-[-50%] top-2 size-2.5 rounded-full border transition-all duration-300 ${
                                    isHovered ? 'bg-amber-500 border-amber-400 scale-125 shadow-[0_0_10px_rgba(245,158,11,0.6)]' : 'bg-zinc-900 border-zinc-700'
                                }`} />

                                {/* Year block */}
                                <div className={`w-full md:w-[45%] pl-8 md:pl-0 flex items-start ${isEven ? 'md:justify-end md:text-right md:pr-12' : 'md:justify-start md:pl-12'}`}>
                                    <div>
                                        <span className="text-sm font-mono text-amber-500 font-bold block mb-1">{exp.period}</span>
                                        <div className={`flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                            {exp.type === 'work' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                                            <span>{exp.type === 'work' ? 'WORK RECORD' : 'ACADEMIC'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content block */}
                                <div className={`w-full md:w-[45%] mt-4 md:mt-0 pl-8 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                                    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                                        isHovered 
                                        ? 'bg-zinc-900/60 border-zinc-800 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
                                        : 'bg-zinc-950/20 border-zinc-900/60'
                                    }`}>
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight">
                                                    {exp.role}
                                                </h3>
                                                <span className="text-xs text-zinc-400 font-medium mt-1 inline-block">
                                                    {exp.company}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 whitespace-nowrap bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
                                                <MapPin size={10} />
                                                {exp.location}
                                            </div>
                                        </div>

                                        <ul className="space-y-2">
                                            {exp.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} className="text-xs text-zinc-450 leading-relaxed font-normal flex items-start gap-2">
                                                    <span className="text-amber-500/80 font-mono mt-0.5">•</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
