import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, Mic } from 'lucide-react';
import { askGeminiAssistant } from '../services/geminiService';
import { Link } from 'react-router-dom';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('Hindi (हिंदी)');
  const [messages, setMessages] = useState([
    { text: "Namaste! Main AgroPrice Gemini AI Assistant hoon. Aaj Kota, Indore ya Lucknow Mandi ke baare mein kya janna chahte hain?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const QUICK_PROMPTS = [
    "इंदौर में गेहूं का क्या भाव है?",
    "लखनऊ में धान का रेट बताओ",
    "क्या कल आलू बेचना सही रहेगा?",
    "कोटा मंडी में सरसों का भाव?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;
    const newMsgs = [...messages, { text: query, sender: 'user' }];
    setMessages(newMsgs);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const botResponse = await askGeminiAssistant(query, language);
      setMessages([...newMsgs, { text: botResponse, sender: 'bot' }]);
    } catch (err) {
      setMessages([...newMsgs, { text: "Network error fetching Gemini AI response.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-[32px] shadow-2xl border border-slate-200/80 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[540px]"
            >
              {/* Hero Header */}
              <div className="hero-gradient p-4 flex justify-between items-center text-white border-b border-emerald-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-sm shadow-md border border-white/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm leading-tight m-0 text-white flex items-center gap-1.5">
                      <span>AgroPrice AI Assistant</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    </h3>
                    <p className="text-[10px] text-emerald-200 font-bold m-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Gemini 1.5 Flash Active
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-white/10 text-white text-[10px] font-bold rounded-xl px-2.5 py-1 border border-white/20 outline-none cursor-pointer"
                  >
                    <option value="Hindi (हिंदी)" className="text-slate-900">हिंदी</option>
                    <option value="Punjabi (ਪੰਜਾਬੀ)" className="text-slate-900">ਪੰਜਾਬੀ</option>
                    <option value="English" className="text-slate-900">English</option>
                  </select>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white p-1 rounded-lg transition-colors border-0 bg-transparent cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed shadow-sm ${
                        m.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-white text-slate-900 border border-slate-200/80 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-500 border border-slate-200/80 rounded-2xl p-3 text-xs font-bold animate-pulse flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Gemini AI is analyzing Mandi prices...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="p-2 bg-white border-t border-slate-100 flex overflow-x-auto gap-1.5 scrollbar-none">
                {QUICK_PROMPTS.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(qp)}
                    className="text-[10px] font-bold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-xl shrink-0 border-0 cursor-pointer transition-all"
                  >
                    {qp}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask Mandi rate in any city..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none custom-input"
                />

                <Link
                  to="/assistant"
                  title="Open Voice Assistant"
                  className="p-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all border-0 flex items-center justify-center no-underline"
                >
                  <Mic className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleSend()}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-2.5 rounded-xl transition-all border-0 shadow-md cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-4 rounded-full shadow-2xl border-2 border-white flex items-center justify-center space-x-2 transition-all cursor-pointer group shadow-emerald-600/40"
        >
          <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          <span className="font-extrabold text-xs pr-1">AgroPrice Gemini AI</span>
        </button>
      </div>
    </>
  );
}
