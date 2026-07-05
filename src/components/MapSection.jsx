import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Clock } from 'lucide-react';
import { AIRBNB_LOCATION, MUST_VISIT_SPOTS } from '../data/mockData';
import { getRouteDistanceAndTime } from '../utils/osrm';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom HTML Markers
const createCustomMarker = (type, title = '') => {
  let isPrimary = type === 'home';
  let isBeach = title.toLowerCase().includes('beach') || title.includes('Παραλία');
  
  let iconSvg = '';
  if (isPrimary) {
    iconSvg = '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>';
  } else if (type === 'restaurant') {
    iconSvg = '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>';
  } else if (type === 'museum') {
    iconSvg = '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>';
  } else if (isBeach) {
    iconSvg = '<path d="M2 6c.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6"/><path d="M2 12c.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6"/><path d="M2 18c.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.7 2.2-.7 3.1 0 .5.4 1.1.6 1.7.6"/>';
  } else {
    iconSvg = '<circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>';
  }

  let markerClass = 'spot';
  if (isPrimary) markerClass = 'primary';
  else if (type === 'restaurant') markerClass = 'restaurant';
  else if (type === 'museum') markerClass = 'museum';
  else if (isBeach) markerClass = 'beach';

  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-pin ${markerClass}">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               ${iconSvg}
             </svg>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

function MapUpdater({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 0) {
      map.fitBounds(L.polyline(route).getBounds(), { padding: [50, 50] });
    } else {
      map.setView(AIRBNB_LOCATION.coordinates, 10);
    }
  }, [route, map]);
  return null;
}

export default function MapSection({ activeSpotId, language = 'en' }) {
  const [distances, setDistances] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isFerry, setIsFerry] = useState(false);

  const t = {
    en: { title: 'Explore the Area', subtitle: 'Tap a location to see distance & duration' },
    el: { title: 'Εξερευνήστε', subtitle: 'Επιλέξτε τοποθεσία για απόσταση' },
    tr: { title: 'Bölgeyi Keşfedin', subtitle: 'Mesafe görmek için bir konuma dokunun' }
  }[language];

  useEffect(() => {
    // Fetch distances for all spots
    const fetchDistances = async () => {
      const results = {};
      for (const spot of MUST_VISIT_SPOTS) {
        let profile = 'driving';
        
        if (spot.type === 'restaurant') {
          // Calculate approx distance in km using Pythagorean theorem on lat/lng
          const dx = (spot.coordinates[0] - AIRBNB_LOCATION.coordinates[0]) * 111;
          const dy = (spot.coordinates[1] - AIRBNB_LOCATION.coordinates[1]) * 85;
          const approxDist = Math.sqrt(dx * dx + dy * dy);
          
          // If less than 2.5km, calculate walking time, otherwise driving
          profile = approxDist < 2.5 ? 'walking' : 'driving';
        }

        const route = await getRouteDistanceAndTime(AIRBNB_LOCATION.coordinates, spot.coordinates, profile);
        if (route) {
          results[spot.id] = { ...route, profile };
        }
        // Small delay to prevent OSRM rate limits (HTTP 429 Too Many Requests)
        await new Promise(r => setTimeout(r, 200));
      }
      setDistances(results);
    };

    fetchDistances();
  }, []);

  const handleSelectRoute = async (spotId) => {
    let routeData = distances[spotId];

    // If route isn't loaded yet, fetch it on the fly
    if (!routeData) {
      const spot = MUST_VISIT_SPOTS.find(s => s.id === spotId);
      if (spot) {
        let profile = 'driving';
        if (spot.type === 'restaurant') {
          const dx = (spot.coordinates[0] - AIRBNB_LOCATION.coordinates[0]) * 111;
          const dy = (spot.coordinates[1] - AIRBNB_LOCATION.coordinates[1]) * 85;
          const approxDist = Math.sqrt(dx * dx + dy * dy);
          profile = approxDist < 2.5 ? 'walking' : 'driving';
        }
        routeData = await getRouteDistanceAndTime(AIRBNB_LOCATION.coordinates, spot.coordinates, profile);
        if (routeData) {
           routeData.profile = profile;
           setDistances(prev => ({...prev, [spotId]: routeData}));
        }
      }
    }

    if (routeData && routeData.geometry) {
      // Convert [lng, lat] to [lat, lng] for Leaflet Polyline
      const latLngs = routeData.geometry.map(coord => [coord[1], coord[0]]);
      setSelectedRoute(latLngs);
      setIsFerry(false);
    } else {
      setSelectedRoute(null);
    }
    
    // Always scroll to map
    document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Watch for activeSpotId changes from the parent component (e.g., LocalGuide clicks)
  useEffect(() => {
    if (activeSpotId && distances[activeSpotId]) {
      handleSelectRoute(activeSpotId);
    }
  }, [activeSpotId, distances]);



  return (
    <section id="map-section" className="section animate-fade-in-up delay-200">
      <div className="section-header">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle" style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
          {t.subtitle}
        </p>
      </div>

      <div className="map-container">
        <MapContainer 
          center={AIRBNB_LOCATION.coordinates} 
          zoom={10} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          scrollWheelZoom={typeof window !== 'undefined' && window.innerWidth >= 1024}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <MapUpdater route={selectedRoute} />

          {/* Airbnb Marker */}
          <Marker position={AIRBNB_LOCATION.coordinates} icon={createCustomMarker('home')}>
            <Popup>
              <strong>{AIRBNB_LOCATION.title}</strong><br/>
              Your stay is here.
            </Popup>
          </Marker>

          {/* Attraction Markers */}
          {MUST_VISIT_SPOTS.map((spot) => (
            <Marker key={`marker-${spot.id}`} position={spot.coordinates} icon={createCustomMarker(spot.type, spot.title.en)}>
              <Popup>
                <div 
                  style={{ cursor: 'pointer', color: 'var(--color-primary, #007bff)', textDecoration: 'underline' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectRoute(spot.id);
                  }}
                  title="Click to show route"
                >
                  <strong>{spot.title[language]}</strong>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Route Polyline */}
          {selectedRoute && (
            <Polyline 
              positions={selectedRoute} 
              color={isFerry ? "#0ea5e9" : "#2b5cff"} 
              weight={isFerry ? 4 : 5} 
              opacity={isFerry ? 0.9 : 0.8} 
              dashArray={isFerry ? "8, 12" : "10, 10"} 
            />
          )}
        </MapContainer>
      </div>

      <div className="map-list">
        {MUST_VISIT_SPOTS.map((spot) => {
          return (
            <div 
              key={`list-${spot.id}`} 
              className="map-list-item" 
              onClick={() => handleSelectRoute(spot.id)}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease', alignItems: 'center' }}
            >
              <img src={spot.image} alt={spot.title[language]} className="map-list-img" style={{ width: '56px', height: '56px', transition: 'all 0.3s ease' }} loading="lazy" />
              <div className="map-list-info">
                <h4 className="map-list-title">{spot.title[language]}</h4>
                <p className="map-list-desc" style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--color-text-muted)', 
                  marginBottom: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  {spot.description[language]}
                </p>
                <div className="map-list-meta">
                  <div className="meta-item">
                    <Navigation size={14} />
                    <span>
                      {distances[spot.id] ? `${distances[spot.id].distance} km` : 'Calc...'}
                    </span>
                  </div>
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>
                      {distances[spot.id] ? `${distances[spot.id].duration} min ${distances[spot.id].profile === 'walking' ? 'walk' : 'drive'}` : '...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
