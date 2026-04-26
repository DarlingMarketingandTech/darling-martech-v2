import type { CaseStudy } from "@/types";

export const licenseRequirementsNavigator: CaseStudy = {
  slug: "license-requirements-navigator",
  title: "License Requirements Navigator — CE Compliance Tool",
  clientName: "Graston Technique®",
  clientContext: "Healthcare training · Clinician certification · Continuing education",
  projectPath: "diagnostic-products",
  projectType: "interactive-diagnostic-product",
  buyerScenario: "needs-self-serve-decision-support",
  projectComplexity: "high",
  scopeShape: "cross-system",
  evidenceType: "mixed-evidence",
  location: "Indianapolis, IN",
  timeline: "Project build",
  engagementFormat: "project",
  outcomeTags: ["Systems Built", "Pipeline Growth"],
  problemClusters: ["site-not-converting", "not-visible-enough"],
  trustLadderStage: "browse",
  metrics: [
    { value: "50+", label: "State CE requirement datasets structured", isHighlighted: true },
    { value: "4.2 min", label: "Average session length on tool", isHighlighted: false },
    { value: "34%", label: "Tool-to-registration conversion rate", isHighlighted: false },
  ],
  primaryMetric: {
    value: "34%",
    label: "Tool-to-registration conversion rate",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "lead-gen",
  outcomeHeadline: "34% tool-to-registration rate — CE compliance tool",
  resultSummary:
    "A state-by-state continuing education requirements tool built as a lead-generation asset. Licensed clinicians look up their state's CE requirements, confirm Graston coursework qualifies, and register — without leaving the tool. 34% of tool users converted to a training registration within 30 days.",
  heroSubhead:
    "Clinicians need CE credits. Graston courses qualify. The problem was no tool existed to connect those two facts at the moment a clinician was trying to plan their compliance.",
  whyThisMattered:
    "Licensed healthcare practitioners must complete continuing education requirements to maintain their license. The decision to take a CE course often happens while a clinician is actively researching their state's requirements — a high-intent moment that Graston had no way to capture or serve. Building the tool placed Graston at exactly that moment.",
  whatWasBroken: [
    "CE requirement information lived on each state licensing board's website — inconsistent, hard to find, and updated without notice",
    "Clinicians had no easy way to confirm whether a Graston course satisfied their specific state's CE category requirements",
    "Graston had no presence in the search moment when clinicians were actively planning their CE compliance",
    "Training registrations from CE-motivated clinicians were not tracked separately — no way to measure this segment's value",
  ],
  buildSections: [
    {
      title: "CE requirement database",
      description:
        "50+ state continuing education requirement datasets researched, structured, and loaded into a queryable database. Each state record includes: total CE hours required, renewal cycle, accepted CE categories, and whether Graston Technique coursework satisfies each category. Database designed for quarterly review and update.",
    },
    {
      title: "Interactive lookup tool",
      description:
        "Clinicians enter their license type and state. Tool returns their specific CE requirements with Graston course applicability clearly marked. Course recommendations surface inline based on the clinician's deficit — hours needed, category required, and upcoming course dates near their location.",
    },
    {
      title: "Registration path integration",
      description:
        "Each course recommendation includes a direct registration link with pre-filled source tracking. Clinicians who complete the tool and click through to registration are tracked in the CRM with a CE-compliance source tag. This segment receives a separate email sequence with compliance deadline reminders.",
    },
    {
      title: "SEO and content structure",
      description:
        "Individual state pages created with structured data: 'CE requirements for [license type] in [state].' These pages capture organic search from clinicians researching their specific state. Tool results are embeddable as shareable links, enabling clinicians to send their CE plan to a colleague or supervisor.",
    },
  ],
  operatingImpact:
    "The tool generates a qualified registration segment that Graston did not have before — CE-motivated clinicians who chose a course specifically because it solved a compliance need. This segment converts at higher rates and renews more consistently than general-interest registrations. The state pages also produce sustained organic traffic from clinicians who are, by definition, actively planning their next CE period.",
  implementationLayers: [
    "State CE requirement database",
    "Next.js interactive lookup",
    "CRM source tagging",
    "Compliance-motivated email sequence",
    "Structured data and state SEO pages",
  ],
  implementationStackCategories: [
    "analytics-growth",
    "infrastructure-platform",
    "build-workflow-ai",
  ],
  implementationPlatformSlugs: [
    "nextjs",
    "google",
    "googlecloud",
    "mysql",
    "github",
  ],
  relatedToolSlugs: ["geo-readiness-auditor", "growth-bottleneck-quiz"],
  relatedServiceSlugs: ["content-seo-systems", "custom-infrastructure", "conversion-optimization"],
  relatedProblemSlugs: ["site-not-converting", "not-visible-enough"],
  relatedProofSlugs: ["graston-technique", "graston-qualified-leads"],
  systemsBuilt: [
    "CE requirement database",
    "Interactive compliance lookup",
    "Source-tagged registration path",
    "Structured state SEO pages",
    "CE-motivated nurture sequence",
  ],
  cloudinaryImages: ["3-website-page-promo", "graston-logo-png"],
  featured: false,
  publishedAt: "2024-02-01",
};
