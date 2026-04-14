import type { ProblemPage } from "@/types";

export const problemPages: ProblemPage[] = [
  {
    slug: "no-strategy-owner",
    title: "No one is steering the whole system",
    heroHeadline: "No one is steering the whole system — and growth is showing it.",
    heroSubhead:
      "Marketing activity exists, but strategic ownership does not. Priorities shift, reporting stays shallow, and nothing compounds.",
    symptoms: [
      "Activity everywhere, progress nowhere",
      "Priorities change with whoever spoke last",
      "Reporting shows motion but not business impact",
    ],
    cause:
      "The issue is usually structural, not personal. No one is holding positioning, pipeline, priorities, and measurement in one head.",
    solution:
      "Fractional CMO ownership that ties strategy, execution, and reporting together with one accountable operator.",
    relatedProof: ["graston-growth-engine"],
    relatedService: "fractional-cmo",
    relatedTool: "cmo-simulator",
    cta: {
      primary: { label: "Let's talk", href: "/contact" },
      secondary: { label: "Try the CMO Simulator first", href: "/tools/cmo-simulator" },
    },
  },
  {
    slug: "site-not-converting",
    title: "The site gets traffic but doesn't convert it",
    heroHeadline: "Your site gets traffic. It just doesn't do anything with it.",
    heroSubhead:
      "The issue is usually trust, structure, and information flow, not aesthetics.",
    symptoms: [
      "Traffic arrives and leaves without taking action",
      "The site looks fine but trust does not build fast enough",
      "Warm referrals convert, colder demand does not",
    ],
    cause:
      "Sites get built in layers and rarely get rewritten when positioning changes. Visitors are forced to decode the offer for themselves.",
    solution:
      "A problem-first site structure with clear trust signals, intentional conversion flow, and page-level CTA logic by trust stage.",
    relatedProof: ["pike-medical"],
    relatedService: "content-seo-systems",
    relatedTool: "cmo-roadmap-generator",
    cta: {
      primary: { label: "Let's look at yours", href: "/contact" },
      secondary: { label: "Generate a roadmap first", href: "/tools/cmo-roadmap-generator" },
    },
  },
  {
    slug: "disconnected-systems",
    title: "Leads, follow-up, and reporting are disconnected",
    heroHeadline: "Your leads, follow-up, and reporting don't talk to each other.",
    heroSubhead:
      "Leads leak quietly when the system is patched together instead of designed end-to-end.",
    symptoms: [
      "Follow-up depends on manual effort",
      "CRM hygiene is inconsistent",
      "No one can say with confidence what is working",
    ],
    cause:
      "Systems were added in layers over time instead of being architected around the full lead-to-close journey.",
    solution:
      "CRM architecture, automation design, and reporting integration so the operating system can scale without breaking.",
    relatedProof: ["graston-growth-engine", "pike-medical"],
    relatedService: "martech-stack-build",
    relatedTool: "attribution-snapshot",
    cta: {
      primary: { label: "Let's map it", href: "/contact" },
      secondary: { label: "Run Attribution Snapshot", href: "/tools/attribution-snapshot" },
    },
  },
  {
    slug: "not-visible-enough",
    title: "Qualified buyers exist but can't find you",
    heroHeadline: "Your buyers exist. They just can't find you.",
    heroSubhead:
      "If search visibility is inconsistent, trust and demand stay lower than the quality of the business deserves.",
    symptoms: [
      "Organic visibility is inconsistent",
      "Local search underperforms",
      "Paid spend produces cost, not clear pipeline",
    ],
    cause:
      "Visibility gets treated like a short-term project instead of a system that needs structure, maintenance, and measurement.",
    solution:
      "Local SEO, GEO readiness, trust architecture, and content systems designed to improve discoverability and conversion together.",
    relatedProof: ["russell-painting"],
    relatedService: "content-seo-systems",
    relatedTool: "geo-readiness-auditor",
    cta: {
      primary: { label: "Let's see where you stand", href: "/contact" },
      secondary: { label: "Run the GEO audit", href: "/tools/geo-readiness-auditor" },
    },
  },
  {
    slug: "brand-system-broken",
    title: "The brand doesn't match the quality of the business",
    heroHeadline: "The business is better than the brand that represents it.",
    heroSubhead:
      "When positioning, messaging, and visual identity drift apart, the right buyers leave before they understand the value.",
    symptoms: [
      "Messaging changes depending on who wrote it last",
      "Positioning feels vague",
      "First impressions do not signal premium competence",
    ],
    cause:
      "Brand work gets deferred and assembled in pieces instead of being rebuilt around the actual buyer and the actual offer.",
    solution:
      "A brand system built from positioning, buyer fit, trust signals, and operational reality rather than aesthetics alone.",
    relatedProof: ["pike-medical"],
    relatedService: "fractional-cmo",
    relatedTool: "cmo-simulator",
    cta: {
      primary: { label: "Let's rebuild it", href: "/contact" },
      secondary: { label: "Stress-test the positioning first", href: "/tools/cmo-simulator" },
    },
  },
  {
    slug: "pipeline-not-predictable",
    title: "Revenue is coming in but you can't explain why",
    heroHeadline: "Revenue is coming in. You just can't explain where it's coming from.",
    heroSubhead:
      "Attribution blind spots make confident channel decisions almost impossible once growth gets more complex.",
    symptoms: [
      "Attribution is mostly guesswork",
      "Budget decisions rely on anecdotes",
      "Forecasting is more hope than system",
    ],
    cause:
      "Source tracking, CRM hygiene, and reporting were assumed rather than designed. Every tool claims credit and none of them agree.",
    solution:
      "Attribution design, source tracking, CRM data hygiene, and reporting that stand up to scrutiny.",
    relatedProof: ["russell-painting", "graston-growth-engine"],
    relatedService: "attribution-analytics",
    relatedTool: "attribution-snapshot",
    cta: {
      primary: { label: "Let's build the attribution layer", href: "/contact" },
      secondary: { label: "Upload your data first", href: "/tools/attribution-snapshot" },
    },
  },
];
