import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('Hindi');
  const [queryText, setQueryText] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleStartListening = () => {
    setIsListening(true);
    setQueryText('');
    setAiAnswer('');

    // Simulate voice speech-to-text recognition
    setTimeout(() => {
      setIsListening(false);
      const text = language === 'Hindi'
        ? 'आज इंदौर मंडी में गेहूं का क्या भाव है?'
        : 'What is the wheat price at Indore mandi today?';
      setQueryText(text);

      const answer = language === 'Hindi'
        ? 'इंदौर मंडी में आज गेहूं का भाव ₹2,480 प्रति क्विंटल है। कल भाव ₹2,600 (+4.8%) तक जाने का अनुमान है।'
        : 'Indore Mandi Wheat price is Rs.2,480/quintal today. Forecasted to reach Rs.2,600 (+4.8%) tomorrow.';
      setAiAnswer(answer);
    }, 2500);
  };

  const handleTextToSpeech = () => {
    if (!aiAnswer) return;
    setIsSpeaking(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(aiAnswer);
      utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Voice Speech-to-Text & Advisory Engine</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight m-0">Farmer Voice Assistant 🎙️</h1>
          <p className="text-xs text-gray-500 m-0 mt-1">Speak in your regional language without typing to get instant Mandi rates.</p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-gray-600">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 rounded-xl px-3 py-2 outline-none focus:border-emerald-600"
          >
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Main Microphone Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${isListening ? 'bg-emerald-500/20 animate-ping' : 'bg-emerald-50'}`} />
          <button
            onClick={handleStartListening}
            disabled={isListening}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-xl transition-all cursor-pointer border-0 ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white'
            }`}
          >
            {isListening ? <MicOff className="w-10 h-10 animate-spin" /> : <Mic className="w-10 h-10" />}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 m-0">
            {isListening ? 'Listening... Speak Your Question' : 'Tap Mic to Start Speaking (माइक दबाकर पूछें)'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Try asking: "इंदौर मंडी में आज गेहूं का क्या भाव है?"
          </p>
        </div>

        {/* Real-time Speech Result Box */}
        {queryText && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 text-left space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Recognized Speech Voice Query</span>
            </div>
            <p className="text-base font-bold text-slate-900 m-0">{queryText}</p>

            {aiAnswer && (
              <div className="pt-3 border-t border-emerald-200/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900">AI Voice Answer:</span>
                  <button
                    onClick={handleTextToSpeech}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 cursor-pointer transition-all shadow-sm"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen Audio'}</span>
                  </button>
                </div>
                <p className="text-sm font-semibold text-emerald-950 bg-white p-3 rounded-xl border border-emerald-100 m-0">
                  {aiAnswer}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
