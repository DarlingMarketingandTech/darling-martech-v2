import type { ProjectPathId, Service, ServiceCluster } from "@/types";
import { SERVICE_VISUAL_BY_SLUG } from "@/data/service-visuals";

const servicesUnmerged: Omit<Service, "visualPublicId" | "visualAlt">[] = [
  // ─── Pillar 1: Revenue Engineering ───────────────────────────────────────
  {
    slug: "fractional-cmo",
    title: "Fractional CMO",
    headline: "Strategic ownership of the full marketing system.",
    description:
      "For companies that need a senior marketing lead without hiring full-time. Strategy, prioritization, reporting, and direct accountability stay in one place — from positioning to pipeline, run by the same person who designs it.",
    outcomes: [
      "Clear priorities tied to revenue, not activity",
      "Senior decision support on channel, budget, and team",
      "One accountable operator across the full stack",
    ],
    proofReferences: ["graston-qualified-leads", "graston-growth-engine"],
    problemClusters: ["no-strategy-owner", "brand-system-broken"],
    engagementFormats: ["fractional", "diagnostic"],
    isFeatured: true,
    pillar: "revenue-engineering",
  },
  {
    slug: "attribution-analytics",
    title: "Attribution & Analytics",
    headline: "One clear view of where revenue is actually coming from.",
    description:
      "Tracking, source hygiene, and closed-loop reporting that connects marketing spend to pipeline and closed revenue. Custom dashboards, UTM discipline, and multi-touch models built to hold up in a leadership review — not just inside the tool.",
    outcomes: [
      "Defensible channel investment decisions",
      "Fewer attribution blind spots",
      "Reporting that maps spend directly to closed revenue",
    ],
    proofReferences: ["russell-painting", "graston-growth-engine"],
    problemClusters: ["pipeline-not-predictable", "not-visible-enough"],
    engagementFormats: ["project", "diagnostic", "fractional"],
    isFeatured: true,
    pillar: "revenue-engineering",
  },
  {
    slug: "content-seo-systems",
    title: "Content & SEO Systems",
    headline: "Visibility built as a repeatable system, not a one-off campaign.",
    description:
      "Local SEO, organic visibility, trust signals, and structured content designed to produce better discovery and stronger conversion. Programmatic architecture for high-volume pages. GEO/AI search readiness for teams where AI-generated summaries are reshaping how buyers find vendors.",
    outcomes: [
      "Improved search presence across branded, local, and high-intent queries",
      "Better-qualified traffic from buyers already looking",
      "Clearer trust signals in the places Google and AI search reward",
    ],
    proofReferences: ["primarycare-indy", "urgentcare-indy"],
    problemClusters: ["not-visible-enough", "site-not-converting"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
    pillar: "revenue-engineering",
  },

  // ─── Pillar 2: Intelligent Automation ────────────────────────────────────
  {
    slug: "ai-automation",
    title: "AI & Workflow Automation",
    headline: "AI-enabled workflows that remove manual work and accelerate response time.",
    description:
      "Agentic workflows, LLM-enhanced operations, and automation that handles the repetitive, high-volume, or time-sensitive tasks that currently depend on people. AI lead qualification and routing, document processing, internal ops orchestration, compliance-aware automation — built to fit into real-world messy stacks.",
    outcomes: [
      "Manual overhead eliminated at the process level",
      "AI-driven qualification and routing that operates 24/7",
      "Audit-ready automation with documented logic and governance",
    ],
    proofReferences: ["graston-growth-engine"],
    problemClusters: ["disconnected-systems", "pipeline-not-predictable"],
    engagementFormats: ["project", "fractional"],
    isFeatured: true,
    pillar: "intelligent-automation",
  },
  {
    slug: "automation-systems",
    title: "Rules-Based Automation Systems",
    headline: "Manual processes replaced with durable, predictable workflows.",
    description:
      "CRM automation, form routing, email sequences, lead follow-up logic, and reporting triggers — the rules-based layer underneath everything. Built to run without babysitting, documented so the next person can understand it, and designed to scale without becoming fragile.",
    outcomes: [
      "Lower operational overhead",
      "More consistent follow-up with no dropped leads",
      "Automation that runs after launch without requiring daily fixes",
    ],
    proofReferences: ["graston-growth-engine", "barbershop-command-center"],
    problemClusters: ["disconnected-systems"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
    pillar: "intelligent-automation",
  },
  {
    slug: "martech-stack-build",
    title: "MarTech Stack Build",
    headline: "Connected systems that stop leads from leaking.",
    description:
      "CRM architecture, automation, integration, and implementation for businesses that have outgrown manual operations and disconnected tools. Designed end-to-end — not patched together — so every lead source, follow-up trigger, and reporting signal connects cleanly.",
    outcomes: [
      "Fewer manual handoffs and dropped leads",
      "Connected reporting across all marketing channels",
      "Systems that keep running after launch without daily intervention",
    ],
    proofReferences: ["graston-growth-engine", "barbershop-command-center"],
    problemClusters: ["disconnected-systems", "pipeline-not-predictable"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: false,
    pillar: "intelligent-automation",
  },
  {
    slug: "crm-architecture",
    title: "CRM Architecture",
    headline: "Lead flow, follow-up, and visibility designed end-to-end.",
    description:
      "For organizations that need cleaner intake, clearer pipeline stages, and reporting they can trust. CRM setup or rebuild that maps the full lead-to-close journey, connects source tracking, and creates the operational foundation for predictable follow-up and accurate forecasting.",
    outcomes: [
      "Better lead-to-close tracking with fewer gaps",
      "Segmented follow-up that runs automatically",
      "Real-time pipeline visibility for sales and leadership",
    ],
    proofReferences: ["barbershop-command-center", "graston-technique"],
    problemClusters: ["disconnected-systems", "pipeline-not-predictable"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: false,
    pillar: "intelligent-automation",
  },

  // ─── Pillar 3: Custom Infrastructure ─────────────────────────────────────
  {
    slug: "custom-infrastructure",
    title: "Custom Infrastructure & Integrations",
    headline: "The technical layer that connects your channels, data, and customer experience.",
    description:
      "Middleware, API connectors, headless web surfaces, secure portals, custom dashboards, and the internal tools that make your stack actually work together. Built for companies whose requirements exceed what off-the-shelf platforms can handle — and where a broken integration costs more than a custom one.",
    outcomes: [
      "Fragmented systems connected into one clean data flow",
      "Custom product surfaces that drive higher-intent demand",
      "Integrations that hold up under load and are documented for the future",
    ],
    proofReferences: ["graston-growth-engine", "graston-qualified-leads"],
    problemClusters: ["disconnected-systems", "site-not-converting"],
    engagementFormats: ["project"],
    isFeatured: true,
    pillar: "custom-infrastructure",
  },

  // ─── Revenue Engineering additions ───────────────────────────────────────
  {
    slug: "digital-marketing-strategy",
    title: "Marketing System Strategy",
    headline: "Structure the demand, conversion, and measurement system — before anyone runs a campaign.",
    description:
      "A project-scoped engagement that maps and structures the full marketing system: where demand comes from, how it converts, and how results are measured. Not a fractional CMO engagement — this is the architecture work that makes execution coherent. The output is a prioritized system blueprint, not a slide deck with recommendations.",
    outcomes: [
      "Demand, conversion, and measurement structured as a single connected system",
      "Clear separation of what to build, what to fix, and what to cut",
      "Execution-ready blueprint without ongoing leadership overhead",
    ],
    proofReferences: ["graston-qualified-leads", "graston-technique"],
    problemClusters: ["no-strategy-owner", "brand-system-broken"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: false,
    pillar: "revenue-engineering",
  },
  {
    slug: "paid-media-management",
    title: "Demand Capture & Paid Media Systems",
    headline: "Paid channels built as a signal-capture and demand-validation engine.",
    description:
      "Google Ads, paid social, and retargeting structured as a feedback loop — not a budget line item. Every campaign is instrumented to capture demand signals, validate messaging, and feed data back into targeting and pipeline decisions. The output is a paid system that reduces CAC over time and connects spend directly to closed revenue.",
    outcomes: [
      "CAC tracked and reduced through feedback-loop optimization",
      "Paid spend connected to pipeline, not just clicks or impressions",
      "Demand signals captured and used to sharpen targeting and positioning",
    ],
    proofReferences: ["urgentcare-indy", "russell-painting"],
    problemClusters: ["not-visible-enough", "pipeline-not-predictable"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
    pillar: "revenue-engineering",
  },
  {
    slug: "conversion-optimization",
    title: "Conversion System Optimization",
    headline: "The full funnel rebuilt around how buyers actually decide.",
    description:
      "Conversion work that operates at the system level — not isolated A/B tests or button color changes. Every friction point in the buyer journey gets mapped: decision paths, trust barriers, form abandonment, and page-level confusion. The system gets restructured to remove friction at the highest-revenue leverage points first, with measurable impact on close rates and pipeline velocity.",
    outcomes: [
      "Decision paths restructured to remove the friction that costs the most revenue",
      "Conversion improvements tied to pipeline impact, not just rate percentages",
      "Website optimization absorbed into the system — not handled as a separate project",
    ],
    proofReferences: ["primarycare-indy", "urgentcare-indy"],
    problemClusters: ["site-not-converting", "pipeline-not-predictable"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: false,
    pillar: "revenue-engineering",
  },

  // ─── Entry offer ──────────────────────────────────────────────────────────
  {
    slug: "technical-roadmap",
    title: "Technical Roadmap",
    headline: "A paid diagnostic before a retainer — so you know exactly what you're buying.",
    description:
      "A structured paid engagement that maps your revenue system, identifies the highest-leverage friction points, and delivers a prioritized build plan — before any ongoing commitment. Three formats: Revenue Architecture Blueprint, Infrastructure & Security Deep-Dive, and AI & Automation Feasibility Study. The roadmap fee credits toward implementation if you proceed.",
    outcomes: [
      "Named, prioritized problems — not a generic audit checklist",
      "Architecture map of what exists, what's broken, and what to build first",
      "Roadmap you own and can take anywhere — or credit toward implementation with Darling MarTech",
    ],
    proofReferences: [],
    problemClusters: [
      "no-strategy-owner",
      "disconnected-systems",
      "pipeline-not-predictable",
    ],
    engagementFormats: ["diagnostic"],
    isFeatured: true,
    pillar: "revenue-engineering",
  },

  // ─── Pillar 4: Brand & Experience Systems ────────────────────────────────
  {
    slug: "brand-identity",
    title: "Brand Positioning & Identity System",
    headline: "Rebuild how the business is perceived — so the right buyers decide faster.",
    description:
      "Positioning, messaging, and visual identity rebuilt as a trust and perception system — not a logo project. When brand clarity is missing, buyers stall, sales cycles lengthen, and the wrong clients show up. This engagement structures how the business is understood: who it is for, why it is the right choice, and how every surface communicates that consistently. The result is a brand that accelerates decisions, not just one that looks better.",
    outcomes: [
      "Positioning structured around the specific buyer decision you need to win",
      "Messaging and identity that build trust before the first conversation",
      "Consistent brand signal across every channel, page, and touchpoint",
    ],
    proofReferences: ["black-letter", "317-bbq"],
    problemClusters: ["brand-system-broken", "no-strategy-owner"],
    engagementFormats: ["project", "diagnostic"],
    isFeatured: false,
    pillar: "brand-creative",
  },
  {
    slug: "website-design",
    title: "Conversion-Focused Website Systems",
    headline: "A website built as a revenue system — not a design exercise.",
    description:
      "Website strategy and build structured around how buyers move from awareness to decision. Information architecture, conversion flow, trust signal placement, and page-level copy are engineered together — not handed off to a designer who doesn't understand the funnel. The output is a site that actively converts qualified visitors, not one that just looks credible.",
    outcomes: [
      "Buyer journey structured to convert at every intent level",
      "Trust signals, proof, and CTAs placed where they move decisions",
      "Site performance and conversion tracked from day one",
    ],
    proofReferences: ["primarycare-indy", "urgentcare-indy"],
    problemClusters: ["site-not-converting", "brand-system-broken"],
    engagementFormats: ["project"],
    isFeatured: false,
    pillar: "brand-creative",
  },
  {
    slug: "content-creation",
    title: "Content Systems for Demand & Trust",
    headline: "A content engine that builds authority, visibility, and buyer readiness.",
    description:
      "Content structured as a demand and trust system — not a production schedule. Every piece is built to serve a specific stage of the buyer journey: creating visibility in search, establishing authority with skeptical buyers, or supporting conversion at the decision point. Connected to SEO signals, problem-awareness, and the broader funnel so content compounds instead of accumulates.",
    outcomes: [
      "Content mapped to the buyer journey stages where it creates the most leverage",
      "Authority established in the categories where high-value buyers are searching",
      "Content and SEO signals connected so visibility compounds over time",
    ],
    proofReferences: ["graston-qualified-leads", "317-bbq"],
    problemClusters: ["not-visible-enough", "brand-system-broken"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
    pillar: "brand-creative",
  },
  {
    slug: "social-media-marketing",
    title: "Audience Distribution & Engagement Systems",
    headline: "Reach and amplification infrastructure — not a posting schedule.",
    description:
      "Social built as a distribution and retargeting system: audience segmentation, content amplification, attention capture, and remarketing structured to move buyers from awareness into the funnel. Not managed posting or vanity engagement metrics. The system is instrumented to track which audiences convert, which content drives intent, and where the next dollar of social investment creates the most pipeline.",
    outcomes: [
      "Audiences segmented and reached based on intent signals, not just follows",
      "Retargeting infrastructure that moves warm audiences toward conversion",
      "Social spend connected to pipeline — not impressions or engagement rate",
    ],
    proofReferences: ["317-bbq", "barbershop-command-center"],
    problemClusters: ["not-visible-enough", "brand-system-broken"],
    engagementFormats: ["project", "fractional"],
    isFeatured: false,
    pillar: "brand-creative",
  },
];

export const services: Service[] = servicesUnmerged.map((s) => ({
  ...s,
  ...SERVICE_VISUAL_BY_SLUG[s.slug],
}));

export const SERVICE_PILLARS = [
  {
    id: "revenue-engineering" as const,
    label: "Revenue Engineering",
    description:
      "Design and optimize the systems that turn traffic into qualified pipeline and measurable revenue.",
  },
  {
    id: "intelligent-automation" as const,
    label: "Intelligent Automation",
    description:
      "Deploy AI-enabled and rules-based workflows that remove manual work and accelerate response time.",
  },
  {
    id: "custom-infrastructure" as const,
    label: "Custom Infrastructure",
    description:
      "Build the technical layer that connects your channels, data, and customer experience.",
  },
  {
    id: "brand-creative" as const,
    label: "Brand & Experience Systems",
    description:
      "Build the brand, content, and web systems that shape perception, establish trust, and turn attention into qualified demand.",
  },
] as const;

export type ServiceDisplayClusterId = "foundation" | "build" | "scale" | "grow";

export type ServiceDisplayCluster = {
  label: string;
  /** One line under the lane title — how this lane differs from the others */
  laneTagline: string;
  /** What system friction this lane is built to address */
  solvesFor: string;
  /** Buyer / operating context */
  whoFor: string;
  /** Lane-level outcomes (not individual service copy) */
  outcomes: readonly string[];
  /** Primary “where next” for this lane */
  nextStep: { href: string; label: string };
  optionalStep?: { href: string; label: string };
  serviceSlugs: ServiceCluster[];
};

export const SERVICE_DISPLAY_CLUSTER_ORDER: ServiceDisplayClusterId[] = [
  "foundation",
  "build",
  "scale",
  "grow",
];

export const SERVICE_DISPLAY_CLUSTERS: Record<ServiceDisplayClusterId, ServiceDisplayCluster> = {
  foundation: {
    label: "Foundation",
    laneTagline: "Install the first real operating system behind capture, follow-up, and visibility.",
    solvesFor:
      "Lead capture, CRM, intake, and follow-up are scattered, manual, or missing — so demand never compounds.",
    whoFor:
      "Missing-system buyers: brochure sites, under-used CRMs, owner-dependent follow-up, and tools without operating logic.",
    outcomes: [
      "A first working growth system instead of a patchwork of tabs",
      "Fewer missed leads and cleaner intake / booking / follow-up",
      "Practical visibility into what is converting and what is leaking",
    ],
    nextStep: { href: "/services/technical-roadmap", label: "Start with the Technical Roadmap →" },
    optionalStep: { href: "/tools/growth-system-audit", label: "Run the Growth System Audit →" },
    serviceSlugs: [
      "technical-roadmap",
      "website-design",
      "crm-architecture",
      "martech-stack-build",
      "automation-systems",
    ],
  },
  build: {
    label: "Build",
    laneTagline: "Strengthen the experience, trust, and technical layer buyers actually move through.",
    solvesFor:
      "The business is real — but perception, conversion surfaces, or custom product layers undersell it or break under load.",
    whoFor:
      "Teams where brand, site, conversion architecture, or bespoke integrations are the binding constraint.",
    outcomes: [
      "Positioning and surfaces that accelerate decisions",
      "Conversion paths aligned to how buyers actually buy",
      "Custom infrastructure that connects data and channels reliably",
    ],
    nextStep: { href: "/proof", label: "See proof in experience & build work →" },
    optionalStep: { href: "/services/technical-roadmap", label: "Map the build sequence with a roadmap →" },
    serviceSlugs: ["custom-infrastructure", "brand-identity", "conversion-optimization"],
  },
  scale: {
    label: "Scale",
    laneTagline: "Repair and harden the machine that captures, routes, measures, and follows up on demand.",
    solvesFor:
      "Volume and complexity expose weak CRM discipline, blind attribution, brittle automation, and AI-shaped ops gaps.",
    whoFor:
      "Broken-system buyers: real traffic and pipeline, but fragmented tools, leaky handoffs, and unclear reporting.",
    outcomes: [
      "AI-enabled and rules-based workflows that remove manual drag",
      "Reporting leadership can defend in a budget conversation",
      "Systems that keep running after launch — documented and governable",
    ],
    nextStep: { href: "/services/technical-roadmap", label: "Diagnose the stack with a roadmap →" },
    optionalStep: { href: "/proof", label: "Review repair-style proof →" },
    serviceSlugs: ["ai-automation", "attribution-analytics"],
  },
  grow: {
    label: "Grow",
    laneTagline: "Engineer qualified demand, visibility, and channel economics — on purpose, not by accident.",
    solvesFor:
      "Buyers exist but do not find you, trust is thin at the top of funnel, or paid/organic channels do not compound.",
    whoFor:
      "Organizations ready to invest in demand systems: SEO/content, strategy, paid capture, and distribution.",
    outcomes: [
      "Stronger discovery and intent-matched visibility",
      "Content and channel systems that reinforce each other",
      "Paid and organic spend read against pipeline, not vanity metrics",
    ],
    nextStep: { href: "/proof", label: "See demand and visibility proof →" },
    optionalStep: { href: "/tools/growth-system-audit", label: "Pressure-test channel focus with the audit →" },
    serviceSlugs: [
      "content-seo-systems",
      "digital-marketing-strategy",
      "paid-media-management",
      "content-creation",
      "social-media-marketing",
    ],
  },
};

const serviceBySlug = new Map(services.map((service) => [service.slug, service]));

export function getServicesByCluster(clusterId: ServiceDisplayClusterId): Service[] {
  return SERVICE_DISPLAY_CLUSTERS[clusterId].serviceSlugs
    .map((slug) => serviceBySlug.get(slug))
    .filter((service): service is Service => Boolean(service));
}

/** Which implementation lane (`/services` index) lists this service, if any. */
export function getDisplayClusterIdForServiceSlug(slug: ServiceCluster): ServiceDisplayClusterId | null {
  for (const id of SERVICE_DISPLAY_CLUSTER_ORDER) {
    if (SERVICE_DISPLAY_CLUSTERS[id].serviceSlugs.includes(slug)) {
      return id;
    }
  }
  return null;
}

/** Buyer-facing project paths (lanes) for this service — same ids as `SERVICE_DISPLAY_CLUSTERS`. */
export function getProjectPathIdsForService(slug: ServiceCluster): ProjectPathId[] {
  const cluster = getDisplayClusterIdForServiceSlug(slug);
  return cluster ? [cluster] : [];
}

/** Hash fragment for the lane section on `/services` (matches `services/page.tsx` ids). */
export function getServicesIndexLaneHash(clusterId: ServiceDisplayClusterId): string {
  return clusterId === "foundation" ? "lane-foundation" : `lane-${clusterId}`;
}
