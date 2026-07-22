import React from 'react';
import { Link } from 'react-router-dom';

const NEARBY_MANDIS = [
  { id: 'khanna', name: 'Khanna APMC Mandi', district: 'Ludhiana', distance: 14, primaryCrops: 'Wheat, Paddy, Maize', arrivalToday: '4,500 q', status: 'Open • Active Trading', priceWheat: '₹2,380/q' },
  { id: 'samrala', name: 'Samrala Mandi', district: 'Ludhiana', distance: 8, primaryCrops: 'Potato, Vegetables', arrivalToday: '1,200 q', status: 'Open • Active Trading', priceWheat: '₹2,350/q' },
  { id: 'ludhiana-main', name: 'Ludhiana Main APMC', district: 'Ludhiana', distance: 22, primaryCrops: 'Wheat, Rice, Cotton', arrivalToday: '8,200 q', status: 'Open • High Demand', priceWheat: '₹2,360/q' },
  { id: 'moga', name: 'Moga Grain Market', district: 'Moga', distance: 38, primaryCrops: 'Paddy, Wheat', arrivalToday: '6,100 q', status: 'Open', priceWheat: '₹2,340/q' },
  { id: 'jalandhar', name: 'Jalandhar APMC', district: 'Jalandhar', distance: 45, primaryCrops: 'Mustard, Vegetables', arrivalToday: '2,900 q', status: 'Open', priceWheat: '₹2,370/q' },
];

export function NearbyMandisPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
            <span>📍</span> Location: Ludhiana, Punjab
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Nearby APMC Mandis 🚜</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Sorted by road distance from your farm location.</p>
        </div>

        <Link
          to="/market/compare"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm no-underline inline-flex items-center gap-1"
        >
          <span>📊</span> Compare All Mandis &rarr;
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NEARBY_MANDIS.map(m => (
          <div key={m.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  {m.status}
                </span>
                <span className="text-xs font-black text-slate-800 bg-gray-100 px-2.5 py-1 rounded-lg">
                  📍 {m.distance} KM
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 m-0">{m.name}</h3>
              <p className="text-xs text-gray-500 mt-1 m-0">Crops: {m.primaryCrops}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex justify-between items-center text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">Today's Rate:</span>
                <strong className="text-slate-900 font-extrabold">{m.priceWheat}</strong>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block text-[10px]">Arrivals:</span>
                <strong className="text-slate-900 font-extrabold">{m.arrivalToday}</strong>
              </div>
            </div>

            <Link
              to={`/market/details/${m.id}`}
              className="w-full bg-gray-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold py-2.5 rounded-xl text-xs text-center transition-all no-underline block"
            >
              View Mandi & Arhtiya Contacts &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
