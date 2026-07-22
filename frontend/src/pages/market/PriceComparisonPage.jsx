import React, { useState } from 'react';

const COMPARISON_TABLE = [
  { mandi: 'Ramganj Mandi', price: '₹20/kg', distance: '18 km', netProfit: '₹1360', status: '⭐ Best' },
  { mandi: 'Kota APMC Mandi', price: '₹19/kg', distance: '32 km', netProfit: '₹1280', status: 'Good' },
  { mandi: 'Bundi Grain Market', price: '₹18/kg', distance: '25 km', netProfit: '₹1220', status: 'Average' },
  { mandi: 'Khanna APMC Mandi', price: '₹23.8/kg', distance: '14 km', netProfit: '₹2330', status: 'High Volume' },
];

export function PriceComparisonPage() {
  const [quantity, setQuantity] = useState(70);

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Multi-Mandi Price Comparison Table 📊</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Side-by-side net profit breakdown after deducting freight and Mandi taxes.</p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="font-bold text-gray-700">Quantity (KG):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-24 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-slate-900 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4">Mandi Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Distance</th>
                <th className="p-4">Net Profit ({quantity} KG)</th>
                <th className="p-4">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium">
              {COMPARISON_TABLE.map((row, idx) => {
                const isBest = idx === 0;
                return (
                  <tr key={idx} className={isBest ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-gray-50'}>
                    <td className="p-4">
                      <strong className="text-slate-900 text-sm block">{row.mandi}</strong>
                    </td>
                    <td className="p-4 text-slate-900 font-extrabold">{row.price}</td>
                    <td className="p-4 text-gray-600">{row.distance}</td>
                    <td className="p-4 font-black text-emerald-900 text-sm">{row.netProfit}</td>
                    <td className="p-4 font-black">
                      <span className={`px-3 py-1 rounded-xl text-xs ${
                        isBest ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-slate-800'
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
