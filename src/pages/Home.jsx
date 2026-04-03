import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPrices, selectAllPrices,
  selectTopMovers, fetchTopMovers,
} from "../store/slices/priceSlice";
import { DASHBOARD_STATS } from "../data/dummyData";
import PriceCard from "../components/dashboard/PriceCard";
import AlertBox from "../components/ai/AlertBox";

/* ─── THEME ─────────────────────────────────────────────────── */
const T = {
  brand:"#2d6a4f", brandMid:"#40916c", brandLight:"#74c69d",
  brandPale:"#d8f3dc", brandXPale:"#f0faf2",
  amber:"#e76f00", amberLight:"#fb8500", amberPale:"#fff7ed",
  gold:"#f4a261", goldDeep:"#d97706",
  red:"#c0392b", redPale:"#fdf1f0",
  blue:"#1d6fb8", bluePale:"#eff6ff",
  dark:"#1b2e22", darkMid:"#243b2d", dark2:"#0f1f15",
  text:"#1a2e1f", textMid:"#3a5a44", textLight:"#6b8f76",
  border:"#c8e6d0", bg:"#f7fcf8", white:"#ffffff",
};

/* ─── STATIC DATA ─────────────────────────────────────────────── */
const HERO_STATS = [
  { label:"Crops Tracked",       value:DASHBOARD_STATS?.totalCropsTracked ?? 248, suffix:"+" },
  { label:"Live Mandis",         value:DASHBOARD_STATS?.marketsConnected   ?? 512, suffix:"+" },
  { label:"AI Predictions",      value:DASHBOARD_STATS?.aiPredictions      ?? 2841,suffix:"" },
  { label:"Prediction Accuracy", value:DASHBOARD_STATS?.avgAccuracy        ?? "87%",suffix:"" },
];

const FEATURES = [
  { icon:"📊", title:"Live Price Dashboard",  desc:"Real-time crop prices from 500+ mandis across India, updated every 15 minutes." },
  { icon:"🤖", title:"AI Price Prediction",   desc:"ML-powered 7-day forecasts with confidence scores to help you time your sale." },
  { icon:"🌦️", title:"Weather Integration",  desc:"Hyperlocal weather alerts linked directly to expected price movements." },
  { icon:"📉", title:"MSP Comparison",        desc:"Instantly compare current mandi rates against government MSP benchmarks." },
  { icon:"🔔", title:"Smart Alerts",          desc:"Personalised push notifications for price spikes, dips and breaking news." },
  { icon:"🧮", title:"Profit Calculator",     desc:"Estimate net profit after transport & commission before you decide to sell." },
  { icon:"🗺️", title:"Market Heatmap",       desc:"Visual district-wise price map to find the best-paying mandis nearby." },
  { icon:"📰", title:"Agri News Feed",        desc:"Curated agriculture news with AI summaries and price-impact ratings." },
  { icon:"🌱", title:"Crop Calendar",         desc:"Season-wise sowing & harvesting calendar with price trend overlays." },
];

const MARQUEE_ITEMS = [
  { name:"Wheat",     price:"₹2,340", change:"+1.2%", up:true  },
  { name:"Rice",      price:"₹3,100", change:"+0.8%", up:true  },
  { name:"Maize",     price:"₹1,890", change:"-0.5%", up:false },
  { name:"Soybean",   price:"₹4,520", change:"+2.1%", up:true  },
  { name:"Cotton",    price:"₹6,240", change:"-1.4%", up:false },
  { name:"Sugarcane", price:"₹315",   change:"+0.3%", up:true  },
  { name:"Turmeric",  price:"₹12,400",change:"+3.8%", up:true  },
  { name:"Onion",     price:"₹1,750", change:"-2.2%", up:false },
  { name:"Tomato",    price:"₹2,080", change:"+5.1%", up:true  },
  { name:"Potato",    price:"₹1,240", change:"-0.9%", up:false },
  { name:"Garlic",    price:"₹8,900", change:"+1.7%", up:true  },
  { name:"Mustard",   price:"₹5,110", change:"+0.6%", up:true  },
];

const MARKET_REGIONS = [
  { name:"Azadpur, Delhi",            crops:128, status:"Active",   sentiment:72, state:"Delhi" },
  { name:"Vashi, Mumbai",             crops:94,  status:"Active",   sentiment:65, state:"Maharashtra" },
  { name:"Koyambedu, Chennai",        crops:87,  status:"Active",   sentiment:58, state:"Tamil Nadu" },
  { name:"Yeshwanthpur, Bengaluru",   crops:110, status:"Active",   sentiment:81, state:"Karnataka" },
  { name:"Gultekdi, Pune",            crops:76,  status:"Moderate", sentiment:49, state:"Maharashtra" },
  { name:"Bowenpally, Hyderabad",     crops:103, status:"Active",   sentiment:67, state:"Telangana" },
];

const MSP_COMPARE = [
  { crop:"Wheat",          msp:2275, current:2340 },
  { crop:"Rice (Common)",  msp:2183, current:2100 },
  { crop:"Maize",          msp:1962, current:1890 },
  { crop:"Soybean",        msp:4600, current:4520 },
  { crop:"Cotton (Long)",  msp:7020, current:6240 },
];

const TESTIMONIALS = [
  { name:"Ramesh Patil",    loc:"Pune, Maharashtra",  crop:"Onion farmer",  avatar:"RP", rating:5, quote:"AgroPrices AI helped me time my sale perfectly. I got ₹400 more per quintal just by waiting 3 days as suggested." },
  { name:"Gurpreet Singh",  loc:"Ludhiana, Punjab",   crop:"Wheat farmer",  avatar:"GS", rating:5, quote:"The MSP comparison feature is a game changer. I always know if I'm getting a fair price at the mandi." },
  { name:"Savitri Devi",    loc:"Muzaffarpur, Bihar", crop:"Litchi farmer", avatar:"SD", rating:4, quote:"Weather-linked price alerts are brilliant. I sold before the rain hit and saved my entire season's profit." },
];

const WEATHER_IMPACT = [
  { region:"Punjab",      condition:"🌤️ Partly Cloudy", temp:"32°C", impact:"Neutral",       col:T.amber },
  { region:"Maharashtra", condition:"🌧️ Heavy Rain",    temp:"26°C", impact:"Prices Rising",  col:T.brand },
  { region:"Rajasthan",   condition:"☀️ Hot & Dry",     temp:"41°C", impact:"Supply Drop",    col:T.red   },
  { region:"West Bengal", condition:"⛅ Overcast",       temp:"29°C", impact:"Stable",         col:T.blue  },
];

