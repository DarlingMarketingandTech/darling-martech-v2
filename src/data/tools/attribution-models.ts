export const ATTRIBUTION_CLARITY_BANDS = [
  { max: 30, label: "Attribution is fog", severity: "critical" },
  { max: 55, label: "Attribution is directional", severity: "risk" },
  { max: 80, label: "Attribution is workable", severity: "watch" },
  { max: 100, label: "Attribution is defensible", severity: "healthy" },
] as const;

export type AttributionClarityBand = (typeof ATTRIBUTION_CLARITY_BANDS)[number];

export function classifyClarityScore(score: number): AttributionClarityBand {
  const match = ATTRIBUTION_CLARITY_BANDS.find((band) => score <= band.max);
  return match ?? ATTRIBUTION_CLARITY_BANDS[ATTRIBUTION_CLARITY_BANDS.length - 1];
}
