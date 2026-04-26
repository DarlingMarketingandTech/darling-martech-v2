import type { CaseStudy } from "@/types";

// TODO: needs clarification in Phase 2 (ambiguous positioning)
export const russellPainting: CaseStudy = {
  slug: "russell-painting",
  title: "Russell Painting — Local Visibility, Call Tracking & Job Attribution",
  clientName: "Russell Painting",
  clientContext: "Local service business, Indianapolis metro",
  location: "Indianapolis, IN",
  timeline: "Ongoing fractional engagement",
  engagementFormat: "fractional",
  outcomeTags: ["Attribution & Analytics", "Automation"],
  problemClusters: ["not-visible-enough", "pipeline-not-predictable"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "First-page", label: "Search visibility in target service areas", isHighlighted: true },
    { value: "4.9★", label: "Client satisfaction (measured post-job)" },
  ],
  primaryMetric: {
    value: "First-page",
    label: "Search visibility in target service areas",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "system-consolidation",
  outcomeHeadline: "Local visibility up, calls and forms tied to sources and jobs",
  resultSummary:
    "Call tracking, form sources, and ad spend were connected so booked work could be traced back to channels. Search visibility in target service areas moved to the first page for priority terms; high satisfaction scores stayed a supporting signal, not the primary proof of marketing lift.",
  fullStory:
    "Russell Painting needed clearer answers on what drove calls and booked jobs, not just more top-of-funnel activity. The work focused on a practical attribution and visibility layer for a local paint contractor.",
  systemsBuilt: [
    "Attribution layer",
    "Call tracking",
    "Lead source reporting",
    "Ad optimization",
  ],
  implementationStackCategories: ["revenue-crm", "analytics-growth"],
  implementationPlatformSlugs: ["salesforce", "google"],
  cloudinaryImages: ["russell-painting-website", "russell-painting-logo"],
  featured: true,
  projectType: "reporting-attribution-system",
  buyerScenario: "spend-visible-attribution-weak",
  projectComplexity: "multi-surface",
  scopeShape: "reporting-visibility",
  evidenceType: "mixed",
  primarySimilaritySummary:
    "This is a fit if you buy leads or ads in a local market and need to see which efforts produce booked jobs, not just form fills or star ratings in isolation.",
  publishedAt: "2024-03-01",
};
