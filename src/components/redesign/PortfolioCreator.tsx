import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Briefcase, 
    Globe, 
    Layers, 
    Layout, 
    Sparkles,
    Box,
    Plus,
    Trash2, 
    ArrowLeft,
    Github,
    Linkedin,
    Twitter,
    GripVertical,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
    Calendar,
    Quote,
    Download,
    Clipboard,
    FileText,
    Code,
    Check,
    Settings,
    Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
}

interface GalleryItem {
    id: string;
    url: string;
    caption: string;
}

interface ExperienceItem {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
}

interface Page {
    id: string;
    title: string;
    slug: string;
    sections: string[]; // 'hero' | 'works' | 'skills' | 'contact' | 'gallery' | 'experience' | 'text'
}

interface Section {
    id: string;
    type: 'hero' | 'works' | 'skills' | 'contact' | 'gallery' | 'experience';
    title: string;
    content: any;
}

type ThemeMode = 'aura' | 'minimal' | 'cyber' | 'brutalist' | 'terminal';

export default function PortfolioCreator() {
    const [name, setName] = useState("Unnikrishnan");
    const [role, setRole] = useState("Full Stack Developer");
    const [bio, setBio] = useState("Crafting digital experiences that push boundaries.");
    const [longBio, setLongBio] = useState("I am a passionate developer with a deep love for building immersive web experiences. My journey started with a simple line of code, and it has evolved into a career dedicated to spatial computing and high-performance frontend architecture.");
    const [projects, setProjects] = useState<Project[]>([
        { id: '1', title: 'Example Project', description: 'A brief overview of your amazing work.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', tags: ['REACT', 'THREE.JS'] }
    ]);
    const [gallery, setGallery] = useState<GalleryItem[]>([
        { id: 'g1', url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&q=80', caption: 'Cyber City' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80', caption: 'Dreamscape' }
    ]);
    const [experiences, setExperiences] = useState<ExperienceItem[]>([
        { id: 'e1', company: 'Tech Nova', position: 'Senior Developer', duration: '2022 - Present', description: 'Leading the spatial web revolution.' }
    ]);
    const [theme, setTheme] = useState<ThemeMode>('aura');
    const [accentColor, setAccentColor] = useState('#06B6D4'); // Default cyan
    const [activeTab, setActiveTab] = useState<'info' | 'projects' | 'gallery' | 'experience' | 'theme' | 'sections' | 'pages' | 'export'>('info');
    const [step, setStep] = useState<'theme' | 'customize'>('theme');
    const [pages, setPages] = useState<Page[]>([
        { id: 'home', title: 'Home', slug: '/', sections: ['hero', 'works', 'skills', 'contact'] },
        { id: 'about', title: 'About Me', slug: '/about', sections: ['hero', 'skills'] }
    ]);
    const [activePageId, setActivePageId] = useState('home');
    const [sidebarWidth, setSidebarWidth] = useState(400);
    const [isResizing, setIsResizing] = useState(false);
    const [previewTheme, setPreviewTheme] = useState<ThemeMode | null>(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const activePage = pages.find(p => p.id === activePageId) || pages[0];

    // Persistence: Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('portfolio-builder-data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setName(data.name || name);
                setRole(data.role || role);
                setBio(data.bio || bio);
                setProjects(data.projects || projects);
                setGallery(data.gallery || gallery);
                setExperiences(data.experiences || experiences);
                setTheme(data.theme || theme);
                setAccentColor(data.accentColor || accentColor);
                // Force 'theme' step on entry as requested
                setStep('theme'); 
                setPages(data.pages || pages);
                setActivePageId(data.activePageId || activePageId);
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }
    }, []);

    // Persistence: Save to localStorage
    useEffect(() => {
        const data = { name, role, bio, longBio, projects, gallery, experiences, theme, accentColor, step, pages, activePageId, sidebarWidth };
        localStorage.setItem('portfolio-builder-data', JSON.stringify(data));
    }, [name, role, bio, longBio, projects, gallery, experiences, theme, accentColor, step, pages, activePageId, sidebarWidth]);

    const addProject = () => {
        const newProject: Project = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Project',
            description: 'Tell us about it...',
            image: '',
            tags: ['UI/UX']
        };
        setProjects([...projects, newProject]);
    };

    const addGalleryItem = () => {
        setGallery([...gallery, { id: Date.now().toString(), url: '', caption: 'New Media' }]);
    };

    const addExperience = () => {
        setExperiences([...experiences, { id: Date.now().toString(), company: 'New Company', position: 'Role', duration: '2024', description: 'Tasks...' }]);
    };

    const removeProject = (id: string) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const moveSection = (direction: 'up' | 'down', sectionId: string) => {
        const newPages = [...pages];
        const p = newPages.find(pg => pg.id === activePageId);
        if (!p) return;
        
        const idx = p.sections.indexOf(sectionId);
        if (idx === -1) return;
        
        if (direction === 'up' && idx > 0) {
            [p.sections[idx], p.sections[idx-1]] = [p.sections[idx-1], p.sections[idx]];
        } else if (direction === 'down' && idx < p.sections.length - 1) {
            [p.sections[idx], p.sections[idx+1]] = [p.sections[idx+1], p.sections[idx]];
        }
        setPages(newPages);
    };

    const generateAiPrompt = () => {
        const prompt = `### PIXEL-PERFECT PORTFOLIO SPECIFICATION ###
Build a professional, high-fidelity React portfolio with the following configuration:

[CORE IDENTITY]
User: ${name}
Role: ${role}
Tagline: ${bio}
Detailed Bio: ${longBio}

[VISUAL SYSTEM]
Template Theme: ${theme.toUpperCase()}
Accent Palette: ${accentColor}
Aesthetic: Strict adherence to the ${theme} design language (Premium UI/UX).

[STRUCTURAL ARCHITECTURE]
Active Pages: ${pages.map(p => p.title).join(', ')}
Modules to Implement: ${activePage.sections.join(', ')}

[CONTENT DATA]
PROJECTS:
${projects.map(p => `- ${p.title}: ${p.description} (Image URL: ${p.image})`).join('\n')}

GALLERY:
${gallery.map(g => `- ${g.caption}: ${g.url}`).join('\n')}

EXPERIENCE:
${experiences.map(e => `- ${e.company} (${e.duration}): ${e.position}. ${e.description}`).join('\n')}

[TECHNICAL REQUIREMENTS - CRITICAL]
1. PIXEL-PERFECT EXECUTION: Every element must be aligned precisely as per the ${theme} aesthetic. Use consistent spacing, high-end typography, and subtle micro-interactions.
2. FULL RESPONSIVENESS: The design must be flawlessly responsive across all device tiers (Mobile, Tablet, Desktop). Use Tailwind CSS breakpoints (sm, md, lg, xl) to adjust layouts, font sizes, and spacing.
3. ANIMATIONS: Use Framer Motion for high-performance, smooth transitions and hover effects.
4. STYLING: Exclusively use Tailwind CSS for a modern, maintainable codebase.
5. CODE QUALITY: Deliver clean, componentized React code with optimal performance.

This is a production-level request. Ensure the final result is visually stunning and functionally perfect.`;
        
        navigator.clipboard.writeText(prompt);
        alert("Pixel-Perfect AI Prompt copied to clipboard! Ready for Google AI Studio or Antigravity.");
    };

    const exportAsCode = () => {
        const code = `// STANDALONE PORTFOLIO COMPONENT
// Generated by Unni Portfolio Creator
import React from 'react';

export default function Portfolio() {
    return (
        <div style={{ backgroundColor: '${themeStyles[theme].bg}', color: '${themeStyles[theme].text}', minHeight: '100vh' }}>
            {/* Embedded Portfolio Content for ${name} */}
            {/* theme: ${theme} */}
            <h1 style={{ fontSize: '5rem', fontWeight: '900' }}>${name}</h1>
            <p>${bio}</p>
            {/* ... full sections integration ... */}
        </div>
    );
}
`;
        const blob = new Blob([code], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.toLowerCase()}-portfolio.tsx`;
        a.click();
    };

    const saveAsPdf = () => {
        window.print();
    };

    // Sidebar resize handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const newWidth = Math.max(320, Math.min(600, e.clientX));
            setSidebarWidth(newWidth);
        };
        const handleMouseUp = () => setIsResizing(false);

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // Theme Configs
    const themeStyles: Record<ThemeMode, { bg: string, text: string, card: string, accent: string }> = {
        aura: { 
            bg: '#0E0E0E', 
            text: '#FFFFFF', 
            card: 'rgba(255,255,255,0.05)', 
            accent: accentColor 
        },
        minimal: { 
            bg: '#F8F8F8', 
            text: '#121212', 
            card: '#FFFFFF', 
            accent: accentColor 
        },
        cyber: { 
            bg: '#050505', 
            text: '#00FF00', 
            card: 'rgba(0,255,0,0.05)', 
            accent: '#FF00FF' 
        },
        brutalist: {
            bg: '#FFFFFF',
            text: '#000000',
            card: '#FFFFFF',
            accent: '#FF3E00'
        },
        terminal: {
            bg: '#0D0208',
            text: '#00FF41',
            card: 'rgba(0,255,65,0.05)',
            accent: '#00FF41'
        }
    };

    const currentStyle = themeStyles[theme];

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-cyan-500/30 font-sans overflow-hidden flex transition-colors duration-700">
            
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {theme === ('aura' as ThemeMode) && (
                    <>
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    </>
                )}
                {theme === ('cyber' as ThemeMode) && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.05),transparent_70%)]" />
                )}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <AnimatePresence mode="wait">
                {step === 'theme' ? (
                    <motion.div 
                        key="theme-step"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="flex-1 flex flex-col items-center justify-center p-12 z-10"
                    >
                        <div className="text-center mb-16 max-w-2xl">
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-8"
                            >
                                <Sparkles className="size-3" /> Step 01: Theme Sanctuary
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Aesthetic</span>
                            </h2>
                            <p className="text-lg text-white/40 leading-relaxed font-medium">
                                Selection is the first act of creation. Pick a foundation that resonates with your vision.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                            {[
                                { id: 'aura', name: 'Aura Glass', desc: 'Floating cosmic layers with deep blur and vibrant glows.', accent: 'from-purple-500 to-cyan-500' },
                                { id: 'minimal', name: 'Sleek Minimal', desc: 'Focus on pure typography and structured whitespace.', accent: 'from-gray-400 to-white' },
                                { id: 'cyber', name: 'Cyberpunk', desc: 'High-contrast glitch effects and neon grids.', accent: 'from-magenta-500 to-amber-500' },
                                { id: 'brutalist', name: 'Neo Brutalist', desc: 'Raw, bold borders and unapologetic high-contrast design.', accent: 'from-orange-500 to-yellow-500' },
                                { id: 'terminal', name: 'Retro Terminal', desc: 'Vintage command-line aesthetic for the true digital artisan.', accent: 'from-green-500 to-emerald-900' }
                            ].map((t) => (
                                <motion.button
                                    key={t.id}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setTheme(t.id as any)}
                                    className={`relative group p-8 rounded-[40px] border transition-all text-left flex flex-col h-[400px] overflow-hidden ${theme === t.id ? 'border-white/30 bg-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${t.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                                    
                                    <div className="flex-1 relative z-10">
                                        <div className={`size-12 rounded-2xl bg-gradient-to-br ${t.accent} mb-8 flex items-center justify-center`}>
                                            {t.id === 'aura' && <Globe className="text-white size-6" />}
                                            {t.id === 'minimal' && <Layout className="text-black size-6" />}
                                            {t.id === 'cyber' && <Layers className="text-white size-6" />}
                                            {t.id === 'brutalist' && <GripVertical className="text-black size-6" />}
                                            {t.id === 'terminal' && <Plus className="text-white size-6 rotate-45" />}
                                        </div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black uppercase tracking-tight">{t.name}</h3>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreviewTheme(t.id as any);
                                                }}
                                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                                            >
                                                <Eye className="size-4 text-cyan-400" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-white/40 leading-relaxed font-medium">{t.desc}</p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between relative z-10">
                                        <div className={`px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest ${theme === t.id ? 'bg-white text-black border-white' : 'text-white/40'}`}>
                                            {theme === t.id ? 'Selected' : 'Pre-Select'}
                                        </div>
                                        {theme === t.id && (
                                            <motion.div layoutId="selection-glow" className="absolute -inset-1 rounded-[40px] border border-white/50 blur-sm pointer-events-none" />
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setStep('customize')}
                            className="mt-20 px-12 py-5 bg-white text-black font-black uppercase tracking-tighter rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                        >
                            Next Step: Customize <Sparkles className="size-5" />
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="customize-step"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex-1 flex flex-col overflow-hidden relative"
                    >
                        {isPreviewMode && (
                            <motion.button
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                onClick={() => setIsPreviewMode(false)}
                                className="fixed top-8 right-8 z-[1000] bg-white text-black px-6 py-3 rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-2 hover:scale-105 transition-all"
                            >
                                <ArrowLeft className="size-4" />
                                Exit Preview
                            </motion.button>
                        )}

                        <div className="flex-1 flex overflow-hidden">
                            {/* Left Sidebar (Tool Rail + Panel) */}
                            {!isPreviewMode && (
                                <motion.div 
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    style={{ width: isSidebarExpanded ? sidebarWidth + 80 : 80 }}
                                    className="relative z-50 flex border-r border-white/5 bg-[#0E0E0E] transition-all duration-300"
                                >
                        <aside 
                            style={{ width: isSidebarExpanded ? `${sidebarWidth}px` : '80px' }}
                            className="bg-[#111113] border-r border-white/5 flex relative no-print shrink-0 transition-[width] duration-500 ease-in-out"
                        >
                            {/* Resizer Handle */}
                            {isSidebarExpanded && (
                                <div 
                                    onMouseDown={() => setIsResizing(true)}
                                    className={`absolute top-0 -right-1 w-1 h-full cursor-col-resize z-30 transition-colors group ${isResizing ? 'bg-cyan-500' : 'hover:bg-cyan-500/50'}`}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-black border border-white/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        <GripVertical className="size-3 text-white/40" />
                                    </div>
                                </div>
                            )}

                            {/* Vertical Tab Rail (Fixed 80px) */}
                            <div className="w-[80px] border-r border-white/5 flex flex-col items-center py-8 gap-6 z-20 bg-[#0A0A0B] shrink-0">
                                <div className="size-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20">
                                    <Sparkles className="size-6 text-white" />
                                </div>
                                
                                {[
                                    { id: 'info', icon: User, label: 'Identity' },
                                    { id: 'projects', icon: Box, label: 'Works' },
                                    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
                                    { id: 'experience', icon: Briefcase, label: 'Exp' },
                                    { id: 'theme', icon: Sparkles, label: 'Style' },
                                    { id: 'pages', icon: Globe, label: 'Pages' },
                                    { id: 'sections', icon: Layout, label: 'Layout' },
                                    { id: 'export', icon: Download, label: 'Export' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id as any);
                                            if (!isSidebarExpanded) setIsSidebarExpanded(true);
                                        }}
                                        className={`group relative size-12 rounded-xl flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <tab.icon className="size-5" />
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl">
                                            {tab.label}
                                        </div>
                                    </button>
                                ))}

                                <div className="mt-auto flex flex-col gap-4">
                                    <button 
                                        onClick={() => setStep('theme')}
                                        className="group relative size-12 rounded-xl border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        <ArrowLeft className="size-5" />
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl">
                                            Exit Builder
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                                        className="group relative size-12 rounded-xl border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        {isSidebarExpanded ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl">
                                            {isSidebarExpanded ? 'Collapse' : 'Expand'}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Collapsible Content Panel */}
                            <div 
                                className={`flex-1 flex flex-col transition-all duration-500 overflow-hidden ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none w-0'}`}
                            >
                                <div className="p-8 border-b border-white/5 flex items-center justify-between min-w-[320px]">
                                    <div>
                                        <h2 className="text-2xl font-black uppercase tracking-tighter">
                                            {activeTab === 'info' && 'Identity'}
                                            {activeTab === 'projects' && 'Selected Works'}
                                            {activeTab === 'gallery' && 'Inspiration'}
                                            {activeTab === 'experience' && 'Career Timeline'}
                                            {activeTab === 'theme' && 'Visual Style'}
                                            {activeTab === 'pages' && 'Site Pages'}
                                            {activeTab === 'sections' && 'Architecture'}
                                            {activeTab === 'export' && 'Export Suite'}
                                        </h2>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Configure your portfolio</p>
                                    </div>
                                    <Settings className="size-5 text-white/20" />
                                </div>

                                {/* Custom Content Area */}
                                <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 custom-scrollbar min-w-[320px]">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'info' && (
                                        <motion.div
                                            key="info"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 block">Owner Profile</label>
                                                <div className="space-y-2">
                                                    <p className="text-xs text-white/40 mb-1">Portfolio Title</p>
                                                    <input 
                                                        value={name} 
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                                                        placeholder="Your Name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xs text-white/40 mb-1">Mission Statement</p>
                                                    <textarea 
                                                        value={role} 
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                                        rows={2}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xs text-white/40 mb-1">Comprehensive Bio</p>
                                                    <textarea 
                                                        value={bio} 
                                                        onChange={(e) => setBio(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
                                                        rows={2}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xs text-white/40 mb-1">Detailed About Me</p>
                                                    <textarea 
                                                        value={longBio} 
                                                        onChange={(e) => setLongBio(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
                                                        rows={4}
                                                        placeholder="Write your detailed story here..."
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'theme' && (
                                        <motion.div
                                            key="theme"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 block">Quick Template Switch</label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {[
                                                        { id: 'aura', name: 'Aura Glass' },
                                                        { id: 'minimal', name: 'Sleek Minimal' },
                                                        { id: 'cyber', name: 'Cyberpunk' },
                                                        { id: 'brutalist', name: 'Neo Brutalist' },
                                                        { id: 'terminal', name: 'Retro Terminal' }
                                                    ].map(t => (
                                                        <button
                                                            key={t.id}
                                                            onClick={() => setTheme(t.id as any)}
                                                            className={`p-4 rounded-2xl border text-left transition-all ${theme === t.id ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/[0.07]'}`}
                                                        >
                                                            <p className="text-sm font-black uppercase tracking-tight">{t.name}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400/60 block">Accent Architecture</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {['#06B6D4', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#FFFFFF'].map(color => (
                                                        <button
                                                            key={color}
                                                            onClick={() => setAccentColor(color)}
                                                            className={`size-8 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 ${accentColor === color ? 'border-white' : 'border-transparent'}`}
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'projects' && (
                                        <motion.div
                                            key="projects"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">Selected Works</label>
                                                <button onClick={addProject} className="p-2 hover:bg-white/10 rounded-xl text-cyan-400">
                                                    <Plus className="size-4" />
                                                </button>
                                            </div>
                                            {projects.map((p, idx) => (
                                                <div key={p.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 group transition-colors hover:border-white/20">
                                                    <div className="flex justify-between items-start">
                                                        <input 
                                                            value={p.title}
                                                            onChange={(e) => {
                                                                const newProjects = [...projects];
                                                                newProjects[idx].title = e.target.value;
                                                                setProjects(newProjects);
                                                            }}
                                                            className="bg-transparent border-none text-base font-black uppercase tracking-tight w-full focus:outline-none"
                                                        />
                                                        <button onClick={() => removeProject(p.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                                                            <Trash2 className="size-4" />
                                                        </button>
                                                    </div>
                                                    <input 
                                                        value={p.image}
                                                        onChange={(e) => {
                                                            const newProjects = [...projects];
                                                            newProjects[idx].image = e.target.value;
                                                            setProjects(newProjects);
                                                        }}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] text-white/40 focus:outline-none"
                                                        placeholder="Image URL"
                                                    />
                                                    <textarea 
                                                        value={p.description}
                                                        onChange={(e) => {
                                                            const newProjects = [...projects];
                                                            newProjects[idx].description = e.target.value;
                                                            setProjects(newProjects);
                                                        }}
                                                        className="bg-transparent border-none text-xs text-white/50 w-full focus:outline-none resize-none"
                                                        rows={2}
                                                    />
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {activeTab === 'gallery' && (
                                        <motion.div
                                            key="gallery"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">Media Gallery</label>
                                                <button onClick={addGalleryItem} className="p-2 hover:bg-white/10 rounded-xl text-cyan-400">
                                                    <Plus className="size-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {gallery.map((item, idx) => (
                                                    <div key={item.id} className="group relative aspect-square bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                                        {item.url ? (
                                                            <img src={item.url} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/10"><ImageIcon className="size-6" /></div>
                                                        )}
                                                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                                                            <input 
                                                                value={item.url}
                                                                onChange={(e) => {
                                                                    const newG = [...gallery];
                                                                    newG[idx].url = e.target.value;
                                                                    setGallery(newG);
                                                                }}
                                                                className="w-full bg-white/10 border-none rounded p-2 text-[10px] text-white outline-none"
                                                                placeholder="URL"
                                                            />
                                                            <button onClick={() => setGallery(gallery.filter(g => g.id !== item.id))} className="text-[10px] text-red-400 scale-75">Delete</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'experience' && (
                                        <motion.div
                                            key="experience"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">Career Timeline</label>
                                                <button onClick={addExperience} className="p-2 hover:bg-white/10 rounded-xl text-cyan-400">
                                                    <Plus className="size-4" />
                                                </button>
                                            </div>
                                            {experiences.map((exp, idx) => (
                                                <div key={exp.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                                                    <div className="flex justify-between gap-2">
                                                        <input 
                                                            value={exp.company}
                                                            onChange={(e) => {
                                                                const newE = [...experiences];
                                                                newE[idx].company = e.target.value;
                                                                setExperiences(newE);
                                                            }}
                                                            className="bg-transparent border-none text-sm font-bold text-white outline-none w-1/2"
                                                            placeholder="Company"
                                                        />
                                                        <input 
                                                            value={exp.duration}
                                                            onChange={(e) => {
                                                                const newE = [...experiences];
                                                                newE[idx].duration = e.target.value;
                                                                setExperiences(newE);
                                                            }}
                                                            className="bg-transparent border-none text-[10px] text-white/40 outline-none text-right w-1/2"
                                                            placeholder="Duration"
                                                        />
                                                    </div>
                                                    <input 
                                                        value={exp.position}
                                                        onChange={(e) => {
                                                            const newE = [...experiences];
                                                            newE[idx].position = e.target.value;
                                                            setExperiences(newE);
                                                        }}
                                                        className="w-full bg-transparent border-none text-xs text-cyan-400 outline-none italic"
                                                        placeholder="Role"
                                                    />
                                                    <button onClick={() => setExperiences(experiences.filter(ex => ex.id !== exp.id))} className="text-[9px] text-red-400/40 uppercase font-black">Remove</button>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                    {activeTab === 'pages' && (
                                        <motion.div
                                            key="pages"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">Portfolio Architecture</label>
                                                <button 
                                                    onClick={() => {
                                                        const newId = Math.random().toString(36).substr(2, 5);
                                                        setPages([...pages, { id: newId, title: 'New Page', slug: `/${newId}`, sections: ['hero', 'contact'] }]);
                                                    }}
                                                    className="p-2 hover:bg-white/10 rounded-xl text-cyan-400"
                                                >
                                                    <Plus className="size-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {pages.map(page => (
                                                    <div 
                                                        key={page.id}
                                                        onClick={() => setActivePageId(page.id)}
                                                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${activePageId === page.id ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/[0.07]'}`}
                                                    >
                                                        <div className="flex justify-between items-center mb-2">
                                                            <input 
                                                                value={page.title}
                                                                onChange={(e) => {
                                                                    const newPages = [...pages];
                                                                    const p = newPages.find(pg => pg.id === page.id);
                                                                    if (p) p.title = e.target.value;
                                                                    setPages(newPages);
                                                                }}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="bg-transparent border-none text-sm font-black uppercase tracking-tight focus:outline-none w-full"
                                                            />
                                                            {page.id !== 'home' && (
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setPages(pages.filter(p => p.id !== page.id));
                                                                        if (activePageId === page.id) setActivePageId('home');
                                                                    }}
                                                                    className="p-1 hover:text-red-400 transition-colors"
                                                                >
                                                                    <Trash2 className="size-3" />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="size-3 opacity-30" />
                                                            <input 
                                                                value={page.slug}
                                                                onChange={(e) => {
                                                                    const newPages = [...pages];
                                                                    const p = newPages.find(pg => pg.id === page.id);
                                                                    if (p) p.slug = e.target.value;
                                                                    setPages(newPages);
                                                                }}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="bg-transparent border-none text-[10px] opacity-40 font-mono focus:outline-none w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'sections' && (
                                        <motion.div
                                            key="sections"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 block mb-4">Architecture for {activePage.title}</label>
                                            <div className="space-y-3">
                                                {activePage.sections.map((sectionId, idx) => {
                                                    const secInfo = {
                                                        hero: { name: 'Hero Header', desc: 'Main welcome section' },
                                                        works: { name: 'Selected Works', desc: 'Project showcase grid' },
                                                        skills: { name: 'Expertise', desc: 'Core technical skills' },
                                                        contact: { name: 'Contact Footer', desc: 'Communication bridge' },
                                                        gallery: { name: 'Media Gallery', desc: 'Grid of inspirations' },
                                                        experience: { name: 'Career Timeline', desc: 'Work history' },
                                                        text: { name: 'About (Story)', desc: 'Long-form text block' }
                                                    }[sectionId as 'hero' | 'works' | 'skills' | 'contact' | 'gallery' | 'experience' | 'text'];

                                                    if (!secInfo) return null;

                                                    return (
                                                        <div key={sectionId} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group">
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex flex-col gap-1">
                                                                    <button 
                                                                        onClick={() => moveSection('up', sectionId)}
                                                                        disabled={idx === 0}
                                                                        className="p-1 hover:bg-white/10 rounded disabled:opacity-10 text-white/40"
                                                                    >
                                                                        <ChevronUp className="size-3" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => moveSection('down', sectionId)}
                                                                        disabled={idx === activePage.sections.length - 1}
                                                                        className="p-1 hover:bg-white/10 rounded disabled:opacity-10 text-white/40"
                                                                    >
                                                                        <ChevronDown className="size-3" />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-black uppercase tracking-tight">{secInfo.name}</p>
                                                                    <p className="text-[10px] opacity-40 mt-0.5">Pos: 0{idx + 1}</p>
                                                                </div>
                                                            </div>
                                                            <button 
                                                                onClick={() => {
                                                                    const newPages = [...pages];
                                                                    const p = newPages.find(pg => pg.id === activePageId);
                                                                    if (p) {
                                                                        p.sections = p.sections.filter(s => s !== sectionId);
                                                                        setPages(newPages);
                                                                    }
                                                                }}
                                                                className="size-10 rounded-xl bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-110"
                                                            >
                                                                <Eye className="size-5" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}

                                                {/* Hidden Sections (Quick Add) */}
                                                {['hero', 'works', 'skills', 'contact', 'gallery', 'experience', 'text'].filter(s => !activePage.sections.includes(s)).length > 0 && (
                                                    <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Hidden Modules</p>
                                                        {['hero', 'works', 'skills', 'contact', 'gallery', 'experience', 'text']
                                                            .filter(s => !activePage.sections.includes(s))
                                                            .map(s => (
                                                                <button 
                                                                    key={s}
                                                                    onClick={() => {
                                                                        const newPages = [...pages];
                                                                        const p = newPages.find(pg => pg.id === activePageId);
                                                                        if (p) {
                                                                            p.sections = [...p.sections, s];
                                                                            setPages(newPages);
                                                                        }
                                                                    }}
                                                                    className="w-full p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:bg-white/5 transition-all"
                                                                >
                                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s}</span>
                                                                    <Plus className="size-4 text-white/20 group-hover:text-cyan-400" />
                                                                </button>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                    {activeTab === 'export' && (
                                        <motion.div
                                            key="export"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-6">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 block font-mono">Export & Delivery</label>
                                                
                                                <button 
                                                     onClick={() => setIsPreviewMode(true)}
                                                     className="w-full group bg-white/5 border border-white/10 p-6 rounded-[32px] text-left hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-start gap-4"
                                                 >
                                                     <div className="bg-cyan-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                                         <Eye className="size-6 text-cyan-400" />
                                                     </div>
                                                     <div>
                                                         <h4 className="text-lg font-black uppercase tracking-tight mb-1 font-mono">Live View</h4>
                                                         <p className="text-xs opacity-40 leading-relaxed font-medium">View your saved portfolio locally.</p>
                                                     </div>
                                                 </button>

                                                 <button 
                                                    onClick={generateAiPrompt}
                                                    className="w-full group bg-white/5 border border-white/10 p-6 rounded-[32px] text-left hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-start gap-4"
                                                >
                                                    <div className="bg-cyan-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                                        <Clipboard className="size-6 text-cyan-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black uppercase tracking-tight mb-1 font-mono">Copy AI Prompt</h4>
                                                        <p className="text-xs opacity-40 leading-relaxed font-medium">For AI Studio / Antigravity.</p>
                                                    </div>
                                                </button>

                                                <button 
                                                    onClick={exportAsCode}
                                                    className="w-full group bg-white/5 border border-white/10 p-6 rounded-[32px] text-left hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-start gap-4"
                                                >
                                                    <div className="bg-purple-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                                        <Code className="size-6 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black uppercase tracking-tight mb-1 font-mono">Export as Code</h4>
                                                        <p className="text-xs opacity-40 leading-relaxed font-medium">Download standalone .tsx file.</p>
                                                    </div>
                                                </button>

                                                <button 
                                                    onClick={saveAsPdf}
                                                    className="w-full group bg-white/5 border border-white/10 p-6 rounded-[32px] text-left hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-start gap-4"
                                                >
                                                    <div className="bg-rose-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                                        <FileText className="size-6 text-rose-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black uppercase tracking-tight mb-1 font-mono">Save as PDF</h4>
                                                        <p className="text-xs opacity-40 leading-relaxed font-medium">Use Print to save document.</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                </div>

                                {/* Footer Controls */}
                                <div className="p-8 border-t border-white/10 bg-black/60 flex flex-col gap-3 min-w-[320px]">
                                    <button className="w-full py-4 bg-white text-black font-black uppercase tracking-tighter rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                        Launch Portfolio <Sparkles className="size-4" />
                                    </button>
                                    <button className="w-full py-3 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:text-white hover:bg-white/5 transition-all">
                                        Export as JSON
                                    </button>
                                </div>
                            </div>
                        </aside>
                                </motion.div>
                            )}
                        {/* Main Preview Area */}
                        <main className="flex-1 overflow-hidden flex flex-col relative bg-[#0F0F11]">
                            
                            {/* Simulated Viewport Header */}
                            <div className="h-20 border-b border-white/10 flex items-center justify-between px-12 bg-black/40 backdrop-blur-md z-10 transition-colors no-print">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
                                        <div className="flex items-center gap-2">
                                            <Eye className="size-3 text-cyan-400" /> Active
                                        </div>
                                        <div className="h-1 w-1 bg-white/20 rounded-full" />
                                        <span>PREVIEWING: {theme.toUpperCase()}</span>
                                    </div>
                                    
                                    <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                                        {pages.map(p => (
                                            <button 
                                                key={p.id}
                                                onClick={() => setActivePageId(p.id)}
                                                className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${activePageId === p.id ? 'bg-white text-black shadow-lg scale-105' : 'text-white/40 hover:text-white/60'}`}
                                            >
                                                {p.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-red-500/40" />
                                    <div className="size-2 rounded-full bg-yellow-500/40" />
                                    <div className="size-2 rounded-full bg-green-500/40" />
                                </div>
                            </div>

                            {/* The "Viewport" */}
                            <div className="flex-1 p-8 md:p-16 flex items-center justify-center">
                                <div 
                                    className="w-full h-full rounded-[40px] border relative overflow-y-auto scroll-hide transition-all duration-1000 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
                                    style={{ 
                                        backgroundColor: currentStyle.bg,
                                        borderColor: theme === 'cyber' ? 'rgba(255,0,255,0.2)' : 'rgba(255,255,255,0.1)',
                                        color: currentStyle.text
                                    }}
                                >
                                    {/* Dynamic Preview Content */}
                                    <div className="p-12 md:p-24 relative min-h-full">
                                        
                                        {/* Theme Specific Decorative Elements */}
                                        {theme === 'cyber' && (
                                            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                                                <div className="absolute top-0 left-0 w-full h-px bg-magenta-500 shadow-[0_0_15px_magenta]" />
                                                <div className="grid grid-cols-[repeat(20,1fr)] h-full w-full">
                                                    {[...Array(20)].map((_, i) => <div key={i} className="border-r border-magenta-500/10 h-full w-full" />)}
                                                </div>
                                            </div>
                                        )}

                                        {theme === 'brutalist' && (
                                            <div className="absolute inset-0 pointer-events-none border-[12px] border-black m-4 shadow-[12px_12px_0_0_rgba(0,0,0,1)]" />
                                        )}

                                        {theme === 'terminal' && (
                                            <div className="absolute inset-0 pointer-events-none opacity-10">
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.025),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
                                                <div className="absolute inset-0 animate-pulse bg-green-500/5" />
                                            </div>
                                        )}

                                        {/* Portfolio Body */}
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activePageId}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* Header Section */}
                                            {activePage.sections.includes('hero') && (
                                                <motion.header 
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mb-32 relative z-10"
                                                >
                                                    <span 
                                                        className="text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block"
                                                        style={{ color: currentStyle.accent }}
                                                    >
                                                        {theme === 'cyber' ? 'SYSTEM_INITIALIZED' : 'INTRODUCING'}
                                                    </span>

                                                    <h2 className={`text-[6vw] leading-[0.95] font-black uppercase mb-12 tracking-tighter break-words overflow-hidden ${theme === 'brutalist' ? 'italic' : ''}`}>
                                                        {name || "YOUR NAME"}
                                                    </h2>

                                                    <div className="max-w-2xl mb-32">
                                                        <p 
                                                            className={`text-xl md:text-2xl font-medium mb-8 border-l-4 pl-6 ${theme === 'terminal' ? 'uppercase tracking-[0.2em]' : ''}`}
                                                            style={{ borderColor: currentStyle.accent }}
                                                        >
                                                            {role || "Your professional title"}
                                                        </p>
                                                        <p className={`text-lg leading-relaxed ${theme === 'terminal' ? 'font-mono' : 'opacity-80'}`}>
                                                            {bio || "Your specialized narrative goes here..."}
                                                        </p>
                                                    </div>
                                                </motion.header>
                                            )}

                                            {/* Works Section */}
                                            {activePage.sections.includes('works') && (
                                                <div className="mb-32">
                                                    <div className="mb-16 flex justify-between items-end border-b border-white/10 pb-4">
                                                        <h3 className="text-3xl font-black uppercase tracking-tighter">Selected Works</h3>
                                                        <div className="h-0.5 flex-1 mx-8 bg-white/5" />
                                                        <span className="text-[10px] font-bold opacity-30">[{projects.length}]</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {projects.map((p, idx) => (
                                                            <motion.div 
                                                                key={p.id}
                                                                whileHover={{ y: -10 }}
                                                                className="rounded-3xl border overflow-hidden group/p"
                                                                style={{ 
                                                                    backgroundColor: currentStyle.card,
                                                                    borderColor: theme === 'brutalist' ? 'black' : 'rgba(255,255,255,0.05)',
                                                                    borderWidth: theme === 'brutalist' ? '4px' : '1px',
                                                                    boxShadow: theme === 'brutalist' ? '8px 8px 0 0 rgba(0,0,0,1)' : 'none'
                                                                }}
                                                            >
                                                                {p.image && (
                                                                    <div className="aspect-video w-full overflow-hidden">
                                                                        <img src={p.image} className="w-full h-full object-cover group-hover/p:scale-110 transition-transform duration-700" />
                                                                    </div>
                                                                )}
                                                                <div className="p-8">
                                                                    <div className="flex justify-between items-center mb-4">
                                                                        <span className="text-xs font-mono opacity-20">0{idx+1}_</span>
                                                                        <div className="flex gap-2">
                                                                            {p.tags.map(t => (
                                                                                <span key={t} className="text-[9px] px-2 py-0.5 border border-white/10 rounded-full opacity-40 uppercase">{t}</span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <h4 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover/p:text-cyan-400 transition-colors">
                                                                        {p.title}
                                                                    </h4>
                                                                    <p className="text-sm opacity-50 leading-relaxed">{p.description}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Gallery Section */}
                                            {activePage.sections.includes('gallery') && (
                                                <div className="mb-32">
                                                    <div className="mb-16 flex justify-between items-end border-b border-white/10 pb-4">
                                                        <h3 className="text-3xl font-black uppercase tracking-tighter">Gallery</h3>
                                                        <div className="h-0.5 flex-1 mx-8 bg-white/5" />
                                                    </div>
                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {gallery.map((item, idx) => (
                                                            <motion.div 
                                                                key={item.id}
                                                                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                                                                className={`aspect-square rounded-3xl overflow-hidden border ${theme === 'brutalist' ? 'border-4 border-black shadow-[6px_6px_0_0_black]' : 'border-white/10'}`}
                                                            >
                                                                {item.url ? (
                                                                    <img src={item.url} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10"><ImageIcon className="size-8" /></div>
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Experience Section */}
                                            {activePage.sections.includes('experience') && (
                                                <div className="mb-32">
                                                    <div className="mb-16 flex justify-between items-end border-b border-white/10 pb-4">
                                                        <h3 className="text-3xl font-black uppercase tracking-tighter">Experience</h3>
                                                        <div className="h-0.5 flex-1 mx-8 bg-white/5" />
                                                    </div>
                                                    <div className="space-y-16">
                                                        {experiences.map((exp) => (
                                                            <div key={exp.id} className="relative pl-12 border-l-4 border-white/5 py-4 transition-all hover:border-cyan-500/30 group">
                                                                <div 
                                                                    className="absolute top-0 left-[-11px] size-5 rounded-full border-4 border-black transition-transform group-hover:scale-125"
                                                                    style={{ backgroundColor: currentStyle.accent }}
                                                                />
                                                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                                                                    <div>
                                                                        <h4 className={`text-3xl font-black uppercase tracking-tight mb-2 ${theme === 'terminal' ? 'font-mono' : ''}`}>{exp.company}</h4>
                                                                        <p className={`text-xl font-black italic mb-2 ${theme === 'terminal' ? 'font-mono' : 'text-cyan-500'}`}>{exp.position}</p>
                                                                    </div>
                                                                    <span className="text-lg font-black opacity-30 uppercase tracking-widest">{exp.duration}</span>
                                                                </div>
                                                                <p className="opacity-60 text-lg leading-relaxed max-w-2xl">{exp.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Text Block Section */}
                                            {activePage.sections.includes('text') && (
                                                <div className="mb-40">
                                                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
                                                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">My Story</h3>
                                                        <p className="text-sm font-bold opacity-30 uppercase tracking-[0.3em]">Biography</p>
                                                    </div>
                                                    <div className={`max-w-4xl text-xl md:text-2xl leading-[1.7] ${theme === 'terminal' ? 'font-mono' : (theme === 'brutalist' ? 'font-black uppercase tracking-tight' : 'opacity-80 font-medium italic')}`}>
                                                        {longBio.split('\n').map((para, i) => (
                                                            <p key={i} className="mb-10">{para}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Skills Section */}
                                            {activePage.sections.includes('skills') && (
                                                <div className="py-20">
                                                    <h3 className={`text-4xl font-black uppercase mb-12 tracking-tighter ${theme === 'terminal' ? 'font-mono terminal-text' : (theme === 'brutalist' ? 'italic' : 'opacity-20')}`}>Expertise</h3>
                                                    <div className="flex flex-wrap gap-4">
                                                        {['Frontend', 'Backend', 'UI/UX', 'Mobile'].map(skill => (
                                                            <div 
                                                                key={skill} 
                                                                className={`px-8 py-4 border rounded-full text-lg font-bold uppercase tracking-widest ${theme === 'brutalist' ? 'text-black' : ''} ${theme === 'terminal' ? 'font-mono' : ''}`}
                                                                style={{ 
                                                                    backgroundColor: theme === 'brutalist' ? '#FACC15' : 'rgba(255,255,255,0.05)',
                                                                    borderColor: theme === 'brutalist' ? '#000000' : (theme === 'terminal' ? 'rgba(0,255,65,0.4)' : 'rgba(255,255,255,0.1)'),
                                                                    borderWidth: theme === 'brutalist' ? '3px' : '1px'
                                                                }}
                                                            >
                                                                {skill}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Contact Section */}
                                            {activePage.sections.includes('contact') && (
                                                <div 
                                                    className={`pt-32 border-t flex flex-col md:flex-row justify-between items-center gap-12 mt-20 ${theme === 'brutalist' ? 'border-black border-t-8' : (theme === 'terminal' ? 'border-green-500/20' : 'border-white/10')}`}
                                                >
                                                    <div>
                                                        <h3 className={`text-6xl font-black uppercase tracking-tighter mb-4 ${theme === 'terminal' ? 'font-mono terminal-text' : ''}`}>Let's Connect</h3>
                                                        <p className={`text-xl opacity-40 uppercase tracking-[0.4em] ${theme === 'terminal' ? 'font-mono' : ''}`}>Available for projects 2026</p>
                                                    </div>
                                                    <div className="flex gap-8">
                                                        {['GitHub', 'LinkedIn', 'Twitter'].map(link => (
                                                            <span key={link} className={`text-xl font-black uppercase hover:scale-110 cursor-pointer transition-transform ${theme === 'terminal' ? 'font-mono text-green-500' : 'opacity-40 hover:opacity-100'}`}>{link}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </motion.div>
                )}
            </AnimatePresence>

            {/* Full Screen Theme Preview Overlay */}
            <AnimatePresence>
                {previewTheme && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col"
                    >
                        <div className="absolute top-8 right-8 z-[110]">
                            <button 
                                onClick={() => setPreviewTheme(null)}
                                className="px-6 py-3 bg-white text-black font-black uppercase tracking-tighter rounded-full hover:scale-105 active:scale-95 transition-all"
                            >
                                Close Preview
                            </button>
                        </div>

                        <div 
                            className="flex-1 p-12 md:p-32 overflow-y-auto"
                            style={{ 
                                backgroundColor: themeStyles[previewTheme as ThemeMode].bg,
                                color: themeStyles[previewTheme as ThemeMode].text
                            }}
                        >
                            <div className="max-w-6xl mx-auto space-y-32">
                                <header className="space-y-12">
                                    <h1 className={`text-6xl md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter break-words overflow-hidden ${previewTheme === 'terminal' ? 'font-mono terminal-text' : ''}`}>
                                        {name}
                                    </h1>
                                    <div className="max-w-4xl space-y-16">
                                        <div>
                                            <p className={`text-2xl md:text-5xl opacity-50 font-medium mb-6 ${previewTheme === 'terminal' ? 'font-mono uppercase tracking-[0.3em]' : ''}`}>
                                                {role}
                                            </p>
                                            <p className="text-xl md:text-2xl mt-4 opacity-80 leading-relaxed max-w-2xl">{bio}</p>
                                        </div>
                                        <div className={`p-10 md:p-16 border-l-8 border-cyan-500/20 bg-white/5 rounded-r-[40px] relative ${previewTheme === 'terminal' ? 'font-mono' : 'italic'}`}>
                                            <Quote className="size-12 mb-8 text-cyan-500/40" />
                                            <p className="text-lg md:text-3xl font-medium leading-[1.6] opacity-90">
                                                {longBio}
                                            </p>
                                        </div>
                                    </div>
                                </header>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {projects.map(p => (
                                        <div 
                                            key={p.id} 
                                            className={`p-12 border rounded-[48px] transition-all duration-500 hover:translate-y-[-8px] ${previewTheme === 'brutalist' ? 'border-black border-4 shadow-[16px_16px_0_0_rgba(0,0,0,1)]' : 'border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-cyan-500/20'}`}
                                            style={{ 
                                                backgroundColor: themeStyles[previewTheme as ThemeMode].card
                                            }}
                                        >
                                            {p.image && <img src={p.image} className="w-full h-48 object-cover rounded-[24px] mb-8 grayscale hover:grayscale-0 transition-all duration-500" />}
                                            <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">{p.title}</h3>
                                            <p className="opacity-60 leading-relaxed font-medium text-lg">{p.description}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-12">
                                    <h2 className={`text-5xl font-black uppercase tracking-tight ${previewTheme === 'terminal' ? 'font-mono terminal-text' : ''}`}>Gallery</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {gallery.map((item, idx) => (
                                            <div key={item.id} className={`aspect-square rounded-[32px] overflow-hidden border group relative cursor-crosshair transition-all duration-500 hover:scale-[1.02] ${previewTheme === 'brutalist' ? 'border-[4px] border-black shadow-[8px_8px_0_0_black]' : 'border-white/10 shadow-2xl hover:shadow-cyan-500/20'}`}>
                                                {item.url ? <img src={item.url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" /> : <div className="w-full h-full bg-white/5" />}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                    <p className="text-white text-xs font-bold uppercase tracking-widest">{item.caption || 'INSPIRATION'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-20">
                                    <div className="flex items-center gap-8">
                                        <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tight ${previewTheme === 'terminal' ? 'font-mono terminal-text' : ''}`}>Experience</h2>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>
                                    <div className="space-y-16">
                                        {experiences.map(exp => (
                                            <div key={exp.id} className="relative pl-12 border-l-4 border-white/5 py-4 transition-colors hover:border-cyan-500/30">
                                                <div className={`absolute top-0 left-[-11px] size-5 rounded-full border-4 ${previewTheme === 'brutalist' ? 'bg-yellow-400 border-black' : 'bg-cyan-500 border-black'}`} />
                                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                                                    <div>
                                                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">{exp.company}</h3>
                                                        <p className="text-xl text-cyan-500 font-bold italic">{exp.position}</p>
                                                    </div>
                                                    <span className="text-lg font-black opacity-30 uppercase tracking-widest">{exp.duration}</span>
                                                </div>
                                                <p className="opacity-60 text-lg leading-relaxed max-w-4xl">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-20">
                                    <div className="flex items-center gap-8">
                                        <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tight ${previewTheme === 'terminal' ? 'font-mono terminal-text' : ''}`}>Expertise</h2>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>
                                    <div className="flex flex-wrap gap-6">
                                        {['React', 'Three.js', 'Framer Motion', 'TypeScript', 'Node.js', 'PostgreSQL'].map(skill => (
                                            <span 
                                                key={skill}
                                                className={`px-10 py-5 border rounded-full text-xl font-black uppercase tracking-widest transition-transform hover:scale-110 ${previewTheme === 'brutalist' ? 'text-black shadow-[6px_6px_0_0_black]' : ''} ${previewTheme === 'terminal' ? 'font-mono' : ''}`}
                                                style={{ 
                                                    backgroundColor: previewTheme === 'brutalist' ? '#FACC15' : 'rgba(255,255,255,0.05)',
                                                    borderColor: previewTheme === 'brutalist' ? '#000000' : (previewTheme === 'terminal' ? 'rgba(0,255,65,0.4)' : 'rgba(255,255,255,0.1)'),
                                                    borderWidth: previewTheme === 'brutalist' ? '4px' : '1px'
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={`pt-32 border-t mt-32 ${previewTheme === 'brutalist' ? 'border-black border-t-8' : (previewTheme === 'terminal' ? 'border-green-500/20' : 'border-white/10')}`}>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                                        <div>
                                            <h2 className={`text-6xl font-black uppercase tracking-tighter mb-4 ${previewTheme === 'terminal' ? 'font-mono terminal-text' : ''}`}>Let's Create</h2>
                                            <p className={`text-xl opacity-40 uppercase tracking-[0.4em] ${previewTheme === 'terminal' ? 'font-mono' : ''}`}>Available for projects 2026</p>
                                        </div>
                                        <div className="flex gap-8">
                                            {['GitHub', 'LinkedIn', 'Twitter'].map(link => (
                                                <span key={link} className={`text-xl font-black uppercase hover:scale-110 cursor-pointer transition-transform ${previewTheme === 'terminal' ? 'font-mono text-green-500' : ''}`}>{link}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <footer className="pt-20 opacity-30 text-sm font-mono uppercase tracking-[0.5em]">
                                    END_OF_PREVIEW // {previewTheme?.toUpperCase()}_MODE
                                </footer>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .scroll-hide::-webkit-scrollbar { display: none; }
                @keyframes terminal-flicker {
                    0% { opacity: 0.97; }
                    5% { opacity: 0.95; }
                    10% { opacity: 0.9; }
                    15% { opacity: 0.95; }
                    20% { opacity: 0.98; }
                    100% { opacity: 1; }
                }
                .terminal-text {
                    text-shadow: 0 0 8px rgba(0, 255, 65, 0.6);
                    animation: terminal-flicker 0.1s infinite;
                }
                @media print {
                    .no-print { display: none !important; }
                    aside { display: none !important; }
                    main { width: 100% !important; margin: 0 !important; padding: 0 !important; }
                    body { background: white !important; color: black !important; }
                }
            `}</style>
        </div>
    );
}


