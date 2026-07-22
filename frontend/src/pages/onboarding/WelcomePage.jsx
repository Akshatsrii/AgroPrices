import React from 'react';
import { useNavigate } from 'react-router-dom';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 text-center relative overflow-hidden">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-6 border border-emerald-100">
          <span>🌾</span> Step 1 of 5 • Welcome
        </div>

        {/* Hero Icon */}
        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/20 text-white mb-6 animate-bounce">
          🚜
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
          Welcome to AgroPrice AI
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed max-w-md mx-auto">
          Let's setup your farmer profile in a few quick steps to get AI-powered market price predictions, mandi insights, and buyer connections tailored for your farm.
        </p>

        {/* Steps Preview Grid */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8">
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">1</div>
            <div>
              <p className="text-xs font-bold text-navy m-0">Farmer Profile</p>
              <p className="text-[11px] text-gray-500 m-0">Name & Location</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">2</div>
            <div>
              <p className="text-xs font-bold text-navy m-0">Farm & Crops</p>
              <p className="text-[11px] text-gray-500 m-0">Land size & Crops</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">3</div>
            <div>
              <p className="text-xs font-bold text-navy m-0">Transport</p>
              <p className="text-[11px] text-gray-500 m-0">Vehicle & Mandi</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">4</div>
            <div>
              <p className="text-xs font-bold text-navy m-0">Summary</p>
              <p className="text-[11px] text-gray-500 m-0">Review & Launch</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/onboarding/profile')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-[0.99]"
        >
          Start Setup &rarr;
        </button>
      </div>
    </div>
  );
}
