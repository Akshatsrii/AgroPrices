import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NEARBY_MANDIS = [
  { id: 'ramganj', name: 'Ramganj Mandi', distance: 18, rate: 20, rating: '★★★★★', netProfit: 1360, status: '⭐ Best Profit' },
  { id: 'kota', name: 'Kota APMC Mandi', distance: 32, rate: 19, rating: '★★★★☆', netProfit: 1280, status: 'Good Option' },
  { id: 'bundi', name: 'Bundi Grain Market', distance: 25, rate: 18, rating: '★★★☆☆', netProfit: 1220, status: 'Average' },
  { id: 'khanna', name: 'Khanna APMC Mandi', distance: 14, rate: 23.8, rating: '★★★★★', netProfit: 2330, status: 'High Payout' },
];

export function NearbyMandisPage() {
  const [filter, setFilter] = useState('Highest Profit');

  const sortedMandis = [...NEARBY_MANDIS].sort((a, b) => {
    if (filter === 'Distance') return a.distance - b.distance;
    if (filter === 'Price') return b.rate - a.rate;
    return b.netProfit - a.netProfit; // Highest Profit
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            📍 Google Maps Style Directory
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0 mt-1">Nearby APMC Mandis</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Compare Mandi distances, live rates, ratings, and estimated net profit.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-600">Sort By:</label>
          <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
            {['Highest Profit', 'Distance', 'Price'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border-0 cursor-pointer ${
                  filter === f ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedMandis.map(m => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {m.status}
                </span>
                <h3 className="text-xl font-black text-slate-900 m-0 mt-1">{m.name}</h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">📍 Distance: {m.distance} KM from your farm</p>
              </div>
              <div className="text-right">
                <span className="text-yellow-500 text-xs font-bold block">{m.rating}</span>
                <p className="text-xl font-black text-slate-900 m-0 mt-0.5">₹{m.rate}/kg</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Net Payout (70 KG):</span>
              <strong className="text-base font-black text-emerald-900">₹{m.netProfit.toLocaleString()}</strong>
            </div>

            <Link
              to={`/market/details/${m.id}`}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-2xl text-center block no-underline transition-all shadow-sm"
            >
              View Full Mandi Details &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
