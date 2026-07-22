import React from 'react';

const NOTIFICATIONS = [
  { id: 1, title: 'Price Surge Alert: Wheat (गेहूं)', desc: 'Khanna APMC price increased by +₹50/q today. Net profit is higher by transport to Khanna.', time: '10 mins ago', type: 'price', unread: true },
  { id: 2, title: 'AI Recommendation Ready', desc: 'Your crop selling analysis for Potato is generated. High Mandi demand detected in Samrala.', time: '2 hours ago', type: 'ai', unread: true },
  { id: 3, title: 'Buyer Inquiry: Ludhiana Trader', desc: 'A registered buyer is looking for 50 Quintals of Grade A Wheat near Samrala.', time: '1 day ago', type: 'buyer', unread: false },
  { id: 4, title: 'Government MSP Update 2026', desc: 'Cabinet approves MSP hike for Kharif crops. Check updated benchmark rates in Today\'s Market.', time: '2 days ago', type: 'system', unread: false },
];

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Notifications & Alerts 🔔</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Real-time market price alerts, AI sell advisories, and buyer inquiries.</p>
        </div>
        <button className="text-xs font-bold text-emerald-600 hover:underline bg-transparent border-0 cursor-pointer">
          Mark all as read
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className={`p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
            n.unread ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-gray-100'
          }`}>
            <div className="flex gap-3">
              <span className="text-2xl mt-0.5">
                {n.type === 'price' ? '📈' : n.type === 'ai' ? '🤖' : n.type === 'buyer' ? '🤝' : '📢'}
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 m-0 flex items-center gap-2">
                  {n.title}
                  {n.unread && <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />}
                </h3>
                <p className="text-xs text-gray-600 mt-1 m-0 leading-relaxed">{n.desc}</p>
                <span className="text-[10px] font-bold text-gray-400 mt-2 block">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
