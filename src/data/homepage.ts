import type { PageMeta } from "@/types";

export const homepageMeta: PageMeta = {
  title: "Strategy, Systems & Execution",
  description:
    "Darling MarTech helps growth-stage businesses identify the real bottleneck, build the right systems, and run the full marketing stack with one accountable operator.",
  canonicalUrl: "https://darlingmartech.com",
};

export const homepageData = {
  nav: {
    logo: "Darling MarTech",
  },
  hero: {
    eyebrow: "INDIANAPOLIS, IN · OWNER-OPERATED · BUILT FOR GROWTH",
    headline: "Your marketing stack is either working for you. Or it isn't.",
    subhead:
      "When strategy, systems, and execution live in different hands, nothing compounds. I close that gap and I stay to run it.",
    primaryCta: { label: "Find your bottleneck", href: "/tools/growth-bottleneck-quiz" },
    secondaryCta: { label: "See the proof", href: "/proof" },
  },
  proofBar: [
    { value: "+212%", label: "qualified leads · Graston Technique®" },
    { value: "+45%", label: "patient growth · Pike Medical" },
    { value: "95%", label: "less manual overhead · Graston Growth Engine" },
    { value: "4.9★", label: "local trust conversion · Russell Painting" },
  ],
  problemSection: {
    eyebrow: "Find your problem",
    headline: "Most growth problems start in one of four places.",
    body: "Not sure which one is yours?",
    diagnosticCta: { label: "Run the 3-minute diagnostic", href: "/tools/growth-bottleneck-quiz" },
  },
  processSection: {
    eyebrow: "How this works",
    headline: "One person. The whole stack. No hand-offs.",
    body: "I don't sell you a strategy and disappear. I build it, run it, and measure it directly.",
    columns: [
      {
        number: "01",
        title: "Diagnose",
        body: "The real bottleneck gets named before anything is proposed.",
      },
      {
        number: "02",
        title: "Build",
        body: "The output is a working system, not a deck about a system.",
      },
      {
        number: "03",
        title: "Run & Measure",
        body: "The work keeps running after launch and gets adjusted using real data.",
      },
    ],
  },
  ownerOperator: {
    eyebrow: "Owner-operated",
    headline: "You work with me. Not an account manager. Not a junior. Me.",
    body: [
      "I'm Jacob Darling. I've been inside marketing teams as a director and outside as a consultant for 15 years.",
      "When something breaks, I fix it. When something isn't working, I tell you directly.",
    ],
    cta: { label: "More about how I work", href: "/process" },
  },
  toolsPreview: {
    eyebrow: "Free diagnostic tools",
    headline: "Start with a diagnosis, not a sales call.",
    body: "Every tool on this site exists to answer a specific question before an engagement begins.",
    cta: { label: "See all tools", href: "/tools" },
  },
  closingCta: {
    headline: "If the problem is clear, the next step is a conversation.",
    body: "No pitch deck. No bloated discovery form. Just a real conversation about what is actually getting in the way.",
    primaryCta: { label: "Let's talk", href: "/contact" },
    secondaryCta: { label: "Or start with a free tool", href: "/tools" },
  },
};
