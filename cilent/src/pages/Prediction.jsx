import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPredictions,
  selectAllPredictions,
  selectModelAccuracy,
  selectPredictionsLoading,
} from "../store/slices/predictionSlice";
import { fetchAllPrices, selectAllPrices } from "../store/slices/priceSlice";
import { SIGNALS } from "../utils/constants";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend,
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
  blueLight:  "#3b82f6",
  bluePale:   "rgba(17, 138, 178, 0.15)",
  purple:     "#073b4c",
  purpleLight:"#8b5cf6",
  purplePale: "rgba(7, 59, 76, 0.15)",
  gold:       "#ff9f1c",
  goldPale:   "rgba(255, 159, 28, 0.15)",
  dark:       "#FFFFFF",
  darkMid:    "#E2E8F0",
  text:       "#E2E8F0",
  textMid:    "#94a3b8",
  textLight:  "#64748b",
  border:     "rgba(255, 255, 255, 0.05)",
  bg:         "#0B0E14",
  white:      "rgba(15, 23, 42, 0.6)",
};

/* ─── DUMMY DATA ─────────────────────────────────────────────── */
const CROPS = [
  { id:"wheat",    name:"Wheat",    emoji:"🌾", currentPrice:2340, category:"Cereals",    signal:"BUY",  confidence:82, change:2.63,  prevPrice:2280 },
  { id:"rice",     name:"Rice",     emoji:"🍚", currentPrice:3120, category:"Cereals",    signal:"HOLD", confidence:67, change:-2.19, prevPrice:3190 },
  { id:"cotton",   name:"Cotton",   emoji:"🌿", currentPrice:6450, category:"Fibers",     signal:"BUY",  confidence:91, change:3.86,  prevPrice:6210 },
  { id:"soybean",  name:"Soybean",  emoji:"🫘", currentPrice:4890, category:"Oilseeds",   signal:"HOLD", confidence:58, change:-0.61, prevPrice:4920 },
  { id:"maize",    name:"Maize",    emoji:"🌽", currentPrice:1890, category:"Cereals",    signal:"BUY",  confidence:74, change:2.72,  prevPrice:1840 },
  { id:"tomato",   name:"Tomato",   emoji:"🍅", currentPrice:680,  category:"Vegetables", signal:"SELL", confidence:88, change:15.25, prevPrice:590  },
  { id:"onion",    name:"Onion",    emoji:"🧅", currentPrice:420,  category:"Vegetables", signal:"SELL", confidence:79, change:-8.70, prevPrice:460  },
  { id:"mustard",  name:"Mustard",  emoji:"🌻", currentPrice:5420, category:"Oilseeds",   signal:"BUY",  confidence:70, change:2.07,  prevPrice:5310 },
];

const SIGNAL_CFG = {
  BUY:  { color: T.brand,  bg: T.brandPale,  icon: "📈", label: "Strong Buy",  desc: "Favorable conditions detected. Prices expected to rise." },
  SELL: { color: T.red,    bg: T.redPale,    icon: "📉", label: "Sell Now",    desc: "Peak detected. Consider liquidating stock soon." },
  HOLD: { color: T.amber,  bg: T.amberPale,  icon: "⚖️", label: "Hold Position", desc: "Mixed signals. Wait for clearer trend before acting." },
};

const MODEL_STATS = [
  { label:"Model Accuracy",   value:"87.4%",  icon:"🎯", color: T.brand,  sub:"Last 90 days" },
  { label:"Predictions Made", value:"2,841",  icon:"🤖", color: T.blue,   sub:"This season" },
  { label:"Win Rate",         value:"79.2%",  icon:"✅", color: T.purple, sub:"BUY signals" },
  { label:"Avg Lead Time",    value:"4.8 days",icon:"⏱", color: T.amber,  sub:"Before price move" },
];

const FACTORS = [
  { label:"Monsoon Forecast",    score:78, impact:"Positive", icon:"🌧️" },
  { label:"MSP Policy",          score:90, impact:"Positive", icon:"📜" },
  { label:"Export Demand",       score:65, impact:"Neutral",  icon:"🚢" },
  { label:"Cold Storage Supply", score:42, impact:"Negative", icon:"❄️" },
  { label:"Fuel / Transport",    score:55, impact:"Neutral",  icon:"🚚" },
  { label:"Pest Risk",           score:30, impact:"Negative", icon:"🐛" },
];

