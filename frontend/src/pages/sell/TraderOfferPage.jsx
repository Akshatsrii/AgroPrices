import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TraderOfferPage() {
  const navigate = useNavigate();
  const [traderPrice, setTraderPrice] = useState('17');

  const handleNext = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...saved, traderPrice }));
    navigate('/sell/urgency');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 5 of 8: Village Trader Offer</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            62% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Village Trader Offer</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">(Optional) Enter the offer given by your local village vyapari.</p>
        </div>

        <form onSubmit={handleNext} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Local Trader Rate (₹/kg or ₹/quintal)</label>
            <input
              type="number"
              value={traderPrice}
              onChange={(e) => setTraderPrice(e.target.value)}
              placeholder="e.g. 17"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-base font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl shadow-emerald-600/30 transition-all cursor-pointer border-0 mt-4"
          >
            Continue to Payment Urgency &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
