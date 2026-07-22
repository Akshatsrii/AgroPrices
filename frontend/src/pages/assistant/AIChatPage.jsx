import React, { useState } from 'react';

const SAMPLE_MESSAGES = [
  { sender: 'ai', text: 'Namaste Gurpreet ji! 🙏 Main AgroPrice AI Assistant hoon. Aaj Wheat, Paddy, ya Potato ke baare mein kya janna chahte hain?' },
  { sender: 'user', text: 'Aaj Khanna mandi mein gehun (wheat) ka kya rate chal raha hai?' },
  { sender: 'ai', text: 'Aaj Khanna APMC Mandi mein Grade A Wheat ka rate ₹2,380/quintal hai. Yesterday ke muqable ₹50 upar hai! Transport cost kat ke bhi Khanna mandi behter hai.' }
];

export function AIChatPage() {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: input }];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: `Aapne pucha: "${input}". AI Analysis ke anusar, Mandi mein demand acchi hai. Best profit ke liye Sell Crop module use karein!` }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">AgroPrice AI Assistant 🤖</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Ask anything in Hindi or English about mandi rates, crops, or transport.</p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          ● Online
        </span>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                  : 'bg-gray-100 text-slate-900 font-medium rounded-tl-none border border-gray-200'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSend} className="pt-4 border-t border-gray-100 flex gap-2">
          <input
            type="text"
            placeholder="Type your question (e.g. Aaj tomato ka rate kya hai?)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-600 outline-none"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md cursor-pointer transition-all border-0"
          >
            Send &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
