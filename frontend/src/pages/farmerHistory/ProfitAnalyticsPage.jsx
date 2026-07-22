import React from 'react';

export function ProfitAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Profit Analytics 📈</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Analytics on extra revenue saved by using AgroPrice AI Recommendations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-900 text-white p-6 rounded-3xl space-y-2">
          <span className="text-xs text-emerald-300 font-bold uppercase">Total Extra Saved</span>
          <p className="text-3xl font-black text-white m-0">₹14,200</p>
          <p className="text-xs text-emerald-200">Across 3 harvests in 2025-2026</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase">Avg Rate Premium</span>
          <p className="text-3xl font-black text-slate-900 m-0">+6.8%</p>
          <p className="text-xs text-emerald-600 font-bold">Above local trader baseline</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase">Favored Mandi</span>
          <p className="text-xl font-black text-slate-900 m-0">Khanna APMC</p>
          <p className="text-xs text-gray-500">2 sales completed</p>
        </div>
      </div>
    </div>
  );
}
