import React, { useState } from "react";
import { DUMMY_ALERTS } from "../../data/dummyData";

const ALERT_CONFIG = {
  critical: {
    label:  "🔴 Critical",
    color:  "#dc2626",
    bg:     "#fee2e2",
  },
  warning: {
    label:  "🟡 Warning",
    color:  "#d97706",
    bg:     "#fef9c3",
  },
  info: {
    label:  "🔵 Info",
    color:  "#2563eb",
    bg:     "#dbeafe",
  },
}; 

function AlertItem({ alert, index }) {
  const config = ALERT_CONFIG[alert.type] ?? ALERT_CONFIG.info;
  return (
    <div style={{
      padding: "13px 16px",
      borderBottom: "1px solid rgba(30,60,30,.07)",
      animation: `alertIn .3s ease both`,
      animationDelay: `${index * 80}ms`,
    }}>
      {/* Type label */}
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".8px",
        textTransform: "uppercase", color: config.color,
        marginBottom: 4,
      }}>
        {config.label}
      </div>

      {/* Message */}
      <p style={{
        fontSize: 12.5, color: "#1a2e1a", lineHeight: 1.55, margin: "0 0 4px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {alert.message}
      </p>

      {/* Location */}
      {alert.location && (
        <div style={{ fontSize: 11, color: "#7a9485" }}>
          📍 {alert.location}
        </div>
      )}
    </div>
  );
}

export default function AlertBox() {
  const [expanded, setExpanded] = useState(true);
  const alerts = DUMMY_ALERTS ?? [];
  const activeCount = alerts.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');

        @keyframes alertIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0);    }
        }

        .alert-toggle:hover { opacity: .8; }
      `}</style>

      <div style={{
        background: "#fff",
        border: "1px solid rgba(30,60,30,.09)",
        borderRadius: 16,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Header */}
        <div
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: "#143320",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 9,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{
            fontFamily: "'Lora', serif",
            fontSize: 14, fontWeight: 600, color: "#fff",
          }}>
            Live Advisories
          </span>

          {/* Count badge */}
          <span style={{
            marginLeft: "auto",
            background: "rgba(255,255,255,.15)",
            color: "#fff",
            fontSize: 10.5, fontWeight: 600,
            padding: "2px 9px", borderRadius: 50,
          }}>
            {activeCount} Active
          </span>

          {/* Chevron */}
          <svg
            className="alert-toggle"
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="#fff" strokeWidth="2.5"
            style={{ transition: "transform .2s",
                     transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                     flexShrink: 0 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Alert list */}
        {expanded && (
          <div>
            {alerts.length > 0
              ? alerts.map((alert, i) => (
                  <AlertItem key={alert.id ?? i} alert={alert} index={i} />
                ))
              : (
                <div style={{ padding: "20px 16px", textAlign: "center",
                              fontSize: 13, color: "#7a9485" }}>
                  No active advisories.
                </div>
              )
            }
          </div>
        )}
      </div>
    </>
  );
}




