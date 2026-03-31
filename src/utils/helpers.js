// ============================================================
//   AgriIntel – General Helper Utilities
// ============================================================

// Clamp a number between min and max
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Calculate percentage change
export const calcPctChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Calculate profit/loss
export const calcProfit = ({ qty, buyPrice, sellPrice, costPerUnit = 0 }) => {
  const revenue = qty * sellPrice;
  const cost    = qty * (buyPrice + costPerUnit);
  return { revenue, cost, profit: revenue - cost, margin: ((revenue - cost) / revenue) * 100 };
};

// Determine price signal based on change pct
export const getPriceSignal = (changePct) => {
  if (changePct > 5)   return "BUY";
  if (changePct < -5)  return "SELL";
  return "HOLD";
};

// Get color class based on trend
export const getTrendColor = (value) => {
  if (value > 0) return "text-forest-600";
  if (value < 0) return "text-red-500";
  return "text-gray-500";
};

export const getTrendBg = (value) => {
  if (value > 0) return "bg-forest-50 text-forest-700";
  if (value < 0) return "bg-red-50 text-red-700";
  return "bg-gray-50 text-gray-700";
};

// Debounce utility (non-hook version)
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Deep clone
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Group array by key
export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

// Sort array of objects
export const sortBy = (arr, key, dir = "asc") =>
  [...arr].sort((a, b) => {
    if (a[key] < b[key]) return dir === "asc" ? -1 : 1;
    if (a[key] > b[key]) return dir === "asc" ? 1 : -1;
    return 0;
  });

// Truncate text
export const truncate = (str, maxLength = 100) => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
};

// Generate random ID
export const genId = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

// Capitalize first letter
export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

// Parse query string
export const parseQueryString = (search) => {
  const params = new URLSearchParams(search);
  const result = {};
  params.forEach((value, key) => { result[key] = value; });
  return result;
};

// Local Storage helpers
export const ls = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key); } catch {}
  },
};

// Check if value is between range
export const inRange = (val, min, max) => val >= min && val <= max;

// Calculate MSP comparison
export const mspComparison = (currentPrice, msp) => {
  if (!msp) return null;
  const diff    = currentPrice - msp;
  const diffPct = ((diff) / msp) * 100;
  return { diff, diffPct, aboveMsp: diff >= 0 };
};