import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { Settings, User, Globe, Bell, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

export function SettingsPage() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [theme, setTheme] = useState('Light');

  const handleLogout = () => {
    signOut(() => navigate('/'));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Banner */}
      <div className="hero-gradient text-white p-6 sm:p-8 rounded-[32px] shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30 text-xs font-bold text-emerald-200 mb-2">
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span>Account & Preferences Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight">App Settings ⚙️</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 m-0 mt-1 max-w-xl">
            Manage profile, language preferences, themes, notifications, and security.
          </p>
        </div>
      </div>

      {/* Settings Navigation List */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm space-y-3">
        <h2 className="text-base font-black text-slate-900 m-0 mb-2">General & Account Preferences</h2>

        <div className="space-y-2 text-xs">
          {/* Profile */}
          <Link to="/profile" className="flex justify-between items-center p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-900 font-extrabold no-underline transition-all border border-slate-200/60 card-hover-effect">
            <span className="flex items-center gap-3">
              <User className="w-5 h-5 text-emerald-600" />
              <span>Farmer Profile Details</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Language */}
          <Link to="/settings/language" className="flex justify-between items-center p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-900 font-extrabold no-underline transition-all border border-slate-200/60 card-hover-effect">
            <span className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span>Language Options (Hindi, Punjabi, English, Gujarati...)</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Theme */}
          <div className="flex justify-between items-center p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/60">
            <span className="flex items-center gap-3 font-extrabold text-slate-900">
              <Settings className="w-5 h-5 text-emerald-600" />
              <span>App Color Theme</span>
            </span>
            <div className="flex gap-2">
              {['Light', 'Dark System'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border-0 cursor-pointer transition-all ${
                    theme === t ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <Link to="/settings/notifications" className="flex justify-between items-center p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-900 font-extrabold no-underline transition-all border border-slate-200/60 card-hover-effect">
            <span className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-emerald-600" />
              <span>Notification & High Price Alerts</span>
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-extrabold py-4 rounded-2xl text-xs sm:text-sm border border-red-200 cursor-pointer flex items-center justify-center space-x-2 transition-all active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of AgroPrice AI</span>
          </button>
        </div>

      </div>
    </div>
  );
}
