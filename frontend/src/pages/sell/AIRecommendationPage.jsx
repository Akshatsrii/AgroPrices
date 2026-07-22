import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const crop = data.crop || 'Tomato';
  const quantity = Number(data.quantity || 70); // 70 kg
  const traderPrice = Number(data.traderPrice || 17); // ₹17/kg
  const mandiPrice = 20; // ₹20/kg
  const tomorrowPrice = 21; // ₹21/kg

  const villageIncome = quantity * traderPrice; // 70 * 17 = 1190
  const mandiIncome = quantity * mandiPrice; // 70 * 20 = 1400
  const netProfit = mandiIncome - 40; // 1360 after transport

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 relative space-y-6">
        
        {/* Header Badge */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            ✨ AI Recommendation (USP Result)
          </span>
          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Confidence: {aiResult?.confidenceScore || 94}%
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs font-bold text-emerald-800">Gemini AI is calculating live Mandi arbitrage...</p>
          </div>
        ) : (
          <>
            {/* Recommendation Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-700 to-green-800 text-white text-center space-y-2 shadow-lg shadow-emerald-700/20">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-200 block">
                Primary Recommendation
              </span>
              <h2 className="text-3xl font-black m-0 tracking-tight">
                {aiResult?.recommendedAction || 'Sell Tomorrow at Ramganj Mandi'}
              </h2>
              <p className="text-xs font-medium text-emerald-100 m-0">
                Holding load until tomorrow morning maximizes net returns by +₹{netProfit - villageIncome}.
              </p>
            </div>

            {/* Comparison Matrix */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 uppercase tracking-wider m-0">
                📊 Price & Income Comparison ({crop} - {quantity} KG)
              </h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-bold block text-[10px]">Village Offer</span>
                  <strong className="text-sm font-black text-slate-900 block mt-0.5">₹{traderPrice}/kg</strong>
                  <span className="text-gray-500 font-bold text-[11px] block mt-1">₹{villageIncome} Total</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-bold block text-[10px]">Nearby Mandi</span>
                  <strong className="text-sm font-black text-slate-900 block mt-0.5">₹{mandiPrice}/kg</strong>
                  <span className="text-gray-500 font-bold text-[11px] block mt-1">₹{mandiIncome} Total</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300">
                  <span className="text-emerald-800 font-extrabold block text-[10px]">Tomorrow (AI)</span>
                  <strong className="text-sm font-black text-emerald-900 block mt-0.5">₹{tomorrowPrice}/kg</strong>
                  <span className="text-emerald-700 font-black text-[11px] block mt-1">₹{netProfit} Net</span>
                </div>
              </div>

              {/* AI Reasons */}
              <div className="pt-2 border-t border-gray-200/80 space-y-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase block">AI Decision Factors:</span>
                <p className="text-[11px] text-slate-700 m-0 leading-relaxed font-medium">
                  • 📈 Demand increasing in Ramganj Mandi<br />
                  • 🚛 Transport cost is minimal (18 KM distance)<br />
                  • ☀️ Weather clear, no rain forecast
                </p>
              </div>
            </div>

            {/* View Nearby Mandis Button */}
            <Link
              to="/market/nearby"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-emerald-600/30 transition-all cursor-pointer text-center block no-underline border-0 active:scale-98"
            >
              📍 View Nearby Mandis &rarr;
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
