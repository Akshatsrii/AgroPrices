import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Phone, ArrowRight, Shield, Sparkles } from 'lucide-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function SignInPage() {
  const navigate = useNavigate();
  const { sendOtp } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    sendOtp(phone);
    navigate('/auth/verify-otp');
  };

  // If Clerk key is explicitly provided, render Clerk SignIn component
  if (clerkPubKey) {
    return (
      <div className="w-full flex justify-center">
        <SignIn 
          routing="path" 
          path="/auth/login" 
          signUpUrl="/auth/signup"
          appearance={{
            elements: {
              rootBox: 'w-full',
              cardBox: 'w-full shadow-2xl rounded-[32px]',
              card: 'w-full bg-white shadow-2xl rounded-[32px] p-6 sm:p-8 border border-gray-100 relative overflow-hidden',
              headerTitle: 'text-2xl sm:text-3xl font-black text-gray-900 tracking-tight text-left pr-8',
              headerSubtitle: 'text-sm text-gray-500 mt-1 font-normal text-left mb-3',
              socialButtonsBlockButton: 'w-full rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 flex items-center justify-center transition-all mb-2',
              dividerLine: 'bg-gray-200',
              dividerText: 'text-gray-400 text-xs font-semibold uppercase bg-white px-2',
              formFieldLabel: 'text-xs font-bold text-gray-700 uppercase tracking-wider mb-1',
              formFieldInput: 'w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all font-medium',
              formButtonPrimary: 'w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer mt-3',
              footerActionText: 'text-sm text-gray-500 font-medium',
              footerActionLink: 'text-emerald-600 hover:text-emerald-700 font-bold ml-1 no-underline',
              footer: 'bg-transparent border-t border-gray-100 pt-3 mt-3',
            },
            variables: {
              colorPrimary: '#16a34a',
              colorText: '#0f172a',
              borderRadius: '0.75rem',
            }
          }}
        />
      </div>
    );
  }

  // Interactive Phone + OTP fallback UI for Farmers
  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Farmer Login</h2>
          <p className="text-xs text-gray-500">Enter mobile number to get OTP</p>
        </div>
      </div>

      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Mobile Number (मोबाइल नंबर)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-bold text-gray-500 border-r border-gray-300 pr-3">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-16 pr-4 py-3.5 text-base font-bold text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            />
          </div>
          {error && <p className="text-xs text-red-500 font-medium mt-1.5">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 cursor-pointer mt-4"
        >
          <span>Send OTP (ओटीपी भेजें)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
        New to AgroPrice AI?{' '}
        <Link to="/auth/signup" className="text-emerald-600 font-bold hover:underline">
          Register Farmer Account
        </Link>
      </div>
    </div>
  );
}
