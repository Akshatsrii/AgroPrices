import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

export function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useUser();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: "Today's Market", path: '/dashboard/market', icon: '📈' },
    { label: 'Trending Crops', path: '/dashboard/trending', icon: '🔥' },
    { label: 'Notifications', path: '/dashboard/notifications', icon: '🔔' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20 md:pb-0">
      
      {/* Top Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm flex items-center justify-center shrink-0">
              <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 tracking-tight m-0">AgroPrice AI</h1>
              <p className="text-[11px] text-emerald-600 font-bold m-0">Smart Selling Assistant</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-2xl">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold no-underline transition-all ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User & Sell CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/sell/crop"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 no-underline transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>🌾</span>
              <span className="hidden sm:inline">Sell Crop (AI Engine)</span>
              <span className="sm:hidden">Sell Crop</span>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 px-2 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-bold no-underline transition-all ${
                isActive ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
