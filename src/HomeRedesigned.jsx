import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Menu,
    X,
    ChevronRight,
    Send,
    Layout,
    Server,
    Database,
    Code2,
    ExternalLink,
    Sun,
    Moon,
    Download
} from 'lucide-react';
import cvPdf from './assets/UNNIKISHNAN_MERN-CV.pdf';
import myimage from './assets/1_1.jpg';

// Core Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Navbar = ({ isDark, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-md py-4 shadow-sm dark:shadow-none' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="text-2xl font-black tracking-tighter text-text-primary-light dark:text-white">
                    UNNI<span className="text-primary">.JSX</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative text-text-secondary-light dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors group text-sm font-medium uppercase tracking-wide"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </a>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/20 text-orange-500 dark:text-yellow-400 transition-all shadow-sm flex items-center justify-center"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} className="fill-current" /> : <Moon size={20} className="fill-current" />}
                    </button>

                    <a
                        href={cvPdf}
                        download
                        className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-all rounded-full font-bold text-sm uppercase tracking-wide"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-orange-500 dark:text-yellow-400 shadow-sm"
                    >
                        {isDark ? <Sun size={20} className="fill-current" /> : <Moon size={20} className="fill-current" />}
                    </button>
                    <button
                        className="text-text-primary-light dark:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "tween" }}
                            className="fixed inset-0 bg-light dark:bg-dark z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-text-primary-light dark:text-white hover:text-primary"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-light dark:bg-dark pt-20 transition-colors duration-500">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 dark:bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                {/* Slanted Overlay */}
                <div className="absolute inset-0 bg-white/40 dark:bg-dark/40 z-10 clip-slant-right backdrop-blur-[1px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.p variants={fadeInUp} className="text-secondary font-bold tracking-widest uppercase mb-4">MERN Stack Developer</motion.p>
                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-text-primary-light dark:text-white mb-6 leading-tight">
                        Crafting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Logic</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-text-secondary-light dark:text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                        I build high-performance web applications with a focus on seamless user experiences and robust backend architecture.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                        <a href="#projects" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1">
                            View Works
                        </a>
                        <a href="https://github.com/unnijsx" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg text-text-secondary-light dark:text-gray-300 hover:text-primary dark:hover:text-white hover:border-primary dark:hover:border-white transition-all">
                            <Github />
                        </a>
                        <a href="https://linkedin.com/in/unnikrishnanvp" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-3 border border-gray-300 dark:border-gray-700 rounded-lg text-text-secondary-light dark:text-gray-300 hover:text-primary dark:hover:text-white hover:border-primary dark:hover:border-white transition-all">
                            <Linkedin />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden md:block"
                >
                    {/* Image Container with Slanted Border */}
                    <div className="relative w-[400px] h-[500px] mx-auto">
                        <div className="absolute inset-0 border-2 border-primary/30 transform translate-x-4 translate-y-4 rounded-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl overflow-hidden shadow-2xl">
                            <img src={myimage} alt="Unnikrishnan" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Skills = () => {
    const skills = [
        { name: "React / Next.js", icon: <Layout className="w-8 h-8 text-primary" />, level: "Advanced" },
        { name: "Node.js / Express", icon: <Server className="w-8 h-8 text-secondary" />, level: "Advanced" },
        { name: "MongoDB", icon: <Database className="w-8 h-8 text-green-400" />, level: "Intermediate" },
        { name: "JavaScript (ES6+)", icon: <Code2 className="w-8 h-8 text-yellow-400" />, level: "Expert" },
        { name: "Tailwind CSS", icon: <Layout className="w-8 h-8 text-cyan-400" />, level: "Advanced" },
        { name: "Git / CI/CD", icon: <Code2 className="w-8 h-8 text-orange-500" />, level: "Intermediate" },
    ];

    return (
        <section id="skills" className="py-24 bg-light-paper dark:bg-dark-paper relative clip-slant-left overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-200/[0.04] dark:bg-grid-white/[0.02] -z-10" />
            <div className="container mx-auto px-6 mt-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-text-primary-light dark:text-white mb-4">Technical <span className="text-primary">Arsenal</span></h2>
                    <p className="text-text-secondary-light dark:text-gray-400 max-w-2xl mx-auto">My weapon of choice for conquering the digital frontier.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/50 transition-all shadow-lg dark:shadow-none hover:shadow-primary/10 group"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                                    {skill.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary-light dark:text-white">{skill.name}</h3>
                                    <span className="text-xs text-secondary font-mono bg-secondary/10 px-2 py-1 rounded">{skill.level}</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '85%' : '75%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Projects = () => {
    const projects = [
        {
            title: 'Cookikko Recipe Platform',
            description: 'A beautiful recipe sharing platform with advanced search and social features built with React and Material-UI.',
            tags: ['React', 'Material-UI', 'GSAP'],
            link: 'https://github.com/unnijsx/Cookikko-A-Recipe-Sharing-Web-Frontend-',
            color: 'from-orange-500 to-red-600'
        },
        {
            title: 'Job Portal MERN Stack',
            description: 'Full-stack job portal with user authentication, job posting, and application tracking system.',
            tags: ['MERN Stack', 'JWT', 'REST API'],
            link: 'https://github.com/unnijsx/Job-Portal-using-MERN',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'E-commerce Fashion Store',
            description: 'Modern e-commerce platform for fashion retail with cart functionality and payment integration.',
            tags: ['React', 'E-commerce', 'UI/UX'],
            link: 'https://github.com/unnijsx/Dress-Itto',
            color: 'from-purple-500 to-pink-600'
        },
    ];

    return (
        <section id="projects" className="py-24 bg-light dark:bg-dark relative transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-text-primary-light dark:text-white mb-4">Featured <span className="text-secondary">Projects</span></h2>
                        <p className="text-text-secondary-light dark:text-gray-400">A selection of my best works.</p>
                    </div>
                    <a href="https://github.com/unnijsx?tab=repositories" target="_blank" rel="noreferrer" className="hidden md:flex items-center text-primary font-bold hover:underline">
                        View All Github <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-dark-paper border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-secondary/30 transition-all shadow-xl dark:shadow-none"
                        >
                            <div className={`md:w-1/2 min-h-[300px] bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center p-10`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                                <Code2 className="text-white w-24 h-24 opacity-50 transform group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-gray-100 dark:bg-white/5 text-text-secondary-light dark:text-gray-300 px-3 py-1 rounded-full text-xs font-mono border border-gray-200 dark:border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl font-bold text-text-primary-light dark:text-white mb-4 group-hover:text-secondary transition-colors">{project.title}</h3>
                                <p className="text-text-secondary-light dark:text-gray-400 mb-8 leading-relaxed">
                                    {project.description}
                                </p>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center font-bold text-text-primary-light dark:text-white hover:text-primary transition-colors"
                                >
                                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-light-paper dark:bg-dark-paper relative clip-slant-right transition-colors duration-500">
            <div className="container mx-auto px-6 pt-12">
                <div className="max-w-4xl mx-auto bg-white dark:bg-dark border border-gray-100 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative Blob */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>

                    <div className="text-center mb-12 relative z-10">
                        <h2 className="text-4xl font-black text-text-primary-light dark:text-white mb-4">Let's <span className="text-primary">Talk</span></h2>
                        <p className="text-text-secondary-light dark:text-gray-400">Have a project in mind or want to hire me? Send a message.</p>
                    </div>

                    <form action="https://formcarry.com/s/M5yYOL89oqa" method="POST" className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-secondary-light dark:text-gray-400 uppercase">Name</label>
                                <input type="text" name="name" required className="w-full bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-gray-700 rounded-lg p-4 focus:ring-2 focus:border-primary focus:ring-primary/50 outline-none transition-all text-text-primary-light dark:text-white" placeholder="Unnikishnan" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-secondary-light dark:text-gray-400 uppercase">Email</label>
                                <input type="email" name="email" required className="w-full bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-gray-700 rounded-lg p-4 focus:ring-2 focus:border-primary focus:ring-primary/50 outline-none transition-all text-text-primary-light dark:text-white" placeholder="unnikishnan@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-secondary-light dark:text-gray-400 uppercase">Message</label>
                            <textarea name="message" rows="5" required className="w-full bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-gray-700 rounded-lg p-4 focus:ring-2 focus:border-primary focus:ring-primary/50 outline-none transition-all text-text-primary-light dark:text-white" placeholder="Tell me about your project..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all flex items-center justify-center">
                            Send Message <Send className="w-5 h-5 ml-2" />
                        </button>
                    </form>
                </div>

                <footer className="mt-20 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Unni.JSX. All rights reserved.</p>
                </footer>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 bg-white dark:bg-dark relative transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-full"></div>
                        <div className="relative bg-light-paper dark:bg-dark-paper border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl">
                            <Code2 className="w-16 h-16 text-primary mb-6" />
                            <h3 className="text-2xl font-black text-text-primary-light dark:text-white mb-4">
                                More Than Just Code
                            </h3>
                            <p className="text-text-secondary-light dark:text-gray-400 leading-relaxed mb-6">
                                I started my journey with a curiosity for how things work on the internet. That curiosity evolved into a passion for building robust, scalable applications.
                            </p>
                            <p className="text-text-secondary-light dark:text-gray-400 leading-relaxed">
                                Whether it's optimizing database queries or crafting pixel-perfect UIs, I treat every line of code as an art form.
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-text-primary-light dark:text-white mb-6">
                            About <span className="text-primary">Me</span>
                        </h2>
                        <h3 className="text-xl font-bold text-text-secondary-light dark:text-gray-300 mb-6">
                            MERN Stack Developer based in India 🇮🇳
                        </h3>
                        <p className="text-text-secondary-light dark:text-gray-400 text-lg leading-relaxed mb-8">
                            I specialize in building full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js). My focus is on creating solutions that are not only functional but also intuitive and performant. I love solving complex problems and turning ideas into reality.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                <h4 className="text-3xl font-black text-primary mb-1">1+</h4>
                                <p className="text-sm text-text-secondary-light dark:text-gray-400 font-medium uppercase tracking-wide">Years Experience</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                <h4 className="text-3xl font-black text-secondary mb-1">10+</h4>
                                <p className="text-sm text-text-secondary-light dark:text-gray-400 font-medium uppercase tracking-wide">Projects Completed</p>
                            </div>
                        </div>

                        <a
                            href={cvPdf}
                            download
                            className="inline-flex items-center px-8 py-4 bg-text-primary-light dark:bg-white text-white dark:text-black font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Download Resume <Download className="w-5 h-5 ml-2" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const HomeRedesigned = () => {
    // Theme State
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <main className={`min-h-screen selection:bg-primary selection:text-black transition-colors duration-500 bg-light dark:bg-dark`}>
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
};

export default HomeRedesigned;
