import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value !== '' && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 4) {
      // In real app, verify OTP here. Then navigate to dashboard or onboarding
      // Since we only have marketing routes setup right now, redirect to home.
      navigate('/');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-header">
        <h1 className="auth-title">Verify Mobile</h1>
        <p className="auth-subtitle">We sent a 4-digit code to your number</p>
      </div>

      <div className="otp-container">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            className="otp-box"
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem', color: '#6b7280' }}>
        {timer > 0 ? (
          <span>Resend code in <strong style={{ color: '#f59e0b' }}>00:{timer < 10 ? `0${timer}` : timer}</strong></span>
        ) : (
          <button 
            onClick={() => setTimer(30)} 
            style={{ background: 'none', border: 'none', color: '#f59e0b', fontWeight: '700', cursor: 'pointer' }}
          >
            Resend OTP
          </button>
        )}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button 
          className="auth-btn-primary" 
          onClick={handleVerify}
          disabled={otp.join('').length !== 4}
          style={{ opacity: otp.join('').length === 4 ? 1 : 0.5 }}
        >
          Verify & Login
        </button>
        <button className="auth-btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
