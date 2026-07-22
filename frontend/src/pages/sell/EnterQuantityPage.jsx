import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function EnterQuantityPage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(() => {
    const saved = localStorage.getItem('agro_sell_data');
    return saved ? JSON.parse(saved).quantity || '50' : '50';
  });
  const [unit, setUnit] = useState('Quintals');

  const handleNext = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...existing, quantity, unit }));
    navigate('/sell/quality');
  };

  const totalKg = unit === 'Quintals' ? Number(quantity) * 100 : Number(quantity) * 1000;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 2 of 8 • Enter Quantity</span>
          <span className="text-xs font-bold text-gray-400">25% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-1/4 transition-all" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          How much harvest do you have? ⚖️
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter total harvest volume so we calculate total freight costs vs net returns.
        </p>

        <form onSubmit={handleNext} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Harvest Volume *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                required
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-2xl font-black text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-36 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-sm font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="Quintals">Quintals (कुंतल)</option>
                <option value="Tons">Metric Tons</option>
                <option value="Bags">Bags (50kg)</option>
              </select>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quick Presets</label>
            <div className="flex gap-2">
              {['20', '50', '100', '200', '500'].map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setQuantity(val)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    quantity === val ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {val} q
                </button>
              ))}
            </div>
          </div>

          {/* Weight Summary Box */}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex justify-between items-center text-xs">
            <span className="text-gray-600 font-medium">Converted Total Weight:</span>
            <strong className="text-emerald-800 text-sm font-black">{totalKg.toLocaleString()} KG</strong>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/sell/crop')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Continue to Quality &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
