import styles from "./Loader.module.css";
import { ReactComponent as VectorLogo } from "../../Assets/logo-vector.svg";

export default function Loader({ progress }) {
  const pct = Math.min(100, Math.floor(progress));

  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className={styles.mark}>
        <VectorLogo width={40} height={40} />
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
