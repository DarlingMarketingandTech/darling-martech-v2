import type { PageMeta } from "@/types";
import { siteConfig } from "@/data/site-config";

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
    headline: {
      beforeAccent: "Your marketing stack is either working ",
      accent: "for you.",
      afterAccent: " Or it isn't.",
    },
    subhead:
      "When strategy, systems, and execution live in different hands, nothing compounds. I close that gap — and I stay to run it.",
    primaryCta: { label: "Find your bottleneck →", href: "/tools/growth-bottleneck-quiz" },
    secondaryCta: { label: "See the proof", href: "/proof" },
  },
  proofBar: [
    { value: "+212%", label: "qualified leads — Graston Technique®" },
    { value: "+45%", label: "patient growth over 3 years — Pike Medical Consultants" },
    { value: "95%", label: "less manual overhead — Graston Growth Engine" },
    { value: "4.9★", label: "local trust conversion — Russell Painting" },
    { value: "15+", label: "years · Healthcare · Legal · Finance · SaaS · B2B" },
  ],
  diagnosticBand: {
    headline: "Not sure where to start? There's an 8-question diagnostic for that.",
    body: "Answer 8 questions. Get a specific diagnosis — not a generic checklist. No email required to see your results.",
    cta: { label: "Take the Growth Bottleneck Quiz →", href: "/tools/growth-bottleneck-quiz" },
  },
  /** Compact pathway row directly under the proof ticker — full problem cards follow below. */
  pathwayStrip: {
    eyebrow: "Choose a pathway",
    headline: "Four ways growth usually breaks — pick the one that sounds like you.",
  },
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
        body: "Name the real bottleneck with a structured diagnostic — tools, data, or conversation — before anything is scoped.",
      },
      {
        number: "02",
        title: "Build",
        body: "Ship working systems: CRM, automation, site, and reporting — not recommendations buried in a deck.",
      },
      {
        number: "03",
        title: "Run & Measure",
        body: "Stay past launch: operate the stack, read the numbers, and adjust so accountability stays in one place.",
      },
    ],
  },
  /** Homepage featured proof block — must match a `CaseStudy.slug` in work-index. */
  featuredCaseStudySlug: "graston-qualified-leads",
  proofStrip: {
    eyebrow: "Featured proof",
    headline: "One engagement, one accountable operator, compounding pipeline.",
  },
  newsletterBand: {
    eyebrow: "Insights",
    headline: "Weekly notes from the stack — strategy, systems, and what actually moved the needle.",
    body: "Short, practical breakdowns: what I tested, what broke, and what I would run again. No sponsor slots, no recycled listicles.",
    /** Default social proof line; overridden in `page.tsx` when `NEXT_PUBLIC_NEWSLETTER_SUBSCRIBERS` is set. */
    subscriberLineFallback: "Join 850+ readers on the list",
    microcopy: "One email per week. Unsubscribe anytime.",
  },
  ownerOperator: {
    eyebrow: "OWNER-OPERATED",
    headline: "You work with me. Not an account manager. Not a junior. Me.",
    body: [
      "I'm Jacob Darling. I've been inside marketing teams as a director and outside as a consultant for 15 years — healthcare systems, law firms, financial advisors, SaaS platforms, local service businesses. I know what good systems look like. I've built them. I maintain them.",
      "When something breaks, I fix it. When something isn't working, I tell you directly. There's no layer between you and the person accountable for the result.",
    ],
    cta: { label: "More about how I work", href: "/process" },
  },
  toolsPreview: {
    eyebrow: "FREE DIAGNOSTIC TOOLS",
    headline: "Start with a diagnosis, not a sales call.",
    body: "Every tool on this site was built to answer a specific question before an engagement begins. Run one. See what it finds. No email required to start.",
    cta: { label: "See all tools →", href: "/tools" },
  },
  closingCta: {
    headline: "If the problem is clear, the next step is a conversation.",
    body: "No pitch deck. No discovery form with 14 fields. A real conversation about what's actually getting in the way. I reply within one business day, usually same-day.",
    primaryCta: { label: "Let's talk →", href: siteConfig.calComLink },
    secondaryCta: { label: "Or start with a free tool →", href: "/tools" },
  },
};
