import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';

export function MarketingLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy font-sans">
      
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3.5 border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        
        {/* Brand Logo */}
        <Link to="/" onClick={closeDropdowns} className="flex items-center gap-3 no-underline shrink-0 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm border border-emerald-100 group-hover:scale-105 transition-transform">
            <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-wide text-navy m-0 group-hover:text-emerald-700 transition-colors">AgroPrice AI</h1>
            <p className="text-[11px] font-bold text-emerald-600 m-0">Smart Harvest Assistant</p>
          </div>
        </Link>

        {/* Desktop Dropdown Subparts Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/60">
          
          {/* Home Link */}
          <Link
            to="/"
            onClick={closeDropdowns}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold no-underline transition-all ${
              currentPath === '/' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Home
          </Link>

          {/* Subpart 1: Market & Mandis */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('market')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('market')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1 ${
                currentPath.startsWith('/market') || currentPath.startsWith('/dashboard/market')
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Market & Mandis</span>
              <span className="text-[10px]">▾</span>
            </button>

            {activeDropdown === 'market' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 space-y-1 z-50">
                <Link to="/dashboard/market" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  📈 Today's Live Rates
                </Link>
                <Link to="/market/nearby" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  📍 Nearby Mandis Radar (Maps)
                </Link>
                <Link to="/market/compare" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  ⚖️ Side-by-Side Comparison
                </Link>
                <Link to="/market/history" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  📊 Price History & Trends
                </Link>
              </div>
            )}
          </div>

          {/* Subpart 2: AI Decision Engine */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('ai')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('ai')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1 ${
                currentPath.startsWith('/sell') || currentPath.startsWith('/ai')
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>AI Decision Engine</span>
              <span className="text-[10px]">▾</span>
            </button>

            {activeDropdown === 'ai' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 space-y-1 z-50">
                <Link to="/sell/crop" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-black text-emerald-700 bg-emerald-50/80 rounded-xl no-underline">
                  🌾 8-Step Sell Crop Wizard
                </Link>
                <Link to="/ai/negotiation-assistant" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  🤝 Trader Counter-Offer Assistant
                </Link>
                <Link to="/ai/profit-calculator" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  🧮 Mandi Net Profit Calculator
                </Link>
                <Link to="/ai/transport-calculator" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  🚚 Freight & Transport Math
                </Link>
              </div>
            )}
          </div>

          {/* Subpart 3: Agronomy & Vision AI */}
          <Link
            to="/agronomy-suite"
            onClick={closeDropdowns}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold no-underline transition-all ${
              currentPath === '/agronomy-suite' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            📸 Agronomy & Vision
          </Link>

          {/* Subpart 4: P2P Marketplace */}
          <Link
            to="/marketplace"
            onClick={closeDropdowns}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold no-underline transition-all ${
              currentPath === '/marketplace' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            🛒 Marketplace
          </Link>

          {/* Subpart 5: AI Assistant & Voice */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('assistant')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('assistant')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1 ${
                currentPath.startsWith('/assistant')
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>AI Assistant</span>
              <span className="text-[10px]">▾</span>
            </button>

            {activeDropdown === 'assistant' && (
              <div className="absolute top-full right-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 space-y-1 z-50">
                <Link to="/assistant/chat" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  🤖 Chat AI Assistant (Gemini)
                </Link>
                <Link to="/assistant/voice" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-black text-emerald-700 bg-emerald-50/80 rounded-xl no-underline">
                  🎙️ Multilingual Voice Assistant
                </Link>
                <Link to="/assistant/history" onClick={closeDropdowns} className="block px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl no-underline">
                  📜 Query Logs & Advisory History
                </Link>
              </div>
            )}
          </div>

        </nav>

        {/* Action Buttons & Auth */}
        <div className="flex items-center gap-3">
          
          <Link 
            to="/sell/crop"
            onClick={closeDropdowns}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 no-underline transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
          >
            <span>🌾</span>
            <span className="hidden sm:inline">Sell Crop (AI Engine)</span>
            <span className="sm:hidden">Sell Crop</span>
          </Link>

          {/* SignedIn / SignedOut Clerk handling */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link
              to="/login"
              onClick={closeDropdowns}
              className="bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm no-underline transition-all active:scale-95"
            >
              Sign In
            </Link>
          </SignedOut>

        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Floating Gemini AI Chatbot Widget */}
      <Chatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
}
