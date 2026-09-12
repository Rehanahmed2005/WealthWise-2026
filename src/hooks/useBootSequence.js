import { useEffect, useState } from "react";

const LOAD_DURATION_MS = 1200;
const LOGO_DURATION_MS = 900;

/**
 * Drives the boot sequence: loading -> logo -> ready.
 * Plays in full on every mount (initial load and every reload) —
 * intentionally not persisted across visits.
 */
export function useBootSequence() {
  const [phase, setPhase] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId;
    const start = performance.now();

    function tick(now) {
      const pct = Math.min(100, ((now - start) / LOAD_DURATION_MS) * 100);
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("logo"), 150);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (phase !== "logo") return;
    const timer = setTimeout(() => setPhase("ready"), LOGO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  return { phase, progress };
}
