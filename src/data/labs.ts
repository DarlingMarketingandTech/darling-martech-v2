import type { Tool } from "@/types";
import { caseStudies } from "@/data/work/work-index";
import { services } from "@/data/services";
import { problemPages } from "@/data/problems";

export const tools: Tool[] = [
  {
    slug: "growth-bottleneck-quiz",
    title: "Growth Bottleneck Quiz",
    tagline: "Find the problem most likely holding growth back right now.",
    description:
      "A fast diagnostic built to identify the most likely strategic, conversion, systems, visibility, brand, or attribution bottleneck.",
    estimatedTime: "3 minutes",
    questions: [
      {
        id: "clarity",
        question: "How clear is the current growth bottleneck to you today?",
        type: "scale",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Not clear", max: "Very clear" },
        required: true,
      },
      {
        id: "leak",
        question: "Where does growth feel most fragile right now?",
        type: "single",
        options: [
          { value: "strategy", label: "Strategy and prioritization" },
          { value: "website", label: "Website and conversion" },
          { value: "systems", label: "Systems and automation" },
          { value: "visibility", label: "Visibility and demand" },
          { value: "attribution", label: "Attribution and reporting" },
          { value: "brand", label: "Brand and messaging consistency" },
        ],
        required: true,
      },
      {
        id: "brandConsistency",
        question: "Outside of campaigns, does the brand feel consistent where prospects actually meet you?",
        type: "single",
        options: [
          { value: "strong", label: "Yes — site, inbox, and sales touchpoints feel like one story" },
          { value: "mixed", label: "Mixed — close enough, but drift shows up under scrutiny" },
          { value: "weak", label: "No — messaging, visuals, or proof points contradict each other" },
        ],
        required: true,
      },
      {
        id: "leadershipOwnership",
        question: "Who owns marketing outcomes across the stack (priorities, spend, and reporting) today?",
        type: "single",
        options: [
          { value: "none", label: "No single owner — it shifts by initiative" },
          { value: "split", label: "Split — leadership agrees in the room, execution diverges" },
          { value: "owner", label: "One senior owner with authority across the stack" },
        ],
        required: true,
      },
      {
        id: "siteTrustFirstSeconds",
        question: "In the first moments on your site, how quickly does a cold visitor understand what you do and for whom?",
        type: "single",
        options: [
          { value: "low", label: "Slow or unclear — they have to dig" },
          { value: "ok", label: "Understandable with effort" },
          { value: "high", label: "Fast — headline, proof, and next step are obvious" },
        ],
        required: true,
      },
      {
        id: "manualFollowUp",
        question: "How much does pipeline still depend on manual follow-up and tribal knowledge?",
        type: "single",
        options: [
          { value: "mostly", label: "Mostly manual — reminders live in inboxes and tasks" },
          { value: "mixed", label: "Mixed — some automation, lots of exceptions" },
          { value: "systematized", label: "Mostly systematized — SLAs and automation carry the load" },
        ],
        required: true,
      },
      {
        id: "localSearchPresence",
        question: "How would you describe organic / local search visibility for your core offer right now?",
        type: "single",
        options: [
          { value: "weak", label: "Weak — hard to find or inconsistent by market" },
          { value: "mixed", label: "Mixed — pockets of strength" },
          { value: "strong", label: "Strong — we show up credibly where it matters" },
        ],
        required: true,
      },
      {
        id: "channelContributionConfidence",
        question: "If leadership asked which channels drove the last ten qualified opportunities, how confident is the answer?",
        type: "single",
        options: [
          { value: "low", label: "Low — mostly anecdotes or channel dashboards that disagree" },
          { value: "mixed", label: "Directional — we have a working theory" },
          { value: "high", label: "High — reconciled to pipeline on a cadence we trust" },
        ],
        required: true,
      },
    ],
    results: [
      {
        id: "strategy-gap",
        label: "Strategic ownership gap",
        headline: "The bottleneck looks structural, not tactical.",
        description:
          "The marketing system likely lacks clear ownership, prioritization, and accountability across the whole stack.",
        problemCluster: "no-strategy-owner",
        recommendedProofSlug: "graston-qualified-leads",
        recommendedService: "fractional-cmo",
        ctaLabel: "See the strategy problem",
        ctaHref: "/problems/no-strategy-owner",
      },
      {
        id: "conversion-gap",
        label: "Conversion gap",
        headline: "Traffic may not be the issue. Trust and conversion probably are.",
        description:
          "The current site likely does not explain the offer clearly enough or move the right visitor to the next step quickly enough.",
        problemCluster: "site-not-converting",
        recommendedProofSlug: "pike-medical",
        recommendedService: "content-seo-systems",
        ctaLabel: "See the website problem",
        ctaHref: "/problems/site-not-converting",
      },
      {
        id: "systems-gap",
        label: "Systems gap",
        headline: "The operating system looks disconnected.",
        description:
          "Lead capture, follow-up, and reporting likely rely too heavily on manual effort and fragmented tools.",
        problemCluster: "disconnected-systems",
        recommendedProofSlug: "graston-growth-engine",
        recommendedService: "martech-stack-build",
        ctaLabel: "See the systems problem",
        ctaHref: "/problems/disconnected-systems",
      },
      {
        id: "visibility-gap",
        label: "Visibility gap",
        headline: "The business may be stronger than its discoverability.",
        description:
          "Search visibility, trust signals, or local presence may be suppressing inbound demand before the sales process even starts.",
        problemCluster: "not-visible-enough",
        recommendedProofSlug: "russell-painting",
        recommendedService: "content-seo-systems",
        ctaLabel: "See the visibility problem",
        ctaHref: "/problems/not-visible-enough",
      },
      {
        id: "attribution-gap",
        label: "Attribution gap",
        headline: "Revenue is likely happening faster than reporting maturity.",
        description:
          "The current reporting stack probably cannot explain channel contribution with enough clarity to guide confident decisions.",
        problemCluster: "pipeline-not-predictable",
        recommendedProofSlug: "graston-technique",
        recommendedService: "attribution-analytics",
        ctaLabel: "See the attribution problem",
        ctaHref: "/problems/pipeline-not-predictable",
      },
      {
        id: "brand-cohesion-gap",
        label: "Brand cohesion gap",
        headline: "The story people hear probably does not match the story the product earns.",
        description:
          "When positioning, creative, and proof drift across channels, conversion works harder than it should—even if individual tactics look fine.",
        problemCluster: "brand-system-broken",
        recommendedProofSlug: "317-bbq",
        recommendedService: "content-seo-systems",
        ctaLabel: "See the brand problem",
        ctaHref: "/problems/brand-system-broken",
      },
    ],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/growth-bottleneck-quiz",
  },
  {
    slug: "cmo-simulator",
    title: "CMO Simulator",
    tagline: "A standalone strategy simulation — not a diagnostic tool.",
    description:
      "A separate simulation experience. Explore tradeoffs, priorities, and operator thinking in a more open-ended format.",
    estimatedTime: "8 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/cmo-simulator",
  },
  {
    slug: "martech-stack-grader",
    title: "MarTech Stack Grader",
    tagline: "See whether your stack behaves like a system or a pile of tools.",
    description: "Evaluate operational maturity across CRM, automation, attribution, and reporting.",
    estimatedTime: "5 minutes",
    questions: [
      {
        id: "crmMaturity",
        question: "How reliable is CRM data for sales and marketing day to day?",
        type: "single",
        required: true,
        options: [
          { value: "0", label: "Unreliable — shadow spreadsheets still run the business" },
          { value: "1", label: "Usable — gaps after handoffs and campaign spikes" },
          { value: "2", label: "Strong for core lifecycle stages with light cleanup" },
          { value: "3", label: "Trusted system of record with clear ownership" },
        ],
      },
      {
        id: "automationMaturity",
        question: "How mature is lifecycle automation once a lead enters the database?",
        type: "single",
        required: true,
        options: [
          { value: "0", label: "Mostly manual — sequences live in inboxes and tasks" },
          { value: "1", label: "Basic drips — limited branching and no revenue logic" },
          { value: "2", label: "Solid nurture — scoring or lifecycle stages mostly respected" },
          { value: "3", label: "Revenue-aware — automation tied to pipeline stages and SLAs" },
        ],
      },
      {
        id: "attributionMaturity",
        question: "How confidently can you explain which channels create qualified pipeline?",
        type: "single",
        required: true,
        options: [
          { value: "0", label: "Not confident — leadership gets different answers each week" },
          { value: "1", label: "Directionally — last-touch dashboards only" },
          { value: "2", label: "Mostly — agreed definitions with quarterly reconciliation" },
          { value: "3", label: "Very — pipeline and spend reconciled on a cadence we keep" },
        ],
      },
      {
        id: "integrationMaturity",
        question: "How integrated are core systems (ads, web, CRM, billing) without brittle one-offs?",
        type: "single",
        required: true,
        options: [
          { value: "0", label: "Fragmented — Zap glue and manual CSVs between teams" },
          { value: "1", label: "Connected hero flows — edge cases break often" },
          { value: "2", label: "Most critical paths instrumented with owners" },
          { value: "3", label: "Documented integrations with monitoring and rollback" },
        ],
      },
    ],
    results: [
      {
        id: "martech-fragile",
        label: "Fragile operating layer",
        headline: "The stack is probably costing speed more than it is producing.",
        description:
          "When CRM, automation, attribution, and integrations all score low, execution defaults to heroics. The next win is stabilizing foundations before adding net-new channels.",
        problemCluster: "disconnected-systems",
        recommendedProofSlug: "graston-growth-engine",
        recommendedService: "martech-stack-build",
        ctaLabel: "See the systems problem",
        ctaHref: "/problems/disconnected-systems",
      },
      {
        id: "martech-emerging",
        label: "Emerging stack",
        headline: "Pieces work — the risk is drift as volume grows.",
        description:
          "You likely have pockets of maturity with uneven handoffs. Tightening definitions, ownership, and instrumentation now prevents a costly rewrite later.",
        problemCluster: "disconnected-systems",
        recommendedProofSlug: "clinical-compass",
        recommendedService: "martech-stack-build",
        ctaLabel: "See how I integrate stacks",
        ctaHref: "/problems/disconnected-systems",
      },
      {
        id: "martech-integrated",
        label: "Integrated operator stack",
        headline: "Systems look coherent — the next bottleneck is probably measurement or scale.",
        description:
          "When foundations score high, the next gains come from attribution clarity, experimentation velocity, and how revenue teams use the data — not from buying more tools.",
        problemCluster: "pipeline-not-predictable",
        recommendedProofSlug: "graston-technique",
        recommendedService: "attribution-analytics",
        ctaLabel: "See the attribution problem",
        ctaHref: "/problems/pipeline-not-predictable",
      },
    ],
    emailGated: true,
    emailGatePosition: "after_results",
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/martech-stack-grader",
  },
  {
    slug: "geo-readiness-auditor",
    title: "GEO Readiness Auditor",
    tagline: "See whether search engines and AI systems can actually understand your business.",
    description:
      "Paste a public page URL. The audit scores crawl signals, schema, metadata, heading structure, conversational headings, and outbound citations — then shows raw HTML signals so you can see what models compress.",
    estimatedTime: "~1 minute",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/geo-readiness-auditor",
  },
  {
    slug: "attribution-snapshot",
    title: "Attribution Snapshot",
    tagline: "See where your current reporting and source visibility break down.",
    description:
      "Interactive CSV tool: first-touch, last-touch, linear, and time-decay side by side, plus journey density and days-to-close signals—so you can see where reporting is too thin to trust.",
    estimatedTime: "2 minutes",
    questions: [],
    results: [
      {
        id: "attr-definition-chaos",
        label: "Definition chaos",
        headline: "The reporting stack cannot be honest until definitions have an owner.",
        description:
          "When UTMs are orphan fields and every channel tells a different story, analytics becomes debate club. Fix ownership, naming, and reconciliation before buying another attribution product.",
        problemCluster: "pipeline-not-predictable",
        recommendedProofSlug: "graston-technique",
        recommendedService: "attribution-analytics",
        ctaLabel: "See the attribution problem",
        ctaHref: "/problems/pipeline-not-predictable",
      },
      {
        id: "attr-last-click-trap",
        label: "Last-click trap",
        headline: "Decisions are probably optimizing for what is easy to measure, not what is true.",
        description:
          "Last-click and messy CRM fields bias spend toward bottom-funnel channels and away from compounding work. Tighten capture hygiene and add a second view leadership agrees to trust.",
        problemCluster: "pipeline-not-predictable",
        recommendedProofSlug: "russell-painting",
        recommendedService: "attribution-analytics",
        ctaLabel: "See the attribution problem",
        ctaHref: "/problems/pipeline-not-predictable",
      },
      {
        id: "attr-model-ready",
        label: "Model-ready",
        headline: "The organization looks ready for adult attribution conversations.",
        description:
          "When definitions have owners and conflict is rare, the next win is instrumentation depth: modeled views, incrementality tests where it matters, and tying spend decisions to pipeline cadence.",
        problemCluster: "pipeline-not-predictable",
        recommendedProofSlug: "graston-qualified-leads",
        recommendedService: "attribution-analytics",
        ctaLabel: "See the attribution problem",
        ctaHref: "/problems/pipeline-not-predictable",
      },
    ],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/attribution-snapshot",
  },
  {
    slug: "cmo-roadmap-generator",
    title: "CMO Roadmap Generator",
    tagline: "Turn your current condition into a clearer next-step plan.",
    description: "A planning tool for turning diagnosis into a staged operating plan.",
    estimatedTime: "7 minutes",
    questions: [
      {
        id: "runway",
        question: "How tight is runway for marketing spend and headcount in the next two quarters?",
        type: "single",
        required: true,
        options: [
          { value: "tight", label: "Tight — cuts or freezes are plausible" },
          { value: "ok", label: "OK — stable budget with scrutiny" },
          { value: "comfortable", label: "Comfortable — room to invest" },
        ],
      },
      {
        id: "dominantBlocker",
        question: "What is the dominant blocker to predictable pipeline right now?",
        type: "single",
        required: true,
        options: [
          { value: "pipeline", label: "Pipeline volume or quality" },
          { value: "product_delivery", label: "Product or delivery constraints" },
          { value: "brand_trust", label: "Brand trust or proof" },
          { value: "team_bandwidth", label: "Team bandwidth and focus" },
        ],
      },
      {
        id: "instrumentationLevel",
        question: "How instrumented is the funnel from first touch to closed-won?",
        type: "single",
        required: true,
        options: [
          { value: "none", label: "Minimal — major blind spots" },
          { value: "basic", label: "Basic — forms and CRM, weak channel truth" },
          { value: "solid", label: "Solid — lifecycle stages and channel truth mostly align" },
        ],
      },
      {
        id: "northStarClarity",
        question: "How crisp is the north-star metric marketing is accountable to?",
        type: "single",
        required: true,
        options: [
          { value: "absent", label: "Absent — we track activity, not outcomes" },
          { value: "fuzzy", label: "Fuzzy — debated definitions" },
          { value: "clear", label: "Clear — written and used in reviews" },
        ],
      },
    ],
    results: [
      {
        id: "roadmap-stabilize",
        label: "Stabilize first",
        headline: "The next 90 days should protect runway and kill noise.",
        description:
          "When cash or focus is tight, the roadmap should shrink to a handful of measurable outcomes, freeze low-ROI experiments, and rebuild trust with leadership through predictable reporting.",
        problemCluster: "no-strategy-owner",
        recommendedProofSlug: "graston-qualified-leads",
        recommendedService: "fractional-cmo",
        ctaLabel: "See the strategy problem",
        ctaHref: "/problems/no-strategy-owner",
      },
      {
        id: "roadmap-systems-wave",
        label: "Systems wave",
        headline: "Pipeline pressure with weak instrumentation is a systems problem wearing a marketing mask.",
        description:
          "Before you scale spend, capture, routing, and definitions need to hold. Stage a systems wave: instrument the funnel, enforce CRM hygiene, then reopen channel experiments with honest measurement.",
        problemCluster: "disconnected-systems",
        recommendedProofSlug: "graston-growth-engine",
        recommendedService: "martech-stack-build",
        ctaLabel: "See the systems problem",
        ctaHref: "/problems/disconnected-systems",
      },
      {
        id: "roadmap-velocity-sprint",
        label: "Velocity sprint",
        headline: "You look ready to translate clarity into shipped work.",
        description:
          "When runway is workable and instrumentation is not blocking, the roadmap should emphasize shipping weekly improvements tied to conversion and pipeline, not another strategy deck.",
        problemCluster: "site-not-converting",
        recommendedProofSlug: "pike-medical",
        recommendedService: "content-seo-systems",
        ctaLabel: "See the website problem",
        ctaHref: "/problems/site-not-converting",
      },
    ],
    emailGated: true,
    emailGatePosition: "after_results",
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/cmo-roadmap-generator",
  },
  {
    slug: "funnel-roi-forecaster",
    title: "Funnel ROI Forecaster",
    tagline: "See how much revenue is trapped in your funnel when one stage underperforms.",
    description:
      "Shows how a weak middle step can quietly cap revenue, even when traffic looks healthy.",
    estimatedTime: "2 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/funnel-roi-forecaster",
  },
  {
    slug: "demand-capture-cac-simulator",
    title: "Demand Capture & CAC Simulator",
    tagline: "Model how paid demand turns into leads, customers, CAC, and actual value.",
    description:
      "Shows whether your spend is producing healthy CAC and enough downstream value to justify the channel.",
    estimatedTime: "3 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/demand-capture-cac-simulator",
  },
  {
    slug: "automation-cost-savings-calculator",
    title: "Automation Cost Savings Calculator",
    tagline: "Calculate how much manual operating drag is costing each month and how quickly automation pays back.",
    description:
      "Turns recurring manual process time into a hard annual cost so you can see whether automation is worth doing now.",
    estimatedTime: "2 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/automation-cost-savings-calculator",
  },
  {
    slug: "martech-fragmentation-scorecard",
    title: "MarTech Fragmentation Scorecard",
    tagline: "Score how fragmented your current stack is and see which missing connections are creating problems.",
    description:
      "Scores disconnected systems, manual workarounds, and duplicate layers making your reporting and operations harder than they should be.",
    estimatedTime: "4 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/martech-fragmentation-scorecard",
  },
  {
    slug: "attribution-clarity-analyzer",
    title: "Attribution Clarity Analyzer",
    tagline: "See how much of your revenue is actually attributable and how much decision-making is being driven by weak tracking.",
    description:
      "Estimates how much pipeline and revenue is truly attributable versus hidden behind weak tracking confidence and unattributed activity.",
    estimatedTime: "3 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/attribution-clarity-analyzer",
  },
  {
    slug: "build-vs-buy-stack-calculator",
    title: "Build vs Buy Stack Calculator",
    tagline: "Compare the real annual cost of building the internal team versus working with an operator-led partner.",
    description:
      "Compares internal hiring cost, recruiting cost, overhead, and optional severance/equity drag against a partner model built around one accountable operator.",
    estimatedTime: "3 minutes",
    questions: [],
    results: [],
    emailGated: false,
    trustLadderStage: "browse",
    isLive: true,
    cloudinaryThumbnail: "curated/tools/build-vs-buy-stack-calculator",
  },
];

const PROBLEM_SLUGS = new Set(problemPages.map((p) => p.slug));
const PROOF_SLUGS = new Set(caseStudies.map((study) => study.slug));
const SERVICE_SLUGS = new Set(services.map((service) => service.slug));

for (const tool of tools) {
  for (const result of tool.results) {
    if (!PROBLEM_SLUGS.has(result.problemCluster)) {
      throw new Error(`Tool result ${tool.slug}/${result.id}: unknown problemCluster "${result.problemCluster}"`);
    }
    if (!PROOF_SLUGS.has(result.recommendedProofSlug)) {
      throw new Error(`Tool result ${tool.slug}/${result.id}: unknown recommendedProofSlug "${result.recommendedProofSlug}"`);
    }
    if (!SERVICE_SLUGS.has(result.recommendedService)) {
      throw new Error(`Tool result ${tool.slug}/${result.id}: unknown recommendedService "${result.recommendedService}"`);
    }
  }
}
