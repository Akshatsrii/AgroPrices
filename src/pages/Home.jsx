import React, { useState, useEffect, useCallback } from "react";
import { fetchDashboardStats } from "../services/api.js";

// ── Google Fonts ────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap";
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

// ── Mini Calendar ─────────────────────────────────────────────
function MiniCalendar({ today }) {
  const [viewDate, setViewDate] = useState(new Date(today));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div style={styles.calendar}>
      <div style={styles.calHeader}>
        <button onClick={prevMonth} style={styles.calBtn}>‹</button>
        <span style={styles.calTitle}>
          {monthNames[month]} {year}
        </span>
        <button onClick={nextMonth} style={styles.calBtn}>›</button>
      </div>
      <div style={styles.calGrid}>
        {dayNames.map((d) => (
          <div key={d} style={styles.calDayName}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div
            key={i}
            style={{
              ...styles.calCell,
              ...(d && isToday(d) ? styles.calToday : {}),
              ...(d === null ? { visibility: "hidden" } : {}),
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div style={{ ...styles.statCard, borderTop: `3px solid ${accent}` }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={{ ...styles.statValue, color: accent }}>{value}</div>
      </div>
    </div>
  );
}

// ── Crop Card ─────────────────────────────────────────────────
function CropCard({ item }) {
  const price = Number(item.modal_price);
  const badgeColor =
    price > 3000 ? "#e67e22" : price > 1500 ? "#f0a500" : "#3a9c4e";

  return (
    <div style={styles.cropCard}>
      <div style={{ ...styles.cropStripe, background: badgeColor }} />
      <div style={styles.cropInner}>
        <div style={styles.cropHeader}>
          <span style={styles.cropName}>🌿 {item.commodity}</span>
          <span style={{ ...styles.priceBadge, background: badgeColor + "22", color: badgeColor }}>
            ₹{item.modal_price}
          </span>
        </div>
        <div style={styles.cropMeta}>
          <span>🏪 {item.market}</span>
          <span>📍 {item.district}</span>
          <span>🗺️ {item.state}</span>
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
      {/* ── Header ── */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.logo}>🌾 AgroPrice AI</h1>
          <p style={styles.tagline}>Live Commodity Market Intelligence</p>
        </div>
        <div style={styles.clockBox}>
          <div style={styles.clockTime}>{timeStr}</div>
          <div style={styles.clockDate}>{dateStr}</div>
          {lastRefresh && (
            <div style={styles.refreshNote}>
              Last sync: {lastRefresh.toLocaleTimeString("en-IN", { hour12: true })}
            </div>
          )}
          <button onClick={refetch} style={styles.refreshBtn} disabled={loading}>
            {loading ? "⏳ Syncing..." : "🔄 Refresh"}
          </button>
        </div>
      </div>

      {/* ── Body Layout ── */}
      <div style={styles.body}>
        {/* ── Sidebar ── */}
        <aside style={styles.sidebar}>
          <MiniCalendar today={now} />

          <div style={styles.sideSection}>
            <div style={styles.sideSectionTitle}>🗺️ Filter by State</div>
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
        </aside>

        {/* ── Main Content ── */}
        <main style={styles.main}>
          <div style={styles.statsRow}>
            <StatCard icon="🌾" label="Total Records" value={totalCrops} accent="#3a9c4e" />
            <StatCard icon="💰" label="Avg Modal Price" value={`₹${avgPrice}`} accent="#f0a500" />
            <StatCard icon="🏪" label="Markets" value={uniqueMarkets} accent="#2e86c1" />
            <StatCard icon="🗺️" label="States" value={uniqueStates.length} accent="#e67e22" />
          </div>

          <div style={styles.controls}>
            <input
              type="text"
              placeholder="🔍 Search commodity, market, district, state..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={styles.searchInput}
            />
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
              Showing {paginated.length} of {filtered.length} results
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
              <div style={{ fontSize: 48 }}>🌱</div>
              <p>No crops found. Try adjusting your search or filters.</p>
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

// ── STYLES — Light Green Theme ────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: "#f0f9f1",           // very light mint page bg
    color: "#1b4332",                 // deep forest green text
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 12,
    padding: "20px 28px",
    background: "#ffffff",            // pure white header
    borderBottom: "1px solid #b7e4c7",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(52,168,83,0.08)",
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 26,
    color: "#1b4332",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 11,
    color: "#52b788",
    marginTop: 2,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  clockBox: { textAlign: "right" },
  clockTime: {
    fontSize: 28,
    fontWeight: 700,
    color: "#2d6a4f",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: 2,
  },
  clockDate: { fontSize: 12, color: "#74c69d", marginTop: 2 },
  refreshNote: { fontSize: 10, color: "#95d5b2", marginTop: 4 },
  refreshBtn: {
    marginTop: 6,
    padding: "5px 14px",
    background: "#d8f3dc",           // light mint button bg
    color: "#1b4332",
    border: "1px solid #95d5b2",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  },
  body: { display: "flex", gap: 0, minHeight: "calc(100vh - 80px)" },
  sidebar: {
    width: 230,
    minWidth: 230,
    background: "#ffffff",           // white sidebar
    borderRight: "1px solid #b7e4c7",
    padding: "20px 14px",
    overflowY: "auto",
  },
  calendar: {
    background: "#f0f9f1",           // mint bg for calendar widget
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    border: "1px solid #b7e4c7",
  },
  calHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  calTitle: { fontSize: 12, fontWeight: 700, color: "#1b4332" },
  calBtn: {
    background: "none",
    border: "none",
    color: "#2d6a4f",
    fontSize: 16,
    cursor: "pointer",
    padding: "0 4px",
  },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 },
  calDayName: {
    fontSize: 9,
    color: "#52b788",
    textAlign: "center",
    padding: "2px 0",
    fontWeight: 700,
  },
  calCell: {
    fontSize: 10,
    color: "#2d6a4f",
    textAlign: "center",
    padding: "4px 0",
    borderRadius: 4,
  },
  calToday: {
    background: "#2d6a4f",           // deep green today highlight
    color: "#ffffff",
    fontWeight: 700,
    borderRadius: 4,
  },
  sideSection: { marginBottom: 16 },
  sideSectionTitle: {
    fontSize: 10,
    color: "#52b788",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
    fontWeight: 700,
  },
  stateItem: {
    padding: "6px 10px",
    borderRadius: 6,
    fontSize: 11,
    color: "#2d6a4f",
    cursor: "pointer",
    marginBottom: 2,
    transition: "all 0.15s",
  },
  stateItemActive: {
    background: "#d8f3dc",           // light mint active state
    color: "#1b4332",
    fontWeight: 700,
  },
  main: { flex: 1, padding: "20px 24px", overflowY: "auto" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    background: "#ffffff",           // white stat cards
    border: "1px solid #b7e4c7",
    borderRadius: 10,
    padding: "14px 16px",
    display: "flex",
    gap: 12,
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(52,168,83,0.06)",
  },
  statLabel: {
    fontSize: 10,
    color: "#74c69d",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statValue: { fontSize: 22, fontWeight: 700, marginTop: 2 },
  controls: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" },
  searchInput: {
    flex: 1,
    minWidth: 220,
    padding: "10px 16px",
    background: "#ffffff",
    border: "1px solid #b7e4c7",
    borderRadius: 8,
    color: "#1b4332",
    fontSize: 13,
    outline: "none",
  },
  sortSelect: {
    padding: "10px 12px",
    background: "#ffffff",
    border: "1px solid #b7e4c7",
    borderRadius: 8,
    color: "#2d6a4f",
    fontSize: 13,
    cursor: "pointer",
    outline: "none",
  },
  resultsInfo: { fontSize: 11, color: "#74c69d", marginBottom: 14 },
  statusBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 20,
    color: "#2d6a4f",
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid #b7e4c7",
    borderTop: "2px solid #2d6a4f",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    background: "#fff4e5",           // warm amber tint for errors
    border: "1px solid #f0a500",
    borderRadius: 8,
    padding: "12px 16px",
    color: "#7d4e00",
    marginBottom: 14,
    fontSize: 13,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
    gap: 14,
  },
  cropCard: {
    background: "#ffffff",           // white crop cards
    border: "1px solid #b7e4c7",
    borderRadius: 10,
    overflow: "hidden",
    transition: "transform 0.15s, box-shadow 0.15s",
    cursor: "default",
    boxShadow: "0 1px 4px rgba(52,168,83,0.07)",
  },
  cropStripe: { height: 4, width: "100%" },
  cropInner: { padding: 14 },
  cropHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cropName: {
    fontWeight: 700,
    fontSize: 14,
    color: "#1b4332",
    fontFamily: "'Playfair Display', serif",
  },
  priceBadge: {
    fontSize: 13,
    fontWeight: 700,
    padding: "2px 10px",
    borderRadius: 20,
  },
  cropMeta: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    fontSize: 11,
    color: "#52b788",
    marginBottom: 10,
  },
  cropFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cropDate: { fontSize: 10, color: "#95d5b2" },
  priceRange: { fontSize: 10, color: "#74c69d" },
  emptyState: { textAlign: "center", padding: "60px 20px", color: "#95d5b2" },
  pagination: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    marginTop: 24,
    flexWrap: "wrap",
  },
  pageBtn: {
    padding: "6px 14px",
    background: "#ffffff",
    border: "1px solid #b7e4c7",
    borderRadius: 6,
    color: "#2d6a4f",
    fontSize: 12,
    cursor: "pointer",
  },
  pageBtnActive: {
    background: "#2d6a4f",           // deep green active page
    color: "#ffffff",
    fontWeight: 700,
  },
};

// CSS keyframes injection
const styleEl = document.createElement("style");
styleEl.textContent = `@keyframes spin { to { transform: rotate(360deg); } }
.crop-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(52,168,83,0.15); }`;
document.head.appendChild(styleEl);

export default Home;