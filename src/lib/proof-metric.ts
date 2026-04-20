import type { ProofMetric } from "@/types";

/** Values with no digits are narrative outcomes — not numeric hero metrics. */
export function isQuantitativeProofMetric(metric: Pick<ProofMetric, "value">): boolean {
  return /\d/.test(metric.value);
}
