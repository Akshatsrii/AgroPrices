import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPrices,
  selectAllPrices,
  selectTopMovers,
  fetchTopMovers,
} from "../store/slices/priceSlice";
import { DASHBOARD_STATS } from "../data/dummyData";
import PriceCard from "../components/dashboard/PriceCard";
import AlertBox from "../components/ai/AlertBox";

/* ─────────────────────────── STATIC DATA ─────────────────────────── */

const HERO_STATS = [
  { label: "Crops Tracked", value: DASHBOARD_STATS.totalCropsTracked, suffix: "+" },
  { label: "Live Mandis", value: DASHBOARD_STATS.marketsConnected, suffix: "+" },
  { label: "AI Predictions", value: DASHBOARD_STATS.aiPredictions, suffix: "" },
  { label: "Prediction Accuracy", value: DASHBOARD_STATS.avgAccuracy, suffix: "" },
];

const FEATURES = [
  { icon: "📊", title: "Live Price Dashboard", desc: "Real-time crop prices from 500+ mandis across India, updated every 15 minutes." },
  { icon: "🤖", title: "AI Price Prediction", desc: "ML-powered 7-day forecasts with confidence scores to help you time your sale." },
  { icon: "🌦️", title: "Weather Integration", desc: "Hyperlocal weather alerts linked directly to expected price movements." },
  { icon: "📉", title: "MSP Comparison", desc: "Instantly compare current mandi rates against government MSP benchmarks." },
  { icon: "🔔", title: "Smart Alerts", desc: "Personalised push notifications for price spikes, dips and breaking news." },
  { icon: "🧮", title: "Profit Calculator", desc: "Estimate net profit after transport & commission before you decide to sell." },
  { icon: "🗺️", title: "Market Heatmap", desc: "Visual district-wise price map to find the best-paying mandis nearby." },
  { icon: "📰", title: "Agri News Feed", desc: "Curated agriculture news with AI summaries and price-impact ratings." },
  { icon: "🌱", title: "Crop Calendar", desc: "Season-wise sowing & harvesting calendar with price trend overlays." },
];

const MARQUEE_ITEMS = [
  { name: "Wheat", price: "₹2,340", change: "+1.2%", up: true },
  { name: "Rice", price: "₹3,100", change: "+0.8%", up: true },
  { name: "Maize", price: "₹1,890", change: "-0.5%", up: false },
  { name: "Soybean", price: "₹4,520", change: "+2.1%", up: true },
  { name: "Cotton", price: "₹6,240", change: "-1.4%", up: false },
  { name: "Sugarcane", price: "₹315", change: "+0.3%", up: true },
  { name: "Turmeric", price: "₹12,400", change: "+3.8%", up: true },
  { name: "Onion", price: "₹1,750", change: "-2.2%", up: false },
  { name: "Tomato", price: "₹2,080", change: "+5.1%", up: true },
  { name: "Potato", price: "₹1,240", change: "-0.9%", up: false },
  { name: "Garlic", price: "₹8,900", change: "+1.7%", up: true },
  { name: "Mustard", price: "₹5,110", change: "+0.6%", up: true },
];

const MARKET_REGIONS = [
  { name: "Azadpur, Delhi", crops: 128, status: "Active", sentiment: 72 },
  { name: "Vashi, Mumbai", crops: 94, status: "Active", sentiment: 65 },
  { name: "Koyambedu, Chennai", crops: 87, status: "Active", sentiment: 58 },
  { name: "Yeshwanthpur, Bengaluru", crops: 110, status: "Active", sentiment: 81 },
  { name: "Gultekdi, Pune", crops: 76, status: "Moderate", sentiment: 49 },
  { name: "Bowenpally, Hyderabad", crops: 103, status: "Active", sentiment: 67 },
];

const MSP_COMPARE = [
  { crop: "Wheat", msp: 2275, current: 2340, unit: "quintal" },
  { crop: "Rice (Common)", msp: 2183, current: 2100, unit: "quintal" },
  { crop: "Maize", msp: 1962, current: 1890, unit: "quintal" },
  { crop: "Soybean", msp: 4600, current: 4520, unit: "quintal" },
  { crop: "Cotton (Long)", msp: 7020, current: 6240, unit: "quintal" },
];

