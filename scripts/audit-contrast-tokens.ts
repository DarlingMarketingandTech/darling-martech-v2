/**
 * Lightweight token contrast checker.
 * Extend TOKEN_PAIRS with actual CSS variables as the visual system matures.
 */

type RGB = [number, number, number];

const TOKEN_PAIRS: Array<{ name: string; foreground: string; background: string; min: number }> = [
  { name: "body-muted-on-dark", foreground: "#b7b3ac", background: "#0c0c0e", min: 4.5 },
  { name: "foreground-on-dark", foreground: "#f5f4f0", background: "#0c0c0e", min: 4.5 },
  { name: "signal-on-dark", foreground: "#0fd9c8", background: "#0c0c0e", min: 3 },
];

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const bigint = Number.parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function channel(value: number) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance([r, g, b]: RGB) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg: string, bg: string) {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

let failures = 0;

for (const pair of TOKEN_PAIRS) {
  const ratio = contrast(pair.foreground, pair.background);
  const passed = ratio >= pair.min;
  console.log(`${passed ? "PASS" : "FAIL"} ${pair.name}: ${ratio.toFixed(2)}:1`);

  if (!passed) failures += 1;
}

if (failures > 0) {
  process.exit(1);
}
