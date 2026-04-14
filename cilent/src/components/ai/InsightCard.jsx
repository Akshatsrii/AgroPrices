import React, { useState } from "react";

const BADGE_STYLES = {
  "Market Trend":  { bg: "#f0f7f0", text: "#1f4d2c", icon: "📈" },
  "Weather Alert": { bg: "#fef3e2", text: "#9a4e08", icon: "⛈️" },
  "Policy Update": { bg: "#eff6ff", text: "#1d4ed8", icon: "📋" },
  "Export News":   { bg: "#f5f0fd", text: "#5a2da0", icon: "🚢" },
};

function SentimentTag({ sentiment }) {
  const map = {
    up:      { label: "▲ Positive", color: "#16a34a" },
    down:    { label: "▼ Negative", color: "#dc2626" },
    neutral: { label: "— Neutral",  color: "#7a9485" },
  };
  const { label, color } = map[sentiment] ?? map.neutral;
  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, color, display: "flex",
                   alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

export default function InsightCard({ insight }) {
  const [hovered, setHovered] = useState(false);
  const { category, title, summary, crops = [], sentiment, time, source } = insight;
  const style = BADGE_STYLES[category] ?? BADGE_STYLES["Market Trend"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          border: `1px solid ${hovered ? "#a8d5b5" : "rgba(30,60,30,.09)"}`,
          borderRadius: 16,
          padding: "18px 20px",
          marginBottom: 12,
          cursor: "pointer",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? "0 6px 20px rgba(30,70,30,.08)" : "none",
          transition: "transform .18s, border-color .18s, box-shadow .18s",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Top row: icon + content */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          {/* Category icon */}
          <div style={{ width: 40, height: 40, borderRadius: 10, background: style.bg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 17, flexShrink: 0 }}>
            {style.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Badge row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center",
                          gap: 7, marginBottom: 6 }}>
              <span style={{
                fontSize: 10.5, fontWeight: 700, letterSpacing: ".3px",
                padding: "3px 9px", borderRadius: 50,
                background: style.bg, color: style.text,
              }}>
                {category}
              </span>
              {source && (
                <span style={{ fontSize: 11, color: "#7a9485" }}>via {source}</span>
              )}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Lora', serif",
              fontSize: 15, fontWeight: 600,
              color: "#143320", lineHeight: 1.45,
              margin: "0 0 6px",
            }}>
              {title}
            </h3>

            {/* Summary */}
            <p style={{ fontSize: 13, color: "#4a6352", lineHeight: 1.65, margin: 0 }}>
              {summary}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
          marginTop: 13, paddingTop: 12,
          borderTop: "1px solid #f0f7f0",
        }}>
          {/* Crop tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {crops.slice(0, 3).map((c) => (
              <span key={c} style={{
                fontSize: 11, background: "#f0f7f0", color: "#1f4d2c",
                padding: "2px 9px", borderRadius: 50,
              }}>
                {c}
              </span>
            ))}
          </div>

          {/* Sentiment + time */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <SentimentTag sentiment={sentiment} />
            <span style={{ fontSize: 11.5, color: "#7a9485" }}>{time}</span>
          </div>
        </div>
      </div>
    </>
  );
}