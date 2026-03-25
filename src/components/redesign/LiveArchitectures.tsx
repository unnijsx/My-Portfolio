import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import renderblob from '../../assets/images/renderblob.png';
import rheox from '../../assets/images/rheoxdashboard.png';
import portfoliocreator from '../../assets/images/portfoliocreator.png';

interface LiveArchitecturesProps {
    isColorful?: boolean;
}

export default function LiveArchitectures({ isColorful }: LiveArchitecturesProps) {
    return (
        <section id="architectures" className={`relative transition-colors duration-1000 ${isColorful ? 'bg-transparent' : 'bg-[#0E0E0E]'} text-[#E5E5E0] py-32 px-6 md:px-12 selection:bg-white selection:text-black`}>
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className={`border-b transition-colors duration-500 ${isColorful ? 'border-purple-500/20' : 'border-white/10'} pb-8 mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10`}
            >
                <div>
                    <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] leading-none font-black tracking-[-0.04em] uppercase">
                        LIVE<br className="md:hidden" /> ARCHITECTURES
                    </h2>
                </div>
                <div className="flex gap-12 text-sm md:text-base mb-2 max-w-sm">
                    <span className={`font-bold tracking-widest uppercase text-[10px] hidden sm:block ${isColorful ? 'text-cyan-400/40' : 'text-white/40'}`}>(SHOWCASE)</span>
                    <p className={`font-medium leading-relaxed transition-colors ${isColorful ? 'text-white/80' : 'text-white/80'}`}>
                        Interactive web applications that are live and running
                    </p>
                </div>
            </motion.div>

            <div className="w-full flex justify-center py-6 md:py-12 relative h-[80vh] md:h-[100vh] group z-10">
                
                {/* Floating Image 1 (Back left) */}
                <motion.div 
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                    whileHover={{ y: -20, rotate: 0, zIndex: 100 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`absolute left-[-5%] md:left-[5%] top-[5%] md:top-[10%] w-[80%] md:w-[45%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 z-10 cursor-pointer ${
                        isColorful ? 'border-cyan-500/30' : 'border-white/10'
                    }`}
                >
                    <a href="https://renderblob-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="block w-full h-full relative group/item">
                        <img 
                            src={renderblob} 
                            alt="3D Render Interactive Blob" 
                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s]" 
                        />
                        <div className={`absolute inset-0 transition-colors duration-1000 ${isColorful ? 'bg-cyan-950/20 group-hover:bg-transparent' : 'bg-black/40 group-hover:bg-black/10'}`} />
                        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all">
                            <h4 className="text-xl font-black uppercase mb-1">RenderBlob</h4>
                            <p className="text-[10px] font-bold tracking-widest text-cyan-400">3D SPATIAL EXPLORATION</p>
                        </div>
                    </a>
                </motion.div>

                {/* Floating Image 2 (Front right) */}
                <motion.div 
                    initial={{ opacity: 0, x: 100, y: 50, rotate: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, rotate: 5 }}
                    whileHover={{ y: -20, rotate: 0, zIndex: 100 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`absolute right-[-5%] md:right-[5%] top-[20%] md:top-[25%] w-[85%] md:w-[50%] aspect-video rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border transition-all duration-500 z-20 cursor-pointer ${
                        isColorful ? 'border-purple-500/30' : 'border-white/10'
                    }`}
                >
                    <a href="https://rheox.unnijsx.online/" target="_blank" rel="noreferrer" className="block w-full h-full relative group/item">
                        <img 
                            src={rheox} 
                            alt="Rheox Dashboard Overview" 
                            className="w-full h-full object-cover scale-[1.03] group-hover:scale-105 transition-transform duration-[1.5s]" 
                        />
                         <div className={`absolute inset-0 transition-colors duration-1000 ${isColorful ? 'bg-purple-950/20 group-hover:bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`} />
                         <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all">
                            <h4 className="text-xl font-black uppercase mb-1">Rheox Dashboard</h4>
                            <p className="text-[10px] font-bold tracking-widest text-purple-400">SAAS ANALYTICS SYSTEM</p>
                        </div>
                    </a>
                </motion.div>

                {/* Floating Image 3 (Front center) */}
                <motion.div 
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -30, rotate: 0, zIndex: 100 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-[95%] md:w-[60%] aspect-video rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border transition-all duration-700 z-30 cursor-pointer ${
                        isColorful ? 'border-cyan-400/40 shadow-[0_0_50px_rgba(34,211,238,0.2)]' : 'border-white/20'
                    }`}
                >
                    <Link to="/portfoliocreator" className="block w-full h-full relative group/item">
                        <img 
                            src={portfoliocreator} 
                            alt="Portfolio Creator Interface" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                        />
                        <div className={`absolute inset-0 transition-colors duration-1000 ${isColorful ? 'bg-cyan-950/30' : 'bg-black/30 group-hover:bg-transparent'}`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] px-8 py-3 bg-white text-black rounded-full mb-4">OPEN BUILDER</span>
                            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">v1.2.0 ACTIVE</p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all">
                            <h4 className="text-4xl font-black uppercase mb-2 tracking-tighter">Portfolio Creator</h4>
                            <p className="text-[12px] font-bold tracking-[0.4em] text-cyan-400 uppercase">Interactive Builder Suite</p>
                        </div>
                    </Link>
                </motion.div>

            </div>

        </section>
    );
}
