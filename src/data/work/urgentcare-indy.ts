import type { CaseStudy } from "@/types";

export const urgentcareIndy: CaseStudy = {
  slug: "urgentcare-indy",
  title: "UrgentCare Indy — Urgent-Intent Booking Conversion System",
  clientName: "UrgentCare Indy",
  clientContext: "Urgent care network · Indianapolis, IN",
  projectPath: "brand-visibility",
  projectType: "local-visibility-and-conversion",
  buyerScenario: "needs-local-demand-capture",
  projectComplexity: "high",
  scopeShape: "cross-system",
  evidenceType: "mixed-evidence",
  location: "Indianapolis, IN",
  timeline: "Project engagement",
  engagementFormat: "project",
  outcomeTags: ["Pipeline Growth", "Systems Built", "CRM Architecture"],
  problemClusters: ["site-not-converting", "not-visible-enough"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "+35%", label: "Patient bookings from urgent-intent flow", isHighlighted: true },
    { value: "Faster path", label: "Online check-in and booking journey simplified for urgency" },
    { value: "Trust + speed", label: "Urgent care UX balanced conversion speed with confidence signals" },
  ],
  primaryMetric: {
    value: "+35%",
    label: "Patient bookings from urgent-intent flow",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "conversion-lift",
  outcomeHeadline: "+35% patient bookings — urgent conversion flow rebuilt",
  resultSummary:
    "UrgentCare Indy rebuilt urgent-intent site pathways and online check-in architecture so patients could move from need to booked visit with less friction. Patient bookings increased 35%.",
  heroSubhead:
    "An urgent care service where patient intent was high, but conversion speed and trust signaling were not aligned.",
  whyThisMattered:
    "Urgent care conversion windows are short. Patients compare options quickly and act immediately. If online check-in, hours clarity, and location trust cues are not obvious, potential visits leak to faster competitors.",
  whatWasBroken: [
    "Urgent-intent visitors could not immediately identify the fastest path to check-in or booking",
    "Critical care-decision details were buried below generic content blocks",
    "Local visibility and on-page urgent conversion flow were not tightly connected",
    "Trust and urgency cues were separated instead of combined inside the decision path",
  ],
  buildSections: [
    {
      title: "Urgent-intent online check-in flow",
      description:
        "Site pathways were restructured so urgent visitors reached check-in and booking actions quickly from mobile and local-search entry points. High-friction detours were removed from the top of the journey.",
    },
    {
      title: "Urgency-meets-trust UX system",
      description:
        "Core trust indicators, care expectations, and operational details were integrated into conversion-critical sections so users could make a fast decision without uncertainty.",
    },
    {
      title: "Location and availability clarity layer",
      description:
        "Local service details and immediate next-step actions were aligned across urgent pages to reduce abandonment from unclear location, timing, or process expectations.",
    },
    {
      title: "Conversion architecture for urgent booking",
      description:
        "Conversion logic prioritized decisive actions for urgent users while preserving enough context for confidence. This balanced speed with reassurance and improved booking completion.",
    },
  ],
  operatingImpact:
    "UrgentCare Indy shifted from informational pages to a conversion-first urgent care experience. Patients can make faster booking decisions, and teams receive a cleaner flow of high-intent urgent appointments.",
  implementationLayers: [
    "Urgent-intent IA and routing",
    "Online check-in conversion flow",
    "Trust-signal integration for urgent decisions",
    "Local entry-point alignment",
    "Mobile-first conversion prioritization",
  ],
  implementationStackCategories: [
    "analytics-growth",
    "infrastructure-platform",
    "build-workflow-ai",
  ],
  implementationPlatformSlugs: ["wordpress", "google", "figma", "cloudinary"],
  relatedToolSlugs: ["growth-bottleneck-quiz", "geo-readiness-auditor"],
  relatedServiceSlugs: [
    "website-design",
    "conversion-optimization",
    "content-seo-systems",
  ],
  relatedProblemSlugs: ["site-not-converting", "not-visible-enough"],
  relatedProofSlugs: ["primarycare-indy", "clinical-compass", "pike-medical"],
  systemsBuilt: [
    "Urgent booking conversion flow",
    "Online check-in architecture",
    "Urgent trust-and-clarity UX system",
    "Local visibility to booking alignment",
  ],
  cloudinaryImages: ["urgent-care-indy_home_page_-_desktop_website_view", "urgentcare-logo-anchor"],
  featured: true,
  publishedAt: "2024-05-01",
};
