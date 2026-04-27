import type { CaseStudy } from "@/types";

export const urgentcareIndy: CaseStudy = {
  slug: "urgentcare-indy",
  title: "UrgentCare Indy — Urgent-Care Website & Online Check-In",
  clientName: "UrgentCare Indy",
  clientContext: "Urgent care network · Indianapolis, IN",
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
      title: "Urgency and trust on the same screen",
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
  implementationPlatformSlugs: ["wordpress", "google", "figma"],
  implementationGroupSummary: {
    "infrastructure-platform":
      "The urgent-care site architecture had to stay fast and legible under high-intent, mobile-heavy traffic.",
    "build-workflow":
      "Design workflow clarified the urgent path so trust details and next-step actions landed on the same screen.",
    "visibility-seo":
      "Local urgent-care entry points were aligned to pages that matched immediate care intent.",
    "conversion-booking":
      "Online check-in and booking actions were moved closer to the top of the path so urgent users could act faster.",
  },
  relatedToolSlugs: ["growth-system-audit", "geo-readiness-auditor"],
  relatedServiceSlugs: [
    "website-design",
    "conversion-optimization",
    "content-seo-systems",
  ],
  relatedProblemSlugs: ["site-not-converting", "not-visible-enough"],
  relatedProofSlugs: ["primarycare-indy"],
  relatedBuildTypeLabel: "Website & booking conversion",
  systemsBuilt: [
    "Urgent booking and check-in flow",
    "Online check-in path",
    "Urgent care trust and clarity on the conversion path",
    "Local search entry points aligned to booking",
  ],
  proofDetailHeroAlt:
    "UrgentCare Indy proof mockup showing urgent-intent website structure and a faster path to check-in.",
  proofDetailSupportVisuals: [
    {
      publicId: "urgent-care-indy_home_page_top_-_desktop_website_view",
      alt: "UrgentCare Indy homepage section emphasizing hours clarity, trust cues, and urgent next steps.",
      label: "Urgent-intent homepage path",
    },
  ],
  cloudinaryImages: ["Gemini_Generated_Image_nz0egynz0egynz0e"],
  featured: true,
  projectType: "local-growth-system",
  buyerScenario: "demand-exists-conversion-leaks",
  projectComplexity: "multi-surface",
  scopeShape: "multi-page",
  evidenceType: "quantified-pipeline",
  primarySimilaritySummary:
    "This is a fit if people search for urgent care and you need a fast, clear path from search to booked visit.",
  publishedAt: "2024-05-01",
};
