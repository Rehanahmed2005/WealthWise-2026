import LogoMark from "../shared/LogoMark.jsx";
import styles from "./LogoReveal.module.css";

export default function LogoReveal() {
  return (
    <div className={styles.reveal}>
      <div className={styles.mark}>
        <LogoMark size={96} />
      </div>
      <div className={styles.word}>WEALTHWISE</div>
    </div>
  );
}
