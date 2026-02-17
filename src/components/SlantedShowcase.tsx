import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap, Activity, Terminal, ShieldCheck, ExternalLink, Bot, Box, LayoutDashboard, Palette } from 'lucide-react';
import rheoxDashboard from '../assets/images/rheoxdashboard.png';
import renderBlob from '../assets/images/renderblob.png';

const schemaItems = [
    {
        title: "RHEOX SYSTEM",
        tag: "DISCORD_ARCH_01",
        image: rheoxDashboard, // Discord/Bot themed image
        icon: Bot,
        stats: ["DISCORD_BOT", "REACT_DASHBOARD", "NODE_JS"],
        desc: "Advanced Discord high-performance bot ecosystem featuring a comprehensive real-time web dashboard for server administration.",
        link: "https://rheox.unnijsx.online/"
    },
    {
        title: "RENDERBLOB",
        tag: "DIGITAL_CANVAS_02",
        image: renderBlob, // Abstract 3D image
        icon: Box,
        stats: ["THREE_JS", "WEBGL", "MOTION_FX"],
        desc: "Immersive 3D portfolio platform and digital showcase designed for high-end creative visualizers and motion designers.",
        link: "https://renderblob-portfolio.vercel.app/"
    }
];

export default function SlantedShowcase() {
    return (
        <section className="py-40 bg-bg-primary relative overflow-hidden transition-colors duration-500">
            {/* Background Grid & Blueprints */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-16">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 reveal">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-blue-500/60" />
                                <span className="text-[10px] font-black tracking-[0.6em] text-blue-400 uppercase">Production_Live // v1.2</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
                                LIVE <br />
                                <span className="text-amber-500 opacity-90 italic">ARCHITECTURES</span>
                            </h2>
                        </div>
                        <div className="max-w-xs space-y-4">
                            <p className="text-xs text-slate-400 font-mono leading-relaxed uppercase tracking-widest text-right">
                                Deploying robust digital ecosystems to the production frontier. Validated across live environments.
                            </p>
                            <div className="flex justify-end gap-4 text-blue-500/40">
                                <Activity className="w-5 h-5" />
                                <Terminal className="w-5 h-5" />
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Robust Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl mx-auto">
                        {schemaItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true, amount: 0.1 }}
                                className="group relative w-full"
                            >
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative w-full overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6))',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                                    }}
                                >
                                    {/* Image Section - Fixed Height */}
                                    <div className="relative h-64 overflow-hidden border-b border-white/5">
                                        <div className="absolute inset-0 bg-blue-900/20 z-10 mix-blend-overlay" />
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                                                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] font-mono text-white tracking-widest uppercase">{item.tag}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 relative">
                                        <div className="absolute top-0 right-8 -translate-y-1/2 p-3 rounded-xl bg-slate-900 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                                            <item.icon className="w-6 h-6 text-blue-500" />
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2 group-hover:text-blue-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.stats.map((s, si) => (
                                                        <span key={si} className="text-[10px] font-bold tracking-widest text-blue-300/8 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 uppercase">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                                                {item.desc}
                                            </p>

                                            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold tracking-widest uppercase group/link">
                                                <span>Deploy View</span>
                                                <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
