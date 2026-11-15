import { useEffect, useState } from "react";

const START = 6 * 3600 + 44 * 60 + 58;
const fmt = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [left, setLeft] = useState(START);
  useEffect(() => {
    const id = setInterval(() => setLeft((l) => (l > 0 ? l - 1 : START)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
  return <div className="bg-sale-soft px-3 py-1.5 text-xs font-medium text-foreground">{fmt(h)}:{fmt(m)}:{fmt(s)}</div>;
}
