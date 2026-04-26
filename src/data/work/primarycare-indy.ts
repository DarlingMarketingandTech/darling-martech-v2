import type { CaseStudy } from "@/types";

export const primarycareIndy: CaseStudy = {
  slug: "primarycare-indy",
  title: "PrimaryCare Indy — Healthcare Website, Booking & Local Patient Journeys",
  clientName: "PrimaryCare Indy",
  clientContext: "Primary care practice network · Indianapolis, IN",
  location: "Indianapolis, IN",
  timeline: "Project engagement",
  engagementFormat: "project",
  outcomeTags: ["Pipeline Growth", "Systems Built", "CRM Architecture"],
  problemClusters: ["site-not-converting", "not-visible-enough", "brand-system-broken"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "75%", label: "Increase in online bookings", isHighlighted: true },
    { value: "Mobile-first", label: "Patient booking flow rebuilt for low-friction conversion" },
    { value: "Local intent", label: "Service architecture aligned to neighborhood care searches" },
  ],
  primaryMetric: {
    value: "75%",
    label: "Increase in online bookings",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "conversion-lift",
  outcomeHeadline: "75% more online bookings — primary care conversion rebuilt",
  resultSummary:
    "PrimaryCare Indy rebuilt patient-facing booking architecture and local-intent service structure to convert more qualified visits into scheduled appointments. Online bookings increased 75%.",
  heroSubhead:
    "A high-trust healthcare service with demand in market, but a patient journey that leaked intent before booking.",
  whyThisMattered:
    "Primary care demand is high intent and time sensitive. If the service architecture and booking path are unclear, patients defer, call competitors, or drop out. The commercial loss compounds quietly because each abandoned booking slot is unrecoverable revenue.",
  whatWasBroken: [
    "Service pages did not map cleanly to patient intent, so visitors had to infer which care path fit their need",
    "Booking flow introduced unnecessary steps on mobile, creating friction in the highest-intent moments",
    "Trust signaling was inconsistent between service detail, provider context, and next-step booking prompts",
    "Local discovery surfaces and website conversion flow were not aligned as one patient-acquisition system",
  ],
  buildSections: [
    {
      title: "Patient-centered service architecture",
      description:
        "Primary care services were reorganized around real patient decision paths so users could identify the right care type quickly. Information architecture shifted from internal categories to patient language and expected outcomes.",
    },
    {
      title: "Online booking conversion rebuild",
      description:
        "Booking UX was simplified for urgent and non-urgent pathways with fewer decision points on mobile. High-intent visitors could move from service understanding to scheduling with less ambiguity and fewer drop-off points.",
    },
    {
      title: "Local visibility to booking alignment",
      description:
        "Local-intent entry pages and on-site conversion blocks were aligned so discovery traffic landed on pages that matched search intent and offered immediate scheduling actions.",
    },
    {
      title: "Trust and care proof before the booking ask",
      description:
        "Provider credibility, care approach, and reassurance copy were placed in conversion-critical sections so patients felt confident before they scheduled, not after.",
    },
  ],
  operatingImpact:
    "PrimaryCare Indy moved from a brochure-style site to a care journey where intent, trust, and booking work together. More qualified appointments run through online scheduling instead of manual phone follow-up alone.",
  implementationLayers: [
    "Patient-intent IA rebuild",
    "Mobile booking flow optimization",
    "Service-to-scheduling conversion path",
    "Trust and clinical proof on key pages",
    "Local intent landing alignment",
  ],
  implementationStackCategories: [
    "analytics-growth",
    "infrastructure-platform",
    "build-workflow-ai",
  ],
  implementationPlatformSlugs: ["wordpress", "google", "figma", "cloudinary"],
  relatedToolSlugs: ["growth-system-audit", "geo-readiness-auditor"],
  relatedServiceSlugs: [
    "website-design",
    "conversion-optimization",
    "content-seo-systems",
    "brand-identity",
  ],
  relatedProblemSlugs: ["site-not-converting", "not-visible-enough", "brand-system-broken"],
  relatedProofSlugs: ["urgentcare-indy", "clinical-compass"],
  systemsBuilt: [
    "Patient booking conversion flow",
    "Service architecture by care intent",
    "Local visibility entry paths",
    "Trust and clinical context on conversion pages",
  ],
  cloudinaryImages: ["primary-care-indy-website", "primarycare-logo-anchor"],
  featured: true,
  projectType: "local-growth-system",
  buyerScenario: "demand-exists-conversion-leaks",
  projectComplexity: "multi-surface",
  scopeShape: "multi-page",
  evidenceType: "quantified-pipeline",
  primarySimilaritySummary:
    "This is a fit if patients already look for care like yours, but the site and booking path lose them before they schedule.",
  publishedAt: "2024-04-01",
};
