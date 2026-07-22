import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

export function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('agro_farmer_profile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {(profile.fullName || user?.firstName || 'G')[0]}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 m-0">{profile.fullName || user?.fullName || 'Gurpreet Singh'}</h1>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
              Verified Farmer Profile
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between p-3 rounded-xl bg-gray-50">
            <span className="text-gray-500 font-medium">Phone Number:</span>
            <strong className="text-slate-900">{profile.phoneNumber || user?.primaryPhoneNumber?.phoneNumber || '+91 9876543210'}</strong>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-gray-50">
            <span className="text-gray-500 font-medium">State & District:</span>
            <strong className="text-slate-900">{profile.district || 'Ludhiana'}, {profile.state || 'Punjab'}</strong>
          </div>
          <div className="flex justify-between p-3 rounded-xl bg-gray-50">
            <span className="text-gray-500 font-medium">Primary Role:</span>
            <strong className="text-slate-900">{profile.role || 'Landowner Farmer'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
