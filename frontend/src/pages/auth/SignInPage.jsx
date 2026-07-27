import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Sparkles, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export function SignInPage() {
  const navigate = useNavigate();
  const { updateFarmerProfile } = useAuthStore();

  const handleQuickLogin = () => {
    updateFarmerProfile({
      name: 'Ramesh Kumar',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      isAuthenticated: true,
    });
    navigate('/dashboard');
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
          <p className="text-xs text-emerald-100 m-0">Sign in to access personalized Mandi price advice & AI selling engine.</p>
        </div>

        {/* Production Clerk SignIn Container */}
        <div className="w-full flex justify-center">
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/signup"
            fallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: 'w-full',
                cardBox: 'w-full shadow-2xl rounded-[32px]',
                card: 'w-full bg-white shadow-2xl rounded-[32px] p-6 sm:p-8 border border-slate-200/80 relative overflow-hidden',
                headerTitle: 'text-2xl font-black text-slate-900 tracking-tight text-left pr-8',
                headerSubtitle: 'text-xs text-slate-500 mt-1 font-semibold text-left mb-3',
                socialButtonsBlockButton: 'w-full rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-900 font-extrabold py-3.5 flex items-center justify-center transition-all mb-2',
                dividerLine: 'bg-slate-200',
                dividerText: 'text-slate-400 text-xs font-bold uppercase bg-white px-2',
                formFieldLabel: 'text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1',
                formFieldInput: 'w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-bold text-slate-900 custom-input',
                formButtonPrimary: 'w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 active:scale-[0.98] cursor-pointer mt-3 border-0',
                footerActionText: 'text-xs text-slate-500 font-bold',
                footerActionLink: 'text-emerald-700 hover:text-emerald-800 font-black ml-1 no-underline',
                footer: 'bg-transparent border-t border-slate-100 pt-3 mt-3',
              },
              variables: {
                colorPrimary: '#16a34a',
                colorText: '#0f172a',
                borderRadius: '1rem',
              }
            }}
          />
        </div>

        {/* Backup Quick One-Click Login Button */}
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-[28px] p-5 text-center space-y-2 shadow-sm">
          <div className="flex items-center justify-center space-x-1.5 text-xs text-emerald-900 font-black">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Instant Demo Sign In</span>
          </div>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs transition-all border-0 shadow-md cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>⚡ Instant One-Click Farmer Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
