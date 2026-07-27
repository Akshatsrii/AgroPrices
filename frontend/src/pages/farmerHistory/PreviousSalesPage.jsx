import React from 'react';
import { FileText, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

const SALES_RECORD = [
  { id: 1, date: '20 Jul 2026', crop: 'Wheat (गेहूं)', qty: '50 Quintals', buyer: 'Indore Central Mandi', price: '₹2,480/q', netProfit: '₹1,19,932', accuracy: '96% AI Accuracy ⭐' },
  { id: 2, date: '15 Jun 2026', crop: 'Soybean (सोयाबीन)', qty: '30 Quintals', buyer: 'Sehore APMC Mandi', price: '₹4,600/q', netProfit: '₹1,34,200', accuracy: '95% AI Accuracy ⭐' },
  { id: 3, date: '10 May 2026', crop: 'Gram (चना)', qty: '25 Quintals', buyer: 'Karond Mandi Bhopal', price: '₹5,100/q', netProfit: '₹1,24,100', accuracy: '94% AI Accuracy ⭐' },
];

export function PreviousSalesPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Mandi Sales Ledger & AI Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Farmer Sales History 📜</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Past sales records, net profit payouts, and AI recommendation accuracy scores.
          </p>
        </div>
      </div>

      {/* Sales History Cards */}
      <div className="grid grid-cols-1 gap-4">
        {SALES_RECORD.map(s => (
          <div key={s.id} className="bg-white p-6 sm:p-7 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg transition-all card-hover-effect">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {s.date}
                </span>
                <span className="text-[10px] font-black text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  {s.accuracy}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 m-0 mt-2 tracking-tight">{s.crop} ({s.qty})</h3>
              <p className="text-xs text-slate-500 font-bold m-0">Sold at: {s.buyer} (@ {s.price})</p>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shrink-0 min-w-44">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Net In-Hand Profit</span>
              <strong className="text-2xl font-black text-emerald-950">{s.netProfit}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
