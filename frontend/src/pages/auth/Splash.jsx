import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to language selection after 2 seconds
    const timer = setTimeout(() => {
      navigate('/auth/language');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-icon">🌱</div>
      <h1 className="splash-title">AgroPrice AI</h1>
      <p className="splash-subtitle">Decision Intelligence for Farmers</p>
    </div>
  );
}
