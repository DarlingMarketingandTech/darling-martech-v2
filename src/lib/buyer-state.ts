import type { CaseStudy, ProblemCluster } from "@/types";

export type BuyerState = "broken" | "missing" | "both";

const PROBLEM_BUYER_STATE: Record<ProblemCluster, BuyerState> = {
  "no-strategy-owner": "broken",
  "site-not-converting": "both",
  "disconnected-systems": "both",
  "not-visible-enough": "both",
  "brand-system-broken": "both",
  "pipeline-not-predictable": "broken",
};

const BROKEN_ONLY: ProblemCluster[] = ["no-strategy-owner", "pipeline-not-predictable"];
const MISSING_WEIGHTED: ProblemCluster[] = [
  "site-not-converting",
  "disconnected-systems",
  "not-visible-enough",
  "brand-system-broken",
];

export function getProblemBuyerState(problemSlug: ProblemCluster): BuyerState {
  return PROBLEM_BUYER_STATE[problemSlug];
}

export function getBuyerStateLabel(state: BuyerState): string {
  if (state === "broken") return "Best for broken systems";
  if (state === "missing") return "Best for missing systems";
  return "Best for both states";
}

export function getCaseStudyBuyerState(caseStudy: CaseStudy): BuyerState {
  let brokenMatches = 0;
  let missingMatches = 0;

  for (const cluster of caseStudy.problemClusters) {
    if (BROKEN_ONLY.includes(cluster)) brokenMatches += 1;
    if (MISSING_WEIGHTED.includes(cluster)) missingMatches += 1;
  }

  if (brokenMatches > 0 && missingMatches > 0) return "both";
  if (brokenMatches > 0) return "broken";
  if (missingMatches > 0) return "missing";

  return "both";
}

