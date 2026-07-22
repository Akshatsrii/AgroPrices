import React from 'react';

const SALES_RECORD = [
  { id: 1, date: '15 Apr 2026', crop: 'Tomato (टमाटर)', qty: '70 KG', buyer: 'Ramganj Mandi', price: '₹20/kg', netProfit: '₹1,360', accuracy: '96% Accuracy ⭐' },
  { id: 2, date: '10 Nov 2025', crop: 'Wheat (गेहूं)', qty: '50 Quintals', buyer: 'Khanna APMC', price: '₹2,350/q', netProfit: '₹1,16,500', accuracy: '94% Accuracy ⭐' },
  { id: 3, date: '05 Mar 2025', crop: 'Onion (प्याज़)', qty: '100 KG', buyer: 'Kota APMC', price: '₹19/kg', netProfit: '₹1,850', accuracy: '92% Accuracy ⭐' },
];

export function PreviousSalesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 px-4 sm:px-0 font-sans">
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Farmer Sales History 📜</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Past sales records, net profit, and AI recommendation accuracy scores.</p>
      </div>

      <div className="space-y-3">
        {SALES_RECORD.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {s.date} • {s.accuracy}
              </span>
              <h3 className="text-base font-black text-slate-900 m-0 mt-1">{s.crop} ({s.qty})</h3>
              <p className="text-xs text-gray-500 m-0 mt-0.5">Sold at: {s.buyer} (@ {s.price})</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Net In-Hand Profit</span>
              <strong className="text-xl font-black text-emerald-900">{s.netProfit}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
