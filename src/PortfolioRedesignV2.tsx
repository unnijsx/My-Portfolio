import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Terminal, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import HeroV2 from './components/redesign_v2/HeroV2';
import SkillsTree from './components/redesign_v2/SkillsTree';
import ExperienceV2 from './components/redesign_v2/ExperienceV2';
import ProjectsV2 from './components/redesign_v2/ProjectsV2';
import FooterV2 from './components/redesign_v2/FooterV2';

export default function PortfolioRedesignV2() {
    const { scrollY } = useScroll();
    
    // Header opacity on scroll
    const headerBg = useTransform(scrollY, [0, 80], ['rgba(11, 11, 12, 0)', 'rgba(11, 11, 12, 0.85)']);
    const headerBorder = useTransform(scrollY, [0, 80], ['rgba(244, 244, 245, 0)', 'rgba(24, 24, 27, 1)']);

    return (
        <ReactLenis root>
            <Helmet>
                <title>Unnikrishnan V P | Full Stack MERN Developer</title>
                <meta name="description" content="Portfolio of Unnikrishnan V P, a professional Full Stack MERN Stack Developer building robust server architectures, optimized databases, and clean frontend systems." />
                <meta name="keywords" content="Unnikrishnan V P, Unnikrishnan mern, unnikrishnan web developer, Unnikrishnan vp web developer, MERN stack developer, full stack developer, Kerala, India" />
                <link rel="canonical" href="https://unni.rheox.online/" />
            </Helmet>
            <div className="bg-[#0B0B0C] text-[#F4F4F5] font-sans selection:bg-amber-500 selection:text-[#0B0B0C] w-full min-h-screen overflow-x-clip">
                
                {/* Header Navigation */}
                <motion.nav 
                    style={{ backgroundColor: headerBg, borderColor: headerBorder }}
                    className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md px-6 py-5 md:px-12 transition-all duration-300"
                >
                    <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto">
                        <Link 
                            to="/" 
                            className="flex items-center gap-3 text-sm font-black tracking-[0.25em] uppercase text-white hover:text-amber-500 transition-colors"
                        >
                            <Terminal size={16} className="text-amber-500" />
                            UNNIKRISHNAN
                        </Link>

                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase">
                                <a href="#home" className="text-zinc-400 hover:text-white transition-colors">HOME</a>
                                <a href="#skills" className="text-zinc-400 hover:text-white transition-colors">SKILLS</a>
                                <a href="#experience" className="text-zinc-400 hover:text-white transition-colors">EXPERIENCE</a>
                                <a href="#works" className="text-zinc-400 hover:text-white transition-colors">WORKS</a>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Main Page Layout */}
                <main className="relative z-10">
                    <HeroV2 />
                    <SkillsTree />
                    <ExperienceV2 />
                    <ProjectsV2 />
                    <FooterV2 />
                </main>
            </div>
        </ReactLenis>
    );
}
