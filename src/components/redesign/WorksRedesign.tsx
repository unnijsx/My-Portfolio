import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface WorksRedesignProps {
    isColorful?: boolean;
}

export default function WorksRedesign({ isColorful }: WorksRedesignProps) {
    const [projects, setProjects] = useState<any[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetch("https://api.github.com/users/unnijsx/repos?sort=updated&per_page=10")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const valid = data.filter((repo: any) => repo.name !== "unnijsx" && !repo.fork).slice(0, 4);
                    const mapped = valid.map((repo: any, i: number) => ({
                        num: `0${i + 1}`,
                        title: repo.name.replace(/-/g, ' '),
                        category: repo.language || "Web Application",
                        tags: ["DEVELOPMENT", new Date(repo.updated_at).getFullYear().toString()],
                        image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
                        link: repo.html_url
                    }));
                    if(mapped.length > 0) {
                        setProjects(mapped);
                    }
                }
            })
            .catch(err => console.error("Error fetching repos:", err));
    }, []);

    const displayProjects = projects.length > 0 ? projects : [
        { num: "01", title: "Project Alpha", category: "Featured", tags: ["2026"], image: "", link: "#" },
        { num: "02", title: "Project Beta", category: "Featured", tags: ["2026"], image: "", link: "#" }
    ];

    return (
        <section id="works" className={`relative transition-colors duration-1000 ${isColorful ? 'bg-transparent' : 'bg-[#0E0E0E]'} text-[#E5E5E0] py-32 px-6 md:px-12 selection:bg-white selection:text-black min-h-screen z-10`}>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className={`border-b transition-colors duration-500 ${isColorful ? 'border-cyan-500/20' : 'border-white/10'} pb-8 mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10`}
            >
                <div className="max-w-[90vw]">
                    <h2 className="text-[12vw] sm:text-[10vw] leading-none font-black tracking-[-0.04em] uppercase">
                        SELECTED WORKS
                    </h2>
                    <p className={`font-mono text-[10px] md:text-sm tracking-widest mt-4 uppercase ${isColorful ? 'text-cyan-400/40' : 'text-[#E5E5E0]/40'}`}>Fetched dynamically from GitHub API</p>
                </div>
                <div className="flex gap-8 md:gap-12 text-sm md:text-base mb-2 max-w-sm">
                    <span className={`font-bold tracking-widest uppercase text-[10px] hidden sm:block ${isColorful ? 'text-purple-400/40' : 'text-[#E5E5E0]/40'}`}>(PROJECTS)</span>
                    <p className={`font-medium leading-relaxed transition-colors ${isColorful ? 'text-white/70' : 'opacity-70'}`}>
                        Thoughtfully crafted digital experiences that blend utility and aesthetics.
                    </p>
                </div>
            </motion.div>

            {/* Use items-start to allow the sidebar to independently stretch while staying pinned to the top of the grid row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative mt-16 md:mt-32 z-10">
                
                {/* Sticky Number Sidebar - self-stretch ensures it covers the full height of the projects column */}
                <aside className="md:col-span-4 hidden md:block self-stretch relative">
                    <div className="sticky top-[25vh] z-30 py-4 flex items-center justify-center pointer-events-none">
                        <div className={`relative h-[15vw] w-full flex items-center justify-center overflow-hidden font-black tracking-tighter select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[16vw] transition-colors duration-1000 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-400 to-purple-500' : 'text-white/80'}`}>
                            {(displayProjects[activeIndex]?.num || "01").split('').map((char: string, i: number) => (
                                <div key={i} className="relative h-full flex items-center overflow-hidden px-[0.5vw] min-w-[0.6em]">
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.span
                                            key={char}
                                            initial={{ opacity: 0, y: '80%' }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: '-80%' }}
                                            transition={{ 
                                                duration: 0.6, 
                                                ease: [0.16, 1, 0.3, 1],
                                                opacity: { duration: 0.2 }
                                            }}
                                            className="inline-block leading-none"
                                        >
                                            {char}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Content Column */}
                <div className="md:col-span-8 flex flex-col gap-[30vh] pb-[20vh] relative z-10">
                    {projects.length === 0 ? (
                        <div className="flex justify-center py-32 text-white/50 animate-pulse text-xl md:text-2xl font-bold tracking-widest uppercase text-center">Preparing Showcase...</div>
                    ) : (
                        projects.map((project, index) => (
                            <ProjectCard 
                                key={index} 
                                project={project} 
                                index={index}
                                onInView={() => setActiveIndex(index)} 
                                isColorful={isColorful}
                            />
                        ))
                    )}
                </div>

            </div>

        </section>
    );
}

function ProjectCard({ project, index, onInView, isColorful }: { project: any, index: number, onInView: () => void, isColorful?: boolean }) {
    const ref = useRef(null);
    // Detection margin: trigger when the project card enters the central horizontal band of the viewport
    const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-10%" }}
            className="flex flex-col gap-6 md:gap-8 relative z-20 group"
        >
            {/* Mobile Number Indicator */}
            <div className="md:hidden flex items-baseline gap-4 mb-2">
                 <h3 className={`text-7xl font-black tracking-tighter transition-colors duration-500 ${isColorful ? 'text-cyan-400/40' : 'text-[#E5E5E0]'}`}>
                    {project.num}
                </h3>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4">
                <div className="max-w-2xl w-full">
                    <p className={`font-mono text-[10px] md:text-sm tracking-widest mb-2 transition-colors ${isColorful ? 'text-purple-400/60' : 'text-[#E5E5E0]/60'}`}>{project.category}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" className={`group/link flex items-center gap-2 text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase transition-all overflow-wrap-anywhere break-words block leading-none ${isColorful ? 'text-white hover:text-cyan-400' : 'hover:text-white/60'}`}>
                        <span>{project.title}</span>
                        <svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="size-6 md:size-10 opacity-40 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform shrink-0"
                        >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className={`border rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase cursor-default transition-all duration-300 ${
                            isColorful ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-200' : 'border-[#E5E5E0]/20 bg-white/5'
                        }`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Project Image */}
            <a href={project.link} target="_blank" rel="noreferrer" className="w-full aspect-[16/10] sm:aspect-[2/1] bg-[#1a1a1a] rounded-2xl overflow-hidden relative border border-white/5 block shadow-2xl group/img">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover scale-[1.03] group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/img:bg-transparent transition-colors duration-1000 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                    <span className="px-8 py-3 bg-white text-black font-black uppercase tracking-tighter rounded-full text-sm">View Repository</span>
                </div>
            </a>
        </motion.div>
    );
}
