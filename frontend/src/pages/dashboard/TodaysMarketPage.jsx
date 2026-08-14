import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { TrendingUp, MapPin, Search, Sparkles, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_MANDI_DATA = [
  { id: 1, name: 'Indore Central Mandi', district: 'Indore', crop: 'Wheat (गेहूं)', price: 2480, msp: 2275, trend: '+4.8%', trendType: 'up', distance: 28, arrivals: '8,500 Quintals' },
  { id: 2, name: 'Sehore APMC Mandi', district: 'Sehore', crop: 'Soybean (सोयाबीन)', price: 4600, msp: 4600, trend: '+2.1%', trendType: 'up', distance: 12, arrivals: '3,200 Quintals' },
  { id: 3, name: 'Karond Mandi Bhopal', district: 'Bhopal', crop: 'Tomato (टमाटर)', price: 20, msp: 14, trend: '+5.0%', trendType: 'up', distance: 38, arrivals: '1,800 Quintals' },
  { id: 4, name: 'Kota APMC Mandi', district: 'Kota', crop: 'Mustard (सरसों)', price: 5450, msp: 5650, trend: '+1.5%', trendType: 'up', distance: 45, arrivals: '4,900 Quintals' },
  { id: 5, name: 'Khanna APMC Mandi', district: 'Ludhiana', crop: 'Paddy (धान)', price: 3850, msp: 2203, trend: '0%', trendType: 'neutral', distance: 38, arrivals: '6,100 Quintals' },
  { id: 6, name: 'Nashik Red Onion Market', district: 'Nashik', crop: 'Onion (प्याज)', price: 17, msp: 15, trend: '-3.0%', trendType: 'down', distance: 52, arrivals: '12,400 Quintals' },
];

export function TodaysMarketPage() {
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mandiList, setMandiList] = useState(MOCK_MANDI_DATA);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    async function loadMarketPrices() {
      const res = await apiService.getTodaysPrices();
      if (res.success && res.data && res.data.data && res.data.data.length > 0) {
        setIsBackendConnected(true);
        const mapped = res.data.data.map((item, idx) => ({
          id: item._id || idx,
          name: item.mandiName || item.name,
          district: item.district || 'Madhya Pradesh',
          crop: item.cropName || item.crop || 'Wheat',
          price: item.modalPrice || item.price || 2480,
          msp: 2275,
          trend: `${item.trendPercentage > 0 ? '+' : ''}${item.trendPercentage || 0}%`,
          trendType: item.trend === 'UP' ? 'up' : item.trend === 'DOWN' ? 'down' : 'neutral',
          distance: item.distanceKm || 28,
          arrivals: '5,500 Quintals'
        }));
        setMandiList(mapped);
      }
    }
    loadMarketPrices();
  }, []);

  const filteredData = mandiList.filter(item => {
    const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Live APMC Mandi Data Feed</span>
            {isBackendConnected && <span className="bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded font-black text-[10px]">CONNECTED</span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Today's Mandi Market Rates</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Live prices updated directly from APMC Mandis across India with tomorrow ML trend predictions.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Crop Filter Chips */}
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {['All', 'Wheat', 'Soybean', 'Tomato', 'Onion', 'Mustard', 'Paddy'].map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 border-0 cursor-pointer transition-all ${
                selectedCrop === crop ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search Mandi or Crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none custom-input"
          />
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.map(m => (
          <div key={m.id} className="bg-white p-6 rounded-[32px] border border-slate-200/80 shadow-sm space-y-4 hover:shadow-lg transition-all card-hover-effect flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {m.district}, MP
                  </span>
                  <h3 className="text-xl font-black text-slate-900 m-0 mt-2 tracking-tight">{m.name}</h3>
                  <p className="text-xs text-slate-500 font-bold m-0 mt-0.5">{m.crop}</p>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                  m.trendType === 'up' ? 'bg-emerald-100 text-emerald-800' : m.trendType === 'down' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {m.trend}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Modal Rate</span>
                  <strong className="text-2xl font-black text-slate-900">₹{m.price.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-bold"> {m.price < 100 ? '/kg' : '/Qtl'}</span></strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Distance</span>
                  <strong className="text-xs font-black text-slate-700">{m.distance} KM</strong>
                </div>
              </div>
            </div>

            <Link
              to="/sell/crop"
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 no-underline transition-all active:scale-98 mt-2"
            >
              <span>Sell at this Mandi</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
