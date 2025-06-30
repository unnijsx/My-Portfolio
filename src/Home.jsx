import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import * as THREE from 'three';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
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
} from '@mui/material';
import {
  LinkedIn,
  GitHub,
  Email,
  Work,
  School,
  Code,
  DesignServices,
  ArrowRightAlt,
  Download,
  Twitter,
  ArrowUpward,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import myimage from './assets/myimage1.jpg';
import cvPdf from './assets/Unnikrishnan_CV.pdf';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#ff6bff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 5px 15px rgba(0, 212, 255, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 12,
          borderRadius: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        bar: {
          borderRadius: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d4ff',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#00d4ff',
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
          '& .MuiFormHelperText-root': {
            color: '#ff6bff',
          }
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
  const educationRef = useRef();
  const skillsRef = useRef();
  const contactRef = useRef();
  const threeContainerRef = useRef();
  const threeMeshRef = useRef();

  const particlesRef = useRef([]);

  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['MERN Stack Developer', 'UI/UX Enthusiast', 'AI Explorer', 'Discord Specialist'];

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
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
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
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
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: "power3.inOut"
    });
  };

  useEffect(() => {
    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeContainerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xff6bff, 1);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      emissive: 0x00a3cc,
      specular: 0xffffff,
      shininess: 50,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    threeMeshRef.current = mesh;

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      if (threeMeshRef.current) {
        threeMeshRef.current.rotation.x += 0.005;
        threeMeshRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      threeContainerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const floatingShapes = [];
    const colors = ['rgba(0, 212, 255, 0.1)', 'rgba(255, 107, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];

    for (let i = 0; i < 15; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-shape';

      const size = Math.random() * 100 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shapeType = Math.random() > 0.5 ? 'circle' : 'square';

      gsap.set(shape, {
        position: 'fixed',
        width: size,
        height: size,
        borderRadius: shapeType === 'circle' ? '50%' : '10%',
        backgroundColor: color,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        zIndex: -1,
        opacity: 0
      });

      document.body.appendChild(shape);
      floatingShapes.push(shape);

      gsap.to(shape, {
        x: '+=random(-200,200)',
        y: '+=random(-200,200)',
        rotation: '+=random(-180,180)',
        opacity: 'random(0.2,0.5)',
        duration: 'random(10,20)',
        ease: "none",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5
      });
    }

    particlesRef.current = Array.from({ length: 40 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      gsap.set(particle, {
        x: Math.random() * window.innerWidth * 1.2 - window.innerWidth * 0.1,
        y: Math.random() * window.innerHeight * 1.2 - window.innerHeight * 0.1,
        opacity: 0,
        scale: Math.random() * 0.7 + 0.3,
        backgroundColor: i % 3 === 0 ? '#ff6bff' : '#00d4ff'
      });
      document.body.appendChild(particle);
      return particle;
    });

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        x: '+=random(-150,150)',
        y: '+=random(-150,150)',
        opacity: 'random(0.2,0.5)',
        duration: 'random(6,12)',
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.1 + Math.random() * 3
      });
    });

    return () => {
      particlesRef.current.forEach(particle => particle.remove());
      floatingShapes.forEach(shape => shape.remove());
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();

    gsap.from(headerRef.current, {
      y: -100,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.2
    });

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl.from(heroRef.current.querySelector('.hero-title'), {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    })
      .from(heroRef.current.querySelector('.hero-subtitle'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, "-=0.6")
      .from(heroRef.current.querySelectorAll('.hero-actions button'), {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.2,
      }, "-=0.4");

    gsap.to(heroRef.current.querySelector('.role-text'), {
      keyframes: [{
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in"
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }],
      repeat: -1,
      repeatDelay: 2.2,
    });

    gsap.to(threeMeshRef.current.position, {
      z: 3,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(threeMeshRef.current.rotation, {
      x: '+=1',
      y: '+=2',
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      }
    });
    aboutTl.from(aboutRef.current.querySelector('.about-title'), {
      opacity: 0,
      x: -50,
      duration: 0.8,
    })
      .from(aboutRef.current.querySelector('.avatar-container'), {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.5")
      .from(aboutRef.current.querySelector('.about-content > p'), {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.2,
      }, "-=0.6")
      .from(aboutRef.current.querySelectorAll('.about-feature-box'), {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.2,
      }, "-=0.5");

    const skillsTl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
      }
    });
    skillsTl.from(skillsRef.current.querySelector('.skills-title'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
    })
      .from(skillsRef.current.querySelectorAll('.skill-item'), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
      }, "-=0.4");

    gsap.from(skillsRef.current.querySelectorAll('.MuiLinearProgress-bar'), {
      width: 0,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
      }
    });

    gsap.fromTo(projectsRef.current.querySelectorAll('.project-card'),
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 70%",
        }
      }
    );

    gsap.from(projectsRef.current.querySelector('.projects-title'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
      }
    });

    const educationTl = gsap.timeline({
      scrollTrigger: {
        trigger: educationRef.current,
        start: "top 80%",
      }
    });
    educationTl.from(educationRef.current.querySelector('.education-title'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
    })
      .from(educationRef.current.querySelectorAll('.timeline-item-container'), {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.2,
      }, "-=0.4");

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
      }
    });
    contactTl.from(contactRef.current.querySelector('h2'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
    })
      .from(contactRef.current.querySelector('p'), {
        opacity: 0,
        y: 30,
        duration: 0.6,
      }, "-=0.4")
      .from(contactRef.current.querySelector('form'), {
        opacity: 0,
        y: 30,
        duration: 0.6,
      }, "-=0.4")
      .from(contactRef.current.querySelector('.MuiDivider-root'), {
        scaleX: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6")
      .from(contactRef.current.querySelectorAll('.MuiIconButton-root'), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
      }, "-=0.8");

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: targetElement,
              offsetY: 60
            },
            ease: "power3.inOut"
          });
        }
      });
    });

    const brandText = document.querySelector('.brand-text');
    if (brandText) {
      const originalText = brandText.textContent;
      brandText.textContent = '';
      const letters = originalText.split('');

      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        span.style.transition = 'transform 0.3s ease, color 0.3s ease';
        brandText.appendChild(span);

        span.addEventListener('mouseenter', () => {
          gsap.to(span, {
            y: -5,
            rotationZ: Math.random() * 10 - 5,
            color: theme.palette.primary.main,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        span.addEventListener('mouseleave', () => {
          gsap.to(span, {
            y: 0,
            rotationZ: 0,
            color: 'inherit',
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }

    projectsRef.current.querySelectorAll('.project-card').forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? -10 : 10,
        duration: 3 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    const contactButton = contactRef.current.querySelector('form button[type="submit"]');
    if (contactButton) {
      gsap.to(contactButton, {
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    { name: 'JavaScript', value: 90, color: 'primary' },
    { name: 'React', value: 85, color: 'primary' },
    { name: 'Node.js', value: 80, color: 'primary' },
    { name: 'Express.js', value: 75, color: 'secondary' },
    { name: 'MongoDB', value: 75, color: 'secondary' },
    { name: 'HTML/CSS', value: 95, color: 'secondary' },
    { name: 'Python', value: 40, color: 'primary' },
    { name: 'SQL (MySQL)', value: 60, color: 'primary' },
    { name: 'Git', value: 85, color: 'secondary' },
    { name: 'AWS Basics', value: 55, color: 'primary' },
    { name: 'Hosting(Basics)', value: 60, color: 'primary' },
  ];

  const education = [
    {
      year: '2021 - 2024',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Kannur University',
      description: 'Specialized in Web Development.'
    },
    {
      year: '2019 - 2021',
      degree: 'Higher Secondary Education',
      institution: 'Kerala Board of Higher Secondary Education',
      description: ''
    },
    {
      year: '2019',
      degree: 'SSLC',
      institution: 'Board of Public Examinations, Kerala',
      description: ''
    }
  ];

  const projects = [
    {
      title: 'Cookikko - A Recipe Platform UI',
      description: 'A full-featured online recipe sharing platform with React & Material-UI, allowing users to create, share, and discover recipes. It includes user authentication, recipe submission, search functionality, and detailed recipe views with ingredient lists and step-by-step instructions. The UI is designed to be responsive and intuitive, providing a seamless user experience across devices.',
      tags: ['React'],
      link: 'https://github.com/unnijsx/Cookikko-A-Recipe-Sharing-Web-Frontend-'
    },
    {
      title: 'JOB Portal - A Job Search Platform',
      description: 'A comprehensive job search platform connecting job seekers with employers, featuring job listings, application tracking, and user profiles for both parties. It includes robust search and filter options, real-time application status updates, and administrative tools for managing listings and users. The backend is built with secure API endpoints and efficient database interactions.',
      tags: ['React', 'Material-UI', 'Node.js', 'Express', 'MongoDB'],
      link: 'https://github.com/unnijsx/Job-Portal-using-MERN'
    },
    {
      title: 'Dress Itto - An online clothing store',
      description: 'An online clothing store built with React and Material-UI, featuring product listings, a shopping cart, and a streamlined purchasing process. Users can browse products by category, view detailed product descriptions, add items to their cart, and proceed to checkout. The interface is designed for visual appeal and ease of navigation, ensuring a pleasant shopping experience.',
      tags: ['React', 'Material-UI', 'Node.js', 'Express', 'MongoDB'],
      link: 'https://github.com/unnijsx/Dress-Itto'
    },
    {
      title: 'Economy CRUD Application',
      description: 'A CRUD (Create, Read, Update, Delete) application for managing economic data with a user-friendly interface. This tool allows for efficient data entry, retrieval, modification, and deletion of economic records. It features a responsive design and intuitive controls, making data management straightforward for users without extensive technical expertise.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      link: 'https://github.com/unnijsx/Economy-Add-and-Remove-using-MERN'
    },
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio website showcasing my projects, skills, and experience. This site is built using React and Material-UI, incorporating modern design principles and smooth animations with GSAP. It serves as a dynamic resume, providing visitors with an interactive overview of my capabilities and past work. The responsive layout ensures a great experience on any device.',
      tags: ['React', 'Material-UI'],
      link: 'https://github.com/unnijsx/Portfolio-Website'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <style>{`
          .particle {
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            mix-blend-mode: screen;
          }
          .floating-shape {
            filter: blur(30px);
          }
          .project-card:hover {
            transform: translateY(-10px) !important;
          }
          .brand-text span {
            display: inline-block;
            position: relative;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .float-animation {
            animation: float 6s ease-in-out infinite;
          }
          .three-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
          canvas {
            display: block;
          }
          .contact-form {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
            background: rgba(26, 26, 26, 0.8);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .form-field {
            margin-bottom: 1.5rem;
          }
        `}</style>

      <div className="three-container" ref={threeContainerRef} />

      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          color: 'text.primary',
        }}
      >
        <AppBar position="fixed" ref={headerRef} sx={{
          bgcolor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
          zIndex: 1200
        }}>
          <Container maxWidth="lg">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <Box
                  className="brand-text"
                  component="span"
                  color="primary.main"
                  sx={{
                    display: 'inline-block',
                  }}
                >
                  UNNI
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    ml: 0.5,
                    animation: 'glow 2s infinite alternate',
                    '@keyframes glow': {
                      '0%': { textShadow: '0 0 5px #ff6bff' },
                      '100%': { textShadow: '0 0 20px #ff6bff, 0 0 30px #ff6bff' }
                    },
                  }}
                >
                  JSX
                </Box>
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((section) => (
                  <Button
                    key={section}
                    color="inherit"
                    href={`#${section}`}
                    sx={{
                      position: 'relative',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-2px)',
                        '&::before': {
                          width: '100%',
                        }
                      },
                      transition: 'all 0.3s ease-in-out',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: 0,
                        height: 2,
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease-in-out',
                      }
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton color="inherit">
                  <Menu />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box
          id="home"
          ref={heroRef}
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(26, 35, 126, 0.7) 100%)',
            backgroundSize: '200% 200%',
            color: 'white',
            pt: 8,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 40%)',
              zIndex: 0
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 80% 30%, rgba(255, 107, 255, 0.15) 0%, transparent 40%)',
              zIndex: 0
            }
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              className="hero-title"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(90deg, #00d4ff 0%, #ff6bff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
              }}
            >
              Hi, I'm Unnikrishnan
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className="hero-subtitle"
              sx={{
                mb: 4,
                opacity: 0.8,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                height: '1.5em',
                position: 'relative'
              }}
            >
              <Box
                className="role-text"
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  background: 'linear-gradient(90deg, #ff6bff 0%, #00d4ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                {roles[roleIndex]}
              </Box>
            </Typography>
            <Box
              className="hero-actions"
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<Work />}
                href="#projects"
                sx={{
                  minWidth: 200,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 12px 25px rgba(0, 212, 255, 0.4)'
                  },
                }}
              >
                View Work
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                endIcon={<Email />}
                href="#contact"
                sx={{
                  minWidth: 200,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 12px 25px rgba(255, 107, 255, 0.3)',
                    backgroundColor: 'rgba(255, 107, 255, 0.15)'
                  },
                }}
              >
                Contact Me
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<Download />}
                href={cvPdf}
                download="Unnikrishnan_CV.pdf"
                sx={{
                  minWidth: 200,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.02)',
                    boxShadow: '0 12px 25px rgba(255, 107, 255, 0.4)'
                  },
                }}
              >
                Download CV
              </Button>
            </Box>

          </Container>
        </Box>

        <Box
          id="about"
          ref={aboutRef}
          sx={{
            py: 12,
            bgcolor: 'background.paper',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -100,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(to bottom, transparent, #1a1a1a)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} md={5} className="avatar-container">
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 250, sm: 300 },
                    height: { xs: 250, sm: 300 },
                    mx: 'auto',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
                      animation: 'pulse 3s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', opacity: 0.8, boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)' },
                        '50%': { transform: 'scale(1.05)', opacity: 1, boxShadow: '0 0 30px rgba(0, 212, 255, 0.7)' },
                        '100%': { transform: 'scale(1)', opacity: 0.8, boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)' }
                      }
                    }
                  }}
                >
                  <Avatar
                    src={myimage}
                    alt="Unnikrishnan"
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      zIndex: 2,
                      transition: 'transform 0.4s ease-in-out',
                      filter: 'grayscale(30%)',
                      '&:hover': {
                        transform: 'scale(1.05) rotate(2deg)',
                        filter: 'grayscale(0%)',
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h3"
                  component="h2"
                  className="about-title"
                  sx={{
                    fontWeight: 'bold',
                    mb: 4,
                    color: 'primary.main',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: '100%',
                      height: 4,
                      background: 'linear-gradient(90deg, #00d4ff, #ff6bff, transparent)',
                      borderRadius: 2
                    }
                  }}
                >
                  About Me
                </Typography>
                <Box className="about-content">
                  <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.15rem', lineHeight: 1.8 }}>
                    I'm a passionate Full Stack Developer with 1+ years of experience creating
                    robust, scalable, and user-friendly web applications. I specialize in the
                    MERN stack (MongoDB, Express.js, React along with MUI, Node.js) and have a strong interest
                    in building intuitive user interfaces and optimizing performance.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.15rem', lineHeight: 1.8 }}>
                    My journey in software development is driven by curiosity and a desire to solve
                    real-world problems through code. I enjoy transforming complex requirements
                    into clean, efficient, and maintainable solutions.
                  </Typography>

                  <Grid container spacing={3} sx={{ mt: 4 }}>
                    <Grid item xs={12} sm={6} className="about-feature-box">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 3,
                          borderRadius: 2,
                          bgcolor: 'background.default',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
                          }
                        }}
                      >
                        <Code color="primary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                        <Box>
                          <Typography variant="h6" fontWeight="bold">Frontend Development</Typography>
                          <Typography variant="body2" color="text.secondary">
                            React, Material-UI, GSAP, Figma, HTML, CSS, JavaScript
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} className="about-feature-box">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 3,
                          borderRadius: 2,
                          bgcolor: 'background.default',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
                          }
                        }}
                      >
                        <DesignServices color="primary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                        <Box>
                          <Typography variant="h6" fontWeight="bold">Backend & Database</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Node.js, Express.js, MongoDB, SQL, AWS, Cloudflare
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box
          id="skills"
          ref={skillsRef}
          sx={{
            py: 20,
            background: 'linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(to bottom, #1a1a1a, transparent)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              className="skills-title"
              sx={{
                fontWeight: 'bold',
                mb: 6,
                textAlign: 'center',
                color: 'primary.main',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -1,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50%',
                  maxWidth: 300,
                  height: 4,
                  background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              My Skills
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {skills.map((skill, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} className="skill-item">
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      width: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease-in-out',
                      borderLeft: `4px solid ${theme.palette[skill.color].main}`,
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
                      {skill.name}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={skill.value}
                      color={skill.color}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" align="right" fontWeight="bold">
                      {skill.value}%
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box
          id="projects"
          ref={projectsRef}
          sx={{
            py: 12,
            bgcolor: 'background.paper',
            position: 'relative',
            zIndex: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(to bottom, #1a1a1a, transparent)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              className="projects-title"
              sx={{
                fontWeight: 'bold',
                mb: 6,
                textAlign: 'center',
                color: 'primary.main',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50%',
                  maxWidth: 300,
                  height: 4,
                  background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              Featured Projects
            </Typography>

            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
              {projects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    className="project-card"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: 'background.default',
                      '&:hover': {
                        transform: 'translateY(-10px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        '& .project-image-placeholder': {
                          transform: 'scale(1.1) rotate(1deg)'
                        }
                      }
                    }}
                  >
                    {/* <Box
                      className="project-image-placeholder"
                      sx={{
                        height: 180,
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.5s ease-in-out',
                        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#00d4ff' : '#ff6bff'} 0%, ${index % 3 === 0 ? '#673ab7' : '#e91e63'} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        zIndex: 1
                      }}
                    >
                      <Box sx={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")',
                        zIndex: 2,
                        opacity: 0.5
                      }} />
                      <Box sx={{ zIndex: 3 }}>{index + 1}</Box>
                    </Box> */}
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          height: '70px', 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3, 
                          WebkitBoxOrient: 'vertical',
                          transition: 'height 0.3s ease-in-out, -webkit-line-clamp 0.3s ease-in-out, overflow 0.3s ease-in-out',
                          '.project-card:hover &': { 
                            height: 'auto', 
                            WebkitLineClamp: 'unset', 
                            textOverflow: 'unset', 
                            overflow: 'visible', 
                          },
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {project.tags.map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            sx={{
                              mr: 1,
                              mb: 1,
                              bgcolor: theme.palette[i % 2 === 0 ? 'primary' : 'secondary'].dark,
                              color: 'white',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.1)',
                                bgcolor: theme.palette[i % 2 === 0 ? 'primary' : 'secondary'].main,
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        color="primary"
                        endIcon={<ArrowRightAlt />}
                        href={project.link}
                        target="_blank"
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateX(5px)',
                          }
                        }}
                      >
                        View Project
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box
          id="education"
          ref={educationRef}
          sx={{
            py: 10,
            background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(to bottom, #1a1a1a, transparent)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              className="education-title"
              sx={{
                fontWeight: 'bold',
                mb: 6,
                textAlign: 'center',
                color: 'primary.main',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50%',
                  height: 4,
                  background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              Education Timeline
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {education.map((edu, index) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={index}
                  className="timeline-item-container"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s',
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                      }
                    }}
                  >
                    <Typography
                      variant="overline"
                      color="primary"
                      sx={{
                        display: 'block',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {edu.year}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {edu.degree}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" paragraph>
                      {edu.institution}
                    </Typography>
                    {edu.description && (
                      <Typography variant="body2">
                        {edu.description}
                      </Typography>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box
          id="contact"
          ref={contactRef}
          sx={{
            py: 12,
            bgcolor: 'background.paper',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(to bottom, #1a1a1a, transparent)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" component="h2" sx={{
              fontWeight: 'bold',
              mb: 3,
              color: 'primary.main',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50%',
                maxWidth: 200,
                height: 4,
                background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                borderRadius: 2
              }
            }}>
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph sx={{
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.15rem',
              lineHeight: 1.8
            }}>
              I'm currently open to new opportunities and collaborations. Feel free to reach out
              if you have a project in mind, want to discuss web development, or just want to say hi.
              I'm always happy to connect!
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              className="contact-form"
              sx={{
                mb: 6,
                animation: 'fadeIn 0.8s ease-out',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Box className="form-field">
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box className="form-field">
                <TextField
                  fullWidth
                  label="Your Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box className="form-field">
                <TextField
                  fullWidth
                  label="Your Message"
                  variant="outlined"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  error={!!formErrors.message}
                  helperText={formErrors.message}
                  sx={{ mb: 3 }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{
                  minWidth: 200,
                  zIndex: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 10px 20px rgba(0, 212, 255, 0.3)'
                  },
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                href="https://github.com/unnijsx"
                target="_blank"
                // sx={{
                //   color: 'text.primary',
                //   transition: 'all 0.3s'
                // }}
              >
                <GitHub fontSize="large" />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/unnikrishnanvp/"
                target="_blank"
                // sx={{
                //   color: 'text.primary',
                //   transition: 'all 0.3s'
                // }}
              >
                <LinkedIn fontSize="large" />
              </IconButton>
              <IconButton
                href="mailto:unniytman@gmail.com"
                // sx={{
                //   color: 'text.primary',
                //   transition: 'all 0.3s'
                // }}
              >
                <Email fontSize="large" />
              </IconButton>
            </Box>

            <Typography variant="body2" sx={{ mt: 6, opacity: 0.7, fontSize: '0.9rem' }}>
              Designed and Built by Unnikrishnan.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.6, fontSize: '0.8rem' }}>
              © {new Date().getFullYear()}. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>

      <Zoom in={showScrollToTop}>
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          onClick={handleScrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1100,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 5px 20px rgba(0, 212, 255, 0.5)'
            }
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
          sx={{ width: '100%' }}
        >
          {submitStatus === 'success'
            ? 'Message sent successfully! I will get back to you soon.'
            : formErrors.form || 'Failed to send message. Please try again.'}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Home;