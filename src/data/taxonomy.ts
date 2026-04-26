import type {
  BuyerScenarioId,
  EngagementFormat,
  OutcomeSlug,
  OutcomeTag,
  ProblemCluster,
  ProjectComplexity,
  ProjectTypeId,
  ScopeShape,
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

/**
 * Canonical list of all service slugs. Kept in sync with the `ServiceCluster`
 * type in `src/types/index.ts`. Grouped by pillar for readability.
 */
export const SERVICE_CLUSTERS: ServiceCluster[] = [
  // Revenue Engineering
  "fractional-cmo",
  "attribution-analytics",
  "content-seo-systems",
  "digital-marketing-strategy",
  "paid-media-management",
  "conversion-optimization",
  "technical-roadmap",
  // Intelligent Automation
  "ai-automation",
  "automation-systems",
  "martech-stack-build",
  "crm-architecture",
  // Custom Infrastructure
  "custom-infrastructure",
  // Brand & Experience Systems
  "brand-identity",
  "website-design",
  "content-creation",
  "social-media-marketing",
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

/** Primary proof hub browse order — project shape first */
export const PROJECT_TYPE_ORDER: ProjectTypeId[] = [
  "website-brand-rebuild",
  "conversion-path-repair",
  "crm-automation-system",
  "local-growth-system",
  "reporting-attribution-system",
  "custom-infrastructure-product",
  "content-distribution-system",
  "ops-diagnostics",
];

export const PROJECT_TYPE_LABELS: Record<ProjectTypeId, string> = {
  "website-brand-rebuild": "Website & brand system",
  "conversion-path-repair": "Conversion path repair",
  "crm-automation-system": "CRM & automation system",
  "local-growth-system": "Local growth & visibility",
  "reporting-attribution-system": "Reporting & attribution",
  "custom-infrastructure-product": "Custom product & infrastructure",
  "content-distribution-system": "Content & distribution",
  "ops-diagnostics": "Operations & diagnostic layer",
};

export const BUYER_SCENARIO_ORDER: BuyerScenarioId[] = [
  "demand-exists-conversion-leaks",
  "operations-manual-fragmented",
  "trust-routing-weak",
  "spend-visible-attribution-weak",
  "visibility-demand-gap",
];

export const BUYER_SCENARIO_LABELS: Record<BuyerScenarioId, string> = {
  "demand-exists-conversion-leaks": "Demand exists but conversion leaks",
  "operations-manual-fragmented": "Operations are manual and fragmented",
  "trust-routing-weak": "Trust exists but routing is weak",
  "spend-visible-attribution-weak": "Spend is visible but attribution is weak",
  "visibility-demand-gap": "Visibility & demand gap",
};

export const PROJECT_COMPLEXITY_ORDER: ProjectComplexity[] = [
  "focused",
  "multi-surface",
  "integration",
  "ongoing",
];

export const PROJECT_COMPLEXITY_LABELS: Record<ProjectComplexity, string> = {
  focused: "Focused fix",
  "multi-surface": "Multi-surface rebuild",
  integration: "System integration",
  ongoing: "Ongoing operating layer",
};

export const SCOPE_SHAPE_ORDER: ScopeShape[] = [
  "single-flow",
  "multi-page",
  "crm-lifecycle",
  "reporting-visibility",
  "multi-channel",
];

export const SCOPE_SHAPE_LABELS: Record<ScopeShape, string> = {
  "single-flow": "Single route or flow",
  "multi-page": "Multi-page architecture",
  "crm-lifecycle": "CRM & lifecycle automation",
  "reporting-visibility": "Reporting & operational visibility",
  "multi-channel": "Multi-channel / full stack",
};
