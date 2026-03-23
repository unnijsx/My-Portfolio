import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';
import profileImage from '../../assets/images/bgremovedmyimage.png';
// @ts-ignore
import resumeUrl from '../../assets/UNNIKRISHNAN_RESUME.pdf?url';
import { saveAs } from 'file-saver';

interface HeroRedesignProps {
    isColorful?: boolean;
}

export default function HeroRedesign({ isColorful }: HeroRedesignProps) {
    const { scrollY } = useScroll();
    
    // Parallax values for depth
    const yText = useTransform(scrollY, [0, 500], [0, -100]);
    const yImg = useTransform(scrollY, [0, 500], [0, -50]);
    const scaleImg = useTransform(scrollY, [0, 500], [1, 1.1]);
    
    // Strict sequential delays
    const TEXT_DELAY = 0.1;
    const IMAGE_DELAY = 2.5; 
    const FINAL_ITEMS_DELAY = 4.0;

    const handleResumeDownload = () => {
        saveAs(resumeUrl, 'UNNIKRISHNAN_RESUME.pdf');
    };

    return (
        <section id="home" className="relative min-h-screen md:h-screen bg-[#E5E5E0] text-[#1c1c1c] overflow-hidden selection:bg-black selection:text-white flex flex-col items-center justify-between py-12 md:py-12 px-4 md:px-12">
            
            {/* Top Bar */}
            <motion.nav 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: FINAL_ITEMS_DELAY }}
                className="w-full flex flex-row justify-between items-start z-30 pt-8 md:pt-0"
            >
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">(Full Stack Developer)</span>
                    <span className="font-bold text-xs md:text-sm tracking-tight whitespace-nowrap">UNNIKRISHNAN V P</span>
                </div>
                <div className="flex flex-col items-end gap-1 mr-4 sm:mr-16 md:mr-32">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 whitespace-nowrap">(BASED IN)</span>
                    <span className="font-bold text-[9px] md:text-sm tracking-tight whitespace-nowrap">INDIA, KERALA</span>
                </div>
            </motion.nav>

            {/* Main Content Area - Stacked on mobile, Layered on desktop */}
            <div className="flex-1 w-full flex flex-col items-center justify-center relative md:static py-12 md:py-0">
                
                {/* Name Background Layer */}
                <motion.div 
                    style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? yText : 0 }}
                    className="md:absolute md:inset-0 flex items-center justify-center z-10 pointer-events-none mb-8 md:mb-0"
                >
                    <div className="overflow-visible flex items-center justify-center w-full px-4">
                        <motion.h1 
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: TEXT_DELAY }}
                            className="text-[11vw] sm:text-5xl md:text-[12vw] font-black tracking-[-0.06em] uppercase whitespace-nowrap leading-none transition-all duration-700 w-full text-center"
                        >
                            UNNIKRISHNAN
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Profile Image Layer */}
                <div className="relative md:absolute md:inset-0 flex items-end justify-center z-20 pointer-events-none md:overflow-hidden h-[40vh] md:h-full w-full">
                    <motion.div 
                        style={{ 
                            y: typeof window !== 'undefined' && window.innerWidth > 768 ? yImg : 0, 
                            scale: typeof window !== 'undefined' && window.innerWidth > 768 ? scaleImg : 1 
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: IMAGE_DELAY }}
                        className="relative w-full sm:w-[100%] md:w-[70%] lg:w-[45%] max-w-4xl h-full flex items-end justify-center pointer-events-auto group"
                    >
                        <img 
                            src={profileImage} 
                            alt="Unnikrishnan" 
                            className="w-full h-full object-contain object-bottom filter grayscale brightness-[0.85] md:brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-16 md:h-32 bg-gradient-to-t from-[#E5E5E0] to-transparent pointer-events-none z-10" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Content / CTA */}
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1.2, delay: FINAL_ITEMS_DELAY + 0.3 }}
                 className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-12 md:gap-8 z-30 mb-4 px-4 md:px-2"
            >
                <div className="max-w-xs flex flex-col items-center md:items-start text-center md:text-left gap-4">
                    <ArrowDownRight size={32} strokeWidth={1} className={`${isColorful ? 'text-cyan-400/50' : 'opacity-40'} hidden md:block`} />
                    <p className={`text-base md:text-xl font-medium leading-tight max-w-[220px] md:max-w-none ${isColorful ? 'text-white/80' : 'text-[#1c1c1c]'}`}>
                        Developer specialized in MERN stack, REST APIs, and full project architecture.
                    </p>
                </div>
                
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="inline-flex items-center gap-4 group cursor-pointer">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isColorful ? 'text-white/30' : 'text-[#1c1c1c]/40'}`}>Scroll to explore</span>
                        <div className={`hidden md:block w-8 md:w-12 h-px transition-all duration-500 group-hover:w-20 ${isColorful ? 'bg-white/20' : 'bg-black/10'}`} />
                        <span className={`md:hidden text-xs animate-bounce mt-1 ${isColorful ? 'text-white/20' : 'text-[#1c1c1c]/20'}`}>↓</span>
                    </div>
                    <button
                        onClick={handleResumeDownload}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 group/dl cursor-pointer ${
                            isColorful 
                            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                            : 'bg-black/[0.04] border-black/15 text-black hover:bg-black hover:text-white hover:border-black'
                        }`}
                    >
                        <Download size={14} strokeWidth={2.5} className="group-hover/dl:animate-bounce" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Resume</span>
                    </button>
                </div>
            </motion.div>

        </section>
    );
}
