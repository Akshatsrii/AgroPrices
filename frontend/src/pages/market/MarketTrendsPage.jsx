import React from 'react';

const MACRO_TRENDS = [
  { title: 'Global Wheat Export Inquiry', impact: 'Positive (+₹50-80/q)', desc: 'High demand from Middle East & Southeast Asian flour mills driving APMC prices up.', tag: 'Export Demand' },
  { title: 'Monsoon Rainfall Normal Forecast', impact: 'Stable MSP (+2.5%)', desc: 'IMD forecasts normal monsoon across Punjab, Haryana, & Western UP.', tag: 'Weather Impact' },
  { title: 'Diesel Freight Hike (+₹1.5/L)', impact: 'Freight +₹3/q', desc: 'Slight increase in local transport costs for Mandi distances > 30 KM.', tag: 'Freight Cost' },
];

export function MarketTrendsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Macro Market Trends & News</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Key drivers impacting mandi rates, government MSP policies, and export demand.</p>
      </div>

      {/* Trends Grid */}
      <div className="space-y-4">
        {MACRO_TRENDS.map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {t.tag}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
                {t.impact}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 m-0">{t.title}</h3>
            <p className="text-xs text-gray-600 m-0 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
