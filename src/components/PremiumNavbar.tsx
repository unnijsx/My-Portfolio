import React, { useState } from 'react';
import { Sun, Moon, Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    isDark: boolean;
    onToggleTheme: () => void;
}

export default function PremiumNavbar({ isDark, onToggleTheme }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'HOME', href: '#home' },
        { label: 'PORTFOLIO', href: '#projects' },
        { label: 'CONTACT', href: '#contact' },
        { label: 'ABOUT', href: '#about' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-8 flex justify-center pointer-events-none">
                <div
                    className="w-full max-w-5xl flex justify-between items-center mix-blend-difference text-white pointer-events-auto"
                >
                    {/* Desktop Links - Leftish */}
                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-[11px] tracking-[0.3em] font-heading hover:opacity-70 transition-opacity"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Logo/Center Placeholder if needed */}
                    <div className="md:hidden flex items-center">
                        <span className="text-sm font-heading tracking-widest">UNNI.JSX</span>
                    </div>

                    {/* Desktop Actions - Rightish */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={onToggleTheme}
                            className="p-2 hover:scale-110 active:scale-95 transition-all text-white"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </button>

                        <a
                            href="/resume.pdf"
                            download
                            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.3em] font-heading hover:opacity-70 transition-opacity group"
                        >
                            RESUME
                            <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[90] bg-bg-primary/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl tracking-[0.4em] font-heading text-text-primary hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-3 text-lg tracking-[0.2em] font-heading text-primary mt-4"
                            >
                                RESUME
                                <Download className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
