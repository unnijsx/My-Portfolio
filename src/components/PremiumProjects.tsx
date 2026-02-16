import React from "react";
import { PinContainer } from "./ui/3d-pin";

const projects = [
    {
        title: "Cookikko Platform",
        href: "https://github.com/unnijsx/Cookikko-A-Recipe-Sharing-Web-Frontend-",
        category: "Full Stack",
        description: "A beautiful recipe sharing platform with advanced search and social features built with React and Material-UI.",
        stats: { search: "Advanced", ui: "Material" },
        tags: ["React", "Material-UI", "GSAP"]
    },
    {
        title: "Job Portal MERN",
        href: "https://github.com/unnijsx/Job-Portal-using-MERN",
        category: "Full Stack",
        description: "Robust recruitment platform with user authentication, job posting, and application tracking system.",
        stats: { stack: "MERN", auth: "JWT" },
        tags: ["MongoDB", "Express", "React", "Node"]
    },
    {
        title: "Dress-Itto Store",
        href: "https://github.com/unnijsx/Dress-Itto",
        category: "E-commerce",
        description: "Modern e-commerce platform for fashion retail with cart functionality and seamless payment integration.",
        stats: { retail: "Fashion", features: "Cart" },
        tags: ["React", "E-commerce", "ContextAPI"]
    }
];

export default function PremiumProjects() {
    return (
        <div className="py-32 bg-bg-primary transition-colors duration-500" id="projects">
            <div className="container mx-auto px-6">
                <div className="reveal mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-text-primary">
                        Featured <span className="text-secondary">Engineering</span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        A selection of my best works, built with precision and modern architectural patterns.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-32">
                    {projects.map((project, index) => (
                        <PinContainer
                            key={index}
                            title={project.title}
                            href={project.href}
                        >
                            <div className="flex flex-col p-4 tracking-tight text-text-primary/50 w-[20rem] h-[20rem] bg-bg-primary dark:bg-bg-secondary/30 backdrop-blur-sm border border-border-color rounded-2xl group shadow-xl dark:shadow-none transition-all duration-500">
                                {/* Header */}
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full bg-primary animate-pulse" />
                                    <div className="text-xs text-text-secondary capitalize font-bold tracking-widest">{project.category}</div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 mt-4 space-y-4">
                                    <div className="text-2xl font-black text-text-primary leading-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </div>

                                    <p className="text-sm line-clamp-2 text-text-secondary leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(project.stats).map(([key, value]) => (
                                            <div key={key} className="space-y-1">
                                                <div className="text-xl font-black text-primary">{value}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">{key}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Animated Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 opacity-80">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full border border-border-color bg-bg-primary font-bold text-text-secondary uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-end pt-2">
                                        <div className="text-[10px] text-text-secondary/60 font-medium uppercase tracking-tighter">
                                            System Operational
                                        </div>
                                        <div className="text-primary text-sm font-black tracking-tighter uppercase group-hover:translate-x-1 transition-transform">
                                            Inspect →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PinContainer>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .wave-animation {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
