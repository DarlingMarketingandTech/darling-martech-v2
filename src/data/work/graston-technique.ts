import type { CaseStudy } from "@/types";

export const grastonTechnique: CaseStudy = {
  slug: "graston-technique",
  title: "Clinician Education Platform — Full Marketing System Build",
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
    "A clinician education platform with national reach but no connected marketing system. Built the engine from scratch.",
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
      title: "Training pipeline automation",
      description:
        "Eight manual workflows rebuilt as automated sequences: event registration confirmation, pre-event preparation sequences, post-training CE certificate delivery, recertification reminders, and lapsed-provider reactivation. All triggered by CRM status, not staff memory.",
    },
    {
      title: "Attribution and reporting",
      description:
        "UTM architecture built and enforced across all channels. Attribution model connected paid, organic, event, and referral sources to CRM stage progression. Leadership reporting shifted from activity metrics to pipeline-stage and qualified-lead counts.",
    },
  ],
  operatingImpact:
    "The team runs the same volume of outreach and events with significantly less manual coordination. Leads no longer fall through during busy event periods. Providers self-serve registration and CE tracking. Marketing decisions are made on pipeline data instead of estimates.",
  implementationLayers: [
    "HubSpot CRM",
    "Cloudflare Workers",
    "Custom spatial search",
    "UTM attribution layer",
    "Automated nurture sequences",
    "CE certificate delivery",
    "Recertification tracking",
  ],
  relatedToolSlugs: ["growth-bottleneck-quiz", "attribution-snapshot"],
  relatedServiceSlugs: ["fractional-cmo", "martech-stack-build", "automation-systems", "attribution-analytics"],
  relatedProblemSlugs: ["no-strategy-owner", "disconnected-systems", "pipeline-not-predictable"],
  relatedProofSlugs: ["graston-qualified-leads", "graston-growth-engine"],
  systemsBuilt: [
    "HubSpot CRM",
    "Lead capture & attribution",
    "Live provider directory",
    "Training pipeline automation",
    "CE tracking and delivery",
  ],
  liveUrl: "https://graston-growth-engine.jacob-ba2.workers.dev",
  cloudinaryImages: ["studio/graston-growth-engine"],
  featured: true,
  publishedAt: "2024-06-01",
};
