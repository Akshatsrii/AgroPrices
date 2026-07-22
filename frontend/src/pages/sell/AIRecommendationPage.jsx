import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCropRecommendation } from '../../services/geminiService';

export function AIRecommendationPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('agro_sell_data');
    const parsed = saved ? JSON.parse(saved) : {};
    setData(parsed);

    async function fetchAiRec() {
      setLoading(true);
      const rec = await generateCropRecommendation(parsed, 'Hindi (हिंदी)');
      setAiResult(rec);
      setLoading(false);
    }

    fetchAiRec();
  }, []);

  const quantity = Number(data.quantity || 50);
  const traderRate = Number(data.traderPrice || 2250);
  const mandiRate = 2380;
  const netMandiRate = mandiRate - 50;
  const traderTotalIncome = quantity * traderRate;
  const mandiTotalIncome = quantity * netMandiRate;
  const extraProfit = mandiTotalIncome - traderTotalIncome;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 relative space-y-6">
        
        {/* Header Badge */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            ✨ Powered by Gemini AI
          </span>
          <span className="text-xs font-bold text-gray-400">100% Analysis Complete</span>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs font-bold text-emerald-800">Gemini AI is calculating live Mandi arbitrage...</p>
          </div>
        ) : (
          <>
            {/* Hero Verdict Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-700 to-green-800 text-white border border-emerald-600 text-center space-y-2 shadow-lg shadow-emerald-700/20">
              <span className="text-4xl block mb-1">🚚</span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200 block">
                Recommended Action
              </span>
              <h2 className="text-2xl sm:text-3xl font-black m-0 tracking-tight">
                {aiResult?.recommendedAction || 'TRANSPORT TO KHANNA APMC MANDI'}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-emerald-100 m-0 leading-relaxed">
                {aiResult?.reasoning || `Khanna APMC offers ₹2,380/q vs local trader ₹${traderRate}/q. Yields +₹${extraProfit} extra net profit.`}
              </p>
            </div>

            {/* Detailed Profit Comparison Matrix */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider m-0">
                📊 Net Profit Comparison Breakdown
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                
                {/* Option A: Local Trader */}
                <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-bold block mb-1">Option A: Village Trader</span>
                  <p className="text-sm font-black text-slate-900 m-0">₹{traderRate}/q</p>
                  <p className="text-[11px] text-gray-500 mt-1 m-0">Freight: ₹0 (Doorstep)</p>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-gray-500 text-[10px]">Net Payout:</span>
                    <strong className="block text-sm font-extrabold text-slate-900">₹{traderTotalIncome.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Option B: Khanna Mandi */}
                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-300">
                  <span className="text-emerald-800 font-extrabold block mb-1">Option B: Khanna APMC</span>
                  <p className="text-sm font-black text-emerald-900 m-0">₹{mandiRate}/q</p>
                  <p className="text-[11px] text-emerald-700 mt-1 m-0">Net Rate: ₹{netMandiRate}/q</p>
                  <div className="mt-2 pt-2 border-t border-emerald-200">
                    <span className="text-emerald-700 text-[10px]">Net Payout:</span>
                    <strong className="block text-sm font-black text-emerald-900">₹{mandiTotalIncome.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Net Extra Advantage Banner */}
              <div className="p-3 bg-emerald-600 text-white rounded-xl text-center text-xs font-black">
                💰 Net Profit Advantage: +₹{(aiResult?.extraMargin || extraProfit).toLocaleString()} Extra Payout at Mandi!
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => alert(`Connecting you to registered transport & Mandi Agent for Khanna APMC...`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-emerald-600/30 transition-all cursor-pointer text-center block no-underline border-0 active:scale-98"
              >
                🚚 Book Transport to Khanna Mandi &rarr;
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm transition-all cursor-pointer border-0"
              >
                Back to Home Page
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
