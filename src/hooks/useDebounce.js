import { useState, useEffect } from "react";

/**
 * useDebounce – Returns a debounced value that only updates
 * after the specified delay has elapsed without changes.
 *
 * @param {any}    value  – the value to debounce
 * @param {number} delay  – delay in milliseconds (default 400ms)
 * @returns {any} debouncedValue
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;