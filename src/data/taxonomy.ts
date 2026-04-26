import type {
  BuyerScenarioId,
  EngagementFormat,
  OutcomeSlug,
  OutcomeTag,
  ProblemCluster,
  ProjectComplexity,
  ProjectPathId,
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

export const PROJECT_PATH_ORDER: ProjectPathId[] = [
  "funnel-architecture",
  "ops-automation",
  "brand-visibility",
  "diagnostic-products",
];

export const PROJECT_PATH_LABELS: Record<ProjectPathId, string> = {
  "funnel-architecture": "Funnel Architecture",
  "ops-automation": "Ops Automation",
  "brand-visibility": "Brand & Visibility",
  "diagnostic-products": "Diagnostic Products",
};

export const PROJECT_TYPE_ORDER: ProjectTypeId[] = [
  "full-funnel-system-build",
  "crm-and-lifecycle-automation",
  "local-visibility-and-conversion",
  "brand-identity-system",
  "interactive-diagnostic-product",
];

export const PROJECT_TYPE_LABELS: Record<ProjectTypeId, string> = {
  "full-funnel-system-build": "Full Funnel System Build",
  "crm-and-lifecycle-automation": "CRM & Lifecycle Automation",
  "local-visibility-and-conversion": "Local Visibility & Conversion",
  "brand-identity-system": "Brand Identity System",
  "interactive-diagnostic-product": "Interactive Diagnostic Product",
};

export const BUYER_SCENARIO_ORDER: BuyerScenarioId[] = [
  "needs-strategic-ownership",
  "needs-intake-and-follow-up-system",
  "needs-local-demand-capture",
  "needs-brand-clarity-system",
  "needs-self-serve-decision-support",
];

export const BUYER_SCENARIO_LABELS: Record<BuyerScenarioId, string> = {
  "needs-strategic-ownership": "Needs strategic ownership",
  "needs-intake-and-follow-up-system": "Needs intake and follow-up system",
  "needs-local-demand-capture": "Needs local demand capture",
  "needs-brand-clarity-system": "Needs brand clarity system",
  "needs-self-serve-decision-support": "Needs self-serve decision support",
};

export const PROJECT_COMPLEXITY_ORDER: ProjectComplexity[] = [
  "moderate",
  "high",
  "very-high",
];

export const PROJECT_COMPLEXITY_LABELS: Record<ProjectComplexity, string> = {
  moderate: "Moderate",
  high: "High",
  "very-high": "Very high",
};

export const SCOPE_SHAPE_ORDER: ScopeShape[] = [
  "single-system",
  "cross-system",
  "platform-layer",
];

export const SCOPE_SHAPE_LABELS: Record<ScopeShape, string> = {
  "single-system": "Single system",
  "cross-system": "Cross-system",
  "platform-layer": "Platform layer",
};

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
