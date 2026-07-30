import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ArrowRight, Lock, Phone } from 'lucide-react';

export function SignInPage() {
  const navigate = useNavigate();
  const { updateFarmerProfile } = useAuthStore();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoOtp, setDemoOtp] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `+91${phoneNumber}` })
      });
      const data = await res.json();
      if (data.success) {
        setStep(2);
        if (data.isDemoMode && data.activeOtp) {
          setDemoOtp(data.activeOtp);
        }
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `+91${phoneNumber}`, otp })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        updateFarmerProfile({
          name: data.user.name || 'Farmer',
          phoneNumber: data.user.phoneNumber,
          isAuthenticated: true,
        });
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md mx-auto space-y-5">
        
        {/* Brand Header */}
        <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md border border-white/20">
            🌾
          </div>
          <h1 className="text-2xl font-black text-white m-0 tracking-tight">AgroPrice AI Portal</h1>
          <p className="text-xs text-emerald-100 m-0">Secure OTP Login for Farmers.</p>
        </div>

        {/* Auth Box */}
        <div className="w-full bg-white shadow-2xl rounded-[32px] p-6 sm:p-8 border border-slate-200/80">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            {step === 1 ? 'Enter your mobile number' : 'Verify OTP'}
          </h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">{error}</div>}
          
          {demoOtp && step === 2 && (
            <div className="mb-4 p-3 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl border border-amber-200">
              [DEMO MODE] Use OTP: {demoOtp}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1 block">Mobile Number (India)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 font-bold">+91</span>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Phone className="absolute right-4 w-5 h-5 text-slate-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || phoneNumber.length < 10}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/30 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Sending...' : 'Send OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1 block">One-Time Password</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-center tracking-[0.5em] text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/30 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Verifying...' : 'Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 py-2 cursor-pointer"
              >
                Change mobile number
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
