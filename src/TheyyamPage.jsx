import React, { useState, useRef, useEffect } from 'react';
import locationQR from './assets/theyyamimages/locationQR.png';

import collage from './assets/theyyamimages/collage.jpg';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Checkbox,
  Chip,
  Divider,
  TextField,
  Snackbar,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Backdrop,
  Fade,
  Modal,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Paper
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownloadIcon from '@mui/icons-material/Download';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import DeselectIcon from '@mui/icons-material/Deselect';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MapIcon from '@mui/icons-material/Map';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff3d00' },
    secondary: { main: '#ffd700' },
    background: { default: '#050505', paper: '#0a0a0a' },
    text: { primary: '#fff', secondary: 'rgba(255,255,255,0.7)' },
  },
  typography: {
    fontFamily: '"Cinzel", "Roboto", sans-serif',
    h1: { fontWeight: 900, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800 },
    h3: { fontFamily: '"Roboto", sans-serif', fontWeight: 300 },
  },
  components: {
    MuiButton: { 
      styleOverrides: { 
        root: { 
          borderRadius: 0, 
          padding: '12px 30px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        } 
      } 
    },
    MuiTextField: { 
      styleOverrides: { 
        root: { 
          '& .MuiOutlinedInput-root': { 
            borderRadius: 0, 
            backgroundColor: 'rgba(255,255,255,0.05)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover fieldset': { borderColor: '#ff3d00' },
            '&.Mui-focused fieldset': { borderColor: '#ff3d00' },
          } 
        } 
      } 
    },
  },
});

