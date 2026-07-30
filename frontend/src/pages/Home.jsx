import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

export function Home() {
  const { user: storeUser } = useAuthStore();

  const displayName = storeUser?.name || 'Farmer';
  const displayLocation = (storeUser?.district && storeUser?.state)
    ? `${storeUser.district}, ${storeUser.state}`
    : (storeUser?.village || storeUser?.state || storeUser?.district || 'India');

  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const mandiRates = [
    { mandi: 'Khanna APMC', crop: 'Wheat', price: '2,380', change: '+50' },
    { mandi: 'Ludhiana APMC', crop: 'Paddy', price: '2,210', change: '+15' },
    { mandi: 'Samrala Mandi', crop: 'Potato', price: '1,510', change: '+80' },
    { mandi: 'Jalandhar Mandi', crop: 'Mustard', price: '5,450', change: '+120' },
  ];
  const tickerRates = [...mandiRates, ...mandiRates]; // duplicated for seamless loop

  return (
    <div className="flex flex-col w-full bg-white font-sans text-navy overflow-x-hidden">

      {/* Signature: ticker animation + subtle grain (kept local, no tailwind config changes needed) */}
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker-scroll 32s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
        .grain::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* 🌟 Welcome Profile Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white px-6 lg:px-12 py-3 border-b border-emerald-800/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wide">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-slate-200">Welcome, <span className="text-white">{displayName}</span> <span className="text-emerald-600 mx-1">•</span> {displayLocation}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-amber-300 font-bold tracking-tight">
            Sell Wheat at Khanna Mandi <span className="text-amber-400">+₹4,000 extra net</span>
          </span>
          <Link
            to="/sell/crop"
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold px-3.5 py-1.5 rounded-lg no-underline transition-all duration-200 shadow-[0_0_18px_-2px_rgba(16,185,129,0.5)]"
          >
            Launch AI Wizard →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 overflow-hidden py-12 md:py-0">
        <div className="absolute top-16 right-0 w-[28rem] h-[28rem] bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.06)_1px,transparent_0)] [background-size:28px_28px] opacity-40" />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12 pt-12 md:pt-16 pb-12 md:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur rounded-full mb-6 border border-emerald-200 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-800 tracking-widest uppercase">AI Decision Engine · Live Mandi Intelligence</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-[3.4rem] font-extrabold text-navy leading-[1.05] tracking-tight">
                Don't just sell.<br />
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">Sell smart with AI.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="mt-5 md:mt-6 text-base md:text-lg text-slate-500 leading-relaxed max-w-[520px]">
                Most farmers sell without knowing the true Mandi rate or tomorrow's trend. AgroPrice AI compares local traders vs APMC Mandis and calculates net profit in seconds.
              </motion.p>

              {/* Live Recommendation Badge */}
              <motion.div variants={fadeInUp} className="mt-6 p-5 bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(15,23,42,0.15)] border border-gray-100 border-l-4 border-l-emerald-600 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-emerald-700 tracking-[0.15em]">Live AI Recommendation</span>
                <p className="text-base font-extrabold text-slate-900 m-0 leading-snug">
                  Sell Grade A Wheat tomorrow in Khanna APMC —
                  <span className="text-amber-600"> ₹1,350 higher profit</span> than local trader.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <Link
                  to="/sell/crop"
                  className="group inline-flex items-center justify-center font-extrabold rounded-2xl transition-all duration-200 bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-base shadow-[0_10px_30px_-8px_rgba(5,150,105,0.5)] hover:shadow-[0_14px_36px_-6px_rgba(5,150,105,0.55)] active:scale-[0.97] no-underline"
                >
                  🌾 Start Sell Crop Wizard
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/dashboard/market"
                  className="inline-flex items-center justify-center font-extrabold rounded-2xl transition-all duration-200 border-2 border-navy text-navy hover:bg-navy hover:text-white px-8 py-4 text-base no-underline"
                >
                  📈 Check Live Mandi Rates
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-10 lg:mt-0"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)] border-4 border-white">
                <img
                  src="/hero-farmer-premium.jpg"
                  alt="Indian farmer using smartphone"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur rounded-2xl shadow-[0_16px_40px_-12px_rgba(15,23,42,0.35)] p-5 border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">🚜</div>
                <div>
                  <p className="text-2xl font-black text-navy leading-none mb-1">50,000+</p>
                  <p className="text-xs font-bold text-slate-500">Farmers maximize profit daily</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🔴 Live Mandi Rates — scrolling ticker tape (signature element) */}
      <section className="relative py-12 bg-slate-950 text-white overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-7">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Real-time APMC rates
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2.5 m-0 tracking-tight">Live regional rates today</h2>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/market/nearby" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 no-underline">
                📍 Nearby Mandis →
              </Link>
              <Link to="/dashboard/market" className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl no-underline transition-colors">
                Full rate table →
              </Link>
            </div>
          </div>
        </div>

        {/* fade edges */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          <div className="flex ticker-track w-max">
            {tickerRates.map((r, i) => (
              <div
                key={i}
                className="shrink-0 w-64 mx-3 bg-slate-800/70 p-5 rounded-2xl border border-slate-700/70 space-y-1.5"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{r.mandi} • {r.crop}</span>
                <p className="text-2xl font-black text-white m-0">₹{r.price} <span className="text-xs text-slate-400 font-semibold">/quintal</span></p>
                <span className="text-[11px] font-bold text-emerald-400 block">↑ {r.change} vs yesterday</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 Quick AI Decision Tools Hub */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 space-y-10">

          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
              Interactive AI tools
            </span>
            <h2 className="text-3xl font-black text-slate-900 m-0 tracking-tight">AI agricultural decision hub</h2>
            <p className="text-sm text-slate-500 m-0">Compare rates, calculate transport, and negotiate higher prices — all in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌾', title: 'Sell Crop 8-Step Wizard', desc: 'Enter crop type, quantity, expected price, and trader offer to get immediate net profit AI advice.', link: '/sell/crop', cta: 'Launch Sell Wizard →', accent: true },
              { icon: '🧮', title: 'Net Profit Calculator', desc: 'Calculate gross sale revenue minus transport fuel charges and 1% APMC Mandi tax deductions.', link: '/ai/profit-calculator', cta: 'Open Profit Calculator →' },
              { icon: '🗣️', title: 'Negotiation Assistant', desc: 'Data-backed counter scripts in Hindi & Hinglish to counter low village trader (vyapari) offers.', link: '/ai/negotiation-assistant', cta: 'Get Negotiation Scripts →' },
            ].map((tool, i) => (
              <div
                key={i}
                className="group bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-[0_20px_45px_-15px_rgba(15,23,42,0.18)] hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl font-black mb-3 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 m-0 tracking-tight">{tool.title}</h3>
                  <p className="text-xs text-slate-500 m-0 mt-2 leading-relaxed">{tool.desc}</p>
                </div>
                <Link
                  to={tool.link}
                  className={`font-extrabold text-xs px-4 py-3 rounded-2xl text-center no-underline transition-all ${
                    tool.accent ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {tool.cta}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">Why smart farmers choose AgroPrice AI</h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                By combining machine learning price forecasting with verified APMC Mandi directories, we eliminate guesswork and ensure you never sell below market value.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl shrink-0">🇮🇳</div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 m-0">Built for Indian farmers</h3>
                    <p className="text-xs text-slate-500 m-0 mt-1">Multi-language support (Hindi, Punjabi, English) and works on mobile devices.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">🎯</div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 m-0">Zero guesswork</h3>
                    <p className="text-xs text-slate-500 m-0 mt-1">Real net payout figures after deducting freight costs — before you load your trolley.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_24px_50px_-16px_rgba(15,23,42,0.25)] border-4 border-gray-100">
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
      <section className="relative py-16 bg-gradient-to-b from-emerald-950 to-slate-950 text-white text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-[900px] px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white m-0 tracking-tight">Ready for your first AI recommendation?</h2>
          <p className="text-sm text-emerald-200/80 leading-relaxed m-0">
            Join 50,000+ farmers across Punjab, Haryana, Rajasthan &amp; MP who sell crops smarter with AgroPrice AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              to="/sell/crop"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold px-8 py-3.5 rounded-2xl no-underline text-sm shadow-[0_10px_30px_-8px_rgba(16,185,129,0.5)] transition-all active:scale-[0.97]"
            >
              🌾 Sell Crop Wizard Now →
            </Link>
            <Link
              to="/assistant/chat"
              className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-6 py-3.5 rounded-2xl no-underline text-sm transition-all"
            >
              🤖 Talk to AI Assistant
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}