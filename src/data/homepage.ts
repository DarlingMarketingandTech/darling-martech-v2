import type { PageMeta } from "@/types";
import { CTA_LINKS } from "@/lib/cta";

export const homepageMeta: PageMeta = {
  title: "Revenue Systems, AI Automation & Custom Build",
  description:
    "Darling MarTech builds and runs connected growth systems — from first-working foundations to complex stack repairs. One accountable operator diagnoses the bottleneck, integrates the tools, and makes the system measurable.",
  canonicalUrl: "https://darlingmartech.com",
};

export const homepageData = {
  nav: {
    logo: "Darling MarTech",
  },
  hero: {
    eyebrow: "INDIANAPOLIS, IN · OWNER-OPERATED · SYSTEMS-FIRST",
    headline: {
      beforeAccent: "Most teams don’t need more marketing. They need ",
      accent: "something that actually works together.",
      afterAccent: "",
    },
    subhead:
      "I design and build the pieces behind better marketing, from brand and websites to lead capture, CRM, automation, and reporting, so everything works as one instead of disconnected parts.",
    scopeLine:
      "Start with what your business needs next: a logo, a website, a stronger brand system, better lead capture, automated follow-up, clearer reporting, or a full growth strategy.",
    primaryCta: { label: "Find the right starting point", href: CTA_LINKS.startHere },
    secondaryCta: { label: "See examples by project type", href: CTA_LINKS.proof },
  },
  proofBar: [
    { value: "+212%", label: "qualified leads — CRM + lifecycle automation rebuild" },
    { value: "+45%", label: "patient pipeline — multi-year intake + CRM alignment" },
    { value: "95%", label: "manual overhead removed — stack consolidation + workflows" },
    { value: "4.9★", label: "local trust conversion — reputation + request flow system" },
    { value: "15+", label: "years · Healthcare · Legal · Finance · SaaS · B2B" },
  ],
  whatThisCanIncludeSection: {
    title: "What this can include",
    intro:
      "The work can start simple or go deep. The point is to build the pieces your business needs next, then make sure they connect.",
    cards: [
      {
        title: "Brand identity",
        body: "Logo, visual direction, messaging, and guidelines that make the business easier to recognize and trust.",
      },
      {
        title: "Websites",
        body: "Clear, credible pages that explain what you do, who it is for, and what someone should do next.",
      },
      {
        title: "Conversion paths",
        body: "Forms, calls-to-action, page structure, booking paths, and proof placement that turn interest into action.",
      },
      {
        title: "CRM and follow-up",
        body: "Lead capture, contact records, routing, reminders, and lifecycle flows so opportunities do not slip through the cracks.",
      },
      {
        title: "Automation",
        body: "Repeatable workflows that reduce manual work and keep the right next step moving.",
      },
      {
        title: "Reporting and strategy",
        body: "Clearer visibility into what is working, what needs to change, and what to build next.",
      },
    ],
  },
  diagnosticBand: {
    headline: "Not sure where to start? There's an 8-question diagnostic for that.",
    body: "Answer 8 questions. Get a specific diagnosis — not a generic checklist. No email required to see your results.",
    cta: { label: "Run the Growth System Audit →", href: "/tools/growth-system-audit" },
  },
  problemSection: {
    eyebrow: "Find your problem",
    headline: "Most growth bottlenecks start in one of four places.",
    body: "Use this to diagnose fast before choosing a path.",
    diagnosticCta: { label: "Run the Growth System Audit", href: "/tools/growth-system-audit" },
  },
  buyerPathSection: {
    eyebrow: "Start from your current system state",
    headline: "Two valid ways buyers show up here. Pick your path.",
    body: "You are either repairing a stack that exists, or building a stack that never really existed. Both are valid. The next step is different.",
    paths: [
      {
        stateLabel: "BROKEN-SYSTEM BUYERS",
        title: "You have tools and traffic. The system is fragmented.",
        body: "You are getting activity but not trustable performance because handoffs, attribution, and follow-up are leaking value.",
        signals: [
          "CRM and reporting conflict with each other",
          "Leads stall between form submit and follow-up",
          "Decisions depend on exports and guesswork",
        ],
        primaryCta: { label: "Audit the stack gaps →", href: "/tools/martech-fragmentation-scorecard" },
        secondaryCta: { label: "See related problems →", href: "/problems/disconnected-systems" },
      },
      {
        stateLabel: "MISSING-SYSTEM BUYERS",
        title: "You do not have a real operating system yet.",
        body: "You might have a site and a few tools, but not a connected capture -> follow-up -> conversion -> visibility workflow.",
        signals: [
          "Leads are managed manually in inboxes or notes",
          "Booking, intake, and follow-up are not connected",
          "No clear visibility into what is working",
        ],
        primaryCta: { label: "Map what your system is missing →", href: "/tools/growth-system-audit" },
        secondaryCta: { label: "See foundation problems →", href: "/problems/no-strategy-owner" },
      },
    ],
  },
  systemLogicSection: {
    eyebrow: "Problem-first system logic",
    headline: "The issue is rarely channel effort. It is system failure.",
    body: "When growth underperforms, the fix is usually structural: diagnose where the system breaks, quantify the cost, then rebuild the operating layer.",
    steps: [
      {
        label: "WHAT BREAKS",
        title: "Capture and handoff logic",
        body: "Traffic arrives, but intake, routing, and follow-up are inconsistent. The pipeline looks full while revenue leaks.",
      },
      {
        label: "WHAT IT COSTS",
        title: "Lost opportunities and slow decisions",
        body: "Missed leads, delayed replies, lower close rates, and budget decisions made on partial or noisy data.",
      },
      {
        label: "WHAT FIXES IT",
        title: "Connected operating system",
        body: "A practical system across site, CRM, automation, and attribution so the business can capture, convert, and measure demand reliably.",
      },
    ],
  },
  processSection: {
    eyebrow: "How this works",
    headline: "First we identify what needs to work better. Then I build it.",
    body: "The process stays practical: clarify the real issue, pick the right project shape, build the useful pieces, then connect the result to action.",
    columns: [
      {
        number: "01",
        title: "Clarify the starting point",
        body: "Is this a brand, website, conversion, CRM, automation, reporting, or strategy problem?",
      },
      {
        number: "02",
        title: "Choose the right project shape",
        body: "A focused fix, multi-page rebuild, CRM lifecycle, reporting layer, or multi-channel system.",
      },
      {
        number: "03",
        title: "Build the useful pieces",
        body: "The deliverable should make the business easier to understand, easier to operate, or easier to improve.",
      },
      {
        number: "04",
        title: "Connect the result to action",
        body: "The work should help people find you, trust you, contact you, buy, book, or make better decisions.",
      },
    ],
  },
  toolsSection: {
    eyebrow: "Starting point tool",
    headline: "Not sure what kind of project you need? Start here.",
    body: "Answer a few questions about your brand, website, leads, follow-up, and reporting. You’ll get a clearer starting point before buying a service or booking a call.",
    primaryCta: { label: "Find the right starting point", href: "/tools/growth-system-audit" },
    secondaryCta: { label: "Browse all project examples", href: "/proof" },
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
  proofBridgeSection: {
    eyebrow: "Proof bridge",
    headline: "Promises mean nothing without documented operating outcomes.",
    body: "These are system-level shifts, not cosmetic wins. Each one maps to a problem path and a repeatable implementation layer.",
    frames: [
      {
        metric: "+212%",
        context: "qualified leads - Graston Technique",
        whyItMatters: "Demand capture and conversion systems rebuilt end-to-end under one operating owner.",
      },
      {
        metric: "95%",
        context: "manual overhead reduction - Graston Growth Engine",
        whyItMatters: "Automation and stack consolidation replaced repetitive human handoffs with reliable workflows.",
      },
      {
        metric: "+45%",
        context: "patient pipeline — clinical intake & CRM system",
        whyItMatters: "CRM, intake, and follow-up improvements turned disconnected activity into measurable pipeline lift.",
      },
    ],
    primaryCta: { label: "Review documented outcomes →", href: "/proof" },
    secondaryCta: { label: "See the matching problems →", href: "/problems" },
  },
  icpSection: {
    eyebrow: "WHO THIS IS FOR",
    headline: "The economics need to make sense. Here's the filter.",
    body: "The best-fit engagement has three traits. Company size alone is not the filter.",
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
    notAFit:
      "Not a fit: buyers who want isolated tactics without system change, reject process ownership, or treat implementation as commodity labor.",
    cta: { label: "See if your problem is on the list →", href: "/problems" },
  },
  closingCta: {
    headline: "Choose the next step that matches your confidence level.",
    body: "Need clarity? Take the audit. Need proof? Browse examples by project type. Ready to talk? Start a conversation.",
    primaryCta: { label: "Need clarity? Take the audit.", href: "/tools/growth-system-audit" },
    secondaryCta: { label: "Need proof? Browse examples by project type.", href: "/proof" },
    readyLink: { label: "Ready to talk? Start a conversation.", href: "/contact" },
  },
};
