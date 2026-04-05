// ─────────────────────────────────────────────────────────────
//  AgroPrices · Custom Data-Fetching Hooks
//  Import any hook you need in any component.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchDashboardStats, fetchTickerPrices, fetchTopMovers,
  fetchMSPComparison, fetchMarkets, fetchWeatherImpact,
  fetchNews, fetchCalendarEvents, fetchSeasonalCrops,
  fetchTestimonials, searchCrops, calculateProfit,
  createPriceSocket,
} from "../services/apiService";

// ── Generic async hook ───────────────────────────────────────
export function useAsync(asyncFn, deps = [], options = {}) {
  const { initialData = null, pollInterval = null } = options;
  const [data,    setData]    = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const run = useCallback(async () => {
    try {
      setError(null);
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
    if (pollInterval) {
      const id = setInterval(run, pollInterval);
      return () => clearInterval(id);
    }
  }, [run, pollInterval]);

  return { data, loading, error, refetch: run };
}

// ── Dashboard stats (hero section counters) ──────────────────
export function useDashboardStats() {
  return useAsync(fetchDashboardStats, []);
}

// ── Live ticker with optional WebSocket ─────────────────────
//  useWebSocket=true → real-time via WS (recommended)
//  useWebSocket=false → polls REST every `interval` ms
export function useTickerPrices({ useWebSocket = true, interval = 15000 } = {}) {
  const [prices,  setPrices]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (useWebSocket) {
      wsRef.current = createPriceSocket(
        (data) => { setPrices(data); setLoading(false); },
        (err)  => { setError("Live stream unavailable"); setLoading(false); }
      );
      return () => wsRef.current?.close();
    } else {
      // Fallback: HTTP polling
      const load = async () => {
        try {
          const data = await fetchTickerPrices();
          setPrices(data);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      load();
      const id = setInterval(load, interval);
      return () => clearInterval(id);
    }
  }, [useWebSocket, interval]);

  return { prices, loading, error };
}

// ── Top movers (refreshed every 60 s) ───────────────────────
export function useTopMovers(limit = 4) {
  return useAsync(
    () => fetchTopMovers(limit),
    [limit],
    { initialData: [], pollInterval: 60000 }
  );
}

// ── MSP vs Market comparison ─────────────────────────────────
export function useMSPComparison() {
  return useAsync(fetchMSPComparison, [], { initialData: [] });
}

// ── Market hubs (filterable) ─────────────────────────────────
export function useMarkets(search = "") {
  return useAsync(
    () => fetchMarkets(search),
    [search],
    { initialData: [] }
  );
}

// ── Weather impact ────────────────────────────────────────────
export function useWeatherImpact() {
  return useAsync(fetchWeatherImpact, [], {
    initialData: [],
    pollInterval: 300000, // refresh every 5 min
  });
}

// ── Agri news ─────────────────────────────────────────────────
export function useNews(limit = 4) {
  return useAsync(() => fetchNews(limit), [limit], {
    initialData: [],
    pollInterval: 600000, // refresh every 10 min
  });
}

// ── Calendar events (month-aware) ────────────────────────────
export function useCalendarEvents(month, year) {
  return useAsync(
    () => fetchCalendarEvents(month, year),
    [month, year],
    { initialData: [] }
  );
}

// ── Seasonal crops ────────────────────────────────────────────
export function useSeasonalCrops() {
  return useAsync(fetchSeasonalCrops, [], { initialData: [] });
}

// ── Testimonials ──────────────────────────────────────────────
export function useTestimonials() {
  return useAsync(fetchTestimonials, [], { initialData: [] });
}

// ── Crop search with debounce ─────────────────────────────────
export function useCropSearch(query) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 1) { setSuggestions([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchCrops(query);
        setSuggestions(data.map(d => d.name || d));
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300); // 300 ms debounce
    return () => clearTimeout(timer);
  }, [query]);

  return { suggestions, loading };
}

// ── Profit calculator (client-side, no API needed) ───────────
//  Uses API optionally for server-side calc if `useAPI=true`
export function useProfitCalc(inputs, useAPI = false) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (useAPI) {
      calculateProfit(inputs).then(setResult).catch(() => null);
    } else {
      const { qty, price, transport, commission } = inputs;
      const gross = qty * price;
      const comm  = (gross * commission) / 100;
      const net   = gross - comm - transport;
      const margin = gross > 0 ? +((net / gross) * 100).toFixed(1) : 0;
      setResult({ gross, deductions: Math.round(comm + transport), net: Math.round(net), margin });
    }
  }, [inputs, useAPI]);

  return result;
}

// ── Live clock ────────────────────────────────────────────────
export function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// ── Count-up animation ────────────────────────────────────────
export function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const isNum = typeof target === "number";
    if (!isNum) { setCount(target); return; }
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── IntersectionObserver ──────────────────────────────────────
export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}