import type { CaseStudy } from "@/types";

export const clinicalCompass: CaseStudy = {
  slug: "clinical-compass",
  title: "Clinical Compass — Point-of-Care Protocol Decision Workflow",
  clientName: "Graston Technique®",
  clientContext: "Clinical education product · Point-of-care protocol workflow",
  showClientName: false,
  clientContextLabel: "Clinical protocol workflow",
  location: "Indianapolis, IN",
  timeline: "Product workflow build",
  engagementFormat: "project",
  outcomeTags: ["Systems Built"],
  problemClusters: ["site-not-converting"],
  trustLadderStage: "evaluate",
  metrics: [
    { value: "Progressive disclosure", label: "Protocol steps revealed only when relevant", isHighlighted: true },
    { value: "JSON-backed", label: "Clinical pathways modeled as structured branching content" },
    { value: "Static embed", label: "Workflow can be delivered inside other sites without an app shell" },
  ],
  primaryMetric: {
    value: "Progressive disclosure",
    label: "Protocol steps revealed only when relevant",
    isHighlighted: true,
  },
  primaryOutcomeSlug: "system-consolidation",
  outcomeHeadline: "Point-of-care protocol decisions routed through one guided workflow",
  resultSummary:
    "Clinical Compass is a point-of-care protocol decision workflow, not an intake or CRM system. It uses progressive disclosure and JSON-backed pathways to guide clinicians through the next protocol decision in a lightweight interface that can be embedded anywhere as static HTML, CSS, and JavaScript.",
  heroSubhead:
    "A lightweight clinical workflow built to guide protocol decisions at the moment of care, without requiring a heavy web app shell or platform dependency.",
  whyThisMattered:
    "When clinicians have to interpret protocol logic from static documents or training memory, the next step becomes slower, less consistent, and harder to use in the real context of care. The job here was to turn protocol knowledge into a guided workflow that remains fast, portable, and easy to maintain.",
  whatWasBroken: [
    "Protocol guidance lived more like reference material than an in-flow decision tool, so users had to interpret the next step themselves",
    "Long-form content exposed too much too early, making it harder to navigate the right branch in the moment of care",
    "The workflow needed to be embeddable in static environments, which ruled out a heavier app-style implementation",
    "Content updates needed to happen in structured pathway data, not in brittle hardcoded UI branches",
  ],
  buildSections: [
    {
      title: "Progressive-disclosure decision flow",
      description:
        "The protocol was rebuilt as a step-by-step decision workflow that only reveals the next relevant branch when a user makes a choice. Instead of scanning a dense page, clinicians move through one decision at a time.",
    },
    {
      title: "JSON-backed pathway model",
      description:
        "Branching logic, pathway labels, and decision content were modeled in JSON so the workflow could be maintained as structured content instead of rewriting front-end logic for every protocol update.",
    },
    {
      title: "Static embed-anywhere delivery",
      description:
        "The runtime was built with vanilla HTML, CSS, and JavaScript so the workflow could be embedded into static environments and shipped without framework overhead or application hosting complexity.",
    },
    {
      title: "Low-friction protocol UX",
      description:
        "Interaction patterns were tuned for clarity and speed: simple branching controls, persistent context, and copy written for the point-of-care moment rather than for general product marketing.",
    },
  ],
  operatingImpact:
    "Instead of interpreting dense protocol content or jumping between references, clinicians get one guided decision path at a time. The workflow is easier to embed, easier to maintain, and clearer to use in context than a heavier application or a static document.",
  implementationLayers: [
    "Progressive-disclosure protocol UI",
    "JSON-backed pathway architecture",
    "Vanilla HTML/CSS/JS runtime",
    "Static embed delivery",
    "Structured content-driven branch logic",
  ],
  relatedToolSlugs: ["growth-system-audit"],
  relatedServiceSlugs: ["custom-infrastructure", "website-design"],
  relatedProblemSlugs: ["site-not-converting"],
  relatedProofSlugs: ["license-requirements-navigator", "the-compass"],
  relatedBuildTypeLabel: "Custom product & infrastructure",
  systemsBuilt: [
    "Protocol decision workflow",
    "Progressive disclosure UX",
    "JSON-backed pathways",
    "Static embed delivery",
    "Vanilla HTML/CSS/JS implementation",
  ],
  decisionTags: [
    "Needed to work as a static embeddable workflow, not a full app",
    "Had to keep branching logic maintainable in structured data",
    "Needed point-of-care clarity without exposing the entire protocol at once",
  ],
  proofDetailHeroAlt:
    "Clinical Compass guided protocol workflow showing progressive steps and structured clinical decision branches.",
  proofDetailSupportVisuals: [
    {
      publicId: "graston_instruments_-_clinical_compass-summary",
      alt: "Clinical Compass protocol summary screen with progressive-disclosure pathway output.",
      label: "Protocol summary screen",
    },
  ],
  cloudinaryImages: ["Generated_Image_April_12_2026_-_4_24AM"],
  featured: true,
  projectType: "custom-infrastructure-product",
  buyerScenario: "trust-routing-weak",
  projectComplexity: "focused",
  scopeShape: "single-flow",
  evidenceType: "documented-delivery",
  primarySimilaritySummary:
    "This is a fit if users need a guided protocol or decision workflow in one lightweight embeddable experience instead of a PDF, deck, or heavy app.",
  publishedAt: "2023-08-01",
};
