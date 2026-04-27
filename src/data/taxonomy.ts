import type {
  BuyerScenarioId,
  EngagementFormat,
  OutcomeSlug,
  OutcomeTag,
  ProblemCluster,
  ProofEvidenceType,
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

export const OUTCOME_SLUG_LABELS: Record<OutcomeSlug, string> = {
  "lead-gen": "Lead generation",
  "conversion-lift": "Conversion lift",
  "time-saved": "Time saved / overhead",
  "traffic-growth": "Traffic & visibility",
  "brand-awareness": "Brand awareness",
  "pipeline-automation": "Pipeline automation",
  "system-consolidation": "System consolidation",
};

/** Buyer-facing implementation paths — aligns with /services lane IDs. */
export const PROJECT_PATH_ORDER: ProjectPathId[] = [
  "foundation",
  "build",
  "scale",
  "grow",
];

export const PROJECT_PATH_LABELS: Record<ProjectPathId, string> = {
  foundation: "Foundation",
  build: "Build",
  scale: "Scale",
  grow: "Grow",
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
  "brand-identity-system",
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
  "brand-identity-system": "Brand identity & guidelines",
  "conversion-path-repair": "Conversion path repair",
  "crm-automation-system": "CRM & automation",
  "local-growth-system": "Local growth & visibility",
  "reporting-attribution-system": "Reporting & attribution",
  "custom-infrastructure-product": "Custom product & infrastructure",
  "content-distribution-system": "Content & distribution",
  "ops-diagnostics": "Operations & diagnostic layer",
};

export const PROJECT_TYPE_RELATED_BUILD_LABELS: Record<ProjectTypeId, string> = {
  "website-brand-rebuild": "Website & brand system",
  "brand-identity-system": "Brand identity system",
  "conversion-path-repair": "Conversion repair system",
  "crm-automation-system": "Lead follow-up system",
  "local-growth-system": "Local visibility system",
  "reporting-attribution-system": "Reporting & attribution",
  "custom-infrastructure-product": "Custom product & infrastructure",
  "content-distribution-system": "Content distribution system",
  "ops-diagnostics": "Diagnostic system",
};

export const BUYER_SCENARIO_ORDER: BuyerScenarioId[] = [
  "demand-exists-conversion-leaks",
  "operations-manual-fragmented",
  "trust-routing-weak",
  "spend-visible-attribution-weak",
  "visibility-demand-gap",
];

export const BUYER_SCENARIO_LABELS: Record<BuyerScenarioId, string> = {
  "demand-exists-conversion-leaks": "You already have interest, but too few people become customers",
  "operations-manual-fragmented": "Leads and follow-up live in spreadsheets, inboxes, and one-off tools",
  "trust-routing-weak": "People find you, but the next step (book, buy, call) is unclear",
  "spend-visible-attribution-weak": "You’re spending on growth, but can’t see what actually works",
  "visibility-demand-gap": "Not enough of the right people discover you yet",
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
  "single-flow": "One primary user path (e.g. one tool or funnel)",
  "multi-page": "Site or experience spanning multiple pages",
  "crm-lifecycle": "CRM, email/SMS, and follow-up tied to the customer record",
  "reporting-visibility": "Dashboards, attribution, or operational reporting",
  "multi-channel": "Several channels and systems working as one (e.g. web + CRM + ads)",
};

export const PROOF_EVIDENCE_TYPE_ORDER: ProofEvidenceType[] = [
  "quantified-pipeline",
  "quantified-efficiency",
  "quantified-traffic-local",
  "reputation-and-retention",
  "product-usage-conversion",
  "documented-delivery",
  "mixed",
];

export const PROOF_EVIDENCE_TYPE_LABELS: Record<ProofEvidenceType, string> = {
  "quantified-pipeline": "Pipeline or conversion lift (numbers)",
  "quantified-efficiency": "Time saved or overhead reduced (numbers)",
  "quantified-traffic-local": "Traffic, local pack, or discovery (numbers)",
  "reputation-and-retention": "Reviews, repeat business, or trust signals",
  "product-usage-conversion": "In-product behavior (sessions, completion, tool conversion)",
  "documented-delivery": "Delivered system or creative, narrated outcome",
  mixed: "More than one evidence type",
};

