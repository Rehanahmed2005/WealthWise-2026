import styles from "./LogoReveal.module.css";
import { ReactComponent as VectorLogo } from "../../Assets/logo-vector.svg";

export default function LogoReveal() {
  return (
    <div className={styles.reveal}>
      <div className={styles.mark}>
        <VectorLogo width={96} height={96} />
      </div>
      <div className={styles.word}>WEALTHWISE</div>
    </div>
  );
}
