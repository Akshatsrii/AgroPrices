// ============================================================
//   AgriIntel – Application Constants
// ============================================================

// --- App Info ---
export const APP = {
  NAME: "AgriIntel",
  TAGLINE: "Smart Crop Price Intelligence",
}

// --- API ---
export const API = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  TIMEOUT: 15000,
}

// --- Pagination ---
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
}

// --- Price thresholds ---
export const PRICE = {
  SPIKE_THRESHOLD: 10,
  DROP_THRESHOLD: -10,
  MSP_BUFFER_PCT: 2,
}

// --- Chart Colors ---
export const CHART_COLORS = {
  primary: "#2d8058",
  secondary: "#fbbf24",
  danger: "#ef4444",
  info: "#3b82f6",
  muted: "#80c0a0",
  gridLine: "#f0f7f2",
  tooltip: "#113d28",
}

// --- Signals ---
export const SIGNALS = {
  BUY: {
    label: "Buy",
    color: "bg-forest-100 text-forest-700",
    dot: "bg-forest-500",
  },
  SELL: {
    label: "Sell",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  HOLD: {
    label: "Hold",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  WATCH: {
    label: "Watch",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
}

// --- Severity ---
export const SEVERITY = {
  HIGH: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-500",
    label: "High",
  },
  MEDIUM: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-500",
    label: "Medium",
  },
  LOW: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-500",
    label: "Low",
  },
  POSITIVE: {
    bg: "bg-forest-50",
    border: "border-forest-200",
    icon: "text-forest-600",
    label: "Positive",
  },
  WARNING: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    label: "Warning",
  },
  INFO: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    label: "Info",
  },
}

// --- States ---
export const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
]

// --- Seasons ---
export const SEASONS = {
  KHARIF: {
    label: "Kharif",
    months: "Jun – Nov",
    color: "bg-forest-100 text-forest-700",
  },
  RABI: {
    label: "Rabi",
    months: "Oct – Mar",
    color: "bg-amber-100 text-amber-700",
  },
  ZAID: {
    label: "Zaid",
    months: "Mar – Jun",
    color: "bg-blue-100 text-blue-700",
  },
}

// --- Local Storage ---
export const LS_KEYS = {
  WATCHLIST: "agriintel_watchlist",
  USER_LOCATION: "agriintel_location",
  THEME: "agriintel_theme",
  ONBOARDING: "agriintel_onboarded",
}

// --- Date Formats ---
export const DATE = {
  FORMAT: "dd MMM yyyy",
  TIME_FORMAT: "dd MMM yyyy, hh:mm a",
  CHART_FORMAT: "MMM dd",
}

// --- Refresh Intervals ---
export const REFRESH = {
  PRICE: 5 * 60 * 1000,
  ALERT: 2 * 60 * 1000,
  WEATHER: 30 * 60 * 1000,
}