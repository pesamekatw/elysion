import React, { useState } from 'react';
import { Map } from 'lucide-react';
import { MUST_VISIT_SPOTS } from '../data/mockData';
import SidePanel from './SidePanel';

export default function LocalGuide({ onSelectSpot, language = 'en' }) {
  const [filter, setFilter] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(null);

  const t = {
    en: { 
      title: 'Local Guide', 
      subtitle: 'Must-visit spots around the island', 
      showMap: 'Show on map', 
      all: 'All', 
      spots: 'Spots', 
      restaurants: 'Restaurants', 
      museums: 'Museums',
      beach: 'Beaches',
      mastic: 'Mastic',
      amenity: 'Amenities'
    },
    el: { 
      title: 'Τοπικός Οδηγός', 
      subtitle: 'Τα καλύτερα μέρη του νησιού', 
      showMap: 'Στον χάρτη', 
      all: 'Όλα', 
      spots: 'Αξιοθέατα', 
      restaurants: 'Εστιατόρια', 
      museums: 'Μουσεία',
      beach: 'Παραλίες',
      mastic: 'Μαστίχα',
      amenity: 'Παροχές'
    },
    tr: { 
      title: 'Yerel Rehber', 
      subtitle: 'Adada mutlaka görülmesi gereken yerler', 
      showMap: 'Haritada göster', 
      all: 'Hepsi', 
      spots: 'Yerler', 
      restaurants: 'Restoranlar', 
      museums: 'Müzeler',
      beach: 'Plajlar',
      mastic: 'Damla Sakızı',
      amenity: 'Tesisler'
    }
  }[language];

  const filteredSpots = MUST_VISIT_SPOTS.filter(spot => filter === 'all' || spot.type === filter);
  
  const filters = ['all', 'spot', 'restaurant', 'beach', 'museum', 'mastic', 'amenity'];



  return (
    <section id="guide-section" className="section animate-fade-in-up delay-100">
      <div className="section-header">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>
      </div>

      <div className="filter-buttons" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 20px 20px 20px', scrollbarWidth: 'none' }}>
        {filters.map((f) => (
          <button 
            key={f} 
            className="btn-primary"
            style={{ 
              opacity: filter === f ? 1 : 0.6, 
              whiteSpace: 'nowrap', 
              padding: '8px 16px', 
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? t.all : f === 'spot' ? t.spots : f === 'restaurant' ? t.restaurants : f === 'beach' ? t.beach : f === 'mastic' ? t.mastic : f === 'amenity' ? t.amenity : t.museums}
          </button>
        ))}
      </div>

      <div className="horizontal-scroll">
        {filteredSpots.map((spot) => (
          <div 
            key={spot.id} 
            className="spot-card glass-panel" 
            onClick={(e) => {
              if (e.target.closest('a')) return;
              setSelectedSpot(spot);
            }} 
            style={{ cursor: 'pointer' }}
          >
            <img src={spot.image} alt={spot.title[language]} className="spot-image" loading="lazy" />
            <div className="spot-content">
              <h3 className="spot-title">{spot.title[language]}</h3>
              <p className="spot-desc">
                {spot.description[language]}
              </p>
              <a 
                className="btn-text"
                href={(function(){
                  const [lat, lng] = spot.coordinates;
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                  return isIOS ? `https://maps.apple.com/?q=${lat},${lng}` : `https://maps.google.com/?q=${lat},${lng}`;
                })()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ marginTop: 'auto', textDecoration: 'none' }}
              >
                <Map size={16} />
                <span>{t.showMap}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <SidePanel 
        isOpen={!!selectedSpot} 
        onClose={() => setSelectedSpot(null)} 
        spot={selectedSpot} 
        language={language} 
      />
    </section>
  );
}
