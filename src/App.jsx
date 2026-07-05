import React, { useState } from 'react';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import LocalGuide from './components/LocalGuide';
import MapSection from './components/MapSection';
import BottomNav from './components/BottomNav';
import './index.css';

function App() {
  const [activeSpotId, setActiveSpotId] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en', 'el', 'tr'

  const handleSelectSpot = (id) => {
    setActiveSpotId(id);
  };

  return (
    <>
      <main>
        <Hero language={language} setLanguage={setLanguage} />
        <PropertyCard language={language} />
        <LocalGuide onSelectSpot={handleSelectSpot} language={language} />
        <MapSection activeSpotId={activeSpotId} language={language} />
      </main>
      <BottomNav language={language} />
    </>
  );
}

export default App;
