import type { PageMeta } from "@/types";
import { siteConfig } from "@/data/site-config";

export const homepageMeta: PageMeta = {
  title: "Revenue Systems, AI Automation & Custom Build",
  description:
    "Darling MarTech bridges marketing strategy, AI-enabled automation, and custom technical infrastructure for growth-stage businesses with complex stacks. One accountable operator builds, integrates, and runs the full system.",
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
      "Revenue attribution, AI-enabled automation, custom integrations — and the strategy to know which one to build first. One person. Direct accountability.",
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
  newsletterBand: {
    eyebrow: "Insights",
    headline: "Weekly notes from the stack — strategy, systems, and what actually moved the needle.",
    body: "Short, practical breakdowns: what I tested, what broke, and what I would run again. No sponsor slots, no recycled listicles.",
    /** Default social proof line; overridden in `page.tsx` when `NEXT_PUBLIC_NEWSLETTER_SUBSCRIBERS` is set. */
    subscriberLineFallback: "Join 850+ readers on the list",
    microcopy: "One email per week. Unsubscribe anytime.",
  },
  evaluationTrio: {
    eyebrow: "HOW HIGH-STAKES BUYERS EVALUATE A PARTNER",
    headline: "Three things matter most — and they're non-negotiable.",
    items: [
      {
        number: "01",
        title: "Revenue clarity",
        body: "Not impressions. Not click-throughs. Direct linkage between marketing activity and closed revenue — the kind that holds up in a board meeting or a budget defense.",
      },
      {
        number: "02",
        title: "Proactive partnership",
        body: "An extension of your leadership team. I identify gaps and propose roadmaps without being asked — before the problem compounds, not after.",
      },
      {
        number: "03",
        title: "Speed without fragility",
        body: "Fast to ship, but built to hold. Agile sprints and working systems — not multi-year transformation projects or prototypes that break the moment someone touches them.",
      },
    ],
  },
  icpSection: {
    eyebrow: "WHO THIS IS FOR",
    headline: "The economics need to make sense. Here's the filter.",
    body: "The best-fit engagement has three traits — and they matter more than industry or company size.",
    items: [
      {
        title: "High customer lifetime value",
        body: "One client or patient or deal is worth enough to justify a sophisticated acquisition setup. If a single win is worth $5k–$60k+, building the right system to capture more of them pays for itself fast.",
      },
      {
        title: "Complex or multi-touch sales cycle",
        body: "The sale involves more than one stakeholder, takes more than 30 days, or requires education and nurturing before a decision. That's where custom automation and attribution systems create the most leverage.",
      },
      {
        title: "A fragmented stack",
        body: "Marketing uses HubSpot. Sales uses Salesforce. Finance uses Stripe. They don't talk. Leads fall through, attribution is guesswork, and decisions depend on whoever last exported a spreadsheet.",
      },
    ],
    notAFit: "Not a fit: early-stage with one tool, pure creative-only needs, or looking for hourly commodity work.",
    cta: { label: "See if your problem is on the list →", href: "/problems" },
  },
  closingCta: {
    headline: "If the problem is clear, the next step is a conversation.",
    body: "No pitch deck. No discovery form with 14 fields. A real conversation about what's actually getting in the way. I reply within one business day, usually same-day.",
    primaryCta: { label: "Let's talk →", href: siteConfig.calComLink },
    secondaryCta: { label: "Or start with a free tool →", href: "/tools" },
  },
};
