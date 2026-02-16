import React, { useEffect, useRef } from "react";
import {
    ArrowRight,
    Play,
    Target,
    Crown,
    Star,
    Layout,
    Server,
    Database,
    Code2,
    Zap,
    Cpu
} from "lucide-react";

// Video imports
import whitetodark from "../../assets/videos/whitetodark.mp4";
import darktowhite from "../../assets/videos/darktowhite.mp4";

const TECH_STACK = [
    { name: "React", icon: Layout },
    { name: "Node.js", icon: Server },
    { name: "MongoDB", icon: Database },
    { name: "JavaScript", icon: Code2 },
    { name: "Express", icon: Zap },
    { name: "Tailwind", icon: Cpu },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
        <span className="text-xl font-bold text-text-primary sm:text-2xl">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-text-secondary font-medium sm:text-xs">{label}</span>
    </div>
);

interface HeroSectionProps {
    isDark: boolean;
    isTransitioning: boolean;
    transitionType: 'to-dark' | 'to-light' | null;
}

export default function HeroSection({ isDark, isTransitioning, transitionType }: HeroSectionProps) {
    const videoRefWtoD = useRef<HTMLVideoElement>(null);
    const videoRefDtoW = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isTransitioning) {
            if (transitionType === 'to-dark' && videoRefWtoD.current) {
                videoRefWtoD.current.currentTime = 0;
                videoRefWtoD.current.play().catch(() => { });
            } else if (transitionType === 'to-light' && videoRefDtoW.current) {
                videoRefDtoW.current.currentTime = 0;
                videoRefDtoW.current.play().catch(() => { });
            }
        } else {
            // Static frames when not transitioning
            if (isDark) {
                if (videoRefDtoW.current) videoRefDtoW.current.currentTime = 0;
            } else {
                if (videoRefWtoD.current) videoRefWtoD.current.currentTime = 0;
            }
        }
    }, [isTransitioning, transitionType, isDark]);

    // Only apply inversion during the specific transition phase
    const textInvertClass = isTransitioning ? "transition-text-invert" : "";

    return (
        <div className="relative w-full bg-bg-primary text-text-primary overflow-hidden font-sans transition-colors duration-1000">
            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-fade-in {
                    animation: fadeSlideIn 0.8s ease-out forwards;
                    opacity: 0;
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
            `}</style>

            {/* Video Background Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRefWtoD}
                    src={whitetodark}
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${(transitionType === 'to-dark' || (!isTransitioning && !isDark)) ? 'opacity-40' : 'opacity-0'
                        }`}
                />

                <video
                    ref={videoRefDtoW}
                    src={darktowhite}
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${(transitionType === 'to-light' || (!isTransitioning && isDark)) ? 'opacity-40' : 'opacity-0'
                        }`}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/20 via-transparent to-bg-primary/80 pointer-events-none" />

                {/* Glassmorphism Backdrop Blur Layer */}
                <div className="absolute inset-0 backdrop-blur-[3px] bg-bg-primary/5 pointer-events-none" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8 text-left">
                        <div className="animate-fade-in delay-100 flex justify-start">
                            <div className="inline-flex items-center gap-2 rounded-full border border-border-color bg-bg-secondary/50 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-bg-secondary">
                                <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-2 ${textInvertClass}`}>
                                    MERN Stack Developer
                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                </span>
                            </div>
                        </div>

                        <h1 className={`animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] transition-all duration-700 
                            ${isTransitioning ? "text-white mix-blend-difference" : "text-text-primary"}`}>
                            Crafting Digital<br />
                            <span className={isTransitioning ? "text-white" : "bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent"}>
                                Logic
                            </span><br />
                            Across Scales
                        </h1>

                        <p className={`animate-fade-in delay-300 max-w-xl text-lg text-text-secondary leading-relaxed font-medium ${textInvertClass}`}>
                            I build high-performance web applications with a focus on seamless user experiences
                            and robust backend architecture. Turning complex logic into elegant solutions.
                        </p>

                        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
                            <a href="#projects" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20">
                                View My Works
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a href="#about" className={`group inline-flex items-center justify-center gap-2 rounded-full border border-border-color bg-bg-secondary/50 px-8 py-4 text-sm font-bold text-text-primary backdrop-blur-sm transition-colors hover:bg-bg-secondary hover:border-text-primary/20 ${textInvertClass}`}>
                                <Play className="w-4 h-4 fill-current" />
                                About Me
                            </a>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-5 space-y-6 lg:mt-12">
                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-border-color bg-bg-secondary/50 p-8 backdrop-blur-xl shadow-2xl transition-colors duration-1000">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className={`text-3xl font-black tracking-tight text-text-primary transition-colors duration-1000 ${textInvertClass}`}>10+</div>
                                        <div className={`text-sm text-text-secondary transition-colors duration-1000 ${textInvertClass}`}>Projects Completed</div>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className={`text-text-secondary font-medium uppercase tracking-wider ${textInvertClass}`}>MERN Proficiency</span>
                                        <span className={`text-text-primary font-bold ${textInvertClass}`}>95%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-border-color/50">
                                        <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                                    </div>
                                </div>
                                <div className="h-px w-full bg-border-color mb-6" />
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className={`${textInvertClass}`}>
                                        <StatItem value="1+" label="Years" />
                                    </div>
                                    <div className="w-px h-full bg-border-color mx-auto" />
                                    <div className={`${textInvertClass}`}>
                                        <StatItem value="India" label="Based" />
                                    </div>
                                    <div className="w-px h-full bg-border-color mx-auto" />
                                    <div className={`${textInvertClass}`}>
                                        <StatItem value="100%" label="Commit" />
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-2">
                                    <div className={`inline-flex items-center gap-1.5 rounded-full border border-border-color bg-bg-bg-primary/50 dark:bg-bg-secondary px-3 py-1 text-[10px] font-bold tracking-wide text-text-secondary ${textInvertClass}`}>
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        AVAILABLE FOR HIRE
                                    </div>
                                    <div className={`inline-flex items-center gap-1.5 rounded-full border border-border-color bg-bg-bg-primary/50 dark:bg-bg-secondary px-3 py-1 text-[10px] font-bold tracking-wide text-text-secondary ${textInvertClass}`}>
                                        <Crown className="w-3 h-3 text-secondary" />
                                        MERN STACK
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-border-color bg-bg-secondary/50 py-8 backdrop-blur-xl transition-colors duration-1000">
                            <h3 className={`mb-6 px-8 text-sm font-bold uppercase tracking-widest text-text-secondary ${textInvertClass}`}>Technical Arsenal</h3>
                            <div className="relative flex overflow-hidden lg:mask-fade">
                                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                                    {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                                        <div key={i} className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-110 cursor-default">
                                            <tech.icon className="h-6 w-6 text-primary" />
                                            <span className={`text-lg font-black text-text-primary tracking-tight uppercase transition-colors duration-1000 ${textInvertClass}`}>
                                                {tech.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
