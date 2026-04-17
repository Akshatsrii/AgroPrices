import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

/* ─── THEME ─────────────────────────────────────────────────── */
const T = {
  brand:      "#06d6a0",
  brandMid:   "#05b486",
  brandLight: "#34e8b9",
  brandPale:  "rgba(6, 214, 160, 0.15)",
  brandXPale: "rgba(6, 214, 160, 0.05)",
  amber:      "#ffd166",
  amberLight: "#ffdd8b",
  amberPale:  "rgba(255, 209, 102, 0.15)",
  red:        "#ef476f",
  redLight:   "#f26b8b",
  redPale:    "rgba(239, 71, 111, 0.15)",
  blue:       "#118ab2",
  bluePale:   "rgba(17, 138, 178, 0.15)",
  purple:     "#073b4c",
  purplePale: "rgba(7, 59, 76, 0.15)",
  gold:       "#ff9f1c",
  dark:       "#FFFFFF", // inverted to white for text highlights
  darkMid:    "#E2E8F0",
  text:       "#E2E8F0",
  textMid:    "#94a3b8",
  textLight:  "#64748b",
  border:     "rgba(255, 255, 255, 0.05)",
  bg:         "#0B0E14",
  white:      "rgba(15, 23, 42, 0.6)", // panel bg
};

/* ─── DUMMY DATA ─────────────────────────────────────────────── */
const CROPS_DATA = [
  { id: "wheat",     name: "Wheat",      emoji: "🌾", currentPrice: 2340, prevPrice: 2280, unit: "quintal", change: 2.63,  volume: 14200, high52: 2680, low52: 1890, category: "Cereals" },
  { id: "rice",      name: "Rice",       emoji: "🍚", currentPrice: 3120, prevPrice: 3190, unit: "quintal", change: -2.19, volume: 9800,  high52: 3450, low52: 2700, category: "Cereals" },
  { id: "cotton",    name: "Cotton",     emoji: "🌿", currentPrice: 6450, prevPrice: 6210, unit: "quintal", change: 3.86,  volume: 5600,  high52: 7100, low52: 5200, category: "Fibers" },
  { id: "soybean",   name: "Soybean",    emoji: "🫘", currentPrice: 4890, prevPrice: 4920, unit: "quintal", change: -0.61, volume: 7300,  high52: 5400, low52: 4100, category: "Oilseeds" },
  { id: "maize",     name: "Maize",      emoji: "🌽", currentPrice: 1890, prevPrice: 1840, unit: "quintal", change: 2.72,  volume: 11500, high52: 2100, low52: 1550, category: "Cereals" },
  { id: "tomato",    name: "Tomato",     emoji: "🍅", currentPrice:  680, prevPrice:  590, unit: "box",     change: 15.25, volume: 18200, high52:  980, low52:  320, category: "Vegetables" },
  { id: "onion",     name: "Onion",      emoji: "🧅", currentPrice:  420, prevPrice:  460, unit: "quintal", change: -8.70, volume: 22000, high52:  890, low52:  280, category: "Vegetables" },
  { id: "sugarcane", name: "Sugarcane",  emoji: "🎋", currentPrice:  385, prevPrice:  380, unit: "quintal", change: 1.32,  volume: 8900,  high52:  410, low52:  350, category: "Cash Crops" },
  { id: "potato",    name: "Potato",     emoji: "🥔", currentPrice:  245, prevPrice:  260, unit: "quintal", change: -5.77, volume: 25000, high52:  480, low52:  180, category: "Vegetables" },
  { id: "mustard",   name: "Mustard",    emoji: "🌻", currentPrice: 5420, prevPrice: 5310, unit: "quintal", change: 2.07,  volume: 6100,  high52: 5900, low52: 4700, category: "Oilseeds" },
];

const generateHistory = (base, days, vol = 0.04) => {
  const data = []; let price = base * 0.88;
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = days; i >= 0; i--) {
    price = price * (1 + (Math.random() - 0.47) * vol);
    const d = new Date(); d.setDate(d.getDate() - i);
    data.push({
      date: `${d.getDate()} ${labels[d.getMonth()]}`,
      price: Math.round(price),
      volume: Math.round(3000 + Math.random() * 5000),
    });
  }
  data[data.length - 1].price = base;
  return data;
};

