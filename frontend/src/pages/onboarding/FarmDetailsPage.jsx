import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FarmDetailsPage() {
  const navigate = useNavigate();
  const [totalLand, setTotalLand] = useState('5');
  const [irrigationType, setIrrigationType] = useState('Irrigated'); // Irrigated vs Rainfed
  const [ownershipType, setOwnershipType] = useState('Owned'); // Owned vs Rented
  const [selectedCrops, setSelectedCrops] = useState(['Tomato', 'Wheat']);

  const cropsList = ['Tomato', 'Onion', 'Wheat', 'Potato', 'Mustard', 'Paddy'];

  const toggleCrop = (crop) => {
    setSelectedCrops(prev => 
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    const farmDetails = {
      totalLand,
      irrigationType,
      ownershipType,
      selectedCrops,
    };
    localStorage.setItem('agro_farm_details', JSON.stringify(farmDetails));
    navigate('/onboarding/transport');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 2 of 3: Farm & Crop Details</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            66% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Farm & Crops</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Tell us about your land, irrigation type, and current crops.</p>
        </div>

        <form onSubmit={handleNext} className="space-y-4 text-xs">
          
          {/* Total Land */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Total Land Size (in Acres)</label>
            <input
              type="number"
              required
              value={totalLand}
              onChange={(e) => setTotalLand(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none"
            />
          </div>

          {/* Irrigation: Irrigated vs Rainfed */}
          <div>
            <label className="block font-bold text-gray-700 mb-1.5">Water / Irrigation Source</label>
            <div className="grid grid-cols-2 gap-2">
              {['Irrigated', 'Rainfed'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIrrigationType(type)}
                  className={`py-3 px-3 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${
                    irrigationType === type ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-gray-50 text-slate-900 border-gray-200'
                  }`}
                >
                  {type === 'Irrigated' ? 'Irrigated (सिंचित)' : 'Rainfed (वर्षा आधारित)'}
                </button>
              ))}
            </div>
          </div>

          {/* Ownership: Owned vs Rented */}
          <div>
            <label className="block font-bold text-gray-700 mb-1.5">Land Ownership Status</label>
            <div className="grid grid-cols-2 gap-2">
              {['Owned', 'Rented'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOwnershipType(type)}
                  className={`py-3 px-3 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${
                    ownershipType === type ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-gray-50 text-slate-900 border-gray-200'
                  }`}
                >
                  {type === 'Owned' ? 'Self Owned (खुद की)' : 'Rented / Leased (किराए की)'}
                </button>
              ))}
            </div>
          </div>

          {/* Crop Details */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block font-bold text-slate-900 text-xs mb-2">Crops Growing This Season</label>
            <div className="grid grid-cols-3 gap-2">
              {cropsList.map(crop => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => toggleCrop(crop)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    selectedCrops.includes(crop) ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm' : 'bg-gray-50 border-gray-200 text-slate-700'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl shadow-emerald-600/30 transition-all cursor-pointer border-0 mt-4"
          >
            Continue to Vehicle Details &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
