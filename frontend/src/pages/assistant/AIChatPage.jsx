import React, { useState } from 'react';
import { askGeminiAssistant } from '../../services/geminiService';
import { apiService } from '../../services/apiService';
import { Bot, Send, Sparkles, Languages, MessageSquare } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Mandi Sahayak</h1>
          <p className="text-sm text-slate-500 m-0 mt-1">Get instant market guidance in your local language.</p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2 bg-slate-50/50 p-2 rounded-xl border border-gray-100">
          <Languages className="w-4 h-4 text-emerald-600 ml-1" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-2"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6 flex flex-col h-[600px]">
        
        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 pl-1 pt-2 pb-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-slate-900 text-white font-medium rounded-tr-sm shadow-sm'
                  : 'bg-emerald-50/50 text-slate-800 font-medium rounded-tl-sm border border-emerald-100/50'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-emerald-800 text-xs font-bold p-3.5 rounded-2xl border border-slate-200 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span>AgroPrice AI is analyzing Mandi data in {selectedLanguage}...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-4 border-t border-slate-100 flex gap-3">
          <input
            type="text"
            placeholder={`Ask in ${selectedLanguage} (e.g. Aaj Wheat ka bhav kya hai?)...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md cursor-pointer transition-all border-0 flex items-center space-x-2 active:scale-95"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
