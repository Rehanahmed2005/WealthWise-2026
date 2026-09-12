import { useRef } from "react";
import { useNetworkCanvas } from "../../hooks/useNetworkCanvas.js";
import styles from "./NetworkCanvas.module.css";

export default function NetworkCanvas() {
  const canvasRef = useRef(null);
  useNetworkCanvas(canvasRef);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
