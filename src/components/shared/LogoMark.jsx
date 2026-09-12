import { colors } from "../../styles/tokens.js";

/**
 * WealthWise wordmark icon: three ascending bars (growth) with a gold
 * accent dot, echoing the mark from the original pitch deck.
 */
export default function LogoMark({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect x="6" y="20" width="9" height="22" rx="4" fill={colors.green} />
      <rect x="19.5" y="10" width="9" height="32" rx="4" fill={colors.green} />
      <rect x="33" y="24" width="9" height="18" rx="4" fill={colors.green} />
      <circle cx="37.5" cy="10" r="4.5" fill={colors.gold} />
    </svg>
  );
}
