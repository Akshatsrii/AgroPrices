import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { askGeminiAssistant } from '../services/geminiService';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('Hindi (हिंदी)');
  const [messages, setMessages] = useState([
    { text: "Namaste! Main AgroPrice Gemini AI Assistant hoon. Aaj Wheat, Paddy ya Mandi rate ke baare mein kya puchna chahte hain?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    const newMsgs = [...messages, { text: userMsg, sender: 'user' }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await askGeminiAssistant(userMsg, language);
      setMessages([...newMsgs, { text: botResponse, sender: 'bot' }]);
    } catch (err) {
      setMessages([...newMsgs, { text: "Network error fetching Gemini AI response.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[520px]"
            >
              {/* Header */}
              <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm leading-tight m-0">AgroPrice Gemini AI</h3>
                    <p className="text-[10px] text-emerald-400 font-bold m-0">● Powered by Gemini</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-slate-800 text-white text-[10px] font-bold rounded-lg px-2 py-1 border border-slate-700 outline-none"
                  >
                    <option value="Hindi (हिंदी)">हिंदी</option>
                    <option value="English">English</option>
                    <option value="Punjabi (ਪੰਜਾਬੀ)">ਪੰਜਾਬੀ</option>
                    <option value="Marathi (मराठी)">मराठी</option>
                    <option value="Gujarati (ગુજરાતી)">ગુજરાતી</option>
                  </select>

                  <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                        : 'bg-white border border-gray-200 text-slate-900 rounded-bl-none shadow-sm font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-2.5 rounded-2xl text-xs text-emerald-700 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                      Gemini is thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Ask in ${language}...`}
                  disabled={loading}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600 text-slate-900 font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center transition-colors border-0 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-emerald-700 transition-all border-0 cursor-pointer"
          >
            <MessageCircle size={26} />
          </motion.button>
        )}
      </div>
    </>
  );
}
