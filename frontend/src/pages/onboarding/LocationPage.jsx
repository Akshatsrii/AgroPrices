import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LocationPicker } from '../../components/LocationPicker';

export function LocationPage() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);

  const handleContinue = () => {
    if (coords) {
      // In a real app, save to user context/DB
      console.log("Saved Location:", coords);
      navigate('/onboarding/crop'); // Proceed to crop selection
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Info */}
        <div className="w-full md:w-1/3 bg-navy text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🗺️</span>
            </div>
            <h2 className="text-3xl font-extrabold mb-4 leading-tight">Where is your farm located?</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              We need your location to calculate exact diesel costs and route distances to the nearest Mandis. 
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <span className="text-green-light mt-1">✓</span>
                <p className="text-sm text-gray-300">Compare distances to multiple APMC markets</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-light mt-1">✓</span>
                <p className="text-sm text-gray-300">Get highly accurate transport cost deductions</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-green-light mt-1">✓</span>
                <p className="text-sm text-gray-300">Discover hidden local buyers</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-xs text-gray-400">Step 1 of 2 in Onboarding</p>
            <div className="w-full bg-white/20 h-1 mt-2 rounded-full overflow-hidden">
              <div className="bg-green w-1/2 h-full rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col">
          <LocationPicker onLocationSelect={setCoords} />
          
          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
            <Link to="/" className="text-text-muted hover:text-navy transition-colors font-medium">
              Cancel
            </Link>
            <button 
              onClick={handleContinue}
              disabled={!coords}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                coords 
                  ? 'bg-green text-white hover:bg-green-dark shadow-[0_0_15px_rgba(22,163,74,0.3)]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              Confirm Location
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
