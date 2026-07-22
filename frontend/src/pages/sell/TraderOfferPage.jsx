import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TraderOfferPage() {
  const navigate = useNavigate();
  const [traderPrice, setTraderPrice] = useState(() => {
    const saved = localStorage.getItem('agro_sell_data');
    return saved ? JSON.parse(saved).traderPrice || '2250' : '2250';
  });
  const [paymentTerms, setPaymentTerms] = useState('Instant Cash');
  const [traderTransport, setTraderTransport] = useState('Trader Picks From Farm');

  const handleNext = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({
      ...existing,
      traderPrice,
      paymentTerms,
      traderTransport
    }));
    navigate('/sell/review');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 5 of 8 • Village Trader Offer</span>
          <span className="text-xs font-bold text-gray-400">62% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-5/8 transition-all" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Village Trader (Vyapari) Offer 🤝
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          What price is your local village trader or agent offering at your doorstep?
        </p>

        <form onSubmit={handleNext} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Trader Offered Price (₹ / Quintal) *
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-extrabold text-gray-400">₹</span>
              <input
                type="number"
                required
                min="500"
                step="50"
                value={traderPrice}
                onChange={(e) => setTraderPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-2xl font-black text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Trader Payment Terms
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Instant Cash', '15-Day Credit', '30-Day Credit', 'Part Cash / Part Credit'].map(term => (
                <button
                  type="button"
                  key={term}
                  onClick={() => setPaymentTerms(term)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentTerms === term ? 'bg-emerald-50 border-emerald-600 text-emerald-900' : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Transport Terms */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Transport Condition
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Trader Picks From Farm', 'Farmer Delivers To Local Godown'].map(trans => (
                <button
                  type="button"
                  key={trans}
                  onClick={() => setTraderTransport(trans)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    traderTransport === trans ? 'bg-emerald-50 border-emerald-600 text-emerald-900' : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  {trans}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/sell/expected-price')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Review Details &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
