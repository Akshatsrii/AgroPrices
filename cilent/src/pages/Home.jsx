import React, { useState, useEffect, useCallback } from "react";
import { fetchDashboardStats } from "../services/api.js";

// ── Google Fonts ────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@500;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ── Real-Time Clock Hook ─────────────────────────────────────
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// ── Dashboard Stats Hook ─────────────────────────────────────
function useDashboardStats() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDashboardStats();
      setData(res);
      setLastRefresh(new Date());
    } catch (err) {
      setError("Failed to fetch market data. Retrying...");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  return { data, loading, error, lastRefresh, refetch: load };
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div style={{ ...styles.statCard }}>
      <div style={{ ...styles.statIconWrapper, background: `${accent}20`, color: accent }}>{icon}</div>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={{ ...styles.statValue }}>{value}</div>
      </div>
    </div>
  );
}

// ── Crop Card ─────────────────────────────────────────────────
function CropCard({ item }) {
  const price = Number(item.modal_price);
  const badgeColor =
    price > 3000 ? "#ff9f1c" : price > 1500 ? "#2ec4b6" : "#caffbf";

  return (
    <div className="crop-card" style={styles.cropCard}>
      <div style={styles.cropInner}>
        <div style={styles.cropHeader}>
          <span style={styles.cropName}>🌿 {item.commodity}</span>
          <span style={{ ...styles.priceBadge, background: `${badgeColor}15`, color: badgeColor, border: `1px solid ${badgeColor}40` }}>
            ₹{item.modal_price}
          </span>
        </div>
        <div style={styles.cropMeta}>
          <span><span style={styles.iconOp}>🏪</span> {item.market}</span>
          <span><span style={styles.iconOp}>📍</span> {item.district}</span>
          <span><span style={styles.iconOp}>🗺️</span> {item.state}</span>
        </div>
        <div style={styles.cropFooter}>
          <span style={styles.cropDate}>📅 {item.arrival_date}</span>
          {item.min_price && (
            <span style={styles.priceRange}>
              ₹{item.min_price} – ₹{item.max_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────
const Home = () => {
  const { data, loading, error, lastRefresh, refetch } = useDashboardStats();
  const now = useClock();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterState, setFilterState] = useState("All");
  const [page, setPage] = useState(1);
  const PER_PAGE = 18;

  const totalCrops = data.length;
  const avgPrice = data.length
    ? Math.round(data.reduce((s, d) => s + Number(d.modal_price || 0), 0) / data.length)
    : 0;
  const uniqueMarkets = new Set(data.map((d) => d.market)).size;
  const uniqueStates = [...new Set(data.map((d) => d.state))].filter(Boolean);

  let filtered = data.filter(
    (item) =>
      (item.commodity?.toLowerCase().includes(search.toLowerCase()) ||
        item.market?.toLowerCase().includes(search.toLowerCase()) ||
        item.district?.toLowerCase().includes(search.toLowerCase()) ||
        item.state?.toLowerCase().includes(search.toLowerCase())) &&
      (filterState === "All" || item.state === filterState)
  );

  if (sortBy === "price_asc")
    filtered = [...filtered].sort((a, b) => a.modal_price - b.modal_price);
  else if (sortBy === "price_desc")
    filtered = [...filtered].sort((a, b) => b.modal_price - a.modal_price);
  else if (sortBy === "name")
    filtered = [...filtered].sort((a, b) =>
      a.commodity?.localeCompare(b.commodity)
    );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const timeStr = now.toLocaleTimeString("en-IN", { hour12: true });
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={styles.root}>
      {/* ── Dynamic Ambient Backgrounds ── */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      
      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={styles.logoBadge}>A</div>
          <div>
            <h1 style={styles.logo}>AgroPrice AI</h1>
            <p style={styles.tagline}>Live Commodity Market Intelligence</p>
          </div>
        </div>
        <div style={styles.clockBox}>
          <div style={styles.clockDate}>{dateStr}</div>
          <div style={styles.clockTime}>{timeStr}</div>
        </div>
      </div>

      {/* ── Body Layout ── */}
      <div style={styles.body}>
        {/* ── Sidebar ── */}
        <aside style={styles.sidebar}>
          <div className="glass-panel" style={styles.sidePanel}>
            <div style={styles.sideSectionTitle}>Territories</div>
            <div style={styles.statesWrapper}>
              {["All", ...uniqueStates].map((s) => (
                <div
                  key={s}
                  onClick={() => { setFilterState(s); setPage(1); }}
                  style={{
                    ...styles.stateItem,
                    ...(filterState === s ? styles.stateItemActive : {}),
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            
            <button onClick={refetch} style={styles.refreshBtn} disabled={loading}>
              <span className="icon">🔄</span> {loading ? "Syncing..." : "Live Market Sync"}
            </button>
            {lastRefresh && (
              <div style={styles.refreshNote}>
                Last sync: {lastRefresh.toLocaleTimeString("en-IN", { hour12: true })}
              </div>
            )}
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={styles.main}>
          <div style={styles.statsRow}>
            <StatCard icon="🌾" label="Total Records" value={totalCrops} accent="#06d6a0" />
            <StatCard icon="💰" label="Avg Modal Price" value={`₹${avgPrice}`} accent="#ffd166" />
            <StatCard icon="🏪" label="Markets" value={uniqueMarkets} accent="#118ab2" />
            <StatCard icon="🗺️" label="States" value={uniqueStates.length} accent="#ef476f" />
          </div>

          <div style={styles.controlsGrid}>
            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search commodity, market, district, state..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={styles.searchInput}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              style={styles.sortSelect}
            >
              <option value="default">Sort: Default</option>
              <option value="name">Sort: Name A-Z</option>
              <option value="price_asc">Sort: Price ↑</option>
              <option value="price_desc">Sort: Price ↓</option>
            </select>
          </div>

          {loading && (
            <div style={styles.statusBox}>
              <div style={styles.spinner} />
              <span>Fetching live market prices...</span>
            </div>
          )}
          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          {!loading && (
            <div style={styles.resultsInfo}>
              Showing <span style={{color: "#06d6a0"}}>{paginated.length}</span> of {filtered.length} results
              {filterState !== "All" && ` in ${filterState}`}
              {search && ` for "${search}"`}
            </div>
          )}

          <div style={styles.grid}>
            {paginated.map((item, i) => (
              <CropCard key={i} item={item} />
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: 64, opacity: 0.8, marginBottom: 16 }}>🌿</div>
              <p style={{ fontSize: 18, fontWeight: 300, color: '#a0aab2' }}>No crops found. Adjust search parameters.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={styles.pageBtn}
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{ ...styles.pageBtn, ...(page === p ? styles.pageBtnActive : {}) }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={styles.pageBtn}
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ── STYLES — Ultra Premium Dark Glassmorphism ────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#0B0E14",
    color: "#E2E8F0",
    fontFamily: "'Outfit', 'Segoe UI', sans-serif",
    position: "relative",
    overflowX: "hidden"
  },
  blob1: {
    position: "absolute",
    top: "-15%", left: "-5%",
    width: "40vw", height: "40vw",
    background: "radial-gradient(circle, rgba(6,214,160,0.15) 0%, rgba(0,0,0,0) 70%)",
    zIndex: 0,
    filter: "blur(60px)",
    pointerEvents: "none"
  },
  blob2: {
    position: "absolute",
    bottom: "-10%", right: "-10%",
    width: "50vw", height: "50vw",
    background: "radial-gradient(circle, rgba(17,138,178,0.1) 0%, rgba(0,0,0,0) 70%)",
    zIndex: 0,
    filter: "blur(80px)",
    pointerEvents: "none"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "rgba(11, 14, 20, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoBadge: {
    width: "48px", height: "48px",
    background: "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
    borderRadius: "12px",
    display: "flex", justifyContent: "center", alignItems: "center",
    fontSize: "24px", fontWeight: 800, color: "#fff",
    boxShadow: "0 4px 20px rgba(6,214,160,0.3)"
  },
  logo: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "0.5px",
    margin: 0,
    background: "linear-gradient(90deg, #fff 0%, #a0aab2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  tagline: {
    fontSize: "12px",
    color: "#06d6a0",
    margin: "2px 0 0 0",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontWeight: 600
  },
  clockBox: { textAlign: "right" },
  clockTime: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "1px",
  },
  clockDate: { 
    fontSize: "12px", 
    color: "#a0aab2", 
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px"
  },
  refreshNote: { fontSize: "11px", color: "#64748b", marginTop: "12px", textAlign: "center" },
  refreshBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "12px 16px",
    background: "rgba(6, 214, 160, 0.1)",
    color: "#06d6a0",
    border: "1px solid rgba(6, 214, 160, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.3s ease",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
  },
  body: { display: "flex", minHeight: "calc(100vh - 89px)", position: "relative", zIndex: 1 },
  sidebar: {
    width: "280px",
    padding: "30px 20px",
    borderRight: "1px solid rgba(255, 255, 255, 0.05)",
  },
  sidePanel: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "24px 20px",
    backdropFilter: "blur(12px)",
  },
  sideSectionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "16px",
    fontWeight: 600,
  },
  statesWrapper: {
    maxHeight: "40vh",
    overflowY: "auto",
    paddingRight: "8px",
    display: "flex", flexDirection: "column", gap: "4px"
  },
  stateItem: {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#94a3b8",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  stateItemActive: {
    background: "rgba(6, 214, 160, 0.15)",
    color: "#06d6a0",
    fontWeight: 600,
  },
  main: { flex: 1, padding: "30px 40px", overflowY: "auto" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  statCard: {
    background: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    transition: "transform 0.3s ease, background 0.3s ease",
  },
  statIconWrapper: {
    width: "48px", height: "48px",
    borderRadius: "12px",
    display: "flex", justifyContent: "center", alignItems: "center",
    fontSize: "20px"
  },
  statLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px"
  },
  statValue: { 
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "28px", 
    fontWeight: 700, 
    color: "#fff" 
  },
  controlsGrid: { display: "grid", gridTemplateColumns: "1fr 200px", gap: "16px", marginBottom: "24px" },
  searchWrapper: {
    position: "relative",
    display: "flex", alignItems: "center"
  },
  searchIcon: { position: "absolute", left: "16px", opacity: 0.5 },
  searchInput: {
    width: "100%",
    padding: "14px 16px 14px 44px",
    background: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  sortSelect: {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
    backdropFilter: "blur(10px)",
  },
  resultsInfo: { fontSize: "14px", color: "#64748b", marginBottom: "20px", fontWeight: "300" },
  statusBox: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "40px",
    color: "#06d6a0",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "300"
  },
  spinner: {
    width: "24px",
    height: "24px",
    border: "2px solid rgba(6, 214, 160, 0.2)",
    borderTop: "2px solid #06d6a0",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorBox: {
    background: "rgba(239, 71, 111, 0.1)",
    border: "1px solid rgba(239, 71, 111, 0.3)",
    borderRadius: "12px",
    padding: "16px 20px",
    color: "#ef476f",
    marginBottom: "24px",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  cropCard: {
    background: "rgba(30, 41, 59, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(12px)",
  },
  cropInner: { padding: "20px" },
  cropHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  cropName: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#fff",
  },
  priceBadge: {
    fontSize: "14px",
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: "8px",
    fontFamily: "'Space Grotesk', sans-serif"
  },
  cropMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "20px",
  },
  iconOp: { opacity: 0.7 },
  cropFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.05)"
  },
  cropDate: { fontSize: "12px", color: "#64748b" },
  priceRange: { fontSize: "12px", color: "#cbd5e1" },
  emptyState: { 
    textAlign: "center", 
    padding: "100px 20px", 
    background: "rgba(15,23,42,0.3)", 
    borderRadius: "16px",
    border: "1px dashed rgba(255,255,255,0.1)"
  },
  pagination: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    marginTop: "40px",
    flexWrap: "wrap",
  },
  pageBtn: {
    padding: "10px 16px",
    background: "rgba(15, 23, 42, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#94a3b8",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  pageBtnActive: {
    background: "#06d6a0",
    color: "#0B0E14",
    border: "1px solid #06d6a0",
    fontWeight: 700,
  },
};

// CSS keyframes injection
const styleEl = document.createElement("style");
styleEl.textContent = `
@keyframes spin { to { transform: rotate(360deg); } }
.crop-card:hover { 
  transform: translateY(-4px); 
  box-shadow: 0 12px 30px rgba(0,0,0,0.5); 
  border-color: rgba(255,255,255,0.15);
  background: rgba(30, 41, 59, 0.7);
}
.statCard:hover {
  background: rgba(15, 23, 42, 0.9) !important;
  transform: translateY(-2px);
}
.searchInput:focus, .sortSelect:focus {
  border-color: rgba(6, 214, 160, 0.5) !important;
  box-shadow: 0 0 0 3px rgba(6, 214, 160, 0.1);
}
.refreshBtn:hover {
  background: rgba(6, 214, 160, 0.2) !important;
}
.statesWrapper::-webkit-scrollbar {
  width: 4px;
}
.statesWrapper::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}
`;
document.head.appendChild(styleEl);

export default Home;