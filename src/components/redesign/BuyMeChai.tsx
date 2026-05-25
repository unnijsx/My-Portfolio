import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuyMeChaiProps {
    isColorful?: boolean;
}

// Custom interactive Cutting Chai Glass SVG
export function ChaiIcon({ className = "size-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Animated Steam lines */}
            <g>
                <motion.path
                    d="M48 32 C45 22, 53 14, 47 4"
                    stroke="#8B5A2B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.6"
                    animate={{
                        y: [2, -10, 2],
                        opacity: [0.2, 0.8, 0.2],
                        strokeDashoffset: [0, -10]
                    }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.path
                    d="M60 28 C64 18, 56 12, 62 2"
                    stroke="#8B5A2B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.8"
                    animate={{
                        y: [-2, -14, -2],
                        opacity: [0.3, 0.9, 0.3],
                        strokeDashoffset: [0, -10]
                    }}
                    transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                    }}
                />
                <motion.path
                    d="M72 34 C68 24, 76 16, 70 6"
                    stroke="#8B5A2B"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.5"
                    animate={{
                        y: [4, -8, 4],
                        opacity: [0.1, 0.7, 0.1],
                        strokeDashoffset: [0, -10]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }}
                />
            </g>

            {/* Tumbler Background Glass Shadow/Glow */}
            <path
                d="M35 45 L45 105 C45 108, 48 110, 52 110 L68 110 C72 110, 75 108, 75 105 L85 45 Z"
                fill="currentColor"
                fillOpacity="0.04"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinejoin="round"
            />

            {/* Chai Liquid Fill */}
            <path
                d="M38.5 65 L44.3 103.5 C44.5 104.5, 45.2 105, 46 105 L74 105 C74.8 105, 75.5 104.5, 75.7 103.5 L81.5 65 Z"
                fill="url(#chaiGradient)"
            />
            
            {/* Liquid surface ellipse */}
            <ellipse cx="60" cy="65" rx="21.5" ry="5.5" fill="url(#chaiSurfaceGradient)" />

            {/* Glass Vertical Ridges (Cutting Facets) */}
            <path d="M48 45 L52 105" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.15" strokeLinecap="round" />
            <path d="M60 45 L60 105" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" strokeLinecap="round" />
            <path d="M72 45 L68 105" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.15" strokeLinecap="round" />

            {/* Highlights & Rim */}
            <ellipse cx="60" cy="45" rx="25" ry="6.5" stroke="currentColor" strokeWidth="3.5" strokeOpacity="0.6" />
            <ellipse cx="60" cy="45" rx="23.5" ry="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

            {/* Ambient Inner Shadow on Glass Base */}
            <path
                d="M45 105 C45 108, 48 110, 52 110 L68 110 C72 110, 75 108, 75 105"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeOpacity="0.4"
            />

            {/* Gradients */}
            <defs>
                {/* Warm Indian Chai color gradient */}
                <linearGradient id="chaiGradient" x1="60" y1="65" x2="60" y2="105" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F59E0B" />   {/* Light amber tea froth */}
                    <stop offset="35%" stopColor="#D97706" />  {/* Warm ginger chai */}
                    <stop offset="100%" stopColor="#78350F" /> {/* Rich masala chai base */}
                </linearGradient>
                <linearGradient id="chaiSurfaceGradient" x1="38.5" y1="65" x2="81.5" y2="65" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// 1. FLOATING ACTION WIDGET (Bottom Right)
export function BuyMeChaiFloating({ isColorful }: BuyMeChaiProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initially
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleRedirect = () => {
        window.open('https://www.buymeachai.in/unni', '_blank', 'noopener,noreferrer');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
                >
                    <motion.button
                        onClick={handleRedirect}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        className={`group flex items-center justify-center size-12 md:size-auto md:h-14 md:pl-3 md:pr-5 rounded-full shadow-2xl transition-all duration-500 border pointer-events-auto ${
                            isColorful 
                                ? 'bg-[#0F0F11]/90 border-cyan-500/30 text-white backdrop-blur-md shadow-cyan-500/10 hover:border-cyan-400 hover:shadow-cyan-500/20' 
                                : 'bg-[#1c1c1c] border-white/10 text-white shadow-black/40 hover:bg-black'
                        }`}
                        aria-label="Buy me a chai"
                    >
                        {/* Icon wrapper with a soft warm pulse */}
                        <div className="relative size-8 md:size-9 flex items-center justify-center bg-amber-500/10 rounded-full border border-amber-500/20 group-hover:bg-amber-500/20 transition-all duration-300">
                            <ChaiIcon className="size-7 md:size-8 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        
                        {/* Floating expandable label - Hidden on mobile, shown on desktop */}
                        <span className="hidden md:inline-flex text-xs font-black tracking-widest uppercase select-none items-center gap-1.5">
                            Buy me a chai
                            <span className="text-amber-500 animate-bounce">☕</span>
                        </span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// 2. IN-PAGE BANNER CARD (After Get a Quote Section)
export function BuyMeChaiCard({ isColorful }: BuyMeChaiProps) {
    const handleRedirect = () => {
        window.open('https://www.buymeachai.in/unni', '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto px-4 md:px-6 mb-20 relative z-10"
        >
            <div className={`p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border text-center relative overflow-hidden transition-all duration-700 ${
                isColorful 
                    ? 'bg-[#0F0F11]/60 border-white/10 backdrop-blur-3xl shadow-2xl hover:border-cyan-500/30' 
                    : 'bg-[#F2F2EB] border-black/5 text-[#1c1c1c] shadow-lg hover:shadow-xl hover:border-black/10'
            }`}>
                {/* Subtle Ambient Background Glows in Colorful theme */}
                {isColorful && (
                    <>
                        <div className="absolute -top-24 -left-24 size-48 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />
                    </>
                )}

                {/* Animated Chai Tumbler illustration */}
                <div className="flex justify-center mb-6 relative">
                    <motion.div
                        animate={{ 
                            y: [0, -6, 0],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="relative size-20 md:size-24 p-3 bg-amber-500/10 rounded-full border border-amber-500/20 shadow-inner flex items-center justify-center"
                    >
                        <ChaiIcon className="size-16 md:size-20 text-amber-500" />
                        <span className="absolute -bottom-1 -right-1 text-xl md:text-2xl">☕</span>
                    </motion.div>
                </div>

                {/* Typography details */}
                <h3 className={`text-xl md:text-3xl font-black uppercase tracking-tight mb-3 transition-colors duration-700 ${
                    isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300' : 'text-[#1c1c1c]'
                }`}>
                    Enjoyed my work?
                </h3>
                
                <p className={`text-xs md:text-base font-medium max-w-md mx-auto mb-8 transition-colors duration-700 leading-relaxed ${
                    isColorful ? 'text-white/60' : 'text-[#1c1c1c]/70'
                }`}>
                    Let's fuel the next pixel-perfect feature together with a warm, refreshing cup of traditional cutting chai.
                </p>

                {/* Premium Button */}
                <motion.button
                    onClick={handleRedirect}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 shadow-lg ${
                        isColorful 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500' 
                            : 'bg-[#1c1c1c] text-[#F2F2EB] hover:bg-black hover:shadow-black/20'
                    }`}
                >
                    Buy me a chai
                    <span className="text-sm md:text-base select-none">☕</span>
                </motion.button>
            </div>
        </motion.div>
    );
}
