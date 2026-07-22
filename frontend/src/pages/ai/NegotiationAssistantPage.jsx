import React, { useState } from 'react';

const SCRIPTS = [
  {
    topic: 'Countering Low Trader Offer',
    script: '"Bhai Sahab, Khanna APMC mein aaj Grade A Wheat ₹2,380 bik raha hai. Transport kat ke bhi mujhe ₹2,330 in-hand milta hai. Aap kam se kam ₹2,320 cash rate do tabhi farm par deal ho sakti hai."',
    tip: 'Highlight net in-hand payout at Mandi to show you know exact market math.'
  },
  {
    topic: 'Negotiating Cash Payment Terms',
    script: '"Agar aap 15 din ka credit de rahe ho, toh mujhe ₹50/quintal extra rate chahiye. Instant cash par hi ₹2,280 final ho sakta hai."',
    tip: 'Charge a credit premium if the trader delays payment by 15-30 days.'
  },
  {
    topic: 'Rejecting Unfair Quality Discounts',
    script: '"Is sample ka moisture content sirf 11% hai jo Mandi standard 12% se bhi kam hai. Quality deduction ka logic nahi banta."',
    tip: 'Use dry moisture % readings to prevent arbitrary trader price cuts.'
  }
];

export function NegotiationAssistantPage() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
          <span>💬</span> Smart Dialogue Scripts
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">AI Negotiation Assistant 🗣️</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Data-backed counter arguments to negotiate higher rates with local village traders (Vyaparis).</p>
      </div>

      {/* Script Cards */}
      <div className="space-y-4">
        {SCRIPTS.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-slate-900 m-0">{s.topic}</h3>
              <button
                onClick={() => handleCopy(s.script, idx)}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-all"
              >
                {copiedIdx === idx ? '✓ Copied!' : '📋 Copy Script'}
              </button>
            </div>

            <div className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-medium text-xs sm:text-sm leading-relaxed">
              {s.script}
            </div>

            <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl flex items-center gap-1.5">
              <span>💡</span> <strong className="text-slate-800">Tactical Tip:</strong> {s.tip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
