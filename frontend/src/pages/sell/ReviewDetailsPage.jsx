import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ReviewDetailsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('agro_sell_data');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const handleTriggerAI = () => {
    navigate('/sell/ai-analysis');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 6 of 8 • Review Inputs</span>
          <span className="text-xs font-bold text-gray-400">75% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-3/4 transition-all" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Review Selling Details 📋
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Verify your inputs before running the AI Profit Optimization Engine.
        </p>

        {/* Summary Card */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4 mb-6 text-sm">
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 font-medium">Selected Crop:</span>
            <strong className="text-slate-900 text-base font-extrabold flex items-center gap-1.5">
              <span>🌾</span> {data.crop || 'Wheat'}
            </strong>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 font-medium">Total Quantity:</span>
            <strong className="text-slate-900 font-bold">{data.quantity || '50'} {data.unit || 'Quintals'}</strong>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 font-medium">Quality Grade:</span>
            <strong className="text-emerald-700 font-bold">{data.quality || 'Grade A'} ({data.moisture || '11'}% Moisture)</strong>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 font-medium">Expected Target Rate:</span>
            <strong className="text-slate-900 font-bold">₹{data.expectedPrice || '2,450'} / quintal</strong>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Village Trader Offer:</span>
            <strong className="text-amber-800 font-black">₹{data.traderPrice || '2,250'} / quintal ({data.paymentTerms || 'Cash'})</strong>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/sell/trader-offer')}
            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl text-sm transition-all cursor-pointer"
          >
            Edit Inputs
          </button>
          <button
            onClick={handleTriggerAI}
            className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <span>🤖</span> Run AI Decision Engine &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
