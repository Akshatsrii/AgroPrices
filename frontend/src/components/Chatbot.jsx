import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am AgroPrice AI Assistant. How can I help you make a smart selling decision today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput("");
    
    // Simulate API response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I am currently in Demo Mode. To get actual mandi predictions and transport cost calculations, please create a free account and login!", 
        sender: 'bot' 
      }]);
    }, 1000);
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
              className="bg-white rounded-2xl shadow-2xl border border-border w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[500px]"
            >
              <div className="bg-navy p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green rounded-full flex items-center justify-center">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold leading-tight">AgroPrice Assistant</h3>
                    <p className="text-xs text-green-light">Online</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-light transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-green text-white rounded-br-none' : 'bg-white border border-border text-navy rounded-bl-none shadow-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-white border-t border-border flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about crop prices..."
                  className="flex-1 bg-gray-50 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 bg-navy text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Send size={16} />
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
            className="w-16 h-16 bg-green text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:bg-green-dark transition-colors"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </div>
    </>
  );
}
