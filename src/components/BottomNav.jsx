import React, { useState, useEffect } from 'react';
import { Home, Compass, Map as MapIcon, QrCode, X } from 'lucide-react';

export default function BottomNav({ language = 'en' }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showQR, setShowQR] = useState(false);

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
    en: { home: 'Home', guide: 'Explore', map: 'Map', qr: 'Share', close: 'Close', scan: 'Scan to access this guide' },
    el: { home: 'Αρχική', guide: 'Εξερεύνηση', map: 'Χάρτης', qr: 'Κοινοποίηση', close: 'Κλείσιμο', scan: 'Σκανάρετε για πρόσβαση' },
    tr: { home: 'Ana Sayfa', guide: 'Keşfet', map: 'Harita', qr: 'Paylaş', close: 'Kapat', scan: 'Rehbere erişmek için tarayın' }
  }[language];

  // We use a generic QR API since we don't have a library installed.
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://venetis.vercel.app';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`;

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

        <button 
          className="nav-item"
          onClick={() => setShowQR(true)}
          style={{ background: 'none', border: 'none' }}
        >
          <QrCode size={24} className="nav-icon" />
          <span>{t.qr}</span>
        </button>
      </nav>

      {/* QR Modal */}
      {showQR && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowQR(false)}>
          <div className="glass-panel" style={{
            background: 'var(--color-surface)', padding: '30px', 
            borderRadius: 'var(--radius-lg)', textAlign: 'center', maxWidth: '300px', width: '90%'
          }} onClick={e => e.stopPropagation()}>
            <button className="btn-icon" onClick={() => setShowQR(false)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <X size={24} />
            </button>
            <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>{t.scan}</h3>
            <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
              <img src={qrUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {currentUrl}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
