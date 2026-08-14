import React, { useState } from 'react';
import { Sparkles, TrendingUp, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const COMPARISON_TABLE = [
  { mandi: 'Indore Central Mandi', price: '₹2,480/q', distance: '28 km', netProfit: '₹1,19,932', status: 'Best Net Profit' },
  { mandi: 'Sehore APMC Mandi', price: '₹2,420/q', distance: '12 km', netProfit: '₹1,16,200', status: 'Closest Distance' },
  { mandi: 'Karond Mandi Bhopal', price: '₹2,450/q', distance: '38 km', netProfit: '₹1,17,800', status: 'High Demand' },
  { mandi: 'Kota APMC Mandi', price: '₹2,420/q', distance: '45 km', netProfit: '₹1,14,500', status: 'Good Option' },
];

export function PriceComparisonPage() {
  const [quantity, setQuantity] = useState(50);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Multi-Mandi Net Return Comparison Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Side-by-Side Mandi Comparison Matrix</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Side-by-side net profit breakdown after deducting freight transport, labor, and Mandi taxes.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-sm">
          <label className="font-extrabold text-emerald-200">Harvest Volume (Quintals):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-24 bg-white text-slate-900 font-black px-3.5 py-2 rounded-xl text-sm border-0 outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-[11px] font-black text-slate-700 uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 sm:p-5">Mandi Name</th>
                <th className="p-4 sm:p-5">Gross Modal Rate</th>
                <th className="p-4 sm:p-5">Distance</th>
                <th className="p-4 sm:p-5">Net Profit ({quantity} Qtl)</th>
                <th className="p-4 sm:p-5">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {COMPARISON_TABLE.map((row, idx) => {
                const isBest = idx === 0;
                return (
                  <tr key={idx} className={isBest ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50 transition-colors'}>
                    <td className="p-4 sm:p-5">
                      <strong className="text-slate-900 text-sm block">{row.mandi}</strong>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-900 font-black text-sm">{row.price}</td>
                    <td className="p-4 sm:p-5 text-slate-600 font-semibold">{row.distance}</td>
                    <td className="p-4 sm:p-5 font-black text-emerald-950 text-base">{row.netProfit}</td>
                    <td className="p-4 sm:p-5 font-black">
                      <span className={`px-3.5 py-1.5 rounded-full text-xs ${
                        isBest ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
