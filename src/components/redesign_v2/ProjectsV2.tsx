import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Monitor, Smartphone, Globe, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

import renderblob from '../../assets/images/renderblob.png';
import rheox from '../../assets/images/rheoxdashboard.png';
import portfoliocreator from '../../assets/images/portfoliocreator.png';
import rheoxservices from '../../assets/images/rheoxservices.png';
import niranjanportfolio from '../../assets/images/niranjanportfolio.png';

interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    link: string;
    isInternal: boolean;
    stack: string[];
    role: string;
}

const PROJECTS: Project[] = [
    {
        title: "Portfolio Creator",
        category: "System Tool",
        description: "An advanced portfolio compiler platform featuring visual controls, real-time code rendering, and custom state export.",
        image: portfoliocreator,
        link: "/portfoliocreator",
        isInternal: true,
        stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        role: "Lead Full Stack Architect"
    },
    {
        title: "Rheox Dev Services",
        category: "Web Application",
        description: "Creative digital production platform managing developer portfolios, cloud integrations, and custom agency deliverables.",
        image: rheoxservices,
        link: "https://development.rheox.online/",
        isInternal: false,
        stack: ["React", "Node.js", "Express", "MongoDB", "Redis"],
        role: "Full Stack Engineer"
    },
    {
        title: "RenderBlob Portfolio",
        category: "Design Architecture",
        description: "Fluid design portfolio displaying experimental canvas render pipelines and bespoke CSS grid combinations.",
        image: renderblob,
        link: "https://renderblob-portfolio.vercel.app/",
        isInternal: false,
        stack: ["Vite", "React", "Canvas API", "Tailwind CSS"],
        role: "Frontend Designer"
    },
    {
        title: "Niranjan Portfolio",
        category: "Client System",
        description: "Bespoke personal portfolio with detailed architectural breakdowns and optimized page compilation.",
        image: niranjanportfolio,
        link: "https://niranjan.rheox.online/",
        isInternal: false,
        stack: ["MERN Stack", "Framer Motion", "Tailwind CSS"],
        role: "Full Stack Developer"
    },
    {
        title: "Rheox Dashboard",
        category: "Infrastructure Console",
        description: "Real-time command center managing Discord bots, system microservices, and server orchestration metrics.",
        image: rheox,
        link: "https://cloud.rheox.online/",
        isInternal: false,
        stack: ["React", "Express", "Discord API", "Chart.js"],
        role: "Backend Architect"
    }
];

export default function ProjectsV2() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const activeProject = PROJECTS[activeIndex];
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
        }, 5000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleSelectProject = (index: number) => {
        setActiveIndex(index);
        startTimer(); // Reset timer on click
    };

    return (
        <section id="works" className="relative bg-[#0B0B0C] text-[#F4F4F5] py-24 px-6 md:px-12 overflow-hidden border-t border-zinc-900">
            {/* Background Accent Gradient */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="border-b border-zinc-900 pb-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase block mb-3">// PORTFOLIO SHOWCASE</span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">
                            LIVE <strong className="font-extrabold text-white">ARCHITECTURES</strong>
                        </h2>
                    </div>
                    <p className="max-w-md text-zinc-400 text-sm leading-relaxed">
                        A curated showcase of live systems, builders, and dashboards designed, deployed, and currently running in production.
                    </p>
                </div>

                {/* Editorial Layout: Project List & Live Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Project Selector List (5 columns) */}
                    <div className="lg:col-span-5 space-y-4">
                        {PROJECTS.map((project, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={project.title}
                                    onClick={() => handleSelectProject(index)}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative group flex items-start justify-between ${
                                        isActive 
                                        ? 'bg-zinc-900 border-amber-500/30' 
                                        : 'bg-zinc-950/20 border-zinc-900/60 hover:bg-zinc-950 hover:border-zinc-800'
                                    }`}
                                >
                                    <div>
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                                            0{index + 1} — {project.category}
                                        </span>
                                        <h3 className={`text-xl font-bold tracking-tight uppercase transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                            {project.title}
                                        </h3>
                                        
                                        {/* Stack Preview on active item */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden mt-3"
                                                >
                                                    <p className="text-xs text-zinc-400 font-normal leading-relaxed mb-4">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {project.stack.map(tech => (
                                                            <span key={tech} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className={`p-2 rounded-xl border transition-all duration-300 ${
                                        isActive 
                                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                                        : 'bg-zinc-950 border-zinc-900 text-zinc-600 group-hover:text-zinc-400'
                                    }`}>
                                        <ArrowUpRight size={16} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Premium Dynamic Device Viewport Mockup (7 columns) */}
                    <div className="lg:col-span-7 bg-[#101012] border border-zinc-900 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-between min-h-[500px]">
                        {/* Device Controls */}
                        <div className="w-full flex justify-between items-center pb-4 border-b border-zinc-900">
                            <div className="flex items-center gap-2">
                                <span className="size-2.5 rounded-full bg-red-500/60" />
                                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                                <span className="size-2.5 rounded-full bg-green-500/60" />
                                <span className="text-[10px] font-mono text-zinc-500 ml-4 lowercase tracking-widest">
                                    {activeProject.isInternal 
                                        ? `https://unni.rheox.online${activeProject.link}` 
                                        : activeProject.link}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800/80">
                                <button
                                    onClick={() => setPreviewMode('desktop')}
                                    className={`p-1.5 rounded-lg transition-colors ${previewMode === 'desktop' ? 'bg-zinc-900 text-amber-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    aria-label="Desktop Preview"
                                >
                                    <Monitor size={14} />
                                </button>
                                <button
                                    onClick={() => setPreviewMode('mobile')}
                                    className={`p-1.5 rounded-lg transition-colors ${previewMode === 'mobile' ? 'bg-zinc-900 text-amber-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    aria-label="Mobile Preview"
                                >
                                    <Smartphone size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Interactive Viewport Frame */}
                        <div className="w-full flex-grow my-8 flex items-center justify-center relative min-h-[300px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeProject.title}-${previewMode}`}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl transition-all duration-500 ${
                                        previewMode === 'desktop' ? 'w-full aspect-[16/10]' : 'w-[260px] aspect-[9/18]'
                                    }`}
                                >
                                    <img
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    {/* Cover overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">ROLE</span>
                                        <h4 className="text-lg font-bold text-white uppercase">{activeProject.role}</h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Action buttons */}
                        <div className="w-full flex justify-between items-center pt-4 border-t border-zinc-900/60">
                            <div className="flex gap-2">
                                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                                    <Globe size={10} />
                                    SSL ENABLED
                                </span>
                                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                                    <Code size={10} />
                                    MERN
                                </span>
                            </div>

                            {activeProject.isInternal ? (
                                <Link
                                    to={activeProject.link}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-white/5"
                                >
                                    <span>OPEN BUILDER</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            ) : (
                                <a
                                    href={activeProject.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-white/5"
                                >
                                    <span>VISIT SYSTEM</span>
                                    <ArrowUpRight size={14} />
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
