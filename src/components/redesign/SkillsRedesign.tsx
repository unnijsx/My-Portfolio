import React from 'react';
import { motion } from 'framer-motion';

export default function SkillsRedesign() {
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };

    const containerVars = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    return (
        <section id="skills" className="relative min-h-screen bg-[#0E0E0E] text-[#E5E5E0] py-32 px-6 md:px-12 selection:bg-white selection:text-black flex flex-col justify-between overflow-hidden">
            
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start relative z-10 w-full">
                
                {/* Left Big Typography */}
                <motion.div 
                    variants={containerVars}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="col-span-1 md:col-span-8 flex flex-col leading-[0.85] font-black tracking-[-0.04em] uppercase text-[15vw] sm:text-[12vw] md:text-[8vw] z-10"
                >
                    <motion.span variants={fadeUp} className="text-[#E5E5E0]">DESIGN</motion.span>
                    <motion.span variants={fadeUp} className="text-[#E5E5E0]/80">DEVELOP</motion.span>
                    <motion.span variants={fadeUp} className="text-[#E5E5E0]/60">DELIVER</motion.span>
                </motion.div>

                {/* Right Skills Logo/Lists */}
                <motion.div 
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="col-span-1 md:col-span-4 flex flex-col gap-10 md:gap-16 mt-8 md:mt-0 w-full md:max-w-sm justify-self-end text-left md:text-right"
                >
                    <div className="flex justify-start md:justify-end">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">Skills</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 shrink-0 font-medium text-left">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[12px] md:text-sm font-bold tracking-tighter mb-2 text-[#E5E5E0]">Languages & Tools</h4>
                            <ul className="flex flex-col gap-2 text-[#E5E5E0]/60 text-sm md:text-base">
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>JavaScript</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Python</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Git / GitHub</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Postman</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Docker (Using AI)</motion.li>
                            </ul>
                        </div>
                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[12px] md:text-sm font-bold tracking-tighter mb-2 text-[#E5E5E0]">Frameworks</h4>
                            <ul className="flex flex-col gap-2 text-[#E5E5E0]/60 text-sm md:text-base">
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>React js</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Nodejs</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Expressjs</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Three.js</motion.li>
                                <motion.li whileHover={{ x: 5, color: "#fff" }}>Firebase</motion.li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

            </div>

        </section>
    );
}
