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
    "Graston needed a senior owner for the full marketing system — not another vendor layer. The work rebuilt the lead engine so qualified demand could compound instead of leaking through manual handoffs.",
  systemsBuilt: [
    "Lead capture & nurture",
    "Training pipeline",
    "Attribution baseline",
    "CRM integration",
  ],
  implementationStackCategories: ["revenue-crm", "analytics-growth"],
  implementationPlatformSlugs: ["salesforce", "google", "wordpress"],
  cloudinaryImages: ["studio/graston-growth-engine"],
  featured: true,
  publishedAt: "2024-01-01",
};
