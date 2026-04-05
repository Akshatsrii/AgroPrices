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
    const interval = setInterval(load, 5 * 60 * 1000); // Auto-refresh every 5 min
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

  const prevMonth = () =>
    setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setViewDate(new Date(year, month + 1, 1));

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
    price > 3000 ? "#ff6b6b" : price > 1500 ? "#ffd166" : "#8bc34a";

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

  // Derived stats
  const totalCrops = data.length;
  const avgPrice = data.length
    ? Math.round(data.reduce((s, d) => s + Number(d.modal_price || 0), 0) / data.length)
    : 0;
  const uniqueMarkets = new Set(data.map((d) => d.market)).size;
  const uniqueStates = [...new Set(data.map((d) => d.state))].filter(Boolean);

  // Filtered + sorted
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

          {/* State Filter */}
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
          {/* Stats */}
          <div style={styles.statsRow}>
            <StatCard icon="🌾" label="Total Records" value={totalCrops} accent="#8bc34a" />
            <StatCard icon="💰" label="Avg Modal Price" value={`₹${avgPrice}`} accent="#ffd166" />
            <StatCard icon="🏪" label="Markets" value={uniqueMarkets} accent="#64b5f6" />
            <StatCard icon="🗺️" label="States" value={uniqueStates.length} accent="#ff8a65" />
          </div>

          {/* Search + Sort */}
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

          {/* Status */}
          {loading && (
            <div style={styles.statusBox}>
              <div style={styles.spinner} />
              <span>Fetching live market prices...</span>
            </div>
          )}
          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          {/* Results count */}
          {!loading && (
            <div style={styles.resultsInfo}>
              Showing {paginated.length} of {filtered.length} results
              {filterState !== "All" && ` in ${filterState}`}
              {search && ` for "${search}"`}
            </div>
          )}

          {/* Cards Grid */}
          <div style={styles.grid}>
            {paginated.map((item, i) => (
              <CropCard key={i} item={item} />
            ))}
          </div>

          {/* Empty State */}
          {!loading && filtered.length === 0 && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: 48 }}>🌱</div>
              <p>No crops found. Try adjusting your search or filters.</p>
            </div>
          )}

          {/* Pagination */}
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