const SEASONAL_CROPS = [
  { season:"Kharif 🌧️", months:"Jun – Oct", crops:["Rice","Maize","Soybean","Cotton","Groundnut","Bajra"],  color:T.brand,   bg:T.brandPale  },
  { season:"Rabi ☀️",   months:"Nov – Apr", crops:["Wheat","Mustard","Chickpea","Barley","Pea","Lentil"],   color:T.goldDeep,bg:"#fef3c7" },
  { season:"Zaid 🌸",   months:"Mar – Jun", crops:["Watermelon","Cucumber","Muskmelon","Bitter Gourd"],      color:T.amber,   bg:T.amberPale  },
];

const NEWS_ITEMS = [
  { tag:"Policy",  title:"Govt raises MSP for Kharif crops by 5–8% for 2024-25 season",      time:"2h ago", impact:"Positive", ic:T.blue },
  { tag:"Market",  title:"Onion prices fall 12% in Nashik mandi on bumper arrivals",           time:"4h ago", impact:"Watch",    ic:"#7c3aed" },
  { tag:"Weather", title:"IMD predicts above-normal monsoon for central India in July",         time:"6h ago", impact:"Positive", ic:"#0284c7" },
  { tag:"Export",  title:"India lifts wheat export ban — global prices react sharply",          time:"1d ago", impact:"Rising",   ic:T.brand },
];

const MANDI_SCHEDULE = [
  { name:"Mon – Sat",  mandis:["Azadpur","Vashi","Koyambedu","Bengaluru"],   note:"Full trading hours" },
  { name:"Sunday",     mandis:["Azadpur","Gultekdi"],                         note:"Limited hours 8am–12pm" },
  { name:"Holidays",   mandis:[],                                              note:"All mandis closed" },
];

const MARKET_EVENTS = [
  { date:5,  label:"Wheat Auction, Ludhiana",      type:"auction" },
  { date:8,  label:"MSP Price Review — Govt.",     type:"policy"  },
  { date:12, label:"Cotton Export Deadline",        type:"export"  },
  { date:15, label:"Mandi Holiday (State Holiday)", type:"holiday" },
  { date:19, label:"Soybean Arrivals Peak",         type:"arrival" },
  { date:22, label:"AI Forecast Update",            type:"ai"      },
  { date:27, label:"Rice Season Closing",           type:"season"  },
];

const EVENT_COLORS = {
  auction:{ bg:"#ede9fe", color:"#6d28d9", icon:"🔨" },
  policy: { bg:"#dbeafe", color:T.blue,    icon:"📜" },
  export: { bg:T.amberPale, color:T.amber, icon:"🚢" },
  holiday:{ bg:T.redPale,   color:T.red,   icon:"🚫" },
  arrival:{ bg:T.brandPale, color:T.brand, icon:"🌾" },
  ai:     { bg:"#fdf4ff",   color:"#9333ea",icon:"🤖" },
  season: { bg:"#fff7ed",   color:T.amber, icon:"📅" },
};

const FOOTER_LINKS = {
  "Platform"  :["Live Dashboard","AI Predictions","Price Alerts","Profit Calculator","Market Heatmap","MSP Comparison"],
  "Crops"     :["Wheat","Rice","Cotton","Soybean","Onion","Tomato","Maize","Mustard"],
  "Resources" :["Agri News Feed","Crop Calendar","Mandi Schedule","Weather Impact","Farmer Guides","API Docs"],
  "Company"   :["About AgroPrices","Our Mission","Team","Press Kit","Blog","Careers"],
};

const SOCIAL = [
  { icon:"𝕏", name:"Twitter/X",  href:"#" },
  { icon:"in", name:"LinkedIn",  href:"#" },
  { icon:"f",  name:"Facebook",  href:"#" },
  { icon:"▶",  name:"YouTube",   href:"#" },
  { icon:"📸", name:"Instagram", href:"#" },
];

const PARTNERS = ["🏛️ AGMARKNET","📊 eNAM","🌾 NAFED","☁️ IMD Weather","🏦 NABARD","📡 NCDEX"];

/* ─── HELPERS ────────────────────────────────────────────────── */
const fmt = n => n?.toLocaleString("en-IN") ?? "0";

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const isNum = typeof target === "number";
    if (!isNum) { setCount(target); return; }
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step); else setCount(target);
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

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  return now;
}

/* ─── SUB-COMPONENTS ─────────────────────────────────────────── */

function LiveDot() {
  return (
    <span style={{ position:"relative", display:"inline-flex", width:10, height:10 }}>
      <span style={{
        position:"absolute", inset:0, borderRadius:"50%",
        background:"#4ade80", animation:"ping 1.2s ease-in-out infinite", opacity:0.7,
      }}/>
      <span style={{ position:"relative", width:10, height:10, borderRadius:"50%", background:"#22c55e" }}/>
    </span>
  );
}

function Badge({ children, color, bg }) {
  return (
    <span style={{
      background:bg, color, fontSize:11, fontWeight:800,
      padding:"2px 10px", borderRadius:20, letterSpacing:0.3,
    }}>{children}</span>
  );
}

