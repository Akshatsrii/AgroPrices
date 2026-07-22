import React from 'react';
import { Link } from 'react-router-dom';

export function SellVsWaitPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Sell Today vs Wait Decision Matrix ⏳</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">AI holding cost vs price forecast model to determine if waiting 7-14 days increases net profit.</p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Option 1: Sell Today */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-4 relative">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Recommended Action 🏆
          </span>

          <h2 className="text-xl font-black text-slate-900 m-0">Option 1: Sell Today</h2>
          <p className="text-2xl font-black text-emerald-800 m-0">₹2,380 / quintal</p>

          <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex justify-between">
              <span>Storage Cost:</span>
              <strong className="text-slate-900">₹0 / day</strong>
            </div>
            <div className="flex justify-between">
              <span>Weight Moisture Loss:</span>
              <strong className="text-slate-900">0% (Full Weight)</strong>
            </div>
            <div className="flex justify-between">
              <span>Cash Flow Timing:</span>
              <strong className="text-emerald-700">Immediate Payment</strong>
            </div>
          </div>
        </div>

        {/* Option 2: Wait 10 Days */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Future Projection
          </span>

          <h2 className="text-xl font-black text-slate-900 m-0">Option 2: Wait 10 Days</h2>
          <p className="text-2xl font-black text-slate-900 m-0">₹2,420 / quintal (Projected)</p>

          <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex justify-between">
              <span>Storage Rent (10 days):</span>
              <strong className="text-red-600">-₹20 / q</strong>
            </div>
            <div className="flex justify-between">
              <span>Moisture Weight Shrinkage:</span>
              <strong className="text-red-600">-₹25 / q loss</strong>
            </div>
            <div className="flex justify-between">
              <span>Net Projected Gain:</span>
              <strong className="text-slate-900">+₹5 / q (Not Worth Risk)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-emerald-900 text-white space-y-2">
        <h3 className="text-lg font-black text-white m-0 flex items-center gap-2">
          <span>🤖</span> AI Verdict: SELL TODAY
        </h3>
        <p className="text-xs text-emerald-100 m-0 leading-relaxed">
          While prices are projected to rise by +₹40 in 10 days, holding costs (godown rent & crop moisture loss) equal ₹45/q. Therefore, selling today provides higher net in-hand profit without storage risk.
        </p>
      </div>
    </div>
  );
}
