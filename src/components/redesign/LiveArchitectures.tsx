import React from 'react';
import { motion } from 'framer-motion';
import renderblob from '../../assets/images/renderblob.png';
import rheox from '../../assets/images/rheoxdashboard.png';

export default function LiveArchitectures() {
    return (
        <section id="architectures" className="relative bg-[#0E0E0E] text-[#E5E5E0] py-32 px-6 md:px-12 selection:bg-white selection:text-black">
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="border-b border-white/10 pb-8 mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
            >
                <div>
                    <h2 className="text-6xl sm:text-[10vw] md:text-[8vw] leading-none font-black tracking-[-0.04em] uppercase">
                        LIVE<br className="md:hidden" /> ARCHITECTURES
                    </h2>
                </div>
                <div className="flex gap-12 text-sm md:text-base mb-2 max-w-sm">
                    <span className="font-bold tracking-widest text-white/40 uppercase text-[10px] hidden sm:block">(SHOWCASE)</span>
                    <p className="font-medium leading-relaxed text-white/80">
                        Interactive web applications that are live and running
                    </p>
                </div>
            </motion.div>

            <div className="w-full flex justify-center py-6 md:py-12 relative h-[60vh] md:h-[80vh] group">
                
                {/* Floating Image 1 (Back left) */}
                <motion.div 
                    initial={{ opacity: 0, x: -50, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                    whileHover={{ y: -20, rotate: 0, zIndex: 50 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-[-2%] md:left-[10%] top-[15%] md:top-[15%] w-[85%] md:w-[45%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 cursor-pointer"
                >
                    <a href="https://renderblob-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="block w-full h-full relative group/item">
                        <img 
                            src={renderblob} 
                            alt="3D Render Interactive Blob" 
                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s]" 
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/60">
                            <span className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Explore Live</span>
                        </div>
                    </a>
                </motion.div>

                {/* Floating Image 2 (Front right) */}
                <motion.div 
                    initial={{ opacity: 0, x: 50, y: 30, rotate: 5 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, rotate: 2 }}
                    whileHover={{ y: -20, rotate: 0, zIndex: 50 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute right-[-2%] md:right-[15%] bottom-[15%] md:bottom-[5%] w-[90%] md:w-[50%] aspect-video rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 z-20 cursor-pointer"
                >
                    <a href="https://rheox.unnijsx.online/" target="_blank" rel="noreferrer" className="block w-full h-full relative group/item">
                        <img 
                            src={rheox} 
                            alt="Rheox Dashboard Overview" 
                            className="w-full h-full object-cover scale-[1.03] group-hover:scale-105 transition-transform duration-[1.5s]" 
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/60">
                            <span className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Explore Live</span>
                        </div>
                    </a>
                </motion.div>

            </div>

        </section>
    );
}
