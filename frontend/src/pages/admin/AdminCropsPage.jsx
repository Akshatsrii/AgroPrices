import React from 'react';

const CROPS_ADMIN = [
  { name: 'Wheat (गेहूं)', category: 'Rabi', msp: '₹2,275/q', status: 'Active' },
  { name: 'Paddy / Rice (धान)', category: 'Kharif', msp: '₹2,203/q', status: 'Active' },
  { name: 'Mustard (सरसों)', category: 'Rabi', msp: '₹5,650/q', status: 'Active' },
  { name: 'Potato (आलू)', category: 'Horticulture', msp: '₹1,200/q', status: 'Active' },
];

export function AdminCropsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Crop Management 🌾</h1>
          <p className="text-xs text-gray-500 m-0">Manage crops, MSP benchmarks, and seasonal categories.</p>
        </div>
        <button className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl border-0 cursor-pointer">
          + Add New Crop
        </button>
      </div>

      <div className="space-y-3">
        {CROPS_ADMIN.map((c, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center text-xs">
            <div>
              <strong className="text-slate-900 font-extrabold block text-sm">{c.name}</strong>
              <span className="text-gray-400">Category: {c.category} • MSP: {c.msp}</span>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
