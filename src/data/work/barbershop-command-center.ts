import type { CaseStudy } from "@/types";

export const barbershopCommandCenter: CaseStudy = {
  slug: "barbershop-command-center",
  title: "Barbershop Command Center — Local Marketing & Retention System",
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
    "Local barbershop rebuilt its marketing and client retention system from scratch. Appointment-to-review pipeline automated. Repeat booking rate tripled. Google presence and local search visibility structured for compounding trust.",
  heroSubhead:
    "A high-quality local barbershop with a loyal client base but no system to retain, reactivate, or grow it. Built the operating infrastructure.",
  whyThisMattered:
    "For a local service business, the difference between 3.8 and 4.9 stars in Google determines whether a first-time searcher books or scrolls past. Client retention and online reputation are the same system — and neither was being managed deliberately.",
  whatWasBroken: [
    "No CRM — client history tracked only in the booking app, disconnected from follow-up",
    "No review request system — great experiences rarely turned into Google reviews",
    "Rebooking was verbal or forgotten — no automated reminder or loyalty sequence",
    "Local SEO was unstructured — citations inconsistent, Google Business Profile incomplete",
    "No-show rate was high — appointment reminders relied on the booking app's defaults",
  ],
  buildSections: [
    {
      title: "Client database and booking integration",
      description:
        "Booking platform connected to a lightweight CRM layer. Each client's visit history, preferred barber, and last visit date captured and usable for segmented outreach. New and returning clients handled with different follow-up sequences.",
    },
    {
      title: "Automated review pipeline",
      description:
        "Post-visit SMS sequence built: thank-you message 2 hours after checkout, direct Google review link 24 hours later. Sequence triggers only for clients who haven't reviewed in the past 6 months. Review velocity increased from sporadic to consistent.",
    },
    {
      title: "Retention and reactivation sequences",
      description:
        "Clients who haven't booked in 6 weeks receive a reactivation message with a direct booking link. Repeat-visit reminders sent at the client's average rebooking interval. No-show follow-ups include rebooking prompt and a brief check-in.",
    },
    {
      title: "Local search presence",
      description:
        "Google Business Profile audited and completed: hours, services, photos, Q&A, and category alignment. Citation cleanup across directories. Local keyword structure applied to profile and website copy. Review velocity and recency improved search ranking in local pack.",
    },
  ],
  operatingImpact:
    "The shop now runs a retention and reputation system that operates without daily management. Review requests go out automatically. Lapsed clients get reactivated without staff remembering to follow up. Local search visibility compounds as review volume and recency improve.",
  implementationLayers: [
    "Booking platform integration",
    "SMS automation sequences",
    "Google Business Profile optimization",
    "Citation cleanup",
    "Client segmentation",
    "Retention and reactivation flows",
  ],
  relatedToolSlugs: ["geo-readiness-auditor", "growth-bottleneck-quiz"],
  relatedServiceSlugs: ["crm-architecture", "automation-systems", "content-seo-systems"],
  relatedProblemSlugs: ["disconnected-systems", "not-visible-enough", "site-not-converting"],
  relatedProofSlugs: ["russell-painting"],
  systemsBuilt: [
    "CRM layer",
    "Review pipeline",
    "Retention sequences",
    "Reactivation automation",
    "Local SEO structure",
  ],
  featured: false,
  publishedAt: "2023-09-01",
};
