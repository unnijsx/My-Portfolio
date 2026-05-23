import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import renderblob from '../../assets/images/renderblob.png';
import rheox from '../../assets/images/rheoxdashboard.png';
import portfoliocreator from '../../assets/images/portfoliocreator.png';
import rheoxservices from '../../assets/images/rheoxservices.png';
import niranjanportfolio from '../../assets/images/niranjanportfolio.png';

interface LiveArchitecturesProps {
    isColorful?: boolean;
}

const PROJECTS_DATA = [
    {
        title: "Portfolio Creator",
        category: "BUILDER SUITE",
        image: portfoliocreator,
        link: "/portfoliocreator",
        isInternal: true,
        colorClass: "border-cyan-500/10 bg-cyan-950/5 hover:border-cyan-500/30 text-cyan-400",
        colorText: "text-cyan-400",
        colorBorder: "border-cyan-500/20",
        colorGlow: "shadow-[0_0_40px_rgba(34,211,238,0.04)] hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] hover:border-cyan-500/30"
    },
    {
        title: "Rheox Dev Services",
        category: "CREATIVE DIGITAL PRODUCTION",
        image: rheoxservices,
        link: "https://development.rheox.online/",
        isInternal: false,
        colorClass: "border-rose-500/10 bg-rose-950/5 hover:border-rose-500/30 text-rose-400",
        colorText: "text-rose-400",
        colorBorder: "border-rose-500/20",
        colorGlow: "shadow-[0_0_40px_rgba(244,63,94,0.04)] hover:shadow-[0_0_50px_rgba(244,63,94,0.15)] hover:border-rose-500/30"
    },
    {
        title: "RenderBlob Portfolio",
        category: "Portfolio",
        image: renderblob,
        link: "https://renderblob-portfolio.vercel.app/",
        isInternal: false,
        colorClass: "border-blue-500/10 bg-blue-950/5 hover:border-blue-500/30 text-blue-400",
        colorText: "text-blue-400",
        colorBorder: "border-blue-500/20",
        colorGlow: "shadow-[0_0_40px_rgba(59,130,246,0.04)] hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:border-blue-500/30"
    },
    {
        title: "Niranjan Portfolio",
        category: "Portfolio",
        image: niranjanportfolio,
        link: "https://niranjan.rheox.online/",
        isInternal: false,
        colorClass: "border-amber-500/10 bg-amber-950/5 hover:border-amber-500/30 text-amber-400",
        colorText: "text-amber-400",
        colorBorder: "border-amber-500/20",
        colorGlow: "shadow-[0_0_40px_rgba(245,158,11,0.04)] hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] hover:border-amber-500/30"
    },
    {
        title: "Rheox Dashboard",
        category: "DISCORD BOT DASHBOARD",
        image: rheox,
        link: "https://cloud.rheox.online/",
        isInternal: false,
        colorClass: "border-purple-500/10 bg-purple-950/5 hover:border-purple-500/30 text-purple-400",
        colorText: "text-purple-400",
        colorBorder: "border-purple-500/20",
        colorGlow: "shadow-[0_0_40px_rgba(168,85,247,0.04)] hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:border-purple-500/30"
    }
];

export default function LiveArchitectures({ isColorful }: LiveArchitecturesProps) {
    return (
        <section id="works" className={`relative transition-colors duration-1000 ${isColorful ? 'bg-transparent' : 'bg-[#0E0E0E]'} text-[#E5E5E0] pt-8 pb-32 px-6 md:px-12 selection:bg-white selection:text-black`}>
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

            {/* Premium, responsive Grid - High performance, no overloading */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
                {PROJECTS_DATA.map((project, index) => {
                    const CardWrapper = ({ children, className }: { children: React.ReactNode; className: string }) => {
                        if (project.isInternal) {
                            return <Link to={project.link} className={className}>{children}</Link>;
                        }
                        return <a href={project.link} target="_blank" rel="noreferrer" className={className}>{children}</a>;
                    };

                    return (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`group rounded-3xl overflow-hidden border ${
                                isColorful ? 'border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-white/10' : 'border-white/10 bg-[#141416] hover:border-white/20'
                            } ${project.colorGlow} p-4 flex flex-col justify-between transition-all duration-500`}
                        >
                            <CardWrapper className="block w-full flex-grow">
                                {/* Image Box with Lazy Loading and GPU-safe transitions */}
                                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative bg-black/40 border border-white/5 flex items-center justify-center">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Typography Section */}
                                <div className="px-2">
                                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${project.colorText}`}>
                                        {project.category}
                                    </p>
                                    <h3 className="text-2xl font-black uppercase mb-4 tracking-tight leading-none text-[#E5E5E0]">
                                        {project.title}
                                    </h3>
                                </div>
                            </CardWrapper>

                            {/* Standardized "View Live" button */}
                            <div className="mt-4 px-2 pb-2 flex justify-start items-center">
                                <CardWrapper className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                                    isColorful 
                                    ? `bg-white/5 hover:bg-white/10 ${project.colorText} border border-white/10` 
                                    : 'bg-white text-black hover:bg-white/90'
                                }`}>
                                    <span>VIEW LIVE</span>
                                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </CardWrapper>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
