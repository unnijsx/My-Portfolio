import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface ServicesRedesignProps {
    isColorful?: boolean;
}

export default function ServicesRedesign({ isColorful }: ServicesRedesignProps) {
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
        },
        { 
            num: "03", 
            title: "SEO Optimization", 
            body: "Optimizing search visibility and technical performance. I implement search engine strategies, schema structured data, semantic HTML, and core web vitals speed-tuning to rank websites high on Google.", 
            items: ["Technical SEO & Schema.org", "Google Search Console & Indexing", "Performance & Speed Tuning"] 
        },
        { 
            num: "04", 
            title: "Hosting & Deployment", 
            body: "Providing complete cloud infrastructure and deployment. I manage secure hosting for frontend interfaces and backend APIs, configure server environments, and handle end-to-end DNS and SSL setups.", 
            items: ["Cloud Hosting & Serverless APIs", "End-to-End DNS & SSL Configuration", "CI/CD Pipelines & Deployments"] 
        }
    ];

    return (
        <section id="services" className={`relative min-h-screen transition-colors duration-1000 ${isColorful ? 'bg-transparent' : 'bg-[#0E0E0E]'} text-[#E5E5E0] pt-32 pb-8 px-6 md:px-12 selection:bg-white selection:text-black`}>
            <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className={`border-b transition-colors duration-500 ${isColorful ? 'border-purple-500/20' : 'border-white/10'} pb-8 mb-16 md:mb-20 z-10 relative`}
            >
                <h2 className="text-[12vw] sm:text-[10vw] leading-none font-black tracking-[-0.04em] uppercase">
                    WHAT I DO
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10">
                <div className="hidden md:block col-span-5 relative">
                    <motion.div 
                        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="sticky top-40 flex flex-col gap-8"
                    >
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${isColorful ? 'text-cyan-400/50' : 'text-[#E5E5E0]/40'}`}>
                            (ABOUT ME)
                        </p>
                        <h3 className={`text-3xl font-black leading-tight border-l-2 pl-6 py-2 transition-colors duration-500 ${isColorful ? 'border-purple-500/40' : 'border-white/20'}`}>
                             Web Developer based <br />
                             in <span className={`${isColorful ? 'text-cyan-400' : 'text-white'} italic transition-colors`}>Kerala, India 🇮🇳</span>
                        </h3>
                        <div className="flex gap-4 items-center">
                            <div className={`size-12 rounded-full flex items-center justify-center font-bold text-xl border transition-all duration-500 ${isColorful ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10'}`}>1+</div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Years Experience on<br/>MERN Projects</p>
                        </div>
                    </motion.div>
                </div>

                <div className="col-span-1 md:col-span-7 flex flex-col gap-10 md:gap-12 pb-8">
                    
                    <motion.p 
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className={`text-xl md:text-2xl font-medium leading-relaxed max-w-xl mb-8 md:mb-12 transition-colors duration-500 ${isColorful ? 'text-white/90' : 'text-[#E5E5E0]/80'}`}
                    >
                        I'm Unnikrishnan V P, a professional freelance web developer and MERN stack expert based in Kerala, India. If you are looking for an expert MERN developer or custom website design, I specialize in building high-performance systems and robust technical SEO setups to turn complex business needs into clean, lightning-fast digital solutions.
                    </motion.p>

                    <div className="relative w-full">
                        {services.map((svc, i) => (
                            <ServiceCard key={i} svc={svc} index={i} totalCards={services.length} isColorful={isColorful} />
                        ))}
                    </div>

                </div>
            </div>

        </section>
    );
}

function ServiceCard({ svc, index, totalCards, isColorful }: { svc: any, index: number, totalCards: number, isColorful?: boolean }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    // Elegant stacking deck animation: uniform scale down, translate up, and fade slightly
    const scale = useTransform(scrollYProgress, [0, 1], [1, index === totalCards - 1 ? 1 : 0.94]);
    const y = useTransform(scrollYProgress, [0, 1], [0, index === totalCards - 1 ? 0 : -25]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, index === totalCards - 1 ? 1 : 0.5]);

    return (
        <div ref={cardRef} className="h-[90vh] md:h-[100vh] relative last:h-fit flex items-start">
            <motion.div 
                style={{ scale, y, opacity, translateZ: 0 }}
                className={`sticky top-28 md:top-36 origin-top w-full flex flex-col md:flex-row gap-6 md:gap-16 p-8 md:p-12 rounded-[2rem] border shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10 will-change-transform transition-all duration-700 ${
                    isColorful 
                        ? 'bg-[#0F0D15]/95 border-purple-500/15 shadow-purple-900/10' 
                        : 'bg-[#121212]/98 border-white/10 shadow-black/80'
                }`}
            >
                <div className={`text-2xl md:text-4xl font-black tracking-tighter transition-colors duration-500 ${isColorful ? 'text-purple-400/50' : 'opacity-50'}`}>({svc.num})</div>
                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                    <h3 className={`text-2xl md:text-5xl font-black tracking-tighter leading-tight transition-colors duration-500 ${isColorful ? 'text-white' : ''}`}>{svc.title}</h3>
                    <p className={`text-base md:text-xl font-medium leading-relaxed max-w-md transition-colors duration-500 ${isColorful ? 'text-white/60' : 'text-[#E5E5E0]/70'}`}>
                        {svc.body}
                    </p>
                    
                    <ul className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-4 w-full md:w-3/4">
                        {svc.items.map((item: string, j: number) => (
                            <li 
                                key={j}
                                className={`flex gap-4 border-b pb-3 md:pb-4 items-center group cursor-default transition-all duration-300 ${
                                    isColorful ? 'border-white/5 hover:border-cyan-500/40' : 'border-white/10 hover:border-white/40'
                                }`}
                            >
                                <span className={`text-[10px] md:text-xs font-bold tracking-widest font-mono transition-colors duration-300 ${isColorful ? 'text-purple-400/40 group-hover:text-cyan-400' : 'opacity-50 group-hover:text-white'}`}>0{j+1}</span>
                                <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isColorful ? 'text-white/80 group-hover:text-white' : ''}`}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
