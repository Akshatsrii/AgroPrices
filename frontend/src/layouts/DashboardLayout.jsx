import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

export function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: "Today's Market", path: '/dashboard/market', icon: '📈' },
    { label: 'Trending Crops', path: '/dashboard/trending', icon: '🔥' },
    { label: 'Notifications', path: '/dashboard/notifications', icon: '🔔' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 md:pb-0">

      {/* Top Glassmorphic Navigation Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/70 sticky top-0 z-40 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 no-underline group shrink-0">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-[0_4px_14px_-4px_rgba(16,185,129,0.35)] flex items-center justify-center shrink-0 ring-1 ring-emerald-100 group-hover:scale-105 transition-transform duration-200">
              <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-black text-slate-900 tracking-tight m-0 group-hover:text-emerald-700 transition-colors">AgroPrice AI</h1>
              <p className="text-[11px] text-emerald-600 font-bold m-0 tracking-wide">Smart Selling Assistant</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold no-underline transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.15)]'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User & Sell CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/sell/crop"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-[0_8px_20px_-6px_rgba(5,150,105,0.5)] hover:shadow-[0_10px_24px_-4px_rgba(5,150,105,0.55)] no-underline transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>🌾</span>
              <span className="hidden sm:inline">Sell Crop (AI Engine)</span>
              <span className="sm:hidden">Sell Crop</span>
            </Link>
            <div className="ring-1 ring-slate-200 rounded-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 z-40 px-2 py-2 flex items-center justify-around shadow-[0_-8px_24px_-8px_rgba(15,23,42,0.12)]">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-bold no-underline transition-all duration-200 ${
                isActive ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              <span className={`text-lg transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              <span>{item.label.split(' ')[0]}</span>
              <span className={`h-1 w-1 rounded-full transition-colors ${isActive ? 'bg-emerald-500' : 'bg-transparent'}`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}