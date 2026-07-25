import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useUser } from '@clerk/clerk-react';

export function DashboardHomePage() {
  const { user: storeUser } = useAuthStore();
  
  let clerkUser = null;
  try {
    const clerk = useUser();
    clerkUser = clerk?.user;
  } catch (e) {}

  const displayName = clerkUser?.fullName || clerkUser?.firstName || storeUser?.name || 'Ramesh Kumar';
  const districtName = storeUser?.district || 'Sehore';
  const stateName = storeUser?.state || 'Madhya Pradesh';
  const locationText = `${districtName}, ${stateName}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* 1. Hero Greeting Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-700/50 backdrop-blur px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-xs font-bold text-emerald-200 mb-2">
            <span>👨‍🌾 Welcome, {displayName} • {locationText}</span>
          </div>
          <h1 className="text-3xl font-black text-white m-0 mt-1 tracking-tight">
            Hello {displayName} 👋
          </h1>
          <p className="text-xs text-emerald-100 m-0 mt-1">Welcome back to your AgroPrice AI Decision Hub.</p>
        </div>

        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl">
            🍅
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-200 block">Today's Best Crop</span>
            <strong className="text-base text-white font-black">Tomato ↑ (+5% Price Surge)</strong>
          </div>
        </div>
      </div>

      {/* 2. Market Summary */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">📊 Market Rate Summary Today</h2>
        
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-bold text-gray-600 block">Tomato (टमाटर)</span>
            <p className="text-xl font-black text-emerald-800 m-0">₹20/kg</p>
            <span className="text-emerald-700 font-extrabold text-[11px] block">↑ +5% Today</span>
          </div>

          <div className="p-4 bg-red-50 rounded-2xl border border-red-200 space-y-1">
            <span className="font-bold text-gray-600 block">Onion (प्याज़)</span>
            <p className="text-xl font-black text-red-800 m-0">₹17/kg</p>
            <span className="text-red-700 font-extrabold text-[11px] block">↓ -3% Today</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-bold text-gray-600 block">Wheat (गेहूं)</span>
            <p className="text-xl font-black text-emerald-800 m-0">₹2,480/Qtl</p>
            <span className="text-emerald-700 font-extrabold text-[11px] block">↑ +4.8% Tomorrow</span>
          </div>
        </div>
      </div>

      {/* 3. Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/sell/crop"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-6 rounded-3xl shadow-lg shadow-emerald-600/20 no-underline block transition-all active:scale-98"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">🌾</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">USP Module</span>
          </div>
          <h3 className="text-xl font-black m-0 mt-3">Sell Crop (AI Decision Engine)</h3>
          <p className="text-xs text-emerald-100 m-0 mt-1">Get AI recommendation score, net profit & trader negotiation script in 8 quick steps.</p>
        </Link>

        <Link
          to="/market/nearby"
          className="bg-slate-900 hover:bg-slate-800 text-white p-6 rounded-3xl shadow-lg no-underline block transition-all active:scale-98"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">📍</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase">Google Maps</span>
          </div>
          <h3 className="text-xl font-black m-0 mt-3">Nearby Mandis Radar</h3>
          <p className="text-xs text-slate-300 m-0 mt-1">Discover Mandis within 50 km radius with exact travel time & fuel transport cost math.</p>
        </Link>
      </div>

    </div>
  );
}
