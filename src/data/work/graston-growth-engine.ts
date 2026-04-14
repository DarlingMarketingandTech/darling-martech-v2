import type { CaseStudy } from "@/types";

export const grastonGrowthEngine: CaseStudy = {
  slug: "graston-growth-engine",
  title: "Full MarTech Ecosystem Build",
  clientName: "Graston Technique®",
  clientContext: "National healthcare provider training organization",
  location: "Indianapolis, IN",
  timeline: "18-month fractional engagement",
  engagementFormat: "fractional",
  outcomeTags: ["Pipeline Growth", "MarTech Integration"],
  problemClusters: ["no-strategy-owner", "disconnected-systems"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
    { value: "95%", label: "Manual overhead reduced" },
    { value: "81", label: "Providers in live spatial directory" },
  ],
  primaryMetric: {
    value: "+212%",
    label: "Qualified leads generated",
    isHighlighted: true,
  },
  resultSummary:
    "Built the full stack: CRM integration, automated lead nurturing, geospatial provider search, and attribution tracking. Replaced 95% of the manual overhead their team was carrying.",
  fullStory:
    "Graston had a static provider directory and no connected marketing system. The rebuild connected lead capture, nurturing, provider discovery, and attribution into one operating system that could be measured and improved.",
  systemsBuilt: [
    "HubSpot",
    "Cloudflare Workers",
    "Spatial search",
    "Attribution layer",
  ],
  liveUrl: "https://graston-growth-engine.jacob-ba2.workers.dev",
  cloudinaryImages: ["studio/graston-growth-engine"],
  featured: true,
  publishedAt: "2024-01-01",
};
