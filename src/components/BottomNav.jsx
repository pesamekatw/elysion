import React, { useState, useEffect } from 'react';
import { Home, Compass, Map as MapIcon } from 'lucide-react';

export default function BottomNav({ language = 'en' }) {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 300) {
        setActiveTab('home');
      } else if (scrollPosition >= 300 && scrollPosition < 800) {
        setActiveTab('guide');
      } else {
        setActiveTab('map');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id, tab) => {
    setActiveTab(tab);
    if (id === 'root') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = {
    en: { home: 'Home', guide: 'Explore', map: 'Map' },
    el: { home: 'Αρχική', guide: 'Εξερεύνηση', map: 'Χάρτης' },
    tr: { home: 'Ana Sayfa', guide: 'Keşfet', map: 'Harita' }
  }[language];

  return (
    <>
      <nav className="bottom-nav glass-panel" style={{ borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', borderBottom: 'none' }}>
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => scrollTo('root', 'home')}
          style={{ background: 'none', border: 'none' }}
        >
          <Home size={24} className="nav-icon" />
          <span>{t.home}</span>
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => scrollTo('guide-section', 'guide')}
          style={{ background: 'none', border: 'none' }}
        >
          <Compass size={24} className="nav-icon" />
          <span>{t.guide}</span>
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => scrollTo('map-section', 'map')}
          style={{ background: 'none', border: 'none' }}
        >
          <MapIcon size={24} className="nav-icon" />
          <span>{t.map}</span>
        </button>

      </nav>
    </>
  );
}
