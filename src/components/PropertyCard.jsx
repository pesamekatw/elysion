import React, { useState } from 'react';
import { MapPin, Copy, Check } from 'lucide-react';
import { AIRBNB_LOCATION } from '../data/mockData';

export default function PropertyCard({ language = 'en' }) {
  const [copied, setCopied] = useState(false);

  const t = {
    en: { location: 'Your Stay', copy: 'Copy Address', copied: 'Copied!' },
    el: { location: 'Η Διαμονή σας', copy: 'Αντιγραφή Διεύθυνσης', copied: 'Αντιγράφηκε!' },
    tr: { location: 'Konaklamanız', copy: 'Adresi Kopyala', copied: 'Kopyalandı!' }
  }[language];

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(AIRBNB_LOCATION.address);
      } else {
        // Fallback for non-HTTPS local network testing
        const textArea = document.createElement("textarea");
        textArea.value = AIRBNB_LOCATION.address;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="property-card-container animate-fade-in-up delay-100">
      <div className="glass-panel property-card">
        <div className="property-icon">
          <MapPin size={24} color="#ef4444" />
        </div>
        <div className="property-info">
          <h3>{t.location}</h3>
          <p>{AIRBNB_LOCATION.title}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
            {AIRBNB_LOCATION.address}
          </p>
        </div>
        <button className="btn-icon" onClick={handleCopy} aria-label={t.copy}>
          {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  );
}