const MARKET_OVERVIEW = [
  { label: "Active Crops",    value: "248",    icon: "🌱", change: "+12",  color: T.brand },
  { label: "Avg Market Price",value: "₹3,240", icon: "📊", change: "+2.1%",color: T.blue },
  { label: "Today's Volume",  value: "1.2L",   icon: "📦", change: "+8.4%",color: T.amber },
  { label: "Mandi Centers",   value: "892",    icon: "🏪", change: "Live", color: T.purple },
];

const ALERTS = [
  { type: "warn",    msg: "Tomato prices surged 15% — sell window open in Jaipur mandi",    time: "2m ago" },
  { type: "info",    msg: "Wheat MSP revised to ₹2,275/quintal by government notification",  time: "1h ago" },
  { type: "danger",  msg: "Onion glut warning: supply 40% above demand in UP & Bihar",      time: "3h ago" },
  { type: "success", msg: "Cotton export demand rising — prices expected to stay bullish",   time: "5h ago" },
];

const WEATHER = [
  { day: "Today", icon: "☀️", high: 36, low: 22, rain: "5%" },
  { day: "Fri",   icon: "⛅", high: 34, low: 21, rain: "20%" },
  { day: "Sat",   icon: "🌧️", high: 29, low: 19, rain: "80%" },
  { day: "Sun",   icon: "🌦️", high: 31, low: 20, rain: "45%" },
  { day: "Mon",   icon: "☀️", high: 35, low: 22, rain: "5%" },
];

const RADAR_DATA = [
  { subject: "Price",   A: 85, B: 70, fullMark: 100 },
  { subject: "Volume",  A: 70, B: 90, fullMark: 100 },
  { subject: "Quality", A: 90, B: 75, fullMark: 100 },
  { subject: "Demand",  A: 78, B: 82, fullMark: 100 },
  { subject: "Supply",  A: 55, B: 88, fullMark: 100 },
  { subject: "Trend",   A: 92, B: 60, fullMark: 100 },
];

const MANDI_RATES = [
  { mandi: "Azadpur, Delhi",  price: 2380, trend: "up" },
  { mandi: "Vashi, Mumbai",   price: 2410, trend: "up" },
  { mandi: "APMC, Ahmedabad", price: 2295, trend: "down" },
  { mandi: "Koyambedu, Chennai", price: 2320, trend: "stable" },
  { mandi: "Gultekdi, Pune",  price: 2350, trend: "up" },
];

/* ─── HELPERS ────────────────────────────────────────────────── */
const fmt = (n) => n?.toLocaleString("en-IN") ?? "0";
const pct = (n) => `${n > 0 ? "+" : ""}${n?.toFixed(2)}%`;

