import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, ArrowRight } from 'lucide-react';

const MANDI_DIRECTORY = [
  { id: 'indore', name: 'Indore Central Mandi', state: 'Madhya Pradesh', district: 'Indore', code: 'MP-IND-01', rate: '₹2,480/q' },
  { id: 'sehore', name: 'Sehore APMC Mandi', state: 'Madhya Pradesh', district: 'Sehore', code: 'MP-SEH-02', rate: '₹2,420/q' },
  { id: 'bhopal', name: 'Karond Mandi Bhopal', state: 'Madhya Pradesh', district: 'Bhopal', code: 'MP-BPL-03', rate: '₹2,450/q' },
  { id: 'kota', name: 'Kota APMC Mandi', state: 'Rajasthan', district: 'Kota', code: 'RJ-KTA-03', rate: '₹2,420/q' },
  { id: 'lucknow', name: 'Lucknow APMC Mandi', state: 'Uttar Pradesh', district: 'Lucknow', code: 'UP-LKN-01', rate: '₹2,480/q' },
  { id: 'khanna', name: 'Khanna APMC Mandi', state: 'Punjab', district: 'Ludhiana', code: 'PB-LDH-01', rate: '₹3,850/q' },
  { id: 'azadpur', name: 'Azadpur Fruits & Veg Mandi', state: 'Delhi', district: 'North Delhi', code: 'DL-NDL-01', rate: '₹2,000/q' },
  { id: 'nashik', name: 'Nashik Red Onion Market', state: 'Maharashtra', district: 'Nashik', code: 'MH-NSK-01', rate: '₹1,700/q' },
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
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Search Header */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>All-India APMC Mandi Search Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Search Mandi Directory</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Lookup official APMC Mandis by state, district, or license code across India.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              placeholder="Search Mandi name, district, or code (e.g. Kota, Lucknow, Sehore)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-slate-900 outline-none font-bold custom-input shadow-md"
            />
          </div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-slate-900 outline-none font-extrabold cursor-pointer shadow-md"
          >
            <option value="All">All 28 States</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Punjab">Punjab</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
      </div>

      {/* Directory List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(m => (
          <div key={m.id} className="bg-white p-6 rounded-[32px] border border-slate-200/80 shadow-sm hover:shadow-lg transition-all card-hover-effect flex justify-between items-center">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {m.code}
              </span>
              <h3 className="text-lg font-black text-slate-900 m-0 mt-1.5">{m.name}</h3>
              <p className="text-xs text-slate-500 font-semibold m-0 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {m.district}, {m.state}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-slate-900 block">{m.rate}</span>
              <Link to={`/market/details/${m.id}`} className="mt-2 bg-slate-900 hover:bg-black text-white px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1 no-underline transition-all active:scale-95">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
