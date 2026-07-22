import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ReviewDetailsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('agro_sell_data');
    if (saved) setData(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 8 of 8: Review Information</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            99% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Review Crop Details 📋</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Please confirm your inputs before running AI Market Analysis.</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Selected Crop:</span>
            <strong className="text-slate-900 font-extrabold">{data.crop || 'Tomato'}</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Quantity:</span>
            <strong className="text-slate-900 font-extrabold">{data.quantity || '70'} KG / Quintals</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Quality Grade:</span>
            <strong className="text-slate-900 font-extrabold">{data.quality || 'Grade A'}</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Expected Price:</span>
            <strong className="text-slate-900 font-extrabold">₹{data.expectedPrice || '20'}/kg</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Village Trader Offer:</span>
            <strong className="text-slate-900 font-extrabold">₹{data.traderPrice || '17'}/kg</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500 font-medium">Payment Urgency:</span>
            <strong className="text-slate-900 font-extrabold">{data.urgency || 'Immediately'}</strong>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500 font-medium">Vehicle Ready:</span>
            <strong className="text-slate-900 font-extrabold">{data.hasVehicle || 'Yes'}</strong>
          </div>
        </div>

        <button
          onClick={() => navigate('/sell/ai-analysis')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-base shadow-xl shadow-emerald-600/30 transition-all cursor-pointer border-0 flex items-center justify-center gap-2 active:scale-98"
        >
          <span>🤖</span> Analyze with AI &rarr;
        </button>
      </div>
    </div>
  );
}
