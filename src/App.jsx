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
      <main className="app-container">
        <div className="left-column">
          <Hero language={language} setLanguage={setLanguage} />
          <PropertyCard language={language} />
          <LocalGuide language={language} />
        </div>
        <div className="right-column">
          <MapSection activeSpotId={activeSpotId} language={language} />
        </div>
      </main>
      <BottomNav language={language} />
    </>
  );
}

export default App;
