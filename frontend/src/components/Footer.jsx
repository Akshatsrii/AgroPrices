import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-navy to-slate-950 text-white pt-16 pb-8 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 no-underline mb-6 group w-fit">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.4)] ring-1 ring-white/10">
                <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white m-0">AgroPrice AI</h1>
                <p className="text-xs text-emerald-400/80 font-semibold m-0 tracking-wide">Smart Decisions for Every Harvest</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              AgroPrice AI is a leading agricultural decision platform with deep expertise in building predictive models, transport routing, and market insights that connect farmers and drive profit.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-emerald-500 hover:border-emerald-500 hover:text-emerald-950 transition-all duration-200">in</a>
              <a href="#" aria-label="X" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-emerald-500 hover:border-emerald-500 hover:text-emerald-950 transition-all duration-200">𝕏</a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.15em] text-emerald-400/90 mb-6 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">About Us</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">Leadership</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">Careers</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">News</Link></li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.15em] text-emerald-400/90 mb-6 uppercase">Features</h4>
            <ul className="space-y-4">
              <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">Live Mandi Data</Link></li>
              <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">AI Price Prediction</Link></li>
              <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">Transport Routing</Link></li>
              <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-sm no-underline">Profit Calculator</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.15em] text-emerald-400/90 mb-6 uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xs mt-0.5">📍</span>
                <span className="text-sm text-slate-400 leading-relaxed">123 Innovation Agri-Park, Sector 4, Bhopal, Madhya Pradesh - 462001</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xs">📞</span>
                <span className="text-sm text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xs">✉️</span>
                <span className="text-sm text-slate-400">hello@agroprice.ai</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 m-0">© 2026 AgroPrice AI Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors no-underline">Privacy Policy</Link>
            <Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors no-underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}