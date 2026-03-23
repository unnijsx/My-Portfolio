import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
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
                
                {/* Floating Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="fixed top-6 right-4 md:top-12 md:right-12 z-50 size-12 md:size-14 rounded-full bg-[#EAEAEA] flex flex-col items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform border border-black/5"
                    aria-label="Open Menu"
                >
                    <div className="w-6 h-0.5 bg-black" />
                    <div className="w-6 h-0.5 bg-black" />
                </button>

                {/* Glassmorphic Overlay Menu */}
                <OverlayMenu 
                    isOpen={isMenuOpen} 
                    onClose={() => setIsMenuOpen(false)} 
                    isColorful={isColorful}
                    setIsColorful={setIsColorful}
                />

                {/* Individual Sections */}
                <main className="relative z-10 transition-colors duration-1000">
                    <HeroRedesign isColorful={isColorful} />
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
