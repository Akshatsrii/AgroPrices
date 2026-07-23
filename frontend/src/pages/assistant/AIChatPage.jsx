import React, { useState } from 'react';
import { askGeminiAssistant } from '../../services/geminiService';
import { apiService } from '../../services/apiService';

const LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hindi (हिंदी)', label: 'हिंदी (Hindi)' },
  { code: 'Punjabi (ਪੰਜਾਬੀ)', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'Marathi (मराठी)', label: 'मराठी (Marathi)' },
  { code: 'Gujarati (ગુજરાતી)', label: 'ગુજરાતી (Gujarati)' },
  { code: 'Bengali (বাংলা)', label: 'বাংলা (Bengali)' },
  { code: 'Telugu (తెలుగు)', label: 'తెలుగు (Telugu)' },
  { code: 'Tamil (தமிழ்)', label: 'தமிழ் (Tamil)' },
];

export function AIChatPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi (हिंदी)');
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: 'Namaste! Main AgroPrice AI Assistant hoon. Aaj Mandi bhav, crop prices, ya selling decision ke baare mein kya janna chahte hain?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    const newMsgs = [...messages, { sender: 'user', text: userText }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      // Try backend endpoint first
      const backendRes = await apiService.sendAIChat(
        newMsgs.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.text }))
      );

      if (backendRes.success && backendRes.data && backendRes.data.reply) {
        setMessages([...newMsgs, { sender: 'ai', text: backendRes.data.reply }]);
      } else {
        // Fall back to direct Gemini client service
        const responseText = await askGeminiAssistant(userText, selectedLanguage);
        setMessages([...newMsgs, { sender: 'ai', text: responseText }]);
      }
    } catch (err) {
      const responseText = await askGeminiAssistant(userText, selectedLanguage);
      setMessages([...newMsgs, { sender: 'ai', text: responseText }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 px-4 sm:px-0 font-sans">
      
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <span>✨ Powered by Express API & Google Gemini AI</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">AI Mandi Assistant 🤖</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Ask questions in your preferred language for instant data advice.</p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-600">Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none cursor-pointer focus:bg-white focus:border-emerald-600"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-4 sm:p-6 flex flex-col h-[520px]">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-700 text-white font-medium rounded-tr-none shadow-sm'
                  : 'bg-gray-50 text-slate-900 font-medium rounded-tl-none border border-gray-200/70'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 text-emerald-700 text-xs font-bold p-3 rounded-2xl border border-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                AgroPrice AI is analyzing Mandi data in {selectedLanguage}...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-4 border-t border-gray-100 flex gap-2">
          <input
            type="text"
            placeholder={`Ask in ${selectedLanguage} (e.g. Aaj Wheat ka bhav kya hai?)...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-600 outline-none font-medium"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md cursor-pointer transition-all border-0"
          >
            Ask Gemini &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
