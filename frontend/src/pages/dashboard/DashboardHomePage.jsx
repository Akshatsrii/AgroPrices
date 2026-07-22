import React from 'react';
import { Link } from 'react-router-dom';

export function DashboardHomePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* 1. Hero Greeting Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            ☀️ Good Morning
          </span>
          <h1 className="text-3xl font-black text-white m-0 mt-1 tracking-tight">
            Hello Ramesh 👋
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
            <span className="font-bold text-gray-600 block">Potato (आलू)</span>
            <p className="text-xl font-black text-emerald-800 m-0">₹15/kg</p>
            <span className="text-emerald-700 font-extrabold text-[11px] block">↑ +2% Today</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/sell/crop" className="bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-3xl no-underline font-extrabold text-sm shadow-lg shadow-emerald-600/20 transition-all flex flex-col justify-between h-32">
          <span className="text-2xl">🌾</span>
          <span>Sell Crop Wizard &rarr;</span>
        </Link>

        <Link to="/market/nearby" className="bg-white hover:bg-gray-50 border border-gray-200 text-slate-900 p-5 rounded-3xl no-underline font-extrabold text-sm shadow-sm transition-all flex flex-col justify-between h-32">
          <span className="text-2xl">📍</span>
          <span>Nearby Mandis &rarr;</span>
        </Link>

        <Link to="/assistant/chat" className="bg-white hover:bg-gray-50 border border-gray-200 text-slate-900 p-5 rounded-3xl no-underline font-extrabold text-sm shadow-sm transition-all flex flex-col justify-between h-32">
          <span className="text-2xl">🤖</span>
          <span>AI Chat Assistant &rarr;</span>
        </Link>

        <Link to="/farmer-history/sales" className="bg-white hover:bg-gray-50 border border-gray-200 text-slate-900 p-5 rounded-3xl no-underline font-extrabold text-sm shadow-sm transition-all flex flex-col justify-between h-32">
          <span className="text-2xl">📜</span>
          <span>Sales History &rarr;</span>
        </Link>
      </div>

      {/* 4. Live Alerts Feed */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">🔔 Live Farmer Alerts Feed</h2>

        <div className="space-y-2 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <span className="text-lg">📈</span>
            <div>
              <strong className="text-emerald-950 font-black block">Tomorrow Tomato prices may increase by +5%</strong>
              <p className="text-emerald-800 m-0 mt-0.5">High demand in Kota & Ramganj Mandis due to hotel inquiries.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <span className="text-lg">🌧️</span>
            <div>
              <strong className="text-amber-950 font-black block">Heavy rain expected in 48 hours</strong>
              <p className="text-amber-800 m-0 mt-0.5">Harvest crops early or cover transport trolleys before heading to Mandi.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <span className="text-lg">🏛️</span>
            <div>
              <strong className="text-blue-950 font-black block">New MSP announced for Wheat (₹2,275/q)</strong>
              <p className="text-blue-800 m-0 mt-0.5">Government procurement centers opening next Monday.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
