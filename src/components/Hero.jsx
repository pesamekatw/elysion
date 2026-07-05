import React from 'react';
import { Compass } from 'lucide-react';

export default function Hero({ language = 'en', setLanguage }) {
  const handleExplore = () => {
    document.getElementById('guide-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const t = {
    en: { welcome: 'Welcome to Elysion Apartments', subtitle: 'Your ultimate digital guidebook to the island.', explore: 'Explore the Island' },
    el: { welcome: 'Καλώς ήρθατε στο Elysion Apartments', subtitle: 'Ο ψηφιακός σας οδηγός για το νησί.', explore: 'Εξερευνήστε' },
    tr: { welcome: 'Elysion Apartments\'a Hoşgeldiniz', subtitle: 'Adayı keşfetmek için dijital rehberiniz.', explore: 'Adayı Keşfet' }
  }[language];

  return (
    <section className="hero">
      <div className="language-switcher glass-panel" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, display: 'flex', gap: '8px', padding: '6px 12px', borderRadius: '20px' }}>
        <button onClick={() => setLanguage('en')} style={{ background: 'none', border: 'none', color: language === 'en' ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: language === 'en' ? 'bold' : 'normal', cursor: 'pointer' }}>EN</button>
        <span style={{ color: 'var(--color-text-light)' }}>|</span>
        <button onClick={() => setLanguage('el')} style={{ background: 'none', border: 'none', color: language === 'el' ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: language === 'el' ? 'bold' : 'normal', cursor: 'pointer' }}>EL</button>
        <span style={{ color: 'var(--color-text-light)' }}>|</span>
        <button onClick={() => setLanguage('tr')} style={{ background: 'none', border: 'none', color: language === 'tr' ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: language === 'tr' ? 'bold' : 'normal', cursor: 'pointer' }}>TR</button>
      </div>

      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content animate-fade-in-up">
        <h1 className="hero-title">{t.welcome}</h1>
        <p className="hero-subtitle">{t.subtitle}</p>
        <button onClick={handleExplore} className="btn-primary">
          <Compass size={20} />
          <span>{t.explore}</span>
        </button>
      </div>
    </section>
  );
}
