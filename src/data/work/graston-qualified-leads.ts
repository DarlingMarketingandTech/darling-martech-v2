import type { CaseStudy } from "@/types";

export const grastonQualifiedLeads: CaseStudy = {
  slug: "graston-qualified-leads",
  title: "Qualified Lead Pipeline & Strategy Ownership",
  clientName: "Graston Technique®",
  clientContext: "Healthcare training · SaaS-adjacent",
  location: "Indianapolis, IN",
  timeline: "18-month fractional engagement",
  engagementFormat: "fractional",
  outcomeTags: ["Pipeline Growth", "MarTech Integration"],
  problemClusters: ["no-strategy-owner", "pipeline-not-predictable"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
    { value: "8", label: "Manual processes replaced with automation" },
  ],
  primaryMetric: {
    value: "+212%",
    label: "Qualified leads generated",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "lead-gen",
  outcomeHeadline: "+212% qualified leads",
  resultSummary:
    "Eight manual processes automated. Static directory rebuilt into a live training pipeline. Strategic ownership tied positioning, lead capture, and measurement together.",
  fullStory:
    "Graston needed a senior owner for the full marketing system, not another vendor layer. The work rebuilt lead generation, lifecycle orchestration, and measurement so qualified demand could compound instead of leaking through manual handoffs.",
  heroSubhead:
    "Qualified-lead growth was unlocked by pairing strategic ownership with disciplined system rebuilds across acquisition, lifecycle, and reporting.",
  whyThisMattered:
    "When a clinician education brand operates across multiple channels and touchpoints, lead quality depends on system consistency. Without strategic ownership and shared pipeline logic, demand volume can grow while conversion quality declines.",
  whatWasBroken: [
    "Qualified lead volume was constrained by disconnected lifecycle handling and manual follow-up dependencies",
    "Channel activity was visible, but stage-based pipeline progression lacked consistent ownership",
    "Provider and learner journeys were not measured as a unified demand system",
  ],
  buildSections: [
    {
      title: "Strategic ownership and lead qualification model",
      description:
        "A single operating owner aligned positioning, acquisition channels, and qualification criteria so the system optimized for qualified clinician demand, not just top-of-funnel activity.",
    },
    {
      title: "Lifecycle automation support for lead quality",
      description:
        "Lifecycle checkpoints and follow-up logic were standardized so lead progression stayed consistent through training and provider conversion stages.",
    },
    {
      title: "Qualified-pipeline reporting structure",
      description:
        "Reporting shifted toward qualified-stage movement and source contribution, giving leadership a repeatable way to evaluate lead quality and system performance over time.",
    },
  ],
  operatingImpact:
    "Graston gained a lead-generation system that could scale qualified demand with less operational drift. Strategic decisions, lifecycle execution, and reporting now reference the same qualification model.",
  implementationLayers: [
    "Strategic lead qualification model",
    "Lifecycle progression automation",
    "Channel-to-pipeline attribution mapping",
    "Qualified-stage reporting framework",
  ],
  systemsBuilt: [
    "Qualified lead model",
    "Lifecycle nurture framework",
    "Training pipeline progression logic",
    "Attribution and reporting baseline",
  ],
  implementationStackCategories: ["revenue-crm", "analytics-growth"],
  implementationPlatformSlugs: ["salesforce", "google", "wordpress"],
  cloudinaryImages: ["3-website-page-promo"],
  featured: true,
  proofVisualizerType: "trend",
  projectType: "conversion-path-repair",
  buyerScenario: "demand-exists-conversion-leaks",
  projectComplexity: "multi-surface",
  scopeShape: "crm-lifecycle",
  primarySimilaritySummary:
    "Teams with real demand but unclear qualification, lifecycle ownership, and pipeline-stage reporting.",
  publishedAt: "2024-01-01",
};
