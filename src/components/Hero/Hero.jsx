import { useRef } from "react";
import { useBootSequence } from "../../hooks/useBootSequence.js";
import Loader from "../Loader/Loader.jsx";
import LogoReveal from "../LogoReveal/LogoReveal.jsx";
import Nav from "../Nav/Nav.jsx";
import NetworkCanvas from "./NetworkCanvas.jsx";
import Reticle from "./Reticle.jsx";
import styles from "./Hero.module.css";

/**
 * Top-level hero experience: boot sequence (loading -> logo reveal),
 * then the nav + hero itself. Drop this into any page as <Hero />.
 */
export default function Hero() {
  const { phase, progress } = useBootSequence();
  const heroRef = useRef(null);

  if (phase === "loading") return <Loader progress={progress} />;
  if (phase === "logo") return <LogoReveal />;

  return (
    <>
      <Nav />
      <section className={styles.hero} ref={heroRef}>
        <NetworkCanvas />
        <div className={styles.frame} aria-hidden="true" />
        <Reticle containerRef={heroRef} />

        <div className={styles.tag}>GAMIFIED FINANCIAL LITERACY</div>

        <h1 className={styles.headline}>
          <span>LEARN.</span>
          <span>PRACTICE.</span>
          <span className={styles.gold}>EARN.</span>
        </h1>

        <p className={styles.sub}>
          Achieving financial goals, the <strong>WealthWise</strong> way —
          gamified lessons, real simulations, and rewards that make money
          make sense.
        </p>

        <div className={styles.scrollCue}>SCROLL</div>
      </section>
    </>
  );
}
