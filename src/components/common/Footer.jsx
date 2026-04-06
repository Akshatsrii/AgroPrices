import React, { useState, useEffect } from "react";

// ── Inject fonts + keyframes once ──────────────────────────
const injectStyles = () => {
  if (document.getElementById("footer-styles")) return;
  const el = document.createElement("style");
  el.id = "footer-styles";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes floatUp {
      0%   { transform: translateY(0) rotate(0deg); opacity: 0.4; }
      100% { transform: translateY(-120px) rotate(20deg); opacity: 0; }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(45,106,79,0.35); }
      50%       { box-shadow: 0 0 0 8px rgba(45,106,79,0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .footer-link {
      color: #2d6a4f;
      text-decoration: none;
      font-size: 13px;
      transition: color 0.2s, padding-left 0.2s;
      display: block;
      padding: 5px 0;
    }
    .footer-link:hover { color: #1b4332; padding-left: 6px; }
    .social-btn {
      width: 38px; height: 38px;
      background: #f0f9f1;
      border: 1px solid #b7e4c7;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      text-decoration: none;
    }
    .social-btn:hover { background: #d8f3dc; transform: translateY(-3px); }
    .stat-pill {
      background: #d8f3dc;
      border: 1px solid #b7e4c7;
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 11px;
      color: #1b4332;
      font-weight: 600;
      white-space: nowrap;
    }
    .sub-input::placeholder { color: #95d5b2; }
    .sub-input:focus { outline: none; border-color: #2d6a4f; }
    .footer-col { animation: fadeSlideUp 0.5s ease both; }
    .footer-col:nth-child(1) { animation-delay: 0.05s; }
    .footer-col:nth-child(2) { animation-delay: 0.15s; }
    .footer-col:nth-child(3) { animation-delay: 0.25s; }
    .footer-col:nth-child(4) { animation-delay: 0.35s; }
  `;
  document.head.appendChild(el);
};

// ── Floating grain particle ─────────────────────────────────
function GrainParticle({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#52b788",
        opacity: 0.3,
        animation: `floatUp ${3 + Math.random() * 4}s ease-in infinite`,
        animationDelay: `${Math.random() * 5}s`,
        ...style,
      }}
    />
  );
}

// ── Live price ticker items ─────────────────────────────────
const TICKER_ITEMS = [
  { name: "Wheat",      price: "₹2,140", change: "+1.2%" },
  { name: "Rice",       price: "₹3,450", change: "+0.8%" },
  { name: "Tomato",     price: "₹1,890", change: "-2.1%" },
  { name: "Onion",      price: "₹980",   change: "+3.4%" },
  { name: "Cotton",     price: "₹6,700", change: "+0.5%" },
  { name: "Soybean",    price: "₹4,210", change: "-0.9%" },
  { name: "Maize",      price: "₹1,560", change: "+1.7%" },
  { name: "Potato",     price: "₹1,120", change: "+2.3%" },
  { name: "Sugarcane",  price: "₹3,300", change: "-0.4%" },
  { name: "Mustard",    price: "₹5,800", change: "+0.6%" },
];

// ── Newsletter sub-form ─────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleSubmit = () => {
    if (!email.includes("@")) { setStatus("error"); return; }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <div>
      <p style={{ fontSize: 12, color: "#52b788", marginBottom: 10, lineHeight: 1.6 }}>
        Get daily commodity price alerts & agri-market insights delivered to your inbox.
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          className="sub-input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            flex: 1,
            padding: "9px 14px",
            background: "#ffffff",
            border: "1px solid #b7e4c7",
            borderRadius: 8,
            color: "#1b4332",
            fontSize: 12,
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "9px 16px",
            background: "#2d6a4f",
            color: "#ffffff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            animation: "pulse-glow 2s infinite",
            whiteSpace: "nowrap",
          }}
        >
          Subscribe
        </button>
      </div>
      {status === "success" && (
        <p style={{ fontSize: 11, color: "#2d6a4f", marginTop: 8 }}>
          ✅ Subscribed! Check your inbox soon.
        </p>
      )}
      {status === "error" && (
        <p style={{ fontSize: 11, color: "#c0392b", marginTop: 8 }}>
          ⚠️ Please enter a valid email address.
        </p>
      )}
    </div>
  );
}

// ── MAIN FOOTER ─────────────────────────────────────────────
function Footer() {
  injectStyles();

  const [year] = useState(new Date().getFullYear());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", { hour12: true });
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <footer style={{
      background: "#f0f9f1",           // light mint page bg
      borderTop: "1px solid #b7e4c7",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── Floating grain particles (decorative) ── */}
      {[...Array(10)].map((_, i) => (
        <GrainParticle key={i} style={{ left: `${i * 10 + 2}%`, bottom: "10%" }} />
      ))}

      {/* ── SVG Wave Divider ── */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1080 80" style={{ display: "block", width: "100%", height: 50 }} preserveAspectRatio="none">
          <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 L1080,80 L0,80 Z" fill="#e8f5e9" />
        </svg>
      </div>

      {/* ── Live price ticker strip ── */}
      <div style={{
        background: "#ffffff",
        borderTop: "1px solid #b7e4c7",
        borderBottom: "1px solid #b7e4c7",
        padding: "9px 0",
        overflow: "hidden",
        position: "relative",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{
            background: "#2d6a4f",        // deep green badge
            color: "#ffffff",
            padding: "4px 16px",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: 1.5,
            whiteSpace: "nowrap",
            zIndex: 2,
            flexShrink: 0,
            textTransform: "uppercase",
          }}>
            🌾 LIVE PRICES
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{
              display: "flex",
              gap: 32,
              animation: "ticker 28s linear infinite",
              width: "max-content",
            }}>
              {doubled.map((item, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                  <span style={{ color: "#1b4332", fontWeight: 600, fontSize: 12 }}>{item.name}</span>
                  <span style={{ color: "#2d6a4f", fontSize: 12 }}>{item.price}</span>
                  <span style={{
                    fontSize: 11,
                    color: item.change.startsWith("+") ? "#1b7a3e" : "#c0392b",
                    fontWeight: 700,
                  }}>{item.change}</span>
                  <span style={{ color: "#b7e4c7", fontSize: 14 }}>|</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "48px 28px 32px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 40,
      }}>

        {/* Col 1 — Brand */}
        <div className="footer-col">
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            fontWeight: 900,
            color: "#1b4332",
            marginBottom: 6,
          }}>
            🌾 AgroPrice AI
          </div>
          <p style={{ fontSize: 11, color: "#52b788", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
            Live Market Intelligence
          </p>
          <p style={{ fontSize: 13, color: "#2d6a4f", lineHeight: 1.8, marginBottom: 18 }}>
            Empowering farmers & traders with real-time commodity price data from mandis across India.
          </p>

          {/* Stats pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span className="stat-pill">📊 500+ Mandis</span>
            <span className="stat-pill">🗺️ 28 States</span>
            <span className="stat-pill">🌾 200+ Crops</span>
          </div>

          {/* Live clock */}
          <div style={{
            marginTop: 18,
            background: "#ffffff",
            border: "1px solid #b7e4c7",
            borderRadius: 10,
            padding: "10px 14px",
            display: "inline-block",
            boxShadow: "0 1px 4px rgba(52,168,83,0.07)",
          }}>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#2d6a4f",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: 2,
            }}>
              {timeStr}
            </div>
            <div style={{ fontSize: 10, color: "#74c69d", marginTop: 2 }}>
              Market Time · IST
            </div>
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="footer-col">
          <h3 style={{
            fontSize: 11,
            color: "#2d6a4f",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 16,
            fontWeight: 700,
          }}>
            Quick Links
          </h3>
          {[
            { label: "🏠 Dashboard",         href: "/" },
            { label: "📈 Price Trends",       href: "/trends" },
            { label: "🌾 Crop Directory",     href: "/crops" },
            { label: "🏪 Mandi Locator",      href: "/mandis" },
            { label: "📅 Market Calendar",    href: "/calendar" },
            { label: "📰 Agri News",          href: "/news" },
            { label: "🤖 AI Price Forecast",  href: "/forecast" },
            { label: "📊 Export Data (CSV)",  href: "/export" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
          ))}
        </div>

        {/* Col 3 — Resources & Contact */}
        <div className="footer-col">
          <h3 style={{
            fontSize: 11,
            color: "#2d6a4f",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 16,
            fontWeight: 700,
          }}>
            Resources
          </h3>
          {[
            { label: "📖 API Documentation", href: "/docs" },
            { label: "🔐 Login / Register",  href: "/auth" },
            { label: "🛡️ Privacy Policy",    href: "/privacy" },
            { label: "📜 Terms of Service",  href: "/terms" },
            { label: "🤝 Partner with Us",   href: "/partner" },
            { label: "💬 Feedback",          href: "/feedback" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
          ))}

          <h3 style={{
            fontSize: 11,
            color: "#2d6a4f",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginTop: 24,
            marginBottom: 12,
            fontWeight: 700,
          }}>
            Contact
          </h3>
          <p style={{ fontSize: 12, color: "#2d6a4f", lineHeight: 2 }}>
            📧 support@agroprice.ai<br />
            📞 +91 98765 43210<br />
            📍 New Delhi, India
          </p>
        </div>

        {/* Col 4 — Newsletter + Social */}
        <div className="footer-col">
          <h3 style={{
            fontSize: 11,
            color: "#2d6a4f",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 16,
            fontWeight: 700,
          }}>
            📬 Price Alerts
          </h3>
          <NewsletterForm />

          <h3 style={{
            fontSize: 11,
            color: "#2d6a4f",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginTop: 28,
            marginBottom: 12,
            fontWeight: 700,
          }}>
            Follow Us
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { icon: "𝕏",  label: "Twitter",   href: "#" },
              { icon: "in", label: "LinkedIn",   href: "#" },
              { icon: "▶",  label: "YouTube",    href: "#" },
              { icon: "📘", label: "Facebook",   href: "#" },
              { icon: "📸", label: "Instagram",  href: "#" },
            ].map((s) => (
              <a key={s.label} href={s.href} className="social-btn" title={s.label} style={{ color: "#2d6a4f" }}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* Data source badge */}
          <div style={{
            marginTop: 24,
            background: "#ffffff",
            border: "1px solid #b7e4c7",
            borderRadius: 10,
            padding: "12px 14px",
            boxShadow: "0 1px 4px rgba(52,168,83,0.07)",
          }}>
            <div style={{ fontSize: 10, color: "#74c69d", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Data Sources
            </div>
            <div style={{ fontSize: 12, color: "#1b4332", fontWeight: 600 }}>🏛️ Agmarknet · eNAM</div>
            <div style={{ fontSize: 11, color: "#52b788", marginTop: 4 }}>
              Ministry of Agriculture, GoI
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: "1px solid #b7e4c7",
        padding: "16px 28px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        maxWidth: 1200,
        margin: "0 auto",
        background: "#e8f5e9",         // slightly deeper mint strip
      }}>
        <div style={{ fontSize: 12, color: "#52b788" }}>
          © {year} <span style={{ color: "#1b4332", fontWeight: 600 }}>AgroPrice AI</span>. All rights reserved.
          &nbsp;·&nbsp; Built for Bharat's farmers 🇮🇳
        </div>
        <div style={{
          fontSize: 12,
          background: "linear-gradient(90deg, #2d6a4f, #52b788, #2d6a4f)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 3s linear infinite",
          fontWeight: 700,
          letterSpacing: 1,
        }}>
          Prices update every 5 minutes · Live Data ●
        </div>
      </div>
    </footer>
  );
}

export default Footer;