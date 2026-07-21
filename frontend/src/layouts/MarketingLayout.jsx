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
          <div className="w-11 h-11 rounded-xl bg-green-dark flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 5 16.5 5 10.5C5 6.5 8 4 12 4C16 4 19 6.5 19 10.5C19 16.5 12 21 12 21Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M12 13V8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M12 9C12 9 9.5 8 9 6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M12 11C12 11 14.5 10 15 8" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-wide text-navy m-0">AgroPrice AI</h1>
            <p className="text-xs text-text-muted m-0">Smart Decisions for Every Harvest</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-[15px] font-medium no-underline hover:text-green transition-colors ${currentPath === '/' ? 'text-green' : 'text-navy'}`}>Home</Link>
          <Link to="/about" className={`text-[15px] font-medium no-underline hover:text-green transition-colors ${currentPath === '/about' ? 'text-green' : 'text-navy'}`}>About Us</Link>
          <Link to="/features" className={`text-[15px] font-medium no-underline hover:text-green transition-colors ${currentPath === '/features' ? 'text-green' : 'text-navy'}`}>Features</Link>
          <Link to="/services" className={`text-[15px] font-medium no-underline hover:text-green transition-colors ${currentPath === '/services' ? 'text-green' : 'text-navy'}`}>Services</Link>
          <Link to="/contact" className={`text-[15px] font-medium no-underline hover:text-green transition-colors ${currentPath === '/contact' ? 'text-green' : 'text-navy'}`}>Contact</Link>
        </nav>

        {/* CTA & Auth */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link to="/auth/login" className="hidden md:inline-block text-[15px] font-semibold text-green hover:text-green-dark no-underline">Login</Link>
            <Link to="/auth/login" className="bg-navy text-white border-none py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer no-underline hover:bg-gray-800 transition-colors">Sign In</Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Link to="/app" className="bg-navy text-white border-none py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer no-underline hover:bg-gray-800 transition-colors">Dashboard</Link>
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
