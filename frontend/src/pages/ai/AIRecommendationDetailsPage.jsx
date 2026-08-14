import React from 'react';
import { Link } from 'react-router-dom';

export function AIRecommendationDetailsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
              AgroPrice AI Decision Audit
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">
              AI Recommendation Deep Dive
            </h1>
            <p className="text-xs text-gray-500 m-0 mt-1">Full risk-reward breakdown and algorithm decision rationale.</p>
          </div>
          <Link to="/sell/ai-recommendation" className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl no-underline">
            View Output Card &rarr;
          </Link>
        </div>

        {/* Audit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Mandi Price Arbitrage</span>
            <strong className="text-base text-emerald-700 font-black">+₹130 / quintal</strong>
            <p className="text-[11px] text-gray-500 m-0 mt-1">Khanna APMC rate (₹2,380) vs Trader offer (₹2,250).</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Net Freight Cost Impact</span>
            <strong className="text-base text-red-600 font-black">-₹50 / quintal</strong>
            <p className="text-[11px] text-gray-500 m-0 mt-1">Tractor trolley fuel + Mandi entry cess (14 KM distance).</p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">Net Extra Margin</span>
            <strong className="text-lg text-emerald-900 font-black">+₹80 / quintal (+₹4,000 Total)</strong>
            <p className="text-[11px] text-emerald-700 m-0 mt-1">Final net profit margin advantage by transporting to Mandi.</p>
          </div>
        </div>
      </div>

      {/* Decision Rationale List */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 m-0">Algorithm Rationale Factors</h2>
        
        <div className="space-y-3 text-xs">
          {[
            { factor: '1. Quality Grade Premium', detail: 'Grade A wheat gets +₹30/q premium at Khanna Mandi compared to un-graded local village trader buying.' },
            { factor: '2. Low Moisture Bonus', detail: 'Moisture content < 12% avoids Mandi drying deductions.' },
            { factor: '3. Optimal Transport Route', detail: '14 KM distance via Samrala Highway has minimal toll charges (₹0 toll).' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <strong className="text-slate-900 font-extrabold block mb-1">{item.factor}</strong>
              <p className="text-gray-600 m-0 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
