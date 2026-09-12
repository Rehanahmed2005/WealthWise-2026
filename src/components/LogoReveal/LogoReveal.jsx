import styles from "./LogoReveal.module.css";
import logoUrl from "../../Assets/logo-vector.svg";

export default function LogoReveal() {
  return (
    <div className={styles.reveal}>
      <div className={styles.mark}>
        <img src={logoUrl} alt="WealthWise logo" width={96} height={96} />
      </div>
      <div className={styles.word}>WEALTHWISE</div>
    </div>
  );
}
