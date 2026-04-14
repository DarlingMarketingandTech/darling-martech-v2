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
    headline: "Results aren't claimed here. They're documented.",
    body: "Every number on this page is tied to a specific engagement, a specific system, and a specific outcome.",
  },
  explanation: {
    eyebrow: "How to read this",
    headline: "Every number has a source.",
    body: [
      "These are not headline stats blended across unrelated retainers.",
      "Each metric maps to a specific engagement period, a specific operating system, and a specific starting point.",
    ],
  },
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
