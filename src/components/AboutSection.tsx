import React from "react";
import { motion } from "framer-motion";
import { Code2, Download, ExternalLink } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-32 bg-bg-primary relative overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-10 blur-2xl rounded-full"></div>
                        <div className="relative bg-bg-primary dark:bg-bg-secondary/30 backdrop-blur-xl border border-border-color p-10 rounded-[2.5rem] shadow-2xl transition-colors duration-500">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                <Code2 className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-3xl font-black text-text-primary mb-6 tracking-tight">
                                Architect of <span className="text-secondary">Digital</span> Solutions
                            </h3>
                            <p className="text-text-secondary leading-relaxed mb-6 text-lg">
                                I started my journey with a curiosity for how things work on the internet.
                                That curiosity evolved into a passion for building robust, scalable applications.
                            </p>
                            <p className="text-text-secondary leading-relaxed text-lg">
                                Whether it's optimizing database queries or crafting pixel-perfect UIs,
                                I treat every line of code as a piece of engineering art.
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-6">
                            Who I Am
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-8 tracking-tighter leading-tight">
                            A Developer based <br />
                            in <span className="text-primary italic">India 🇮🇳</span>
                        </h2>
                        <p className="text-text-secondary text-xl leading-relaxed mb-10 max-w-xl font-medium">
                            I specialize in the <span className="text-text-primary font-black">MERN stack</span> (MongoDB, Express, React, Node.js).
                            My focus is on creating solutions that are not only functional but also intuitive and highly performant.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-12">
                            <div className="p-6 bg-bg-primary dark:bg-bg-secondary/50 rounded-3xl border border-border-color hover:border-primary/30 transition-all group shadow-sm dark:shadow-none">
                                <h4 className="text-4xl font-black text-primary mb-1 group-hover:scale-110 transition-transform">1+</h4>
                                <p className="text-xs text-text-secondary font-black uppercase tracking-widest">Years Experience</p>
                            </div>
                            <div className="p-6 bg-bg-primary dark:bg-bg-secondary/50 rounded-3xl border border-border-color hover:border-secondary/30 transition-all group shadow-sm dark:shadow-none">
                                <h4 className="text-4xl font-black text-secondary mb-1 group-hover:scale-110 transition-transform">10+</h4>
                                <p className="text-xs text-text-secondary font-black uppercase tracking-widest">Projects Completed</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center px-8 py-4 bg-primary text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
                            >
                                Let's Talk <ExternalLink className="w-5 h-5 ml-2" />
                            </a>
                            <button
                                className="inline-flex items-center px-8 py-4 bg-bg-secondary text-text-primary border border-border-color font-black rounded-2xl hover:bg-bg-primary transition-all active:scale-95"
                            >
                                Résumé <Download className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
