import { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { ReactComponent as VectorLogo } from "../../Assets/logo-vector.svg";

/**
 * Fixed top nav. Manages its own scrolled state so it can gain a
 * backdrop once the page scrolls, independent of whatever page uses it.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.left}>
        <VectorLogo width={24} height={24} />
        <span className={styles.brand}>WEALTHWISE</span>
      </div>
      <div className={styles.links}>
        <a href="#learn">Learn</a>
        <a href="#product">Product</a>
        <a href="#community">Community</a>
      </div>
      <button className={styles.cta}>GET STARTED</button>
    </nav>
  );
}
