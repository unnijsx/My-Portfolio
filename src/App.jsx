import PortfolioRedesign from './PortfolioRedesign';
import { Route, Routes } from 'react-router-dom';
import PortfolioCreator from './components/redesign/PortfolioCreator';

function App() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.unnijsx.online/#organization",
        "name": "Unnijsx Online",
        "url": "https://www.unnijsx.online/",
        "logo": "https://www.unnijsx.online/1_1.jpg",
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
        "@id": "https://www.unnijsx.online/#person",
        "name": "Unnikrishnan V P (unnijsx)",
        "url": "https://www.unnijsx.online/",
        "image": "https://www.unnijsx.online/1_1.jpg",
        "sameAs": [
          "https://www.linkedin.com/in/unnikrishnanvp/",
          "https://github.com/unnijsx",
        ],
        "worksFor": {
          "@id": "https://www.unnijsx.online/#organization"
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