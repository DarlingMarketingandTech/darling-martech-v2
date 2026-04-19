import type { IndustrySector } from "@/types";

export const industrySectors: IndustrySector[] = [
  {
    slug: "healthcare-medtech",
    name: "Healthcare & MedTech",
    tagline: "Modern growth without the compliance risk.",
    description:
      "Healthcare organizations are often running outdated acquisition systems while consumer expectations for digital experience have moved ahead of them. The real challenge isn't just getting more patients — it's doing it without exposing PHI, violating HIPAA, or creating front-desk bottlenecks that defeat the purpose.",
    whyTheyBuy:
      "Higher patient intake with lower admin burden and full compliance confidence.",
    primaryOutcome: "More qualified patient acquisition, fewer manual intake bottlenecks, compliance-safe tracking.",
    painPoints: [
      {
        title: "HIPAA-risky tracking setups",
        body: "Standard Facebook and Google pixels accidentally scrape patient data from contact and booking forms — creating compliance exposure with every campaign. Most healthcare teams don't know it's happening until someone audits the pixel.",
      },
      {
        title: "Phone-tag and manual intake",
        body: "Front-desk workflows absorb hours that should be spent on care coordination. Leads who booked online still require three calls before they show up. Recall and reactivation happen only when someone manually exports a list.",
      },
      {
        title: "Disconnected patient data",
        body: "Scheduling systems, EHRs, and marketing platforms don't talk. Past-patient records can't be used for compliant reactivation campaigns. Attribution is guesswork.",
      },
    ],
    solutionAngles: [
      "Server-side tracking (CAPI) that strips PHI before any conversion data touches a third-party platform",
      "AI intake assistants and automated recall flows that reduce phone-tag without adding headcount",
      "HIPAA-aware analytics architecture with clean attribution to paid and organic sources",
      "Secure patient portals and intake flows built for mobile-first, low-friction onboarding",
    ],
    relatedProblems: ["disconnected-systems", "not-visible-enough", "pipeline-not-predictable"],
    relatedServices: ["attribution-analytics", "ai-automation", "custom-infrastructure", "martech-stack-build"],
    proofReferences: ["pike-medical"],
  },
  {
    slug: "b2b-saas-tech",
    name: "B2B SaaS & Tech",
    tagline: "Profitable growth when paid acquisition stops being enough.",
    description:
      "High-growth tech companies feel the CAC ceiling earlier than anyone. Paid channels become expensive, data silos prevent retention signals from reaching marketing, and the demo-to-close gap widens as the product gets more complex. The fix is rarely more ad spend — it's engineering better leverage into the acquisition, activation, and retention systems.",
    whyTheyBuy:
      "Faster pipeline, better attribution, lower churn, and self-serve demand that doesn't depend entirely on paid channels.",
    primaryOutcome: "Pipeline velocity, CAC efficiency, product-qualified lead generation, and net revenue retention.",
    painPoints: [
      {
        title: "Franken-stack data blindness",
        body: "HubSpot, Salesforce, Mixpanel, Stripe, and support data all exist — none of them line up. Attribution is first-touch or last-touch because the middleware to connect them was never built. Decisions get made on incomplete data.",
      },
      {
        title: "High CAC from over-reliance on paid",
        body: "Technical buyers don't respond to generic ads. Engineering-as-marketing assets — calculators, scanners, graders, interactive demos — generate higher-intent leads at a fraction of the cost of paid acquisition, but require engineering capacity most marketing teams don't have.",
      },
      {
        title: "Churn from weak activation",
        body: "Users sign up and don't reach value fast enough. Onboarding is manual or generic. No system tracks which users are at churn risk early enough to intervene before the renewal decision.",
      },
    ],
    solutionAngles: [
      "Interactive lead-generation tools, calculators, and scanners that generate technical leads organically",
      "Attribution and revenue dashboards that connect ad spend to closed revenue across the full stack",
      "Churn prediction and lifecycle automations that trigger based on product behavior signals",
      "Programmatic SEO and content systems that create scalable demand without proportional content cost",
    ],
    relatedProblems: [
      "disconnected-systems",
      "pipeline-not-predictable",
      "not-visible-enough",
      "no-strategy-owner",
    ],
    relatedServices: [
      "attribution-analytics",
      "ai-automation",
      "custom-infrastructure",
      "content-seo-systems",
    ],
    proofReferences: ["graston-qualified-leads", "graston-growth-engine"],
  },
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    tagline: "Dignified, differentiated, and measurably effective.",
    description:
      "Law firms and professional service organizations operate in high-trust, high-stakes environments where marketing credibility is the whole game. The challenge is building a digital presence that earns the trust of sophisticated buyers — without looking like every other firm — while connecting marketing activity to client acquisition in a way that management actually believes.",
    whyTheyBuy:
      "More referral-quality digital leads, stronger practice area differentiation, and attribution that makes the marketing budget defensible.",
    primaryOutcome: "Better-qualified client acquisition, stronger brand differentiation, and reporting that connects marketing to origination.",
    painPoints: [
      {
        title: "Generic positioning across practice areas",
        body: "The firm's expertise is deep and differentiated — but the website treats all practices the same. Sophisticated buyers can't quickly determine fit. The brand looks assembled over time rather than designed with intent.",
      },
      {
        title: "Attribution is word-of-mouth and intuition",
        body: "Clients say they 'found us online' or 'got a referral' — but the pipeline stages, lead sources, and decision timelines aren't tracked well enough to guide marketing investment. Budgets get defended by reputation rather than data.",
      },
      {
        title: "Compliance friction in outreach",
        body: "Bar association rules and legal advertising restrictions limit certain tactics. Without a partner who understands the constraints, campaigns either over-comply to the point of being invisible or inadvertently create risk.",
      },
    ],
    solutionAngles: [
      "Positioning and content systems that differentiate by practice area for the right buyer profile",
      "CRM architecture that connects referral sources, digital touchpoints, and matter origination",
      "Attribution reporting that makes the relationship between marketing spend and new client work visible",
      "Compliance-aware campaign design for jurisdictions with legal advertising restrictions",
    ],
    relatedProblems: [
      "brand-system-broken",
      "pipeline-not-predictable",
      "no-strategy-owner",
      "not-visible-enough",
    ],
    relatedServices: [
      "fractional-cmo",
      "attribution-analytics",
      "crm-architecture",
      "content-seo-systems",
    ],
    proofReferences: [],
  },
];
