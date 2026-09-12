import { useEffect, useRef } from "react";
import { colors } from "../../styles/tokens.js";
import styles from "./Reticle.module.css";

/**
 * A small crosshair that tracks the cursor within the given container ref.
 * The system cursor is hidden over that container (see Hero.module.css)
 * so this stands in as the pointer.
 */
export default function Reticle({ containerRef }) {
  const dotRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const dot = dotRef.current;
    if (!container || !dot) return;

    function onMove(e) {
      const rect = container.getBoundingClientRect();
      dot.style.transform = `translate(${e.clientX - rect.left - 10}px, ${
        e.clientY - rect.top - 10
      }px)`;
      dot.style.opacity = "1";
    }
    function onLeave() {
      dot.style.opacity = "0";
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  return (
    <div ref={dotRef} className={styles.reticle} aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <line x1="10" y1="0" x2="10" y2="6" stroke={colors.green} strokeWidth="1.4" />
        <line x1="10" y1="14" x2="10" y2="20" stroke={colors.green} strokeWidth="1.4" />
        <line x1="0" y1="10" x2="6" y2="10" stroke={colors.green} strokeWidth="1.4" />
        <line x1="14" y1="10" x2="20" y2="10" stroke={colors.green} strokeWidth="1.4" />
      </svg>
    </div>
  );
}
