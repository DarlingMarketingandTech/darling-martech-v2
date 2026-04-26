import type { CaseStudy } from "@/types";

export const clinicalCompass: CaseStudy = {
  slug: "clinical-compass",
  title: "Clinical Compass — CRM, Intake & Patient Follow-Up for a Medical Group",
  clientName: "Regional multi-provider practice",
  clientContext: "Outpatient medical group · Indianapolis, IN",
  location: "Indianapolis, IN",
  timeline: "90-day project engagement",
  engagementFormat: "project",
  outcomeTags: ["Pipeline Growth", "Systems Built", "Automation"],
  problemClusters: ["site-not-converting", "disconnected-systems"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "+45%", label: "Patient pipeline growth over engagement period", isHighlighted: true },
    { value: "60 days", label: "Time to live pipeline visibility" },
    { value: "40%", label: "Reduction in front-desk intake time" },
  ],
  primaryMetric: {
    value: "+45%",
    label: "Patient pipeline growth over engagement period",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "conversion-lift",
  outcomeHeadline: "+45% patient pipeline — clinical intake rebuilt",
  resultSummary:
    "Patient intake, follow-up, and pipeline visibility rebuilt as a connected system. Front-desk intake time reduced 40%. New patient pipeline grew 45% within the engagement period as referral and digital leads stopped leaking through manual handoffs.",
  heroSubhead:
    "A growing practice with strong referrals but new patients lost to intake friction and missed follow-up. Rebuilt intake, CRM, and follow-up as one connected workflow.",
  whyThisMattered:
    "Healthcare practices that grow through referrals often have excellent clinical delivery but a broken acquisition system. Each patient who calls and doesn't book, or books and doesn't show, represents lost revenue and wasted marketing spend. For a practice managing multiple providers, the intake gap compounded daily.",
  whatWasBroken: [
    "New patient inquiries were tracked in staff email inboxes — no central visibility into pipeline",
    "Follow-up after missed calls happened inconsistently, depending on which staff member was available",
    "Referral sources were not tracked — no way to know which physicians or channels produced patients",
    "Online booking existed but was disconnected from the CRM — bookings didn't trigger any follow-up sequence",
    "No-show rate was high and the practice had no reactivation process for patients who missed appointments",
  ],
  buildSections: [
    {
      title: "CRM and intake in one place",
      description:
        "Practice management platform connected to CRM via API integration. All new patient touchpoints — phone, web form, online booking, and referral — unified into a single pipeline. Each lead assigned a source tag and an intake status. Staff visibility shifted from inbox-based to pipeline-based.",
    },
    {
      title: "Automated follow-up (email/SMS) from CRM",
      description:
        "Three sequences built: new inquiry follow-up (same-day and 48-hour touchpoints for non-responders), appointment confirmation and preparation, and no-show reactivation. All triggered by CRM status changes, not staff action. Front-desk time shifted from follow-up to patient care.",
    },
    {
      title: "Referral source tracking",
      description:
        "Referral source field added to intake and mapped to the CRM. Physician referral partners tracked by volume, conversion rate, and patient value. Data surfaced in a monthly referral partner report that prioritized which relationships to cultivate.",
    },
    {
      title: "Conversion-optimized web intake",
      description:
        "Online intake form rebuilt to reduce friction and capture source data. Form completion rate improved with simplified fields and mobile-first layout. Completed forms trigger immediate CRM entry and auto-confirmation, removing the manual step that caused same-day lead lag.",
    },
  ],
  operatingImpact:
    "The practice now has real-time visibility into every new patient in the pipeline, regardless of how they entered. Follow-up happens automatically without staff coordination. Referral partners are tracked and the highest-value relationships are visible in a monthly report. The front desk spends less time chasing intake and more time managing scheduled patients.",
  implementationLayers: [
    "Practice management API integration",
    "CRM pipeline build",
    "Automated inquiry follow-up",
    "Appointment confirmation sequences",
    "Referral source tracking",
    "Web intake form optimization",
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
    "mysql",
  ],
  relatedToolSlugs: ["growth-system-audit", "attribution-snapshot"],
  relatedServiceSlugs: ["crm-architecture", "automation-systems", "conversion-optimization"],
  relatedProblemSlugs: ["site-not-converting", "disconnected-systems"],
  relatedProofSlugs: ["primarycare-indy", "urgentcare-indy"],
  systemsBuilt: [
    "CRM pipeline",
    "Intake automation",
    "Referral tracking",
    "Reactivation sequences",
    "Reporting layer",
  ],
  cloudinaryImages: ["pike-medical_home_page_-_desktop_website_view", "pmc-webheader-med"],
  featured: true,
  projectType: "crm-automation-system",
  buyerScenario: "operations-manual-fragmented",
  projectComplexity: "integration",
  scopeShape: "crm-lifecycle",
  evidenceType: "quantified-pipeline",
  primarySimilaritySummary:
    "This is a fit if new patient calls and forms slip through the cracks between the front desk, email, and booking tools.",
  publishedAt: "2023-08-01",
};
