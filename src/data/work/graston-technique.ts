import type { CaseStudy } from "@/types";

export const grastonTechnique: CaseStudy = {
  slug: "graston-technique",
  title: "Clinician Education — CRM, Website, Directory & Training Follow-Up",
  clientName: "Graston Technique®",
  clientContext: "Healthcare training · Clinician certification · National platform",
  location: "Indianapolis, IN",
  timeline: "18-month fractional engagement",
  engagementFormat: "fractional",
  outcomeTags: ["Pipeline Growth", "Systems Built", "MarTech Integration", "Automation"],
  problemClusters: ["no-strategy-owner", "disconnected-systems", "pipeline-not-predictable"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
    { value: "95%", label: "Manual overhead eliminated" },
    { value: "81", label: "Active providers in live spatial directory" },
    { value: "8", label: "Manual workflows replaced with automation" },
  ],
  primaryMetric: {
    value: "+212%",
    label: "Qualified leads generated",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "lead-gen",
  outcomeHeadline: "+212% qualified leads — full platform rebuild",
  resultSummary:
    "The full Graston Technique marketing system rebuilt from the ground up: lead capture, CRM automation, provider directory, training pipeline, attribution, and reporting. Eight manual processes eliminated. Qualified lead volume more than tripled.",
  heroSubhead:
    "A clinician education platform with national reach but disconnected leads, no CRM, and no clear attribution. Rebuilt web, CRM, directory, and follow-up as one program.",
  whyThisMattered:
    "Graston Technique trains licensed clinicians across the U.S. Each trained provider represents a long-term revenue relationship and a network referral node. A broken lead system wasn't just an operational problem — it was a compounding revenue leak at scale.",
  whatWasBroken: [
    "No CRM — leads from events, web, and outreach lived in disconnected spreadsheets",
    "Provider directory was a static PDF updated manually; search was impossible",
    "Training event registrations were processed through email threads with no automation",
    "Marketing had no attribution — nobody knew which channels produced qualified clinicians",
    "Eight recurring workflows (event follow-up, CE tracking, provider communications) depended entirely on manual staff effort",
  ],
  buildSections: [
    {
      title: "CRM architecture and lead unification",
      description:
        "HubSpot implemented from zero. All lead sources — web forms, event registrations, referrals, and outreach — unified into a single pipeline with consistent source tracking. Pipeline stages defined around the clinician buying journey: awareness, training interest, registered, certified, active.",
    },
    {
      title: "Provider directory — live spatial search",
      description:
        "Static PDF replaced with a real-time interactive map built on Cloudflare Workers. 81 credentialed providers loaded from the CRM, searchable by specialty, location, and certification level. Directory syncs automatically as providers complete training.",
    },
    {
      title: "Training enrollment and follow-up automation",
      description:
        "Eight manual workflows were rebuilt as automated follow-up: event registration confirmation, pre-event preparation, post-training CE delivery, recertification reminders, and lapsed-provider reactivation, all triggered by CRM state changes.",
    },
    {
      title: "Provider directory and membership path",
      description:
        "Provider discovery was connected to member and credential data so the public directory, visibility, and next-step conversion stay in sync.",
    },
    {
      title: "Analytics and attribution overhaul",
      description:
        "UTM architecture and attribution mapping connected paid, organic, event, and referral channels to CRM stage progression so leadership could evaluate qualified pipeline movement, not just campaign activity.",
    },
    {
      title: "AI and smart support tooling layer",
      description:
        "Support-facing workflows were structured into repeatable tooling patterns so recurring provider and learner requests could be handled with more consistency and less manual escalation.",
    },
  ],
  operatingImpact:
    "The team runs the same volume of outreach and events with substantially less manual coordination. Leads no longer fall through during high-volume periods. Providers self-serve key enrollment and certification steps, and leadership decisions are now driven by pipeline-stage and attribution evidence.",
  implementationLayers: [
    "HubSpot CRM",
    "Cloudflare Workers",
    "Custom spatial search",
    "UTM attribution layer",
    "Automated nurture sequences",
    "Provider membership path logic",
    "Support workflow tooling",
    "CE certificate delivery",
    "Recertification tracking",
  ],
  implementationStackCategories: [
    "revenue-crm",
    "analytics-growth",
    "infrastructure-platform",
  ],
  implementationPlatformSlugs: [
    "hubspot",
    "cloudflare",
    "cloudflare-workers",
    "google",
    "googlecloud",
    "wordpress",
  ],
  relatedToolSlugs: ["growth-system-audit", "attribution-snapshot"],
  relatedServiceSlugs: ["fractional-cmo", "martech-stack-build", "automation-systems", "attribution-analytics"],
  relatedProblemSlugs: ["no-strategy-owner", "disconnected-systems", "pipeline-not-predictable"],
  relatedProofSlugs: ["graston-qualified-leads", "graston-growth-engine"],
  systemsBuilt: [
    "HubSpot CRM",
    "Lead capture and attribution model",
    "Live provider directory and membership path",
    "Training enrollment and follow-up automation",
    "Support workflow tooling",
    "CE tracking and delivery",
  ],
  liveUrl: "https://graston-growth-engine.jacob-ba2.workers.dev",
  cloudinaryImages: ["3-website-page-promo"],
  featured: true,
  proofVisualizerType: "stack",
  projectType: "custom-infrastructure-product",
  buyerScenario: "operations-manual-fragmented",
  projectComplexity: "ongoing",
  scopeShape: "multi-channel",
  evidenceType: "quantified-pipeline",
  primarySimilaritySummary:
    "This is a fit if you run education or certification at scale and need CRM, a credible web and directory, attribution, and follow-up in one program—not a pile of tools.",
  publishedAt: "2024-06-01",
};
