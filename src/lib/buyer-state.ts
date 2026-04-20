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

/** Paid diagnostic entry offer — canonical route for roadmap CTAs on problem pages. */
export const TECHNICAL_ROADMAP_HREF = "/services/technical-roadmap" as const;

export type ProblemNextStepCopy = {
  title: string;
  subhead: string;
  primaryColumnKicker: string;
  foundationTitle: string;
  foundationBody: string;
  foundationPrimaryLabel: string;
  foundationSecondaryLabel: string;
};

export function getProblemNextStepCopy(state: BuyerState): ProblemNextStepCopy {
  if (state === "broken") {
    return {
      title: "Stabilize the operating layer before you optimize louder.",
      subhead:
        "Broken-system path: name where the stack leaks, validate the fix class with proof from similar environments, then choose implementation depth — including a paid roadmap if you need a written sequence first.",
      primaryColumnKicker: "Repair-first sequence",
      foundationTitle: "Need a written plan before large build commits?",
      foundationBody:
        "Technical Roadmap is a paid diagnostic: prioritized gaps, integration and security view, and what to build in what order — fee credits forward if you proceed into implementation.",
      foundationPrimaryLabel: "Review roadmap SKUs →",
      foundationSecondaryLabel: "Back to diagnostics on this page →",
    };
  }

  if (state === "missing") {
    return {
      title: "Build the missing layer, then attach channels.",
      subhead:
        "Missing-system path: map capture, intake, and follow-up foundations before tuning campaigns — proof shows what complete stacks look like under real operating load.",
      primaryColumnKicker: "Foundation-first sequence",
      foundationTitle: "Sequence what to stand up first",
      foundationBody:
        "When core paths barely exist, the roadmap engagement focuses on what to stand up first, what can wait, and how to avoid rebuilding twice.",
      foundationPrimaryLabel: "Open Technical Roadmap →",
      foundationSecondaryLabel: "Run the top diagnostic on this page →",
    };
  }

  return {
    title: "Partition repair work from net-new capability — then fund in order.",
    subhead:
      "Both patterns often show up together: stop funding net-new features on top of a stack that still leaks — use diagnostics and a roadmap to separate stabilize versus build.",
    primaryColumnKicker: "Diagnose, then sequence",
    foundationTitle: "Use a roadmap to split stabilize vs build",
    foundationBody:
      "A guided diagnostic clarifies what to repair in the existing layer versus what to net-new so the next dollars land in the right order.",
    foundationPrimaryLabel: "Explore Technical Roadmap →",
    foundationSecondaryLabel: "Open closest proof first →",
  };
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

