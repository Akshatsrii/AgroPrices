import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, TrendingUp, Star, ArrowRight } from 'lucide-react';

const NEARBY_MANDIS = [
  { id: 'indore', name: 'Indore Central Mandi', district: 'Indore', distance: 28, rate: 2480, rating: '4.8', netProfit: 119932, status: 'Best Net Profit', travelTime: '0h 42m' },
  { id: 'sehore', name: 'Sehore APMC Mandi', district: 'Sehore', distance: 12, rate: 2420, rating: '4.6', netProfit: 116200, status: 'Closest Distance', travelTime: '0h 18m' },
  { id: 'bhopal', name: 'Karond Mandi Bhopal', district: 'Bhopal', distance: 38, rate: 2450, rating: '4.7', netProfit: 117800, status: 'High Demand', travelTime: '0h 55m' },
  { id: 'dewas', name: 'Dewas Grain Market', district: 'Dewas', distance: 45, rate: 2410, rating: '4.4', netProfit: 114500, status: 'Moderate', travelTime: '1h 05m' },
];

export function NearbyMandisPage() {
  const [filter, setFilter] = useState('Highest Profit');

  const sortedMandis = [...NEARBY_MANDIS].sort((a, b) => {
    if (filter === 'Distance') return a.distance - b.distance;
    if (filter === 'Price') return b.rate - a.rate;
    return b.netProfit - a.netProfit; // Highest Profit
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Google Maps GPS Distance Radar
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0 mt-1">Nearby APMC Mandis</h1>
          <p className="text-xs sm:text-sm text-slate-500 m-0 mt-1">Compare Mandi distances, travel times, live rates, and estimated net profit.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600">Sort By:</label>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {['Highest Profit', 'Distance', 'Price'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border-0 cursor-pointer ${
                  filter === f ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedMandis.map(m => (
          <div key={m.id} className="bg-white p-6 sm:p-7 rounded-[32px] border border-slate-200/80 shadow-sm space-y-5 hover:shadow-lg transition-all card-hover-effect flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {m.status}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 m-0 mt-2 tracking-tight">{m.name}</h3>
                  <p className="text-xs text-slate-500 m-0">{m.district}, Madhya Pradesh</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-xl font-black text-xs border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{m.rating}</span>
                </div>
              </div>

              {/* Rate & Net Profit Box */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Live Rate (Wheat)</span>
                  <p className="text-xl font-black text-slate-900 m-0">₹{m.rate} <span className="text-xs text-slate-500 font-bold">/ Qtl</span></p>
                </div>

                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/80">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Est. Net Profit</span>
                  <p className="text-xl font-black text-emerald-950 m-0">₹{m.netProfit.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 pt-1 font-semibold">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{m.distance} KM Distance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>{m.travelTime} Travel</span>
                </div>
              </div>
            </div>

            <Link
              to={`/market/details/${m.id}`}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center space-x-2 no-underline transition-all shadow-md active:scale-98 cursor-pointer mt-2"
            >
              <span>View Mandi Price Matrix</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
