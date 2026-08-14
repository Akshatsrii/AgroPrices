import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSellStore } from '../../store/useSellStore';
import { Sparkles, TrendingUp, DollarSign, Truck, Calendar, MapPin, ArrowRight, Bot, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function AIRecommendationPage() {
  const navigate = useNavigate();
  const { selectedCrop, quantityQuintals, qualityGrade, expectedPrice, traderOffer, vehicleAvailable, aiAnalysis, computeAIRecommendation } = useSellStore();

  useEffect(() => {
    computeAIRecommendation();
  }, []);

  const isSellNow = aiAnalysis.recommendationType === 'SELL_NOW';
  const score = aiAnalysis.decisionScore || 92;

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-xl relative overflow-hidden space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                AI
              </span>
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Decision Engine Recommendation
              </span>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80">
              Confidence 96%
            </span>
          </div>

          {/* AI Score Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl hero-gradient text-white shadow-xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block">Recommended Action</span>
              <h1 className="text-2xl sm:text-3xl font-black m-0 tracking-tight text-white">
                {aiAnalysis.recommendationText}
              </h1>
              <p className="text-xs text-emerald-100 mt-1 max-w-md leading-relaxed">
                Selling {quantityQuintals} Quintals of {selectedCrop.name} ({qualityGrade.name}) at {aiAnalysis.recommendedMandi}.
              </p>
            </div>

            {/* Score Radial Box */}
            <div className="w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shrink-0 shadow-inner">
              <span className="text-xs uppercase font-extrabold text-emerald-200">AI Score</span>
              <span className="text-3xl font-black text-amber-400">{score}</span>
              <span className="text-[10px] text-emerald-100 font-bold">/ 100</span>
            </div>
          </div>

          {/* Net Profit Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Net Profit Breakdown vs Middleman Offer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Local Trader Offer Box */}
              <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
                <span className="text-red-700 font-bold uppercase block text-[10px]">Local Middleman Bid</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-slate-900">₹{traderOffer.toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 font-medium">/ quintal</span>
                </div>
                <div className="pt-2 border-t border-red-200/60 text-slate-600">
                  Total Payout: <strong className="text-slate-900 font-black">₹{(traderOffer * quantityQuintals).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Mandi Net Profit Box */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-2 shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-2 text-xs font-black text-emerald-800 bg-emerald-200/90 px-2.5 py-0.5 rounded-full">
                  BEST PROFIT
                </div>
                <span className="text-emerald-800 font-bold uppercase block text-[10px]">Mandi Net Profit</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-emerald-950">₹{aiAnalysis.netProfit.toLocaleString('en-IN')}</span>
                  <span className="text-emerald-700 font-medium">Net</span>
                </div>
                <div className="pt-2 border-t border-emerald-200/80 text-emerald-950 font-semibold flex justify-between">
                  <span>Gain vs Middleman:</span>
                  <strong className="text-emerald-700 font-black">+₹{(aiAnalysis.netProfit - (traderOffer * quantityQuintals)).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* AI Reasoning Insights */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Market Insights</span>
            </h4>
            <p className="text-slate-700 leading-relaxed font-medium">
              {aiAnalysis.advice}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-semibold shadow-2xs">
                Distance: {aiAnalysis.distanceKm} KM
              </span>
              <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-semibold shadow-2xs">
                Fuel Cost: ₹{aiAnalysis.estimatedFuelCost}
              </span>
              <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-semibold shadow-2xs">
                Mandi Fee: ₹{aiAnalysis.mandiTax}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              to="/market/nearby"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 no-underline cursor-pointer active:scale-98"
            >
              <MapPin className="w-4 h-4" />
              <span>View Mandi Route & Details</span>
            </Link>

            <Link
              to="/ai/negotiation-assistant"
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center space-x-2 no-underline cursor-pointer active:scale-98"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Negotiation Counter-Offer Helper</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
