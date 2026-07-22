import React, { useState } from 'react';
import { predictCropPriceTrend } from '../../services/geminiService';

const DEFAULT_CROPS = [
  { crop: 'Mustard (सरसों)', change: '+8.4%', trend: 'Bullish', reason: 'High oil mill demand across Rajasthan & Haryana', avgPrice: '₹5,450/q', recommendation: 'Good Time to Sell' },
  { crop: 'Potato (आलू)', change: '+5.2%', trend: 'Surging', reason: 'Cold storage stock depletion before new harvest', avgPrice: '₹1,510/q', recommendation: 'Hold 3-5 Days for Peak' },
  { crop: 'Wheat (गेहूं)', change: '+2.1%', trend: 'Steady High', reason: 'Government procurement & export inquiry', avgPrice: '₹2,380/q', recommendation: 'Favorable Market' },
  { crop: 'Onion (प्याज)', change: '-3.5%', trend: 'Bearish', reason: 'Fresh arrivals from Nashik & MP increasing supply', avgPrice: '₹1,950/q', recommendation: 'Sell Immediately' },
];

export function TrendingCropsPage() {
  const [crops, setCrops] = useState(DEFAULT_CROPS);
  const [loading, setLoading] = useState(false);

  const handlePredictAll = async () => {
    setLoading(true);
    try {
      const updated = await Promise.all(
        crops.map(async (c) => {
          const res = await predictCropPriceTrend(c.crop, 'Khanna APMC', 'Hindi (हिंदी)');
          return {
            ...c,
            avgPrice: `₹${res.currentPrice || 2380}/q`,
            reason: res.forecastSummary || c.reason,
            change: res.trend || c.change,
            recommendation: `7-Day Target: ₹${res.predictedPrice7Days || 2420}/q`
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
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✨ Powered by Gemini AI
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0 mt-1">Trending Crops & Demand Insights 🔥</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">7-day price trajectory and demand surge forecasting for Northern India crops.</p>
        </div>

        <button
          onClick={handlePredictAll}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl cursor-pointer transition-all border-0 shadow-md disabled:opacity-50"
        >
          {loading ? 'Fetching Gemini Predictions...' : '✨ Run Gemini AI Price Forecast'}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crops.map((c, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900 m-0">{c.crop}</h3>
                <span className="text-xs font-bold text-gray-500">Current Average Rate: {c.avgPrice}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {c.change}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Gemini Market Insight:</span>
              <p className="text-xs font-medium text-slate-800 m-0 leading-relaxed">{c.reason}</p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-600">Action Forecast:</span>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {c.recommendation}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
