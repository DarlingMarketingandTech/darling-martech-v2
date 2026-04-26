import type { CaseStudy } from "@/types";

export const grastonGrowthEngine: CaseStudy = {
  slug: "graston-growth-engine",
  title: "Graston Growth Engine — Automation Stack",
  clientName: "Graston Technique®",
  clientContext: "Healthcare training · Marketing automation",
  location: "Indianapolis, IN",
  timeline: "18-month fractional engagement",
  engagementFormat: "fractional",
  outcomeTags: ["Automation", "Systems Built", "MarTech Integration"],
  problemClusters: ["disconnected-systems", "no-strategy-owner"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "95%", label: "Manual overhead reduced", isHighlighted: true },
    { value: "81", label: "Providers in live spatial directory" },
    { value: "+212%", label: "Qualified leads generated" },
  ],
  primaryMetric: {
    value: "95%",
    label: "Manual overhead reduced",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "time-saved",
  outcomeHeadline: "95% less manual overhead",
  resultSummary:
    "Custom marketing automation platform replaced eight separate manual workflows. Real-time spatial search, connected CRM, and pipeline visibility from none to operational.",
  fullStory:
    "The Growth Engine work focused on replacing brittle manual workflows with durable automation so the team could scale outreach, events, and provider lifecycle operations without adding operational overhead.",
  heroSubhead:
    "Automation-first operating layer for a national clinician education platform where training, provider operations, and support workflows were previously manual.",
  whyThisMattered:
    "At national training scale, manual process drag compounds quickly. Each extra handoff increases response lag, data inconsistency, and missed follow-up windows. This engagement converted high-friction operations into a reliable system layer.",
  whatWasBroken: [
    "Training lifecycle steps depended on manual staff execution across multiple disconnected tools",
    "Provider directory and membership funnel operations were fragmented from CRM state changes",
    "Attribution and analytics signals were present but not structured as a decision-ready operating model",
    "Support workflows lacked a scalable automation layer for recurring provider and learner requests",
  ],
  buildSections: [
    {
      title: "Training lifecycle automation",
      description:
        "Core training lifecycle transitions were moved to automation triggers so confirmations, sequence timing, and downstream operational updates no longer depended on manual coordination.",
    },
    {
      title: "Provider directory and membership funnel system",
      description:
        "Provider status, listing visibility, and membership-funnel transitions were connected through one operational layer so directory integrity and conversion flow could stay synchronized.",
    },
    {
      title: "Analytics and attribution operating overhaul",
      description:
        "Attribution and performance reporting were restructured around pipeline-stage visibility so operators could prioritize by measurable operating outcomes instead of isolated activity metrics.",
    },
    {
      title: "AI and smart support workflow layer",
      description:
        "Recurring support and guidance flows were standardized into automation-friendly patterns so response consistency improved without increasing manual support burden.",
    },
  ],
  operatingImpact:
    "The Growth Engine now functions as an operational system, not a collection of manual tasks. Teams can execute training and provider workflows with less coordination overhead while maintaining clearer pipeline and performance visibility.",
  implementationLayers: [
    "Lifecycle automation orchestration",
    "Provider directory sync logic",
    "Membership funnel state management",
    "Attribution and analytics reporting layer",
    "Support automation framework",
    "CRM-connected workflow triggers",
  ],
  systemsBuilt: [
    "Training lifecycle automation",
    "Provider directory and membership funnel",
    "Attribution operating layer",
    "AI-assisted support workflows",
    "Spatial search infrastructure",
  ],
  implementationStackCategories: [
    "revenue-crm",
    "analytics-growth",
    "infrastructure-platform",
  ],
  implementationPlatformSlugs: [
    "salesforce",
    "google",
    "googlecloud",
    "apache",
    "mysql",
  ],
  liveUrl: "https://graston-growth-engine.jacob-ba2.workers.dev",
  cloudinaryImages: ["3-website-page-promo"],
  featured: true,
  proofVisualizerType: "pulse",
  projectType: "crm-automation-system",
  buyerScenario: "operations-manual-fragmented",
  projectComplexity: "integration",
  scopeShape: "multi-channel",
  primarySimilaritySummary:
    "High-volume B2B operators automating support, directory, and pipeline systems with AI-shaped workflows.",
  publishedAt: "2024-01-01",
};
