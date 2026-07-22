import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VEHICLES = [
  { id: 'tractor', name: 'Tractor Trolley', icon: '🚜' },
  { id: 'pickup', name: 'Pickup Truck (Bolero/Tata Ace)', icon: '🛻' },
  { id: 'truck', name: 'Mini Truck / Eicher', icon: '🚚' },
  { id: 'rent', name: 'Rental Transport Service', icon: '📦' },
  { id: 'none', name: 'No Personal Vehicle (Local Sale)', icon: '🚶' }
];

export function TransportDetailsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('agro_transport_details');
    return saved ? JSON.parse(saved) : {
      vehicleType: 'tractor',
      mandiDistance: '15',
      preferredMandi: 'Khanna Grain Market / Ludhiana APMC'
    };
  });

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('agro_transport_details', JSON.stringify(formData));
    navigate('/onboarding/summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 4 of 5 • Transport & Mandi</span>
          <span className="text-xs font-bold text-gray-400">80% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all duration-300 w-4/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-1">
          Vehicle & Transport Details 🚚
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Specify your transport access so we calculate net profits after freight costs.
        </p>

        <form onSubmit={handleNext} className="space-y-5">
          
          {/* Vehicle Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Primary Vehicle / Transport Access *
            </label>
            <div className="space-y-2">
              {VEHICLES.map((vehicle) => {
                const isSelected = formData.vehicleType === vehicle.id;
                return (
                  <button
                    type="button"
                    key={vehicle.id}
                    onClick={() => setFormData({ ...formData, vehicleType: vehicle.id })}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{vehicle.icon}</span>
                      <span className="text-sm font-bold">{vehicle.name}</span>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mandi Distance */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Distance to Nearest Major Mandi (in KM) *
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="100"
                value={formData.mandiDistance}
                onChange={(e) => setFormData({ ...formData, mandiDistance: e.target.value })}
                className="flex-1 accent-emerald-600 cursor-pointer"
              />
              <span className="px-4 py-2 bg-emerald-50 text-emerald-800 font-extrabold rounded-xl text-sm border border-emerald-200 min-w-[70px] text-center">
                {formData.mandiDistance} KM
              </span>
            </div>
          </div>

          {/* Preferred Mandis */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Preferred Mandi / Market Name
            </label>
            <input
              type="text"
              placeholder="e.g. Khanna APMC / Azadpur Mandi"
              value={formData.preferredMandi}
              onChange={(e) => setFormData({ ...formData, preferredMandi: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none font-medium"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/onboarding/farm')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Review Summary &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
