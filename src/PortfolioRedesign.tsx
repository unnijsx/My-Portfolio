import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Sun, Moon } from 'lucide-react';
import HeroRedesign from './components/redesign/HeroRedesign';
import ServicesRedesign from './components/redesign/ServicesRedesign';
import WorksRedesign from './components/redesign/WorksRedesign';
import SkillsRedesign from './components/redesign/SkillsRedesign';
import LiveArchitectures from './components/redesign/LiveArchitectures';
import FeedbackRedesign from './components/redesign/FeedbackRedesign';
import ContactFooterRedesign from './components/redesign/ContactFooterRedesign';
import OverlayMenu from './components/redesign/OverlayMenu';

export default function PortfolioRedesign() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isColorful, setIsColorful] = useState(false);
    const { scrollY } = useScroll();

    // Fade logo in only after scrolling past the Hero header
    const logoOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const logoY = useTransform(scrollY, [0, 100], [-10, 0]);

    useEffect(() => {
        // Prevent body scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <ReactLenis root>
            <div className={`transition-colors duration-1000 ${isColorful ? 'bg-[#0A0A0B]' : 'bg-[#E5E5E0]'} text-[#1c1c1c] font-sans selection:bg-black selection:text-white w-full overflow-x-hidden`}>

                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 pointer-events-none">
                    <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto">
                        {/* Logo - Fades in on scroll */}
                        <motion.div 
                            style={{ opacity: logoOpacity, y: logoY }}
                            className={`text-sm font-black tracking-[0.2em] uppercase transition-colors duration-500 pointer-events-auto ${isColorful ? 'text-white' : 'text-black'}`}
                        >
                            UNNIKRISHNAN
                        </motion.div>

                        <div className="flex items-center gap-4">
                            {/* Menu Button */}
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsMenuOpen(true)}
                                className={`size-12 md:size-14 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-md transition-all duration-500 border pointer-events-auto ${isColorful ? 'bg-white/10 border-white/20 backdrop-blur-md' : 'bg-[#EAEAEA] border-black/5'}`}
                                aria-label="Open Menu"
                            >
                                <div className={`w-6 h-0.5 transition-colors duration-500 ${isColorful ? 'bg-white' : 'bg-black'}`} />
                                <div className={`w-6 h-0.5 transition-colors duration-500 ${isColorful ? 'bg-white' : 'bg-black'}`} />
                            </motion.button>
                        </div>
                    </div>
                </nav>


                {/* Glassmorphic Overlay Menu */}
                <OverlayMenu 
                    isOpen={isMenuOpen} 
                    onClose={() => setIsMenuOpen(false)} 
                    isColorful={isColorful}
                    setIsColorful={setIsColorful}
                />

                {/* Individual Sections */}
                <main className="relative z-10 transition-colors duration-1000">
                    <HeroRedesign isColorful={isColorful} setIsColorful={setIsColorful} />
                    <ServicesRedesign isColorful={isColorful} />
                    <WorksRedesign isColorful={isColorful} />
                    <SkillsRedesign isColorful={isColorful} />
                    <LiveArchitectures isColorful={isColorful} />
                    <FeedbackRedesign isColorful={isColorful} />
                    <ContactFooterRedesign isColorful={isColorful} />
                </main>


            </div>
        </ReactLenis>
    );
}

