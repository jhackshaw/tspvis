import { useEffect, useState } from "react";

export const usePersistentState = (key, defaultValue = undefined) => {
  const [value, setValue] = useState(() => {
    const existing = typeof window !== "undefined" && window.localStorage?.getItem(key);
    if (existing) {
      return existing;
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
