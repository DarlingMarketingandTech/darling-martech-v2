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
    body: "Each story below is one engagement: named context, sourced metrics, and what was actually built. Filter by the result you care about, then open the full write-up.",
  },
  navigator: {
    eyebrow: "How to use this page",
    headline: "Three steps — no guesswork.",
    steps: [
      {
        kicker: "01",
        title: "Filter by outcome",
        body: "Narrow the list to the kind of result you need: leads, conversion lift, time saved, systems, and more.",
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
  proofGroupsByProblem: [
    {
      problemLabel: "Pipeline attribution",
      description: "Engagements where marketing activity was connected to closed revenue for the first time.",
      caseStudySlugs: ["graston-qualified-leads", "graston-growth-engine"],
    },
    {
      problemLabel: "Systems & automation",
      description: "Manual operations replaced with durable, connected automation systems.",
      caseStudySlugs: ["graston-growth-engine", "pike-medical"],
    },
    {
      problemLabel: "Patient & client acquisition",
      description: "Regulated-industry growth built on compliant, measurement-first infrastructure.",
      caseStudySlugs: ["primarycare-indy", "urgentcare-indy"],
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