const ACCURACY_HISTORY = [
  { month:"Oct", accuracy:81, predictions:310 },
  { month:"Nov", accuracy:84, predictions:298 },
  { month:"Dec", accuracy:79, predictions:342 },
  { month:"Jan", accuracy:86, predictions:387 },
  { month:"Feb", accuracy:88, predictions:412 },
  { month:"Mar", accuracy:87, predictions:398 },
];

const SENTIMENT = [
  { source:"Farmer Reports",    score:72, icon:"👨‍🌾" },
  { source:"Mandi Traders",     score:65, icon:"🏪" },
  { source:"Export Houses",     score:80, icon:"🌐" },
  { source:"Agri News Signals", score:58, icon:"📰" },
];

const RISK_FACTORS = [
  { label:"Market Volatility",  level:"Low",    pct:25, color: T.brand },
  { label:"Weather Risk",       level:"Medium", pct:55, color: T.amber },
  { label:"Policy Uncertainty", level:"Low",    pct:20, color: T.brand },
  { label:"Supply Glut Risk",   level:"High",   pct:78, color: T.red   },
];

const genForecast = (base, days, vol = 0.022) => {
  let p = base;
  const out = [];
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 0; i <= days; i++) {
    p = p * (1 + (Math.random() - 0.46) * vol);
    const d = new Date(); d.setDate(d.getDate() + i);
    out.push({
      date: `${d.getDate()} ${labels[d.getMonth()]}`,
      predicted: Math.round(p),
      upper:     Math.round(p * (1 + 0.04 + Math.random() * 0.02)),
      lower:     Math.round(p * (1 - 0.04 - Math.random() * 0.02)),
      actual:    i === 0 ? base : null,
    });
  }
  out[0].predicted = base;
  return out;
};

const genHistorical = (base, days) => {
  let p = base * 0.9;
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return Array.from({ length: days }, (_, i) => {
    p = p * (1 + (Math.random() - 0.47) * 0.035);
    const d = new Date(); d.setDate(d.getDate() - (days - i));
    return { date: `${d.getDate()} ${labels[d.getMonth()]}`, actual: Math.round(p) };
  });
};

const RADAR_DATA = (crop) => [
  { subject:"Demand",    A: 70 + Math.random()*20, fullMark:100 },
  { subject:"Supply",    A: 40 + Math.random()*40, fullMark:100 },
  { subject:"Weather",   A: 60 + Math.random()*30, fullMark:100 },
  { subject:"Policy",    A: 75 + Math.random()*20, fullMark:100 },
  { subject:"Export",    A: 55 + Math.random()*35, fullMark:100 },
  { subject:"Sentiment", A: 65 + Math.random()*25, fullMark:100 },
];

/* ─── HELPERS ────────────────────────────────────────────────── */
const fmt = (n) => n?.toLocaleString("en-IN") ?? "0";
const pct = (n) => `${n > 0 ? "+" : ""}${n?.toFixed(2)}%`;

function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null, from = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(from + (target - from) * ease));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

/* ─── SUB-COMPONENTS ─────────────────────────────────────────── */
function Badge({ children, color, bg, size = 12 }) {
  return (
    <span style={{
      background: bg, color, fontSize: size, fontWeight: 800,
      padding: "3px 10px", borderRadius: 20, letterSpacing: 0.3,
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>{children}</span>
  );
}

function ConfidenceRing({ value, color, size = 100 }) {
  const r = 38, c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke={`${color}22`} strokeWidth="10" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 900, color, fontFamily: "'DM Mono', monospace" }}>
          {value}%
        </span>
        <span style={{ fontSize: size * 0.12, color: T.textLight, fontWeight: 700 }}>conf.</span>
      </div>
    </div>
  );
}

