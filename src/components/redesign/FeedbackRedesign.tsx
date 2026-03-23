import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RatingInteraction } from '../ui/emoji-rating';
import { X, Send, Sparkles } from 'lucide-react';

interface FeedbackRedesignProps {
    isColorful?: boolean;
}

export default function FeedbackRedesign({ isColorful }: FeedbackRedesignProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRatingChange = (val: number) => {
        setRating(val);
        // Let the emoji animation complete before opening the detailed feedback
        setTimeout(() => setIsPopupOpen(true), 800);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formcarry.com/s/sfxn2zYXSre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    rating: rating,
                    feedback: feedback
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsPopupOpen(false);
                    setIsSubmitted(false);
                    setFeedback('');
                }, 3000);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="feedback" className={`py-40 transition-colors duration-1000 ${isColorful ? 'bg-transparent' : 'bg-[#0E0E0E]'} text-[#E5E5E0] relative border-t border-white/5 overflow-hidden selection:bg-white selection:text-black`}>
            
            {/* Atmospheric Background Decor */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[120px]" />
                <motion.div 
                    animate={{ 
                        x: [0, 50, 0],
                        opacity: [0.02, 0.05, 0.02]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute -bottom-10 left-10 text-[35vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none transition-colors select-none ${isColorful ? 'text-white/5' : 'text-white'}`}
                >
                    Feedback
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center max-w-4xl mx-auto">
                    
                    {/* Header Heading */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="text-center mb-20 space-y-4"
                    >
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isColorful ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-white/10 bg-white/5 text-white/40'}`}>
                            <Sparkles size={10} className={isColorful ? 'text-cyan-400' : 'text-yellow-500/50'} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Experience Hub</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-[-0.04em] uppercase leading-tight">
                            RATE THE <span className={`transition-colors ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500' : 'text-white/20'}`}>EXPERIENCE</span>
                        </h2>
                        <p className={`text-sm md:text-base font-medium tracking-tight max-w-md mx-auto transition-colors ${isColorful ? 'text-white/60' : 'text-white/40'}`}>
                            Your feedback is the spark that keeps the creative engine running. How was your journey through this portfolio?
                        </p>
                    </motion.div>

                    {/* Glass Hub Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="w-full max-w-2xl relative"
                    >
                        {/* Card Glow */}
                        <div className={`absolute -inset-4 blur-[100px] rounded-[3rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity ${isColorful ? 'bg-cyan-500/10' : 'bg-white/5'}`} />
                        
                        <div className={`relative z-10 backdrop-blur-3xl border rounded-[2.5rem] md:rounded-[4rem] p-12 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden group transition-all duration-500 ${
                            isColorful ? 'bg-white/[0.03] border-cyan-500/20' : 'bg-white/[0.02] border-white/10'
                        }`}>
                           {/* Content */}
                           <div className="flex flex-col items-center gap-2">
                                <RatingInteraction onChange={handleRatingChange} />
                           </div>
                           
                           {/* Subtle Inner Glow */}
                           <div className={`absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent to-transparent ${isColorful ? 'via-cyan-400/20' : 'via-white/10'}`} />
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Modal Redesign */}
            <AnimatePresence>
                {isPopupOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPopupOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className={`relative border p-8 md:p-16 rounded-[3rem] w-full max-w-xl shadow-3xl group overflow-hidden transition-all duration-500 ${
                                isColorful ? 'bg-[#0A0A0B] border-purple-500/20 shadow-[0_30px_60px_rgba(168,85,247,0.1)]' : 'bg-[#0F0F0F] border-white/5'
                            }`}
                        >
                            {/* Inner structural decor */}
                            <div className={`absolute -top-32 -right-32 w-64 h-64 blur-[100px] rounded-full ${isColorful ? 'bg-purple-500/10' : 'bg-white/5'}`} />
                            
                            <button 
                                onClick={() => setIsPopupOpen(false)}
                                className={`absolute top-6 right-6 transition-colors p-3 rounded-full z-20 ${
                                    isColorful ? 'text-purple-400/40 hover:text-purple-400 hover:bg-purple-500/10' : 'text-white/20 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <X size={20} />
                            </button>

                            {isSubmitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center space-y-6"
                                >
                                    <div className="text-6xl md:text-7xl">✨</div>
                                    <div className="space-y-2">
                                        <h3 className={`text-3xl md:text-4xl font-black tracking-tighter uppercase underline underline-offset-8 ${isColorful ? 'decoration-cyan-500/30' : 'decoration-white/10'}`}>Gratitude</h3>
                                        <p className={`text-sm md:text-lg font-bold tracking-tight uppercase ${isColorful ? 'text-cyan-400/60' : 'text-white/40'}`}>Your insight has been secured.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                                    <div className="space-y-4">
                                        <div className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                                            DEEP<br /> <span className={`transition-colors ${isColorful ? 'text-purple-400' : 'text-white/20'}`}>THOUGHTS?</span>
                                        </div>
                                        <p className={`text-sm md:text-base font-medium leading-relaxed max-w-sm transition-colors ${isColorful ? 'text-white/60' : 'text-white/40'}`}>
                                            I value the nuance. Feel free to leave a detailed message or suggestion below.
                                        </p>
                                    </div>

                                    <div className="relative">
                                        <textarea 
                                            required
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="The canvas is yours..."
                                            className={`w-full border rounded-2xl md:rounded-3xl p-6 md:p-10 min-h-[160px] md:min-h-[220px] text-white focus:outline-none transition-all placeholder:text-white/10 text-lg md:text-xl font-medium resize-none shadow-2xl ${
                                                isColorful ? 'bg-white/[0.04] border-purple-500/20 focus:border-cyan-500/40' : 'bg-white/[0.03] border-white/10 focus:border-white/20'
                                            }`}
                                        />
                                        <div className={`absolute bottom-6 right-6 pointer-events-none transition-colors ${isColorful ? 'text-cyan-400/30' : 'opacity-20'}`}>
                                            <Send size={18} />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full h-16 md:h-20 rounded-2xl md:rounded-3xl font-black text-sm md:text-base uppercase tracking-widest transition-all disabled:opacity-50 active:scale-95 ${
                                            isColorful 
                                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:opacity-90' 
                                            : 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-zinc-200'
                                        }`}
                                    >
                                        {isSubmitting ? "Syncing..." : "Publish Feedback"}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
