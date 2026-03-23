import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface OverlayMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isColorful: boolean;
    setIsColorful: (val: boolean) => void;
}

const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services' },
    { label: 'WORKS', href: '#works' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' }
];

export default function OverlayMenu({ isOpen, onClose, isColorful, setIsColorful }: OverlayMenuProps) {
    const [copied, setCopied] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-end pr-[10vw] sm:pr-[15vw] bg-black/40 backdrop-blur-xl"
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-8 right-8 md:top-12 md:right-12 z-[101] size-14 rounded-full bg-[#EAEAEA] flex items-center justify-center text-black hover:scale-105 transition-transform"
                    >
                        <X size={24} strokeWidth={1.5} />
                    </button>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-2 items-start text-[#EAEAEA]">
                        {menuItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase hover:text-white transition-colors leading-[0.85]"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                        
                        {/* Footer Details */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 flex flex-col gap-6"
                        >
                            {/* Theme Toggle */}
                            <div>
                                <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">Theme Mode</h4>
                                <button 
                                    onClick={() => setIsColorful(!isColorful)}
                                    className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all duration-500"
                                >
                                    <div className="relative w-8 h-4 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            animate={{ x: isColorful ? 16 : 0 }}
                                            className={`absolute inset-y-1 left-1 w-2 h-2 rounded-full transition-colors duration-500 ${isColorful ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white'}`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#EAEAEA] group-hover:text-white transition-colors">
                                        {isColorful ? 'Aurora Glass' : 'Minimal B&W'}
                                    </span>
                                </button>
                            </div>

                            <div className="relative group">
                                <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-1">Email Address</h4>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText('unniytman@gmail.com');
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="text-sm font-medium transition-all relative flex items-center gap-3 group/mail"
                                >
                                    <span className={`transition-colors duration-300 ${copied ? 'text-green-400' : 'text-[#EAEAEA] hover:text-white'}`}>
                                        {copied ? 'Copied to clipboard!' : 'unniytman@gmail.com'}
                                    </span>
                                </button>
                            </div>
                            <div className="flex gap-4 text-sm font-medium">
                                <a href="https://www.linkedin.com/in/unnikrishnanvp/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="https://github.com/unnijsx" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                                <a href="https://www.instagram.com/unni__xd/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