const TESTIMONIALS = [
  { name: "Ramesh Patil", location: "Pune, Maharashtra", crop: "Onion farmer", quote: "KisanMandi AI helped me time my sale perfectly. I got ₹400 more per quintal just by waiting 3 days as suggested.", avatar: "RP", rating: 5 },
  { name: "Gurpreet Singh", location: "Ludhiana, Punjab", crop: "Wheat farmer", quote: "The MSP comparison feature is a game changer. I always know if I'm getting a fair price at the mandi.", avatar: "GS", rating: 5 },
  { name: "Savitri Devi", location: "Muzaffarpur, Bihar", crop: "Litchi farmer", quote: "Weather-linked price alerts are brilliant. I sold before the rain hit and saved my entire season's profit.", avatar: "SD", rating: 4 },
];

const WEATHER_IMPACT = [
  { region: "Punjab", condition: "🌤️ Partly Cloudy", temp: "32°C", priceImpact: "Neutral", impactColor: "text-yellow-600" },
  { region: "Maharashtra", condition: "🌧️ Heavy Rain", temp: "26°C", priceImpact: "Prices Rising", impactColor: "text-green-600" },
  { region: "Rajasthan", condition: "☀️ Hot & Dry", temp: "41°C", priceImpact: "Supply Drop", impactColor: "text-red-600" },
  { region: "West Bengal", condition: "⛅ Overcast", temp: "29°C", priceImpact: "Stable", impactColor: "text-blue-600" },
];

const SEASONAL_CROPS = [
  { season: "Kharif", months: "Jun – Oct", crops: ["Rice", "Maize", "Soybean", "Cotton", "Groundnut"], color: "bg-green-100 text-green-800" },
  { season: "Rabi", months: "Nov – Apr", crops: ["Wheat", "Mustard", "Chickpea", "Barley", "Pea"], color: "bg-yellow-100 text-yellow-800" },
  { season: "Zaid", months: "Mar – Jun", crops: ["Watermelon", "Cucumber", "Muskmelon", "Bitter Gourd"], color: "bg-orange-100 text-orange-800" },
];

const NEWS_ITEMS = [
  { tag: "Policy", title: "Govt raises MSP for Kharif crops by 5–8% for 2024-25 season", time: "2h ago", impact: "Positive", impactBg: "bg-green-100 text-green-700" },
  { tag: "Market", title: "Onion prices fall 12% in Nashik mandi on bumper arrivals", time: "4h ago", impact: "Watch", impactBg: "bg-yellow-100 text-yellow-700" },
  { tag: "Weather", title: "IMD predicts above-normal monsoon for central India in July", time: "6h ago", impact: "Positive", impactBg: "bg-green-100 text-green-700" },
  { tag: "Export", title: "India lifts wheat export ban — global prices react sharply", time: "1d ago", impact: "Rising", impactBg: "bg-blue-100 text-blue-700" },
];

/* ─────────────────────────── HOOKS ─────────────────────────── */

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const isNum = typeof target === "number";
    if (!isNum) { setCount(target); return; }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */

function AnimatedStat({ label, value, suffix, start }) {
  const isStr = typeof value === "string";
  const numVal = isStr ? parseFloat(value) : value;
  const suffix2 = isStr && isNaN(numVal) ? "" : suffix;
  const count = useCountUp(isStr && isNaN(numVal) ? 0 : numVal, 1800, start);
  return (
    <div className="bg-green-800 bg-opacity-70 backdrop-blur p-4 rounded-xl border border-green-700">
      <p className="text-2xl font-bold text-yellow-400">
        {isStr && isNaN(numVal) ? value : count}{suffix2}
      </p>
      <p className="text-sm text-green-200 mt-1">{label}</p>
    </div>
  );
}

