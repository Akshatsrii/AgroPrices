import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export function SignInPage() {
  const navigate = useNavigate();
  const { updateFarmerProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://agroprices.onrender.com/api';
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        
        // Update global auth state with actual DB user data
        updateFarmerProfile({
          name: data.user.name,
          email: data.user.email,
          district: data.user.district,
          state: data.user.state,
          isAuthenticated: true,
        });
        
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative font-sans">
      {/* Background Image / Blur (Optional, adapts to your theme) */}
      <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-sm -z-10"></div>
      
      {/* Modal Container */}
      <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 relative">
        
        {/* Close Button (Optional placeholder) */}
        <button onClick={() => navigate('/')} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 transition-colors">
          ✕
        </button>

        {/* Header */}
        <div className="mt-4 mb-8">
          <h1 className="text-[32px] font-black text-slate-900 tracking-tight leading-tight">
            Welcome Back
          </h1>
          <p className="text-[15px] font-medium text-slate-500 mt-2">
            Sign in to access your AgroPrice AI dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-[13px] font-bold rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email address"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-[18px] text-[15px] font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
          </div>

          <div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Password"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-[18px] text-[15px] font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.email || !formData.password}
            className="w-full bg-black hover:bg-slate-900 disabled:opacity-50 text-white font-bold py-[18px] rounded-2xl text-[16px] transition-all cursor-pointer mt-6"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="h-px bg-slate-100 w-full mt-8 mb-6"></div>

        {/* Footer */}
        <div className="text-center text-[14px] font-medium text-slate-500">
          New to AgroPrice?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}
