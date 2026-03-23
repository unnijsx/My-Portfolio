import PortfolioRedesign from './PortfolioRedesign';
import { Route, Routes } from 'react-router-dom';

function App() {
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
      <Routes>
        <Route path='/' element={<PortfolioRedesign />} />
      </Routes>
    </>
  );
}

export default App;