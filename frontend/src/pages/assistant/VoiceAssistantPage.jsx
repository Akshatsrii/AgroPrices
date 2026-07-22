import React, { useState } from 'react';

export function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);

  const toggleListen = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Voice Assistant 🎙️</h1>
        <p className="text-xs text-gray-500 m-0 mt-1">Speak in Hindi or Punjabi to ask questions without typing.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${isListening ? 'bg-emerald-500/20 animate-ping' : 'bg-gray-100'}`} />
          <button
            onClick={toggleListen}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl transition-all cursor-pointer border-0 ${
              isListening ? 'bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isListening ? '⏹️' : '🎙️'}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 m-0">
            {isListening ? 'Listening... Speak Now' : 'Tap Mic to Start Speaking'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Try saying: "Bhaiya aaj Khanna mandi gehun ka rate kya hai?"</p>
        </div>
      </div>
    </div>
  );
}
