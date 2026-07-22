import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TransportDetailsPage() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState('Tractor');

  const VEHICLE_OPTIONS = [
    { id: 'No Vehicle', label: '❌ No Vehicle (Rent Transport)', desc: 'Hire external transport/trolley per trip' },
    { id: 'Tractor', label: '🚜 Tractor Trolley', desc: 'Self owned tractor for Mandi haulage' },
    { id: 'Pickup', label: '🛻 Pickup Truck', desc: 'Mini commercial truck (e.g. Bolero Pickup)' },
    { id: 'Truck', label: '🚚 Commercial Truck', desc: 'Heavy commercial truck for bulk load' },
  ];

  const handleFinish = (e) => {
    e.preventDefault();
    localStorage.setItem('agro_transport_details', JSON.stringify({ vehicle }));
    navigate('/onboarding/summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 3 of 3: Transport & Vehicle</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            100% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Vehicle Details 🚛</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Select your primary vehicle for Mandi transport calculations.</p>
        </div>

        <form onSubmit={handleFinish} className="space-y-3 text-xs">
          
          <div className="space-y-2">
            {VEHICLE_OPTIONS.map(v => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehicle(v.id)}
                className={`w-full p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                  vehicle === v.id ? 'bg-emerald-50 border-emerald-600 shadow-sm' : 'bg-gray-50 border-gray-200'
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
            Complete Onboarding & Go to Home &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
