import type { CaseStudy } from "@/types";

export const russellPainting: CaseStudy = {
  slug: "russell-painting",
  title: "Marketing Attribution + Local Lead System",
  clientName: "Russell Painting",
  clientContext: "Local service business, Indianapolis metro",
  projectPath: "brand-visibility",
  projectType: "local-visibility-and-conversion",
  buyerScenario: "needs-local-demand-capture",
  projectComplexity: "high",
  scopeShape: "cross-system",
  evidenceType: "mixed-evidence",
  location: "Indianapolis, IN",
  timeline: "Ongoing fractional engagement",
  engagementFormat: "fractional",
  outcomeTags: ["Attribution & Analytics", "Automation"],
  problemClusters: ["not-visible-enough", "pipeline-not-predictable"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "4.9★", label: "Client satisfaction score", isHighlighted: true },
    { value: "First-page", label: "Visibility in target service areas" },
  ],
  primaryMetric: {
    value: "4.9★",
    label: "Client satisfaction score",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "traffic-growth",
  outcomeHeadline: "4.9★ local trust conversion",
  resultSummary:
    "Built a full attribution layer connecting ad spend, form fills, phone calls, and booked jobs into one reporting view. Visibility and trust signals improved alongside local conversion performance.",
  fullStory:
    "Russell Painting needed clear attribution, stronger local visibility, and a cleaner trust path from search result to inquiry. The system connected channel data to booked jobs so optimization decisions could be made with confidence.",
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
  publishedAt: "2024-03-01",
};
