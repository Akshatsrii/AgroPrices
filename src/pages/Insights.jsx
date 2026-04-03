import React, { useState, useEffect } from "react";
import { DUMMY_INSIGHTS } from "../data/dummyData";
import InsightCard from "../components/ai/InsightCard";
import AlertBox from "../components/ai/AlertBox";
import { CROPS_LIST } from "../data/cropsList";

const CATEGORIES = ["All", "Market Trend", "Weather Alert", "Policy Update", "Export News"];
const PAGE_SIZE = 5;

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCrop,     setActiveCrop]     = useState("All");
  const [search,         setSearch]         = useState("");
  const [showAll,        setShowAll]         = useState(false);
  const [mounted,        setMounted]         = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 150); }, []);

  const topCrops = CROPS_LIST.slice(0, 8);

  const filtered = DUMMY_INSIGHTS.filter((ins) => {
    const matchCat    = activeCategory === "All" || ins.category === activeCategory;
    const matchCrop   = activeCrop === "All" || ins.crops?.includes(activeCrop.toLowerCase());
    const matchSearch = !search
      || ins.title.toLowerCase().includes(search.toLowerCase())
      || ins.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchCrop && matchSearch;
  });

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);

  return (
    <>
      {/* ── font import ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .ins-page { font-family: 'DM Sans', sans-serif; }

        /* pill buttons */
        .pill-cat  { padding: 5px 14px; border-radius: 50px; font-size: 12px; font-weight: 500;
                     cursor: pointer; border: 1.5px solid #a8d5b5; color: #1f4d2c;
                     background: transparent; transition: all .18s; }
        .pill-cat.active, .pill-cat:hover
                   { background: #1f4d2c; color: #fff; border-color: #1f4d2c; }

        .pill-crop { padding: 5px 12px; border-radius: 50px; font-size: 12px;
                     cursor: pointer; border: 1.5px solid transparent; color: #4a6352;
                     background: transparent; transition: all .18s; }
        .pill-crop.active, .pill-crop:hover
                   { background: #f8c840; color: #0a1f13; border-color: #f8c840; font-weight: 600; }

        /* search */
        .ins-search { width: 100%; padding: 10px 14px 10px 38px; font-family: 'DM Sans', sans-serif;
                      font-size: 13.5px; border: 1.5px solid rgba(30,60,30,.1);
                      border-radius: 12px; background: #faf8f3; color: #1a2e1a;
                      outline: none; transition: border-color .2s; }
        .ins-search:focus { border-color: #2e6b3e; }
        .ins-search::placeholder { color: #7a9485; }

        /* outline button */
        .btn-ins-outline { background: transparent; border: 1.5px solid #2e6b3e;
                           color: #1f4d2c; font-family: 'DM Sans', sans-serif;
                           font-size: 13px; font-weight: 500;
                           padding: 8px 22px; border-radius: 50px; cursor: pointer;
                           transition: all .18s; }
        .btn-ins-outline:hover { background: #1f4d2c; color: #fff; }

        /* stagger-in animation */
        @keyframes ins-fadeup {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .ins-animate { animation: ins-fadeup .35s ease both; }

        /* animated bar */
        .snap-bar { height: 3px; border-radius: 2px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }

        /* live pulse */
        @keyframes ins-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .live-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%;
                    background: #22c55e; margin-right: 5px; animation: ins-pulse 2s infinite; }
      `}</style>

      <div className="ins-page" style={{ padding: "28px 20px 64px", maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 600,
                       color: "#143320", letterSpacing: "-0.4px", margin: 0 }}>
            Market Insights
          </h1>
          <p style={{ fontSize: 13, color: "#4a6352", marginTop: 5, lineHeight: 1.5 }}>
            AI-curated news, policy updates, and weather advisories relevant to Indian crop markets.
          </p>
        </div>

        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 22,
                      "@media(max-width:900px)": { gridTemplateColumns: "1fr" } }}>

          {/* ─── Main column ─────────────────────────────────────────────── */}
          <div>
            {/* Filters card */}
            <div style={{ background: "#fff", border: "1px solid rgba(30,60,30,.09)",
                          borderRadius: 16, padding: "18px 20px", marginBottom: 14 }}>
              {/* Search */}
              <div style={{ position: "relative", marginBottom: 14 }}>
                <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                              color: "#7a9485", pointerEvents: "none" }}
                     width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search insights…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowAll(false); }}
                  className="ins-search"
                />
              </div>

              {/* Category pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`pill-cat${activeCategory === cat ? " active" : ""}`}
                    onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #f0f7f0", marginBottom: 12 }} />

              {/* Crop pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <button
                  className={`pill-crop${activeCrop === "All" ? " active" : ""}`}
                  onClick={() => { setActiveCrop("All"); setShowAll(false); }}
                >
                  All Crops
                </button>
                {topCrops.map((c) => (
                  <button
                    key={c.id}
                    className={`pill-crop${activeCrop === c.name ? " active" : ""}`}
                    onClick={() => { setActiveCrop(c.name); setShowAll(false); }}
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count */}
            <p style={{ fontSize: 12.5, color: "#4a6352", fontWeight: 500, marginBottom: 12 }}>
              {filtered.length} insight{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && ` in "${activeCategory}"`}
              {activeCrop !== "All" && ` for ${activeCrop}`}
            </p>

            {/* Insight cards */}
            {filtered.length > 0 ? (
              <>
                <div>
                  {visible.map((ins, i) => (
                    <div
                      key={ins.id}
                      className="ins-animate"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <InsightCard insight={ins} />
                    </div>
                  ))}
                </div>

                {filtered.length > PAGE_SIZE && (
                  <div style={{ textAlign: "center", marginTop: 18 }}>
                    <button className="btn-ins-outline" onClick={() => setShowAll((v) => !v)}>
                      {showAll
                        ? "Show Less"
                        : `Load ${filtered.length - PAGE_SIZE} More Insight${filtered.length - PAGE_SIZE !== 1 ? "s" : ""}`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ background: "#fff", border: "1px solid rgba(30,60,30,.09)",
                            borderRadius: 16, padding: "52px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 16, color: "#143320",
                            fontWeight: 600, marginBottom: 6 }}>No insights found</p>
                <p style={{ fontSize: 13, color: "#4a6352", marginBottom: 18 }}>
                  Try adjusting your category, crop, or search filters.
                </p>
                <button
                  className="btn-ins-outline"
                  onClick={() => { setActiveCategory("All"); setActiveCrop("All"); setSearch(""); }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* ─── Sidebar ─────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Live Advisories */}
            <AlertBox />

            {/* Market Snapshot */}
            <div style={{ background: "#fff", border: "1px solid rgba(30,60,30,.09)",
                          borderRadius: 16, padding: 18 }}>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 600,
                           color: "#143320", marginBottom: 16 }}>
                📊 Market Snapshot
              </h3>
              {[
                { label: "Crops with +5% gain",   value: "8", color: "#16a34a", bar: 0.72 },
                { label: "Crops below MSP",        value: "3", color: "#dc2626", bar: 0.25 },
                { label: "Weather-affected crops", value: "5", color: "#d97706", bar: 0.45 },
                { label: "Policy updates today",   value: "2", color: "#2563eb", bar: 0.18 },
              ].map(({ label, value, color, bar }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between",
                                          alignItems: "center", padding: "10px 0",
                                          borderBottom: "1px solid #f0f7f0" }}
                     className={label === "Policy updates today" ? "" : ""}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div style={{ fontSize: 12.5, color: "#4a6352", marginBottom: 5 }}>{label}</div>
                    <div style={{ height: 3, background: "#d4edda", borderRadius: 2, overflow: "hidden" }}>
                      <div className="snap-bar"
                           style={{ width: mounted ? `${bar * 100}%` : "0%", background: color }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: 22,
                                 fontWeight: 600, color, flexShrink: 0 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Data Sources */}
            <div style={{ background: "#fff", border: "1px solid rgba(30,60,30,.09)",
                          borderRadius: 16, padding: 18 }}>
              <h3 style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 600,
                           color: "#143320", marginBottom: 14 }}>
                🔗 Data Sources
              </h3>
              {[
                { name: "AGMARKNET", type: "Price Data",    status: "live"  },
                { name: "eNAM",      type: "Digital Mandi", status: "live"  },
                { name: "IMD",       type: "Weather",       status: "live"  },
                { name: "CACP",      type: "MSP Policy",    status: "daily" },
                { name: "APEDA",     type: "Export Data",   status: "daily" },
              ].map(({ name, type, status }) => (
                <div key={name} style={{ display: "flex", alignItems: "center",
                                         justifyContent: "space-between", padding: "8px 0",
                                         borderBottom: "1px solid #f0f7f0" }}>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: "#1a2e1a" }}>{name}</div>
                    <div style={{ fontSize: 11, color: "#7a9485", marginTop: 1 }}>{type}</div>
                  </div>
                  <span style={{
                    fontSize: 10.5, fontWeight: 600, padding: "3px 10px", borderRadius: 50,
                    background: status === "live" ? "#dcfce7" : "#fef9c3",
                    color:      status === "live" ? "#166534" : "#854d0e",
                    display: "flex", alignItems: "center",
                  }}>
                    {status === "live" && <span className="live-dot" />}
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}