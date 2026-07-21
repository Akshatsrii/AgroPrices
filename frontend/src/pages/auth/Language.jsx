import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Language() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const languages = [
    { id: 'en', native: 'English', eng: 'English' },
    { id: 'hi', native: 'हिंदी', eng: 'Hindi' },
    { id: 'mr', native: 'मराठी', eng: 'Marathi' },
    { id: 'pa', native: 'ਪੰਜਾਬੀ', eng: 'Punjabi' }
  ];

  const handleNext = () => {
    if (selected) {
      navigate('/auth/login');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-header">
        <h1 className="auth-title">Choose Language</h1>
        <p className="auth-subtitle">Select your preferred language</p>
      </div>

      <div className="lang-grid">
        {languages.map(lang => (
          <div 
            key={lang.id} 
            className={`lang-card ${selected === lang.id ? 'active' : ''}`}
            onClick={() => setSelected(lang.id)}
          >
            <div className="lang-native">{lang.native}</div>
            <div className="lang-eng">{lang.eng}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button 
          className="auth-btn-primary" 
          onClick={handleNext}
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.5 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
