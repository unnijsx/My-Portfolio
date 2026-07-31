import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Download, Database, Cpu, ShieldCheck } from 'lucide-react';
import profileImage from '../../assets/images/bgremovedmyimage.png';
// @ts-ignore
import resumeUrl from '../../assets/UNNNIKRISHNAN_V_P_MERNSTACK_RESUME.pdf?url';
import { saveAs } from 'file-saver';

export default function HeroV2() {
    const handleResumeDownload = () => {
        saveAs(resumeUrl, 'UNNIKRISHNAN_RESUME.pdf');
    };

    const { scrollY } = useScroll();
    
    // Parallax scrolling depth calculations
    const yText = useTransform(scrollY, [0, 500], [0, -80]);
    const yProfile = useTransform(scrollY, [0, 500], [0, -40]);

    // Entrance Animation Configs
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const profileVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 } 
        }
    };

    return (
        <section id="home" className="relative min-h-screen bg-[#0B0B0C] text-[#F4F4F5] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden select-none">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/10 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Content Container */}
            <div className="max-w-[1400px] mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
                
                {/* Left: Headline & Bio Info (7 columns) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ y: yText }}
                    className="lg:col-span-7 flex flex-col justify-center space-y-8"
                >
                    <motion.div variants={textVariants}>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-none uppercase">
                            CRAFTING <br />
                            <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                                SYSTEM ROBUSTNESS
                            </strong>
                        </h1>
                    </motion.div>

                    <motion.p 
                        variants={textVariants}
                        className="max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed font-normal"
                    >
                        I am Unnikrishnan V P, a Full Stack MERN Developer based in Kerala, India. 
                        I build resilient server architectures, high-performance web applications, and optimize operational database environments.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={textVariants} className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={handleResumeDownload}
                            className="flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-white/5"
                        >
                            <span>DOWNLOAD RESUME</span>
                            <Download size={14} />
                        </button>
                        
                        <a
                            href="#experience"
                            className="flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all duration-300"
                        >
                            <span>EXPLORE EXPERIENCE</span>
                            <ArrowDownRight size={14} />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right: Profile & Architectural Specs (5 columns) */}
                <motion.div 
                    variants={profileVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ y: yProfile }}
                    className="lg:col-span-5 flex flex-col gap-6 relative"
                >
                    
                    {/* Profile Box */}
                    <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950/40 p-4 aspect-[4/5] max-w-[360px] mx-auto w-full flex items-end justify-center shadow-2xl">
                        <img 
                            src={profileImage} 
                            alt="Unnikrishnan V P" 
                            className="w-full h-full object-contain filter grayscale contrast-110 select-none"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent" />
                        
                        
                    </div>

                    {/* Engineering Specs Block */}
                    <div className="grid grid-cols-3 gap-4 max-w-[360px] mx-auto w-full">
                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between h-28 shadow-xl">
                            <div className="p-2 rounded-lg bg-amber-500/5 text-amber-500 border border-amber-500/10 w-fit">
                                <Cpu size={14} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">ROBUST API</h4>
                                <span className="text-[8px] font-mono text-zinc-550 uppercase">EXPRESS & NODE</span>
                            </div>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between h-28 shadow-xl">
                            <div className="p-2 rounded-lg bg-teal-500/5 text-teal-400 border border-teal-500/10 w-fit">
                                <Database size={14} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">DATABASE</h4>
                                <span className="text-[8px] font-mono text-zinc-550 uppercase">NOSQL CLUSTERS</span>
                            </div>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between h-28 shadow-xl">
                            <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 w-fit">
                                <ShieldCheck size={14} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">SECURITY</h4>
                                <span className="text-[8px] font-mono text-zinc-550 uppercase">ENCRYPTED AUTH</span>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>

            {/* Bottom Scroller Indicator */}
            <div className="max-w-[1400px] mx-auto w-full pt-8 border-t border-zinc-900/60 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>SCROLL TO ARCHITECTURES</span>
                <div className="flex gap-4">
                    <a href="#skills" className="hover:text-white transition-colors">SKILLS</a>
                    <a href="#experience" className="hover:text-white transition-colors">EXPERIENCE</a>
                    <a href="#works" className="hover:text-white transition-colors">PROJECTS</a>
                </div>
            </div>
        </section>
    );
}
