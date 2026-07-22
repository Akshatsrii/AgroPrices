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
      <header className="flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3.5 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        
        {/* Brand Logo */}
        <Link to="/" onClick={closeDropdowns} className="flex items-center gap-3 no-underline shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-wide text-navy m-0">AgroPrice AI</h1>
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
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 space-y-1">
                <Link to="/dashboard/market" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📈</span> Live Market Rates
                </Link>
                <Link to="/market/nearby" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📍</span> Nearby APMC Mandis
                </Link>
                <Link to="/market/search" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🔍</span> Search Mandi Directory
                </Link>
                <Link to="/market/compare" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📊</span> Price Comparison Table
                </Link>
                <Link to="/market/history" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📅</span> Historical Price Trends
                </Link>
                <Link to="/market/trends" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🌐</span> Macro Market News
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
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 space-y-1">
                <Link to="/sell/crop" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 no-underline">
                  <span>🌾</span> Sell Crop 8-Step Wizard
                </Link>
                <Link to="/ai/profit-calculator" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🧮</span> Net Profit Calculator
                </Link>
                <Link to="/ai/transport-calculator" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🚛</span> Freight & Vehicle Calculator
                </Link>
                <Link to="/ai/negotiation-assistant" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🗣️</span> Trader Negotiation Scripts
                </Link>
                <Link to="/ai/sell-vs-wait" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>⏳</span> Sell Today vs Wait Matrix
                </Link>
              </div>
            )}
          </div>

          {/* Subpart 3: Farmer Hub */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('farmer')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('farmer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1 ${
                currentPath.startsWith('/assistant') || currentPath.startsWith('/farmer-history')
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Farmer Hub</span>
              <span className="text-[10px]">▾</span>
            </button>

            {activeDropdown === 'farmer' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 space-y-1">
                <Link to="/assistant/chat" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🤖</span> AI Chat Assistant
                </Link>
                <Link to="/assistant/voice" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🎙️</span> Voice Assistant
                </Link>
                <Link to="/farmer-history/sales" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📜</span> Previous Sales Ledger
                </Link>
                <Link to="/farmer-history/analytics" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📈</span> Profit Analytics
                </Link>
                <Link to="/farmer-history/crops" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>🌾</span> Crop & Harvest History
                </Link>
              </div>
            )}
          </div>

          {/* Subpart 4: Features & Admin */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('more')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => toggleDropdown('more')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border-0 bg-transparent cursor-pointer flex items-center gap-1 ${
                currentPath === '/about' || currentPath === '/features' || currentPath === '/contact' || currentPath.startsWith('/admin')
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Features & More</span>
              <span className="text-[10px]">▾</span>
            </button>

            {activeDropdown === 'more' && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 space-y-1">
                <Link to="/about" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>💡</span> About AgroPrice AI
                </Link>
                <Link to="/features" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>⚡</span> Key Features
                </Link>
                <Link to="/contact" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>📞</span> Contact Support
                </Link>
                <Link to="/settings" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 no-underline">
                  <span>⚙️</span> App Settings
                </Link>
                <div className="my-1 border-t border-gray-100" />
                <Link to="/admin" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-extrabold text-slate-900 bg-gray-50 hover:bg-gray-100 no-underline">
                  <span>🛡️</span> Admin Panel Portal
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* CTA & Auth Section */}
        <div className="flex items-center gap-2.5">
          <Link 
            to="/sell/crop" 
            onClick={closeDropdowns}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 no-underline transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>🌾</span>
            <span className="hidden sm:inline">Sell Crop (AI)</span>
            <span className="sm:hidden">Sell</span>
          </Link>

          <SignedOut>
            <Link 
              to="/auth/login" 
              onClick={closeDropdowns}
              className="bg-slate-900 text-white border-none py-2.5 px-4 rounded-xl text-xs font-bold cursor-pointer no-underline hover:bg-slate-800 transition-colors"
            >
              Login / Sign In
            </Link>
          </SignedOut>
          
          <SignedIn>
            <Link 
              to="/profile" 
              onClick={closeDropdowns}
              className="hidden sm:inline-block bg-gray-100 text-slate-900 hover:bg-gray-200 py-2.5 px-3.5 rounded-xl text-xs font-bold cursor-pointer no-underline transition-colors border-0"
            >
              My Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      <Chatbot />
    </div>
  );
}
