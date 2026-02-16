import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ArrowUpRight,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';
import cvPdf from './assets/UNNIKISHNAN_MERN-CV.pdf';
import myimage from './assets/1_1.jpg';

// --- Minimalist Components ---

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { name: 'Work', href: '#work' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <a href="#" className="text-xl font-medium tracking-tight text-white">
                    Unni<span className="text-gray-500">.jsx</span>
                </a>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className="hover:text-white transition-colors">
                            {link.name}
                        </a>
                    ))}
                    <a href={cvPdf} download className="text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
                        Resume
                    </a>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-background border-b border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-6 text-lg text-gray-300">
                            {links.map((link) => (
                                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
                                    {link.name}
                                </a>
                            ))}
                            <a href={cvPdf} download className="text-white">Resume</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl text-center"
            >
                <h2 className="text-sm md:text-base text-gray-400 mb-6 tracking-widest uppercase">
                    Full Stack Architect
                </h2>
                <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-white mb-8 leading-[1.1]">
                    Crafting digital <br className="hidden md:block" />
                    <span className="text-gray-500">experiences</span> with <br className="hidden md:block" />
                    precision & purpose.
                </h1>
                <p className="max-w-xl mx-auto text-lg text-gray-400 leading-relaxed mb-10">
                    I build robust, scalable applications using the MERN stack.
                    Focusing on cleanliness, performance, and user-centric design.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <a href="#work" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        View Work
                    </a>
                    <a href="mailto:contact@unnijsx.online" className="border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                        Contact Me
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12"
            >
                <ChevronDown className="text-gray-600 animate-bounce" />
            </motion.div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group block"
        >
            <div className="relative aspect-video bg-surface rounded-xl overflow-hidden mb-6 border border-white/5 group-hover:border-white/20 transition-colors">
                {/* Placeholders for project images - minimalist abstract shapes */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>

                <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur text-xs text-white rounded-full mb-3 border border-white/10">
                        {project.year}
                    </span>
                </div>

                <div className="absolute top-6 right-6 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="text-black w-4 h-4" />
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-200 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end max-w-[120px]">
                    {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.a>
    );
};

const Projects = () => {
    const projects = [
        {
            title: 'Cookikko',
            year: '2024',
            tags: ['React', 'Node.js'],
            description: 'Social recipe sharing platform.',
            link: 'https://github.com/unnijsx/Cookikko-A-Recipe-Sharing-Web-Frontend-',
        },
        {
            title: 'Job Portal',
            year: '2023',
            tags: ['MERN', 'Redux'],
            description: 'Full-stack ATS & Job Board.',
            link: 'https://github.com/unnijsx/Job-Portal-using-MERN',
        },
        {
            title: 'Dress Itto',
            year: '2023',
            tags: ['E-commerce', 'Stripe'],
            description: 'Modern fashion retail app.',
            link: 'https://github.com/unnijsx/Dress-Itto',
        },
        {
            title: 'Portfolio V1',
            year: '2023',
            tags: ['React', 'Three.js'],
            description: 'Previous 3D portfolio iteration.',
            link: 'https://unnijsx.online',
        },
    ];

    return (
        <section id="work" className="py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-20">
                    <h2 className="text-3xl text-white font-medium tracking-tight">Selected Work</h2>
                    <span className="text-sm text-gray-500">2023 — Present</span>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="py-32 px-6 bg-surface/30 border-t border-white/5">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <img src={myimage} alt="Unnikrishnan" className="rounded-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-square" />
                </div>
                <div>
                    <h2 className="text-3xl text-white font-medium mb-8">About Me</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        I am a developer who values clarity over complexity. My work bridges the gap
                        between robust backend logic and elegant frontend experiences.
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Specializing in the MERN stack, I build systems that are scalable, maintainable,
                        and performant. I believe good design is invisible—it just works.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-white">
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-500 uppercase text-xs tracking-widest">Stack</span>
                            <span>MongoDB</span>
                            <span>Express.js</span>
                            <span>React</span>
                            <span>Node.js</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-500 uppercase text-xs tracking-widest">Tools</span>
                            <span>Git & GitHub</span>
                            <span>Docker</span>
                            <span>AWS (Basic)</span>
                            <span>Figma</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer id="contact" className="py-32 px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-8">
                Let's work together.
            </h2>
            <p className="text-gray-400 mb-12 max-w-lg mx-auto">
                Available for freelance projects and full-time opportunities.
            </p>
            <a href="mailto:contact@unnijsx.online" className="inline-block bg-white text-black px-10 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Get in Touch
            </a>

            <div className="mt-32 flex justify-center gap-8 text-gray-500">
                <a href="https://github.com/unnijsx" className="hover:text-white transition-colors"><Github /></a>
                <a href="https://linkedin.com/in/unnikrishnanvp" className="hover:text-white transition-colors"><Linkedin /></a>
                <a href="mailto:contact@unnijsx.online" className="hover:text-white transition-colors"><Mail /></a>
            </div>
            <p className="mt-8 text-xs text-gray-600">© {new Date().getFullYear()} Unni.JSX</p>
        </footer>
    );
};

const HomeMinimal = () => {
    return (
        <main className="bg-background min-h-screen text-primary font-sans selection:bg-white selection:text-black">
            <Navbar />
            <Hero />
            <Projects />
            <About />
            <Footer />
        </main>
    );
};

export default HomeMinimal;
