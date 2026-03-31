// ============================================================
//   AgriIntel – Application Constants
// ============================================================

export const APP_NAME = "AgriIntel";
export const APP_TAGLINE = "Smart Crop Price Intelligence";

// --- API ---
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const API_TIMEOUT  = 15000; // 15 seconds

// --- Pagination ---
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE     = 50;

// --- Price change thresholds ---
export const PRICE_SPIKE_THRESHOLD = 10;  // % change considered a spike
export const PRICE_DROP_THRESHOLD  = -10; // % change considered a crash
export const MSP_BUFFER_PCT        = 2;   // % above MSP considered "good price"

// --- Chart colors ---
export const CHART_COLORS = {
  primary:   "#2d8058",
  secondary: "#fbbf24",
  danger:    "#ef4444",
  info:      "#3b82f6",
  muted:     "#80c0a0",
  gridLine:  "#f0f7f2",
  tooltip:   "#113d28",
};

// --- Signal labels ---
export const SIGNALS = {
  BUY:   { label: "Buy",  color: "bg-forest-100 text-forest-700",  dot: "bg-forest-500" },
  SELL:  { label: "Sell", color: "bg-red-100 text-red-700",        dot: "bg-red-500"    },
  HOLD:  { label: "Hold", color: "bg-amber-100 text-amber-700",    dot: "bg-amber-500"  },
  WATCH: { label: "Watch",color: "bg-blue-100 text-blue-700",      dot: "bg-blue-500"   },
};

// --- Severity styles ---
export const SEVERITY_STYLES = {
  high:     { bg: "bg-red-50",     border: "border-red-200",    icon: "text-red-500",    label: "High"   },
  medium:   { bg: "bg-amber-50",   border: "border-amber-200",  icon: "text-amber-500",  label: "Medium" },
  low:      { bg: "bg-blue-50",    border: "border-blue-200",   icon: "text-blue-500",   label: "Low"    },
  positive: { bg: "bg-forest-50",  border: "border-forest-200", icon: "text-forest-600", label: "Positive"},
  warning:  { bg: "bg-amber-50",   border: "border-amber-200",  icon: "text-amber-600",  label: "Warning"},
  info:     { bg: "bg-blue-50",    border: "border-blue-200",   icon: "text-blue-600",   label: "Info"   },
};

// --- Indian states ---
export const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// --- Seasons ---
export const SEASONS = {
  KHARIF: { label: "Kharif",  months: "Jun – Nov", color: "bg-forest-100 text-forest-700" },
  RABI:   { label: "Rabi",    months: "Oct – Mar", color: "bg-amber-100 text-amber-700"   },
  ZAID:   { label: "Zaid",    months: "Mar – Jun", color: "bg-blue-100 text-blue-700"     },
};

// --- Local storage keys ---
export const LS_KEYS = {
  WATCHLIST:      "agriintel_watchlist",
  USER_LOCATION:  "agriintel_location",
  THEME:          "agriintel_theme",
  ONBOARDING:     "agriintel_onboarded",
};

// --- Date formats ---
export const DATE_FORMAT      = "dd MMM yyyy";
export const DATE_TIME_FORMAT = "dd MMM yyyy, hh:mm a";
export const CHART_DATE_FORMAT = "MMM dd";

// --- Refresh intervals (ms) ---
export const PRICE_REFRESH_INTERVAL   = 5 * 60 * 1000;  // 5 minutes
export const ALERT_REFRESH_INTERVAL   = 2 * 60 * 1000;  // 2 minutes
export const WEATHER_REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes