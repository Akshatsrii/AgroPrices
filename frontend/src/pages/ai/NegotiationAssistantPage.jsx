import React, { useState } from 'react';
import { askGeminiAssistant } from '../../services/geminiService';

export function NegotiationAssistantPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi (हिंदी)');
  const [traderOffer, setTraderOffer] = useState(17);
  const [marketAvg, setMarketAvg] = useState(20);
  const [customScript, setCustomScript] = useState('');
  const [loading, setLoading] = useState(false);

  const counterOffer = (marketAvg - 0.5).toFixed(2); // ₹19.50
  const minAcceptable = (marketAvg - 1.0).toFixed(2); // ₹19.00

  const generateScript = async () => {
    setLoading(true);
    const prompt = `Local village trader is offering me ₹${traderOffer}/kg for my crop, but market average rate is ₹${marketAvg}/kg. 
Give me a strong, polite, data-backed 2-sentence negotiation script in ${selectedLanguage} to counter the trader with ₹${counterOffer}/kg and settle no less than ₹${minAcceptable}/kg.`;

    try {
      const res = await askGeminiAssistant(prompt, selectedLanguage);
      setCustomScript(res);
    } catch (err) {
      setCustomScript(`Bhai Sahab, Mandi average ₹${marketAvg} hai. Cash rate ₹${counterOffer} chahiye, ₹${minAcceptable} se neeche bilkul nahi.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            🗣️ AI Trader Counter Engine
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0 mt-1">AI Negotiation Assistant</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Data-backed counter offers to negotiate higher rates with village traders (Vyaparis).</p>
        </div>

        {/* Language Selector */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none cursor-pointer"
        >
          <option value="Hindi (हिंदी)">हिंदी (Hindi)</option>
          <option value="Punjabi (ਪੰਜਾਬੀ)">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="English">English</option>
          <option value="Marathi (मराठी)">मराठी (Marathi)</option>
          <option value="Gujarati (ગુજરાતી)">ગુજરાતી (Gujarati)</option>
        </select>
      </div>

      {/* Input & Output Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">Input Trader Offer</h2>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Village Trader Offer (₹/kg)</label>
            <input
              type="number"
              value={traderOffer}
              onChange={(e) => setTraderOffer(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-black text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Regional Market Average (₹/kg)</label>
            <input
              type="number"
              value={marketAvg}
              onChange={(e) => setMarketAvg(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-black text-slate-900 outline-none"
            />
          </div>

          <button
            onClick={generateScript}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-4 rounded-2xl cursor-pointer transition-all border-0 shadow-md disabled:opacity-50"
          >
            {loading ? 'Generating with Gemini...' : '✨ Generate Counter Script in ' + selectedLanguage}
          </button>
        </div>

        {/* AI Counter Calculation Matrix */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
              AI Negotiation Targets
            </span>
            <h3 className="text-xl font-black text-white m-0">Counter Strategy Matrix</h3>
          </div>

          <div className="space-y-3 text-xs bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center border-b border-slate-700/70 pb-2">
              <span className="text-slate-400 font-medium">Village Trader Offer:</span>
              <strong className="text-red-400 font-extrabold">₹{traderOffer}/kg</strong>
            </div>

            <div className="flex justify-between items-center border-b border-slate-700/70 pb-2">
              <span className="text-slate-400 font-medium">Market Average Rate:</span>
              <strong className="text-white font-extrabold">₹{marketAvg}/kg</strong>
            </div>

            <div className="flex justify-between items-center border-b border-slate-700/70 pb-2">
              <span className="text-emerald-300 font-bold">Suggested Counter Offer:</span>
              <strong className="text-emerald-400 font-black text-sm">₹{counterOffer}/kg</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-amber-300 font-bold">Minimum Acceptable Rate:</span>
              <strong className="text-amber-400 font-black text-sm">₹{minAcceptable}/kg</strong>
            </div>
          </div>

          {customScript && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 font-medium text-xs leading-relaxed">
              "{customScript}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