const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.dark, borderRadius: 10, padding: "10px 14px",
      boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
    }}>
      <p style={{ margin: "0 0 6px", color: T.brandLight, fontSize: 11, fontWeight: 700 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ margin: "2px 0", color: p.color || T.white, fontSize: 13, fontWeight: 700 }}>
          {p.name}: ₹{fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

function StatCard({ item, idx }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { setTimeout(() => setIn(true), idx * 90); }, [idx]);
  return (
    <div style={{
      background: T.white, borderRadius: 18, padding: "22px 24px",
      border: `1.5px solid ${T.border}`,
      boxShadow: "0 2px 14px rgba(45,106,79,0.07)",
      opacity: in_ ? 1 : 0,
      transform: in_ ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.4s, transform 0.4s, box-shadow 0.2s",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(45,106,79,0.16)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 14px rgba(45,106,79,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <p style={{ margin:0, fontSize:11, color:T.textLight, fontWeight:700, textTransform:"uppercase", letterSpacing:0.7 }}>{item.label}</p>
          <p style={{ margin:"8px 0 4px", fontSize:30, fontWeight:900, color:T.dark, fontFamily:"'DM Mono',monospace" }}>{item.value}</p>
          <span style={{ fontSize:12, color:item.color, fontWeight:700 }}>{item.sub}</span>
        </div>
        <div style={{
          width:50, height:50, borderRadius:15, fontSize:22,
          background:`${item.color}16`, display:"flex",
          alignItems:"center", justifyContent:"center",
        }}>{item.icon}</div>
      </div>
    </div>
  );
}

function FactorBar({ f, idx }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { setTimeout(() => setIn(true), 200 + idx * 100); }, [idx]);
  const impColor = { Positive: T.brand, Negative: T.red, Neutral: T.amber }[f.impact];
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
        <span style={{ fontSize:13, fontWeight:700, color:T.text, display:"flex", alignItems:"center", gap:7 }}>
          {f.icon} {f.label}
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Badge color={impColor} bg={`${impColor}18`} size={11}>{f.impact}</Badge>
          <span style={{ fontSize:12, fontWeight:900, color:impColor, fontFamily:"monospace" }}>{f.score}/100</span>
        </div>
      </div>
      <div style={{ height:8, background:T.border, borderRadius:10, overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:10,
          background:`linear-gradient(90deg, ${impColor}, ${impColor}aa)`,
          width: in_ ? `${f.score}%` : "0%",
          transition:"width 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}/>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function Prediction() {
  const dispatch = useDispatch();
  const predictions  = useSelector(selectAllPredictions)    || [];
  const accuracy     = useSelector(selectModelAccuracy)      || {};
  const loading      = useSelector(selectPredictionsLoading);
  const allPrices    = useSelector(selectAllPrices)          || [];

  const [selectedId, setSelectedId]   = useState("wheat");
  const [forecastDays, setForecastDays] = useState(14);
  const [viewMode, setViewMode]       = useState("forecast"); // forecast | historical | compare
  const [compareIds, setCompareIds]   = useState(["wheat","cotton"]);
  const [mounted, setMounted]         = useState(false);

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchAllPredictions());
    setTimeout(() => setMounted(true), 50);
  }, [dispatch]);

  /* merge real prices into CROPS for demo */
  const crops = CROPS.map(c => {
    const live = allPrices.find(p => p.id === c.id);
    return live ? { ...c, currentPrice: live.currentPrice ?? c.currentPrice } : c;
  });

  const crop       = crops.find(c => c.id === selectedId) || crops[0];
  const sigCfg     = SIGNAL_CFG[crop.signal] || SIGNAL_CFG.HOLD;
  const forecast   = genForecast(crop.currentPrice, forecastDays);
  const historical = genHistorical(crop.currentPrice, 30);
  const radarData  = RADAR_DATA(crop);
  const animPrice  = useCountUp(crop.currentPrice);

  const toggleCompare = (id) =>
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev.slice(-2), id]);

  /* merge predictions with CROPS fallback */
  const allPreds = crops.map(c => {
    const p = predictions.find(pr => pr?.cropId === c.id);
    const raw = (p?.signal && SIGNALS?.[p.signal]) || {};
    return {
      ...c,
      predictedPrice: p?.predictedPrice ?? Math.round(c.currentPrice * (1 + (Math.random() - 0.45) * 0.08)),
      signal: raw.label || c.signal,
      week7High: Math.round(c.currentPrice * (1.04 + Math.random() * 0.05)),
      week7Low:  Math.round(c.currentPrice * (0.92 + Math.random() * 0.04)),
    };
  });

  /* ─── STYLES ──────────────────────────────────────────────── */
  const card = {
    background: "rgba(15, 23, 42, 0.6)", borderRadius: 18,
    border: `1px solid ${T.border}`,
    backdropFilter: "blur(12px)",
    overflow: "hidden",
  };
  const cardHead = {
    padding: "18px 22px 14px", borderBottom: `1px solid ${T.border}`,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  };
  const cardTitle = { margin: 0, fontSize: 15, fontWeight: 800, color: "#fff" };
  const btn = (active, col = T.brand) => ({
    padding: "6px 14px", borderRadius: 9, border: "none", cursor: "pointer",
    fontWeight: 700, fontSize: 12, transition: "all 0.15s",
    background: active ? col : `rgba(255,255,255,0.05)`, color: active ? "#0B0E14" : "#fff",
  });
  const label = { fontSize: 11, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: 0.5 };

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", background: T.bg, minHeight: "100vh", position: "relative", color: T.text }}>
      
      {/* ── Dynamic Ambient Backgrounds ── */}
      <div style={{
        position: "absolute", top: "-15%", left: "-5%", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(6,214,160,0.15) 0%, rgba(0,0,0,0) 70%)",
        zIndex: 0, filter: "blur(60px)", pointerEvents: "none"
      }}></div>

      {/* ── HEADER ── */}
      <header style={{
        background: "rgba(11, 14, 20, 0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${T.border}`,
        padding: "0 28px", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:28 }}>🤖</span>
            <div>
              <div style={{ fontSize:20, fontWeight:900, color:"#fff", letterSpacing:-0.5, fontFamily: "'Space Grotesk', sans-serif" }}>AI Price Predictor</div>
              <div style={{ fontSize:11, color:T.brand, fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>
                KrishiMart · ML-Powered Forecasting
              </div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{
              background:"rgba(6, 214, 160, 0.1)", borderRadius:10, border: `1px solid rgba(6,214,160,0.3)`,
              padding:"8px 16px", display:"flex", alignItems:"center", gap:8,
            }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:T.brand,
                animation:"pulse 1.5s ease-in-out infinite" }} />
              <span style={{ fontSize:12, color:"#fff", fontWeight:700 }}>Model Live</span>
              <span style={{ fontSize:12, color:T.brandLight }}>
                Accuracy: <b>{accuracy?.overall ?? 87}%</b>
              </span>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:T.textLight }}>Last run</div>
              <div style={{ fontSize:12, color:"#fff", fontWeight:700 }}>
                {new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding:"24px 28px", maxWidth:1440, margin:"0 auto", position: "relative", zIndex: 1 }}>

        {/* ── STAT CARDS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
          {MODEL_STATS.map((m,i) => <StatCard key={i} item={m} idx={i} />)}
        </div>

        {/* ── CROP SELECTOR STRIP ── */}
        <div style={{ ...card, marginBottom:24 }}>
          <div style={{ ...cardHead, paddingBottom:10 }}>
            <h3 style={cardTitle}>🌾 Select Crop for Detailed Forecast</h3>
            <Badge color={T.brand} bg={T.brandPale}>{crops.length} Crops Tracked</Badge>
          </div>
          <div style={{ padding:"14px 20px", display:"flex", gap:10, flexWrap:"wrap" }}>
            {crops.map(c => {
              const sig = SIGNAL_CFG[c.signal] || SIGNAL_CFG.HOLD;
              const active = selectedId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{
                    border: active ? `2px solid ${sig.color}` : `1px solid ${T.border}`,
                    borderRadius:14, padding:"10px 16px", cursor:"pointer", transition:"all 0.15s",
                    background: active ? `${sig.color}12` : "rgba(255,255,255,0.03)",
                    boxShadow: active ? `0 4px 16px ${sig.color}30` : "none",
                    transform: active ? "translateY(-2px)" : "none",
                  }}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:18 }}>{c.emoji}</span>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:13, fontWeight:800, color:"#fff" }}>{c.name}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                        <span style={{ fontSize:10, fontWeight:800, color:sig.color,
                          background:sig.bg, padding:"1px 6px", borderRadius:8 }}>
                          {c.signal}
                        </span>
                        <span style={{ fontSize:11, color:T.textLight, fontFamily:"monospace" }}>
                          ₹{fmt(c.currentPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── HERO PREDICTION PANEL ── */}
        <div style={{
          ...card, marginBottom:24,
          background:`linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)`,
          border:`1px solid rgba(255,255,255,0.1)`,
        }}>
          <div style={{ padding:"28px 32px", display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:32, alignItems:"center" }}>

            {/* LEFT — crop info */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                <div style={{
                  width:64, height:64, borderRadius:20, fontSize:32,
                  background:"rgba(255,255,255,0.05)", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  boxShadow:"0 4px 16px rgba(0,0,0,0.5)",
                }}>{crop.emoji}</div>
                <div>
                  <h2 style={{ margin:0, fontSize:26, fontWeight:900, color:"#fff" }}>{crop.name}</h2>
                  <span style={{ fontSize:13, color:T.brand }}>{crop.category} · AI Forecast Active</span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[
                  { l:"Current Price", v:`₹${fmt(animPrice)}`, big:true },
                  { l:"Prev Close",    v:`₹${fmt(crop.prevPrice)}` },
                  { l:"24h Change",    v:pct(crop.change), color: crop.change>0 ? T.brand : T.red },
                  { l:"Predicted (7d)",v:`₹${fmt(Math.round(crop.currentPrice*(1+(crop.change>0?0.04:-0.02))))}` },
                ].map((m,i) => (
                  <div key={i} style={{
                    background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"12px 16px",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:700, marginBottom:4 }}>{m.l}</div>
                    <div style={{
                      fontSize: m.big ? 26 : 18, fontWeight:900,
                      color: m.color || "#fff",
                      fontFamily:"'Space Grotesk',monospace",
                    }}>{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER — signal */}
            <div style={{ textAlign:"center" }}>
              <div style={{
                width:150, height:150, borderRadius:"50%",
                background:`radial-gradient(circle, ${sigCfg.color}30 0%, ${sigCfg.color}10 70%)`,
                border:`3px solid ${sigCfg.color}`,
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
                boxShadow:`0 0 40px ${sigCfg.color}40`,
                animation:"glow 2s ease-in-out infinite",
              }}>
                <div style={{ fontSize:36 }}>{sigCfg.icon}</div>
                <div style={{ fontSize:20, fontWeight:900, color:sigCfg.color, marginTop:4 }}>{crop.signal}</div>
                <div style={{ fontSize:11, color:T.brandLight, fontWeight:700 }}>Signal</div>
              </div>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginTop:12, maxWidth:160, textAlign:"center" }}>
                {sigCfg.desc}
              </p>
            </div>

            {/* RIGHT — confidence + quick stats */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:20 }}>
              <div style={{ textAlign:"center" }}>
                <ConfidenceRing value={crop.confidence} color={sigCfg.color} size={120} />
                <div style={{ fontSize:12, color:T.brandLight, fontWeight:700, marginTop:6 }}>Confidence Score</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, width:"100%" }}>
                {[
                  { l:"7D High Est.",  v:`₹${fmt(Math.round(crop.currentPrice*1.06))}`, c:"#7ee8a2" },
                  { l:"7D Low Est.",   v:`₹${fmt(Math.round(crop.currentPrice*0.95))}`, c:T.redLight },
                  { l:"30D Forecast",  v:crop.change>0?"↗ Bullish":"↘ Bearish", c:crop.change>0?T.brandLight:T.redLight },
                  { l:"Risk Level",    v:crop.confidence>75?"Low":"Medium", c:crop.confidence>75?T.brandLight:T.amber },
                ].map((m,i) => (
                  <div key={i} style={{
                    background:"rgba(255,255,255,0.07)", borderRadius:10, padding:"10px 12px",
                  }}>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", fontWeight:700 }}>{m.l}</div>
                    <div style={{ fontSize:14, fontWeight:900, color:m.c, fontFamily:"monospace" }}>{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CHART SECTION ── */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:24 }}>

          {/* Forecast / Historical chart */}
          <div style={card}>
            <div style={cardHead}>
              <h3 style={cardTitle}>
                {viewMode==="forecast" ? "📈 Price Forecast" : viewMode==="historical" ? "📜 Historical Prices" : "⚖️ Crop Comparison"}
                {" — "}{crop.name}
              </h3>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {["forecast","historical","compare"].map(v => (
                  <button key={v} onClick={() => setViewMode(v)} style={btn(viewMode===v)}>
                    {{"forecast":"Forecast","historical":"Historical","compare":"Compare"}[v]}
                  </button>
                ))}
                {viewMode!=="compare" && [7,14,30].map(d => (
                  <button key={d} onClick={() => setForecastDays(d)} style={btn(forecastDays===d, T.blue)}>
                    {d}D
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding:"14px 10px 10px" }}>

              {viewMode==="forecast" && (
                <>
                  <div style={{ padding:"0 12px 8px", display:"flex", gap:16, fontSize:12, color:T.textLight }}>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ display:"inline-block", width:20, height:2.5, background:T.brand, borderRadius:2 }}/>
                      Predicted
                    </span>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ display:"inline-block", width:20, height:6, background:`${T.brandLight}40`, borderRadius:2 }}/>
                      Confidence Band
                    </span>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ display:"inline-block", width:20, height:2, background:T.amber, borderStyle:"dashed" }}/>
                      Today's Price
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={290}>
                    <AreaChart data={forecast} margin={{ top:4, right:12, left:-8, bottom:0 }}>
                      <defs>
                        <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={T.brand} stopOpacity={0.25}/>
                          <stop offset="95%" stopColor={T.brand} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={T.brandLight} stopOpacity={0.18}/>
                          <stop offset="95%" stopColor={T.brandLight} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                      <XAxis dataKey="date" tick={{ fontSize:11, fill:T.textLight }} tickLine={false}
                        interval={Math.floor(forecast.length/5)}/>
                      <YAxis tick={{ fontSize:11, fill:T.textLight }} tickLine={false} axisLine={false}
                        tickFormatter={v=>`₹${(v/1000).toFixed(1)}k`}/>
                      <Tooltip content={<DarkTooltip/>}/>
                      <ReferenceLine y={crop.currentPrice} stroke={T.amber} strokeDasharray="5 4"
                        label={{ value:"Today", fill:T.amber, fontSize:10 }}/>
                      <Area type="monotone" dataKey="upper"  name="Upper Band" stroke="none" fill="url(#bandGrad)" />
                      <Area type="monotone" dataKey="predicted" name="Predicted" stroke={T.brand}
                        strokeWidth={2.5} fill="url(#predGrad)" dot={false}
                        activeDot={{ r:5, fill:T.brand }}/>
                      <Line type="monotone" dataKey="lower" name="Lower Band" stroke={`${T.red}55`}
                        strokeWidth={1} strokeDasharray="3 3" dot={false}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </>
              )}

              {viewMode==="historical" && (
                <ResponsiveContainer width="100%" height={310}>
                  <AreaChart data={historical} margin={{ top:4, right:12, left:-8, bottom:0 }}>
                    <defs>
                      <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={T.blue} stopOpacity={0.25}/>
                        <stop offset="95%" stopColor={T.blue} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                    <XAxis dataKey="date" tick={{ fontSize:10, fill:T.textLight }} tickLine={false} interval={4}/>
                    <YAxis tick={{ fontSize:10, fill:T.textLight }} tickLine={false} axisLine={false}
                      tickFormatter={v=>`₹${(v/1000).toFixed(1)}k`}/>
                    <Tooltip content={<DarkTooltip/>}/>
                    <Area type="monotone" dataKey="actual" name="Actual Price" stroke={T.blue}
                      strokeWidth={2.5} fill="url(#histGrad)" dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {viewMode==="compare" && (
                <>
                  <div style={{ padding:"0 12px 10px", display:"flex", gap:8, flexWrap:"wrap" }}>
                    {crops.slice(0,6).map(c => (
                      <button key={c.id} onClick={() => toggleCompare(c.id)} style={{
                        ...btn(compareIds.includes(c.id)),
                        fontSize:11, padding:"4px 10px",
                      }}>{c.emoji} {c.name}</button>
                    ))}
                  </div>
                  <ResponsiveContainer width="100%" height={270}>
                    <LineChart margin={{ top:4, right:12, left:-8, bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border}/>
                      <XAxis dataKey="date" type="category" allowDuplicatedCategory={false}
                        tick={{ fontSize:10, fill:T.textLight }} tickLine={false} interval={3}/>
                      <YAxis tick={{ fontSize:10, fill:T.textLight }} tickLine={false} axisLine={false}
                        tickFormatter={v=>`₹${(v/1000).toFixed(1)}k`}/>
                      <Tooltip content={<DarkTooltip/>}/>
                      <Legend wrapperStyle={{ fontSize:11 }}/>
                      {compareIds.map((id,i) => {
                        const c = crops.find(x=>x.id===id);
                        if (!c) return null;
                        const col = [T.brand, T.amber, T.blue][i];
                        return (
                          <Line key={id} data={genForecast(c.currentPrice,14,0.025)} dataKey="predicted"
                            name={c.name} stroke={col} strokeWidth={2} dot={false}/>
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}
            </div>
          </div>

          {/* Radar + Sentiment */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div style={card}>
              <div style={cardHead}>
                <h3 style={cardTitle}>🕸 Signal Factors</h3>
              </div>
              <div style={{ padding:"4px 8px 8px" }}>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke={T.border}/>
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize:11, fill:T.textMid, fontWeight:600 }}/>
                    <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false}/>
                    <Radar name={crop.name} dataKey="A" stroke={sigCfg.color}
                      fill={sigCfg.color} fillOpacity={0.25} strokeWidth={2}/>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={card}>
              <div style={cardHead}>
                <h3 style={cardTitle}>💬 Market Sentiment</h3>
              </div>
              <div style={{ padding:"12px 18px" }}>
                {SENTIMENT.map((s,i) => {
                  const col = s.score>=70 ? T.brand : s.score>=55 ? T.amber : T.red;
                  return (
                    <div key={i} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:T.text }}>
                          {s.icon} {s.source}
                        </span>
                        <span style={{ fontSize:12, fontWeight:900, color:col }}>{s.score}%</span>
                      </div>
                      <div style={{ height:7, background:T.border, borderRadius:10, overflow:"hidden" }}>
                        <div style={{
                          width:`${s.score}%`, height:"100%", borderRadius:10,
                          background:`linear-gradient(90deg, ${col}, ${col}99)`,
                          transition:"width 0.8s ease",
                        }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── FACTORS + RISK + MODEL ACCURACY ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginBottom:24 }}>

          {/* Driving Factors */}
          <div style={card}>
            <div style={cardHead}>
              <h3 style={cardTitle}>🔍 Driving Factors</h3>
              <Badge color={T.purple} bg={T.purplePale}>AI Analysis</Badge>
            </div>
            <div style={{ padding:"18px 20px" }}>
              {FACTORS.map((f,i) => <FactorBar key={i} f={f} idx={i}/>)}
            </div>
          </div>

          {/* Risk Assessment */}
          <div style={card}>
            <div style={cardHead}>
              <h3 style={cardTitle}>⚠️ Risk Assessment</h3>
            </div>
            <div style={{ padding:"18px 20px" }}>
              {RISK_FACTORS.map((r,i) => (
                <div key={i} style={{ marginBottom:18 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:T.text }}>{r.label}</span>
                    <Badge color={r.color} bg={`${r.color}18`} size={11}>{r.level}</Badge>
                  </div>
                  <div style={{ height:10, background:T.border, borderRadius:10, overflow:"hidden" }}>
                    <div style={{
                      width:`${r.pct}%`, height:"100%", borderRadius:10,
                      background:`linear-gradient(90deg, ${r.color}, ${r.color}99)`,
                      transition:"width 1s ease",
                    }}/>
                  </div>
                  <div style={{ fontSize:11, color:T.textLight, marginTop:3 }}>Risk score: {r.pct}/100</div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Accuracy History */}
          <div style={card}>
            <div style={cardHead}>
              <h3 style={cardTitle}>🎯 Model Accuracy Trend</h3>
            </div>
            <div style={{ padding:"10px 8px 12px" }}>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={ACCURACY_HISTORY} margin={{ top:4, right:8, left:-20, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false}/>
                  <XAxis dataKey="month" tick={{ fontSize:11, fill:T.textLight }} tickLine={false}/>
                  <YAxis domain={[70,95]} tick={{ fontSize:10, fill:T.textLight }} tickLine={false} axisLine={false}/>
                  <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                    <div style={{ background:T.dark, borderRadius:8, padding:"8px 12px" }}>
                      <p style={{ margin:0, color:T.brandLight, fontSize:11, fontWeight:700 }}>{label}</p>
                      <p style={{ margin:0, color:T.white, fontSize:13, fontWeight:700 }}>Accuracy: {payload[0].value}%</p>
                    </div>
                  ) : null}/>
                  <ReferenceLine y={87} stroke={T.amber} strokeDasharray="4 3" label={{ value:"Target", fontSize:10, fill:T.amber }}/>
                  <Bar dataKey="accuracy" name="Accuracy" radius={[6,6,0,0]}
                    fill={T.brand} label={{ position:"top", fontSize:10, fill:T.brand, fontWeight:700, formatter:v=>`${v}%` }}/>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ padding:"0 12px 4px", borderTop:`1px solid ${T.border}`, marginTop:8, paddingTop:12 }}>
                <div style={{ fontSize:11, color:T.textLight, marginBottom:8 }}>Monthly Prediction Volume</div>
                <ResponsiveContainer width="100%" height={50}>
                  <BarChart data={ACCURACY_HISTORY} margin={{ top:0, right:8, left:-20, bottom:0 }}>
                    <Bar dataKey="predictions" radius={[4,4,0,0]} fill={`${T.brandLight}55`}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ── ALL PREDICTIONS TABLE ── */}
        <div style={card}>
          <div style={cardHead}>
            <h3 style={cardTitle}>📋 All Crop Predictions</h3>
            <div style={{ display:"flex", gap:8 }}>
              <Badge color={T.brand}  bg={T.brandPale}>{allPreds.filter(p=>p.signal==="BUY").length} Buy</Badge>
              <Badge color={T.red}    bg={T.redPale}>{allPreds.filter(p=>p.signal==="SELL").length} Sell</Badge>
              <Badge color={T.amber}  bg={T.amberPale}>{allPreds.filter(p=>p.signal==="HOLD" || !["BUY","SELL"].includes(p.signal)).length} Hold</Badge>
            </div>
          </div>

          {loading && allPreds.length===0 ? (
            <div style={{ padding:40, textAlign:"center", color:T.textLight, fontSize:15 }}>
              🤖 Running AI models…
            </div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:T.brandXPale }}>
                    {["Crop","Current Price","7D High","7D Low","Predicted","Signal","Confidence","Action"].map(h => (
                      <th key={h} style={{
                        padding:"12px 16px", textAlign:h==="Action"?"center":"left",
                        fontSize:11, fontWeight:800, color:T.textMid,
                        textTransform:"uppercase", letterSpacing:0.5, whiteSpace:"nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allPreds.map((p,i) => {
                    const sig = SIGNAL_CFG[p.signal] || SIGNAL_CFG.HOLD;
                    const diff = p.predictedPrice - p.currentPrice;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        style={{
                          borderBottom:`1px solid ${T.border}`,
                          background: selectedId===p.id ? T.brandXPale : i%2===0 ? T.white : "#fbfefb",
                          cursor:"pointer", transition:"background 0.15s",
                          borderLeft: selectedId===p.id ? `3px solid ${T.brand}` : "3px solid transparent",
                        }}
                        onMouseEnter={e=>e.currentTarget.style.background=T.brandXPale}
                        onMouseLeave={e=>e.currentTarget.style.background=selectedId===p.id?T.brandXPale:i%2===0?T.white:"#fbfefb"}
                      >
                        <td style={{ padding:"13px 16px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontSize:20 }}>{p.emoji}</span>
                            <div>
                              <div style={{ fontWeight:800, fontSize:14, color:T.dark }}>{p.name}</div>
                              <div style={{ fontSize:11, color:T.textLight }}>{p.category}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding:"13px 16px", fontWeight:900, fontFamily:"monospace", fontSize:15, color:T.dark }}>
                          ₹{fmt(p.currentPrice)}
                        </td>
                        <td style={{ padding:"13px 16px", color:"#27ae60", fontWeight:700, fontFamily:"monospace" }}>
                          ₹{fmt(p.week7High)}
                        </td>
                        <td style={{ padding:"13px 16px", color:T.red, fontWeight:700, fontFamily:"monospace" }}>
                          ₹{fmt(p.week7Low)}
                        </td>
                        <td style={{ padding:"13px 16px" }}>
                          <div style={{ fontWeight:900, fontFamily:"monospace", fontSize:14, color:T.dark }}>
                            ₹{fmt(p.predictedPrice)}
                          </div>
                          <div style={{ fontSize:11, fontWeight:700, color:diff>=0?T.brand:T.red }}>
                            {diff>=0?"▲":"▼"} ₹{fmt(Math.abs(diff))} ({((Math.abs(diff)/p.currentPrice)*100).toFixed(1)}%)
                          </div>
                        </td>
                        <td style={{ padding:"13px 16px" }}>
                          <span style={{
                            fontWeight:800, fontSize:12, padding:"4px 12px", borderRadius:10,
                            background:sig.bg, color:sig.color,
                            display:"inline-flex", alignItems:"center", gap:5,
                          }}>
                            {sig.icon} {p.signal}
                          </span>
                        </td>
                        <td style={{ padding:"13px 16px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ flex:1, height:7, background:T.border, borderRadius:10, overflow:"hidden", minWidth:60 }}>
                              <div style={{
                                width:`${p.confidence}%`, height:"100%", borderRadius:10,
                                background:`linear-gradient(90deg,${sig.color},${sig.color}99)`,
                              }}/>
                            </div>
                            <span style={{ fontSize:12, fontWeight:800, color:sig.color, minWidth:36 }}>
                              {p.confidence}%
                            </span>
                          </div>
                        </td>
                        <td style={{ padding:"13px 16px", textAlign:"center" }}>
                          <button
                            onClick={e => { e.stopPropagation(); setSelectedId(p.id); }}
                            style={{
                              padding:"5px 14px", borderRadius:9, border:"none", cursor:"pointer",
                              fontWeight:700, fontSize:12,
                              background:`${sig.color}18`, color:sig.color,
                            }}
                          >Analyse →</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center", padding:"28px 0 8px", color:T.textLight, fontSize:12 }}>
          🤖 KrishiMart AI · Predictions updated every 6 hours · Model trained on 3 years of AGMARKNET data · Not financial advice
        </div>
      </main>

      {/* ANIMATIONS + FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.15)} }
        @keyframes glow  { 0%,100%{box-shadow:0 0 30px currentColor} 50%{box-shadow:0 0 55px currentColor} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:${T.brandXPale}; }
        ::-webkit-scrollbar-thumb { background:${T.brandLight}; border-radius:3px; }
      `}</style>
    </div>
  );
}