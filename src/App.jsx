import PortfolioRedesign from './PortfolioRedesign';
import { Route, Routes } from 'react-router-dom';
import PortfolioCreator from './components/redesign/PortfolioCreator';

function App() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.unni.rheox.online/#organization",
        "name": "UNNI.JSX",
        "url": "https://www.unni.rheox.online/",
        "logo": "https://www.unni.rheox.online/1_1.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 8848853516",
          "contactType": "customer service"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.unni.rheox.online/#person",
        "name": "Unnikrishnan V P",
        "jobTitle": "Website Developer & Web Developer",
        "url": "https://www.unni.rheox.online/",
        "image": "https://www.unni.rheox.online/1_1.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
        ],
        "description": "Unnikrishnan V P is a professional website developer and freelance web developer based in Kerala, India, specializing in full-stack React/MERN development, custom UI/UX, and SEO.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        },
        "knowsAbout": [
          "Web Development",
          "Website Design",
          "MERN Stack",
          "React.js",
          "Node.js",
          "SEO Optimization",
          "REST APIs",
          "Cloud Hosting"
        ],
        "worksFor": {
          "@id": "https://www.unni.rheox.online/#organization"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.unni.rheox.online/#service",
        "name": "Unnikrishnan V P | Freelance Web Developer in Kerala",
        "description": "Professional web developer and website developer in Kerala, India. Specializing in high-performance React/MERN stack solutions, custom website design, SEO, and web hosting.",
        "url": "https://www.unni.rheox.online/",
        "telephone": "+91 8848853516",
        "priceRange": "$$",
        "image": "https://www.unni.rheox.online/1_1.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "9.9312",
          "longitude": "76.2673"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <Routes>
        <Route path='/' element={<PortfolioRedesign />} />
        <Route path='/portfoliocreator' element={<PortfolioCreator />} />
      </Routes>
    </>
  );
}

export default App;