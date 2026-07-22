import React, { useState } from 'react';

const HISTORY_DATA = [
  { date: '22 Jul 2026', wheat: 2380, paddy: 2203, potato: 1510 },
  { date: '15 Jul 2026', wheat: 2350, paddy: 2203, potato: 1480 },
  { date: '08 Jul 2026', wheat: 2330, paddy: 2190, potato: 1420 },
  { date: '01 Jul 2026', wheat: 2310, paddy: 2180, potato: 1390 },
  { date: '24 Jun 2026', wheat: 2290, paddy: 2175, potato: 1350 },
];

export function PriceHistoryPage() {
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Historical Price Trends 📅</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Track 30-day price trajectories to identify peak harvest selling windows.</p>
        </div>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
        >
          <option value="wheat">Wheat (गेहूं)</option>
          <option value="paddy">Paddy (धान)</option>
          <option value="potato">Potato (आलू)</option>
        </select>
      </div>

      {/* Visual Chart Placeholder Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">30-Day Rate Trajectory Chart</h2>
        
        <div className="h-48 bg-gradient-to-t from-emerald-50 to-white rounded-2xl border border-emerald-100 flex items-end justify-between p-6 gap-2">
          {HISTORY_DATA.map((d, idx) => {
            const val = d[selectedCrop];
            const heightPct = Math.min(100, Math.max(30, (val / 2500) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-black text-emerald-800">₹{val}</span>
                <div 
                  style={{ height: `${heightPct}%` }} 
                  className="w-full bg-emerald-500 rounded-t-xl transition-all duration-500 hover:bg-emerald-600"
                />
                <span className="text-[10px] text-gray-400 font-bold">{d.date.split(' ')[0]} {d.date.split(' ')[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 m-0">Weekly Price Log</h3>
        
        <div className="space-y-2">
          {HISTORY_DATA.map((h, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
              <span className="font-bold text-gray-600">{h.date}</span>
              <strong className="text-slate-900 font-extrabold">₹{h[selectedCrop]} / quintal</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
