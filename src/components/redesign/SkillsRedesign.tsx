import { motion, AnimatePresence } from 'framer-motion';

interface SkillsRedesignProps {
    isColorful?: boolean;
}

export default function SkillsRedesign({ isColorful }: SkillsRedesignProps) {
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };

    const containerVars = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    return (
        <section id="skills" className={`relative min-h-screen transition-colors duration-1000 ${isColorful ? 'bg-[#0A0A0B]' : 'bg-[#0E0E0E]'} text-[#E5E5E0] py-32 px-6 md:px-12 selection:bg-white selection:text-black flex flex-col justify-between overflow-hidden`}>
            
            {/* Aurora Background Blobs */}
            <AnimatePresence>
                {isColorful && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <motion.div 
                            animate={{ 
                                x: [0, 50, -30], 
                                y: [0, -40, 40],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-600/10 blur-[120px]" 
                        />
                        <motion.div 
                            animate={{ 
                                x: [0, -50, 30], 
                                y: [0, 40, -40],
                                scale: [1, 1.15, 0.95]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/10 blur-[130px]" 
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start relative z-10 w-full">
                
                {/* Left Big Typography */}
                <motion.div 
                    variants={containerVars}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="col-span-1 md:col-span-8 flex flex-col leading-[0.85] font-black tracking-[-0.04em] uppercase text-[12.5vw] sm:text-[12vw] md:text-[8vw] z-10"
                >
                    <motion.span variants={fadeUp} className={`transition-all duration-700 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]' : 'text-[#E5E5E0]'}`}>DESIGN</motion.span>
                    <motion.span variants={fadeUp} className={`transition-all duration-700 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'text-[#E5E5E0]/80'}`}>DEVELOP</motion.span>
                    <motion.span variants={fadeUp} className={`transition-all duration-700 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 opacity-60' : 'text-[#E5E5E0]/60'}`}>DELIVER</motion.span>
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
                        <h2 className={`text-5xl md:text-8xl font-black tracking-tighter transition-colors ${isColorful ? 'text-white' : ''}`}>Skills</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 shrink-0 font-medium text-left">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <h4 className={`text-[12px] md:text-sm font-bold tracking-tighter mb-2 transition-colors ${isColorful ? 'text-cyan-400' : 'text-[#E5E5E0]'}`}>Languages & Tools</h4>
                            <ul className={`flex flex-col gap-2 transition-colors text-sm md:text-base ${isColorful ? 'text-white/60' : 'text-[#E5E5E0]/60'}`}>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#22d3ee" : "#fff" }} className="transition-colors">JavaScript</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#22d3ee" : "#fff" }} className="transition-colors">Python</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#22d3ee" : "#fff" }} className="transition-colors">Git / GitHub</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#22d3ee" : "#fff" }} className="transition-colors">Postman</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#22d3ee" : "#fff" }} className="transition-colors">Docker (Using AI)</motion.li>
                            </ul>
                        </div>
                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <h4 className={`text-[12px] md:text-sm font-bold tracking-tighter mb-2 transition-colors ${isColorful ? 'text-purple-400' : 'text-[#E5E5E0]'}`}>Frameworks</h4>
                            <ul className={`flex flex-col gap-2 transition-colors text-sm md:text-base ${isColorful ? 'text-white/60' : 'text-[#E5E5E0]/60'}`}>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#a855f7" : "#fff" }} className="transition-colors">React js</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#a855f7" : "#fff" }} className="transition-colors">Nodejs</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#a855f7" : "#fff" }} className="transition-colors">Expressjs</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#a855f7" : "#fff" }} className="transition-colors">Three.js</motion.li>
                                <motion.li whileHover={{ x: 5, color: isColorful ? "#a855f7" : "#fff" }} className="transition-colors">Firebase</motion.li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

            </div>

        </section>
    );
}
