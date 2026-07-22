import React from 'react';
import { Link } from 'react-router-dom';

const CHAT_SESSIONS = [
  { id: 1, title: 'Wheat Price Query at Khanna APMC', date: '22 Jul 2026', preview: 'Aaj Khanna APMC Mandi mein Grade A Wheat rate ₹2,380 hai...' },
  { id: 2, title: 'Potato Cold Storage Holding Advice', date: '18 Jul 2026', preview: 'Cold storage stock depletion before new harvest season...' },
  { id: 3, title: 'Trader Negotiation Script', date: '10 Jul 2026', preview: 'Bhai Sahab, Khanna APMC mein rate ₹2,380 hai...' },
];

export function AIHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">AI Chat History 💬</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Review past chat sessions and saved AI selling advice.</p>
        </div>
        <Link to="/assistant/chat" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl no-underline">
          New Chat &rarr;
        </Link>
      </div>

      <div className="space-y-3">
        {CHAT_SESSIONS.map(s => (
          <div key={s.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-slate-900 m-0">{s.title}</h3>
              <span className="text-[10px] font-bold text-gray-400">{s.date}</span>
            </div>
            <p className="text-xs text-gray-600 m-0">{s.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
