import type { CaseStudy } from "@/types";

export const grastonGrowthEngine: CaseStudy = {
  slug: "graston-growth-engine",
  title: "Graston Growth Engine — Marketing Ops, CRM & Lead Follow-Up Automation",
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
    "Custom workflow layer replaced eight separate manual handoffs. Real-time map search, CRM-connected updates, and clear pipeline views from ad hoc to operational.",
  fullStory:
    "The Growth Engine work replaced brittle manual steps with reliable automation so the team could scale outreach, events, and provider follow-up without adding headcount for handoffs.",
  heroSubhead:
    "Automation-first operating layer for a national clinician education platform where training, provider operations, and support workflows were previously manual.",
  whyThisMattered:
    "At national training scale, manual process drag compounds quickly. Each extra handoff increases response lag, data inconsistency, and missed follow-up windows. This engagement converted high-friction operations into a reliable system layer.",
  whatWasBroken: [
    "Training and enrollment follow-up depended on staff updating several disconnected tools by hand",
    "Provider directory and membership updates did not track CRM state in real time",
    "Attribution and analytics data existed but did not roll up to clear weekly decisions",
    "Support work repeated the same questions with no shared templates or routing",
  ],
  buildSections: [
    {
      title: "Training enrollment and follow-up on autopilot",
      description:
        "Enrollments, reminders, and handoffs moved to automated triggers so timing and downstream updates no longer depended on staff chasing each step.",
    },
    {
      title: "Provider directory and membership in sync with CRM",
      description:
        "Provider status, listing visibility, and membership changes were wired to one layer so the public map and internal records match.",
    },
    {
      title: "Attribution and reporting you can act on each week",
      description:
        "Attribution and performance views were organized around pipeline stages so the team could prioritize by outcomes, not isolated activity metrics.",
    },
    {
      title: "Smarter, repeatable support responses",
      description:
        "Recurring support questions were organized into shared patterns and routing so answers stayed consistent without growing manual support load.",
    },
  ],
  operatingImpact:
    "The Growth Engine runs as a connected program, not a list of one-off tasks. Training and provider workflows need less day-to-day coordination, and leaders see pipeline and performance in the same place.",
  implementationLayers: [
    "Follow-up and enrollment orchestration",
    "Provider directory sync logic",
    "Membership state and CRM alignment",
    "Attribution and analytics reporting layer",
    "Support workflow patterns",
    "CRM-connected triggers",
  ],
  systemsBuilt: [
    "Training enrollment and follow-up automation",
    "Provider directory and membership path",
    "Attribution operating layer",
    "Assisted support workflows",
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
  implementationGroupSummary: {
    "analytics-data":
      "Weekly reporting was organized around pipeline and provider movement instead of one-off activity metrics.",
    "infrastructure-platform":
      "Directory sync, membership state, and CRM-connected triggers ran as one operating layer rather than manual handoffs.",
    "crm-automation":
      "Automation replaced enrollment, reminder, and follow-up tasks that staff had been handling by hand.",
  },
  relatedBuildTypeLabel: "Lead follow-up system",
  liveUrl: "https://graston-growth-engine.jacob-ba2.workers.dev",
  proofDetailHeroAlt:
    "Graston Growth Engine admin command center showing CRM-connected workflow orchestration and provider operations visibility.",
  proofDetailSupportVisuals: [
    {
      publicId: "graston-growth-engine_-_ai_assistant",
      alt: "Graston Growth Engine support assistant view for structured follow-up and repeated workflow handling.",
      label: "Support and follow-up workflow",
    },
  ],
  cloudinaryImages: ["graston-growth-engine_-_admin_command_center"],
  featured: true,
  proofVisualizerType: "pulse",
  projectType: "crm-automation-system",
  buyerScenario: "operations-manual-fragmented",
  projectComplexity: "integration",
  scopeShape: "multi-channel",
  evidenceType: "quantified-efficiency",
  primarySimilaritySummary:
    "This is a fit if your team is drowning in manual steps between CRM, events, the website, and support—and you need serious time back without new headcount for handoffs.",
  publishedAt: "2024-01-01",
};
