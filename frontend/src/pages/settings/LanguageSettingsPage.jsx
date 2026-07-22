import React, { useState } from 'react';

const LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'hi', name: 'हिंदी (Hindi)' },
  { id: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { id: 'mr', name: 'मराठी (Marathi)' },
  { id: 'gu', name: 'ગુજરાતી (Gujarati)' },
];

export function LanguageSettingsPage() {
  const [selected, setSelected] = useState('en');

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Language Settings 🌐</h1>
        <p className="text-xs text-gray-500 m-0">Choose your preferred app interface language.</p>

        <div className="space-y-2">
          {LANGUAGES.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(l.id)}
              className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center text-sm font-extrabold cursor-pointer transition-all ${
                selected === l.id ? 'bg-emerald-50 border-emerald-600 text-emerald-900' : 'bg-gray-50 border-gray-200 text-slate-900'
              }`}
            >
              <span>{l.name}</span>
              {selected === l.id && <span className="text-emerald-600">✓ Active</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
