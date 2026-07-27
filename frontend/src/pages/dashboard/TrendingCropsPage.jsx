import React, { useState } from 'react';
import { predictCropPriceTrend } from '../../services/geminiService';
import { Sparkles, TrendingUp, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_CROPS = [
  { crop: 'Mustard (सरसों)', change: '+8.4%', trend: 'Bullish', reason: 'High oil mill demand across Rajasthan & Haryana', avgPrice: '₹5,450/q', recommendation: 'Good Time to Sell' },
  { crop: 'Tomato (टमाटर)', change: '+5.0%', trend: 'Surging', reason: 'Reduced arrivals in Indore & Karond Mandis', avgPrice: '₹20/kg', recommendation: 'Sell Today for Peak Rate' },
  { crop: 'Wheat (गेहूं)', change: '+4.8%', trend: 'Steady High', reason: 'Government procurement & flour mill demand', avgPrice: '₹2,480/q', recommendation: 'Favorable Market' },
  { crop: 'Onion (प्याज)', change: '-3.5%', trend: 'Bearish', reason: 'Fresh arrivals from Nashik & MP increasing supply', avgPrice: '₹17/kg', recommendation: 'Sell Immediately' },
];

export function TrendingCropsPage() {
  const [crops, setCrops] = useState(DEFAULT_CROPS);
  const [loading, setLoading] = useState(false);

  const handlePredictAll = async () => {
    setLoading(true);
    try {
      const updated = await Promise.all(
        crops.map(async (c) => {
          const res = await predictCropPriceTrend(c.crop, 'Indore Central Mandi', 'Hindi (हिंदी)');
          return {
            ...c,
            avgPrice: `₹${res.currentPrice || 2480}/q`,
            reason: res.forecastSummary || c.reason,
            change: res.trend || c.change,
            recommendation: `7-Day Target: ₹${res.predictedPrice7Days || 2599}/q`
          };
        })
      );
      setCrops(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Gemini 1.5 Flash Demand Forecast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">Trending Crops & Demand Insights 🔥</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            7-day price trajectory and demand surge forecasting for major Indian commodities.
          </p>
        </div>

        <button
          onClick={handlePredictAll}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl cursor-pointer transition-all border-0 shadow-lg shadow-emerald-500/30 flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{loading ? 'Analyzing Gemini ML Forecast...' : 'Run Gemini AI Price Forecast'}</span>
        </button>
      </div>

      {/* Grid of Trending Crops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {crops.map((c, idx) => (
          <div key={idx} className="bg-white p-6 sm:p-7 rounded-[32px] border border-slate-200/80 shadow-sm space-y-4 hover:shadow-lg transition-all card-hover-effect flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {c.trend}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 m-0 mt-2 tracking-tight">{c.crop}</h3>
                  <p className="text-xs text-slate-500 font-bold m-0 mt-0.5">Average Market Rate: {c.avgPrice}</p>
                </div>
                <span className={`text-xs font-black px-3 py-1.5 rounded-full ${
                  c.change.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {c.change}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs text-slate-700 leading-relaxed font-medium">
                <strong className="text-slate-900 font-bold block mb-1">Market Rationale:</strong>
                {c.reason}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl">
                {c.recommendation}
              </span>
              <Link to="/sell/crop" className="text-xs font-bold text-slate-900 hover:text-emerald-700 no-underline flex items-center gap-1">
                <span>Sell Crop</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
