import { format, formatDistanceToNow, parseISO } from "date-fns";

// ---- Currency formatting (Indian Rupees) ----
export const formatPrice = (price, unit = "quintal") => {
  if (price == null) return "N/A";
  const formatted = new Intl.NumberFormat("en-IN", {
    style:    "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
  return `${formatted}/${unit}`;
};

export const formatCurrency = (amount) => {
  if (amount == null) return "N/A";
  return new Intl.NumberFormat("en-IN", {
    style:    "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (n, decimals = 0) => {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
};

// ---- Large number abbreviation (₹1.2L, ₹4.5Cr) ----
export const formatCompact = (n) => {
  if (n == null) return "—";
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1)}Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(1)}L`;
  if (n >= 1_000)       return `₹${(n / 1_000).toFixed(1)}K`;
  return `₹${n}`;
};

// ---- Percentage change ----
export const formatChange = (change, pct) => {
  const sign   = change >= 0 ? "+" : "";
  const arrow  = change >= 0 ? "▲" : "▼";
  const color  = change >= 0 ? "text-forest-600" : "text-red-500";
  return { label: `${arrow} ${sign}${pct?.toFixed(2)}%`, color };
};

export const formatPct = (pct, showSign = true) => {
  if (pct == null) return "—";
  const sign = showSign && pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
};

// ---- Dates ----
export const formatDate = (date) => {
  if (!date) return "—";
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd MMM yyyy");
};

export const formatDateTime = (date) => {
  if (!date) return "—";
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd MMM yyyy, hh:mm a");
};

export const timeAgo = (date) => {
  if (!date) return "—";
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
};

// ---- Weight / quantity ----
export const formatWeight = (qty, unit = "kg") => {
  if (qty == null) return "—";
  if (unit === "quintal" && qty >= 100) {
    return `${(qty / 100).toFixed(1)} MT`;
  }
  return `${formatNumber(qty)} ${unit}`;
};

// ---- Confidence score ----
export const formatConfidence = (pct) => {
  if (pct == null) return "—";
  if (pct >= 80) return { label: `${pct}%`, color: "text-forest-600", bg: "bg-forest-50" };
  if (pct >= 60) return { label: `${pct}%`, color: "text-amber-600",  bg: "bg-amber-50"  };
  return              { label: `${pct}%`, color: "text-red-500",    bg: "bg-red-50"    };
};

// ---- Title case ----
export const toTitleCase = (str) =>
  str?.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) || "";