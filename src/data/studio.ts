import type { PageMeta } from "@/types";

export const studioMeta: PageMeta = {
  title: "Studio",
  description:
    "Visual work samples, interface experiments, and campaign craft from Darling MarTech—proof that systems still have to look and feel like a brand.",
  canonicalUrl: "https://darlingmartech.com/studio",
};

export const studioPageData = {
  hero: {
    eyebrow: "STUDIO",
    headline: "Systems should still feel like a brand.",
    body: "A running archive of visual work: launches, UI experiments, and campaign craft tied to measurable outcomes. More pieces ship here as engagements allow.",
  },
  gallery: [
    {
      publicId: "tools/growth-bottleneck-quiz",
      alt: "Growth Bottleneck Quiz — diagnostic interface concept",
      width: 1200,
      height: 750,
      caption: "Diagnostic tools — growth bottleneck quiz",
    },
    {
      publicId: "tools/martech-stack-grader",
      alt: "MarTech Stack Grader — stack maturity visual",
      width: 1200,
      height: 750,
      caption: "Stack maturity — grader visual system",
    },
    {
      publicId: "studio/jacob-portrait",
      alt: "Jacob Darling, founder of Darling MarTech",
      width: 900,
      height: 1200,
      caption: "Founder portrait — about and press use",
    },
  ] as const,
};
