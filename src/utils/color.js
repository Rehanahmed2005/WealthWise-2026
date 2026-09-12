// Converts a "#rrggbb" hex string to an rgba() string at the given alpha.
// Used by canvas drawing code, which needs literal color strings.
export function hexToRgba(hex, alpha = 1) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
