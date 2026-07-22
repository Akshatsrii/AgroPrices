import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

export function SettingsPage() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [theme, setTheme] = useState('Light');

  const handleLogout = () => {
    signOut(() => navigate('/'));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4 px-4 sm:px-0 font-sans">
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-5">
        
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">App Settings ⚙️</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Manage profile, language preferences, themes, notifications, and security.</p>
        </div>

        <div className="space-y-2 text-xs">
          
          {/* Profile */}
          <Link to="/profile" className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50 text-slate-900 font-extrabold no-underline transition-all border border-gray-200/60">
            <span className="flex items-center gap-2">👨‍🌾 Farmer Profile</span>
            <span className="text-gray-400">&rarr;</span>
          </Link>

          {/* Language */}
          <Link to="/settings/language" className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50 text-slate-900 font-extrabold no-underline transition-all border border-gray-200/60">
            <span className="flex items-center gap-2">🌐 Language Options (Hindi, Punjabi, English...)</span>
            <span className="text-gray-400">&rarr;</span>
          </Link>

          {/* Theme */}
          <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 border border-gray-200/60">
            <span className="flex items-center gap-2 font-extrabold text-slate-900">🎨 App Color Theme</span>
            <div className="flex gap-2">
              {['Light', 'Dark System'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border-0 cursor-pointer ${
                    theme === t ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <Link to="/settings/notifications" className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50 text-slate-900 font-extrabold no-underline transition-all border border-gray-200/60">
            <span className="flex items-center gap-2">🔔 Notification & Price Alerts</span>
            <span className="text-gray-400">&rarr;</span>
          </Link>

          {/* Privacy */}
          <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 border border-gray-200/60">
            <span className="flex items-center gap-2 font-extrabold text-slate-900">🔒 Data Privacy & Encryption</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md">Protected</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-black text-xs text-center cursor-pointer transition-all border border-red-200 shadow-sm"
          >
            🚪 Logout of Account
          </button>
        </div>
      </div>
    </div>
  );
}
