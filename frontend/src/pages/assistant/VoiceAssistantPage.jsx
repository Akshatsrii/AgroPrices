import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { askGeminiAssistant } from '../../services/geminiService';

export function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('Hindi');
  const [queryText, setQueryText] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'Hindi' ? 'hi-IN' : language === 'Punjabi' ? 'pa-IN' : language === 'Gujarati' ? 'gu-IN' : 'en-US';

      rec.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        setQueryText(transcript);
        setLoading(true);
        setErrorMessage('');

        try {
          const answer = await askGeminiAssistant(transcript, language);
          setAiAnswer(answer);
          speakResponse(answer);
        } catch (err) {
          setErrorMessage('Unable to process voice AI query: ' + err.message);
        } finally {
          setLoading(false);
        }
      };

      rec.onerror = (event) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          console.warn('Speech recognition error:', event.error);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [language]);

  const handleToggleListen = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (recognitionRef.current) {
      try {
        setQueryText('');
        setAiAnswer('');
        setErrorMessage('');
        recognitionRef.current.lang = language === 'Hindi' ? 'hi-IN' : language === 'Punjabi' ? 'pa-IN' : language === 'Gujarati' ? 'gu-IN' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Recognition start exception:', e);
      }
    } else {
      // Fallback for browsers without Web Speech API support
      setIsListening(true);
      setQueryText('इंदौर मंडी में गेहूं का क्या भाव है?');
      setLoading(true);

      setTimeout(async () => {
        setIsListening(false);
        const answer = await askGeminiAssistant('इंदौर मंडी में गेहूं का क्या भाव है?', language);
        setAiAnswer(answer);
        setLoading(false);
        speakResponse(answer);
      }, 1500);
    }
  };

  const speakResponse = (textToSpeak) => {
    if (!textToSpeak) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'Hindi' ? 'hi-IN' : language === 'Punjabi' ? 'pa-IN' : language === 'Gujarati' ? 'gu-IN' : 'en-US';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4 sm:px-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Web Speech API & Live Gemini AI Voice Bot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">Farmer Voice Assistant 🎙️</h1>
          <p className="text-xs sm:text-sm text-slate-500 m-0 mt-1">Speak in your regional language without typing to get live Mandi rates and AI advice.</p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <label className="text-xs font-bold text-slate-600">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border-0 text-xs font-bold text-slate-900 outline-none cursor-pointer pr-2"
          >
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Main Microphone Card */}
      <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-lg p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${isListening ? 'bg-emerald-500/20 animate-ping' : 'bg-emerald-50'}`} />
          <button
            onClick={handleToggleListen}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-xl transition-all cursor-pointer border-0 ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white'
            }`}
          >
            {isListening ? <MicOff className="w-10 h-10 animate-spin" /> : <Mic className="w-10 h-10" />}
          </button>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 m-0">
            {isListening ? 'Listening... Speak Your Question' : 'Tap Mic to Start Speaking (माइक दबाकर पूछें)'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
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

            {loading && (
              <div className="text-xs font-bold text-emerald-800 flex items-center space-x-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Generating live Gemini AI voice advisory...</span>
              </div>
            )}

            {aiAnswer && (
              <div className="pt-3 border-t border-emerald-200/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-900">Live Gemini AI Response:</span>
                  <button
                    onClick={() => speakResponse(aiAnswer)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 cursor-pointer transition-all shadow-sm active:scale-95 border-0"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-amber-300' : ''}`} />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen Audio'}</span>
                  </button>
                </div>
                <p className="text-sm font-semibold text-emerald-950 bg-white p-4 rounded-xl border border-emerald-100 m-0 leading-relaxed">
                  {aiAnswer}
                </p>
              </div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-xs font-bold text-red-700 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
