import { useEffect, useState } from "react";

export function useDebouce(value, delay = 400) {
  const [deboucedValue, setDeboucedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDeboucedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return deboucedValue;
}
