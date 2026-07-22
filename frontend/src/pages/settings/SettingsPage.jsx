import React from 'react';
import { Link } from 'react-router-dom';

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Settings ⚙️</h1>
        <p className="text-xs text-gray-500 m-0">App preferences and notification configuration.</p>

        <div className="space-y-2 pt-2">
          <Link to="/settings/language" className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-slate-900 font-extrabold text-sm no-underline transition-all">
            <span>🌐 Language Settings</span>
            <span className="text-gray-400">&rarr;</span>
          </Link>
          <Link to="/settings/notifications" className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-slate-900 font-extrabold text-sm no-underline transition-all">
            <span>🔔 Notification & Alert Settings</span>
            <span className="text-gray-400">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
