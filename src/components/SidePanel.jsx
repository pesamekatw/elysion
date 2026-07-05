import React from 'react';
import { X, Map } from 'lucide-react';

export default function SidePanel({ isOpen, onClose, spot, language = 'en' }) {
  if (!spot) return null;

  const t = {
    en: { showMap: 'Show on map', close: 'Close' },
    el: { showMap: 'Στον χάρτη', close: 'Κλείσιμο' },
    tr: { showMap: 'Haritada göster', close: 'Kapat' }
  }[language];



  return (
    <>
      <div 
        className={`side-panel-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      <div className={`side-panel glass-panel ${isOpen ? 'open' : ''}`}>
        <button className="close-btn btn-icon" onClick={onClose} aria-label={t.close}>
          <X size={24} />
        </button>
        <div className="side-panel-content">
          <img src={spot.image} alt={spot.title[language]} className="side-panel-image" />
          <h2 className="side-panel-title">{spot.title[language]}</h2>
          <p className="side-panel-description">{spot.description[language]}</p>
          <a 
            className="btn-primary" 
            href={(function(){
              const [lat, lng] = spot.coordinates;
              const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
              return isIOS ? `https://maps.apple.com/?q=${lat},${lng}` : `https://maps.google.com/?q=${lat},${lng}`;
            })()}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '20px', width: '100%', justifyContent: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <Map size={20} />
            <span style={{ marginLeft: '8px' }}>{t.showMap}</span>
          </a>
        </div>
      </div>
    </>
  );
}
