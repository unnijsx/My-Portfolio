import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactFooterRedesign() {
    const [time, setTime] = useState(
        new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="contact" className="relative bg-[#E5E5E0] text-[#1c1c1c] selection:bg-black selection:text-white pt-32 rounded-t-[3rem] -mt-[3rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Top Heading */}
            <div className="px-6 md:px-12 text-center flex justify-center mb-16 overflow-hidden">
                <motion.h2 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-[12vw] leading-[0.8] font-black tracking-[-0.04em] uppercase max-w-[90vw] break-words"
                >
                    LET'S MAKE<br />IT HAPPEN
                </motion.h2>
            </div>

            {/* Contact Form Card */}
            <motion.div 
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto px-6 mb-32"
            >
                <div className="bg-[#1c1c1c] text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:shadow-black/40 transition-shadow duration-700">
                    <h3 className="text-2xl font-bold tracking-tight text-center mb-8 relative z-10">Have a project in mind?</h3>
                    
                    <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-2">
                            <input 
                                type="text" 
                                placeholder="Your name" 
                                className="w-full bg-[#2b2b2b] text-white border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-white/20 transition-shadow font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-[#2b2b2b] text-white border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-white/20 transition-shadow font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <textarea 
                                placeholder="Tell me about your business or project" 
                                rows={4}
                                className="w-full bg-[#2b2b2b] text-white border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-white/20 transition-shadow font-medium resize-none"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-2xl mt-4 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Get a quote
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Footer Area */}
            <div className="border-t border-black/10 px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between gap-12 font-medium">
                
                {/* Left Columns */}
                <div className="flex gap-16 md:gap-32">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold tracking-tight mb-2">Menu</h4>
                        <a href="#home" className="text-black/60 hover:text-black transition-colors">Home</a>
                        <a href="#services" className="text-black/60 hover:text-black transition-colors">Services</a>
                        <a href="#works" className="text-black/60 hover:text-black transition-colors">Works</a>
                        <a href="#about" className="text-black/60 hover:text-black transition-colors">About</a>
                        <a href="#contact" className="text-black/60 hover:text-black transition-colors">Contact</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold tracking-tight mb-2">Socials</h4>
                        <a href="https://www.linkedin.com/in/unnikrishnanvp/" target="_blank" rel="noreferrer" className="text-black/60 hover:text-black transition-colors">Linkedin</a>
                        <a href="https://www.instagram.com/unni__xd/" target="_blank" rel="noreferrer" className="text-black/60 hover:text-black transition-colors">Instagram</a>
                        <a href="https://github.com/unnijsx" target="_blank" rel="noreferrer" className="text-black/60 hover:text-black transition-colors">Github</a>
                    </div>
                </div>

                {/* Right Area */}
                <div className="flex flex-col justify-end items-start md:items-end gap-12">
                    <div className="flex flex-col md:items-end">
                        <h4 className="text-[10px] font-bold tracking-widest mb-1 items-center gap-2 flex">
                            <span className="size-2 rounded-full bg-green-500 animate-pulse block" />
                            LOCAL TIME
                        </h4>
                        <p className="font-mono text-xs text-black/60 tabular-nums">
                            {time} IST
                        </p>
                    </div>

                    <motion.button 
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, backgroundColor: '#1c1c1c', color: '#E5E5E0' }}
                        whileTap={{ scale: 0.85, rotate: -15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="size-16 rounded-full bg-black/10 flex items-center justify-center transition-colors"
                        aria-label="Scroll to top"
                    >
                        <motion.div
                            whileTap={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 600 }}
                        >
                            <ArrowUp size={24} strokeWidth={1.5} />
                        </motion.div>
                    </motion.button>
                </div>

            </div>

        </section>
    );
}
