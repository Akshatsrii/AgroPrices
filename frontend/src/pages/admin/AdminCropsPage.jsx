import React from 'react';
import { Wheat, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';

const CROPS_ADMIN = [
  { name: 'Wheat (गेहूं)', category: 'Rabi', msp: '₹2,275/q', status: 'Active' },
  { name: 'Paddy / Rice (धान)', category: 'Kharif', msp: '₹2,203/q', status: 'Active' },
  { name: 'Mustard (सरसों)', category: 'Rabi', msp: '₹5,650/q', status: 'Active' },
  { name: 'Soybean (सोयाबीन)', category: 'Kharif', msp: '₹4,600/q', status: 'Active' },
  { name: 'Potato (आलू)', category: 'Horticulture', msp: '₹1,200/q', status: 'Active' },
  { name: 'Tomato (टमाटर)', category: 'Horticulture', msp: '₹1,400/q', status: 'Active' },
];

export function AdminCropsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Wheat className="w-3.5 h-3.5 text-amber-400" />
            <span>Commodity Master Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Crop Management</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Manage tracked crops, MSP government benchmarks, and seasonal categories.
          </p>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl cursor-pointer transition-all border-0 shadow-lg flex items-center space-x-2 shrink-0">
          <Plus className="w-4 h-4" />
          <span>Add New Commodity</span>
        </button>
      </div>

      {/* Grid of Admin Crop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CROPS_ADMIN.map((c, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-200/80 shadow-sm flex justify-between items-center hover:shadow-lg transition-all card-hover-effect">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {c.category}
              </span>
              <h3 className="text-lg font-black text-slate-900 m-0 mt-1.5">{c.name}</h3>
              <p className="text-xs text-slate-500 font-semibold m-0 mt-0.5">Government MSP: <strong className="text-slate-900 font-bold">{c.msp}</strong></p>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100/80 px-3.5 py-1.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{c.status}</span>
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
