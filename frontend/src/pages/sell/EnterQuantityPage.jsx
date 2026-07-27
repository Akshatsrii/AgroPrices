import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellStore } from '../../store/useSellStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function EnterQuantityPage() {
  const navigate = useNavigate();
  const { setQuantityQuintals } = useSellStore();
  const [quantity, setQuantity] = useState('50');
  const [unit, setUnit] = useState('Quintals');

  const handleNext = (e) => {
    e.preventDefault();
    const qtyNum = unit === 'Tons' ? Number(quantity) * 10 : Number(quantity);
    setQuantityQuintals(qtyNum);
    navigate('/sell/quality');
  };

  const totalKg = unit === 'Quintals' ? Number(quantity) * 100 : Number(quantity) * 1000;

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[32px] p-6 sm:p-10 shadow-xl border border-slate-200/80 relative space-y-6">
        
        {/* Step Indicator Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 2 of 8 • Enter Quantity
            </span>
            <span className="text-slate-500">25% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-1/4 transition-all duration-300" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">
            How much harvest do you have? ⚖️
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 m-0 leading-relaxed">
            Enter total harvest volume so we calculate transport freight costs vs net Mandi payouts.
          </p>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
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
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-slate-900 custom-input"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-36 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-xs sm:text-sm font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="Quintals">Quintals (100kg)</option>
                <option value="Tons">Tons (1000kg)</option>
              </select>
            </div>
            <span className="text-xs text-slate-500 font-bold block mt-2">
              Equivalent Total Weight: <strong className="text-emerald-700 font-black">{totalKg.toLocaleString('en-IN')} kg</strong>
            </span>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Quick Volume Presets:</label>
            <div className="flex gap-2">
              {['20', '50', '100', '250'].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setQuantity(val)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                    quantity === val ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val} Qtl
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/sell/crop')}
              className="px-5 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl text-xs sm:text-sm border-0 cursor-pointer flex items-center justify-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 border-0 cursor-pointer active:scale-98"
            >
              <span>Continue to Step 3 (Quality Grade)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
