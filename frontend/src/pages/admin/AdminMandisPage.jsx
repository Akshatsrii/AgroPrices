import React from 'react';

const MANDIS_ADMIN = [
  { name: 'Khanna APMC Mandi', district: 'Ludhiana', state: 'Punjab', code: 'PB-LDH-01' },
  { name: 'Ludhiana Main APMC', district: 'Ludhiana', state: 'Punjab', code: 'PB-LDH-02' },
  { name: 'Samrala Mandi', district: 'Ludhiana', state: 'Punjab', code: 'PB-LDH-05' },
];

export function AdminMandisPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Mandi Directory Management 🚜</h1>
          <p className="text-xs text-gray-500 m-0">APMC Mandi records and Arhtiya directories.</p>
        </div>
        <button className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl border-0 cursor-pointer">
          + Add New Mandi
        </button>
      </div>

      <div className="space-y-3">
        {MANDIS_ADMIN.map((m, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center text-xs">
            <div>
              <strong className="text-slate-900 font-extrabold block text-sm">{m.name}</strong>
              <span className="text-gray-400">{m.district}, {m.state} • Code: {m.code}</span>
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:underline bg-transparent border-0 cursor-pointer">
              Edit Directory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
