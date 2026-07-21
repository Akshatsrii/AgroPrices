import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <section className="relative pt-20 pb-28 px-6 md:px-12 overflow-hidden bg-[linear-gradient(90deg,var(--color-border)_1px,transparent_1px),linear-gradient(0deg,var(--color-border)_1px,transparent_1px),linear-gradient(120deg,var(--color-green-bg)_0%,#ffffff_45%,#ffffff_100%)] bg-[size:60px_60px,60px_60px,100%_100%] bg-[position:-1px_-1px,-1px_-1px,0_0]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-green-bg text-green-dark text-[13px] font-semibold py-2 px-[18px] rounded-full mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-green"></span>
            AI-Powered Decision Engine
          </div>

          <h2 className="text-[34px] md:text-[50px] leading-[1.12] font-extrabold text-navy">
            Don't Just Sell.
            <span className="block text-green">Sell Smart.</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-muted max-w-[480px]">
            Most farmers sell their crop without knowing the best price, the nearest mandi, or tomorrow's trend. AgroPrice AI compares every option — price, transport, and profit — and tells you exactly what to do with your harvest today.
          </p>

          <div className="mt-7 p-5 bg-green-bg border-l-4 border-green rounded max-w-[500px]">
            <p className="italic font-bold text-[17px] mb-1.5">
              "Sell tomorrow in Ramganj Mandi — ₹1,450 more profit."
            </p>
            <p className="text-[13px] text-text-muted">
              That's a real AI recommendation, not just a price number.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/auth/signup" className="bg-navy text-white no-underline px-7 py-4 rounded-lg text-[15px] font-bold cursor-pointer hover:bg-gray-800 transition-colors">
              Get My Recommendation
            </Link>
            <Link to="/features" className="bg-transparent text-navy no-underline border-[1.5px] border-navy px-7 py-4 rounded-lg text-[15px] font-bold cursor-pointer hover:bg-slate-50 transition-colors">
              See How It Works
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="rounded-[20px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(20,83,45,0.35)] bg-white">
            <svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" className="block w-full h-auto">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cdeccb"/>
                  <stop offset="100%" stopColor="#eaf6ee"/>
                </linearGradient>
                <linearGradient id="field1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4d8f52"/>
                  <stop offset="100%" stopColor="#2f6b39"/>
                </linearGradient>
                <linearGradient id="rowA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#63a95f"/>
                  <stop offset="100%" stopColor="#3d7a44"/>
                </linearGradient>
              </defs>

              <rect width="700" height="520" fill="url(#sky)"/>
              <rect y="140" width="700" height="380" fill="url(#field1)"/>

              {/* distant hills */}
              <path d="M0 180 Q 140 130 280 175 T 700 150 V210 H0 Z" fill="#9fcf9a" opacity="0.55"/>

              {/* crop rows */}
              <g fill="url(#rowA)">
                <path d="M-20 240 L720 300 V330 L-20 270 Z"/>
                <path d="M-20 310 L720 375 V405 L-20 340 Z"/>
                <path d="M-20 380 L720 450 V480 L-20 415 Z"/>
              </g>

              {/* small trees */}
              <g fill="#2f6b39">
                <circle cx="60" cy="230" r="16"/>
                <circle cx="90" cy="240" r="12"/>
                <circle cx="630" cy="245" r="15"/>
                <circle cx="660" cy="255" r="11"/>
              </g>

              {/* farmer figure */}
              <g>
                <circle cx="230" cy="330" r="10" fill="#e8c39e"/>
                <rect x="221" y="340" width="18" height="30" rx="6" fill="#2563eb"/>
                <rect x="215" y="368" width="10" height="26" rx="4" fill="#3f4855"/>
                <rect x="235" y="368" width="10" height="26" rx="4" fill="#3f4855"/>
                <path d="M215 320 L245 320 L235 305 Z" fill="#f5d99b"/>
              </g>

              {/* crop basket */}
              <g>
                <ellipse cx="290" cy="392" rx="22" ry="10" fill="#a9662c"/>
                <rect x="270" y="380" width="40" height="16" rx="3" fill="#c17c34"/>
                <circle cx="278" cy="378" r="6" fill="#d64545"/>
                <circle cx="292" cy="374" r="6" fill="#d64545"/>
                <circle cx="304" cy="379" r="6" fill="#d64545"/>
              </g>

              {/* phone mockup with recommendation card */}
              <g>
                <rect x="400" y="140" width="230" height="330" rx="26" fill="#0f172a"/>
                <rect x="410" y="152" width="210" height="306" rx="16" fill="#ffffff"/>

                <text x="425" y="180" fontFamily="Arial" fontSize="13" fontWeight="700" fill="#0f172a">AgroPrice AI</text>
                <text x="425" y="198" fontFamily="Arial" fontSize="9" fill="#64748b">Soybean · 50 Quintal</text>

                <rect x="422" y="212" width="186" height="92" rx="12" fill="#14532d"/>
                <text x="434" y="234" fontFamily="Arial" fontSize="10" fontWeight="700" fill="#86efac">RECOMMENDATION</text>
                <text x="434" y="254" fontFamily="Arial" fontSize="12" fontWeight="700" fill="#ffffff">Sell Tomorrow —</text>
                <text x="434" y="270" fontFamily="Arial" fontSize="12" fontWeight="700" fill="#ffffff">Ramganj Mandi</text>
                <text x="434" y="290" fontFamily="Arial" fontSize="11" fontWeight="700" fill="#4ade80">+₹1,450 Net Profit</text>

                <rect x="422" y="316" width="88" height="52" rx="10" fill="#ecfdf3"/>
                <text x="432" y="334" fontFamily="Arial" fontSize="9" fill="#64748b">Confidence</text>
                <text x="432" y="356" fontFamily="Arial" fontSize="16" fontWeight="800" fill="#14532d">92%</text>

                <rect x="520" y="316" width="88" height="52" rx="10" fill="#ecfdf3"/>
                <text x="530" y="334" fontFamily="Arial" fontSize="9" fill="#64748b">Transport</text>
                <text x="530" y="356" fontFamily="Arial" fontSize="16" fontWeight="800" fill="#14532d">₹150</text>

                <rect x="422" y="384" width="186" height="34" rx="8" fill="#16a34a"/>
                <text x="475" y="405" fontFamily="Arial" fontSize="11" fontWeight="700" fill="#ffffff">View Full Analysis</text>
              </g>
            </svg>
          </div>

          {/* Floating Stat Card */}
          <div className="absolute -left-5 -bottom-[30px] md:left-auto md:right-[-20px] bg-white rounded-[14px] p-4 flex items-center gap-3.5 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.2)]">
            <div className="w-11 h-11 bg-green-bg rounded-[10px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]">
                <path d="M3 17L9 11L13 15L21 6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 6H21V12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[20px] font-extrabold text-navy">₹1,450</div>
              <div className="text-xs text-text-muted">Avg. Extra Profit / Sale</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
