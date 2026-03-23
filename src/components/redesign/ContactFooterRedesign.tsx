import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ContactFooterRedesignProps {
    isColorful?: boolean;
}

export default function ContactFooterRedesign({ isColorful }: ContactFooterRedesignProps) {
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
        <section id="contact" className={`relative transition-colors duration-1000 ${isColorful ? 'bg-transparent text-white selection:bg-cyan-500' : 'bg-[#E5E5E0] text-[#1c1c1c] selection:bg-black'} selection:text-white pt-32 rounded-t-[3rem] -mt-[3rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}>
            {/* Top Heading */}
            <div className="px-6 md:px-12 text-center flex justify-center mb-16 overflow-hidden max-w-full relative z-10">
                <motion.h2 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className={`text-[10vw] leading-[0.8] font-black tracking-[-0.04em] uppercase max-w-full break-words transition-all duration-700 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''}`}
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
                className="max-w-2xl mx-auto px-6 mb-32 relative z-10"
            >
                <div className={`p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group transition-all duration-700 ${
                    isColorful ? 'bg-white/[0.04] backdrop-blur-3xl border border-white/10 shadow-purple-500/5' : 'bg-[#1c1c1c] text-white hover:shadow-black/40'
                }`}>
                    <h3 className={`text-2xl font-bold tracking-tight text-center mb-8 relative z-10 ${isColorful ? 'text-white' : ''}`}>Have a project in mind?</h3>
                    
                    <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-2">
                            <input 
                                type="text" 
                                placeholder="Your name" 
                                className={`w-full border-none rounded-2xl px-6 py-4 outline-none transition-all font-medium ${
                                    isColorful ? 'bg-white/5 text-white focus:ring-2 focus:ring-cyan-500/40' : 'bg-[#2b2b2b] text-white focus:ring-2 focus:ring-white/20'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className={`w-full border-none rounded-2xl px-6 py-4 outline-none transition-all font-medium ${
                                    isColorful ? 'bg-white/5 text-white focus:ring-2 focus:ring-cyan-500/40' : 'bg-[#2b2b2b] text-white focus:ring-2 focus:ring-white/20'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <textarea 
                                placeholder="Tell me about your business or project" 
                                rows={4}
                                className={`w-full border-none rounded-2xl px-6 py-4 outline-none transition-all font-medium resize-none ${
                                    isColorful ? 'bg-white/5 text-white focus:ring-2 focus:ring-cyan-500/40' : 'bg-[#2b2b2b] text-white focus:ring-2 focus:ring-white/20'
                                }`}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className={`w-full font-bold uppercase tracking-widest py-4 rounded-2xl mt-4 transition-all active:scale-[0.98] ${
                                isColorful 
                                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:opacity-90 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]' 
                                : 'bg-white text-black hover:bg-white/90 hover:scale-[1.02]'
                            }`}
                        >
                            Get a quote
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Footer Area */}
            <div className={`border-t px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between gap-12 font-medium relative z-10 transition-colors ${isColorful ? 'border-white/5' : 'border-black/10'}`}>
                
                {/* Left Columns */}
                <div className="flex gap-16 md:gap-32">
                    <div className="flex flex-col gap-4">
                        <h4 className={`font-bold tracking-tight mb-2 transition-colors ${isColorful ? 'text-cyan-400' : ''}`}>Menu</h4>
                        <a href="#home" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Home</a>
                        <a href="#services" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Services</a>
                        <a href="#works" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Works</a>
                        <a href="#about" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>About</a>
                        <a href="#contact" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Contact</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className={`font-bold tracking-tight mb-2 transition-colors ${isColorful ? 'text-purple-400' : ''}`}>Socials</h4>
                        <a href="https://www.linkedin.com/in/unnikrishnanvp/" target="_blank" rel="noreferrer" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Linkedin</a>
                        <a href="https://www.instagram.com/unni__xd/" target="_blank" rel="noreferrer" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Instagram</a>
                        <a href="https://github.com/unnijsx" target="_blank" rel="noreferrer" className={`transition-colors ${isColorful ? 'text-white/40 hover:text-white' : 'text-black/60 hover:text-black'}`}>Github</a>
                    </div>
                </div>

                {/* Right Area */}
                <div className="flex flex-col justify-end items-start md:items-end gap-12">
                    <div className="flex flex-col md:items-end">
                        <h4 className={`text-[10px] font-bold tracking-widest mb-1 items-center gap-2 flex transition-colors ${isColorful ? 'text-cyan-400/50' : ''}`}>
                            <span className="size-2 rounded-full bg-green-500 animate-pulse block" />
                            LOCAL TIME
                        </h4>
                        <p className={`font-mono text-xs tabular-nums transition-colors ${isColorful ? 'text-white/40' : 'text-black/60'}`}>
                            {time} IST
                        </p>
                    </div>

                    <motion.button 
                        onClick={scrollToTop}
                        whileHover={isColorful ? { scale: 1.1, backgroundColor: 'rgba(34, 211, 238, 0.2)', color: '#fff' } : { scale: 1.1, backgroundColor: '#1c1c1c', color: '#E5E5E0' }}
                        whileTap={{ scale: 0.85, rotate: -15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className={`size-16 rounded-full flex items-center justify-center transition-colors ${isColorful ? 'bg-white/5 text-white' : 'bg-black/10 text-black'}`}
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
