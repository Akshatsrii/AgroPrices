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
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Hero Banner Profile Card */}
      <div className="hero-gradient text-white p-6 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white/20">
              {formData.name[0] || 'R'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black m-0 tracking-tight">{formData.name}</h1>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-200 mt-1 flex items-center gap-1 font-semibold m-0">
                <MapPin className="w-3.5 h-3.5" />
                <span>{formData.village}, {formData.district}, {formData.state}</span>
              </p>
              <div className="mt-2 inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300">
                <span>Verified AgroPrice AI Member</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center space-x-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile Details'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs font-bold text-emerald-800 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Form / Details Card */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-xl font-black text-slate-900 m-0">Farmer Personal & Land Profile</h2>

        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-900 custom-input disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.phoneNumber}
              onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-900 custom-input disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">District</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.district}
              onChange={e => setFormData({ ...formData, district: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-900 custom-input disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">State</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.state}
              onChange={e => setFormData({ ...formData, state: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-900 custom-input disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Total Land Holding</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.landSize}
              onChange={e => setFormData({ ...formData, landSize: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-900 custom-input disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Transport Vehicle</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.vehicle}
              onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-slate-900 custom-input disabled:opacity-70"
            />
          </div>

          {isEditing && (
            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold py-4 rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 border-0 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
