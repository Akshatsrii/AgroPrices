import React from 'react';

export function ProfitAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Farmer Profit & AI Analytics 📈</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Monthly profit growth, crop yield performance, best selling months, and AI accuracy metrics.</p>
      </div>

      {/* Top Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-emerald-900 text-white p-5 rounded-3xl space-y-1">
          <span className="text-emerald-300 font-bold uppercase text-[10px]">Monthly Net Profit</span>
          <p className="text-2xl font-black text-white m-0">₹42,500</p>
          <span className="text-[11px] text-emerald-200 block">↑ +14.2% vs last month</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px]">Best Selling Month</span>
          <p className="text-xl font-black text-slate-900 m-0">April & November</p>
          <span className="text-emerald-700 font-bold text-[11px] block">Harvest Peak Demand</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px]">Top Performing Crop</span>
          <p className="text-xl font-black text-slate-900 m-0">Tomato & Wheat</p>
          <span className="text-emerald-700 font-bold text-[11px] block">+₹130/q Arbitrage Gain</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px]">AI Prediction Accuracy</span>
          <p className="text-2xl font-black text-emerald-700 m-0">94.8%</p>
          <span className="text-gray-500 font-medium text-[11px] block">Verified against Mandi sales</span>
        </div>
      </div>

      {/* Chart Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Monthly Profit Trajectory */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">Monthly Profit Growth (₹)</h2>
          <div className="h-44 bg-gradient-to-t from-emerald-50 to-white rounded-2xl border border-emerald-100 flex items-end justify-between p-5 gap-2">
            {[
              { month: 'Jan', val: 28000 },
              { month: 'Feb', val: 32000 },
              { month: 'Mar', val: 38000 },
              { month: 'Apr', val: 45000 },
              { month: 'May', val: 42500 },
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-emerald-900">₹{(d.val/1000).toFixed(1)}k</span>
                <div 
                  style={{ height: `${(d.val / 50000) * 100}%` }}
                  className="w-full bg-emerald-600 rounded-t-xl hover:bg-emerald-700 transition-all"
                />
                <span className="text-[10px] text-gray-400 font-bold">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Performance Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">Crop Performance Ratio</h2>
          
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-900">Tomato (टमाटर)</span>
                <strong className="text-emerald-800">45% Volume (High Margin)</strong>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-emerald-600 h-2.5 rounded-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-900">Wheat (गेहूं)</span>
                <strong className="text-emerald-800">35% Volume (Steady Price)</strong>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full w-[35%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-900">Onion (प्याज़)</span>
                <strong className="text-slate-700">20% Volume</strong>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full w-[20%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