/* Real-Time Clock & Calendar */
function LiveCalendar() {
  const now = useNow();
  const [hoveredDay, setHoveredDay] = useState(null);

  const year  = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth= new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const eventDays = new Set(MARKET_EVENTS.map(e => e.date));

  const pad = n => String(n).padStart(2,"0");
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const dayOfWeek   = now.toLocaleDateString("en-IN",{ weekday:"long" });
  const dateDisplay = `${today} ${monthNames[month]} ${year}`;

  const hoveredEvent = MARKET_EVENTS.find(e => e.date === hoveredDay);

  return (
    <div style={{
      background: `linear-gradient(145deg, ${T.dark} 0%, ${T.darkMid} 100%)`,
      borderRadius:24, padding:28, border:`1.5px solid rgba(116,198,157,0.2)`,
      boxShadow:`0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
    }}>
      {/* Clock */}
      <div style={{ textAlign:"center", marginBottom:22 }}>
        <div style={{
          fontSize:48, fontWeight:900, color:T.white,
          fontFamily:"'DM Mono','Courier New',monospace",
          letterSpacing:4, lineHeight:1,
          textShadow:`0 0 30px ${T.brandLight}60`,
        }}>{timeStr}</div>
        <div style={{ color:T.brandLight, fontSize:13, fontWeight:700, marginTop:6, letterSpacing:0.5 }}>
          {dayOfWeek} · {dateDisplay}
        </div>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:6,
          background:"rgba(116,198,157,0.15)", borderRadius:20, padding:"4px 12px",
          marginTop:10, fontSize:12, color:T.brandLight, fontWeight:700,
        }}>
          <LiveDot/> Mandi Hours: 08:00 – 18:00 IST
        </div>
      </div>

      {/* Month Header */}
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        marginBottom:14, paddingBottom:10,
        borderBottom:"1px solid rgba(116,198,157,0.2)",
      }}>
        <span style={{ color:T.white, fontWeight:800, fontSize:15 }}>
          {monthNames[month]} {year}
        </span>
        <Badge color={T.brand} bg={T.brandPale}>{MARKET_EVENTS.length} events</Badge>
      </div>

      {/* Day Labels */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:6 }}>
        {dayNames.map(d => (
          <div key={d} style={{ textAlign:"center", fontSize:10, fontWeight:800, color:"rgba(116,198,157,0.6)", letterSpacing:0.5 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`}/>;
          const isToday  = day === today;
          const hasEvent = eventDays.has(day);
          const evCfg    = hasEvent ? EVENT_COLORS[MARKET_EVENTS.find(e=>e.date===day).type] : null;
          const isHovered= hoveredDay === day;

          return (
            <div
              key={day}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              style={{
                position:"relative", aspectRatio:"1",
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center",
                borderRadius:8, cursor: hasEvent ? "pointer" : "default",
                background: isToday
                  ? `linear-gradient(135deg, ${T.brand}, ${T.brandMid})`
                  : isHovered && hasEvent ? "rgba(116,198,157,0.15)"
                  : "transparent",
                border: isToday ? "none"
                  : hasEvent ? `1.5px solid ${evCfg.color}55`
                  : "1px solid transparent",
                transition:"all 0.15s",
                boxShadow: isToday ? `0 4px 14px ${T.brand}70` : "none",
              }}
            >
              <span style={{
                fontSize:12, fontWeight: isToday ? 900 : hasEvent ? 700 : 500,
                color: isToday ? T.white : hasEvent ? evCfg.color : "rgba(255,255,255,0.55)",
              }}>{day}</span>
              {hasEvent && (
                <span style={{
                  width:4, height:4, borderRadius:"50%",
                  background: isToday ? "rgba(255,255,255,0.9)" : evCfg.color,
                  marginTop:2,
                }}/>
              )}
            </div>
          );
        })}
      </div>

      {/* Hovered Event Tooltip */}
      <div style={{
        marginTop:14, minHeight:44, padding:"10px 14px",
        background:"rgba(255,255,255,0.05)", borderRadius:12,
        border:`1px solid rgba(116,198,157,0.15)`,
        transition:"all 0.2s",
      }}>
        {hoveredEvent ? (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:20 }}>{EVENT_COLORS[hoveredEvent.type].icon}</span>
            <div>
              <div style={{ fontSize:12, fontWeight:800, color:EVENT_COLORS[hoveredEvent.type].color }}>
                {monthNames[month]} {hoveredEvent.date}
              </div>
              <div style={{ fontSize:13, color:T.white, fontWeight:600 }}>{hoveredEvent.label}</div>
            </div>
          </div>
        ) : (
          <p style={{ fontSize:12, color:"rgba(116,198,157,0.5)", textAlign:"center", margin:0, lineHeight:"24px" }}>
            Hover a highlighted date to see market events
          </p>
        )}
      </div>

      {/* Upcoming events strip */}
      <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:6 }}>
        <p style={{ fontSize:11, color:"rgba(116,198,157,0.6)", fontWeight:700, textTransform:"uppercase", letterSpacing:0.6, margin:0 }}>
          Upcoming
        </p>
        {MARKET_EVENTS.filter(e => e.date >= today).slice(0,3).map(ev => {
          const cfg = EVENT_COLORS[ev.type];
          return (
            <div key={ev.date} style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"7px 10px", borderRadius:10,
              background:"rgba(255,255,255,0.04)",
            }}>
              <span style={{
                minWidth:32, height:32, borderRadius:9, fontSize:14,
                background:cfg.bg, color:cfg.color,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>{cfg.icon}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:T.white }}>{ev.label}</div>
                <div style={{ fontSize:11, color:"rgba(116,198,157,0.6)" }}>
                  {monthNames[month]} {ev.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedStat({ label, value, suffix, start }) {
  const isStr = typeof value === "string";
  const numVal = isStr ? parseFloat(value) : value;
  const count = useCountUp(isNaN(numVal) ? 0 : numVal, 1800, start);
  const display = isStr && isNaN(numVal) ? value : count;
  return (
    <div style={{
      background:"rgba(255,255,255,0.07)", borderRadius:16, padding:"18px 20px",
      backdropFilter:"blur(8px)", border:"1px solid rgba(116,198,157,0.25)",
      textAlign:"center",
    }}>
      <p style={{ margin:"0 0 4px", fontSize:30, fontWeight:900, color:"#f4a261", fontFamily:"'DM Mono',monospace" }}>
        {display}{isStr && isNaN(numVal) ? "" : suffix}
      </p>
      <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.65)", fontWeight:600 }}>{label}</p>
    </div>
  );
}

function SearchBar() {
  const [q, setQ] = useState("");
  const suggestions = ["Wheat","Rice","Maize","Soybean","Cotton","Turmeric","Onion","Tomato","Potato","Garlic","Mustard","Sugarcane"];
  const filtered = q.length > 0 ? suggestions.filter(s => s.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div style={{ position:"relative", maxWidth:540, margin:"0 auto" }}>
      <div style={{
        display:"flex", alignItems:"center", background:T.white,
        borderRadius:16, padding:"12px 16px", gap:10,
        boxShadow:"0 8px 40px rgba(0,0,0,0.25)",
        border:"2px solid rgba(116,198,157,0.3)",
      }}>
        <span style={{ fontSize:18 }}>🔍</span>
        <input
          style={{
            flex:1, border:"none", outline:"none", fontSize:14,
            color:T.text, background:"transparent", fontFamily:"inherit",
          }}
          placeholder="Search crops, mandis, states…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        {q && <button onClick={() => setQ("")} style={{ border:"none", background:"none", cursor:"pointer", color:T.textLight, fontSize:16 }}>✕</button>}
        <Link to="/dashboard" style={{
          background:`linear-gradient(135deg, ${T.brand}, ${T.brandMid})`,
          color:T.white, fontWeight:800, fontSize:13, padding:"8px 18px",
          borderRadius:10, textDecoration:"none", whiteSpace:"nowrap",
          boxShadow:`0 4px 12px ${T.brand}50`,
        }}>Search</Link>
      </div>
      {filtered.length > 0 && (
        <div style={{
          position:"absolute", top:"100%", marginTop:6, width:"100%",
          background:T.white, borderRadius:14,
          boxShadow:"0 12px 40px rgba(0,0,0,0.15)",
          border:`1px solid ${T.border}`, zIndex:20, overflow:"hidden",
        }}>
          {filtered.map(s => (
            <button key={s} onClick={() => setQ(s)} style={{
              display:"block", width:"100%", textAlign:"left",
              padding:"11px 18px", fontSize:13, color:T.text,
              background:"transparent", border:"none", cursor:"pointer",
              fontFamily:"inherit", fontWeight:600,
              borderBottom:`1px solid ${T.border}`,
              transition:"background 0.1s",
            }}
            onMouseEnter={e => e.target.style.background=T.brandXPale}
            onMouseLeave={e => e.target.style.background="transparent"}
            >🌾 {s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function MarqueeTicker() {
  return (
    <div style={{
      background: T.dark2, overflow:"hidden", position:"relative",
      borderBottom:`2px solid ${T.brand}`,
    }}>
      <div style={{ display:"flex", alignItems:"center", height:40 }}>
        <div style={{
          background:`linear-gradient(135deg,${T.brand},${T.brandMid})`,
          padding:"0 18px", height:"100%", display:"flex", alignItems:"center",
          flexShrink:0, gap:8,
        }}>
          <LiveDot/>
          <span style={{ color:T.white, fontSize:11, fontWeight:800, letterSpacing:1 }}>LIVE</span>
        </div>
        <div style={{ overflow:"hidden", flex:1 }}>
          <div style={{ display:"flex", animation:"marquee 42s linear infinite", whiteSpace:"nowrap" }}>
            {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i) => (
              <span key={i} style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"0 22px", borderRight:`1px solid rgba(255,255,255,0.08)`,
              }}>
                <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>{item.name}</span>
                <span style={{ color:T.white, fontSize:13, fontWeight:800, fontFamily:"monospace" }}>{item.price}</span>
                <span style={{ fontSize:12, fontWeight:700, color: item.up ? "#4ade80" : "#f87171" }}>
                  {item.up ? "▲" : "▼"} {item.change}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MSPTable() {
  return (
    <div style={{ borderRadius:16, overflow:"hidden", border:`1px solid ${T.border}`, boxShadow:"0 4px 20px rgba(45,106,79,0.08)" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"inherit" }}>
        <thead>
          <tr style={{ background:`linear-gradient(90deg,${T.dark},${T.darkMid})` }}>
            {["Crop","MSP (₹/q)","Market (₹/q)","Difference","Status"].map(h => (
              <th key={h} style={{
                padding:"14px 18px", textAlign:h==="Status"?"center":"left",
                fontSize:12, fontWeight:800, color:"rgba(255,255,255,0.85)",
                letterSpacing:0.4, textTransform:"uppercase",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MSP_COMPARE.map((row, i) => {
            const diff = row.current - row.msp;
            const pct  = ((diff / row.msp) * 100).toFixed(1);
            const up   = diff >= 0;
            return (
              <tr key={row.crop} style={{ background: i%2===0 ? T.white : T.brandXPale, borderBottom:`1px solid ${T.border}` }}>
                <td style={{ padding:"13px 18px", fontWeight:700, color:T.dark }}>{row.crop}</td>
                <td style={{ padding:"13px 18px", fontFamily:"monospace", color:T.textMid, fontWeight:600 }}>₹{fmt(row.msp)}</td>
                <td style={{ padding:"13px 18px", fontFamily:"monospace", fontWeight:800, color:T.dark }}>₹{fmt(row.current)}</td>
                <td style={{ padding:"13px 18px", fontWeight:800, fontFamily:"monospace", color: up ? T.brand : T.red }}>
                  {up?"+":""}{fmt(diff)} ({up?"+":""}{pct}%)
                </td>
                <td style={{ padding:"13px 18px", textAlign:"center" }}>
                  <Badge color={up?T.brand:T.red} bg={up?T.brandPale:"#fde8e8"}>
                    {up?"▲ Above MSP":"▼ Below MSP"}
                  </Badge>
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
  const [qty, setQty]             = useState(10);
  const [price, setPrice]         = useState(2340);
  const [transport, setTransport] = useState(500);
  const [commission, setCommission] = useState(2);
  const gross = qty * price;
  const comm  = (gross * commission) / 100;
  const net   = gross - comm - transport;
  const margin = gross > 0 ? ((net / gross) * 100).toFixed(1) : 0;

  const fields = [
    { label:"Quantity (quintals)",    val:qty,        set:setQty,        min:1,   max:500   },
    { label:"Price per quintal (₹)",  val:price,      set:setPrice,      min:500, max:20000 },
    { label:"Transport cost (₹)",     val:transport,  set:setTransport,  min:0,   max:5000  },
    { label:"Commission (%)",         val:commission, set:setCommission, min:0,   max:10    },
  ];

  return (
    <div style={{
      background:T.white, borderRadius:20, padding:28,
      boxShadow:"0 4px 24px rgba(45,106,79,0.1)",
      border:`1.5px solid ${T.border}`,
    }}>
      <h3 style={{ margin:"0 0 20px", fontSize:17, fontWeight:800, color:T.dark, display:"flex", alignItems:"center", gap:8 }}>
        🧮 Quick Profit Estimator
      </h3>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
        {fields.map(f => (
          <div key={f.label}>
            <label style={{ fontSize:11, color:T.textLight, fontWeight:700, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:0.4 }}>
              {f.label}
            </label>
            <input
              type="number" min={f.min} max={f.max} value={f.val}
              onChange={e => f.set(Number(e.target.value))}
              style={{
                width:"100%", border:`1.5px solid ${T.border}`, borderRadius:10,
                padding:"10px 14px", fontSize:14, fontFamily:"inherit",
                color:T.text, background:T.white, boxSizing:"border-box", outline:"none",
              }}
              onFocus={e => e.target.style.borderColor=T.brand}
              onBlur={e => e.target.style.borderColor=T.border}
            />
          </div>
        ))}
      </div>
      <div style={{
        background:`linear-gradient(135deg, ${T.brandXPale}, ${T.brandPale})`,
        borderRadius:16, padding:"18px 20px",
        display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12,
        border:`1px solid ${T.border}`,
      }}>
        {[
          { l:"Gross Revenue",     v:`₹${fmt(gross)}`,         c:T.dark },
          { l:"Total Deductions",  v:`-₹${fmt(Math.round(comm+transport))}`, c:T.red },
          { l:"Net Profit",        v:`₹${fmt(Math.round(net))}`, c:T.brand, big:true },
        ].map(m => (
          <div key={m.l} style={{ textAlign:"center" }}>
            <p style={{ margin:"0 0 4px", fontSize:11, color:T.textLight, fontWeight:700 }}>{m.l}</p>
            <p style={{ margin:0, fontSize:m.big?22:16, fontWeight:900, color:m.c, fontFamily:"monospace" }}>{m.v}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ flex:1, height:8, background:T.border, borderRadius:10, overflow:"hidden" }}>
          <div style={{
            width:`${Math.min(Math.max(margin,0),100)}%`, height:"100%",
            background:`linear-gradient(90deg,${T.brand},${T.brandLight})`,
            borderRadius:10, transition:"width 0.5s",
          }}/>
        </div>
        <span style={{ fontSize:13, fontWeight:800, color: net >= 0 ? T.brand : T.red }}>
          {margin}% margin
        </span>
      </div>
    </div>
  );
}

/* ─── DETAILED FOOTER ────────────────────────────────────────── */
function Footer() {
  const now = useNow();
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const handleSub = () => {
    if (email.includes("@")) { setSubDone(true); setEmail(""); }
  };

  return (
    <footer style={{ background: T.dark2, fontFamily:"inherit" }}>

      {/* Pre-footer CTA band */}
      <div style={{
        background:`linear-gradient(135deg, ${T.brand} 0%, ${T.brandMid} 50%, ${T.brandLight} 100%)`,
        padding:"40px 32px", textAlign:"center",
      }}>
        <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.7)", letterSpacing:2, textTransform:"uppercase" }}>
          🌾 Join 2,00,000+ Farmers
        </p>
        <h2 style={{ margin:"0 0 14px", fontSize:32, fontWeight:900, color:T.white, letterSpacing:-0.5 }}>
          Ready to Sell Smarter?
        </h2>
        <p style={{ margin:"0 0 28px", fontSize:15, color:"rgba(255,255,255,0.8)" }}>
          AgroPrices gives every farmer the intelligence of a market expert — for free.
        </p>
        <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
          <Link to="/dashboard" style={{
            background:T.dark, color:T.white, fontWeight:800, fontSize:15,
            padding:"14px 32px", borderRadius:14, textDecoration:"none",
            boxShadow:"0 6px 24px rgba(0,0,0,0.3)",
          }}>📊 Open Dashboard</Link>
          <Link to="/prediction" style={{
            background:"rgba(255,255,255,0.15)", color:T.white,
            fontWeight:800, fontSize:15, padding:"14px 32px",
            borderRadius:14, textDecoration:"none",
            border:"2px solid rgba(255,255,255,0.3)",
          }}>🤖 See AI Predictions</Link>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{
        background:`linear-gradient(90deg, ${T.darkMid}, ${T.dark})`,
        padding:"28px 40px", display:"flex", alignItems:"center",
        justifyContent:"space-between", gap:20, flexWrap:"wrap",
        borderBottom:`1px solid rgba(255,255,255,0.06)`,
      }}>
        <div>
          <p style={{ margin:0, fontSize:15, fontWeight:800, color:T.white }}>📬 Daily Price Digest</p>
          <p style={{ margin:"4px 0 0", fontSize:13, color:"rgba(255,255,255,0.5)" }}>
            Get tomorrow's crop price forecast in your inbox every morning.
          </p>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          {subDone ? (
            <div style={{
              background:`${T.brand}30`, border:`1px solid ${T.brand}`,
              borderRadius:12, padding:"10px 20px", color:T.brandLight, fontWeight:700, fontSize:14,
            }}>✅ Subscribed! Check your inbox.</div>
          ) : (
            <>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  padding:"11px 18px", borderRadius:12, border:"none",
                  fontSize:14, outline:"none", width:240,
                  background:"rgba(255,255,255,0.08)", color:T.white,
                  fontFamily:"inherit",
                }}
                onKeyDown={e => e.key==="Enter" && handleSub()}
              />
              <button onClick={handleSub} style={{
                padding:"11px 22px", borderRadius:12, border:"none", cursor:"pointer",
                fontWeight:800, fontSize:14,
                background:`linear-gradient(135deg,${T.brand},${T.brandMid})`,
                color:T.white, fontFamily:"inherit",
                boxShadow:`0 4px 14px ${T.brand}60`,
              }}>Subscribe →</button>
            </>
          )}
        </div>
      </div>

      {/* Main Footer Body */}
      <div style={{ padding:"52px 40px 36px", maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:56, marginBottom:48 }}>

          {/* Brand Column */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{
                width:44, height:44, borderRadius:14, fontSize:22,
                background:`linear-gradient(135deg,${T.brand},${T.brandMid})`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>🌾</div>
              <div>
                <div style={{ fontSize:22, fontWeight:900, color:T.white, letterSpacing:-0.5 }}>AgroPrices</div>
                <div style={{ fontSize:11, color:T.brandLight, fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>
                  Agri Intelligence Platform
                </div>
              </div>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:"0 0 22px" }}>
              Empowering 2,00,000+ farmers across India with real-time mandi prices,
              AI forecasts, and market intelligence — all in one place.
            </p>

            {/* Badges */}
            <div style={{ display:"flex", gap:10, marginBottom:22 }}>
              {["🍎 App Store","▶ Play Store"].map(b => (
                <div key={b} style={{
                  background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius:10, padding:"8px 14px", cursor:"pointer",
                  fontSize:12, color:"rgba(255,255,255,0.7)", fontWeight:700,
                  display:"flex", alignItems:"center", gap:6,
                  transition:"all 0.15s",
                }}>{b}</div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display:"flex", gap:10 }}>
              {SOCIAL.map(s => (
                <a key={s.name} href={s.href} title={s.name} style={{
                  width:36, height:36, borderRadius:10,
                  background:"rgba(255,255,255,0.07)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:14, color:"rgba(255,255,255,0.65)",
                  textDecoration:"none", fontWeight:800,
                  transition:"all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background=T.brand; e.currentTarget.style.color=T.white; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="rgba(255,255,255,0.65)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:32 }}>
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p style={{ margin:"0 0 16px", fontSize:12, fontWeight:800, color:T.brandLight,
                  textTransform:"uppercase", letterSpacing:1 }}>{section}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                  {links.map(l => (
                    <Link key={l} to="/dashboard" style={{
                      fontSize:13, color:"rgba(255,255,255,0.5)",
                      textDecoration:"none", fontWeight:600,
                      transition:"color 0.15s",
                    }}
                    onMouseEnter={e => e.target.style.color=T.brandLight}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.5)"}
                    >{l}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Hours */}
        <div style={{
          background:"rgba(255,255,255,0.04)", borderRadius:16, padding:"20px 24px",
          marginBottom:36, border:"1px solid rgba(116,198,157,0.1)",
        }}>
          <p style={{ margin:"0 0 14px", fontSize:12, fontWeight:800, color:T.brandLight,
            textTransform:"uppercase", letterSpacing:1 }}>🕐 Mandi Trading Hours</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {MANDI_SCHEDULE.map(s => (
              <div key={s.name} style={{
                padding:"12px 16px", background:"rgba(255,255,255,0.03)",
                borderRadius:12, border:"1px solid rgba(255,255,255,0.06)",
              }}>
                <p style={{ margin:"0 0 6px", fontSize:13, fontWeight:800, color:T.white }}>{s.name}</p>
                <p style={{ margin:"0 0 6px", fontSize:11, color:"rgba(255,255,255,0.35)" }}>{s.note}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {s.mandis.length > 0 ? s.mandis.map(m => (
                    <span key={m} style={{
                      fontSize:11, padding:"2px 8px", borderRadius:6,
                      background:T.brandPale, color:T.brand, fontWeight:700,
                    }}>{m}</span>
                  )) : (
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>All mandis closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ marginBottom:36 }}>
          <p style={{ margin:"0 0 14px", fontSize:12, fontWeight:800, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:1 }}>Data Partners & Sources</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {PARTNERS.map(p => (
              <div key={p} style={{
                padding:"7px 16px", borderRadius:10,
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.08)",
                fontSize:12, color:"rgba(255,255,255,0.45)", fontWeight:700,
              }}>{p}</div>
            ))}
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.07)",
          flexWrap:"wrap", gap:12,
        }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>
            © {now.getFullYear()} AgroPrices · All rights reserved ·{" "}
            <span style={{ color:"rgba(116,198,157,0.5)" }}>
              Data from AGMARKNET & eNAM · Updated every 15 min
            </span>
          </div>
          <div style={{ display:"flex", gap:20, alignItems:"center" }}>
            {["Privacy Policy","Terms of Use","Cookie Policy","Disclaimer","Sitemap"].map(l => (
              <Link key={l} to="/" style={{
                fontSize:12, color:"rgba(255,255,255,0.3)",
                textDecoration:"none", fontWeight:600, transition:"color 0.15s",
              }}
              onMouseEnter={e => e.target.style.color="rgba(116,198,157,0.8)"}
              onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.3)"}
              >{l}</Link>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <LiveDot/>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:700 }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN HOME PAGE ─────────────────────────────────────────── */
export default function Home() {
  const dispatch = useDispatch();
  const prices   = useSelector(selectAllPrices)  || [];
  const movers   = useSelector(selectTopMovers)  || [];

  const [heroRef, heroInView]   = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSeason, setActiveSeason]           = useState(0);
  const [marketSearch, setMarketSearch]           = useState("");
  const now = useNow();

  useEffect(() => {
    dispatch(fetchAllPrices());
    dispatch(fetchTopMovers(4));
  }, [dispatch]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const filtered = MARKET_REGIONS.filter(m =>
    m.name.toLowerCase().includes(marketSearch.toLowerCase())
  );

  const S = {
    section: { maxWidth:1400, margin:"0 auto", padding:"60px 32px" },
    secTitle: { margin:"0 0 6px", fontSize:28, fontWeight:900, color:T.dark, letterSpacing:-0.5 },
    secSub:   { margin:"0 0 28px", fontSize:14, color:T.textLight },
    card:     {
      background:T.white, borderRadius:18, border:`1.5px solid ${T.border}`,
      boxShadow:"0 2px 16px rgba(45,106,79,0.07)", overflow:"hidden",
    },
  };

  return (
    <div style={{ fontFamily:"'Nunito','Segoe UI',sans-serif", background:T.bg, color:T.text }}>

      {/* ── MARQUEE TICKER ── */}
      <MarqueeTicker/>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        background:`linear-gradient(160deg, ${T.dark2} 0%, ${T.dark} 40%, ${T.darkMid} 80%, #1f4a30 100%)`,
        padding:"80px 32px", position:"relative", overflow:"hidden",
      }}>
        {/* decorative blobs */}
        <div style={{ position:"absolute", top:-80, right:-80, width:360, height:360, borderRadius:"50%", background:`${T.brand}18`, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-100, left:-60, width:420, height:420, borderRadius:"50%", background:`${T.amber}0d`, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"30%", left:"50%", width:600, height:2, background:`linear-gradient(90deg,transparent,${T.brand}30,transparent)`, pointerEvents:"none" }}/>

        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 380px", gap:48, alignItems:"center" }}>

          {/* Left */}
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(116,198,157,0.12)", border:"1px solid rgba(116,198,157,0.3)",
              borderRadius:30, padding:"6px 16px", marginBottom:24,
              fontSize:12, color:T.brandLight, fontWeight:700,
            }}>
              <LiveDot/> Live market data from 500+ mandis
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
              <div style={{
                width:56, height:56, borderRadius:18, fontSize:28,
                background:`linear-gradient(135deg,${T.brand},${T.brandMid})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 8px 28px ${T.brand}60`,
              }}>🌾</div>
              <div>
                <div style={{ fontSize:36, fontWeight:900, color:T.white, letterSpacing:-1, lineHeight:1 }}>AgroPrices</div>
                <div style={{ fontSize:12, color:T.brandLight, fontWeight:700, letterSpacing:2, textTransform:"uppercase" }}>
                  Agri Intelligence Platform
                </div>
              </div>
            </div>

            <h1 style={{
              margin:"0 0 18px", fontSize:44, fontWeight:900, color:T.white,
              lineHeight:1.15, letterSpacing:-1,
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition:"all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              Smart Crop Price Intelligence{" "}
              <span style={{
                background:`linear-gradient(135deg,${T.gold},${T.amberLight})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>for Every Farmer</span>
            </h1>

            <p style={{ margin:"0 0 32px", fontSize:17, color:"rgba(255,255,255,0.65)", lineHeight:1.7, maxWidth:520 }}>
              Track live mandi prices, get AI-driven 7-day forecasts, compare MSP rates,
              and make confident selling decisions — all in one place.
            </p>

            <div style={{ marginBottom:36 }}>
              <SearchBar/>
            </div>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:40 }}>
              {[
                { to:"/dashboard",  label:"📊 Open Dashboard",  primary:true  },
                { to:"/dashboard",  label:"🌾 Browse Crops",    primary:false },
                { to:"/insights",   label:"🔔 Set Alerts",      primary:false },
              ].map(b => (
                <Link key={b.label} to={b.to} style={{
                  padding:"13px 28px", borderRadius:14, fontWeight:800, fontSize:15,
                  textDecoration:"none", transition:"all 0.2s",
                  background: b.primary
                    ? `linear-gradient(135deg,${T.gold},${T.amberLight})`
                    : "rgba(255,255,255,0.09)",
                  color: b.primary ? T.dark : T.white,
                  border: b.primary ? "none" : "1.5px solid rgba(255,255,255,0.18)",
                  boxShadow: b.primary ? `0 6px 24px ${T.amber}60` : "none",
                }}>{b.label}</Link>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {HERO_STATS.map(({ label, value, suffix }) => (
                <AnimatedStat key={label} label={label} value={value} suffix={suffix} start={statsInView}/>
              ))}
            </div>
          </div>

          {/* Right — Live Calendar */}
          <div style={{ position:"relative", zIndex:1 }}>
            <LiveCalendar/>
          </div>
        </div>
      </section>

      {/* ── TOP MOVERS ── */}
      <div style={S.section}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <h2 style={S.secTitle}>🔥 Top Movers</h2>
            <p style={S.secSub}>Biggest price moves in last 24 hours</p>
          </div>
          <Link to="/dashboard" style={{ color:T.brand, fontWeight:800, fontSize:14, textDecoration:"none" }}>View All →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
          {movers.length > 0
            ? movers.map(crop => <PriceCard key={crop.id} crop={crop}/>)
            : Array.from({length:4}).map((_,i) => (
                <div key={i} style={{ ...S.card, padding:20 }}>
                  {[3,2,1].map(h => (
                    <div key={h} style={{ height:h*14, background:T.border, borderRadius:8, marginBottom:10, animation:"pulse 1.5s ease-in-out infinite" }}/>
                  ))}
                </div>
              ))
          }
        </div>
      </div>

      {/* ── MSP vs MARKET ── */}
      <div style={{ ...S.section, paddingTop:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <h2 style={S.secTitle}>📉 MSP vs Market Prices</h2>
            <p style={S.secSub}>See if your crop is trading above or below government support price</p>
          </div>
          <Link to="/insights" style={{ color:T.brand, fontWeight:800, fontSize:14, textDecoration:"none" }}>Full Report →</Link>
        </div>
        <MSPTable/>
      </div>

      {/* ── PROFIT CALC + WEATHER ── */}
      <div style={{ ...S.section, paddingTop:0, display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        <ProfitCalculator/>

        {/* Weather */}
        <div style={{ ...S.card, padding:28 }}>
          <h3 style={{ margin:"0 0 20px", fontSize:17, fontWeight:800, color:T.dark }}>🌦️ Weather & Price Impact</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
            {WEATHER_IMPACT.map(w => (
              <div key={w.region} style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"13px 16px", background:T.brandXPale, borderRadius:12,
                border:`1px solid ${T.border}`,
              }}>
                <div>
                  <p style={{ margin:"0 0 2px", fontWeight:700, fontSize:14, color:T.dark }}>{w.region}</p>
                  <p style={{ margin:0, fontSize:12, color:T.textLight }}>{w.condition} · {w.temp}</p>
                </div>
                <Badge color={w.col} bg={`${w.col}18`}>{w.impact}</Badge>
              </div>
            ))}
          </div>
          <Link to="/insights" style={{
            display:"block", textAlign:"center", padding:"11px",
            background:T.brandXPale, borderRadius:12, fontSize:13,
            color:T.brand, fontWeight:800, textDecoration:"none",
            border:`1px solid ${T.border}`,
          }}>View detailed weather-price map →</Link>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{
        background:`linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 60%, #1f4a30 100%)`,
        padding:"72px 32px",
      }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p style={{ margin:"0 0 8px", fontSize:12, fontWeight:800, color:T.brandLight, letterSpacing:2, textTransform:"uppercase" }}>
              Everything You Need
            </p>
            <h2 style={{ margin:"0 0 12px", fontSize:34, fontWeight:900, color:T.white, letterSpacing:-0.5 }}>
              Sell Smart with AgroPrices
            </h2>
            <p style={{ margin:0, fontSize:15, color:"rgba(255,255,255,0.5)" }}>
              One platform. All the intelligence. Zero guesswork.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
            {FEATURES.map((f,i) => (
              <div key={f.title} style={{
                background:"rgba(255,255,255,0.05)", borderRadius:18, padding:24,
                border:"1.5px solid rgba(116,198,157,0.15)", cursor:"pointer",
                transition:"all 0.2s", animationDelay:`${i*40}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=T.gold; e.currentTarget.style.background="rgba(244,162,97,0.08)"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(116,198,157,0.15)"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{
                  width:48, height:48, borderRadius:14, fontSize:22, marginBottom:14,
                  background:`${T.brand}25`, display:"flex", alignItems:"center", justifyContent:"center",
                }}>{f.icon}</div>
                <h3 style={{ margin:"0 0 8px", fontSize:15, fontWeight:800, color:T.white }}>{f.title}</h3>
                <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET HUBS ── */}
      <div style={S.section}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:14 }}>
          <div>
            <h2 style={S.secTitle}>🗺️ Major Market Hubs</h2>
            <p style={S.secSub}>Live status of top mandi centres</p>
          </div>
          <input
            style={{
              border:`1.5px solid ${T.border}`, borderRadius:12,
              padding:"10px 18px", fontSize:13, outline:"none", width:240,
              fontFamily:"inherit", color:T.text,
            }}
            placeholder="Search markets…"
            value={marketSearch}
            onChange={e => setMarketSearch(e.target.value)}
            onFocus={e => e.target.style.borderColor=T.brand}
            onBlur={e => e.target.style.borderColor=T.border}
          />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {filtered.map(m => {
            const sc = m.sentiment;
            const col = sc>=70?T.brand:sc>=50?T.amber:T.red;
            return (
              <div key={m.name} style={{
                ...S.card, padding:22, cursor:"pointer", transition:"all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 28px ${T.brand}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(45,106,79,0.07)"; }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div>
                    <p style={{ margin:"0 0 3px", fontWeight:800, fontSize:14, color:T.dark }}>{m.name}</p>
                    <p style={{ margin:0, fontSize:12, color:T.textLight }}>{m.state} · {m.crops} crops listed</p>
                  </div>
                  <Badge color={m.status==="Active"?T.brand:T.amber} bg={m.status==="Active"?T.brandPale:T.amberPale}>
                    {m.status==="Active"?"● ":""}{m.status}
                  </Badge>
                </div>
                <p style={{ margin:"0 0 6px", fontSize:11, color:T.textLight, fontWeight:700 }}>Market Sentiment</p>
                <div style={{ height:8, background:T.border, borderRadius:10, overflow:"hidden", marginBottom:6 }}>
                  <div style={{ width:`${sc}%`, height:"100%", background:`linear-gradient(90deg,${col},${col}99)`, borderRadius:10 }}/>
                </div>
                <p style={{ margin:0, fontSize:12, color:col, fontWeight:800 }}>{sc}% bullish</p>
              </div>
            );
          })}
          {filtered.length===0 && (
            <p style={{ gridColumn:"1/-1", textAlign:"center", color:T.textLight, padding:40 }}>
              No markets found for "{marketSearch}"
            </p>
          )}
        </div>
      </div>

      {/* ── CROP CALENDAR ── */}
      <section style={{
        background:`linear-gradient(135deg, #f0faf2 0%, #fffbeb 100%)`,
        padding:"60px 32px",
      }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <h2 style={S.secTitle}>🌱 Seasonal Crop Calendar</h2>
          <p style={{ ...S.secSub }}>Plan your selling window around season patterns</p>
          <div style={{ display:"flex", gap:12, marginBottom:24 }}>
            {SEASONAL_CROPS.map((s,i) => (
              <button key={s.season} onClick={() => setActiveSeason(i)} style={{
                padding:"10px 22px", borderRadius:30, border:"none", cursor:"pointer",
                fontWeight:800, fontSize:13, transition:"all 0.2s", fontFamily:"inherit",
                background: activeSeason===i ? T.brand : T.white,
                color: activeSeason===i ? T.white : T.textMid,
                boxShadow: activeSeason===i ? `0 4px 16px ${T.brand}50` : "0 2px 8px rgba(0,0,0,0.06)",
                border: `1.5px solid ${activeSeason===i ? T.brand : T.border}`,
              }}>
                {s.season} <span style={{ opacity:0.65, fontSize:11, marginLeft:4 }}>{s.months}</span>
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
            {SEASONAL_CROPS[activeSeason].crops.map(crop => (
              <Link key={crop} to="/prediction" style={{
                padding:"10px 20px", borderRadius:14, fontWeight:800, fontSize:14,
                textDecoration:"none", transition:"all 0.15s",
                background: SEASONAL_CROPS[activeSeason].bg,
                color: SEASONAL_CROPS[activeSeason].color,
                border:`1.5px solid ${SEASONAL_CROPS[activeSeason].color}40`,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >🌾 {crop}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGRI NEWS ── */}
      <div style={S.section}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <h2 style={S.secTitle}>📰 Agri News & Market Updates</h2>
            <p style={S.secSub}>AI-curated news with price impact ratings</p>
          </div>
          <Link to="/insights" style={{ color:T.brand, fontWeight:800, fontSize:14, textDecoration:"none" }}>All News →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {NEWS_ITEMS.map(n => (
            <div key={n.title} style={{
              ...S.card, padding:20, display:"flex", gap:16, cursor:"pointer",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 28px rgba(45,106,79,0.12)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 16px rgba(45,106,79,0.07)"; }}
            >
              <Badge color={n.ic} bg={`${n.ic}16`}>{n.tag}</Badge>
              <div style={{ flex:1 }}>
                <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:700, color:T.dark, lineHeight:1.5 }}>{n.title}</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:12, color:T.textLight }}>{n.time}</span>
                  <Badge color={n.impact==="Positive"?T.brand:n.impact==="Rising"?T.blue:T.amber}
                    bg={n.impact==="Positive"?T.brandPale:n.impact==="Rising"?T.bluePale:T.amberPale}>
                    {n.impact}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background:`linear-gradient(160deg,${T.dark2},${T.dark})`, padding:"72px 32px" }}>
        <div style={{ maxWidth:740, margin:"0 auto", textAlign:"center" }}>
          <p style={{ margin:"0 0 8px", fontSize:12, fontWeight:800, color:T.brandLight, letterSpacing:2, textTransform:"uppercase" }}>
            Trusted by Farmers
          </p>
          <h2 style={{ margin:"0 0 10px", fontSize:32, fontWeight:900, color:T.white, letterSpacing:-0.5 }}>
            Real Results. Real Farmers.
          </h2>
          <p style={{ margin:"0 0 40px", color:"rgba(255,255,255,0.4)", fontSize:14 }}>
            Across India
          </p>

          {/* Card */}
          <div style={{
            background:"rgba(255,255,255,0.05)", borderRadius:22, padding:40,
            border:"1.5px solid rgba(116,198,157,0.15)",
            boxShadow:`0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}>
            <div style={{ fontSize:50, color:T.gold, marginBottom:16, opacity:0.4 }}>"</div>
            <p style={{ margin:"0 0 28px", fontSize:17, color:"rgba(255,255,255,0.85)", lineHeight:1.75, fontStyle:"italic" }}>
              {TESTIMONIALS[activeTestimonial].quote}
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
              <div style={{
                width:48, height:48, borderRadius:"50%", fontWeight:900, fontSize:15,
                background:`linear-gradient(135deg,${T.gold},${T.amber})`,
                display:"flex", alignItems:"center", justifyContent:"center", color:T.dark,
              }}>{TESTIMONIALS[activeTestimonial].avatar}</div>
              <div style={{ textAlign:"left" }}>
                <p style={{ margin:0, fontWeight:800, color:T.white, fontSize:14 }}>
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p style={{ margin:"2px 0 4px", fontSize:12, color:T.brandLight }}>
                  {TESTIMONIALS[activeTestimonial].loc} · {TESTIMONIALS[activeTestimonial].crop}
                </p>
                <div style={{ display:"flex", gap:3 }}>
                  {Array.from({length:5}).map((_,i) => (
                    <span key={i} style={{ color: i<TESTIMONIALS[activeTestimonial].rating?"#f4a261":"rgba(255,255,255,0.2)", fontSize:14 }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:24 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                height:8, width: i===activeTestimonial ? 28 : 8,
                borderRadius:8, border:"none", cursor:"pointer", transition:"all 0.3s",
                background: i===activeTestimonial ? T.gold : "rgba(255,255,255,0.2)",
              }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ALERTS ── */}
      <div style={S.section}>
        <h2 style={S.secTitle}>🤖 AI Alerts & Insights</h2>
        <p style={S.secSub}>Smart signals powered by machine learning</p>
        <AlertBox/>
      </div>

      {/* ── FOOTER ── */}
      <Footer/>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ping    { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.8);opacity:0} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.5} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:#f0faf2; }
        ::-webkit-scrollbar-thumb { background:#74c69d; border-radius:3px; }
      `}</style>
    </div>
  );
}