import type { CaseStudy } from "@/types";

export const barbershopCommandCenter: CaseStudy = {
  slug: "barbershop-command-center",
  title: "Barbershop Command Center — Booking CRM & Retention Operating System",
  clientName: "Hoosier Boy Barbershop",
  clientContext: "Local service business · Indianapolis, IN",
  location: "Indianapolis, IN",
  timeline: "Project engagement",
  engagementFormat: "project",
  outcomeTags: ["Systems Built", "Pipeline Growth", "CRM Architecture"],
  problemClusters: ["disconnected-systems", "not-visible-enough", "site-not-converting"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "4.9★", label: "Average Google rating maintained", isHighlighted: true },
    { value: "3×", label: "Increase in repeat booking rate" },
    { value: "60%", label: "Reduction in no-shows via automated reminders" },
  ],
  primaryMetric: {
    value: "4.9★",
    label: "Average Google rating maintained",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "system-consolidation",
  outcomeHeadline: "4.9★ rating + 3× repeat bookings — local system built",
  resultSummary:
    "Hoosier Boy rebuilt booking, retention, and owner operations as one connected system. Public booking flow, CRM lifecycle states, and automation sequences now run as an integrated command center that tripled repeat bookings while maintaining a 4.9-star reputation signal.",
  heroSubhead:
    "A high-quality local shop with strong service delivery but disconnected booking, follow-up, and owner reporting surfaces. Rebuilt into one operating system.",
  whyThisMattered:
    "For appointment-based service businesses, retention and utilization determine margin more than net-new traffic alone. Without a lifecycle system, even strong demand leaks through no-shows, inactive client segments, and inconsistent rebooking behavior.",
  whatWasBroken: [
    "No central CRM lifecycle model — client history existed, but outreach logic was disconnected from booking behavior",
    "No review request system — high-quality visits rarely converted into fresh trust signals",
    "Rebooking was verbal or ad hoc — no lifecycle triggers for reminder, retention, or reactivation",
    "Local SEO was unstructured — citations inconsistent, Google Business Profile incomplete",
    "No-show rate was high — appointment reminders relied on the booking app's defaults",
  ],
  buildSections: [
    {
      title: "Public booking surface and CRM integration",
      description:
        "Public booking flow was aligned to a CRM-backed client record so every appointment updated lifecycle state, visit cadence, and follow-up eligibility. New and returning clients were segmented into distinct operational tracks.",
    },
    {
      title: "Lifecycle retention and review automation",
      description:
        "Post-visit flows were rebuilt into lifecycle automation: thank-you, review request, next-visit reminder, and lapsed-client reactivation. Trigger rules reduced manual outreach and made review velocity and retention more predictable.",
    },
    {
      title: "Owner-admin command center workflow",
      description:
        "A command-center operating view centralized booking status, lifecycle segments, and outreach queues so owner/admin decisions no longer depended on memory or disconnected tools.",
    },
    {
      title: "Local conversion and reputation support layer",
      description:
        "Google Business Profile structure, citation hygiene, and on-site local conversion blocks were tuned to reinforce discovery and booking outcomes. Review recency and consistency supported local pack trust conversion.",
    },
  ],
  operatingImpact:
    "The shop now operates from a connected booking-to-retention system instead of fragmented tools. Owner/admin can see lifecycle state, trigger outreach by segment, and sustain retention/review operations without daily manual coordination.",
  implementationLayers: [
    "Public booking surface",
    "CRM lifecycle state model",
    "SMS and email lifecycle automation",
    "Owner/admin command-center view",
    "Google Business Profile optimization",
    "Citation cleanup",
    "Retention and reactivation orchestration",
  ],
  implementationStackCategories: [
    "revenue-crm",
    "analytics-growth",
    "infrastructure-platform",
  ],
  implementationPlatformSlugs: [
    "salesforce",
    "google",
    "wordpress",
    "apache",
  ],
  relatedToolSlugs: ["geo-readiness-auditor", "growth-bottleneck-quiz"],
  relatedServiceSlugs: [
    "crm-architecture",
    "automation-systems",
    "ai-automation",
    "custom-infrastructure",
    "content-seo-systems",
  ],
  relatedProblemSlugs: ["disconnected-systems", "not-visible-enough", "site-not-converting"],
  relatedProofSlugs: ["russell-painting"],
  systemsBuilt: [
    "Booking + CRM integration",
    "Lifecycle automation hub",
    "Owner-admin command center",
    "Review velocity pipeline",
    "Retention and reactivation system",
  ],
  cloudinaryImages: ["hoosier-boy-barbershop-website-design", "hoosierboy-logo-anchor"],
  featured: false,
  publishedAt: "2023-09-01",
};
