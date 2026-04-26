import type { PageMeta } from "@/types";

export const proofMeta: PageMeta = {
  title: "Proof",
  description:
    "Specific numbers, named clients, and documented outcomes tied to real engagements and systems.",
  canonicalUrl: "https://darlingmartech.com/proof",
};

export const proofPageData = {
  hero: {
    eyebrow: "PROOF OF WORK",
    headline: "Documented outcomes — not pitch deck claims.",
    body: "Each story below is one engagement: sourced metrics and what was actually built. Filter by project type and buyer situation first, then by outcome — then open the full write-up.",
  },
  navigator: {
    eyebrow: "How to use this page",
    headline: "Three steps — no guesswork.",
    steps: [
      {
        kicker: "01",
        title: "Filter by project type",
        body: "Start with the kind of system or project: CRM build, local growth, conversion repair, custom product, and more. Add buyer situation and outcome when you need to narrow further.",
      },
      {
        kicker: "02",
        title: "Open one case study",
        body: "Every card links to a single engagement with metrics, constraints, and implementation detail.",
      },
      {
        kicker: "03",
        title: "Jump to problems or services",
        body: "From any story, follow links to the buyer problem it solved or the capability behind the work.",
      },
    ],
  },
  metricsIntro: "Representative outcomes across recent engagements.",
  explanation: {
    eyebrow: "How to read this",
    headline: "Every number has a source.",
    body: [
      "These are not headline stats blended across unrelated retainers.",
      "Each metric maps to a specific engagement period, a specific operating system, and a specific starting point.",
    ],
  },
  technicalTrust: {
    eyebrow: "HOW THE WORK IS BUILT",
    headline: "The technical standards behind every engagement.",
    items: [
      {
        title: "Privacy-safe by default",
        body: "Server-side tracking and compliance-aware implementation wherever PHI, GDPR, or CCPA exposure is a risk. Not an afterthought.",
      },
      {
        title: "Documented and maintainable",
        body: "Every system ships with documented logic and architecture notes. The next person — whether that's you, a new hire, or a future partner — can understand what was built and why.",
      },
      {
        title: "Post-launch support included",
        body: "Retainer engagements include ongoing system monitoring and iteration. Project engagements include a defined handoff period. Nothing ships and disappears.",
      },
    ],
  },
  /** Optional editorial groupings by project type — for future sections; hub filters are client-driven. */
  proofGroupsByProjectType: [
    {
      projectTypeLabel: "Reporting & full-stack systems",
      description: "Attribution, CRM, and product layers wired so leadership can read pipeline and channel truth.",
      caseStudySlugs: ["graston-technique", "graston-growth-engine", "graston-qualified-leads"],
    },
    {
      projectTypeLabel: "CRM & automation system",
      description: "Intake, follow-up, and visibility rebuilt as a connected operating layer.",
      caseStudySlugs: ["clinical-compass", "barbershop-command-center"],
    },
    {
      projectTypeLabel: "Local growth & visibility",
      description: "Geo and brand surfaces tuned so demand finds the business and converts.",
      caseStudySlugs: ["primarycare-indy", "urgentcare-indy", "russell-painting", "317-bbq"],
    },
  ],
  antiClaims: [
    {
      claim: "Average client sees 300% ROI.",
      truth:
        "Every engagement is different. The results here come from specific situations, not blended averages.",
    },
    {
      claim: "Guaranteed results in 30 days.",
      truth:
        "Marketing systems take time to compound. I can define success and instrument it, but not shortcut time itself.",
    },
    {
      claim: "Our team delivered...",
      truth: "There is no team. I did this work. That is the point of the model.",
    },
  ],
};
