import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      navigate('/auth/otp');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-header">
        <div className="auth-logo-icon">📱</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Enter your 10-digit mobile number</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="auth-form-group">
          <label className="auth-label">Mobile Number</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f3f4f6', 
              border: '1px solid #d1d5db', 
              borderRadius: '12px',
              fontWeight: '600',
              color: '#4b5563'
            }}>+91</div>
            <input 
              type="tel" 
              className="auth-input" 
              style={{ flex: 1 }}
              placeholder="98765 43210"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              autoFocus
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button 
            type="submit" 
            className="auth-btn-primary"
            disabled={mobile.length !== 10}
            style={{ opacity: mobile.length === 10 ? 1 : 0.5 }}
          >
            Get OTP
          </button>
          
          <div className="bottom-link">
            Don't have an account? <Link to="/auth/signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
