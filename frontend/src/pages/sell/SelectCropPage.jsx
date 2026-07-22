import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CROPS = [
  { id: 'Wheat', name: 'Wheat (गेहूं)', icon: '🌾', msp: '₹2,275/q', benchmark: '₹2,380/q' },
  { id: 'Paddy', name: 'Paddy / Rice (धान)', icon: '🌱', msp: '₹2,203/q', benchmark: '₹2,210/q' },
  { id: 'Potato', name: 'Potato (आलू)', icon: '🥔', msp: '₹1,200/q', benchmark: '₹1,510/q' },
  { id: 'Tomato', name: 'Tomato (टमाटर)', icon: '🍅', msp: '₹1,400/q', benchmark: '₹1,850/q' },
  { id: 'Onion', name: 'Onion (प्याज)', icon: '🧅', msp: '₹1,500/q', benchmark: '₹1,950/q' },
  { id: 'Cotton', name: 'Cotton (कपास)', icon: '☁️', msp: '₹6,620/q', benchmark: '₹7,100/q' },
  { id: 'Mustard', name: 'Mustard (सरसों)', icon: '🌼', msp: '₹5,650/q', benchmark: '₹5,450/q' },
  { id: 'Soybean', name: 'Soybean (सोयाबीन)', icon: '🫘', msp: '₹4,600/q', benchmark: '₹4,820/q' },
];

export function SelectCropPage() {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState(() => {
    const saved = localStorage.getItem('agro_sell_data');
    return saved ? JSON.parse(saved).crop || 'Wheat' : 'Wheat';
  });

  const handleNext = () => {
    const existing = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...existing, crop: selectedCrop }));
    navigate('/sell/quantity');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 1 of 8 • Select Crop</span>
          <span className="text-xs font-bold text-gray-400">12% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-1/8 transition-all" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Which crop do you want to sell? 🌾
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Choose your harvested commodity to compare local trader offers against nearby Mandi rates.
        </p>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {CROPS.map(c => {
            const isSelected = selectedCrop === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCrop(c.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-3xl">{c.icon}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 m-0">{c.name}</h3>
                  <p className="text-[11px] text-gray-500 m-0 mt-0.5">Rate: <strong className="text-emerald-700">{c.benchmark}</strong></p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
          >
            Continue to Quantity &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
