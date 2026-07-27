import React from 'react';
import { Users, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

const USERS_ADMIN = [
  { name: 'Ramesh Kumar', phone: '+91 98765 43210', location: 'Sehore, Madhya Pradesh', status: 'Verified Farmer' },
  { name: 'Gurpreet Singh', phone: '+91 98140 55443', location: 'Ludhiana, Punjab', status: 'Verified Farmer' },
  { name: 'Kamlesh Patel', phone: '+91 94250 11223', location: 'Rajkot, Gujarat', status: 'Verified Farmer' },
];

export function AdminUsersPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Registered Farmer Database</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">User & Farmer Directory 👨‍🌾</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Directory of registered farmers, verification status, and activity logs.
          </p>
        </div>
      </div>

      {/* Grid of Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {USERS_ADMIN.map((u, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-200/80 shadow-sm flex justify-between items-center hover:shadow-lg transition-all card-hover-effect">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {u.status}
              </span>
              <h3 className="text-lg font-black text-slate-900 m-0 mt-1.5">{u.name}</h3>
              <p className="text-xs text-slate-500 font-semibold m-0 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {u.location}
              </p>
              <span className="text-[11px] text-slate-400 font-bold block">{u.phone}</span>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          </div>
        ))}
      </div>

    </div>
  );
}
