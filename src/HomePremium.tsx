import React, { useState, useEffect } from 'react';
import HeroSection from './components/ui/glassmorphism-trust-hero';
import { RatingInteraction } from './components/ui/emoji-rating';
import SlantedShowcase from './components/SlantedShowcase';
import PremiumProjects from './components/PremiumProjects';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import MobileNav from './components/MobileNav';
import { Sun, Moon } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import PremiumNavbar from './components/PremiumNavbar';

export default function HomePremium() {
    const [isDark, setIsDark] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionType, setTransitionType] = useState<'to-dark' | 'to-light' | null>(null);

    useEffect(() => {
        // Simulate initial load
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        if (isTransitioning) return;

        const newType = isDark ? 'to-light' : 'to-dark';
        setTransitionType(newType);
        setIsTransitioning(true);

        const flipDelay = newType === 'to-light' ? 5000 : 4000;

        // Switch the actual theme classes at the calibrated midpoint
        setTimeout(() => {
            setIsDark(!isDark);
        }, flipDelay);

        // End the transition state at 8 seconds
        setTimeout(() => {
            setIsTransitioning(false);
            setTransitionType(null);
        }, 8000);
    };

    return (
        <div className="min-h-screen transition-colors duration-500 bg-bg-primary text-text-primary selection:bg-primary selection:text-white">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <LoadingScreen key="loader" />
                ) : (
                    <div key="content" className="relative">
                        <PremiumNavbar isDark={isDark} onToggleTheme={toggleTheme} />

                        {/* Hero Section */}
                        <header className="relative">
                            <HeroSection
                                isDark={isDark}
                                isTransitioning={isTransitioning}
                                transitionType={transitionType}
                            />
                        </header>

                        <main>
                            {/* About Section */}
                            <AboutSection />

                            {/* Skills Section */}
                            <SkillsSection />

                            {/* Visual Showcase Section */}
                            <SlantedShowcase />

                            {/* Projects Section - 3D Pin Interaction */}
                            <PremiumProjects />

                            {/* Feedback Section - Interactive Rating */}
                            <section className="py-32 bg-bg-secondary/20 relative z-10 border-y border-border-color">
                                <div className="container mx-auto px-6 text-center">
                                    <div className="reveal flex flex-col items-center gap-12">
                                        <div className="space-y-4">
                                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest">
                                                Feedback
                                            </div>
                                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                                                Rate the <span className="text-secondary italic">Experience</span>
                                            </h2>
                                            <p className="text-text-secondary max-w-sm mx-auto text-lg font-medium">
                                                Your feedback fuels the creative engine.
                                            </p>
                                        </div>

                                        <div className="p-12 rounded-[3.5rem] bg-bg-primary/50 backdrop-blur-2xl shadow-inner border border-border-color">
                                            <RatingInteraction />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Contact Section */}
                            <ContactSection />
                        </main>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes reveal {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .reveal {
                    animation: reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                /* Selection styling */
                ::selection {
                    background: var(--color-primary);
                    color: white;
                }
            `}</style>
        </div>
    );
}