function SentimentBar({ value }) {
  const color = value >= 70 ? "bg-green-400" : value >= 50 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
      <div className={`${color} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}

function StarRating({ n }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "text-yellow-400" : "text-gray-300"} style={{ fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
    </span>
  );
}

function SearchBar() {
  const [q, setQ] = useState("");
  const suggestions = ["Wheat", "Rice", "Maize", "Soybean", "Cotton", "Turmeric", "Onion", "Tomato", "Potato", "Garlic"];
  const filtered = q.length > 0 ? suggestions.filter(s => s.toLowerCase().startsWith(q.toLowerCase())) : [];
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 gap-3">
        <span className="text-gray-400 text-lg">🔍</span>
        <input
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm"
          placeholder="Search crops, mandis, states…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        {q && <button onClick={() => setQ("")} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>}
        {/* ✅ Fixed: was "/pages/dashboard" */}
        <Link to="/dashboard" className="bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap hover:bg-green-600 transition">
          Search
        </Link>
      </div>
      {filtered.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-10">
          {filtered.map(s => (
            <button key={s} onClick={() => setQ(s)} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 first:rounded-t-xl last:rounded-b-xl transition">
              🌾 {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MarqueeTicker() {
  return (
    <div className="bg-green-950 text-white py-2 overflow-hidden relative">
      <div className="flex gap-0 animate-marquee whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 border-r border-green-800">
            <span className="text-green-300 font-medium text-sm">{item.name}</span>
            <span className="text-white text-sm font-bold">{item.price}</span>
            <span className={`text-xs font-semibold ${item.up ? "text-green-400" : "text-red-400"}`}>
              {item.up ? "▲" : "▼"} {item.change}
            </span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function MSPTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-green-800 text-white">
            <th className="px-4 py-3 text-left font-semibold">Crop</th>
            <th className="px-4 py-3 text-right font-semibold">MSP (₹/q)</th>
            <th className="px-4 py-3 text-right font-semibold">Market (₹/q)</th>
            <th className="px-4 py-3 text-right font-semibold">Diff</th>
            <th className="px-4 py-3 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {MSP_COMPARE.map((row, i) => {
            const diff = row.current - row.msp;
            const pct = ((diff / row.msp) * 100).toFixed(1);
            const above = diff >= 0;
            return (
              <tr key={row.crop} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 font-medium text-gray-800">{row.crop}</td>
                <td className="px-4 py-3 text-right text-gray-600">₹{row.msp.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-800">₹{row.current.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right font-semibold ${above ? "text-green-600" : "text-red-600"}`}>
                  {above ? "+" : ""}{diff} ({above ? "+" : ""}{pct}%)
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${above ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {above ? "Above MSP" : "Below MSP"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ProfitCalculator() {
  const [qty, setQty] = useState(10);
  const [price, setPrice] = useState(2340);
  const [transport, setTransport] = useState(500);
  const [commission, setCommission] = useState(2);
  const gross = qty * price;
  const comm = (gross * commission) / 100;
  const net = gross - comm - transport;
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🧮 Quick Profit Estimator</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { label: "Quantity (quintals)", val: qty, set: setQty, min: 1, max: 500 },
          { label: "Price per quintal (₹)", val: price, set: setPrice, min: 500, max: 20000 },
          { label: "Transport cost (₹)", val: transport, set: setTransport, min: 0, max: 5000 },
          { label: "Commission (%)", val: commission, set: setCommission, min: 0, max: 10 },
        ].map(({ label, val, set, min, max }) => (
          <div key={label}>
            <label className="text-xs text-gray-500 mb-1 block">{label}</label>
            <input
              type="number" min={min} max={max} value={val}
              onChange={e => set(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}
      </div>
      <div className="bg-green-50 rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-gray-500">Gross Revenue</p>
          <p className="text-lg font-bold text-gray-800">₹{gross.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Deductions</p>
          <p className="text-lg font-bold text-red-500">-₹{(comm + transport).toFixed(0)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Net Profit</p>
          <p className="text-xl font-extrabold text-green-700">₹{net.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function Home() {
  const dispatch = useDispatch();
  const prices = useSelector(selectAllPrices);
  const movers = useSelector(selectTopMovers);
  const [heroRef, heroInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSeason, setActiveSeason] = useState(0);
  const [marketSearch, setMarketSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchTopMovers(4));
  }, [dispatch]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const filteredMarkets = MARKET_REGIONS.filter(m =>
    m.name.toLowerCase().includes(marketSearch.toLowerCase())
  );

  return (
    <div className="bg-gray-50 font-sans">

      {/* ── LIVE TICKER ── */}
      <MarqueeTicker />

      {/* ── HERO ── */}
      <section ref={heroRef} className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20 text-center relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-700 opacity-30 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400 opacity-10 rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-green-700 bg-opacity-60 border border-green-600 text-green-200 text-xs px-4 py-1.5 rounded-full mb-5">
            <LiveDot />
            Live market data from 500+ mandis
          </div>
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Smart Crop Price Intelligence <br className="hidden md:block" />
            <span className="text-yellow-400">for Every Farmer</span>
          </h1>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            Track live mandi prices, get AI-driven forecasts & sell at the right moment.
          </p>

          {/* Search */}
          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {/* ✅ Correct */}
            <Link to="/dashboard" className="bg-yellow-400 text-green-900 font-bold px-7 py-3 rounded-xl hover:bg-yellow-300 transition shadow-lg">
              📊 Open Dashboard
            </Link>
            {/* ✅ Fixed: was "/prices" (no such route) */}
            <Link to="/dashboard" className="bg-green-700 border border-green-500 text-white px-7 py-3 rounded-xl hover:bg-green-600 transition">
              🌾 Browse Crops
            </Link>
            {/* ✅ Fixed: was "/alerts" (no such route) */}
            <Link to="/insights" className="bg-transparent border border-green-400 text-green-200 px-7 py-3 rounded-xl hover:bg-green-800 transition">
              🔔 Set Alerts
            </Link>
          </div>

          {/* Animated Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_STATS.map(({ label, value, suffix }) => (
              <AnimatedStat key={label} label={label} value={value} suffix={suffix} start={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP MOVERS ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🔥 Top Movers
            <span className="text-xs font-normal bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-1">Live</span>
          </h2>
          {/* ✅ Correct */}
          <Link to="/dashboard" className="text-green-700 text-sm font-semibold hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {movers.length > 0
            ? movers.map(crop => <PriceCard key={crop.id} crop={crop} />)
            : Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse space-y-3">
                  <div className="h-10 bg-gray-200 rounded w-3/4" />
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              ))
          }
        </div>
      </section>

      {/* ── MSP COMPARISON ── */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-800">📉 MSP vs Market Prices</h2>
          {/* ✅ Fixed: was "/msp" (no such route) */}
          <Link to="/insights" className="text-green-700 text-sm font-semibold hover:underline">Full Report →</Link>
        </div>
        <MSPTable />
      </section>

      {/* ── PROFIT CALCULATOR + WEATHER ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid md:grid-cols-2 gap-6">
        <ProfitCalculator />

        {/* Weather Impact */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🌦️ Weather & Price Impact</h3>
          <div className="space-y-3">
            {WEATHER_IMPACT.map(w => (
              <div key={w.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-sm text-gray-800">{w.region}</p>
                  <p className="text-xs text-gray-500">{w.condition} · {w.temp}</p>
                </div>
                <span className={`text-sm font-bold ${w.impactColor}`}>{w.priceImpact}</span>
              </div>
            ))}
          </div>
          {/* ✅ Fixed: was "/weather" (no such route) */}
          <Link to="/insights" className="mt-4 block text-center text-sm text-green-700 font-semibold hover:underline">
            View detailed weather-price map →
          </Link>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-green-900 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Everything You Need to Sell Smart</h2>
          <p className="text-green-300 text-center mb-10 text-sm">One platform. All the intelligence. Zero guesswork.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-green-800 bg-opacity-60 border border-green-700 hover:border-yellow-400 hover:bg-green-700 transition-all duration-300 p-5 rounded-2xl group cursor-pointer"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">{f.icon}</div>
                <h3 className="font-bold text-white mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-green-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET REGIONS ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-bold text-gray-800">🗺️ Major Market Hubs</h2>
          <input
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-64"
            placeholder="Search markets…"
            value={marketSearch}
            onChange={e => setMarketSearch(e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMarkets.map(m => (
            <div key={m.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.crops} crops listed</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${m.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {m.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-1">Market Sentiment</p>
              <SentimentBar value={m.sentiment} />
              <p className="text-xs text-gray-400 mt-1">{m.sentiment}% bullish</p>
            </div>
          ))}
          {filteredMarkets.length === 0 && (
            <p className="col-span-3 text-center text-gray-400 py-8">No markets found for "{marketSearch}"</p>
          )}
        </div>
      </section>

      {/* ── SEASONAL CROP CALENDAR ── */}
      <section className="bg-gradient-to-r from-yellow-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🌱 Seasonal Crop Calendar</h2>
          <p className="text-gray-500 text-sm mb-6">Plan your selling window around season patterns.</p>
          <div className="flex gap-3 mb-6">
            {SEASONAL_CROPS.map((s, i) => (
              <button
                key={s.season}
                onClick={() => setActiveSeason(i)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${activeSeason === i ? "bg-green-800 text-white border-green-800" : "bg-white text-gray-600 border-gray-200 hover:border-green-400"}`}
              >
                {s.season} <span className="text-xs opacity-70 ml-1">{s.months}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {SEASONAL_CROPS[activeSeason].crops.map(crop => (
              // ✅ Fixed: was "/crop/${crop.toLowerCase()}" (dynamic routes don't exist)
              <Link
                key={crop}
                to="/prediction"
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${SEASONAL_CROPS[activeSeason].color} hover:opacity-80 transition`}
              >
                🌾 {crop}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS FEED ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📰 Agri News & Market Updates</h2>
          {/* ✅ Fixed: was "/news" (no such route) */}
          <Link to="/insights" className="text-green-700 text-sm font-semibold hover:underline">All News →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {NEWS_ITEMS.map(n => (
            <div key={n.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex gap-4">
              <span className={`text-xs font-bold px-2 py-1 rounded-lg h-fit whitespace-nowrap ${
                n.tag === "Policy" ? "bg-blue-100 text-blue-700" :
                n.tag === "Market" ? "bg-purple-100 text-purple-700" :
                n.tag === "Weather" ? "bg-sky-100 text-sky-700" :
                "bg-orange-100 text-orange-700"
              }`}>
                {n.tag}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 leading-snug mb-2">{n.title}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{n.time}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.impactBg}`}>{n.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-green-900 py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Trusted by Farmers Across India</h2>
          <p className="text-green-300 text-sm mb-10">Real results. Real farmers.</p>
          <div className="bg-green-800 border border-green-700 rounded-2xl p-8 relative">
            <p className="text-green-100 text-lg italic leading-relaxed mb-6">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-green-900 text-sm">
                {TESTIMONIALS[activeTestimonial].avatar}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-green-300 text-xs">{TESTIMONIALS[activeTestimonial].location} · {TESTIMONIALS[activeTestimonial].crop}</p>
                <StarRating n={TESTIMONIALS[activeTestimonial].rating} />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? "bg-yellow-400 w-6" : "bg-green-600 hover:bg-green-400"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ALERTS ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">🤖 AI Alerts & Insights</h2>
        <AlertBox />
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-yellow-400 py-12 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-green-900 mb-3">Ready to Sell Smarter?</h2>
          <p className="text-green-800 mb-7 text-sm">Join 2 lakh+ farmers already using KisanMandi AI to maximise their crop income.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* ✅ Fixed: was "/register" (no such route) */}
            <Link to="/dashboard" className="bg-green-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition shadow-lg">
              Get Started Free
            </Link>
            {/* ✅ Fixed: was "/demo" (no such route) */}
            <Link to="/prediction" className="bg-white text-green-900 font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition border border-green-200">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="bg-green-900 text-green-400 text-xs text-center py-4">
        © {new Date().getFullYear()} KisanMandi AI · Data sourced from Agmarknet & eNAM · Updated every 15 min
      </div>

    </div>
  );
}