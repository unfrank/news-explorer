// src/hooks/useMediaQuery.js
import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    // Listen for changes
    mql.addEventListener
      ? mql.addEventListener("change", handler)
      : mql.addListener(handler);

    // Clean up
    return () => {
      mql.removeEventListener
        ? mql.removeEventListener("change", handler)
        : mql.removeListener(handler);
    };
  }, [query]);

  return matches;
}
