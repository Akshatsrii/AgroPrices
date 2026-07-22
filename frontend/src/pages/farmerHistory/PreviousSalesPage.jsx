import React from 'react';

const SALES_RECORD = [
  { id: 1, date: '15 Apr 2026', crop: 'Wheat (गेहूं)', qty: '50 Quintals', buyer: 'Khanna APMC Mandi', rate: '₹2,350/q', total: '₹1,17,500', extraSaved: '+₹4,000' },
  { id: 2, date: '10 Nov 2025', crop: 'Paddy (धान)', qty: '120 Quintals', buyer: 'Ludhiana APMC', rate: '₹2,203/q', total: '₹2,64,360', extraSaved: '+₹6,200' },
  { id: 3, date: '05 Mar 2025', crop: 'Potato (आलू)', qty: '30 Quintals', buyer: 'Local Village Trader', rate: '₹1,400/q', total: '₹42,000', extraSaved: 'Direct Cash' },
];

export function PreviousSalesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Previous Sales Ledger 📜</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Historical ledger of crop sales and net earnings.</p>
      </div>

      <div className="space-y-3">
        {SALES_RECORD.map(s => (
          <div key={s.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {s.date}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 m-0 mt-1">{s.crop} • {s.qty}</h3>
              <p className="text-xs text-gray-500 m-0">Buyer: {s.buyer} (@ {s.rate})</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-slate-900 m-0">{s.total}</p>
              <span className="text-xs font-bold text-emerald-600">Saved: {s.extraSaved}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
