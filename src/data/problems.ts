import type { ProblemPage } from "@/types";
import { siteConfig } from "@/data/site-config";

export const problemPages: ProblemPage[] = [
  {
    slug: "no-strategy-owner",
    title: "No one is steering the whole system",
    hubCategory: "STRATEGY",
    proofChip: "+212% qualified leads after strategy overhaul — Graston Technique®",
    hubCtaLabel: "See what's missing →",
    pageEyebrow: "STRATEGY & LEADERSHIP",
    heroHeadline: "No one is steering the whole system — and growth is showing it.",
    heroSubhead:
      "Marketing activity exists, but strategic ownership does not. Priorities shift, reporting stays shallow, and nothing compounds.",
    introParagraphs: [
      "Most growing businesses reach a point where marketing activity exists but marketing strategy doesn't. There are campaigns running, a website, maybe a CRM — but no one with the authority, the visibility, and the accountability to decide what actually matters this quarter.",
      "The result is predictable: priorities shift with whoever spoke last. Reporting shows activity but not impact. The team works hard and the numbers don't move. Growth becomes dependent on luck and timing rather than a repeatable system.",
    ],
    symptoms: [
      "Priorities reshuffle every week — nobody owns the full funnel outcome.",
      "Reporting shows activity before it shows pipeline or revenue impact.",
      "Channel owners optimize local metrics while the business-level story drifts.",
      "Nobody can name the single outcome marketing must move this quarter.",
    ],
    whyItHappens:
      "It usually isn't a people problem. It's a structure problem. Marketing strategy requires someone who can hold the whole system — from positioning to pipeline — inside one head, and who has enough seniority to say \"we're not doing that because it won't produce what we need.\" Without that person, every initiative is equally valid and nothing compounds.",
    stakes:
      "Every quarter without a clear strategic owner is a quarter of compounding drift. Teams get busy on things that don't matter. Channels get funded that don't perform. Opportunities get missed because no one was watching for them. The cost isn't one bad campaign — it's 18 months of momentum you didn't build.",
    whatTheFixLooksLike:
      "Fractional CMO engagement. Strategic ownership of the full marketing function — positioning, priorities, measurement, team direction, and the system that holds it all together. Not a strategy deck. A person with accountability.",
    relatedProof: ["graston-qualified-leads", "graston-technique"],
    relevantTools: [
      { label: "CMO Simulator", href: "/tools/cmo-simulator" },
      { label: "Growth Bottleneck Quiz", href: "/tools/growth-bottleneck-quiz" },
    ],
    relatedService: "fractional-cmo",
    closingBlock: {
      headline: "If this is what you're dealing with, the next step is a direct conversation.",
      primary: { label: "Let's talk →", href: siteConfig.calComLink },
      secondary: { label: "Or try the CMO Simulator first →", href: "/tools/cmo-simulator" },
    },
  },
  {
    slug: "site-not-converting",
    title: "The site gets traffic but doesn't convert it",
    hubCategory: "WEBSITE & CONVERSION",
    proofChip: "+45% patient growth after site strategy overhaul — Pike Medical Consultants",
    hubCtaLabel: "See what's blocking you →",
    pageEyebrow: "WEBSITE & CONVERSION",
    heroHeadline: "Your site gets traffic. It just doesn't do anything with it.",
    heroSubhead:
      "A website that doesn't convert isn't a design problem. It's a trust problem — structure, clarity, and intentional conversion flow.",
    introParagraphs: [
      "A website that doesn't convert isn't a design problem. It's a trust problem. Visitors arrive, scan for the thing that tells them they're in the right place, and leave before they find it — because the structure of the page makes them work too hard to understand what you do, who you do it for, and why you're the right choice.",
      "The other pattern: the site converts the easy leads — people who were already going to reach out — and loses everyone else. That looks fine in the metrics until you realize the pipeline is just the same handful of warm referrals every quarter.",
    ],
    symptoms: [
      "Traffic looks healthy but form fills and booked calls do not match intent.",
      "Proof and differentiation sit too low or read like generic marketing filler.",
      "The homepage still reads like an org chart instead of a buyer path.",
      "High-intent visitors bounce before they understand why you're the right choice.",
    ],
    whyItHappens:
      "Sites get built incrementally. A page gets added here. A service gets listed there. No one rewrites the homepage when the positioning shifts. The result is a site that reflects what the business used to be or what the founder wanted to say — not what a first-time visitor needs to understand in the first 8 seconds.",
    stakes:
      "Every visitor who leaves without converting is a lead that cost you money (in traffic, time, or ad spend) and produced nothing. More importantly: the right buyers — the ones who would actually pay for senior-level work — are the most likely to leave when the site doesn't immediately signal competence and credibility.",
    whatTheFixLooksLike:
      "Website strategy and rebuild. Problem-first information architecture. Conversion flow design. Trust signals in the right places. Clear next steps for every intent level — from \"just browsing\" to \"ready to talk.\"",
    relatedProof: ["pike-medical", "clinical-compass"],
    relevantTools: [
      { label: "CMO Roadmap Generator", href: "/tools/cmo-roadmap-generator" },
      { label: "Growth Bottleneck Quiz", href: "/tools/growth-bottleneck-quiz" },
    ],
    relatedService: "content-seo-systems",
    closingBlock: {
      headline: "The right website strategy pays for itself in the first quarter.",
      primary: { label: "Let's look at yours →", href: siteConfig.calComLink },
      secondary: { label: "Generate a roadmap first →", href: "/tools/cmo-roadmap-generator" },
    },
  },
  {
    slug: "disconnected-systems",
    title: "Leads, follow-up, and reporting are disconnected",
    hubCategory: "CRM & AUTOMATION",
    proofChip: "95% less manual overhead — Graston Growth Engine automation",
    hubCtaLabel: "See what's leaking →",
    pageEyebrow: "CRM & AUTOMATION",
    heroHeadline: "Your leads, follow-up, and reporting don't talk to each other.",
    heroSubhead:
      "Leads leak quietly when the system is patched together instead of designed end-to-end.",
    introParagraphs: [
      "This is the most common thing I find when I start working with a new client. Not a bad product. Not bad marketing. A broken system: leads come in from multiple sources, get logged inconsistently, followed up on manually, and reported in a way that tells you nothing about what's actually working.",
      "The cost isn't just inefficiency. It's the leads that fell through during a busy week. The deal that went cold because no one followed up on day 8. The decision to cut the email channel because no one knew it was generating 40% of the pipeline.",
    ],
    symptoms: [
      "Lead sources write to different fields — attribution is reconstructed by hand.",
      "Follow-up depends on Slack threads and memory instead of CRM rules.",
      "Marketing-qualified and sales-owned stages mean different things by channel.",
      "Reporting in the room disagrees with reporting inside the tools.",
    ],
    whyItHappens:
      "Systems get set up in layers. A CRM gets installed when the team is small. An email tool gets added when someone reads an article about marketing automation. A form gets connected to a spreadsheet because it was faster in the moment. Nobody designs the system end-to-end — they patch it together over time. And patched-together systems break silently.",
    stakes:
      "Disconnected systems are quiet killers. The leads exist. The follow-up system almost works. The reporting almost makes sense. Everything is almost fine — until you try to scale, and the whole thing falls apart because the foundation was never built to hold the load.",
    whatTheFixLooksLike:
      "CRM architecture and automation buildout. Map the full lead-to-close journey. Build the system that executes it automatically. Connect reporting so every decision is based on real data, not instinct.",
    relatedProof: ["graston-growth-engine", "pike-medical"],
    relevantTools: [
      { label: "Attribution Snapshot", href: "/tools/attribution-snapshot" },
      { label: "Growth Bottleneck Quiz", href: "/tools/growth-bottleneck-quiz" },
    ],
    relatedService: "martech-stack-build",
    closingBlock: {
      headline: "If your system is held together with manual effort and hope, that's fixable.",
      primary: { label: "Let's map it →", href: siteConfig.calComLink },
      secondary: { label: "Run Attribution Snapshot →", href: "/tools/attribution-snapshot" },
    },
  },
  {
    slug: "not-visible-enough",
    title: "Qualified buyers exist but can't find you",
    hubCategory: "SEO & DEMAND",
    proofChip: "4.9★ local trust conversion after visibility rebuild — Russell Painting",
    hubCtaLabel: "See what's holding you back →",
    pageEyebrow: "SEO & DEMAND GENERATION",
    heroHeadline: "Your buyers exist. They just can't find you.",
    heroSubhead:
      "If search visibility is inconsistent, trust and demand stay lower than the quality of the business deserves.",
    introParagraphs: [
      "Local search, organic ranking, AI-powered search results — visibility is more complex and more fragile than it was five years ago. If your business relies on being findable, and you're not showing up consistently and credibly where buyers are looking, you're losing leads to competitors who haven't done anything better than you — they've just been more deliberate about their digital presence.",
      "Organic search is underperforming. Local visibility is inconsistent. Paid channels return cost, not pipeline. The business is better than its search presence suggests.",
    ],
    symptoms: [
      "Branded and high-intent queries surface competitors before you.",
      "Local or vertical presence is inconsistent by market or location.",
      "Structured data, entities, and trust signals lag the quality of the work.",
      "AI-style summaries flatten your category into a few familiar names.",
    ],
    whyItHappens:
      "SEO gets treated like a project instead of a system. Someone builds citations, optimizes a few pages, maybe runs some local ads — and then the visibility work stops because it \"seems to be working.\" Meanwhile, the landscape shifts. AI search changes what \"showing up\" means. Competitors keep building.",
    stakes:
      "Every dollar of traffic you don't capture is revenue that goes to someone else. More specifically: high-intent local buyers — the ones searching \"fractional CMO Indianapolis\" or \"best [service] near me\" — are the most profitable leads you can generate, and they're going to the business that showed up first, clearly, and credibly.",
    whatTheFixLooksLike:
      "Local SEO strategy and execution. GEO/AI search readiness. Citation cleanup. Conversion-optimized local pages. Structured data. Trust signals that Google and AI search engines reward.",
    relatedProof: ["russell-painting", "317-bbq"],
    relevantTools: [
      { label: "GEO Readiness Auditor", href: "/tools/geo-readiness-auditor" },
      { label: "Growth Bottleneck Quiz", href: "/tools/growth-bottleneck-quiz" },
    ],
    relatedService: "content-seo-systems",
    closingBlock: {
      headline: "Visibility isn't luck. It's a system that can be built.",
      primary: { label: "Let's see where you stand →", href: siteConfig.calComLink },
      secondary: { label: "Run the GEO audit →", href: "/tools/geo-readiness-auditor" },
    },
  },
  {
    slug: "brand-system-broken",
    title: "The brand doesn't match the quality of the business",
    hubCategory: "BRAND & POSITIONING",
    proofChip: "Full brand system rebuild for legal, medical, and service clients across 15+ years",
    hubCtaLabel: "See this problem →",
    pageEyebrow: "BRAND & POSITIONING",
    heroHeadline: "The business is better than the brand that represents it.",
    heroSubhead:
      "When positioning, messaging, and visual identity drift apart, the right buyers leave before they understand the value.",
    introParagraphs: [
      "You know the quality of what you deliver. Your clients know it. But a first-time visitor to your site — or someone who finds you on LinkedIn or in search — can't tell quickly enough whether you're the right choice. The positioning is vague. The messaging changes depending on who wrote it last. The visual system looks like it was assembled by four different people over six years. Because it was.",
      "The brand says something different from what the business actually does, and that gap costs you every time a qualified buyer leaves before they understand what you really offer.",
    ],
    symptoms: [
      "Messaging shifts depending on who wrote the last page or deck.",
      "Visual identity and proof points feel assembled across eras.",
      "Sales narrative and marketing narrative diverge under light questioning.",
      "Premium buyers bounce because the first impression undersells the delivery.",
    ],
    whyItHappens:
      "Brand work gets deferred. A logo gets designed when the company is founded. A website gets built when the first client needs a link to send. Copy gets written by whoever is available. Nobody steps back and asks: \"Does this accurately represent the quality of what we're selling, to the specific buyer we're trying to reach?\"",
    stakes:
      "Premium buyers make quick decisions. If the first impression doesn't match the caliber of the work, they move on before the relationship can form. A weak brand doesn't just lose clients — it attracts the wrong ones while repelling the right ones.",
    whatTheFixLooksLike:
      "Brand identity system: positioning, messaging, visual identity, tone of voice. Built from the actual quality of the work and the actual profile of the buyer — not from what looks nice or what a design trend suggested.",
    relatedProof: ["pike-medical", "317-bbq"],
    relevantTools: [
      { label: "CMO Simulator", href: "/tools/cmo-simulator" },
      { label: "Growth Bottleneck Quiz", href: "/tools/growth-bottleneck-quiz" },
    ],
    relatedService: "fractional-cmo",
    closingBlock: {
      headline: "The brand should work as hard as the business does.",
      primary: { label: "Let's rebuild it →", href: siteConfig.calComLink },
      secondary: { label: "Stress-test positioning first →", href: "/tools/cmo-simulator" },
    },
  },
  {
    slug: "pipeline-not-predictable",
    title: "Revenue is coming in but you can't explain why",
    hubCategory: "PIPELINE & REVENUE ATTRIBUTION",
    proofChip: "Multi-model attribution clarity delivered via Attribution Snapshot tool",
    hubCtaLabel: "See this problem →",
    pageEyebrow: "REVENUE ATTRIBUTION & PIPELINE",
    heroHeadline: "Revenue is coming in. You just can't explain where it's coming from.",
    heroSubhead:
      "Attribution blind spots make confident channel decisions almost impossible once growth gets more complex.",
    introParagraphs: [
      "Deals close, clients sign, the business grows — but ask which marketing channel drove the last 10 clients and the answer is \"referrals, I think\" or \"they found us somehow.\" Attribution is gut feel. Forecasting is hope. The marketing budget gets defended in board meetings by anecdote instead of data.",
      "This is one of the most common problems at $5M–$20M revenue — and one of the most dangerous. Because if you can't trace revenue to its source, you can't scale what's working, cut what isn't, or make decisions with any confidence.",
    ],
    symptoms: [
      "Channel dashboards disagree with pipeline reality in leadership reviews.",
      "UTMs and source fields are incomplete or enforced inconsistently.",
      "Forecasting leans on gut — journeys are not reconciled to revenue.",
      "Budget cuts hit working channels because ROI cannot be defended with data.",
    ],
    whyItHappens:
      "Attribution doesn't get built — it gets assumed. Every tool claims credit for the lead. The CRM tracks contacts but not journeys. UTM parameters are inconsistent. The form doesn't pass source data to the CRM. Nobody audits it until a major budget decision needs justification.",
    stakes:
      "You're almost certainly under-investing in the channel that's actually working and over-investing in the one that looks best in the dashboard. The cost is a misallocated budget, missed growth opportunities, and marketing that can't prove its own ROI — which means it's always vulnerable to being cut.",
    whatTheFixLooksLike:
      "Attribution system design. CRM data hygiene. Source tracking implementation. Multi-model attribution reporting. One clear view of where revenue actually comes from — built to hold up to scrutiny.",
    relatedProof: ["graston-growth-engine", "graston-technique"],
    relevantTools: [
      { label: "Attribution Snapshot", href: "/tools/attribution-snapshot" },
      { label: "Growth Bottleneck Quiz", href: "/tools/growth-bottleneck-quiz" },
    ],
    relatedService: "attribution-analytics",
    closingBlock: {
      headline: "You can't optimize what you can't measure. This one is fixable.",
      primary: { label: "Let's build the attribution layer →", href: siteConfig.calComLink },
      secondary: { label: "Upload your data first →", href: "/tools/attribution-snapshot" },
    },
  },
];
