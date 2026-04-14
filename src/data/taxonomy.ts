import type {
  EngagementFormat,
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
