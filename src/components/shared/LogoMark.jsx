import { colors } from "../../styles/tokens.js";
import { useId } from "react";

/**
 * WealthWise wordmark icon: three ascending bars (growth) with a gold
 * accent dot, redesigned as a single flowing stroke path for better
 * visual harmony and scalability.
 */
export default function LogoMark({ size = 28 }) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.green} />
          <stop offset="100%" stopColor={colors.greenDark} />
        </linearGradient>
      </defs>
      <path
        d="M6 28
           C6 24, 8 20, 12 20
           C16 20, 18 24, 18 28
           C18 32, 14 36, 10 36
           C6 36, 6 32, 6 28
           M19.5 16
           C19.5 12, 21.5 8, 25.5 8
           C29.5 8, 31.5 12, 31.5 16
           C31.5 20, 29.5 24, 27.5 24
           C25.5 24, 23.5 20, 23.5 16
           M33 26
           C33 22, 35 18, 39 18
           C43 18, 45 22, 45 26
           C45 30, 43 34, 39 34
           C35 34, 33 30, 33 26"
        stroke={"url(#" + gradientId + ")"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="37.5" cy="10" r="4.5" fill={colors.gold} />
    </svg>
  );
}
