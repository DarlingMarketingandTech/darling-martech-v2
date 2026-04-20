import type { CaseStudy } from "@/types";

export const pikeMedical: CaseStudy = {
  slug: "pike-medical",
  title: "CRM Architecture + Patient Pipeline Automation",
  clientName: "Pike Medical",
  clientContext: "Regional healthcare practice",
  location: "Indianapolis, IN",
  timeline: "90-day project engagement",
  engagementFormat: "project",
  outcomeTags: ["Pipeline Growth", "Automation", "CRM Architecture"],
  problemClusters: ["site-not-converting", "disconnected-systems"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "+45%", label: "Patient pipeline growth", isHighlighted: true },
    { value: "60 days", label: "Time to real-time visibility" },
  ],
  primaryMetric: {
    value: "+45%",
    label: "Patient pipeline growth",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "conversion-lift",
  outcomeHeadline: "+45% patient growth over 3 years",
  resultSummary:
    "Built a CRM architecture from scratch, wired it to intake, and automated follow-up across patient segments. Pipeline visibility went from zero to real-time within 60 days.",
  fullStory:
    "Pike Medical had no CRM and was managing patient leads through inboxes and spreadsheets. The project unified intake, follow-up, and reporting so patient growth could compound instead of depending on manual follow-up.",
  systemsBuilt: [
    "CRM build",
    "Pipeline automation",
    "Intake workflow",
    "Segment nurturing",
  ],
  implementationStackCategories: ["revenue-crm", "analytics-growth"],
  implementationPlatformSlugs: ["salesforce", "google", "wordpress"],
  cloudinaryImages: ["studio/pike-medical"],
  featured: true,
  publishedAt: "2023-06-01",
};
