import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function OnboardingSummaryPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [farm, setFarm] = useState({});
  const [transport, setTransport] = useState({});

  useEffect(() => {
    const savedProfile = localStorage.getItem('agro_farmer_profile');
    const savedFarm = localStorage.getItem('agro_farm_details');
    const savedTransport = localStorage.getItem('agro_transport_details');

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedFarm) setFarm(JSON.parse(savedFarm));
    if (savedTransport) setTransport(JSON.parse(savedTransport));
  }, []);

  const handleFinish = () => {
    localStorage.setItem('agro_onboarding_completed', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 5 of 5 • Final Summary</span>
          <span className="text-xs font-bold text-emerald-600">100% Complete 🎉</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full w-full" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-1">
          Review Onboarding Summary ✨
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Double check your details before entering your personal AgroPrice AI dashboard.
        </p>

        <div className="space-y-4 mb-6">
          
          {/* Card 1: Personal & Location */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-extrabold text-navy uppercase tracking-wider m-0">👨‍🌾 Farmer Profile</h3>
              <button 
                onClick={() => navigate('/onboarding/profile')} 
                className="text-xs font-bold text-emerald-600 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-500">Name:</span> <strong className="text-gray-900">{profile.fullName || 'Gurpreet Singh'}</strong></div>
              <div><span className="text-gray-500">Phone:</span> <strong className="text-gray-900">{profile.phoneNumber || '+91 9876543210'}</strong></div>
              <div><span className="text-gray-500">Location:</span> <strong className="text-gray-900">{profile.district || 'Ludhiana'}, {profile.state || 'Punjab'}</strong></div>
              <div><span className="text-gray-500">Role:</span> <strong className="text-gray-900">{profile.role || 'Landowner Farmer'}</strong></div>
            </div>
          </div>

          {/* Card 2: Farm & Crops */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-extrabold text-navy uppercase tracking-wider m-0">🌾 Farm & Crop Details</h3>
              <button 
                onClick={() => navigate('/onboarding/farm')} 
                className="text-xs font-bold text-emerald-600 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <div><span className="text-gray-500">Farm Size:</span> <strong className="text-gray-900">{farm.farmSize || '5'} {farm.unit || 'Acres'}</strong></div>
              <div><span className="text-gray-500">Soil:</span> <strong className="text-gray-900">{farm.soilType || 'Alluvial'}</strong></div>
            </div>
            <div className="text-xs">
              <span className="text-gray-500 block mb-1">Selected Crops:</span>
              <div className="flex flex-wrap gap-1.5">
                {(farm.crops || ['wheat', 'rice']).map(c => (
                  <span key={c} className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[11px] capitalize">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Transport & Mandi */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-extrabold text-navy uppercase tracking-wider m-0">🚚 Transport & Mandi</h3>
              <button 
                onClick={() => navigate('/onboarding/transport')} 
                className="text-xs font-bold text-emerald-600 hover:underline bg-transparent border-0 cursor-pointer"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-500">Vehicle Access:</span> <strong className="text-gray-900 capitalize">{transport.vehicleType || 'Tractor Trolley'}</strong></div>
              <div><span className="text-gray-500">Nearest Mandi:</span> <strong className="text-gray-900">{transport.mandiDistance || '15'} KM</strong></div>
            </div>
          </div>
        </div>

        {/* Finish CTA */}
        <button
          onClick={handleFinish}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-[0.99]"
        >
          🚀 Complete Setup & Open Dashboard
        </button>
      </div>
    </div>
  );
}
