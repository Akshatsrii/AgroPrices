import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AVAILABLE_CROPS = [
  { id: 'wheat', name: 'Wheat (गेहूं)', icon: '🌾' },
  { id: 'rice', name: 'Rice / Paddy (धान)', icon: '🌱' },
  { id: 'potato', name: 'Potato (आलू)', icon: '🥔' },
  { id: 'tomato', name: 'Tomato (टमाटर)', icon: '🍅' },
  { id: 'onion', name: 'Onion (प्याज)', icon: '🧅' },
  { id: 'cotton', name: 'Cotton (कपास)', icon: '☁️' },
  { id: 'mustard', name: 'Mustard (सरसों)', icon: '🌼' },
  { id: 'maize', name: 'Maize (मक्का)', icon: '🌽' },
];

export function FarmDetailsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('agro_farm_details');
    return saved ? JSON.parse(saved) : {
      farmSize: '5',
      unit: 'Acres',
      soilType: 'Alluvial Soil (दोमट)',
      irrigation: 'Canal & Borewell',
      crops: ['wheat', 'rice']
    };
  });

  const toggleCrop = (cropId) => {
    setFormData(prev => {
      const exists = prev.crops.includes(cropId);
      const updated = exists 
        ? prev.crops.filter(id => id !== cropId) 
        : [...prev.crops, cropId];
      return { ...prev, crops: updated };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('agro_farm_details', JSON.stringify(formData));
    navigate('/onboarding/transport');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 3 of 5 • Farm & Crops</span>
          <span className="text-xs font-bold text-gray-400">60% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all duration-300 w-3/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-1">
          Farm & Land Details 🌾
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Provide your land size and major crops for precise price predictions.
        </p>

        <form onSubmit={handleNext} className="space-y-5">
          
          {/* Farm Size */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Total Farm Size *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                required
                min="0.5"
                step="0.5"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none font-semibold"
              />
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-32 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3.5 text-sm text-gray-900 font-semibold outline-none"
              >
                <option value="Acres">Acres</option>
                <option value="Bigha">Bigha</option>
                <option value="Hectares">Hectares</option>
              </select>
            </div>
          </div>

          {/* Soil & Irrigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Soil Type
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 outline-none font-medium"
              >
                <option value="Alluvial Soil (दोमट)">Alluvial Soil (दोमt)</option>
                <option value="Black Soil (काली मिट्टी)">Black Soil (काली)</option>
                <option value="Red Soil (लाल मिट्टी)">Red Soil (लाल)</option>
                <option value="Sandy Soil (रेतीली)">Sandy Soil (रेतीली)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Irrigation Source
              </label>
              <select
                value={formData.irrigation}
                onChange={(e) => setFormData({ ...formData, irrigation: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 outline-none font-medium"
              >
                <option value="Canal & Borewell">Canal & Borewell</option>
                <option value="Drip Irrigation">Drip Irrigation</option>
                <option value="Rainfed (Monsoon)">Rainfed (Monsoon)</option>
                <option value="Submersible Pump">Submersible Pump</option>
              </select>
            </div>
          </div>

          {/* Crops Multi-Select */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Major Crops Grown (Select all that apply) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AVAILABLE_CROPS.map((crop) => {
                const isSelected = formData.crops.includes(crop.id);
                return (
                  <button
                    type="button"
                    key={crop.id}
                    onClick={() => toggleCrop(crop.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col items-center text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-2xl mb-1">{crop.icon}</span>
                    <span className="text-xs font-bold leading-tight">{crop.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/onboarding/profile')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={formData.crops.length === 0}
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Continue to Transport &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
