import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export function DashboardHomePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('agro_farmer_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const farmerName = profile.fullName || user?.firstName || 'Gurpreet Singh';
  const locationText = `${profile.district || 'Ludhiana'}, ${profile.state || 'Punjab'}`;

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-sm">
            <span>📍</span> {locationText}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Welcome, {farmerName}! 👋
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base mb-6 leading-relaxed">
            Get instant AI recommendations on whether to sell to your local village trader or transport to nearby APMC Mandis for maximum profit.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Link
              to="/sell/crop"
              className="bg-white text-emerald-900 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg hover:bg-emerald-50 transition-all no-underline inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>🌾</span> Sell Crop Now (AI Engine) &rarr;
            </Link>
            <Link
              to="/dashboard/market"
              className="bg-emerald-900/40 hover:bg-emerald-900/60 text-white font-bold text-sm px-5 py-3.5 rounded-2xl backdrop-blur-sm border border-white/20 transition-all no-underline inline-flex items-center gap-2"
            >
              <span>📈</span> Check Live Mandi Prices
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Wheat (गेहूं) Today</p>
          <p className="text-2xl font-black text-slate-900 mb-1">₹2,350 <span className="text-xs font-bold text-emerald-600">/ quintal</span></p>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">↑ +₹40 Today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Paddy (धान) Today</p>
          <p className="text-2xl font-black text-slate-900 mb-1">₹2,203 <span className="text-xs font-bold text-emerald-600">/ quintal</span></p>
          <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">Stable (Govt MSP)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Potato (आलू) Today</p>
          <p className="text-2xl font-black text-slate-900 mb-1">₹1,480 <span className="text-xs font-bold text-emerald-600">/ quintal</span></p>
          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">↑ High Mandi Demand</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nearest Mandi</p>
          <p className="text-lg font-black text-slate-900 mb-1">Khanna APMC</p>
          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">🚗 14 KM Distance</span>
        </div>
      </div>

      {/* Main Grid: Live Market Ticker & Quick USP Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Mandi Overview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 m-0">Live Mandi Prices & Trends</h2>
              <p className="text-xs text-gray-500 m-0">Real-time rates from your nearest regional Mandis</p>
            </div>
            <Link to="/dashboard/market" className="text-xs font-bold text-emerald-600 hover:underline no-underline">
              View All Mandis &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { mandi: 'Khanna APMC', crop: 'Wheat (गेहूं)', price: '₹2,380/q', trend: '↑ +₹50', distance: '14 KM', status: 'High Buying' },
              { mandi: 'Ludhiana Main Mandi', crop: 'Paddy (धान)', price: '₹2,210/q', trend: '↑ +₹15', distance: '22 KM', status: 'Steady' },
              { mandi: 'Samrala Mandi', crop: 'Potato (आलू)', price: '₹1,510/q', trend: '↑ +₹80', distance: '8 KM', status: 'Peaking' },
              { mandi: 'Jalandhar Grain Market', crop: 'Mustard (सरसों)', price: '₹5,450/q', trend: '↑ +₹120', distance: '45 KM', status: 'Top Rate' },
            ].map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/80 transition-all border border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">{m.mandi}</h3>
                  <p className="text-xs text-gray-500 m-0">{m.crop} • {m.distance}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-extrabold text-slate-900 m-0">{m.price}</p>
                  <span className="text-[11px] font-bold text-emerald-600">{m.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Selling Recommendation Preview */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider mb-4">
              <span>🤖</span> AI Decision Assist
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              Should you sell to local trader or transport to Mandi?
            </h3>
            <p className="text-xs text-gray-600 mb-6 leading-relaxed">
              Our AI decision engine factors in your village trader offer, transport freight charges, mandi taxes, and 7-day price trends to give you the exact net profit comparison.
            </p>
          </div>

          <Link
            to="/sell/crop"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-center text-sm shadow-md shadow-emerald-600/20 transition-all no-underline block"
          >
            Start 8-Step AI Analysis &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
