import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
    {
        title: "Node Engine",
        category: "Scalability",
        image: "https://images.unsplash.com/photo-1518005020251-582c788447d9?q=80&w=2070&auto=format&fit=crop",
        color: "#3b82f6"
    },
    {
        title: "React Logic",
        category: "Interface",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        color: "#f59e0b"
    },
    {
        title: "Data Stream",
        category: "Database",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        color: "#10b981"
    }
];

export default function SlantedShowcase() {
    return (
        <section className="py-32 bg-bg-secondary/10 overflow-hidden relative z-0 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-12">
                    <div className="reveal">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-6">
                            Visual Showcase
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-text-primary">
                            Architectural <span className="text-primary italic">Precision</span>
                        </h2>
                        <p className="text-text-secondary max-w-xl text-lg font-medium leading-relaxed">
                            Dynamic interfaces meet rigorous logic. Explore the core pillars of my engineering philosophy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group relative h-[600px] overflow-hidden rounded-[3rem] transform-gpu hover:-translate-y-4 transition-transform duration-500 shadow-2xl"
                            >
                                {/* Slanted Image Container */}
                                <div
                                    className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        clipPath: index % 2 === 0
                                            ? "polygon(0 0, 100% 5%, 100% 100%, 0 95%)"
                                            : "polygon(0 5%, 100% 0, 100% 95%, 0 100%)"
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent">
                                    <span className="text-xs font-black tracking-[0.3em] uppercase text-text-secondary/60 mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="text-4xl font-black text-text-primary mt-2">
                                        {item.title}
                                    </h3>

                                    <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <div className="h-0.5 flex-1 bg-primary/40 rounded-full" />
                                        <span className="text-primary font-black text-xs uppercase tracking-widest">
                                            Logic Active
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
