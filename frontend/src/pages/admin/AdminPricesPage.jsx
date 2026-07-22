import React from 'react';

export function AdminPricesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Daily Price Updates 💰</h1>
        <p className="text-xs text-gray-500 m-0">Override or update daily APMC Mandi rates and price surge triggers.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 text-xs">
        <h2 className="text-sm font-extrabold text-slate-900 m-0">Quick Rate Update Form</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="text" placeholder="Mandi Name" defaultValue="Khanna APMC" className="bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none" />
          <input type="text" placeholder="Crop Name" defaultValue="Wheat" className="bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none" />
          <input type="number" placeholder="New Price per Quintal (₹)" defaultValue="2380" className="bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none font-bold" />
        </div>

        <button className="bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-xl border-0 cursor-pointer">
          Publish Price Update
        </button>
      </div>
    </div>
  );
}
