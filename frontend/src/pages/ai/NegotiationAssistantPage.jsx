import React, { useState } from 'react';
import { askGeminiAssistant } from '../../services/geminiService';
import { Bot, Sparkles, MessageSquare, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';

export function NegotiationAssistantPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi (हिंदी)');
  const [traderOffer, setTraderOffer] = useState(2150);
  const [marketAvg, setMarketAvg] = useState(2480);
  const [customScript, setCustomScript] = useState('');
  const [loading, setLoading] = useState(false);

  const counterOffer = Math.round(marketAvg * 0.96); // ₹2,380
  const minAcceptable = Math.round(marketAvg * 0.94); // ₹2,330

  const generateScript = async () => {
    setLoading(true);
    const prompt = `Local village trader is offering me ₹${traderOffer}/q for my crop, but Mandi average rate is ₹${marketAvg}/q. 
Give me a strong, polite, data-backed 2-sentence negotiation script in ${selectedLanguage} to counter the trader with ₹${counterOffer}/q and settle no less than ₹${minAcceptable}/q cash.`;

    try {
      const res = await askGeminiAssistant(prompt, selectedLanguage);
      setCustomScript(res);
    } catch (err) {
      setCustomScript(`व्यापारी को कहें: "इंदौर मंडी में आज गेहूं का भाव ₹${marketAvg} है। आपकी ₹${traderOffer} की बोली कम है। ₹${counterOffer} नगद में सौदा पक्का करें।"`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Vyapari Negotiation Script Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">AI Negotiation Assistant 🗣️</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Data-backed counter offers to negotiate higher rates with village traders (Vyaparis).
          </p>
        </div>

        {/* Language Selector */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-4 py-2.5 text-xs font-extrabold outline-none cursor-pointer"
        >
          <option value="Hindi (हिंदी)" className="text-slate-900">हिंदी (Hindi)</option>
          <option value="Punjabi (ਪੰਜਾਬੀ)" className="text-slate-900">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="English" className="text-slate-900">English</option>
          <option value="Marathi (मराठी)" className="text-slate-900">मराठी (Marathi)</option>
          <option value="Gujarati (ગુજરાતી)" className="text-slate-900">ગુજરાતી (Gujarati)</option>
        </select>
      </div>

      {/* Input & Output Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form */}
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 m-0">Trader Bid vs Mandi Benchmark</h2>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Local Trader Offer (₹/Quintal)</label>
              <input
                type="number"
                value={traderOffer}
                onChange={(e) => setTraderOffer(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 custom-input text-base"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Mandi Modal Rate (₹/Quintal)</label>
              <input
                type="number"
                value={marketAvg}
                onChange={(e) => setMarketAvg(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 custom-input text-base"
              />
            </div>

            <button
              onClick={generateScript}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 border-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Generating AI Script...' : 'Generate AI Negotiation Script'}</span>
            </button>
          </div>
        </div>

        {/* Counter Strategy Output */}
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 m-0">Recommended Counter Strategy</h2>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-emerald-800 font-bold uppercase text-[10px] block">Target Counter-Offer</span>
                <strong className="text-xl font-black text-emerald-950">₹{counterOffer} / Qtl</strong>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Min Acceptable Cash</span>
                <strong className="text-xl font-black text-slate-900">₹{minAcceptable} / Qtl</strong>
              </div>
            </div>

            {customScript ? (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-900 leading-relaxed animate-in fade-in">
                <strong className="text-emerald-700 block mb-1">🗣️ What to Say to Trader:</strong>
                "{customScript}"
              </div>
            ) : (
              <div className="bg-slate-50/50 p-5 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500 text-center font-medium">
                Click "Generate AI Negotiation Script" to get your customized verbal script.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
