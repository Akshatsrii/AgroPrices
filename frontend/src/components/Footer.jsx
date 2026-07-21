import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 no-underline mb-6">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-sm">
                <img src="/logo.jpg" alt="AgroPrice AI Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-wide text-white m-0">AgroPrice AI</h1>
                <p className="text-xs text-gray-400 m-0">Smart Decisions for Every Harvest</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              AgroPrice AI is a leading agricultural decision platform with deep expertise in building predictive models, transport routing, and market insights that connect farmers and drive profit.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">in</a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">𝕏</a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-gray-300 mb-6 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-green-light transition-colors text-sm">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-green-light transition-colors text-sm">Leadership</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-green-light transition-colors text-sm">Careers</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-green-light transition-colors text-sm">News</Link></li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-gray-300 mb-6 uppercase">Features</h4>
            <ul className="space-y-4">
              <li><Link to="/features" className="text-gray-400 hover:text-green-light transition-colors text-sm">Live Mandi Data</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-green-light transition-colors text-sm">AI Price Prediction</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-green-light transition-colors text-sm">Transport Routing</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-green-light transition-colors text-sm">Profit Calculator</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-gray-300 mb-6 uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1">📍</span>
                <span className="text-sm text-gray-400 leading-relaxed">123 Innovation Agri-Park, Sector 4, Bhopal, Madhya Pradesh - 462001</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">📞</span>
                <span className="text-sm text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">✉️</span>
                <span className="text-sm text-gray-400">hello@agroprice.ai</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 m-0">© 2026 AgroPrice AI Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
