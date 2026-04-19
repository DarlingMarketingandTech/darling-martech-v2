import type { CaseStudy } from "@/types";

export const theCompass: CaseStudy = {
  slug: "the-compass",
  title: "The Compass — Strategic Clarity Tool for B2B Buyers",
  clientName: "Internal · Darling MarTech",
  clientContext: "Product-led lead generation · Interactive diagnostic tool",
  location: "Indianapolis, IN",
  timeline: "Project build",
  engagementFormat: "project",
  outcomeTags: ["Pipeline Growth", "Systems Built"],
  problemClusters: ["no-strategy-owner", "pipeline-not-predictable"],
  trustLadderStage: "browse",
  metrics: [
    { value: "8 min", label: "Average time-on-tool per session", isHighlighted: true },
    { value: "68%", label: "Completion rate through full diagnostic" },
    { value: "3.2×", label: "Higher booking rate vs. cold outreach" },
  ],
  primaryMetric: {
    value: "68%",
    label: "Completion rate through full diagnostic",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "lead-gen",
  outcomeHeadline: "68% completion rate — high-intent leads from interactive diagnostic",
  resultSummary:
    "An interactive marketing strategy diagnostic built as a lead-generation product. Buyers self-qualify by working through a structured clarity framework. Output is a prioritized problem statement and recommended first step — not a generic report.",
  heroSubhead:
    "Buyers who don't know where to start don't book calls. Built a tool that meets them at the beginning and walks them to a specific problem.",
  whyThisMattered:
    "Most B2B buyers research for weeks before contacting a vendor. A tool that delivers immediate, specific value at the start of that research creates a fundamentally different lead — one who has already defined their problem and experienced the quality of thinking before the first conversation.",
  whatWasBroken: [
    "Cold outreach and ads produced low-intent leads who needed extensive qualification before a diagnosis could happen",
    "Homepage CTAs drove traffic to a booking page, bypassing buyers who were not yet ready to commit to a call",
    "No mid-funnel touchpoint existed between 'arrived at the site' and 'booked a call'",
  ],
  buildSections: [
    {
      title: "Diagnostic framework design",
      description:
        "Eight-question diagnostic structured around the six core marketing failure modes: strategy gap, conversion failure, system disconnection, visibility deficit, brand misalignment, and attribution blindness. Each answer combination maps to a weighted result across problem clusters.",
    },
    {
      title: "Scoring and result engine",
      description:
        "Weighted resolver built in TypeScript maps answer patterns to the highest-probability problem cluster. Result includes a problem label, a plain-language explanation, a recommended next step, and links to relevant proof, service, and contact paths.",
    },
    {
      title: "Progressive value delivery",
      description:
        "Result is visible immediately without email gate. Deeper report — including a prioritized action list and recommended engagement format — gated by email for buyers who want to save or share the output. Lead captured at the point of demonstrated intent.",
    },
    {
      title: "CRM integration and follow-up",
      description:
        "Completed diagnostics post to CRM with result cluster tagged. Follow-up sequence varies by result: strategy gap leads receive a different sequence than attribution blindness leads. Booking link included in all sequences with result-specific framing.",
    },
  ],
  operatingImpact:
    "Buyers who complete the tool arrive at a first conversation with their problem already named. Average time-to-qualify dropped significantly. Diagnostic result data also feeds positioning research — knowing which problem clusters surface most frequently informs content and outreach strategy.",
  implementationLayers: [
    "Next.js interactive quiz engine",
    "Weighted TypeScript resolver",
    "Supabase result storage",
    "HubSpot CRM integration",
    "Segmented email follow-up",
  ],
  relatedToolSlugs: ["growth-bottleneck-quiz", "martech-fragmentation-scorecard"],
  relatedServiceSlugs: ["fractional-cmo", "digital-marketing-strategy", "attribution-analytics"],
  relatedProblemSlugs: ["no-strategy-owner", "pipeline-not-predictable"],
  relatedProofSlugs: ["graston-technique"],
  systemsBuilt: [
    "Interactive diagnostic engine",
    "Weighted result resolver",
    "Email gating and CRM capture",
    "Segmented follow-up automation",
  ],
  featured: false,
  publishedAt: "2024-03-01",
};
