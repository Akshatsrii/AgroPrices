import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FarmerProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('agro_farmer_profile');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      phoneNumber: '',
      state: 'Punjab',
      district: 'Ludhiana',
      village: '',
      role: 'Landowner Farmer'
    };
  });

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem('agro_farmer_profile', JSON.stringify(formData));
    navigate('/onboarding/farm');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Step 2 of 5 • Profile</span>
          <span className="text-xs font-bold text-gray-400">40% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all duration-300 w-2/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mb-1">
          Farmer & Location Profile 👨‍🌾
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Tell us about yourself so we can connect you to nearby Mandis and local prices.
        </p>

        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Gurpreet Singh"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              >
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                District / Tehsil *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ludhiana / Khanna"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Village / Town
            </label>
            <input
              type="text"
              placeholder="e.g. Samrala Village"
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Primary Role *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Landowner Farmer', 'Tenant Farmer', 'Trader / Agent', 'Agri-Entrepreneur'].map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setFormData({ ...formData, role })}
                  className={`py-3 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    formData.role === role
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/onboarding/welcome')}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              Continue to Farm Details &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
