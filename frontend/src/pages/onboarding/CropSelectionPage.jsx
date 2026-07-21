import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const CROPS = [
  { id: 'wheat', name: 'Wheat', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop' },
  { id: 'soybean', name: 'Soybean', img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop' },
  { id: 'onion', name: 'Onion', img: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=600&auto=format&fit=crop' },
  { id: 'cotton', name: 'Cotton', img: 'https://images.unsplash.com/photo-1595841696677-6479c04fbc52?q=80&w=600&auto=format&fit=crop' },
  { id: 'rice', name: 'Rice', img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=600&auto=format&fit=crop' },
  { id: 'maize', name: 'Maize', img: 'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?q=80&w=600&auto=format&fit=crop' },
];

export function CropSelectionPage() {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleContinue = () => {
    if (selectedCrop) {
      console.log("Selected Crop:", selectedCrop);
      // Next step could be dashboard or variety selection
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Info */}
        <div className="w-full md:w-1/3 bg-navy text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🌾</span>
            </div>
            <h2 className="text-3xl font-extrabold mb-4 leading-tight">What are you selling?</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Select your primary crop so our AI can fetch the most relevant APMC market data and price predictions for you.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <span className="text-green-light mt-1">✓</span>
                <p className="text-sm text-gray-300">Daily price alerts tailored to your crop</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-light mt-1">✓</span>
                <p className="text-sm text-gray-300">Historical trend charts & future forecasts</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-xs text-gray-400">Step 2 of 2 in Onboarding</p>
            <div className="w-full bg-white/20 h-1 mt-2 rounded-full overflow-hidden">
              <div className="bg-green w-full h-full rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Grid */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-navy mb-6 text-xl">Select a Crop</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CROPS.map((crop) => (
                <div 
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 relative group ${
                    selectedCrop === crop.id 
                      ? 'border-green shadow-[0_0_15px_rgba(22,163,74,0.3)] scale-[1.02]' 
                      : 'border-border hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="aspect-square relative">
                    <img src={crop.img} alt={crop.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors ${selectedCrop === crop.id ? 'bg-green/10' : 'bg-black/10 group-hover:bg-black/0'}`}></div>
                    
                    {selectedCrop === crop.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-green text-white rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 text-center font-bold ${selectedCrop === crop.id ? 'bg-green-bg text-green-dark' : 'bg-white text-navy'}`}>
                    {crop.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="text-text-muted hover:text-navy transition-colors font-medium px-4 py-2">
              Back
            </button>
            <button 
              onClick={handleContinue}
              disabled={!selectedCrop}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                selectedCrop 
                  ? 'bg-green text-white hover:bg-green-dark shadow-[0_0_15px_rgba(22,163,74,0.3)]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              Complete Setup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
