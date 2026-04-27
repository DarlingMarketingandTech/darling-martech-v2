import type { CaseStudy } from "@/types";

export const barbershopCommandCenter: CaseStudy = {
  slug: "barbershop-command-center",
  title: "Hoosier Boy Barbershop — Local Booking, Reminders, Reviews & Repeat Visits",
  clientName: "Hoosier Boy Barbershop",
  clientContext: "Local service business · Indianapolis, IN",
  location: "Indianapolis, IN",
  timeline: "Project engagement",
  engagementFormat: "project",
  outcomeTags: ["Systems Built", "Pipeline Growth", "CRM Architecture"],
  problemClusters: ["disconnected-systems", "not-visible-enough", "site-not-converting"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "3×", label: "Increase in repeat booking rate", isHighlighted: true },
    { value: "60%", label: "Fewer no-shows with automated reminders" },
    { value: "4.9★", label: "Google rating maintained" },
  ],
  primaryMetric: {
    value: "3×",
    label: "Increase in repeat booking rate",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "conversion-lift",
  outcomeHeadline: "3× repeat bookings, fewer no-shows, strong local reviews",
  resultSummary:
    "Hoosier Boy connected public booking, CRM, reminders, and review asks so repeat visits and show-up rates improved. Repeat bookings about tripled, no-shows dropped with reminder automation, and Google ratings stayed in the high 4.9 range.",
  heroSubhead:
    "A strong local shop with disconnected booking, follow-up, and owner visibility. Wired booking, CRM, reminders, and reviews into one practical setup.",
  whyThisMattered:
    "For appointment-based businesses, repeat visits and chair time matter as much as new traffic. When booking, reminders, and follow-up are disconnected, strong demand still leaks through no-shows, quiet clients, and missed rebooks.",
  whatWasBroken: [
    "Client history lived in the booking app, but follow-up and outreach were not tied to that record",
    "No steady review request flow—great cuts rarely became fresh public proof",
    "Rebooking was informal—no clear reminders for the next visit or lapsed clients",
    "Local listings were messy—inconsistent citations and an incomplete Google Business Profile",
    "No-shows were high—default reminders from the booking app were not enough",
  ],
  buildSections: [
    {
      title: "Public booking tied to a CRM client record",
      description:
        "Every appointment updated the client record, visit pattern, and who was due for a nudge. New and returning clients could be handled with clear segments.",
    },
    {
      title: "Reminders, review asks, and win-back on a schedule",
      description:
        "After each visit, thank-you, review request, next-cut reminder, and lapsed-client messages ran on rules instead of someone remembering. Review cadence and repeat visits became more predictable.",
    },
    {
      title: "Owner view of bookings, segments, and follow-ups",
      description:
        "One place to see who booked, who needs a reminder, and which outreach is queued—so the owner is not piecing it together from three apps.",
    },
    {
      title: "Local conversion and reputation support layer",
      description:
        "Google Business Profile structure, citation hygiene, and on-site local conversion blocks were tuned to reinforce discovery and booking outcomes. Review recency and consistency supported local pack trust conversion.",
    },
  ],
  operatingImpact:
    "The shop runs booking, follow-up, and reviews as one program instead of separate tools. The owner can see who is due for what and keep retention and review cadence without daily manual chasing.",
  implementationLayers: [
    "Public booking flow",
    "CRM-backed client model",
    "SMS and email reminder automation",
    "Owner view of bookings and follow-up queues",
    "Google Business Profile cleanup",
    "Citation cleanup",
    "Retention and reactivation messages",
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
  implementationGroupSummary: {
    "analytics-data":
      "Owner visibility improved because bookings, segments, and queued follow-up could be read in one place.",
    "infrastructure-platform":
      "The booking and public-site layers stayed connected so local demand and operational follow-up did not drift apart.",
    "crm-automation":
      "Client records, reminders, review asks, and win-back logic were tied to the same operating system.",
    "visibility-seo":
      "Google profile and local citation cleanup supported better discovery and trust before the booking step.",
    "conversion-booking":
      "Booking, reminders, and rebooking were treated as one customer path instead of separate tools.",
  },
  relatedToolSlugs: ["geo-readiness-auditor", "growth-system-audit"],
  relatedServiceSlugs: [
    "crm-architecture",
    "automation-systems",
    "ai-automation",
    "custom-infrastructure",
    "content-seo-systems",
  ],
  relatedProblemSlugs: ["disconnected-systems", "not-visible-enough", "site-not-converting"],
  relatedProofSlugs: ["russell-painting"],
  relatedBuildTypeLabel: "Lead follow-up system",
  systemsBuilt: [
    "Booking and CRM integration",
    "Scheduled reminders and follow-up",
    "Owner dashboard for segment and queue visibility",
    "Review request flow",
    "Reactivation and retention messages",
  ],
  proofDetailHeroAlt:
    "Barbershop Command Center interface showing booking, follow-up, and owner visibility in one local operating system.",
  proofDetailSupportVisuals: [
    {
      publicId: "Book_Appointment_Cal_ViewI_Hoosier_Boy_Barbershop",
      alt: "Barbershop booking calendar view connected to the command-center flow.",
      label: "Booking and scheduling surface",
    },
  ],
  cloudinaryImages: ["Barbershop_Command_Center"],
  featured: false,
  projectType: "local-growth-system",
  buyerScenario: "operations-manual-fragmented",
  projectComplexity: "multi-surface",
  scopeShape: "crm-lifecycle",
  evidenceType: "reputation-and-retention",
  primarySimilaritySummary:
    "This is a fit if you run an appointment-based local business and need booking, reminders, and reviews to work together without a full enterprise CRM roll-out story.",
  publishedAt: "2023-09-01",
};
