import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useRedisValue, RedisCache } from '../../utils/redisCache';

export default function FooterV2() {
    const [time, setTime] = useState('');
    
    const [name, setName] = useRedisValue<string>('draft:contact_name', '', { ttl: 3600 });
    const [email, setEmail] = useRedisValue<string>('draft:contact_email', '', { ttl: 3600 });
    const [message, setMessage] = useRedisValue<string>('draft:contact_message', '', { ttl: 3600 });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const handleCopy = (e: React.MouseEvent, text: string, type: 'email' | 'phone') => {
        e.preventDefault();
        navigator.clipboard.writeText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(null), 2000);
    };

    useEffect(() => {
        const updateTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            
            // Increment submissions in client analytics cache
            RedisCache.incr('analytics:contact_submissions');
            
            // Clear drafts
            setName('');
            setEmail('');
            setMessage('');

            setTimeout(() => {
                setIsSubmitted(false);
            }, 5050);
        }, 1500);
    };

    return (
        <footer className="relative bg-[#0B0B0C] border-t border-zinc-900 text-[#F4F4F5] pt-24 pb-12 px-6 md:px-12 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    
                    {/* Left Column: Info & Links (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500/80 mb-6 block">
                                // LET'S BUILD SOMETHING EXCEPTIONAL
                            </span>
                            <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase leading-none max-w-xl mb-6">
                                WANNA START A <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">PROJECT?</strong>
                            </h2>
                            <p className="text-zinc-400 font-normal leading-relaxed max-w-md">
                                Always open to consulting opportunities, contract roles, or scaling up complex full stack architectures.
                            </p>
                        </div>

                        {/* Direct Contacts */}
                        <div className="space-y-4">
                            <button 
                                onClick={(e) => handleCopy(e, 'unni@rheox.online', 'email')}
                                className="group flex items-center gap-4 text-zinc-300 hover:text-white transition-colors w-fit text-left"
                            >
                                <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                                    <Mail size={16} className="text-zinc-400 group-hover:text-amber-500 transition-colors" />
                                </div>
                                <span className="font-mono text-sm">
                                    {copiedText === 'email' ? 'Copied to Clipboard!' : 'unni@rheox.online'}
                                </span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-amber-500" />
                            </button>
                            <button 
                                onClick={(e) => handleCopy(e, '+918848853516', 'phone')}
                                className="group flex items-center gap-4 text-zinc-300 hover:text-white transition-colors w-fit text-left"
                            >
                                <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                                    <Phone size={16} className="text-zinc-400 group-hover:text-amber-500 transition-colors" />
                                </div>
                                <span className="font-mono text-sm">
                                    {copiedText === 'phone' ? 'Copied to Clipboard!' : '+91 8848853516'}
                                </span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-amber-500" />
                            </button>
                        </div>

                        {/* Navigation & Location Row */}
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-900/60">
                            <div>
                                <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">NAVIGATION</h4>
                                <ul className="space-y-2 text-xs font-semibold">
                                    {['Home', 'Skills', 'Experience', 'Works'].map((item) => (
                                        <li key={item}>
                                            <a 
                                                href={`#${item.toLowerCase()}`}
                                                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <span className="text-[9px] font-mono text-zinc-650">//</span>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">LOCATION</h4>
                                <div className="space-y-2 text-xs font-semibold text-zinc-400">
                                    <p className="flex items-center gap-2">
                                        <span className="text-[9px] font-mono text-zinc-650">//</span>
                                        Payyannur, Kannur
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-[9px] font-mono text-zinc-650">//</span>
                                        Kerala, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Contact Form (7 cols) */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#101012] border border-zinc-900 rounded-3xl p-8 md:p-10 relative">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 0.5 }}
                                            className="size-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400"
                                        >
                                            <CheckCircle2 size={32} />
                                        </motion.div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold uppercase tracking-tight text-white">PROPOSAL COMPILED</h3>
                                            <p className="text-xs text-zinc-450 max-w-sm leading-relaxed">
                                                Thank you! Your inquiry details are saved successfully in the cached session. I will reach out soon.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form">
                                        <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-8">
                                            // INITIATE A PROJECT PROPOSAL
                                        </h3>
                                        
                                        <form className="space-y-6" onSubmit={handleFormSubmit}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest">Full Name</label>
                                                    <input 
                                                        required
                                                        type="text" 
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Your name" 
                                                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs outline-none text-white focus:border-amber-500/40 transition-colors"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest">Email Address</label>
                                                    <input 
                                                        required
                                                        type="email" 
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="name@company.com" 
                                                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs outline-none text-white focus:border-amber-500/40 transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest">Message Details</label>
                                                <textarea 
                                                    required
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Describe your project, timeline, or requirements..." 
                                                    rows={5}
                                                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-xs outline-none text-white focus:border-amber-500/40 transition-colors resize-none"
                                                />
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-[#0B0B0C] hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'SENDING PROPOSAL...' : 'SUBMIT PROJECT BRIEF'}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

                {/* Subfooter */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <span className="text-xs text-zinc-650 font-mono">
                        © {new Date().getFullYear()} UNNIKRISHNAN V P. ALL RIGHTS RESERVED.
                    </span>

                    {/* Local Time Widget */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-3.5 py-1.5 rounded-xl">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">LOCAL TIME:</span>
                            <span className="font-mono text-[10px] font-bold text-amber-500">{time || '00:00:00 PM'} IST</span>
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-zinc-550 uppercase">
                            <span className="size-1.5 rounded-full bg-teal-500" />
                            AVAILABLE
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
