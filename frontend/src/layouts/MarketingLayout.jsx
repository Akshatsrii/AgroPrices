import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';

export function MarketingLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-white">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-wide text-navy m-0">AgroPrice AI</h1>
            <p className="text-xs text-text-muted m-0">Smart Decisions for Every Harvest</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-[14px] font-bold no-underline hover:text-green transition-colors ${currentPath === '/' ? 'text-green' : 'text-navy'}`}>Home</Link>
          <Link to="/dashboard/market" className={`text-[14px] font-bold no-underline hover:text-green transition-colors ${currentPath === '/dashboard/market' ? 'text-green' : 'text-navy'}`}>Live Market</Link>
          <Link to="/market/nearby" className={`text-[14px] font-bold no-underline hover:text-green transition-colors ${currentPath === '/market/nearby' ? 'text-green' : 'text-navy'}`}>Nearby Mandis</Link>
          <Link to="/sell/crop" className={`text-[14px] font-bold no-underline hover:text-green transition-colors ${currentPath === '/sell/crop' ? 'text-green' : 'text-navy'}`}>Sell Crop (AI)</Link>
          <Link to="/assistant/chat" className={`text-[14px] font-bold no-underline hover:text-green transition-colors ${currentPath === '/assistant/chat' ? 'text-green' : 'text-navy'}`}>AI Assistant</Link>
          <Link to="/about" className={`text-[14px] font-bold no-underline hover:text-green transition-colors ${currentPath === '/about' ? 'text-green' : 'text-navy'}`}>About Us</Link>
        </nav>

        {/* CTA & Auth */}
        <div className="flex items-center gap-3">
          <Link 
            to="/sell/crop" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 no-underline transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>🌾</span> Sell Crop
          </Link>

          <SignedOut>
            <Link to="/auth/login" className="bg-navy text-white border-none py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer no-underline hover:bg-gray-800 transition-colors">Login / Sign In</Link>
          </SignedOut>
          
          <SignedIn>
            <Link to="/dashboard" className="hidden sm:inline-block bg-gray-100 text-navy hover:bg-gray-200 border-none py-2.5 px-4 rounded-xl text-xs font-bold cursor-pointer no-underline transition-colors">Dashboard</Link>
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
