import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 text-slate-300 pt-10 pb-6 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-32 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8">
          
          {/* Brand & Social */}
          <div className="md:w-1/3">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-sm ring-1 ring-white/10">
                <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white m-0">AgroPrice AI</h1>
                <p className="text-[10px] text-emerald-400 font-bold m-0 uppercase tracking-widest">Smart Harvest</p>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mb-5">
              Empowering farmers with predictive models, optimal transport routing, and deep market insights to drive maximum profit.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-xs font-bold hover:bg-emerald-500 hover:border-emerald-500 hover:text-emerald-950 transition-colors">in</a>
              <a href="#" aria-label="X" className="w-8 h-8 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-xs font-bold hover:bg-emerald-500 hover:border-emerald-500 hover:text-emerald-950 transition-colors">𝕏</a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
            
            {/* Company */}
            <div>
              <h4 className="text-[10px] font-black tracking-widest text-emerald-500 mb-4 uppercase">Company</h4>
              <ul className="space-y-2.5 m-0 p-0 list-none">
                <li><Link to="/about" className="text-slate-400 hover:text-emerald-300 transition-colors text-xs no-underline font-medium">About Us</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-emerald-300 transition-colors text-xs no-underline font-medium">Leadership</Link></li>
                <li><Link to="#" className="text-slate-400 hover:text-emerald-300 transition-colors text-xs no-underline font-medium">Careers</Link></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-[10px] font-black tracking-widest text-emerald-500 mb-4 uppercase">Features</h4>
              <ul className="space-y-2.5 m-0 p-0 list-none">
                <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-xs no-underline font-medium">Live Mandi Data</Link></li>
                <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-xs no-underline font-medium">AI Price Prediction</Link></li>
                <li><Link to="/features" className="text-slate-400 hover:text-emerald-300 transition-colors text-xs no-underline font-medium">Transport Routing</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black tracking-widest text-emerald-500 mb-4 uppercase">Contact</h4>
              <ul className="space-y-3 m-0 p-0 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-xs text-slate-400 leading-snug">123 Innovation Agri-Park<br/>Bhopal, MP - 462001</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">hello@agroprice.ai</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-medium text-slate-500 m-0">© {new Date().getFullYear()} AgroPrice AI Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="text-[11px] font-medium text-slate-500 hover:text-white transition-colors no-underline">Privacy Policy</Link>
            <Link to="#" className="text-[11px] font-medium text-slate-500 hover:text-white transition-colors no-underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}