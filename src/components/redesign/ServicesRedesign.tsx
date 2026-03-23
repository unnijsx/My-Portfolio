import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ServicesRedesign() {
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };

    const services = [
        { 
            num: "01", 
            title: "Full-Stack Development", 
            body: "Architecting robust MERN solutions. Skilled in developing scalable APIs, responsive user interfaces, and integrating cloud services (AWS/Firebase).", 
            items: ["React, Node.js, Express.js", "REST APIs, MongoDB", "Deployment"] 
        },
        { 
            num: "02", 
            title: "UI/UX & Frontend", 
            body: "Currently a MERN Stack Developer @ Srishti Innovative. I design and develop intuitive interfaces that work smoothly across devices, with a strong focus on pixel-perfect Figma translations.", 
            items: ["React, Material UI, Ant Design", "Figma → React Components", "Performance Optimization"] 
        }
    ];

    return (
        <section id="services" className="relative min-h-screen bg-[#0E0E0E] text-[#E5E5E0] py-32 px-6 md:px-12 selection:bg-white selection:text-black">
                       <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="border-b border-white/10 pb-8 mb-16 md:mb-20"
            >
                <h2 className="text-5xl sm:text-[10vw] leading-none font-black tracking-[-0.04em] uppercase">
                    WHAT I DO
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
                <div className="hidden md:block col-span-5 relative">
                    <motion.div 
                        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="sticky top-40 flex flex-col gap-8"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#E5E5E0]/40">
                            (ABOUT ME)
                        </p>
                        <h3 className="text-3xl font-black leading-tight border-l-2 border-white/20 pl-6 py-2">
                             A Developer based <br />
                             in <span className="text-white italic">India 🇮🇳</span>
                        </h3>
                        <div className="flex gap-4 items-center">
                            <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl">1+</div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Years Experience on<br/>MERN Projects</p>
                        </div>
                    </motion.div>
                </div>

                <div className="col-span-1 md:col-span-7 flex flex-col gap-10 md:gap-12 pb-[10vh] md:pb-[20vh]">
                    
                    <motion.p 
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-xl md:text-2xl font-medium leading-relaxed max-w-xl text-[#E5E5E0]/80 mb-8 md:mb-12"
                    >
                        I'm a detail-oriented and motivated MERN Stack Developer with experience in designing and building full-stack applications. I treat every problem as a puzzle to be solved with clean, efficient code.
                    </motion.p>

                    <div className="relative w-full">
                        {services.map((svc, i) => (
                            <ServiceCard key={i} svc={svc} index={i} totalCards={services.length} />
                        ))}
                    </div>

                </div>
            </div>

        </section>
    );
}

function ServiceCard({ svc, index, totalCards }: { svc: any, index: number, totalCards: number }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    // Mimic accordion slowly closing: use scaleY with originTop and reduce opacity to 0
    const scaleY = useTransform(scrollYProgress, [0, 1], [1, index === totalCards - 1 ? 1 : 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, index === totalCards - 1 ? 1 : 0]);
    // Extra depth: scale down slightly while closing
    const scale = useTransform(scrollYProgress, [0, 1], [1, index === totalCards - 1 ? 1 : 0.9]);

    return (
        <div ref={cardRef} className="h-[100vh] relative last:h-fit">
            <motion.div 
                style={{ scaleY, scale, opacity, translateZ: 0 }}
                className="sticky top-28 md:top-40 origin-top bg-[#0E0E0E] w-full flex flex-col md:flex-row gap-6 md:gap-24 border-t border-white/10 pt-8 md:pt-12 pb-8 md:pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-10 will-change-transform"
            >
                <div className="text-2xl md:text-4xl font-black tracking-tighter opacity-50">({svc.num})</div>
                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                    <h3 className="text-2xl md:text-5xl font-black tracking-tighter leading-tight">{svc.title}</h3>
                    <p className="text-base md:text-xl font-medium leading-relaxed max-w-md text-[#E5E5E0]/70">
                        {svc.body}
                    </p>
                    
                    <ul className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-4 w-full md:w-3/4">
                        {svc.items.map((item: string, j: number) => (
                            <li 
                                key={j}
                                className="flex gap-4 border-b border-white/10 pb-3 md:pb-4 items-center group cursor-default hover:border-white/40 transition-colors"
                            >
                                <span className="text-[10px] md:text-xs font-bold tracking-widest opacity-50 font-mono group-hover:text-white transition-colors">0{j+1}</span>
                                <span className="text-lg md:text-xl font-bold tracking-tight">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
