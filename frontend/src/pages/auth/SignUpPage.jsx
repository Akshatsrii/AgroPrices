import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export function SignUpPage() {
  const navigate = useNavigate();
  const { updateFarmerProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const parts = formData.location.split(',');
      const district = parts[0] ? parts[0].trim() : formData.location;
      const state = parts[1] ? parts[1].trim() : '';

      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://agroprices.onrender.com/api';
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          district,
          state
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        
        updateFarmerProfile({
          name: data.user.name,
          email: data.user.email,
          district: data.user.district,
          state: data.user.state,
          isAuthenticated: true,
        });
        
        navigate('/dashboard');
      } else {
        setError(data.error || 'Failed to create account.');
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
      <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-sm -z-10"></div>
      
      <div className="w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 relative">
        
        <button onClick={() => navigate('/')} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 transition-colors">
          ✕
        </button>

        <div className="mt-4 mb-8">
          <h1 className="text-[32px] font-black text-slate-900 tracking-tight leading-tight">
            Create Account
          </h1>
          <p className="text-[15px] font-medium text-slate-500 mt-2">
            Join AgroPrice AI to access predictive insights.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-[13px] font-bold rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Full Name"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-[18px] text-[15px] font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
          </div>

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

          <div>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Location (e.g. Sehore, MP)"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-[18px] text-[15px] font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.name || !formData.email || !formData.password || !formData.location}
            className="w-full bg-black hover:bg-slate-900 disabled:opacity-50 text-white font-bold py-[18px] rounded-2xl text-[16px] transition-all cursor-pointer mt-6"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="h-px bg-slate-100 w-full mt-8 mb-6"></div>

        <div className="text-center text-[14px] font-medium text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
