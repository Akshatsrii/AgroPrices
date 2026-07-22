import React, { useState } from 'react';
import { askGeminiAssistant } from '../../services/geminiService';

export function NegotiationAssistantPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi (हिंदी)');
  const [traderOffer, setTraderOffer] = useState('2250');
  const [mandiRate, setMandiRate] = useState('2380');
  const [customScript, setCustomScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    const prompt = `Local village trader is offering me ₹${traderOffer}/quintal for my wheat crop, but nearby Khanna Mandi rate is ₹${mandiRate}/quintal. 
Give me a strong, polite, data-backed 2-sentence negotiation script in ${selectedLanguage} to counter the trader and ask for at least ₹2,320/quintal cash rate.`;

    try {
      const res = await askGeminiAssistant(prompt, selectedLanguage);
      setCustomScript(res);
    } catch (err) {
      setCustomScript("Bhai Sahab, Mandi rate ₹2,380 hai. Direct cash par ₹2,320 se kam nahi ho sakta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <span>🗣️ Powered by Gemini AI</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">AI Negotiation Assistant 💬</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Generate data-backed counter scripts to negotiate higher rates with village traders.</p>
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

      {/* Generator Form */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider m-0">Generate Custom Counter Script</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Trader Offer Rate (₹/quintal)</label>
            <input
              type="number"
              value={traderOffer}
              onChange={(e) => setTraderOffer(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">APMC Mandi Rate (₹/quintal)</label>
            <input
              type="number"
              value={mandiRate}
              onChange={(e) => setMandiRate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none"
            />
          </div>
        </div>

        <button
          onClick={generateScript}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl cursor-pointer transition-all border-0 shadow-md disabled:opacity-50"
        >
          {loading ? 'Generating with Gemini...' : '✨ Generate Counter Script in ' + selectedLanguage}
        </button>

        {customScript && (
          <div className="p-5 rounded-2xl bg-slate-900 text-emerald-300 font-medium text-xs sm:text-sm leading-relaxed shadow-lg">
            {customScript}
          </div>
        )}
      </div>
    </div>
  );
}
