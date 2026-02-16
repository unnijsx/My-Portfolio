import HomePremium from './HomePremium';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Test from './Test';
import SnakeGame from './Game';
import HappyMensDay from './Mens';
import TheyyamLanding from './TheyyamPage';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#333333',
      },
      secondary: {
        main: '#6F32BF',
      },
    },
  });

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://unnijsx.online/#organization",
        "name": "Unnijsx Online",
        "url": "https://unnijsx.online/",
        "logo": "https://unnijsx.online/src/assets/1_1.jpg",
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
        "@id": "https://unnijsx.online/#person",
        "name": "Unnikrishnan (unnijsx)",
        "url": "https://unnijsx.online/",
        "image": "https://unnijsx.online/src/assets/1_1.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
        ],
        "worksFor": {
          "@id": "https://unnijsx.online/#organization"
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

      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<HomePremium />} />
          <Route path='/pulimbaillam' element={<TheyyamLanding />} />
          <Route path='/game' element={<SnakeGame />} />
          <Route path='/mensday' element={<HappyMensDay />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;