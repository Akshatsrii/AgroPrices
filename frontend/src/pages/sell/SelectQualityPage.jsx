import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUALITIES = [
  { id: 'Grade A', title: 'Grade A (Premium Super)', desc: 'Clean, dry, uniform size, <10% moisture content. Gets top mandi premium.', badge: 'Highest Rate' },
  { id: 'Grade B', title: 'Grade B (Standard Medium)', desc: 'Good commercial quality, standard moisture, slight color variation.', badge: 'Average Rate' },
  { id: 'Grade C', title: 'Grade C (Fair / High Moisture)', desc: 'Higher moisture (>14%), mixed size, needs quick clearance.', badge: 'Discount Rate' }
];

export function SelectQualityPage() {
  const navigate = useNavigate();
  const [quality, setQuality] = useState(() => {
    const saved = localStorage.getItem('agro_sell_data');
    return saved ? JSON.parse(saved).quality || 'Grade A' : 'Grade A';
  });
  const [moisture, setMoisture] = useState('11');

  const handleNext = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('agro_sell_data') || '{}');
    localStorage.setItem('agro_sell_data', JSON.stringify({ ...existing, quality, moisture }));
    navigate('/sell/expected-price');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 3 of 8 • Select Quality</span>
          <span className="text-xs font-bold text-gray-400">38% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-3/8 transition-all" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
          Select Quality Grade
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Quality grade directly influences APMC Mandi price deductions and trader markups.
        </p>

        <form onSubmit={handleNext} className="space-y-4">
          
          <div className="space-y-3">
            {QUALITIES.map(q => {
              const isSelected = quality === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuality(q.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-extrabold text-slate-900 m-0">{q.title}</h3>
                    <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {q.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 m-0">{q.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Moisture Slider */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Moisture Level (%)</label>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {moisture}% Moisture
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="20"
              value={moisture}
              onChange={(e) => setMoisture(e.target.value)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/sell/quantity')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Continue to Expected Price &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
