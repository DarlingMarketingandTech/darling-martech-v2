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
    "The Growth Engine work focused on replacing brittle manual workflows with durable automation — so the team could scale outreach, events, and follow-up without adding headcount.",
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