// ── STYLES ───────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a1f11",
    color: "#c8e6a0",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 12,
    padding: "20px 28px",
    background: "#071710",
    borderBottom: "1px solid #1e4a2d",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 26,
    color: "#c8e6a0",
    letterSpacing: 1,
  },
  tagline: { fontSize: 11, color: "#6b9c6b", marginTop: 2, letterSpacing: 2, textTransform: "uppercase" },
  clockBox: { textAlign: "right" },
  clockTime: { fontSize: 28, fontWeight: 700, color: "#8bc34a", fontVariantNumeric: "tabular-nums", letterSpacing: 2 },
  clockDate: { fontSize: 12, color: "#6b9c6b", marginTop: 2 },
  refreshNote: { fontSize: 10, color: "#3d6b3d", marginTop: 4 },
  refreshBtn: {
    marginTop: 6,
    padding: "5px 14px",
    background: "#1e4a2d",
    color: "#8bc34a",
    border: "1px solid #2d6b3e",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  },
  body: { display: "flex", gap: 0, minHeight: "calc(100vh - 80px)" },
  sidebar: {
    width: 230,
    minWidth: 230,
    background: "#071710",
    borderRight: "1px solid #1e4a2d",
    padding: "20px 14px",
    overflowY: "auto",
  },
  calendar: { background: "#0d2818", borderRadius: 10, padding: 14, marginBottom: 20, border: "1px solid #1e4a2d" },
  calHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  calTitle: { fontSize: 12, fontWeight: 700, color: "#c8e6a0" },
  calBtn: { background: "none", border: "none", color: "#8bc34a", fontSize: 16, cursor: "pointer", padding: "0 4px" },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 },
  calDayName: { fontSize: 9, color: "#6b9c6b", textAlign: "center", padding: "2px 0", fontWeight: 700 },
  calCell: { fontSize: 10, color: "#8ab08a", textAlign: "center", padding: "4px 0", borderRadius: 4 },
  calToday: { background: "#8bc34a", color: "#071710", fontWeight: 700, borderRadius: 4 },
  sideSection: { marginBottom: 16 },
  sideSectionTitle: { fontSize: 10, color: "#6b9c6b", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontWeight: 700 },
  stateItem: {
    padding: "6px 10px",
    borderRadius: 6,
    fontSize: 11,
    color: "#8ab08a",
    cursor: "pointer",
    marginBottom: 2,
    transition: "all 0.15s",
  },
  stateItemActive: { background: "#1e4a2d", color: "#8bc34a", fontWeight: 700 },
  main: { flex: 1, padding: "20px 24px", overflowY: "auto" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 18 },
  statCard: {
    background: "#0d2818",
    border: "1px solid #1e4a2d",
    borderRadius: 10,
    padding: "14px 16px",
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  statLabel: { fontSize: 10, color: "#6b9c6b", textTransform: "uppercase", letterSpacing: 1 },
  statValue: { fontSize: 22, fontWeight: 700, marginTop: 2 },
  controls: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" },
  searchInput: {
    flex: 1,
    minWidth: 220,
    padding: "10px 16px",
    background: "#0d2818",
    border: "1px solid #2d6b3e",
    borderRadius: 8,
    color: "#c8e6a0",
    fontSize: 13,
    outline: "none",
  },
  sortSelect: {
    padding: "10px 12px",
    background: "#0d2818",
    border: "1px solid #2d6b3e",
    borderRadius: 8,
    color: "#8bc34a",
    fontSize: 13,
    cursor: "pointer",
    outline: "none",
  },
  resultsInfo: { fontSize: 11, color: "#5a7a5a", marginBottom: 14 },
  statusBox: { display: "flex", alignItems: "center", gap: 10, padding: 20, color: "#8bc34a" },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid #1e4a2d",
    borderTop: "2px solid #8bc34a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    background: "#2d1010",
    border: "1px solid #6b2020",
    borderRadius: 8,
    padding: "12px 16px",
    color: "#ff8a80",
    marginBottom: 14,
    fontSize: 13,
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 },
  cropCard: {
    background: "#0d2818",
    border: "1px solid #1e4a2d",
    borderRadius: 10,
    overflow: "hidden",
    transition: "transform 0.15s, box-shadow 0.15s",
    cursor: "default",
  },
  cropStripe: { height: 4, width: "100%" },
  cropInner: { padding: 14 },
  cropHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  cropName: { fontWeight: 700, fontSize: 14, color: "#c8e6a0", fontFamily: "'Playfair Display', serif" },
  priceBadge: { fontSize: 13, fontWeight: 700, padding: "2px 10px", borderRadius: 20 },
  cropMeta: { display: "flex", flexDirection: "column", gap: 3, fontSize: 11, color: "#6b9c6b", marginBottom: 10 },
  cropFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cropDate: { fontSize: 10, color: "#3d6b3d" },
  priceRange: { fontSize: 10, color: "#5a7a5a" },
  emptyState: { textAlign: "center", padding: "60px 20px", color: "#3d6b3d" },
  pagination: { display: "flex", gap: 6, justifyContent: "center", marginTop: 24, flexWrap: "wrap" },
  pageBtn: {
    padding: "6px 14px",
    background: "#0d2818",
    border: "1px solid #2d6b3e",
    borderRadius: 6,
    color: "#8bc34a",
    fontSize: 12,
    cursor: "pointer",
  },
  pageBtnActive: { background: "#8bc34a", color: "#071710", fontWeight: 700 },
};

// CSS keyframes injection
const styleEl = document.createElement("style");
styleEl.textContent = `@keyframes spin { to { transform: rotate(360deg); } }
.crop-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }`;
document.head.appendChild(styleEl);

export default Home;