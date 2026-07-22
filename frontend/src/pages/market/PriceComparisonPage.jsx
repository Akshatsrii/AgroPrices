import React, { useState } from 'react';

const COMPARISON_MATRIX = [
  { mandi: 'Khanna APMC Mandi', distance: '14 KM', grossPrice: 2380, freight: 35, mandiTax: 15, netPayout: 2330, status: 'Highest Net Profit 🥇' },
  { mandi: 'Ludhiana Main APMC', distance: '22 KM', grossPrice: 2360, freight: 55, mandiTax: 15, netPayout: 2290, status: 'Good Volume' },
  { mandi: 'Samrala Grain Mandi', distance: '8 KM', grossPrice: 2350, freight: 20, mandiTax: 15, netPayout: 2315, status: 'Nearest Option' },
  { mandi: 'Moga Grain Market', distance: '38 KM', grossPrice: 2340, freight: 90, mandiTax: 15, netPayout: 2235, status: 'Far Distance' },
];

export function PriceComparisonPage() {
  const [quantity, setQuantity] = useState(50);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Multi-Mandi Price Comparison 📊</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Side-by-side net profit breakdown after deducting freight and Mandi taxes.</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-700">Quantity (Quintals):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-28 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-slate-900 outline-none"
          />
        </div>
      </div>

      {/* Comparison Cards / Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4">Mandi Name</th>
                <th className="p-4">Distance</th>
                <th className="p-4">Gross Rate</th>
                <th className="p-4">Freight Deduction</th>
                <th className="p-4">Net Payout / Quintal</th>
                <th className="p-4">Total Net Payout ({quantity} q)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {COMPARISON_MATRIX.map((c, idx) => {
                const totalNet = c.netPayout * quantity;
                const isBest = idx === 0;
                return (
                  <tr key={idx} className={isBest ? 'bg-emerald-50/60 font-semibold' : 'hover:bg-gray-50'}>
                    <td className="p-4">
                      <strong className="text-slate-900 block">{c.mandi}</strong>
                      <span className="text-[10px] text-emerald-700 font-bold">{c.status}</span>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{c.distance}</td>
                    <td className="p-4 text-slate-900 font-extrabold">₹{c.grossPrice}/q</td>
                    <td className="p-4 text-red-600 font-medium">-₹{c.freight + c.mandiTax}/q</td>
                    <td className="p-4 text-emerald-800 font-black">₹{c.netPayout}/q</td>
                    <td className="p-4 font-black text-slate-900 text-sm">
                      ₹{totalNet.toLocaleString()}
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
