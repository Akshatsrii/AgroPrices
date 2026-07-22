import React from 'react';

const TRENDING_CROPS = [
  { crop: 'Mustard (सरसों)', change: '+8.4%', trend: 'Bullish', reason: 'High oil mill demand across Rajasthan & Haryana', avgPrice: '₹5,450/q', recommendation: 'Good Time to Sell' },
  { crop: 'Potato (आलू)', change: '+5.2%', trend: 'Surging', reason: 'Cold storage stock depletion before new harvest', avgPrice: '₹1,510/q', recommendation: 'Hold 3-5 Days for Peak' },
  { crop: 'Wheat (गेहूं)', change: '+2.1%', trend: 'Steady High', reason: 'Government procurement & export inquiry', avgPrice: '₹2,380/q', recommendation: 'Favorable Market' },
  { crop: 'Onion (प्याज)', change: '-3.5%', trend: 'Bearish', reason: 'Fresh arrivals from Nashik & MP increasing supply', avgPrice: '₹1,950/q', recommendation: 'Sell Immediately' },
];

export function TrendingCropsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Trending Crops & Demand Insights 🔥</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">7-day price trajectory and demand surge forecasting for Northern India crops.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRENDING_CROPS.map((c, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900 m-0">{c.crop}</h3>
                <span className="text-xs font-bold text-gray-500">Average Rate: {c.avgPrice}</span>
              </div>
              <div className="text-right">
                <span className={`text-sm font-extrabold px-3 py-1 rounded-full ${
                  c.change.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {c.change} (7 Days)
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Market Insight:</span>
              <p className="text-xs font-medium text-slate-800 m-0">{c.reason}</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-bold text-gray-600">Action Advisory:</span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {c.recommendation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
