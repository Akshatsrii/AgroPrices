import React, { useState } from 'react';

const MANDI_DATA = [
  { id: 1, name: 'Khanna APMC Mandi', district: 'Ludhiana', crop: 'Wheat (गेहूं)', price: 2380, msp: 2275, trend: '+₹50', trendType: 'up', distance: 14, arrivals: '4,500 Quintals' },
  { id: 2, name: 'Ludhiana Grain Market', district: 'Ludhiana', crop: 'Wheat (गेहूं)', price: 2360, msp: 2275, trend: '+₹30', trendType: 'up', distance: 22, arrivals: '8,200 Quintals' },
  { id: 3, name: 'Samrala Mandi', district: 'Ludhiana', crop: 'Potato (आलू)', price: 1510, msp: 1200, trend: '+₹80', trendType: 'up', distance: 8, arrivals: '1,200 Quintals' },
  { id: 4, name: 'Jalandhar APMC', district: 'Jalandhar', crop: 'Mustard (सरसों)', price: 5450, msp: 5650, trend: '+₹120', trendType: 'up', distance: 45, arrivals: '2,900 Quintals' },
  { id: 5, name: 'Moga Mandi', district: 'Moga', crop: 'Paddy (धान)', price: 2210, msp: 2203, trend: '0', trendType: 'neutral', distance: 38, arrivals: '6,100 Quintals' },
  { id: 6, name: 'Patiala APMC', district: 'Patiala', crop: 'Onion (प्याज)', price: 1950, msp: 1500, trend: '-₹40', trendType: 'down', distance: 52, arrivals: '3,400 Quintals' },
];

export function TodaysMarketPage() {
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = MANDI_DATA.filter(item => {
    const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Today's Market Mandi Rates 📈</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Live market prices updated directly from APMC Mandis across Punjab & Northern India.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Mandi or Crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:bg-white focus:border-emerald-600 w-full sm:w-48"
          />
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 outline-none font-semibold"
          >
            <option value="All">All Crops</option>
            <option value="Wheat">Wheat (गेहूं)</option>
            <option value="Paddy">Paddy (धान)</option>
            <option value="Potato">Potato (आलू)</option>
            <option value="Mustard">Mustard (सरसों)</option>
            <option value="Onion">Onion (प्याज)</option>
          </select>
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map(mandi => (
          <div key={mandi.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {mandi.district}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1 m-0">{mandi.name}</h3>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                📍 {mandi.distance} KM
              </span>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-600 m-0">{mandi.crop}</p>
                <p className="text-[11px] text-gray-400 m-0">MSP Ref: ₹{mandi.msp}/q</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900 m-0">₹{mandi.price}</p>
                <span className={`text-xs font-bold ${
                  mandi.trendType === 'up' ? 'text-emerald-600' : mandi.trendType === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {mandi.trend} vs yesterday
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-gray-500 pt-2 bg-gray-50 p-2.5 rounded-xl">
              <span>Today's Arrival Volume:</span>
              <strong className="text-slate-800">{mandi.arrivals}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
