import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NeedMoneyPage() {
  const navigate = useNavigate();
  const [urgency, setUrgency] = useState('Immediately');

  const OPTIONS = [
    { id: 'Immediately', label: '⚡ Immediately (Need Cash Today)', desc: 'Prioritize instant payment at farmgate or local mandis' },
    { id: 'Within 2 Days', label: '🗓️ Within 2 Days', desc: 'Can wait for Mandi bank transfer payout' },
    { id: 'Can Wait', label: '⏳ Can Wait 7-10 Days', desc: 'Can hold crop in godown if price forecast is higher' },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...saved, urgency }));
    navigate('/sell/vehicle');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 6 of 8: Payment Urgency</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            75% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Need Money Urgency? 💰</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">How quickly do you need payment from the crop sale?</p>
        </div>

        <form onSubmit={handleNext} className="space-y-3 text-xs">
          {OPTIONS.map(o => (
            <button
              key={o.id}
              type="button"
              onClick={() => setUrgency(o.id)}
              className={`w-full p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                urgency === o.id ? 'bg-emerald-50 border-emerald-600 shadow-sm' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="font-extrabold text-sm text-slate-900">{o.label}</span>
              <span className="text-[11px] text-gray-500">{o.desc}</span>
            </button>
          ))}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl shadow-emerald-600/30 transition-all cursor-pointer border-0 mt-4"
          >
            Continue to Vehicle Availability &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
