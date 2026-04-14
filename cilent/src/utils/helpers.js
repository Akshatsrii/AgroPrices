// ============================================================
//   AgriIntel – General Helper Utilities
// ============================================================

// ─────────────────────────────────────────────
// 🔹 Numbers
// ─────────────────────────────────────────────

export const clamp = (val, min, max) =>
  Math.min(Math.max(val ?? 0, min), max)

export const inRange = (val, min, max) =>
  val >= min && val <= max

// ─────────────────────────────────────────────
// 🔹 Calculations
// ─────────────────────────────────────────────

export const calcPctChange = (current, previous) => {
  if (!previous) return 0
  return ((current - previous) / previous) * 100
}

export const calcProfit = ({
  qty = 0,
  buyPrice = 0,
  sellPrice = 0,
  costPerUnit = 0,
}) => {
  const revenue = qty * sellPrice
  const cost = qty * (buyPrice + costPerUnit)
  const profit = revenue - cost

  return {
    revenue,
    cost,
    profit,
    margin: revenue ? (profit / revenue) * 100 : 0,
  }
}

// ─────────────────────────────────────────────
// 🔹 Signals / Trends
// ─────────────────────────────────────────────

export const getPriceSignal = (changePct = 0) => {
  if (changePct > 5) return "BUY"
  if (changePct < -5) return "SELL"
  return "HOLD"
}

export const getTrendColor = (value = 0) =>
  value > 0
    ? "text-forest-600"
    : value < 0
    ? "text-red-500"
    : "text-gray-500"

export const getTrendBg = (value = 0) =>
  value > 0
    ? "bg-forest-50 text-forest-700"
    : value < 0
    ? "bg-red-50 text-red-700"
    : "bg-gray-50 text-gray-700"

// ─────────────────────────────────────────────
// 🔹 Performance
// ─────────────────────────────────────────────

export const debounce = (fn, delay = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ─────────────────────────────────────────────
// 🔹 Data Helpers
// ─────────────────────────────────────────────

export const deepClone = (obj) => {
  if (typeof structuredClone === "function") {
    return structuredClone(obj)
  }
  return JSON.parse(JSON.stringify(obj))
}

export const groupBy = (arr = [], key) =>
  arr.reduce((acc, item) => {
    const group = item?.[key] ?? "unknown"
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})

export const sortBy = (arr = [], key, dir = "asc") =>
  [...arr].sort((a, b) => {
    const A = a?.[key]
    const B = b?.[key]

    if (A < B) return dir === "asc" ? -1 : 1
    if (A > B) return dir === "asc" ? 1 : -1
    return 0
  })

// ─────────────────────────────────────────────
// 🔹 Strings
// ─────────────────────────────────────────────

export const truncate = (str = "", maxLength = 100) =>
  str.length <= maxLength
    ? str
    : str.slice(0, maxLength).trimEnd() + "…"

export const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1)

// ─────────────────────────────────────────────
// 🔹 IDs
// ─────────────────────────────────────────────

export const genId = (prefix = "id") =>
  `${prefix}_${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`

// ─────────────────────────────────────────────
// 🔹 URL
// ─────────────────────────────────────────────

export const parseQueryString = (search = "") => {
  const params = new URLSearchParams(search)
  return Object.fromEntries(params.entries())
}

// ─────────────────────────────────────────────
// 🔹 Local Storage
// ─────────────────────────────────────────────

export const ls = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch {}
  },
}

// ─────────────────────────────────────────────
// 🔹 MSP Comparison
// ─────────────────────────────────────────────

export const mspComparison = (currentPrice, msp) => {
  if (!msp) return null

  const diff = currentPrice - msp
  const diffPct = (diff / msp) * 100

  return {
    diff,
    diffPct,
    aboveMsp: diff >= 0,
  }
}