import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ArrowRight, User, Mail, MapPin } from 'lucide-react';

export function SignUpPage() {
  const navigate = useNavigate();
  const { updateFarmerProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Split location into district and state loosely if there's a comma
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
          district,
          state
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
        setError(data.error || 'Failed to register account');
      }
    } catch (err) {
      console.error(err);
      setError('Network error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md mx-auto space-y-5">
        
        {/* Brand Header */}
        <div className="hero-gradient text-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-center space-y-2 border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md border border-white/20">
            A
          </div>
          <h1 className="text-2xl font-black text-white m-0 tracking-tight">Join AgroPrice AI</h1>
          <p className="text-xs text-emerald-100 m-0">Create your free farmer account.</p>
        </div>

        {/* Auth Box */}
        <div className="w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-8 border border-gray-100">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            Register Account
          </h2>
          
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 block">Full Name</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ramesh Kumar"
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                <User className="absolute left-4 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 block">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="ramesh@example.com"
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 block">Location (City, State)</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Sehore, MP"
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
                <MapPin className="absolute left-4 w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !formData.name || !formData.email || !formData.location}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 active:scale-[0.98] mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Register Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
