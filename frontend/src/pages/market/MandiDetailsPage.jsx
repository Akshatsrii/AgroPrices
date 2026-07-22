import React from 'react';
import { useParams, Link } from 'react-router-dom';

export function MandiDetailsPage() {
  const { id } = useParams();

  const details = {
    name: 'Khanna APMC Mandi',
    code: 'PB-LDH-01',
    address: 'GT Road, Khanna, District Ludhiana, Punjab 141401',
    distance: '14 KM',
    secretary: 'Er. Rajesh Kumar Sharma (APMC Secretary)',
    phone: '+91 1628 220 145 / +91 98140 12345',
    timing: '5:00 AM - 7:00 PM (Monday to Saturday)',
    arhtiyas: [
      { name: 'M/s Gurdev Singh & Sons (Commission Agent)', shop: 'Shop No. 42, Main Yard', phone: '+91 98721 00111' },
      { name: 'Sharma Trading Co.', shop: 'Shop No. 18, Grain Yard', phone: '+91 98144 55667' },
      { name: 'Punjab Agro Commission Agent', shop: 'Shop No. 89, New Yard', phone: '+91 94170 88990' },
    ]
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              License Code: {details.code}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0 mt-2">
              {details.name}
            </h1>
            <p className="text-xs text-gray-500 m-0 mt-1">📍 {details.address} ({details.distance} from your location)</p>
          </div>
          <Link to="/market/nearby" className="text-xs font-bold text-gray-500 hover:text-slate-900 no-underline bg-gray-100 px-3 py-2 rounded-xl">
            &larr; Back
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Operating Hours</span>
            <strong className="text-sm text-slate-900 font-extrabold">{details.timing}</strong>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">APMC Helpline / Secretary</span>
            <strong className="text-sm text-slate-900 font-extrabold">{details.phone}</strong>
          </div>
        </div>
      </div>

      {/* Arhtiya Directory */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900 m-0">Verified Mandi Commission Agents (Arhtiyas) 🤝</h2>
        
        <div className="space-y-3">
          {details.arhtiyas.map((a, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 m-0">{a.name}</h3>
                <p className="text-xs text-gray-500 m-0">{a.shop}</p>
              </div>
              <a
                href={`tel:${a.phone}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl no-underline transition-all"
              >
                📞 Call Agent ({a.phone})
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
