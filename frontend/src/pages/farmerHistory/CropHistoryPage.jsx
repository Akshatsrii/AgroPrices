import React from 'react';

const HARVEST_SEASONS = [
  { season: 'Rabi 2025-26', crop: 'Wheat (PBW 725)', yield: '24 Quintals / Acre', totalLand: '5 Acres', status: 'Completed' },
  { season: 'Kharif 2025', crop: 'Paddy / Rice (PR 126)', yield: '28 Quintals / Acre', totalLand: '5 Acres', status: 'Completed' },
  { season: 'Rabi 2024-25', crop: 'Mustard (Pusa 30)', yield: '9 Quintals / Acre', totalLand: '3 Acres', status: 'Completed' },
];

export function CropHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Crop & Harvest History 🌾</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Multi-season crop yield and land productivity records.</p>
      </div>

      <div className="space-y-3">
        {HARVEST_SEASONS.map((h, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {h.season}
              </span>
              <span className="text-xs font-bold text-gray-400">{h.status}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 m-0">{h.crop}</h3>
            <p className="text-xs text-gray-600 m-0">Average Yield: <strong className="text-slate-900">{h.yield}</strong> ({h.totalLand})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
