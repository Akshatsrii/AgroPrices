import React, { useState } from 'react';
import { Calendar, TrendingUp, Sparkles, BarChart2 } from 'lucide-react';

const HISTORY_DATA = [
  { date: '26 Jul 2026', wheat: 2480, paddy: 3850, potato: 1600 },
  { date: '19 Jul 2026', wheat: 2440, paddy: 3820, potato: 1560 },
  { date: '12 Jul 2026', wheat: 2410, paddy: 3790, potato: 1520 },
  { date: '05 Jul 2026', wheat: 2380, paddy: 3750, potato: 1480 },
  { date: '28 Jun 2026', wheat: 2350, paddy: 3700, potato: 1440 },
];

export function PriceHistoryPage() {
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
            <span>30-Day APMC Market Trajectory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Historical Price Trends 📅</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Track historical Mandi rates to identify seasonal peak harvest selling windows.
          </p>
        </div>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-4 py-2.5 text-xs font-extrabold outline-none cursor-pointer"
        >
          <option value="wheat" className="text-slate-900">Wheat (गेहूं)</option>
          <option value="paddy" className="text-slate-900">Paddy (धान)</option>
          <option value="potato" className="text-slate-900">Potato (आलू)</option>
        </select>
      </div>

      {/* Visual Chart Card */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">30-Day Rate Trajectory Chart</h2>
        
        <div className="h-56 bg-gradient-to-t from-emerald-50/70 via-white to-white rounded-2xl border border-emerald-100 flex items-end justify-between p-6 gap-3 shadow-inner">
          {HISTORY_DATA.map((d, idx) => {
            const val = d[selectedCrop];
            const heightPct = Math.min(100, Math.max(30, (val / 4000) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-black text-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity">₹{val}</span>
                <div 
                  style={{ height: `${heightPct}%` }} 
                  className="w-full bg-emerald-600 rounded-t-xl transition-all duration-500 hover:bg-emerald-700 shadow-md"
                />
                <span className="text-[10px] text-slate-500 font-bold">{d.date.split(' ')[0]} {d.date.split(' ')[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">Weekly Price Audit Log</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {HISTORY_DATA.map((row, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center font-medium">
              <span className="text-slate-500 font-bold">{row.date}</span>
              <strong className="text-slate-900 font-black text-sm">₹{row[selectedCrop]} / Qtl</strong>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">Recorded</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
