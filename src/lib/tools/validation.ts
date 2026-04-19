import { FRAGMENTATION_WEIGHTS, SCORE_BANDS, type FragmentationBand } from "@/data/tools/fragmentation-rules";
import type { FragmentationInputs } from "@/types/tools";

export interface FragmentationScoreResult {
  score: number;
  band: FragmentationBand;
}

export function computeFragmentationScore(input: FragmentationInputs): FragmentationScoreResult {
  let score = 0;

  if (!input.crm) score += FRAGMENTATION_WEIGHTS.missing_crm;
  if (!input.booking) score += FRAGMENTATION_WEIGHTS.disconnected_booking;
  if (!input.reporting.length) score += FRAGMENTATION_WEIGHTS.missing_reporting_layer;

  score += input.duplicateEntryPoints * FRAGMENTATION_WEIGHTS.duplicate_entry_points;
  score += input.manualExportsPerWeek * FRAGMENTATION_WEIGHTS.manual_exports_per_week;

  const overlapCount =
    Math.max(0, input.analytics.length - 1) +
    Math.max(0, input.ads.length - 1) +
    Math.max(0, input.automation.length - 1);

  score += overlapCount * FRAGMENTATION_WEIGHTS.tool_overlap;
  score = Math.min(100, Math.max(0, Math.round(score)));

  const band =
    SCORE_BANDS.find((b) => score <= b.max) ?? SCORE_BANDS[SCORE_BANDS.length - 1];

  return { score, band };
}
