import type { GeoAuditCheckKey } from "@/types";

export const GEO_AUDIT_CHECK_KEYS: GeoAuditCheckKey[] = [
  "crawler",
  "schema",
  "metadata",
  "structure",
  "faq",
  "authority",
];

export const geoAuditCheckLabels: Record<GeoAuditCheckKey, { title: string; whyItMatters: string }> = {
  crawler: {
    title: "Crawler access",
    whyItMatters:
      "If crawlers hit a noindex directive on the page, you can disappear from normal indexing and from many AI summaries that respect robots signals.",
  },
  schema: {
    title: "JSON-LD schema",
    whyItMatters:
      "Structured data is explicit machine-readable context. It reduces guesswork when models infer entity type, services, and geography.",
  },
  metadata: {
    title: "Title and meta description",
    whyItMatters:
      "Titles and descriptions are cheap classification signals. Vague or missing metadata makes it easier for models to skip depth and treat the page as low-signal.",
  },
  structure: {
    title: "Heading hierarchy",
    whyItMatters:
      "A single clear H1 plus supporting H2s gives topic boundaries. Multiple H1s or flat walls of text make summarization noisier.",
  },
  faq: {
    title: "Conversational headings",
    whyItMatters:
      "Question-shaped headings often map cleanly to how people prompt AI tools. That alignment helps retrieval and citation-style answers.",
  },
  authority: {
    title: "Outbound citations",
    whyItMatters:
      "Links to reputable third parties signal that the page participates in a broader fact graph instead of living in a closed loop.",
  },
};

export const geoAuditFormCopy = {
  sectionEyebrow: "Full report",
  title: "Email the full breakdown.",
  body:
    "You get the structured checklist, raw signals, and JSON-LD notes in one message so you can forward it or file it. I may follow up once with a practical next step — no drip nonsense.",
  nameLabel: "Name",
  emailLabel: "Email",
  companyLabel: "Company (optional)",
  noteLabel: "What you want to improve (optional)",
  submit: "Email me the full report",
  submitting: "Sending…",
  honeypotLabel: "Company website",
} as const;

export const geoAuditUiCopy = {
  inputEyebrow: "Audited URL",
  urlPlaceholder: "https://example.com/your-page",
  runCta: "Run audit",
  scanning: "Scanning…",
  intelligenceTitle: "How models compress this page",
  entitiesLabel: "Top term signals (frequency)",
  entitiesHint:
    "If your core offer is not reflected here, tighten the H1, first screen copy, and proof so the page vocabulary matches what you sell.",
  h1Label: "Primary H1 (as seen in HTML)",
  overviewEyebrow: "At a glance",
  diagnosticsTitle: "Signal checklist",
  rawXrayTitle: "Raw signals (x-ray)",
  rawXrayHint: "Exact values pulled from the HTML response. Useful when you are debugging schema or indexation.",
  scoreLabel: "Readiness score",
  scoreHigh: "Strong structural signals for this URL.",
  scoreMid: "Mixed signals — a few fixes will move the needle.",
  scoreLow: "Thin signals — models have little to anchor on yet.",
  passedChecksLabel: "Checks passed this run",
} as const;

export function getGeoAuditOverviewLines(score: number, passedCount: number, topEntity?: string): string[] {
  const band =
    score >= 71 ? geoAuditUiCopy.scoreHigh : score >= 41 ? geoAuditUiCopy.scoreMid : geoAuditUiCopy.scoreLow;

  const lines = [`${geoAuditUiCopy.scoreLabel}: ${score} out of 100. ${band}`, `${passedCount} of 6 checks passed on this pass.`];

  if (topEntity) {
    lines.push(
      `The page language leans hardest on “${topEntity}”. If that is not the story you want models to learn, rewrite above-the-fold copy and headings until the signal matches.`
    );
  }

  return lines;
}
