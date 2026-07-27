import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellStore } from '../../store/useSellStore';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const CROPS = [
  { id: 'Wheat', name: 'Wheat (गेहूं)', icon: '🌾', msp: '₹2,275/q', benchmark: '₹2,480/q' },
  { id: 'Paddy', name: 'Paddy / Rice (धान)', icon: '🌱', msp: '₹2,203/q', benchmark: '₹3,850/q' },
  { id: 'Potato', name: 'Potato (आलू)', icon: '🥔', msp: '₹1,200/q', benchmark: '₹1,600/q' },
  { id: 'Tomato', name: 'Tomato (टमाटर)', icon: '🍅', msp: '₹1,400/q', benchmark: '₹2,000/q' },
  { id: 'Onion', name: 'Onion (प्याज)', icon: '🧅', msp: '₹1,500/q', benchmark: '₹1,700/q' },
  { id: 'Cotton', name: 'Cotton (कपास)', icon: '☁️', msp: '₹6,620/q', benchmark: '₹7,150/q' },
  { id: 'Mustard', name: 'Mustard (सरसों)', icon: '🌼', msp: '₹5,650/q', benchmark: '₹5,450/q' },
  { id: 'Soybean', name: 'Soybean (सोयाबीन)', icon: '🫘', msp: '₹4,600/q', benchmark: '₹4,600/q' },
];

export function SelectCropPage() {
  const navigate = useNavigate();
  const { setSelectedCrop } = useSellStore();
  const [selected, setSelected] = useState('Wheat');

  const handleSelect = (cropObj) => {
    setSelected(cropObj.id);
    setSelectedCrop({
      id: cropObj.id.toLowerCase(),
      name: cropObj.name,
      icon: cropObj.icon,
      basePrice: parseInt(cropObj.benchmark.replace(/[^0-9]/g, '')) || 2480,
    });
  };

  const handleNext = () => {
    navigate('/sell/quantity');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-[32px] p-6 sm:p-10 shadow-xl border border-slate-200/80 relative space-y-6">
        
        {/* Step Indicator Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 1 of 8 • Select Crop
            </span>
            <span className="text-slate-500">12% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-1/8 transition-all duration-300" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">
            Which crop do you want to sell? 🌾
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 m-0 leading-relaxed">
            Select your harvested commodity to compare local village trader offers against live APMC Mandi rates.
          </p>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CROPS.map(c => {
            const isSelected = selected === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer card-hover-effect relative ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-white'
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute top-3 right-3" />
                )}
                <span className="text-3xl mb-2">{c.icon}</span>
                <div>
                  <h3 className="text-xs font-black text-slate-900 m-0">{c.name}</h3>
                  <span className="text-[10px] text-slate-500 font-bold block mt-1">Benchmark: {c.benchmark}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next CTA Button */}
        <button
          onClick={handleNext}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 border-0 cursor-pointer active:scale-98"
        >
          <span>Continue to Step 2 (Quantity)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
