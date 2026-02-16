import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap, Activity, Terminal, ShieldCheck, ExternalLink } from 'lucide-react';

const schemaItems = [
    {
        title: "RHEOX SYSTEM",
        tag: "MERN_ARCH_01",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        icon: Cpu,
        stats: ["MERN_STACK", "SCALABLE_API"],
        desc: "Advanced enterprise-grade architecture for industrial-scale deployment.",
        link: "https://rheox.unnijsx.online/"
    },
    {
        title: "RENDERBLOB",
        tag: "DIGITAL_ALCHEMY_02",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        icon: Zap,
        stats: ["GEO_RENDER", "WEB_GL"],
        desc: "Reshaping reality through code and geometry. Digital Alchemy for the modern web.",
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
                <div className="flex flex-col gap-20">

                    {/* Header: Schematic Style */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 reveal">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase">Production_Live // v1.2</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-text-primary leading-[0.85]">
                                LIVE <br />
                                <span className="text-secondary opacity-70 italic">ARCHITECTURES</span>
                            </h2>
                        </div>
                        <div className="max-w-xs space-y-4">
                            <p className="text-xs text-text-secondary/60 font-mono leading-relaxed uppercase tracking-widest text-right">
                                Deploying robust digital ecosystems to the production frontier. Validated across live environments.
                            </p>
                            <div className="flex justify-end gap-4 text-primary/30">
                                <Activity className="w-5 h-5" />
                                <Terminal className="w-5 h-5" />
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Balanced 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-5xl mx-auto">
                        {schemaItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* External Schematic Labels */}
                                <div className="absolute -top-6 left-0 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <div className="size-1 rounded-full bg-primary" />
                                    <span className="text-[8px] font-mono text-text-secondary group-hover:text-primary tracking-widest uppercase">{item.tag}</span>
                                </div>

                                {/* Main Card */}
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-bg-secondary/20 border border-white/5 group-hover:border-primary/30 transition-all duration-500 shadow-xl group-hover:shadow-primary/5"
                                >
                                    {/* Image Layer */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent" />
                                    </div>

                                    {/* Blueprint Icons & Lines */}
                                    <div className="absolute inset-6 border border-white/5 pointer-events-none rounded-2xl" />
                                    <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/5" />
                                    <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-white/5" />

                                    {/* Content */}
                                    <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="p-4 rounded-xl bg-bg-primary/80 border border-white/10 w-fit backdrop-blur-xl group-hover:border-primary/20 transition-colors">
                                                <item.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-3xl font-black text-text-primary tracking-tight uppercase">{item.title}</h3>
                                                <div className="flex gap-2">
                                                    {item.stats.map((s, si) => (
                                                        <span key={si} className="text-[7px] font-bold tracking-widest text-primary/60 bg-primary/5 px-2 py-0.5 rounded-sm border border-primary/10 uppercase">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-text-secondary leading-relaxed font-medium">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Scan Bar */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent -translate-y-full group-hover:animate-scan-slow z-20 pointer-events-none" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan-slow {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(600px); }
                }
                .animate-scan-slow {
                    animation: scan-slow 4s linear infinite;
                }
            `}</style>
        </section>
    );
}
