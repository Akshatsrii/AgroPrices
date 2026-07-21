import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 md:px-12 overflow-hidden bg-[linear-gradient(90deg,var(--color-border)_1px,transparent_1px),linear-gradient(0deg,var(--color-border)_1px,transparent_1px),linear-gradient(120deg,var(--color-green-bg)_0%,#ffffff_45%,#ffffff_100%)] bg-[size:60px_60px,60px_60px,100%_100%] bg-[position:-1px_-1px,-1px_-1px,0_0]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-bg text-green-dark text-[13px] font-semibold py-2 px-[18px] rounded-full mb-6 shadow-sm border border-green-light">
              <span className="w-[8px] h-[8px] rounded-full bg-green animate-pulse"></span>
              AI-Powered Decision Engine
            </div>

            <h2 className="text-[38px] md:text-[56px] leading-[1.1] font-extrabold text-navy tracking-tight">
              Don't Just Sell.
              <span className="block text-green mt-1">Sell Smart.</span>
            </h2>

            <p className="mt-6 text-[17px] leading-relaxed text-text-muted max-w-[480px]">
              Most farmers sell their crop without knowing the best price, the nearest mandi, or tomorrow's trend. AgroPrice AI compares every option — price, transport, and profit — and tells you exactly what to do with your harvest today.
            </p>

            <div className="mt-8 p-5 bg-green-bg border-l-4 border-green rounded-lg max-w-[500px] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <svg className="w-12 h-12 text-green-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <p className="italic font-bold text-[17px] mb-2 text-navy relative z-10">
                "Sell tomorrow in Ramganj Mandi — ₹1,450 more profit."
              </p>
              <p className="text-[14px] text-text-muted relative z-10 font-medium">
                That's a real AI recommendation, not just a price number.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/auth/signup" className="bg-green hover:bg-green-dark text-white no-underline px-8 py-4 rounded-xl text-[16px] font-bold cursor-pointer transition-all shadow-lg shadow-green/20 flex items-center gap-2 transform hover:-translate-y-1">
                Get My Recommendation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link to="/features" className="bg-white text-navy no-underline border-2 border-border px-8 py-4 rounded-xl text-[16px] font-bold cursor-pointer hover:border-navy transition-all shadow-sm">
                See How It Works
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-[24px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(20,83,45,0.35)] bg-white border border-border">
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
            <div className="absolute -left-6 -bottom-[30px] md:left-auto md:right-[-24px] bg-white rounded-2xl p-5 flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.2)] border border-border">
              <div className="w-12 h-12 bg-green-bg rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M3 17L9 11L13 15L21 6" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 6H21V12" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-[22px] font-black text-navy leading-none mb-1">₹1,450</div>
                <div className="text-sm font-semibold text-text-muted">Avg. Extra Profit / Sale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h3 className="text-green font-bold tracking-widest text-sm uppercase mb-3">The Process</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">How AgroPrice AI Works</h2>
            <p className="text-text-muted mt-4 text-lg">We simplify complex market data into one actionable sentence for farmers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-[120px] font-black text-gray-100 group-hover:text-green-bg transition-colors select-none">1</div>
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-border flex items-center justify-center mb-6 relative z-10">
                <span className="text-2xl">🌾</span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-3 relative z-10">Enter Harvest Details</h4>
              <p className="text-text-muted leading-relaxed relative z-10">Tell the app what crop you have, the quantity, and your location. You can also enter what your local village trader is offering.</p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-[120px] font-black text-gray-100 group-hover:text-green-bg transition-colors select-none">2</div>
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-border flex items-center justify-center mb-6 relative z-10">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-3 relative z-10">AI Crunching Data</h4>
              <p className="text-text-muted leading-relaxed relative z-10">Our engine instantly fetches live mandi prices, predicts tomorrow's trend, and calculates exact transport costs to nearby mandis.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-green-dark text-white rounded-2xl p-8 shadow-xl relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute -right-6 -top-6 text-[120px] font-black text-white/5 select-none">3</div>
              <div className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center mb-6 relative z-10">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 relative z-10">Get Recommendation</h4>
              <p className="text-green-light leading-relaxed relative z-10">You get a clear answer: "Sell today to the local trader" or "Wait until tomorrow and sell at Ramganj Mandi for ₹1,200 more profit."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Image Section */}
      <section className="py-24 px-6 md:px-12 bg-navy text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c32?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent"></div>
        
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-[13px] font-semibold py-2 px-[18px] rounded-full mb-6 border border-white/20 backdrop-blur-sm">
              Made for Bharat
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Empowering Indian Farmers with Data.</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              We are moving away from gut-feeling sales. By using artificial intelligence to analyze thousands of data points across transport, weather, and market fluctuations, we put the power of negotiation back into the hands of the farmer.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-lg font-medium">Vernacular language support</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-lg font-medium">Works on slow internet</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-lg font-medium">Free for individual farmers</span>
              </li>
            </ul>
          </div>
          <div className="relative hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c32?q=80&w=800&auto=format&fit=crop" 
              alt="Indian Farmer" 
              className="rounded-2xl shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-green text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-black mb-1">50k+</div>
              <div className="font-semibold text-green-bg">Farmers Trust Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-green-bg text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">Stop Guessing. Start Profiting.</h2>
          <p className="text-xl text-text-muted mb-10">Join thousands of smart farmers who are using AgroPrice AI to maximize their harvest returns.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup" className="bg-green hover:bg-green-dark text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-colors">
              Create Free Account
            </Link>
            <Link to="/auth/login" className="bg-white text-navy border-2 border-border px-8 py-4 rounded-xl text-lg font-bold hover:border-navy transition-colors">
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
