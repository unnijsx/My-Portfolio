import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Fixed: Missing import
import { motion } from 'framer-motion';
// Replace these with your actual file paths or keep placeholders if testing
import cvPdf from './assets/UNNIKRISHNAN_RESUME.pdf';
import myimage from './assets/1_1.jpg';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  IconButton,
  LinearProgress,
  Chip,
  TextField,
  Snackbar,
  Alert,
  Fab,
  Zoom,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack
} from '@mui/material';
import {
  LinkedIn,
  GitHub,
  Email,
  Work,
  Download,
  Twitter,
  ArrowUpward,
  Phone,
  LocationOn,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Register both plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00D4FF',
      light: '#66E6FF',
      dark: '#0099CC',
    },
    secondary: {
      main: '#FF6B95',
      light: '#FF9DB8',
      dark: '#FF3D6F',
    },
    background: {
      default: '#0A0F1C',
      paper: '#1A1F2E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B8D0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #1A1F2E, #151A28)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

const Home = () => {
  const headerRef = useRef();
  const heroRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const skillsRef = useRef();
  const contactRef = useRef();

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile Menu State

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // GSAP Animations
  useEffect(() => {
    // Hero animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-description',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.hero-buttons button',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
        '-=0.2'
      );

    // Section animations
    const sections = [
      { ref: aboutRef, id: 'about' },
      { ref: skillsRef, id: 'skills' },
      { ref: projectsRef, id: 'projects' },
      { ref: contactRef, id: 'contact' }
    ];

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              end: 'bottom 20%',
              onEnter: () => setActiveSection(id),
              onEnterBack: () => setActiveSection(id),
            }
          }
        );
      }
    });

    // Header background animation
    ScrollTrigger.create({
      start: 50,
      onUpdate: (self) => {
        if (headerRef.current) {
          if (self.progress > 0.05) {
            gsap.to(headerRef.current, {
              duration: 0.3,
              backgroundColor: 'rgba(10, 15, 28, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            });
          } else {
            gsap.to(headerRef.current, {
              duration: 0.3,
              backgroundColor: 'transparent',
              backdropFilter: 'blur(0px)',
              boxShadow: 'none'
            });
          }
        }
      },
    });

    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://formcarry.com/s/M5yYOL89oqa", {
        method: 'POST',
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.code === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setFormErrors({ form: data.message || 'Failed to submit form' });
      }
    } catch (error) {
      setSubmitStatus('error');
      setFormErrors({ form: error.message || 'Network error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus(null);
  };

  const handleScrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.inOut" });
  };

  // Fixed: Enhanced scroll function using GSAP ScrollToPlugin
  const scrollToSection = (sectionId) => {
    setMobileOpen(false); // Close mobile drawer if open

    // Smooth scroll with offset for fixed header
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: "power3.inOut"
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

  const skills = [
    { name: 'React.js', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'MongoDB', level: 80, category: 'backend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Material-UI', level: 88, category: 'frontend' },
    { name: 'Express.js', level: 82, category: 'backend' },
    { name: 'Git/GitHub', level: 85, category: 'tools' },
    { name: 'Python', level: 75, category: 'backend' },
  ];

  const projects = [
    {
      title: 'Cookikko Recipe Platform',
      description: 'A beautiful recipe sharing platform with advanced search and social features built with React and Material-UI.',
      tags: ['React', 'Material-UI', 'GSAP'],
      link: 'https://github.com/unnijsx/Cookikko-A-Recipe-Sharing-Web-Frontend-'
    },
    {
      title: 'Job Portal MERN Stack',
      description: 'Full-stack job portal with user authentication, job posting, and application tracking system.',
      tags: ['MERN Stack', 'JWT', 'REST API'],
      link: 'https://github.com/unnijsx/Job-Portal-using-MERN'
    },
    {
      title: 'E-commerce Fashion Store',
      description: 'Modern e-commerce platform for fashion retail with cart functionality and payment integration.',
      tags: ['React', 'E-commerce', 'UI/UX'],
      link: 'https://github.com/unnijsx/Dress-Itto'
    },
    {
      title: 'Student Management System',
      description: 'Comprehensive student attendance and performance tracking system for educational institutions.',
      tags: ['MERN', 'Education', 'Analytics'],
      link: 'https://github.com/unnijsx/Student-Management'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* Header */}
        <AppBar
          ref={headerRef}
          position="fixed"
          sx={{
            background: 'transparent',
            boxShadow: 'none',
            zIndex: 1100
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{
              justifyContent: 'space-between',
              minHeight: '80px !important', // Fixed height for consistency
              px: { xs: 0, md: 2 }
            }}>
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => handleScrollToTop()}
                style={{ cursor: 'pointer' }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 1,
                    background: 'linear-gradient(45deg, #00D4FF, #FF6B95)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  UNNI.JSX
                </Typography>
              </motion.div>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Stack direction="row" spacing={3} alignItems="center">
                  {navItems.filter(item => item !== 'home').map((section) => (
                    <Button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      sx={{
                        color: activeSection === section ? 'primary.main' : 'text.secondary',
                        fontWeight: activeSection === section ? 600 : 500,
                        fontSize: '0.95rem',
                        position: 'relative',
                        padding: '6px 16px',
                        '&:hover': {
                          color: 'primary.light',
                          backgroundColor: 'rgba(255,255,255,0.05)'
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: activeSection === section ? '80%' : '0%',
                          height: '2px',
                          background: 'linear-gradient(45deg, #00D4FF, #FF6B95)',
                          transition: 'width 0.3s ease',
                          borderRadius: '2px'
                        },
                      }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Button>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    href={cvPdf}
                    download
                    sx={{
                      ml: 2,
                      borderWidth: 2,
                      borderRadius: '50px',
                      px: 3,
                      '&:hover': { borderWidth: 2 }
                    }}
                  >
                    CV
                  </Button>
                </Stack>
              )}

              {/* Mobile Menu Icon */}
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              width: 260,
              backgroundColor: 'background.paper',
              backgroundImage: 'none'
            }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <List sx={{ pt: 2 }}>
            {navItems.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => scrollToSection(item === 'home' ? 'home' : item)}
                sx={{
                  mb: 1,
                  borderRadius: '0 50px 50px 0',
                  backgroundColor: activeSection === item ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                  borderLeft: activeSection === item ? '4px solid #00D4FF' : '4px solid transparent',
                }}
              >
                <ListItemText
                  primary={item.charAt(0).toUpperCase() + item.slice(1)}
                  primaryTypographyProps={{
                    fontWeight: activeSection === item ? 700 : 500,
                    color: activeSection === item ? 'primary.main' : 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Hero Section */}
        <Box
          id="home"
          ref={heroRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            pt: { xs: 12, md: 0 }, // Added top padding for mobile to clear fixed header
            pb: { xs: 6, md: 0 }
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant="h1"
                    className="hero-title"
                    sx={{
                      mb: 2,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                      background: 'linear-gradient(45deg, #00D4FF, #FF6B95)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Unnikrishnan
                  </Typography>

                  <Typography
                    variant="h2"
                    className="hero-subtitle"
                    sx={{
                      mb: 3,
                      color: 'primary.main',
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                      fontWeight: 600,
                    }}
                  >
                    MERN Stack Developer
                  </Typography>

                  <Typography
                    variant="h6"
                    className="hero-description"
                    sx={{
                      mb: 4,
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      maxWidth: '550px',
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    I craft digital experiences that blend beautiful design with
                    cutting-edge technology. Passionate about creating solutions
                    that make a difference.
                  </Typography>

                  <Box className="hero-buttons" sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<Work />}
                      onClick={() => scrollToSection('projects')}
                      sx={{ px: 4, py: 1.5, borderRadius: '50px' }}
                    >
                      View Projects
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      endIcon={<Download />}
                      href={cvPdf}
                      download
                      sx={{ px: 4, py: 1.5, borderWidth: 2, borderRadius: '50px' }}
                    >
                      Download CV
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Box sx={{ position: 'relative' }}>
                    {/* Decorative Circle behind image */}
                    <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: { xs: 280, md: 380 },
                      height: { xs: 280, md: 380 },
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #00D4FF20, #FF6B9520)',
                      filter: 'blur(40px)',
                      zIndex: 0
                    }} />
                    <Avatar
                      src={myimage}
                      alt="Unnikrishnan"
                      sx={{
                        width: { xs: 250, sm: 300, md: 360 },
                        height: { xs: 250, sm: 300, md: 360 },
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                        border: '4px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1,
                        position: 'relative'
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Section */}
        <Box id="about" ref={aboutRef} sx={{ py: 12, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: 'center',
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  About Me
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    mb: 8,
                    color: 'text.secondary',
                    maxWidth: '700px',
                    mx: 'auto',
                    lineHeight: 1.6
                  }}
                >
                  Passionate developer with a love for creating amazing digital experiences
                </Typography>
              </motion.div>

              <Grid container spacing={4}>
                <Grid item xs={12} md={10} sx={{ mx: 'auto' }}>
                  <motion.div variants={itemVariants}>
                    <Card sx={{ p: { xs: 3, md: 5 } }}>
                      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' }}>
                        I'm a dedicated <span style={{ color: '#00D4FF', fontWeight: 600 }}>Full Stack Developer</span> specializing in the MERN stack.
                        With over a year of experience, I've worked on various projects from
                        e-commerce platforms to complex web applications. My approach combines technical expertise
                        with creative problem-solving to build user-centric applications.
                      </Typography>

                      <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' }}>
                        When I'm not coding, you can find me exploring new technologies,
                        contributing to open source, or enjoying the beautiful landscapes of Kerala.
                        I believe in continuous learning and staying updated with the latest industry trends.
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mt: 4, justifyContent: 'center' }}>
                {[
                  { value: '10+', label: 'Projects Completed', color: 'primary' },
                  { value: '1+', label: 'Years Experience', color: 'secondary' },
                  { value: '5+', label: 'Technologies', color: 'primary' },
                  { value: '100%', label: 'Client Satisfaction', color: 'secondary' },
                ].map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div variants={itemVariants} style={{ width: '100%' }}>
                      <Card sx={{
                        p: 3,
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-5px)' }
                      }}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 800,
                            mb: 1,
                            color: stat.color === 'primary' ? 'primary.main' : 'secondary.main'
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {stat.label}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Skills Section */}
        <Box id="skills" ref={skillsRef} sx={{ py: 12 }}>
          <Container maxWidth="md">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, color: 'text.primary' }}>
                  Technical Skills
                </Typography>
              </motion.div>

              <Grid container spacing={3}>
                {skills.map((skill, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div variants={itemVariants}>
                      <Card sx={{ p: 3, '&:hover': { borderColor: 'primary.dark' } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" color="text.primary" fontWeight={600}>
                            {skill.name}
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                            {skill.level}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={skill.level}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #00D4FF, #FF6B95)',
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'inline-block', opacity: 0.7 }}>
                          {skill.category.toUpperCase()}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Projects Section */}
        <Box id="projects" ref={projectsRef} sx={{ py: 12, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: 'center',
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Featured Projects
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    mb: 6,
                    color: 'text.secondary',
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  Some of my recent work that I'm proud of
                </Typography>
              </motion.div>

              <Grid container spacing={4} justifyContent="center">
                {projects.map((project, index) => (
                  <Grid item xs={12} sm={10} md={6} lg={5} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: '450px' }}>
                      <Card sx={{ p: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box
                          sx={{
                            p: 3,
                            background: 'linear-gradient(135deg, #00D4FF20, #FF6B9520)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <Typography variant="h5" color="text.primary" sx={{ fontWeight: 600, textAlign: 'center' }}>
                            {project.title}
                          </Typography>
                        </Box>

                        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}>
                            {project.description}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            {project.tags.map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                sx={{
                                  mr: 1,
                                  mb: 1,
                                  background: 'linear-gradient(45deg, #00D4FF20, #FF6B9520)',
                                  color: 'text.primary',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                              />
                            ))}
                          </Box>

                          <Button
                            variant="outlined"
                            color="primary"
                            href={project.link}
                            target="_blank"
                            sx={{ borderWidth: 2, alignSelf: 'center', px: 4 }}
                          >
                            View Project
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box id="contact" ref={contactRef} sx={{ py: 12 }}>
          <Container maxWidth="lg">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, color: 'text.primary' }}>
                  Let's Work Together
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    mb: 8,
                    color: 'text.secondary',
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  Have a project in mind? Let's discuss how we can bring your ideas to life.
                </Typography>
              </motion.div>

              <Grid container spacing={4} alignItems="stretch">
                {/* Contact Form */}
                <Grid item xs={12} md={7}>
                  <motion.div
                    variants={itemVariants}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h5" gutterBottom color="primary.main" sx={{ mb: 3, fontWeight: 600 }}>
                        Send me a message
                      </Typography>

                      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Your Name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              error={!!formErrors.name}
                              helperText={formErrors.name}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Your Email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              error={!!formErrors.email}
                              helperText={formErrors.email}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Your Message"
                              name="message"
                              multiline
                              rows={5}
                              value={formData.message}
                              onChange={handleInputChange}
                              error={!!formErrors.message}
                              helperText={formErrors.message}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 'auto' }}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={isSubmitting}
                              fullWidth
                              sx={{ py: 1.5, fontSize: '1.1rem' }}
                            >
                              {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>

                {/* Contact Info */}
                <Grid item xs={12} md={5}>
                  <motion.div
                    variants={itemVariants}
                    style={{
                      height: '100%',
                      width: '100%', // Ensure motion div takes full width of the grid item
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Card sx={{
                      p: 4,
                      height: '100%',
                      width: '100%', // CHANGED: Fill the Grid column naturally
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(135deg, #1A1F2E, #151A28)'
                    }}>
                      <Typography variant="h5" gutterBottom color="secondary.main" sx={{ mb: 4, fontWeight: 600 }}>
                        Contact Information
                      </Typography>

                      <Box sx={{ mb: 4, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                          <Avatar sx={{ bgcolor: 'rgba(0, 212, 255, 0.1)', color: 'primary.main', mr: 2, width: 48, height: 48 }}>
                            <Email />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ letterSpacing: 1 }}>
                              EMAIL
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                              unniytman@gmail.com
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                          <Avatar sx={{ bgcolor: 'rgba(0, 212, 255, 0.1)', color: 'primary.main', mr: 2, width: 48, height: 48 }}>
                            <LocationOn />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ letterSpacing: 1 }}>
                              LOCATION
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                              Kerala, India
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'rgba(0, 212, 255, 0.1)', color: 'primary.main', mr: 2, width: 48, height: 48 }}>
                            <Phone />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ letterSpacing: 1 }}>
                              AVAILABILITY
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                              Open to opportunities
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                      <Typography variant="h6" gutterBottom color="text.primary" sx={{ mb: 3 }}>
                        Let's Connect
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {[
                          { icon: <GitHub />, href: "https://github.com/unnijsx", label: "GitHub" },
                          { icon: <LinkedIn />, href: "https://www.linkedin.com/in/unnikrishnanvp/", label: "LinkedIn" },
                          { icon: <Twitter />, href: "https://twitter.com/unnijsx", label: "Twitter" },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <IconButton
                              href={item.href}
                              target="_blank"
                              sx={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'text.primary',
                                width: 50,
                                height: 50,
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #00D4FF, #FF6B95)',
                                  border: 'none',
                                },
                              }}
                            >
                              {item.icon}
                            </IconButton>
                          </motion.div>
                        ))}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 6, bgcolor: 'background.paper', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Unnikrishnan V P. Crafted with passion and React.
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Scroll to Top Button */}
      <Zoom in={showScrollToTop}>
        <Fab
          color="primary"
          onClick={handleScrollToTop}
          size="medium"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(45deg, #00D4FF, #FF6B95)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}
        >
          <ArrowUpward />
        </Fab>
      </Zoom>

      <Snackbar
        open={submitStatus !== null}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={submitStatus === 'success' ? 'success' : 'error'}
          sx={{ width: '100%', borderRadius: 2 }}
          variant="filled"
        >
          {submitStatus === 'success'
            ? 'Message sent successfully! I will get back to you soon.'
            : formErrors.form || 'Error: Failed to send message. Please try again.'}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Home;