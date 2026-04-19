export const DEMAND_DEFAULTS = {
  monthlySpend: 15_000,
  cpc: 4.5,
  clickToLeadRate: 0.06,
  leadToCustomerRate: 0.1,
  averageLtv: 6_500,
};

export const LTV_CAC_BENCHMARKS = {
  unhealthy: { max: 1.5, label: "Acquisition is burning cash" },
  fragile: { max: 3, label: "Fragile unit economics" },
  healthy: { max: 5, label: "Healthy unit economics" },
  leveraged: { max: Infinity, label: "Leveraged unit economics" },
} as const;

export type LtvCacBand = keyof typeof LTV_CAC_BENCHMARKS;

export function classifyLtvToCac(ratio: number): {
  band: LtvCacBand;
  label: string;
} {
  if (ratio <= LTV_CAC_BENCHMARKS.unhealthy.max) {
    return { band: "unhealthy", label: LTV_CAC_BENCHMARKS.unhealthy.label };
  }
  if (ratio <= LTV_CAC_BENCHMARKS.fragile.max) {
    return { band: "fragile", label: LTV_CAC_BENCHMARKS.fragile.label };
  }
  if (ratio <= LTV_CAC_BENCHMARKS.healthy.max) {
    return { band: "healthy", label: LTV_CAC_BENCHMARKS.healthy.label };
  }
  return { band: "leveraged", label: LTV_CAC_BENCHMARKS.leveraged.label };
}
