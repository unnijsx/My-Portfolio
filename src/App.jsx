import React from 'react';
import Home from './Home';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Test from './Test';
// No need to import Hide.css here, as visually-hidden will be in Home.jsx

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#333333', // Set #333333 as the primary color
      },
      secondary: {
        main: '#6F32BF', // Optional: customize secondary color
      },
    },
  });

  // Schema.org markup for Organization and Person
  // This JSON-LD will be injected into a script tag in the HTML body
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://unnijsx.online/#organization",
        "name": "Unnijsx Online",
        "url": "https://unnijsx.online/",
        "logo": "https://unnijsx.online/src/assets/1_1.jpg", // Update if you have a specific logo URL
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
          // Add your Twitter, etc., if applicable
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 8848853516",
          "contactType": "customer service"
        }
      },
      {
        "@type": "Person",
        "@id": "https://unnijsx.online/#person",
        "name": "Unnikrishnan (unnijsx)", // More specific name for clarity
        "url": "https://unnijsx.online/",
        "image": "https://unnijsx.online/src/assets/1_1.jpg", // Update if you have a specific profile pic URL
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
          // "https://twitter.com/yourhandle", // Add if you have one
        ],
        "worksFor": {
          "@id": "https://unnijsx.online/#organization"
        }
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Schema.org Markup for Organization and Person - Keep here for global context */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hi' element={<Test />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;