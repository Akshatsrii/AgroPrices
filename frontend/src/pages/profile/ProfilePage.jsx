import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, MapPin, Tractor, Wheat, ShieldCheck, Edit3, Save, CheckCircle2 } from 'lucide-react';

export function ProfilePage() {
  const { user, updateFarmerProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || 'Ramesh Kumar',
    phoneNumber: user.phoneNumber || '+91 98765 43210',
    state: user.state || 'Madhya Pradesh',
    district: user.district || 'Sehore',
    village: user.village || 'Kothri',
    landSize: user.landSize || '3.5 Acres',
    vehicle: user.vehicle || 'Tractor Trolley',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2 font-sans">
      {/* Top Banner Profile Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-green-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white/20">
              {formData.name[0] || 'R'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{formData.name}</h1>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-200 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{formData.village}, {formData.district}, {formData.state}</span>
              </p>
              <div className="mt-2 inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-300">
                <span>Verified AgroPrice AI Member</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center space-x-2 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile details updated successfully!</span>
        </div>
      )}

      {/* Main Profile Details Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Section 1: Farmer Personal Info */}
        <div>
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <User className="w-4 h-4 text-emerald-600" />
            <span>1. Farmer Personal Details</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Mobile Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Location Details */}
        <div className="pt-4 border-t border-gray-100">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>2. Farm Location & Region</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">State</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">District</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Village / Tehsil</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Farm Size & Vehicle Transport */}
        <div className="pt-4 border-t border-gray-100">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Tractor className="w-4 h-4 text-emerald-600" />
            <span>3. Farm Land & Vehicle Availability</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Total Land Size (Acres)</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Transport Vehicle</label>
              <select
                disabled={!isEditing}
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full bg-gray-50 disabled:bg-gray-100/60 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-emerald-600"
              >
                <option value="Tractor Trolley">Tractor Trolley (5 Ton Capacity)</option>
                <option value="Pickup Truck">Pickup Truck (2 Ton Capacity)</option>
                <option value="Mini Freighter">Mini Freighter (1 Ton)</option>
                <option value="No Vehicle (Need Pickup)">No Vehicle (Need Buyer Pickup)</option>
              </select>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center space-x-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
