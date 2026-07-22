import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MANDI_DIRECTORY = [
  { id: 'khanna', name: 'Khanna APMC Mandi', state: 'Punjab', district: 'Ludhiana', code: 'PB-LDH-01', rate: '₹2,380/q' },
  { id: 'azadpur', name: 'Azadpur Fruits & Veg Mandi', state: 'Delhi', district: 'North Delhi', code: 'DL-NDL-01', rate: '₹1,950/q' },
  { id: 'ramganj', name: 'Ramganj Mandi', state: 'Rajasthan', district: 'Kota', code: 'RJ-KTA-03', rate: '₹4,820/q' },
  { id: 'karnal', name: 'Karnal Grain Market', state: 'Haryana', district: 'Karnal', code: 'HR-KRN-02', rate: '₹2,365/q' },
  { id: 'samrala', name: 'Samrala Grain Mandi', state: 'Punjab', district: 'Ludhiana', code: 'PB-LDH-05', rate: '₹1,510/q' },
  { id: 'indore', name: 'Indore APMC Mandi', state: 'Madhya Pradesh', district: 'Indore', code: 'MP-IND-01', rate: '₹4,750/q' },
];

export function SearchMandiPage() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const filtered = MANDI_DIRECTORY.filter(m => {
    const matchState = selectedState === 'All' || m.state === selectedState;
    const matchQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.district.toLowerCase().includes(query.toLowerCase()) || m.code.toLowerCase().includes(query.toLowerCase());
    return matchState && matchQuery;
  });

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Search Mandi Directory 🔍</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Lookup APMC Mandis by state, district, or Mandi license code.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Type Mandi name, district, or code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-emerald-600 outline-none font-medium"
          />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-slate-900 outline-none font-bold cursor-pointer"
          >
            <option value="All">All States</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Delhi">Delhi</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>
        </div>
      </div>

      {/* Directory List */}
      <div className="space-y-3">
        {filtered.map(m => (
          <div key={m.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                {m.state} • {m.district}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 m-0 mt-1">{m.name}</h3>
              <p className="text-xs text-gray-400 m-0">License Code: {m.code}</p>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <div>
                <span className="text-[10px] text-gray-400 block">Benchmark Rate:</span>
                <strong className="text-sm font-black text-slate-900">{m.rate}</strong>
              </div>
              <Link
                to={`/market/details/${m.id}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl no-underline transition-all"
              >
                Details &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
