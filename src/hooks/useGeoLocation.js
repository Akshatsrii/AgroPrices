import { useState, useEffect, useCallback } from "react";
import { LS_KEYS } from "../utils/constants";
import { ls } from "../utils/helpers";

/**
 * useGeoLocation – Retrieves the user's geolocation via the browser API.
 * Caches result in localStorage.
 *
 * @returns {{ coords, address, loading, error, refetch }}
 */
const useGeoLocation = () => {
  const cached = ls.get(LS_KEYS.USER_LOCATION);

  const [coords,  setCoords]  = useState(cached?.coords  || null);
  const [address, setAddress] = useState(cached?.address || null);
  const [loading, setLoading] = useState(!cached);
  const [error,   setError]   = useState(null);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newCoords = { latitude, longitude };
        setCoords(newCoords);

        // Reverse geocode (free Nominatim API)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr = {
            city:    data.address?.city || data.address?.town || data.address?.village || "Unknown",
            state:   data.address?.state || "",
            country: data.address?.country || "India",
            display: data.display_name || "",
          };
          setAddress(addr);
          ls.set(LS_KEYS.USER_LOCATION, { coords: newCoords, address: addr });
        } catch {
          // Silently fail geocoding
          setAddress({ city: "Your Location", state: "", country: "India", display: "" });
        }

        setLoading(false);
      },
      (err) => {
        const messages = {
          1: "Location permission denied. Please allow location access.",
          2: "Location unavailable. Please try again.",
          3: "Location request timed out.",
        };
        setError(messages[err.code] || "Failed to get location.");
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, []);

  useEffect(() => {
    if (!cached) fetchLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coords, address, loading, error, refetch: fetchLocation };
};

export default useGeoLocation;