import React, { useState } from 'react';

export function NotificationSettingsPage() {
  const [toggles, setToggles] = useState({
    priceSurge: true,
    aiAdvisories: true,
    buyerInquiries: true,
    smsAlerts: false,
  });

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Notification Settings</h1>
        <p className="text-xs text-gray-500 m-0">Manage price alerts and push notification preferences.</p>

        <div className="space-y-3">
          {[
            { key: 'priceSurge', label: 'Price Surge Alerts (>+₹50/q)' },
            { key: 'aiAdvisories', label: 'AI Selling Decision Advisories' },
            { key: 'buyerInquiries', label: 'Registered Buyer Inquiries' },
            { key: 'smsAlerts', label: 'SMS Notifications to Mobile' },
          ].map(item => (
            <div key={item.key} className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-xs font-bold text-slate-900">{item.label}</span>
              <button
                onClick={() => toggle(item.key)}
                className={`w-12 h-6 rounded-full transition-all cursor-pointer p-0.5 border-0 ${
                  toggles[item.key] ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  toggles[item.key] ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
