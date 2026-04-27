import type { CaseStudy } from "@/types";

export const grastonQualifiedLeads: CaseStudy = {
  slug: "graston-qualified-leads",
  title: "Graston — Qualified Leads, CRM & Strategy Ownership",
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
    "Graston needed a senior owner for the full marketing system, not another vendor layer. The work rebuilt lead generation, handoffs and follow-up, and measurement so qualified demand could compound instead of leaking through manual steps.",
  heroSubhead:
    "Qualified-lead growth came from pairing strategic ownership with disciplined rebuilds across acquisition, follow-up, and reporting.",
  whyThisMattered:
    "When a clinician education brand operates across multiple channels and touchpoints, lead quality depends on system consistency. Without strategic ownership and shared pipeline logic, demand volume can grow while conversion quality declines.",
  whatWasBroken: [
    "Qualified lead volume was limited by scattered follow-up and no single owner of the pipeline",
    "Channel activity was visible, but stage-by-stage pipeline progression lacked consistent ownership",
    "Provider and learner journeys were not measured as one demand story",
  ],
  buildSections: [
    {
      title: "Strategic ownership and lead qualification model",
      description:
        "A single operating owner aligned positioning, acquisition channels, and qualification criteria so the system optimized for qualified clinician demand, not just top-of-funnel activity.",
    },
    {
      title: "Follow-up automation to protect lead quality",
      description:
        "Checkpoints and follow-up rules were standardized so lead progression stayed consistent through training and provider conversion stages.",
    },
    {
      title: "Qualified-pipeline reporting structure",
      description:
        "Reporting shifted toward qualified-stage movement and source contribution, giving leadership a repeatable way to evaluate lead quality and system performance over time.",
    },
  ],
  operatingImpact:
    "Graston gained a lead-generation program that can scale qualified demand with less operational drift. Strategy, follow-up, and reporting now use the same qualification model.",
  implementationLayers: [
    "Strategic lead qualification model",
    "Stage-based follow-up automation",
    "Channel-to-pipeline attribution mapping",
    "Qualified-stage reporting framework",
  ],
  systemsBuilt: [
    "Qualified lead model",
    "Nurture and follow-up framework",
    "Training pipeline progression logic",
    "Attribution and reporting baseline",
  ],
  implementationStackCategories: ["revenue-crm", "analytics-growth"],
  implementationPlatformSlugs: ["salesforce", "google", "wordpress"],
  implementationGroupSummary: {
    "analytics-data":
      "Qualified-stage reporting made it easier to see which sources created real clinician demand instead of shallow activity.",
    "crm-automation":
      "Follow-up and qualification rules protected lead quality between acquisition and registration.",
    "conversion-booking":
      "The path from interest to a qualified next step was tightened so more demand survived the handoff.",
  },
  relatedBuildTypeLabel: "Lead follow-up system",
  proofDetailHeroAlt:
    "Graston qualified-lead pipeline visual showing conversion flow from search and ads into tracked clinician demand.",
  proofDetailSupportVisuals: [
    {
      publicId: "graston_data_visualization_dashboard",
      alt: "Graston dashboard showing qualified lead reporting and channel contribution.",
      label: "Qualified-pipeline reporting view",
    },
  ],
  cloudinaryImages: ["Google_Ads_lead_conversion_pipeline_for_the_Graston_Technique"],
  featured: true,
  proofVisualizerType: "trend",
  projectType: "conversion-path-repair",
  buyerScenario: "demand-exists-conversion-leaks",
  projectComplexity: "multi-surface",
  scopeShape: "crm-lifecycle",
  evidenceType: "quantified-pipeline",
  primarySimilaritySummary:
    "This is a fit if you get interest from campaigns and events but lose qualified people between handoffs, CRM stages, and reporting.",
  publishedAt: "2024-01-01",
};
