import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Sparkles, TrendingUp, MapPin, Bot, ShieldCheck, ArrowRight, Activity, Calendar } from 'lucide-react';

export function DashboardHomePage() {
  const { user: storeUser } = useAuthStore();
  
  const displayName = storeUser?.name || 'Ramesh Kumar';
  const districtName = storeUser?.district || 'Sehore';
  const stateName = storeUser?.state || 'Madhya Pradesh';
  const locationText = `${districtName}, ${stateName}`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 px-4 sm:px-6 font-sans">
      
      {/* 1. Ultra-Premium Hero Greeting Card */}
      <div className="hero-gradient text-white p-6 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-500/20">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>👨‍🌾 Welcome, {displayName} • {locationText}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white m-0 tracking-tight">
            Hello {displayName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 max-w-xl">
            Your personalized AgroPrice AI Decision Hub is ready. Wheat & Tomato prices are surging today!
          </p>
        </div>

        {/* Featured Signal Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 shrink-0 shadow-lg z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
            🍅
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-200 block">Today's Best Signal</span>
            <strong className="text-base text-white font-black block">Tomato ↑ (+5% Price Surge)</strong>
            <span className="text-[11px] text-emerald-100 font-bold">Indore Mandi: ₹20/kg</span>
          </div>
        </div>

        {/* Background Ambient Glow */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Live Market Rate Summary Cards */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">Live Mandi Market Rates Today</h2>
          </div>
          <Link to="/dashboard/market" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 no-underline flex items-center gap-1">
            <span>View All Mandis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-1 card-hover-effect">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700 text-xs">Tomato (टमाटर)</span>
              <span className="text-emerald-700 bg-emerald-100/80 font-black text-[10px] px-2 py-0.5 rounded-full">↑ +5%</span>
            </div>
            <p className="text-2xl font-black text-emerald-950 m-0">₹20<span className="text-xs font-bold text-slate-500"> / kg</span></p>
            <p className="text-[11px] text-emerald-700 font-bold m-0">Indore & Bhopal Mandis</p>
          </div>

          <div className="p-5 bg-red-50/70 rounded-2xl border border-red-200/80 space-y-1 card-hover-effect">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700 text-xs">Onion (प्याज़)</span>
              <span className="text-red-700 bg-red-100/80 font-black text-[10px] px-2 py-0.5 rounded-full">↓ -3%</span>
            </div>
            <p className="text-2xl font-black text-red-950 m-0">₹17<span className="text-xs font-bold text-slate-500"> / kg</span></p>
            <p className="text-[11px] text-red-700 font-bold m-0">Nashik & Sehore Mandis</p>
          </div>

          <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-1 card-hover-effect">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700 text-xs">Wheat (गेहूं)</span>
              <span className="text-emerald-700 bg-emerald-100/80 font-black text-[10px] px-2 py-0.5 rounded-full">↑ +4.8% Tomorrow</span>
            </div>
            <p className="text-2xl font-black text-emerald-950 m-0">₹2,480<span className="text-xs font-bold text-slate-500"> / Qtl</span></p>
            <p className="text-[11px] text-emerald-700 font-bold m-0">ML Predicted: ₹2,599/Qtl</p>
          </div>
        </div>
      </div>

      {/* 3. Primary Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          to="/sell/crop"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-7 rounded-[32px] shadow-xl shadow-emerald-600/20 no-underline block transition-all card-hover-effect relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="text-4xl group-hover:scale-110 transition-transform">🌾</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur">
              Main USP Module
            </span>
          </div>
          <h3 className="text-2xl font-black m-0 mt-4 tracking-tight">Sell Crop (AI Decision Engine)</h3>
          <p className="text-xs text-emerald-100 m-0 mt-2 leading-relaxed">
            Calculate AI recommendation score (0-100), net profit across mandis & trader counter-offer script in 8 simple steps.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-black text-white">
            <span>Start 8-Step Wizard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/market/nearby"
          className="bg-slate-900 hover:bg-slate-800 text-white p-7 rounded-[32px] shadow-xl no-underline block transition-all card-hover-effect relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="text-4xl group-hover:scale-110 transition-transform">📍</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-400 backdrop-blur">
              Google Maps Radar
            </span>
          </div>
          <h3 className="text-2xl font-black m-0 mt-4 tracking-tight">Nearby Mandis Radar</h3>
          <p className="text-xs text-slate-300 m-0 mt-2 leading-relaxed">
            Locate Mandis within 50 km radius with live GPS travel times (hours/mins) and freight fuel transport cost calculations.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-black text-emerald-400">
            <span>Open Maps Radar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

    </div>
  );
}
