import type {
  EngagementFormat,
  OutcomeSlug,
  OutcomeTag,
  ProblemCluster,
  ServiceCluster,
  TrustLadderStage,
} from "@/types";

export const PROBLEM_CLUSTERS: ProblemCluster[] = [
  "no-strategy-owner",
  "site-not-converting",
  "disconnected-systems",
  "not-visible-enough",
  "brand-system-broken",
  "pipeline-not-predictable",
];

export const TRUST_LADDER_STAGES: TrustLadderStage[] = [
  "browse",
  "evaluate",
  "qualify",
  "commit",
  "return",
];

export const OUTCOME_TAGS: OutcomeTag[] = [
  "Pipeline Growth",
  "Systems Built",
  "MarTech Integration",
  "Attribution & Analytics",
  "Automation",
  "CRM Architecture",
];

export const SERVICE_CLUSTERS: ServiceCluster[] = [
  "fractional-cmo",
  "martech-stack-build",
  "crm-architecture",
  "automation-systems",
  "attribution-analytics",
  "content-seo-systems",
];

export const ENGAGEMENT_FORMATS: EngagementFormat[] = [
  "fractional",
  "project",
  "diagnostic",
];

export const OUTCOME_SLUG_LABELS: Record<OutcomeSlug, string> = {
  "lead-gen": "Lead generation",
  "conversion-lift": "Conversion lift",
  "time-saved": "Time saved / overhead",
  "traffic-growth": "Traffic & visibility",
  "brand-awareness": "Brand awareness",
  "pipeline-automation": "Pipeline automation",
  "system-consolidation": "System consolidation",
};

/** Order of filter chips on /proof */
export const OUTCOME_SLUG_ORDER: OutcomeSlug[] = [
  "lead-gen",
  "conversion-lift",
  "time-saved",
  "traffic-growth",
  "pipeline-automation",
  "system-consolidation",
  "brand-awareness",
];
