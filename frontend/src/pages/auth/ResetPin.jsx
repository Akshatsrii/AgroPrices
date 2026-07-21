import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ResetPin() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    navigate('/auth/otp');
  };

  return (
    <div className="auth-screen">
      <div className="auth-header">
        <h1 className="auth-title">Reset PIN</h1>
        <p className="auth-subtitle">Enter your registered mobile number to reset your PIN</p>
      </div>

      <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="auth-form-group">
          <label className="auth-label">Mobile Number</label>
          <input 
            type="tel" 
            className="auth-input" 
            placeholder="Enter mobile number" 
            maxLength="10"
            required
          />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button type="submit" className="auth-btn-primary">
            Send Reset OTP
          </button>
          <button type="button" className="auth-btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
