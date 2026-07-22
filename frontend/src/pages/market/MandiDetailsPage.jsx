import React from 'react';
import { useParams, Link } from 'react-router-dom';

export function MandiDetailsPage() {
  const { id } = useParams();

  const details = {
    name: 'Ramganj APMC Mandi',
    code: 'RJ-KTA-03',
    address: 'Kota Road, Ramganj Mandi, Rajasthan 326519',
    todayPrice: '₹20/kg (₹2,000/q)',
    yesterdayPrice: '₹19.5/kg',
    prediction: '₹21/kg (+5% Tomorrow)',
    distance: '18 KM',
    travelTime: '35 mins via State Highway',
    commission: '1% Mandi Cess',
    transportCost: '₹40 Total for 70 KG',
    expectedProfit: '₹1,360 Net In-Hand',
    crowdStatus: '🟢 Low Queue / Fast Unloading',
    weather: '☀️ Clear & Dry (32°C)',
    arhtiyas: [
      { name: 'M/s Ramganj Trading Co.', phone: '+91 98290 12345', yard: 'Yard 4, Shop 12' },
      { name: 'Kota Farmers Commission Agent', phone: '+91 94141 55667', yard: 'Yard 1, Shop 08' },
    ]
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-extrabold uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Mandi License: {details.code}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0 mt-2">
              {details.name}
            </h1>
            <p className="text-xs text-gray-500 m-0 mt-1">📍 {details.address} ({details.distance} • {details.travelTime})</p>
          </div>
          <Link to="/market/nearby" className="text-xs font-bold text-gray-600 hover:text-slate-900 bg-gray-100 px-3 py-2 rounded-xl no-underline">
            &larr; Back
          </Link>
        </div>

        {/* Detailed Mandi Analytics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">Today's Price</span>
            <strong className="text-base text-emerald-950 font-black">{details.todayPrice}</strong>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Yesterday Rate</span>
            <strong className="text-sm text-slate-900 font-extrabold">{details.yesterdayPrice}</strong>
          </div>

          <div className="p-4 bg-emerald-100/60 rounded-2xl border border-emerald-300">
            <span className="text-[10px] font-bold text-emerald-900 uppercase block mb-1">AI Prediction</span>
            <strong className="text-sm text-emerald-900 font-black">{details.prediction}</strong>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Expected Net Profit</span>
            <strong className="text-sm text-emerald-800 font-black">{details.expectedProfit}</strong>
          </div>
        </div>
      </div>

      {/* Logistics & Mandi Environment Info */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 m-0">Transport & Mandi Operations</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Transport Freight Cost</span>
            <strong className="text-slate-900 font-extrabold">{details.transportCost}</strong>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Mandi Crowd Status</span>
            <strong className="text-slate-900 font-extrabold">{details.crowdStatus}</strong>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Local Weather</span>
            <strong className="text-slate-900 font-extrabold">{details.weather}</strong>
          </div>
        </div>
      </div>

      {/* Commission Agents */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
        <h2 className="text-base font-extrabold text-slate-900 m-0">Verified Commission Agents (Arhtiyas) 🤝</h2>
        <div className="space-y-2 text-xs">
          {details.arhtiyas.map((a, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-900 m-0">{a.name}</h3>
                <span className="text-gray-500 text-[11px]">{a.yard}</span>
              </div>
              <a href={`tel:${a.phone}`} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl no-underline">
                📞 Call Agent
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
