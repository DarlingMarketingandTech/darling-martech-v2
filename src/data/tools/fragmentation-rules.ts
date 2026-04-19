export const FRAGMENTATION_WEIGHTS = {
  missing_crm: 20,
  duplicate_entry_points: 10,
  manual_exports_per_week: 3,
  tool_overlap: 5,
  missing_reporting_layer: 15,
  disconnected_booking: 12,
} as const;

export type FragmentationSeverity = "healthy" | "watch" | "risk" | "critical";

export interface FragmentationBand {
  max: number;
  label: string;
  severity: FragmentationSeverity;
}

export const SCORE_BANDS: FragmentationBand[] = [
  { max: 24, label: "Low fragmentation", severity: "healthy" },
  { max: 49, label: "Moderate fragmentation", severity: "watch" },
  { max: 74, label: "High fragmentation", severity: "risk" },
  { max: 100, label: "Severe fragmentation", severity: "critical" },
];
