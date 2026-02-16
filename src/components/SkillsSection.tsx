import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Code2, Cpu, Globe } from "lucide-react";

const skills = [
    { name: "React / Next.js", icon: <Layout className="w-6 h-6 text-primary" />, level: 85 },
    { name: "Node.js / Express", icon: <Server className="w-6 h-6 text-secondary" />, level: 85 },
    { name: "MongoDB", icon: <Database className="w-6 h-6 text-green-500" />, level: 75 },
    { name: "JavaScript (ES6+)", icon: <Code2 className="w-6 h-6 text-yellow-500" />, level: 95 },
    { name: "Tailwind CSS", icon: <Cpu className="w-6 h-6 text-cyan-400" />, level: 90 },
    { name: "Git / CI/CD", icon: <Globe className="w-6 h-6 text-orange-500" />, level: 75 },
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-32 bg-bg-secondary/20 relative transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-black uppercase tracking-widest mb-6">
                        Expertise
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6 tracking-tighter">
                        Technical <span className="text-primary italic">Arsenal</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        My weapon of choice for conquering the digital frontier. Engineered for performance and scalability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-bg-primary/50 backdrop-blur-md p-8 rounded-[2rem] border border-border-color hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 group"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-4 bg-bg-secondary rounded-2xl group-hover:bg-primary/10 transition-colors">
                                    {skill.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-text-primary tracking-tight">{skill.name}</h3>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Efficiency</span>
                                    <span className="text-sm font-black text-primary">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-border-color/30 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