// Ember Particles Background
const EmberParticles = () => {
  const particles = Array.from({ length: 25 });
  return (
    <Box sx={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 200 - 100}px)`,
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            backgroundColor: i % 3 === 0 ? '#ffd700' : '#ff3d00',
            borderRadius: '50%',
            boxShadow: '0 0 10px #ff3d00'
          }}
        />
      ))}
    </Box>
  );
};

const TheyyamPage = () => {
  const allImages = [
    // { id: 1, category: 'Oorpazhassi Vellattam', selected: false, url: img1 },
    // { id: 2, category: 'Chekkicheri Bhagavati', selected: false, url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800' },
    // { id: 3, category: 'Vishnumoorthi', selected: false, url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800' },
  ].map(img => ({
    ...img,
    name: `${img.category} ${img.id}`
  }));

  const [imagesToShow, setImagesToShow] = useState(20);
  const [images, setImages] = useState(allImages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formStatus, setFormStatus] = useState('');
  
  const contactRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Schedule data
  const scheduleData = [
    { time: "10:00 AM", event: "Oorpazhassi Vellattam", loc: "24/12/2025", icon: <PlayArrowIcon /> },
    { time: "07:00 PM", event: "Guruthi & Thottam", loc: "24/12/2025", icon: <LocalFireDepartmentIcon /> },
    { time: "02:00 AM", event: "Chekkicheri Bhagavati & Vishnumoorthi", loc: "25/12/2025", icon: <LocalFireDepartmentIcon color="error" /> },
  ];

  // Theyyam descriptions
  const theyyamTypes = [
    {
      title: "Oorpazhassi Vellattam",
      subtitle: "The Revolutionary Spirit",
      desc: "A powerful Theyyam form representing the spirit of Kerala Varma Pazhassi Raja, the Lion of Kerala. Known for its fierce dance movements and historical significance.",
      features: ["Historical warrior spirit", "Fierce dance movements", "Traditional weaponry"]
    },
    {
      title: "Chekkicheri Bhagavati",
      subtitle: "The Divine Mother",
      desc: "A goddess form worshipped for protection and prosperity. Characterized by graceful movements and elaborate floral decorations.",
      features: ["Mother goddess form", "Graceful dance", "Floral ornaments"]
    },
    {
      title: "Vishnumoorthi",
      subtitle: "The Fire Walker",
      desc: "Representation of Lord Vishnu, known for the spectacular fire-walking ritual where the performer walks through burning embers.",
      features: ["Fire walking ritual", "Divine protection", "Cosmic symbolism"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displayedImages = images.slice(0, imagesToShow);
  const selectedCount = displayedImages.filter(img => img.selected).length;

  const toggleImageSelection = (id) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, selected: !img.selected } : img
    ));
  };

  const selectAllImages = () => {
    setImages(prev => prev.map((img, index) => 
      index < imagesToShow ? { ...img, selected: true } : img
    ));
    setSnackbar({ open: true, message: 'All visible images selected', severity: 'info' });
  };

  const deselectAllImages = () => {
    setImages(prev => prev.map(img => ({ ...img, selected: false })));
    setSnackbar({ open: true, message: 'All images deselected', severity: 'info' });
  };

  const downloadImage = async (imageUrl, imageName) => {
    try {
      // For local images, we can create a blob URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageName.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setSnackbar({ open: true, message: 'Image downloaded successfully!', severity: 'success' });
    } catch (error) {
      // Fallback to opening in new tab
      window.open(imageUrl, '_blank');
      setSnackbar({ open: true, message: 'Image opened in new tab', severity: 'info' });
    }
  };

  const downloadSelectedImages = () => {
    const selected = displayedImages.filter(img => img.selected);
    if (selected.length === 0) {
      setSnackbar({ open: true, message: 'Please select images to download', severity: 'warning' });
      return;
    }
    
    selected.forEach((img, index) => {
      setTimeout(() => {
        downloadImage(img.url, img.name);
      }, index * 300);
    });
  };

  const openImageDialog = (image) => {
    setCurrentImage(image);
    setOpenDialog(true);
  };

  const showMoreImages = () => {
    setImagesToShow(prev => Math.min(prev + 20, images.length));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      // Replace with your form endpoint
      const response = await fetch("https://formcarry.com/s/M5yYOL89oqa", {
        method: 'POST',
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('success');
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to send message', severity: 'error' });
      setFormStatus('error');
    }
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        overflowX: 'hidden', 
        bgcolor: '#050505', 
        minHeight: '100vh', 
        position: 'relative' 
      }}>
        
        {/* Background Particles */}
        <EmberParticles />
        
        {/* Scroll Progress Bar */}
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: 'rgba(255, 61, 0, 0.3)',
          zIndex: 1000
        }}>
          <Box sx={{
            height: '100%',
            width: `${scrollProgress}%`,
            bgcolor: '#ff3d00',
            transition: 'width 0.1s'
          }} />
        </Box>

        {/* Hero Section */}
        <Box sx={{ 
          height: '100vh', 
          position: 'relative', 
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <motion.div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '120%', 
            zIndex: 0, 
            y: yBg 
          }}>
            {/* <Box 
              component="img" 
              src="./assets/theyyamimages/oorpazhassi.jpeg"
              sx={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                filter: 'brightness(0.4) contrast(1.2)' 
              }}
            /> */}
            <Box sx={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to top, #050505 0%, transparent 60%)' 
            }} />
          </motion.div>

          <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2 }}
            >
              <Typography variant="h6" color="primary" sx={{ letterSpacing: '0.5em', mb: 2 }}>
                25 സംവത്സരങ്ങൾക്ക് ശേഷം 
              </Typography>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '4rem', md: '5rem' }, 
                background: 'linear-gradient(to right, #fff, #ff3d00)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 50px rgba(255, 61, 0, 0.4)'
              }}>
                PULIMBA ILLAM KALIYATTAM
              </Typography>
              <Typography variant="h5" sx={{ 
                mt: 4, 
                fontWeight: 300, 
                color: '#ffd700',
                maxWidth: '600px', 
                mx: 'auto',
                fontFamily: 'Cinzel'
              }}>
                2025 December 24 & 25
              </Typography>
              <Box sx={{ mt: 6 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                  sx={{ 
                    borderWidth: 2, 
                    '&:hover': { 
                      borderWidth: 2, 
                      boxShadow: '0 0 20px #ff3d00' 
                    } 
                  }}
                >
                  View Gallery
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Event Details Section */}
        <Box id="about" sx={{ py: 15, position: 'relative' }}>
          <Container>
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                >
                  <Typography variant="overline" color="primary" sx={{ letterSpacing: 3 }}>
                    Sacred Ritual Event
                  </Typography>
                  <Typography variant="h2" sx={{ my: 3, lineHeight: 1.1 }}>
                    PULIMBA ILLAM <br /> 
                    <span style={{ color: '#ff3d00' }}>KALIYATTAM</span>
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'text.secondary', 
                    fontSize: '1.1rem', 
                    mb: 4, 
                    lineHeight: 1.8 
                  }}>
                    An annual sacred ritual performed at Pulimba Illam, where the divine descends 
                    upon earth through the powerful forms of Theyyam. This two-day celebration 
                    features Oorpazhassi Vellattam, Chekkicheri Bhagavathi, Vishnumoorthi.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip 
                      icon={<LocationOnIcon />} 
                      label="Pulimba Illam, Karivellur, Kannur" 
                      variant="outlined" 
                      sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} 
                    />
                    <Chip 
                      icon={<CalendarTodayIcon />} 
                      label="Dec 24-25, 2025" 
                      variant="outlined" 
                      sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} 
                    />
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box sx={{ 
                      position: 'absolute', 
                      top: -20, 
                      right: -20, 
                      width: 100, 
                      height: 100, 
                      border: '2px solid #ff3d00' 
                    }} />
                    <Box 
                      component="img"
                      src={collage}
                      sx={{ 
                        width: '100%', 
                        filter: 'grayscale(20%)', 
                        transition: '0.5s', 
                        '&:hover': { filter: 'grayscale(0%)' } 
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Schedule Section */}
        <Box sx={{ py: 10, bgcolor: '#0a0a0a' }}>
          <Container maxWidth="md">
            <Typography variant="h2" align="center" sx={{ mb: 8 }}>
              Ritual Schedule
            </Typography>
            <Box sx={{ 
              position: 'relative', 
              borderLeft: '2px solid rgba(255,61,0,0.3)', 
              ml: { xs: 2, md: 0 }, 
              pl: 4 
            }}>
              {scheduleData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ mb: 6, position: 'relative' }}>
                    <Box sx={{ 
                      position: 'absolute', 
                      left: -41, 
                      top: 0, 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#ff3d00', 
                      boxShadow: '0 0 15px #ff3d00' 
                    }} />
                    
                    <Card sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(255,255,255,0.03)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.05)', 
                      borderRadius: 0,
                      transition: '0.3s',
                      '&:hover': { 
                        bgcolor: 'rgba(255,61,0,0.1)', 
                        borderColor: '#ff3d00' 
                      }
                    }}>
                      <Grid container alignItems="center">
                        <Grid item xs={3} md={2}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            {item.time}
                          </Typography>
                        </Grid>
                        <Grid item xs={9} md={10}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h5" sx={{ fontFamily: 'Cinzel' }}>
                                {item.event}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1, 
                                mt: 1 
                              }}>
                                {item.loc}
                              </Typography>
                            </Box>
                            {/* {item.icon} */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>

    

        {/* Gallery Section */}
        <Box id="gallery" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: 6 }}>
              <Box>
                <Typography variant="h2">Image Gallery</Typography>
                <Typography color="text.secondary">
                  Showing {displayedImages.length} of {images.length} images
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<SelectAllIcon />}
                  onClick={selectAllImages}
                  sx={{ borderColor: '#333', color: '#fff' }}
                >
                  Select All
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DeselectIcon />}
                  onClick={deselectAllImages}
                  sx={{ borderColor: '#333', color: '#fff' }}
                >
                  Deselect All
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={downloadSelectedImages}
                  disabled={selectedCount === 0}
                  sx={{ 
                    bgcolor: '#ff3d00',
                    '&:hover': { bgcolor: '#ff5722' },
                    '&.Mui-disabled': { bgcolor: 'rgba(255, 61, 0, 0.3)' }
                  }}
                >
                  Download ({selectedCount})
                </Button>
              </Box>
            </Box>

            {/* Image Grid */}
            <Grid container spacing={2}>
              {displayedImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: 'transparent',
                      border: image.selected ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 0,
                      '&:hover .overlay': { opacity: 1 }
                    }}
                      onClick={() => openImageDialog(image)}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="250"
                          image={image.url}
                          alt={image.name}
                          sx={{
                            objectFit: 'cover',
                            filter: image.selected ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.9)'
                          }}
                        />
                        
                        <Checkbox
                          checked={image.selected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleImageSelection(image.id);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            zIndex: 2,
                            color: '#fff',
                            '&.Mui-checked': { color: '#ffd700' }
                          }}
                        />

                        <Box className="overlay" sx={{ 
                          position: 'absolute', 
                          inset: 0, 
                          bgcolor: 'rgba(0,0,0,0.6)', 
                          opacity: 0, 
                          transition: '0.3s', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center'
                        }}>
                          <CameraAltIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>

                        <Chip
                          label={image.category}
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: '#fff',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>

                      <CardContent sx={{ 
                        bgcolor: 'rgba(0,0,0,0.5)', 
                        p: 2,
                        borderTop: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <Typography variant="body2" sx={{ 
                          color: '#fff', 
                          fontSize: '0.9rem',
                          textAlign: 'center'
                        }}>
                          {image.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Show More Button */}
            {imagesToShow < images.length && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                  variant="outlined"
                  endIcon={<ExpandMoreIcon />}
                  onClick={showMoreImages}
                  sx={{
                    borderColor: '#ff3d00',
                    color: '#ff3d00',
                    px: 6,
                    py: 1.5,
                    '&:hover': {
                      borderColor: '#ff5722',
                      bgcolor: 'rgba(255, 61, 0, 0.1)'
                    }
                  }}
                >
                  Show More Images
                </Button>
              </Box>
            )}
          </Container>
        </Box>

        {/* Location Section with QR */}
        <Box sx={{ py: 15, position: 'relative' }}>
          <Container>
            <Typography variant="h2" align="center" sx={{ mb: 8 }}>
              Event Location
            </Typography>
            
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ 
                    p: 4, 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 0
                  }}>
                    <Typography variant="h4" color="primary" sx={{ mb: 3, fontFamily: 'Cinzel' }}>
                      Pulimba Illam
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <LocationOnIcon sx={{ color: '#ff3d00', mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          ADDRESS
                        </Typography>
                        <Typography variant="body1">
                          Pulimba Illam, Karivellur, Kannur District, Kerala 670521
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <AccessTimeIcon sx={{ color: '#ff3d00', mr: 2 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          EVENT DATES
                        </Typography>
                        <Typography variant="body1">
                          December 24-25, 2025 | 10:00 AM onwards
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="contained"
                        startIcon={<MapIcon />}
                        href="https://maps.app.goo.gl/tGwG42wAT822HuDs9" // Replace with your Google Maps link
                        target="_blank"
                        sx={{
                          bgcolor: '#ff3d00',
                          '&:hover': { bgcolor: '#ff5722' }
                        }}
                      >
                        Open in Google Maps
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ 
                    p: 4, 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 0,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#ffd700' }}>
                      Scan for Location
                    </Typography>
                    
                    {/* QR Code Placeholder */}
<Box sx={{ 
  width: 200, 
  height: 200, 
  mx: 'auto',
  mb: 3,
  bgcolor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #ff3d00'
}}>
  <Box
    component="img"
    src={locationQR}
    alt="Pulimba Illam Location QR"
    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
</Box>

                    
                    <Typography variant="body2" color="text.secondary">
                      Scan this QR code to get directions on your phone
                    </Typography>
                    
                    
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box id="contact" ref={contactRef} sx={{ py: 15, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(circle at center, #1a0505 0%, #000 70%)', 
            zIndex: -1 
          }} />
          
          <Container maxWidth="lg">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
            >
              <Typography variant="h2" align="center" sx={{ mb: 1 }}>
                Contact & Information
              </Typography>
              <Typography align="center" color="text.secondary" sx={{ mb: 8 }}>
                For inquiries about the ritual, photography permissions, or guided visits
              </Typography>

              <Grid container spacing={4} alignItems="stretch">
                {/* Contact Form */}
                <Grid item xs={12} md={7}>
                  <Card sx={{ 
                    p: 4, 
                    height: '100%', 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.05)', 
                    borderRadius: 0 
                  }}>
                    <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                      Send a Message
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField 
                            fullWidth 
                            label="Your Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            required 
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField 
                            fullWidth 
                            label="Your Email" 
                            name="email" 
                            type="email"
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField 
                            fullWidth 
                            label="Your Message" 
                            name="message" 
                            multiline 
                            rows={4}
                            value={formData.message} 
                            onChange={(e) => setFormData({...formData, message: e.target.value})} 
                            required 
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            fullWidth
                            disabled={formStatus === 'sending'}
                            startIcon={formStatus === 'sending' ? <CircularProgress size={20} /> : <SendIcon />}
                            sx={{
                              bgcolor: '#ff3d00',
                              '&:hover': { bgcolor: '#ff5722' }
                            }}
                          >
                            {formStatus === 'sending' ? 'Sending...' : 
                             formStatus === 'success' ? 'Message Sent!' : 
                             'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Card>
                </Grid>

                {/* Contact Info */}
                <Grid item xs={12} md={5}>
                  <Card sx={{ 
                    p: 4, 
                    height: '100%', 
                    background: 'linear-gradient(135deg, #111, #000)',
                    border: '1px solid rgba(255,61,0,0.2)', 
                    borderRadius: 0 
                  }}>
                    <Typography variant="h5" color="secondary" sx={{ mb: 4 }}>
                      Contact Information
                    </Typography>
                    
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(255,61,0,0.1)', 
                        color: '#ff3d00', 
                        mr: 2 
                      }}>
                        <EmailIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          EMAIL
                        </Typography>
                        <Typography variant="body1">
                          pulimbaillam@gmail.com
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(255,61,0,0.1)', 
                        color: '#ff3d00', 
                        mr: 2 
                      }}>
                        <PhoneIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          PHONE
                        </Typography>
                        <Typography variant="body1">
                          +91 9895470568
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 4 }}>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(255,61,0,0.1)', 
                        color: '#ff3d00', 
                        mr: 2 
                      }}>
                        <LocationOnIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          LOCATION
                        </Typography>
                        <Typography variant="body1">
                          Pulimba Illam, Karivellur, Kannur, Kerala
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />
                    
                    <Typography variant="h6" sx={{ mb: 3, color: '#ffd700' }}>
                      Follow on Instagram
                    </Typography>
                    <Link to={"https://www.instagram.com/pulimbaillam"}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {[
                        { icon: <InstagramIcon />, color: '#E4405F' },
                      ].map((item, index) => (
                        <IconButton
                          key={index}
                          sx={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            '&:hover': {
                              borderColor: item.color,
                              bgcolor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          {item.icon}
                        </IconButton>
                      ))}
                    </Box></Link>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 6, textAlign: 'center', bgcolor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Container>
            <Typography variant="h5" sx={{ mb: 3, color: '#ffd700' }}>
              Experience the Divine
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.secondary', 
              mb: 4, 
              maxWidth: 800, 
              mx: 'auto', 
              lineHeight: 1.8 
            }}>
              Join us at Pulimba Illam Kaliyattam to witness the ancient ritual art of Theyyam, 
              where gods descend to earth and dance among mortals.
            </Typography>
            
            <Divider sx={{ borderColor: 'rgba(255,61,0,0.3)', mb: 4, mx: 'auto', maxWidth: 600 }} />
            

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {new Date().getFullYear()} Pulimba Illam Kaliyattam • All rights reserved
            </Typography>
          </Container>
        </Box>

        {/* Floating Action Buttons */}
        <Fab
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            bgcolor: '#ff3d00',
            color: 'white',
            '&:hover': {
              bgcolor: '#ff5722'
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>

        <Fab
          aria-label="contact"
          onClick={scrollToContact}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 30,
            bgcolor: '#ffd700',
            color: '#000',
            '&:hover': {
              bgcolor: '#ffea00'
            }
          }}
        >
          <PhoneIcon />
        </Fab>

        {/* Image Preview Dialog */}
        <Modal
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500, style: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
        >
          <Fade in={openDialog}>
            <Box sx={{
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              width: '95%', 
              height: '95%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              outline: 'none'
            }}>
              <IconButton 
                onClick={() => setOpenDialog(false)}
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  color: 'white', 
                  zIndex: 10,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
              >
                <CloseIcon sx={{ fontSize: 40 }} />
              </IconButton>
              
              {currentImage && (
                <>
                  <img 
                    src={currentImage.url} 
                    alt={currentImage.name} 
                    style={{ 
                      maxHeight: '85vh', 
                      maxWidth: '100%', 
                      objectFit: 'contain', 
                      boxShadow: '0 0 50px rgba(0,0,0,0.5)' 
                    }} 
                  />
                  
                  <Box sx={{ 
                    mt: 3, 
                    display: 'flex', 
                    gap: 2, 
                    alignItems: 'center',
                    bgcolor: 'rgba(0,0,0,0.7)',
                    p: 2,
                    borderRadius: 1
                  }}>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      {currentImage.name}
                    </Typography>
                    <Chip 
                      label={currentImage.category} 
                      size="small" 
                      sx={{ 
                        bgcolor: '#ff3d00', 
                        color: '#fff' 
                      }} 
                    />
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<DownloadIcon />}
                    onClick={() => {
                      downloadImage(currentImage.url, currentImage.name);
                      setOpenDialog(false);
                    }}
                    sx={{ 
                      mt: 3, 
                      px: 4, 
                      bgcolor: '#ff3d00',
                      '&:hover': { bgcolor: '#ff5722' }
                    }}
                  >
                    Download Image
                  </Button>
                </>
              )}
            </Box>
          </Fade>
        </Modal>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            severity={snackbar.severity}
            sx={{ 
              bgcolor: '#0a0a0a',
              color: '#fff',
              border: `1px solid ${snackbar.severity === 'success' ? '#4caf50' : 
                       snackbar.severity === 'error' ? '#f44336' : 
                       snackbar.severity === 'warning' ? '#ff9800' : '#2196f3'}`
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default TheyyamPage;