function useAnimatedNumber(target, duration = 800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null, from = val;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(from + (target - from) * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

/* ─── MINI COMPONENTS ────────────────────────────────────────── */
function Sparkline({ data, color, height = 40 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = height - ((v - min) / (max - min + 0.001)) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ children, color, bg }) {
  return (
    <span style={{
      background: bg, color, fontSize: 11, fontWeight: 700,
      padding: "2px 8px", borderRadius: 20, letterSpacing: 0.4,
    }}>{children}</span>
  );
}

function StatCard({ item, idx }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), idx * 80); }, [idx]);
  return (
    <div style={{
      background: T.white, borderRadius: 16, padding: "20px 24px",
      border: `1.5px solid ${T.border}`,
      boxShadow: "0 2px 12px rgba(45,106,79,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(16px)",
      cursor: "default",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,106,79,0.15)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(45,106,79,0.08)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: T.textLight, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase" }}>{item.label}</p>
          <p style={{ margin: "8px 0 4px", fontSize: 28, fontWeight: 800, color: T.dark, fontFamily: "'Space Grotesk', monospace" }}>{item.value}</p>
          <span style={{ fontSize: 12, color: item.change.includes("+") ? T.brand : T.amber, fontWeight: 700 }}>{item.change} this week</span>
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${item.color}18`, display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>{item.icon}</div>
      </div>
    </div>
  );
}

function AlertItem({ alert }) {
  const cfg = {
    warn:    { bg: T.amberPale,  border: T.amber,  icon: "⚠️",  label: "Alert" },
    info:    { bg: T.bluePale,   border: T.blue,   icon: "ℹ️",  label: "Info" },
    danger:  { bg: T.redPale,    border: T.red,    icon: "🚨",  label: "Warning" },
    success: { bg: T.brandXPale, border: T.brand,  icon: "✅",  label: "Good" },
  }[alert.type];
  return (
    <div style={{
      background: cfg.bg, borderLeft: `4px solid ${cfg.border}`,
      borderRadius: "0 10px 10px 0", padding: "12px 14px",
      display: "flex", alignItems: "flex-start", gap: 10,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{cfg.icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 13, color: T.text, lineHeight: 1.5 }}>{alert.msg}</p>
        <span style={{ fontSize: 11, color: T.textLight }}>{alert.time}</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.dark, borderRadius: 10, padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}>
      <p style={{ margin: "0 0 4px", color: T.brandLight, fontSize: 11, fontWeight: 600 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ margin: 0, color: p.color, fontSize: 13, fontWeight: 700 }}>
          {p.name}: ₹{fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

/* ─── MAIN DASHBOARD ─────────────────────────────────────────── */
export default function Dashboard() {
  const [selectedId, setSelectedId]     = useState("wheat");
  const [chartDays, setChartDays]       = useState(30);
  const [sellPrice, setSellPrice]       = useState(0);
  const [costPrice, setCostPrice]       = useState(0);
  const [quantity, setQuantity]         = useState(100);
  const [refreshing, setRefreshing]     = useState(false);
  const [activeTab, setActiveTab]       = useState("overview");
  const [compareIds, setCompareIds]     = useState(["wheat","rice"]);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [lastUpdate, setLastUpdate]     = useState(new Date());
  const tickerRef = useRef(null);

  const crop = CROPS_DATA.find(c => c.id === selectedId) || CROPS_DATA[0];
  const history = generateHistory(crop.currentPrice, chartDays, 0.035);
  const animPrice = useAnimatedNumber(crop.currentPrice);
  const profit = (sellPrice - costPrice) * quantity;

  useEffect(() => { setSellPrice(crop.currentPrice); }, [crop.currentPrice]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); setLastUpdate(new Date()); }, 900);
  }, []);

  const toggleCompare = (id) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev.slice(-2), id]
    );
  };

  const compareDatasets = compareIds.map((id, i) => {
    const c = CROPS_DATA.find(p => p.id === id);
    if (!c) return null;
    const h = generateHistory(c.currentPrice, chartDays, 0.035);
    return { ...c, history: h, color: [T.brand, T.amber, T.blue][i] };
  }).filter(Boolean);

  const topMovers = [...CROPS_DATA].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 6);
  const watchlist = CROPS_DATA.filter(c => ["wheat","cotton","tomato"].includes(c.id));

  /* ─── STYLES ──────────────────────────────────────────────── */
  const S = {
    root: {
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      background: T.bg, minHeight: "100vh", color: T.text,
      position: "relative",
    },
    header: {
      background: "rgba(11, 14, 20, 0.7)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${T.border}`,
      padding: "0 28px", position: "sticky", top: 0, zIndex: 100,
    },
    headerInner: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64, gap: 16,
    },
    logo: { display: "flex", alignItems: "center", gap: 10 },
    logoIcon: { fontSize: 26 },
    logoText: {
      fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: -0.5,
      fontFamily: "'Space Grotesk', sans-serif"
    },
    logoSub: { fontSize: 11, color: T.brand, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" },
    headerRight: { display: "flex", alignItems: "center", gap: 12 },
    ticker: {
      background: "rgba(255,255,255,0.03)", borderRadius: 30,
      border: `1px solid ${T.border}`,
      padding: "4px 16px", overflow: "hidden", maxWidth: 420,
      display: "flex", alignItems: "center", cursor: "pointer",
    },
    main: { padding: "24px 28px", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 1 },
    grid4: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 },
    grid3: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 },
    card: {
      background: "rgba(15, 23, 42, 0.6)", borderRadius: 18, border: `1px solid ${T.border}`,
      backdropFilter: "blur(12px)", overflow: "hidden",
    },
    cardHead: {
      padding: "18px 22px 14px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    cardTitle: { margin: 0, fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: -0.3 },
    cardBody: { padding: "18px 22px" },
    btn: (active, color = T.brand) => ({
      padding: "7px 16px", borderRadius: 10, border: "none", cursor: "pointer",
      fontWeight: 700, fontSize: 13,
      background: active ? color : `rgba(255,255,255,0.05)`,
      color: active ? "#0B0E14" : "#fff",
      transition: "all 0.15s",
    }),
    btnSm: {
      padding: "5px 11px", borderRadius: 8, border: "none", cursor: "pointer",
      fontWeight: 700, fontSize: 12, background: T.brandPale, color: T.brand,
    },
    input: {
      width: "100%", border: `1px solid ${T.border}`, borderRadius: 10,
      padding: "10px 14px", fontSize: 14, fontFamily: "inherit",
      color: "#fff", background: "rgba(0,0,0,0.2)", boxSizing: "border-box",
      outline: "none",
    },
    label: { fontSize: 12, fontWeight: 700, color: T.textLight, marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 0.5 },
    tab: (active) => ({
      padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer",
      fontWeight: 700, fontSize: 13, transition: "all 0.15s",
      background: active ? T.brand : "transparent",
      color: active ? "#0B0E14" : T.textMid,
    }),
  };

  /* ─── RENDER ──────────────────────────────────────────────── */
  return (
    <div style={S.root}>
      {/* ── Dynamic Ambient Backgrounds ── */}
      <div style={{
        position: "absolute", top: "-15%", left: "-5%", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(6,214,160,0.15) 0%, rgba(0,0,0,0) 70%)",
        zIndex: 0, filter: "blur(60px)", pointerEvents: "none"
      }}></div>
      
      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logo}>
            <span style={S.logoIcon}>🌾</span>
            <div>
              <div style={S.logoText}>KrishiMart</div>
              <div style={S.logoSub}>Agri Price Intelligence</div>
            </div>
          </div>

          {/* TICKER */}
          <div style={S.ticker} onClick={() => setTickerPaused(p => !p)}>
            <span style={{ fontSize: 10, color: T.brand, marginRight: 10, flexShrink: 0, letterSpacing: 0.8 }}>
              {tickerPaused ? "⏸ PAUSED" : "● LIVE"}
            </span>
            <div style={{ overflow: "hidden", flex: 1 }}>
              <div
                ref={tickerRef}
                style={{
                  display: "flex", gap: 28,
                  animation: tickerPaused ? "none" : "ticker 22s linear infinite",
                  whiteSpace: "nowrap",
                }}
              >
                {[...CROPS_DATA, ...CROPS_DATA].map((c, i) => (
                  <span key={i} style={{ fontSize: 12, color: "#fff" }}>
                    {c.emoji} <b>{c.name}</b>{" "}
                    <span style={{ color: c.change > 0 ? T.brand : T.red, fontWeight: 700 }}>
                      ₹{fmt(c.currentPrice)} {pct(c.change)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={S.headerRight}>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              style={{
                ...S.btn(true), opacity: refreshing ? 0.7 : 1,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <span style={{ display: "inline-block", animation: refreshing ? "spin 0.8s linear infinite" : "none" }}>⟳</span>
              {refreshing ? "Updating…" : "Refresh"}
            </button>
            <div style={{ textAlign: "right", marginLeft: 8 }}>
              <div style={{ fontSize: 11, color: T.textLight }}>Last updated</div>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>
                {lastUpdate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div style={{ background: "rgba(11, 14, 20, 0.4)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}`, padding: "0 28px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", gap: 4, paddingTop: 8 }}>
          {["overview","markets","analysis","calculator"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={S.tab(activeTab === t)}>
              {{"overview":"📊 Overview","markets":"🏪 Markets","analysis":"📈 Analysis","calculator":"🧮 Calculator"}[t]}
            </button>
          ))}
        </div>
      </div>

      <main style={S.main}>

        {/* ── STAT CARDS ── */}
        <div style={S.grid4}>
          {MARKET_OVERVIEW.map((item, idx) => <StatCard key={idx} item={item} idx={idx} />)}
        </div>

        {/* ── SELECTED CROP HERO ── */}
        <div style={{ ...S.card, marginBottom: 24, background: `linear-gradient(135deg, ${T.dark} 0%, ${T.darkMid} 50%, #1f4033 100%)` }}>
          <div style={{ padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 36 }}>{crop.emoji}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: T.white }}>{crop.name}</h2>
                  <span style={{ fontSize: 13, color: T.brandLight, fontWeight: 600 }}>{crop.category} · per {crop.unit}</span>
                </div>
                <Badge
                  color={crop.change >= 0 ? T.brand : T.red}
                  bg={crop.change >= 0 ? `${T.brand}22` : `${T.red}22`}
                >{pct(crop.change)}</Badge>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 12, color: T.brandLight, fontWeight: 600, marginBottom: 2 }}>CURRENT PRICE</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: T.white, fontFamily: "'Space Grotesk', monospace", lineHeight: 1 }}>
                    ₹{fmt(animPrice)}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, paddingBottom: 4 }}>
                  {[
                    { l: "Prev Close", v: `₹${fmt(crop.prevPrice)}`, c: T.brandLight },
                    { l: "52W High",   v: `₹${fmt(crop.high52)}`,    c: "#7ee8a2" },
                    { l: "52W Low",    v: `₹${fmt(crop.low52)}`,     c: T.redLight },
                  ].map(m => (
                    <div key={m.l}>
                      <div style={{ fontSize: 11, color: "#6b8f76", fontWeight: 600 }}>{m.l}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: m.c }}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {/* Crop selector */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 320, justifyContent: "flex-end" }}>
                {CROPS_DATA.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    style={{
                      padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                      fontWeight: 700, fontSize: 12, transition: "all 0.15s",
                      background: selectedId === c.id ? T.brandMid : "rgba(255,255,255,0.1)",
                      color: selectedId === c.id ? T.white : T.brandLight,
                    }}
                  >{c.emoji} {c.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CHART + SIDEBAR ── */}
        <div style={{ ...S.grid3, gridTemplateColumns: "2fr 1fr" }}>
          {/* Price Chart */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <h3 style={S.cardTitle}>📈 Price Trend — {crop.name}</h3>
              <div style={{ display: "flex", gap: 6 }}>
                {[7, 30, 90, 180].map(d => (
                  <button key={d} onClick={() => setChartDays(d)} style={S.btn(chartDays === d)}>
                    {d}D
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px 10px 10px" }}>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={history} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={T.brand} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={T.brand} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.textLight }} tickLine={false} interval={Math.floor(history.length / 6)} />
                  <YAxis tick={{ fontSize: 11, fill: T.textLight }} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={crop.prevPrice} stroke={T.amber} strokeDasharray="4 4" label={{ value: "Prev Close", fontSize: 10, fill: T.amber }} />
                  <Area type="monotone" dataKey="price" name={crop.name} stroke={T.brand} strokeWidth={2.5} fill="url(#priceGrad)" dot={false} activeDot={{ r: 5, fill: T.brand }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Volume bars */}
            <div style={{ padding: "0 10px 16px" }}>
              <p style={{ ...S.label, paddingLeft: 12 }}>Volume</p>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={history.slice(-20)} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                  <Bar dataKey="volume" fill={`${T.brand}55`} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weather + Top Movers */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Weather */}
            <div style={S.card}>
              <div style={S.cardHead}>
                <h3 style={S.cardTitle}>🌤 Weather Outlook</h3>
                <span style={{ fontSize: 12, color: T.textLight }}>Udaipur, RJ</span>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", gap: 8, justifyContent: "space-between" }}>
                {WEATHER.map((w, i) => (
                  <div key={i} style={{
                    textAlign: "center", flex: 1, padding: "10px 4px", borderRadius: 12,
                    background: i === 0 ? `${T.brandXPale}` : "transparent",
                    border: i === 0 ? `1.5px solid ${T.border}` : "none",
                  }}>
                    <div style={{ fontSize: 11, color: T.textLight, fontWeight: 700 }}>{w.day}</div>
                    <div style={{ fontSize: 22, margin: "4px 0" }}>{w.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: T.dark }}>{w.high}°</div>
                    <div style={{ fontSize: 11, color: T.textLight }}>{w.low}°</div>
                    <div style={{ fontSize: 10, color: T.blue, fontWeight: 700, marginTop: 2 }}>💧{w.rain}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 16px 14px" }}>
                <div style={{
                  background: T.amberPale, borderRadius: 10, padding: "8px 12px",
                  fontSize: 12, color: T.amber, fontWeight: 600,
                }}>
                  ⚡ Rain on Saturday may affect harvest transportation
                </div>
              </div>
            </div>

            {/* Top Movers */}
            <div style={{ ...S.card, flex: 1 }}>
              <div style={S.cardHead}>
                <h3 style={S.cardTitle}>🔥 Top Movers</h3>
                <Badge color={T.brand} bg={T.brandPale}>Today</Badge>
              </div>
              <div style={{ padding: "8px 0" }}>
                {topMovers.map((c, i) => {
                  const up = c.change > 0;
                  const sparkData = Array.from({ length: 8 }, (_, j) =>
                    c.currentPrice * (0.95 + Math.random() * 0.1)
                  );
                  sparkData[sparkData.length - 1] = c.currentPrice;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      style={{
                        display: "grid", gridTemplateColumns: "32px 1fr 80px 60px",
                        alignItems: "center", gap: 10, padding: "10px 18px", cursor: "pointer",
                        background: selectedId === c.id ? T.brandXPale : "transparent",
                        borderLeft: selectedId === c.id ? `3px solid ${T.brand}` : "3px solid transparent",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.brandXPale}
                      onMouseLeave={e => e.currentTarget.style.background = selectedId === c.id ? T.brandXPale : "transparent"}
                    >
                      <span style={{ fontSize: 18 }}>{c.emoji}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: T.dark }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: T.textLight }}>₹{fmt(c.currentPrice)}</div>
                      </div>
                      <div style={{ width: 80, height: 28 }}>
                        <Sparkline data={sparkData} color={up ? T.brand : T.red} height={28} />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{
                          fontSize: 12, fontWeight: 800,
                          color: up ? T.brand : T.red,
                          background: up ? T.brandPale : T.redPale,
                          padding: "2px 7px", borderRadius: 8,
                        }}>{pct(c.change)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── COMPARE + RADAR + MANDI ── */}
        <div style={{ ...S.grid2, gridTemplateColumns: "1.5fr 1fr" }}>
          {/* Compare chart */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <h3 style={S.cardTitle}>⚖️ Crop Comparison</h3>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {CROPS_DATA.slice(0, 5).map(c => (
                  <button
                    key={c.id}
                    onClick={() => toggleCompare(c.id)}
                    style={{
                      ...S.btnSm,
                      background: compareIds.includes(c.id) ? T.brand : T.brandPale,
                      color: compareIds.includes(c.id) ? T.white : T.brand,
                    }}
                  >{c.name}</button>
                ))}
              </div>
            </div>
            <div style={{ padding: "12px 8px 12px" }}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                  <XAxis dataKey="date" type="category" allowDuplicatedCategory={false} tick={{ fontSize: 10, fill: T.textLight }} tickLine={false} interval={Math.floor(chartDays / 5)} />
                  <YAxis tick={{ fontSize: 10, fill: T.textLight }} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {compareDatasets.map(ds => (
                    <Line key={ds.id} data={ds.history} dataKey="price" name={ds.name} stroke={ds.color} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mandi rates */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <h3 style={S.cardTitle}>🏪 Mandi Rates — {crop.name}</h3>
            </div>
            <div style={{ padding: "8px 0" }}>
              {MANDI_RATES.map((m, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 20px", borderBottom: i < MANDI_RATES.length - 1 ? `1px solid ${T.border}` : "none",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.dark }}>{m.mandi}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: T.dark, fontFamily: "monospace" }}>
                      ₹{fmt(m.price)}
                    </span>
                    <span style={{ fontSize: 16 }}>
                      {m.trend === "up" ? "🟢" : m.trend === "down" ? "🔴" : "🟡"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", background: T.brandXPale, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 12, color: T.textLight }}>Best selling rate</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.brand }}>
                Vashi, Mumbai — ₹{fmt(Math.max(...MANDI_RATES.map(m => m.price)))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RADAR + ALERTS + WATCHLIST ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Radar */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <h3 style={S.cardTitle}>🕸 Market Health</h3>
            </div>
            <div style={{ padding: "0 8px 12px" }}>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke={T.border} />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: T.textMid, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name={crop.name} dataKey="A" stroke={T.brand} fill={T.brand} fillOpacity={0.25} strokeWidth={2} />
                  <Radar name="Market Avg" dataKey="B" stroke={T.amber} fill={T.amber} fillOpacity={0.15} strokeWidth={2} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <h3 style={S.cardTitle}>🔔 Market Alerts</h3>
              <Badge color={T.red} bg={T.redPale}>4 New</Badge>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {ALERTS.map((a, i) => <AlertItem key={i} alert={a} />)}
            </div>
          </div>

          {/* Watchlist */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <h3 style={S.cardTitle}>⭐ Watchlist</h3>
              <button style={S.btnSm}>+ Add</button>
            </div>
            <div style={{ padding: "8px 0" }}>
              {watchlist.map((c, i) => {
                const up = c.change > 0;
                const pctBar = Math.min(Math.abs(c.change) / 20 * 100, 100);
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    style={{
                      padding: "14px 18px", cursor: "pointer",
                      borderBottom: i < watchlist.length - 1 ? `1px solid ${T.border}` : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.brandXPale}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: 14, color: T.dark }}>{c.emoji} {c.name}</span>
                      <span style={{ fontWeight: 900, fontSize: 14, color: T.dark, fontFamily: "monospace" }}>
                        ₹{fmt(c.currentPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 5, background: T.border, borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ width: `${pctBar}%`, height: "100%", background: up ? T.brand : T.red, borderRadius: 10, transition: "width 0.6s" }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: up ? T.brand : T.red, minWidth: 46, textAlign: "right" }}>
                        {pct(c.change)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── PROFIT CALCULATOR ── */}
        <div style={S.card}>
          <div style={S.cardHead}>
            <h3 style={S.cardTitle}>🧮 Profit / Loss Calculator</h3>
            <Badge color={T.blue} bg={T.bluePale}>Smart Tool</Badge>
          </div>
          <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 20, alignItems: "end" }}>
            {[
              { label: "Sell Price (₹/unit)", val: sellPrice, set: setSellPrice, hint: `Market: ₹${fmt(crop.currentPrice)}` },
              { label: "Cost Price (₹/unit)", val: costPrice, set: setCostPrice, hint: "Your production cost" },
              { label: "Quantity (quintals)",  val: quantity, set: setQuantity, hint: "How much you have" },
            ].map((f, i) => (
              <div key={i}>
                <label style={S.label}>{f.label}</label>
                <input
                  type="number"
                  value={f.val}
                  onChange={e => f.set(parseFloat(e.target.value) || 0)}
                  style={S.input}
                  onFocus={e => e.target.style.borderColor = T.brand}
                  onBlur={e => e.target.style.borderColor = T.border}
                />
                <span style={{ fontSize: 11, color: T.textLight }}>{f.hint}</span>
              </div>
            ))}
            <div style={{
              background: profit >= 0
                ? `linear-gradient(135deg, ${T.brand}, ${T.brandMid})`
                : `linear-gradient(135deg, ${T.red}, ${T.redLight})`,
              borderRadius: 14, padding: "16px 20px", textAlign: "center", minWidth: 160,
            }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>
                {profit >= 0 ? "📈 TOTAL PROFIT" : "📉 TOTAL LOSS"}
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: T.white, fontFamily: "'Space Grotesk', monospace" }}>
                ₹{fmt(Math.abs(Math.round(profit)))}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                Margin: {sellPrice > 0 ? (((sellPrice - costPrice) / sellPrice) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>

          {/* Margin bar */}
          <div style={{ padding: "0 24px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: T.textLight, fontWeight: 600 }}>Break-even progress</span>
              <span style={{ fontSize: 12, color: T.textMid, fontWeight: 700 }}>
                Cost: ₹{fmt(costPrice * quantity)} / Revenue: ₹{fmt(sellPrice * quantity)}
              </span>
            </div>
            <div style={{ height: 10, background: T.border, borderRadius: 10, overflow: "hidden" }}>
              <div style={{
                width: `${Math.min((sellPrice > 0 ? costPrice / sellPrice : 0) * 100, 100)}%`,
                height: "100%", background: `linear-gradient(90deg, ${T.brand}, ${T.brandLight})`,
                borderRadius: 10, transition: "width 0.5s",
              }} />
            </div>
          </div>
        </div>

        {/* ── FULL PRICE TABLE ── */}
        <div style={{ ...S.card, marginTop: 24 }}>
          <div style={S.cardHead}>
            <h3 style={S.cardTitle}>📋 All Crop Prices</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <Badge color={T.brand} bg={T.brandPale}>{CROPS_DATA.length} Crops</Badge>
              <Badge color={T.blue} bg={T.bluePale}>Live</Badge>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: T.brandXPale }}>
                  {["Crop","Category","Current Price","Change","Volume","52W High","52W Low","Trend","Action"].map(h => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: h === "Action" ? "center" : "left",
                      fontSize: 11, fontWeight: 800, color: T.textMid, textTransform: "uppercase",
                      letterSpacing: 0.5, whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CROPS_DATA.map((c, i) => {
                  const up = c.change > 0;
                  const sparkD = Array.from({ length: 12 }, () => c.currentPrice * (0.93 + Math.random() * 0.14));
                  sparkD[sparkD.length - 1] = c.currentPrice;
                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: `1px solid ${T.border}`,
                        background: selectedId === c.id ? T.brandXPale : i % 2 === 0 ? T.white : "#fbfefb",
                        cursor: "pointer", transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.brandXPale}
                      onMouseLeave={e => e.currentTarget.style.background = selectedId === c.id ? T.brandXPale : i % 2 === 0 ? T.white : "#fbfefb"}
                      onClick={() => setSelectedId(c.id)}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 20 }}>{c.emoji}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 14, color: T.dark }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: T.textLight }}>per {c.unit}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <Badge color={T.blue} bg={T.bluePale}>{c.category}</Badge>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 900, fontSize: 15, fontFamily: "monospace", color: T.dark }}>
                        ₹{fmt(c.currentPrice)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontWeight: 800, fontSize: 13, padding: "3px 10px", borderRadius: 8,
                          background: up ? T.brandPale : T.redPale,
                          color: up ? T.brand : T.red,
                        }}>{up ? "▲" : "▼"} {pct(c.change)}</span>
                      </td>
                      <td style={{ padding: "12px 16px", color: T.textMid, fontSize: 13, fontWeight: 600 }}>
                        {(c.volume / 1000).toFixed(1)}k
                      </td>
                      <td style={{ padding: "12px 16px", color: "#27ae60", fontWeight: 700, fontFamily: "monospace" }}>₹{fmt(c.high52)}</td>
                      <td style={{ padding: "12px 16px", color: T.red, fontWeight: 700, fontFamily: "monospace" }}>₹{fmt(c.low52)}</td>
                      <td style={{ padding: "12px 16px", width: 90 }}>
                        <Sparkline data={sparkD} color={up ? T.brand : T.red} height={32} />
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <button
                          onClick={e => { e.stopPropagation(); setSelectedId(c.id); setActiveTab("calculator"); }}
                          style={{ ...S.btn(false), fontSize: 11, padding: "5px 12px" }}
                        >Calc</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "28px 0 8px", color: T.textLight, fontSize: 12 }}>
          🌾 KrishiMart — Agri Price Intelligence · Data refreshes every 5 min · Prices from AGMARKNET & eNAM
        </div>
      </main>

      {/* ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes spin    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.brandXPale}; }
        ::-webkit-scrollbar-thumb { background: ${T.brandLight}; border-radius: 3px; }
      `}</style>
    </div>
  );
}