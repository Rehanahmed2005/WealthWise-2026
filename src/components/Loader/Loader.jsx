import LogoMark from "../shared/LogoMark.jsx";
import styles from "./Loader.module.css";

export default function Loader({ progress }) {
  const pct = Math.min(100, Math.floor(progress));

  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className={styles.mark}>
        <LogoMark size={40} />
      </div>
      <div className={styles.barRow}>
        <span className={styles.mono}>INITIALIZING WEALTHWISE — {pct}%</span>
        <span className={`${styles.mono} ${styles.path}`}>
          /LEARN/PRACTICE/EARN
        </span>
      </div>
      <div className={styles.rule}>
        <div
          className={styles.ruleFill}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}
