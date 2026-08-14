import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function VehicleAvailablePage() {
  const navigate = useNavigate();
  const [hasVehicle, setHasVehicle] = useState('Yes');

  const handleNext = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...saved, hasVehicle }));
    navigate('/sell/review');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 7 of 8: Vehicle Availability</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            87% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Vehicle Available?</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Do you have a vehicle ready for transport to nearby Mandi?</p>
        </div>

        <form onSubmit={handleNext} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'Yes', label: 'Yes, Available', desc: 'Tractor / Pickup ready' },
              { id: 'No', label: 'No (Need Freight)', desc: 'Hire external transport' },
            ].map(v => (
              <button
                key={v.id}
                type="button"
                onClick={() => setHasVehicle(v.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                  hasVehicle === v.id ? 'bg-emerald-50 border-emerald-600 shadow-sm' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <span className="font-extrabold text-sm text-slate-900">{v.label}</span>
                <span className="text-[11px] text-gray-500">{v.desc}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl shadow-emerald-600/30 transition-all cursor-pointer border-0 mt-4"
          >
            Review Information & Analyze &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
