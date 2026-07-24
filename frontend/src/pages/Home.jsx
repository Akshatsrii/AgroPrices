import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useUser } from '@clerk/clerk-react';

export function Home() {
  const { user: storeUser } = useAuthStore();
  
  let clerkUser = null;
  try {
    const clerk = useUser();
    clerkUser = clerk?.user;
  } catch (e) {}

  const displayName = clerkUser?.fullName || clerkUser?.firstName || storeUser?.name || 'Farmer';
  const displayLocation = (storeUser?.district && storeUser?.state)
    ? `${storeUser.district}, ${storeUser.state}`
    : (storeUser?.village || storeUser?.state || storeUser?.district || 'India');

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="flex flex-col w-full bg-white font-sans text-navy overflow-x-hidden">
      
      {/* 🌟 Welcome Profile Bar (Home Dashboard Hub) */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-950 to-slate-900 text-white px-6 lg:px-12 py-3.5 border-b border-emerald-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>👨‍🌾 Welcome, {displayName} • {displayLocation}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-emerald-300 font-bold">Recommended Action: Sell Wheat at Khanna Mandi (+₹4,000 Extra Net)</span>
          <Link to="/sell/crop" className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-lg no-underline transition-all">
            Launch AI Wizard &rarr;
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 overflow-hidden py-12 md:py-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy/5 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 pt-12 md:pt-16 pb-12 md:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6 border border-emerald-200 shadow-sm">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-800">AI-Powered Decision Engine • Live Mandi Intelligence</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-navy leading-tight tracking-tight">
                Don't Just Sell.<br />
                <span className="text-emerald-600">Sell Smart with AI.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="mt-4 md:mt-6 text-base md:text-lg text-text-muted leading-relaxed max-w-[520px]">
                Most farmers sell their crop without knowing the true Mandi rate or tomorrow's trend. AgroPrice AI compares local traders vs APMC Mandis and calculates net profit in seconds.
              </motion.p>
              
              {/* Live Recommendation Badge */}
              <motion.div variants={fadeInUp} className="mt-6 p-5 bg-white border-l-4 border-emerald-600 rounded-r-2xl shadow-md border border-gray-100 space-y-1">
                <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Live AI Recommendation</span>
                <p className="text-base font-extrabold text-slate-900 m-0">
                  "Sell Grade A Wheat tomorrow in Khanna APMC — ₹1,350 higher profit than local trader."
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <Link to="/sell/crop" className="inline-flex items-center justify-center font-extrabold rounded-2xl transition-all duration-200 bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-base shadow-xl shadow-emerald-600/25 active:scale-95 no-underline">
                  🌾 Start Sell Crop Wizard (8 Steps) &rarr;
                </Link>
                <Link to="/dashboard/market" className="inline-flex items-center justify-center font-extrabold rounded-2xl transition-all duration-200 border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-base no-underline">
                  📈 Check Live Mandi Rates
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right Image Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mt-10 lg:mt-0"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/hero-farmer-premium.jpg" 
                  alt="Indian farmer using smartphone" 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-navy/10" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">
                  🚜
                </div>
                <div>
                  <p className="text-2xl font-black text-navy leading-none mb-1">50,000+</p>
                  <p className="text-xs font-bold text-text-muted">Farmers Maximize Profit Daily</p>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 🔴 Live Mandi Rates Ticker (Home Dashboard Widget) */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                🔴 Real-time APMC Mandi Rates
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 m-0">Live Regional Rates Today</h2>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/market/nearby" className="text-xs font-bold text-emerald-400 hover:underline no-underline">
                📍 Nearby Mandis &rarr;
              </Link>
              <Link to="/dashboard/market" className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl no-underline">
                Full Rate Table &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Khanna APMC • Wheat</span>
              <p className="text-2xl font-black text-white m-0">₹2,380 <span className="text-xs text-emerald-400 font-bold">/q</span></p>
              <span className="text-[11px] font-bold text-emerald-400 block">↑ +₹50 vs Yesterday</span>
            </div>

            <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Ludhiana APMC • Paddy</span>
              <p className="text-2xl font-black text-white m-0">₹2,210 <span className="text-xs text-emerald-400 font-bold">/q</span></p>
              <span className="text-[11px] font-bold text-emerald-400 block">↑ +₹15 vs Yesterday</span>
            </div>

            <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Samrala Mandi • Potato</span>
              <p className="text-2xl font-black text-white m-0">₹1,510 <span className="text-xs text-emerald-400 font-bold">/q</span></p>
              <span className="text-[11px] font-bold text-emerald-400 block">↑ +₹80 vs Yesterday</span>
            </div>

            <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Jalandhar Mandi • Mustard</span>
              <p className="text-2xl font-black text-white m-0">₹5,450 <span className="text-xs text-emerald-400 font-bold">/q</span></p>
              <span className="text-[11px] font-bold text-emerald-400 block">↑ +₹120 vs Yesterday</span>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 Quick AI Decision Tools Hub (Home Dashboard Sections) */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
              🛠️ Interactive AI Tools
            </span>
            <h2 className="text-3xl font-black text-slate-900 m-0">AI Agricultural Decision Hub</h2>
            <p className="text-xs text-gray-500 m-0">Everything you need to compare rates, calculate transport, and negotiate higher prices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tool 1 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl font-black mb-3">
                  🌾
                </div>
                <h3 className="text-lg font-black text-slate-900 m-0">Sell Crop 8-Step Wizard</h3>
                <p className="text-xs text-gray-500 m-0 mt-2 leading-relaxed">
                  Enter crop type, quantity, expected price, and trader offer to get immediate net profit AI advice.
                </p>
              </div>
              <Link to="/sell/crop" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-3 rounded-2xl text-center no-underline transition-all">
                Launch Sell Wizard &rarr;
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl font-black mb-3">
                  🧮
                </div>
                <h3 className="text-lg font-black text-slate-900 m-0">Net Profit Calculator</h3>
                <p className="text-xs text-gray-500 m-0 mt-2 leading-relaxed">
                  Calculate gross sale revenue minus transport fuel charges and 1% APMC Mandi tax deductions.
                </p>
              </div>
              <Link to="/ai/profit-calculator" className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-3 rounded-2xl text-center no-underline transition-all">
                Open Profit Calculator &rarr;
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl font-black mb-3">
                  🗣️
                </div>
                <h3 className="text-lg font-black text-slate-900 m-0">Negotiation Assistant</h3>
                <p className="text-xs text-gray-500 m-0 mt-2 leading-relaxed">
                  Data-backed counter scripts in Hindi & Hinglish to counter low village trader (vyapari) offers.
                </p>
              </div>
              <Link to="/ai/negotiation-assistant" className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-3 rounded-2xl text-center no-underline transition-all">
                Get Negotiation Scripts &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy">Why Smart Farmers Choose AgroPrice AI</h2>
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                By combining machine learning price forecasting with verified APMC Mandi directories, we eliminate guesswork and ensure you never sell below market value.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl shrink-0">
                    🇮🇳
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 m-0">Built for Indian Farmers</h3>
                    <p className="text-xs text-gray-500 m-0 mt-1">Multi-language support (Hindi, Punjabi, English) and works on mobile devices.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl shrink-0">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 m-0">Zero Guesswork</h3>
                    <p className="text-xs text-gray-500 m-0 mt-1">Real net payout figures after deducting freight costs before you load your trolley.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1595841696677-6479c04fbc52?q=80&w=1000&auto=format&fit=crop" 
                alt="Agricultural field harvest" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-emerald-950 text-white text-center">
        <div className="mx-auto max-w-[900px] px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white m-0">Ready to Get Your First AI Recommendation?</h2>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed m-0">
            Join 50,000+ farmers across Punjab, Haryana, Rajasthan & MP who sell crops smarter with AgroPrice AI.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/sell/crop" className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-3.5 rounded-2xl no-underline text-sm shadow-xl transition-all">
              🌾 Sell Crop Wizard Now &rarr;
            </Link>
            <Link to="/assistant/chat" className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-2xl no-underline text-sm transition-all">
              🤖 Talk to AI Assistant
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
