import PortfolioRedesign from './PortfolioRedesign';
import { Route, Routes } from 'react-router-dom';
import PortfolioCreator from './components/redesign/PortfolioCreator';

function App() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://unni.rheox.online/#website",
        "name": "UNNI.JSX",
        "alternateName": ["Unnikrishnan V P", "Unnikrishnan MERN", "Unnikrishnan Web Developer", "Unnikrishnan VP Web Developer", "Unnikrishnan", "UNNI.JSX Portfolio"],
        "url": "https://unni.rheox.online/"
      },
      {
        "@type": "Organization",
        "@id": "https://unni.rheox.online/#organization",
        "name": "UNNI.JSX",
        "url": "https://unni.rheox.online/",
        "logo": "https://unni.rheox.online/1_1.jpg",
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
        "@id": "https://unni.rheox.online/#person",
        "name": "Unnikrishnan V P",
        "jobTitle": "Freelance Web Developer & MERN Stack Expert",
        "url": "https://unni.rheox.online/",
        "image": "https://unni.rheox.online/1_1.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
        ],
        "description": "Unnikrishnan V P is a professional freelance web developer and MERN stack expert based in Kerala, India, specializing in custom React applications, high-performance websites, and expert technical SEO.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        },
        "knowsAbout": [
          "Web Development",
          "MERN Stack Development",
          "Freelance Web Development",
          "Website Design",
          "MERN Stack",
          "React.js",
          "Node.js",
          "SEO Optimization",
          "REST APIs",
          "Cloud Hosting"
        ],
        "worksFor": {
          "@id": "https://unni.rheox.online/#organization"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://unni.rheox.online/#service",
        "name": "Unnikrishnan V P | Freelance Web Developer & MERN Stack Expert",
        "description": "Unnikrishnan V P is an expert freelance web developer and MERN stack developer in Kerala, India, specializing in high-performance React/MERN systems, custom websites, DNS configuration, and technical SEO.",
        "url": "https://unni.rheox.online/",
        "telephone": "+91 8848853516",
        "priceRange": "$$",
        "image": "https://unni.rheox.online/1_1.jpg",
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