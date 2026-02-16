import React from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, MessageSquare } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-32 bg-bg-primary relative overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Left Side: Branding & Info */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest">
                                    Let's Connect
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-text-primary tracking-tighter leading-none">
                                    Have a <span className="text-secondary italic">Vision?</span> <br />
                                    Let's Build It.
                                </h2>
                                <p className="text-text-secondary text-xl max-w-md leading-relaxed">
                                    I'm currently available for freelance projects and full-time opportunities.
                                    Reach out and let's start a conversation.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-8">
                                <a href="https://github.com/unnijsx" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-primary hover:text-primary transition-colors group">
                                    <div className="size-12 rounded-2xl bg-bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Github className="w-6 h-6" />
                                    </div>
                                    <span className="font-black tracking-tight text-lg">unnijsx</span>
                                </a>
                                <a href="https://linkedin.com/in/unnikrishnanvp" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-primary hover:text-primary transition-colors group">
                                    <div className="size-12 rounded-2xl bg-bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Linkedin className="w-6 h-6" />
                                    </div>
                                    <span className="font-black tracking-tight text-lg">unnikrishnanvp</span>
                                </a>
                            </div>

                            <div className="p-8 bg-bg-secondary/30 backdrop-blur-xl border border-border-color rounded-[2.5rem] flex items-center gap-6">
                                <div className="size-14 bg-secondary/10 rounded-2xl flex items-center justify-center">
                                    <MessageSquare className="w-7 h-7 text-secondary" />
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-text-secondary mb-1">Direct Message</div>
                                    <div className="text-xl font-black text-text-primary">unniytman@gmail.com</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-bg-secondary/50 backdrop-blur-2xl border border-border-color p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative"
                        >
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 size-24 bg-primary/20 rounded-full blur-3xl pointer-events-none opacity-50"></div>

                            <form action="https://formcarry.com/s/M5yYOL89oqa" method="POST" className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary px-2">Identifier</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full bg-bg-primary/50 border-2 border-border-color rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-text-primary font-black placeholder:text-text-secondary/30"
                                            placeholder="Unnikrishnan V P"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary px-2">Encryption (Email)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full bg-bg-primary/50 border-2 border-border-color rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-text-primary font-black placeholder:text-text-secondary/30"
                                            placeholder="unniytman@gmail.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary px-2">Message Payload</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full bg-bg-primary/50 border-2 border-border-color rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-text-primary font-black placeholder:text-text-secondary/30 resize-none"
                                        placeholder="Initialize project conversation..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-black text-xl py-6 rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transform transition-all active:scale-95 flex items-center justify-center group">
                                    Send Transmission <Send className="w-6 h-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    <footer className="mt-32 pt-12 border-t border-border-color text-center space-y-4">
                        <div className="text-2xl font-black tracking-tighter text-text-primary">
                            UNNI<span className="text-primary">.JSX</span>
                        </div>
                        <p className="text-text-secondary text-xs font-bold uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} Crafted with Precision in India
                        </p>
                    </footer>
                </div>
            </div>
        </section>
    );
}
