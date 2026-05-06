import type { HomepageV4Data, PageMeta } from "@/types";
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
      {
        title: "AI agents & internal copilots",
        body: "Custom GPTs, Claude workflows, website AI agents, and internal assistants that help teams use company knowledge, documents, and workflows through natural language.",
      },
      {
        title: "Custom tools & product systems",
        body: "Purpose-built tools, calculators, portals, dashboards, and product workflows when off-the-shelf software does not fit the job.",
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

export const homepageV4Data: HomepageV4Data = {
  hero: {
    eyebrow: "OWNER-OPERATED · SYSTEMS-FIRST · INDIANAPOLIS",
    title: "One operator to fix the parts of growth that do not work together.",
    body: [
      "Most teams do not need more disconnected marketing activity. They need a clearer operating layer between website conversion, CRM, automation, reporting, and the next decision.",
      "I diagnose where the system breaks, rebuild the right piece, and connect it back to revenue, follow-up, and visibility so the business gets easier to run.",
    ],
    primaryCta: { label: "Run the Growth System Audit", href: "/tools/growth-system-audit" },
    secondaryCta: { label: "See Selected Proof", href: "/proof" },
    processItems: ["Diagnose the bottleneck", "Build the missing layer", "Improve what the system does next"],
    trustItems: [
      "Website conversion",
      "CRM + automation",
      "Reporting",
      "Internal tools",
      "AI search readiness",
    ],
    visual: {
      publicId: "curated/homepage/core-infrastructure-engine",
      alt: "Homepage system visual showing a connected operator layer across website, CRM, automation, and reporting.",
      eyebrow: "Operator view",
      title: "One accountable layer across the parts that usually drift apart.",
      points: [
        "Website, proof, and next-step logic aligned",
        "Lead capture and follow-up routed on purpose",
        "Reporting tied back to actual operating decisions",
      ],
    },
  },
  bottlenecks: {
    eyebrow: "Where It Breaks",
    title: "Most growth bottlenecks start in one of three places.",
    intro:
      "This is usually not a traffic problem first. It is a clarity problem, a system problem, or a visibility problem that keeps demand from turning into useful action.",
    cards: [
      {
        title: "The website looks fine, but it does not move people.",
        body:
          "Visitors can reach the site, but the structure, proof, and next step are not sharp enough to turn intent into action.",
        symptoms: ["Offer is understandable only after scrolling", "Proof is present but not decision-useful", "The next step feels buried or generic"],
      },
      {
        title: "Leads arrive, but follow-up depends on memory.",
        body:
          "The business has tools, but routing, reminders, lifecycle logic, and ownership are still too manual to trust at scale.",
        symptoms: ["CRM and inboxes tell different stories", "Follow-up timing varies by person", "Reporting and operations drift apart"],
      },
      {
        title: "The business is stronger than its discoverability.",
        body:
          "Good work exists, but search visibility, local trust, and authority signals are too weak to convert that strength into steady demand.",
        symptoms: ["Search visibility is inconsistent", "Local or AI search signals are under-structured", "The right pages are not carrying the proof"],
      },
    ],
  },
  capabilities: {
    eyebrow: "What Gets Built",
    title: "The work is shaped around the bottleneck, not a menu of disconnected deliverables.",
    intro:
      "Each card shows a practical system layer and one proof example. The homepage should explain what changes without forcing visitors through three separate proof sections.",
    cards: [
      {
        title: "Website structure + conversion",
        body: "Sharper positioning, cleaner page hierarchy, stronger proof placement, and a clearer path to the next step.",
        href: "/proof?projectType=conversion-path-repair",
        proof: {
          label: "PrimaryCare Indy",
          metric: "75% more online bookings",
          detail: "Patient-intent pages and a lower-friction booking path turned existing demand into scheduled visits.",
          href: "/proof/primarycare-indy",
          publicId: "Gemini_Generated_Image_qn1c5kqn1c5kqn1c",
          alt: "PrimaryCare Indy website proof composite showing clearer care pages and booking conversion flow.",
        },
      },
      {
        title: "CRM + automation",
        body: "Lead capture, routing, reminders, lifecycle workflows, and follow-up that do not depend on memory.",
        href: "/proof?projectType=crm-automation-system",
        proof: {
          label: "Graston Technique",
          metric: "95% less manual overhead",
          detail: "Automation replaced manual handoffs across enrollment, provider updates, and support workflows.",
          href: "/proof/graston-growth-engine",
          publicId: "crm-workflow",
          alt: "CRM workflow proof visual showing connected lead capture, routing, and automation logic.",
        },
      },
      {
        title: "Reporting + attribution",
        body: "Dashboards, source tracking, and operating visibility that make channel and pipeline decisions easier to defend.",
        href: "/proof?projectType=reporting-attribution-system",
        proof: {
          label: "Graston Technique",
          metric: "+212% qualified leads",
          detail: "Reporting and attribution were reorganized around the operating system, not isolated campaign snapshots.",
          href: "/proof/graston-technique",
          publicId: "graston_data_visualization_dashboard",
          alt: "Dashboard screenshot showing reporting and attribution proof for Graston Technique.",
        },
      },
      {
        title: "Internal tools + calculators",
        body: "Custom operating surfaces, pricing tools, diagnostics, and workflows when off-the-shelf software does not fit the job.",
        href: "/proof?projectType=custom-infrastructure-product",
        proof: {
          label: "The Compass",
          metric: "68% completion rate",
          detail: "An interactive diagnostic created higher-intent leads by giving buyers a useful next step before a call.",
          href: "/proof/the-compass",
          publicId: "CMO_Simulator",
          alt: "Internal diagnostic and planning tool interface used as proof for custom product and workflow systems.",
        },
      },
      {
        title: "Brand + message system",
        body: "A clearer way to explain the offer, carry trust, and stay consistent across the site, sales material, and campaigns.",
        href: "/proof?projectType=brand-identity-system",
        proof: {
          label: "Black Letter",
          metric: "Identity rebuilt with consistent standards",
          detail: "A stronger brand system made the business easier to recognize and easier to trust across touchpoints.",
          href: "/proof/black-letter",
          publicId: "Gemini_Generated_Image_aadwklaadwklaadw",
          alt: "Brand identity composite showing a more consistent authority-driven visual system.",
        },
      },
      {
        title: "Visibility + local demand capture",
        body: "Structured search presence, review velocity, and authority signals that help the right buyers find the business sooner.",
        href: "/proof?projectType=local-growth-system",
        proof: {
          label: "317 BBQ",
          metric: "Top 3 local pack ranking",
          detail: "Brand, search structure, and local trust signals turned a great product into something customers could actually find.",
          href: "/proof/317-bbq",
          publicId: "russell-paintinglocal-visability",
          alt: "Local visibility proof visual showing search presence and trust signals.",
        },
      },
    ],
  },
  featuredOutcomes: {
    eyebrow: "Selected Outcomes",
    title: "A few examples of what changed after the operating layer was rebuilt.",
    intro:
      "This section should stay compact. One featured case explains the operator model, and the supporting highlights prove the work changes real commercial behavior.",
    featuredSlug: "graston-growth-engine",
    featuredLabel: "Automation + systems",
    featuredTitle: "From fragmented follow-up to a system the team could actually run.",
    featuredBody:
      "This engagement replaced brittle manual steps with CRM-connected automation, provider sync logic, and reporting the team could use weekly. The work was not another campaign layer. It gave the business a more reliable operating system.",
    featuredCta: { label: "View the full case", href: "/proof/graston-growth-engine" },
    highlights: [
      {
        slug: "primarycare-indy",
        label: "PrimaryCare Indy",
        detail: "75% more online bookings after restructuring the patient path around trust and scheduling.",
      },
      {
        slug: "barbershop-command-center",
        label: "Hoosier Boy Barbershop",
        detail: "3× repeat bookings after connecting booking, reminders, reviews, and follow-up.",
      },
      {
        slug: "317-bbq",
        label: "317 BBQ",
        detail: "Top 3 local pack visibility after building the brand and local search foundation from zero.",
      },
    ],
  },
  tools: {
    eyebrow: "Low-Trust Entry",
    title: "Tools buyers can use before they are ready to talk.",
    intro:
      "These are practical diagnostics and planning tools. The audit stays first because it is the clearest starting point when the real bottleneck is still fuzzy.",
    primaryCta: { label: "Run the Growth System Audit", href: "/tools/growth-system-audit" },
    secondaryCta: { label: "Browse all tools", href: "/tools" },
    cards: [
      {
        slug: "growth-system-audit",
        label: "Recommended first step",
        body: "Find where the system is actually broken and route yourself to the right proof or next project shape.",
        ctaLabel: "Start the audit",
      },
      {
        slug: "cmo-simulator",
        label: "Strategy simulation",
        body: "Explore operator tradeoffs and priorities in a deeper, more open-ended strategy workflow.",
        ctaLabel: "Open the simulator",
      },
      {
        slug: "geo-readiness-auditor",
        label: "AI + search visibility",
        body: "See whether search engines and AI systems can actually understand your public pages.",
        ctaLabel: "Check GEO readiness",
      },
      {
        slug: "attribution-snapshot",
        label: "Measurement clarity",
        body: "Compare attribution models side by side before changing spend or arguing from incomplete reporting.",
        ctaLabel: "Open attribution snapshot",
      },
    ],
  },
  closingCta: {
    eyebrow: "Next Step",
    title: "If the system is hard to run, the next move is probably structural.",
    body:
      "Start with the audit if the problem is still fuzzy. Go to proof if you need to see similar work. Reach out directly if you already know the system needs an accountable operator.",
    primaryCta: { label: "Run the Growth System Audit", href: "/tools/growth-system-audit" },
    secondaryCta: { label: "Browse Proof", href: "/proof" },
    tertiaryCta: { label: "Start a Conversation", href: "/contact" },
  },
};
