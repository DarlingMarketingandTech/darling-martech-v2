import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "fractional-cmo",
    title: "Fractional CMO",
    headline: "Strategic ownership of the full marketing system.",
    description:
      "For companies that need a senior marketing lead without hiring full-time. Strategy, prioritization, reporting, and direct accountability stay in one place.",
    outcomes: [
      "Clear priorities tied to revenue",
      "Senior decision support",
      "One accountable operator across the stack",
    ],
    proofReferences: ["graston-qualified-leads", "graston-growth-engine"],
    problemClusters: ["no-strategy-owner", "brand-system-broken"],
    engagementFormats: ["fractional", "diagnostic"],
    isFeatured: true,
  },
  {
    slug: "martech-stack-build",
    title: "MarTech Stack Build",
    headline: "Connected systems that stop leads from leaking.",
    description:
      "CRM architecture, automation, integration, and implementation for businesses that have outgrown manual operations and disconnected tools.",
    outcomes: [
      "Fewer manual handoffs",
      "Connected reporting",
      "Systems that keep running after launch",
    ],
    proofReferences: ["graston-growth-engine", "pike-medical"],
    problemClusters: ["disconnected-systems", "pipeline-not-predictable"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: true,
  },
  {
    slug: "crm-architecture",
    title: "CRM Architecture",
    headline: "Lead flow, follow-up, and visibility designed end-to-end.",
    description:
      "For organizations that need cleaner intake, clearer pipeline stages, and reporting they can trust.",
    outcomes: [
      "Better lead-to-close tracking",
      "Segmented follow-up",
      "Real-time visibility",
    ],
    proofReferences: ["pike-medical"],
    problemClusters: ["disconnected-systems", "pipeline-not-predictable"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: false,
  },
  {
    slug: "automation-systems",
    title: "Automation Systems",
    headline: "Manual processes replaced with durable workflows.",
    description:
      "Automation across forms, CRM, email, routing, and reporting so growth does not depend on whoever remembered to follow up.",
    outcomes: [
      "Lower overhead",
      "More consistent follow-up",
      "Fewer dropped leads",
    ],
    proofReferences: ["graston-growth-engine", "pike-medical"],
    problemClusters: ["disconnected-systems"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
  },
  {
    slug: "attribution-analytics",
    title: "Attribution & Analytics",
    headline: "One clear view of where revenue is actually coming from.",
    description:
      "Tracking, source hygiene, and reporting that hold up under scrutiny and make channel decisions easier.",
    outcomes: [
      "Stronger reporting",
      "Defensible channel investment",
      "Fewer attribution blind spots",
    ],
    proofReferences: ["russell-painting", "graston-growth-engine"],
    problemClusters: ["pipeline-not-predictable", "not-visible-enough"],
    engagementFormats: ["project", "diagnostic", "fractional"],
    isFeatured: true,
  },
  {
    slug: "content-seo-systems",
    title: "Content & SEO Systems",
    headline: "Visibility built as a repeatable system, not a one-off campaign.",
    description:
      "Local SEO, organic visibility, trust signals, and structured content designed to produce better discovery and stronger conversion.",
    outcomes: [
      "Improved search presence",
      "Better-qualified traffic",
      "Clearer trust signals",
    ],
    proofReferences: ["russell-painting"],
    problemClusters: ["not-visible-enough", "site-not-converting"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
  },
];
