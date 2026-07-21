import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // After signup, verify OTP
    navigate('/auth/otp');
  };

  return (
    <div className="auth-screen" style={{ padding: '1.5rem' }}>
      <div className="auth-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join thousands of smart farmers</p>
      </div>

      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="auth-form-group">
          <label className="auth-label">Full Name</label>
          <input type="text" className="auth-input" placeholder="e.g. Ramesh Kumar" required />
        </div>

        <div className="auth-form-group">
          <label className="auth-label">Mobile Number</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ 
              padding: '1rem', backgroundColor: '#f3f4f6', 
              border: '1px solid #d1d5db', borderRadius: '12px',
              fontWeight: '600', color: '#4b5563'
            }}>+91</div>
            <input 
              type="tel" className="auth-input" style={{ flex: 1 }}
              placeholder="98765 43210" maxLength="10" required
            />
          </div>
        </div>

        <div className="auth-form-group">
          <label className="auth-label">State / Region</label>
          <select className="auth-input" required>
            <option value="">Select State</option>
            <option value="MH">Maharashtra</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="UP">Uttar Pradesh</option>
            <option value="KA">Karnataka</option>
            <option value="GJ">Gujarat</option>
          </select>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <button type="submit" className="auth-btn-primary">
            Create Account
          </button>
          
          <div className="bottom-link">
            Already have an account? <Link to="/auth/login">Login Here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
