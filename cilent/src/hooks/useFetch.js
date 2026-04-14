import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useFetch – Generic data fetching hook with cache, loading, error states.
 *
 * @param {Function|string} fetcher  – async function (or URL string) that returns data
 * @param {object}          options
 *   @param {any[]}   deps          – dependency array (re-fetches when changed)
 *   @param {boolean} immediate     – whether to fetch immediately on mount (default: true)
 *   @param {number}  pollInterval  – polling interval in ms (0 = no polling)
 *   @param {any}     initialData   – default value before first fetch
 */
const useFetch = (fetcher, options = {}) => {
  const {
    deps        = [],
    immediate   = true,
    pollInterval = 0,
    initialData  = null,
  } = options;

  const [data,    setData]    = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);

  const abortRef  = useRef(null);
  const mountedRef = useRef(true);

  const execute = useCallback(async () => {
    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      let result;
      if (typeof fetcher === "string") {
        const res = await fetch(fetcher, { signal: abortRef.current.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        result = await res.json();
      } else {
        result = await fetcher(abortRef.current.signal);
      }
      if (mountedRef.current) setData(result);
    } catch (err) {
      if (err.name === "AbortError") return;
      if (mountedRef.current) setError(err.message || "An error occurred.");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    if (immediate) execute();

    let pollTimer;
    if (pollInterval > 0) {
      pollTimer = setInterval(execute, pollInterval);
    }

    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
      clearInterval(pollTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  const refetch = useCallback(() => execute(), [execute]);

  return { data, loading, error, refetch };
};

export default useFetch;