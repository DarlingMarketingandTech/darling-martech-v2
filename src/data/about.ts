import type { PageMeta } from "@/types";

export const aboutMeta: PageMeta = {
  title: "About Jacob Darling",
  description:
    "Fifteen years of marketing strategy, systems, and execution across healthcare, legal, finance, SaaS, and local service businesses.",
  canonicalUrl: "https://darlingmartech.com/about",
};

export const aboutPageData = {
  hero: {
    eyebrow: "JACOB DARLING · FOUNDER, DARLING MARTECH",
    headline: "I've been on both sides of this problem for 15 years.",
    body: [
      "I've sat inside marketing teams as a director and worked outside as a consultant. I've built systems that ran healthcare platforms, law firm brands, financial advisory pipelines, and SaaS training engines.",
      "I started Darling MarTech because small businesses deserve access to senior strategy and technical execution without a 15-person agency team.",
    ],
    imageId: "studio/jacob-portrait",
  },
  credentials: [
    { value: "15+", label: "Years of marketing strategy and technical execution" },
    { value: "7", label: "Industries served across regulated and growth-stage markets" },
    { value: "2008", label: "Indiana University business management degree" },
    { value: "Indy", label: "Based in Indianapolis, serving clients nationally" },
  ],
};
