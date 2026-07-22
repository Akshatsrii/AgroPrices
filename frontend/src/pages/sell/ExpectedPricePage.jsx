import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ExpectedPricePage() {
  const navigate = useNavigate();
  const [expectedPrice, setExpectedPrice] = useState(() => {
    const saved = localStorage.getItem('agro_sell_data');
    return saved ? JSON.parse(saved).expectedPrice || '2450' : '2450';
  });

  const handleNext = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...existing, expectedPrice }));
    navigate('/sell/trader-offer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 4 of 8 • Expected Price</span>
          <span className="text-xs font-bold text-gray-400">50% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-1/2 transition-all" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          What is your target price? 💰
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the minimum selling price per quintal (₹/q) you expect to receive.
        </p>

        <form onSubmit={handleNext} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Expected Price (₹ / Quintal) *
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-extrabold text-gray-400">₹</span>
              <input
                type="number"
                required
                min="500"
                step="50"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-2xl font-black text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Reference benchmarks */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Govt MSP Rate</span>
              <p className="text-lg font-black text-emerald-900 m-0">₹2,275 <span className="text-xs font-normal">/q</span></p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Mandi Market Average</span>
              <p className="text-lg font-black text-slate-900 m-0">₹2,380 <span className="text-xs font-normal">/q</span></p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/sell/quality')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Continue to Trader Offer &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
