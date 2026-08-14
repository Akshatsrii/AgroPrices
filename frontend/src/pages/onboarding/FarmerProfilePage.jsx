import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FarmerProfilePage() {
  const navigate = useNavigate();
  const [useGps, setUseGps] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ramesh Singh',
    age: '42',
    gender: 'Male',
    mobile: '9876543210',
    state: 'Rajasthan',
    district: 'Kota',
    village: 'Ramganj Mandi Village',
  });

  const handleGpsLocation = () => {
    setUseGps(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData(prev => ({
            ...prev,
            village: `GPS Lat: ${pos.coords.latitude.toFixed(3)}, Lng: ${pos.coords.longitude.toFixed(3)}`
          }));
        },
        () => alert('GPS position acquired.')
      );
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('agro_farmer_profile', JSON.stringify(formData));
    navigate('/onboarding/farm');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>Step 1 of 3: Farmer Profile & Location</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            33% Done
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Farmer Profile</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Please enter your basic personal and farm location details.</p>
        </div>

        <form onSubmit={handleNext} className="space-y-4 text-xs">
          
          {/* Name & Mobile */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              required
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none"
            />
          </div>

          {/* Location Selection */}
          <div className="pt-2 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-900 text-sm">Location Selection</label>
              <button
                type="button"
                onClick={handleGpsLocation}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-all"
              >
                Use Auto GPS
              </button>
            </div>

            {!useGps ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="District"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Village / Town"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 outline-none"
                />
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 text-emerald-900 font-bold rounded-2xl border border-emerald-200 text-xs">
                {formData.village}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl shadow-emerald-600/30 transition-all cursor-pointer border-0 mt-4"
          >
            Continue to Farm Details &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
