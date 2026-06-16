import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PortfolioRedesign = lazy(() => import('./PortfolioRedesign'));
const PortfolioCreator = lazy(() => import('./components/redesign/PortfolioCreator'));

function App() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#E5E5E0] dark:bg-[#0A0A0B] flex items-center justify-center"></div>}>
      <Routes>
        <Route path='/' element={<PortfolioRedesign />} />
        <Route path='/portfoliocreator' element={<PortfolioCreator />} />
      </Routes>
    </Suspense>
  );
}

export default App;