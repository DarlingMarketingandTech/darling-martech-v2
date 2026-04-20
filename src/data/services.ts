import type { Service } from "@/types";

export const services: Service[] = [
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
    proofReferences: ["russell-painting", "317-bbq"],
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
    proofReferences: ["graston-growth-engine", "pike-medical"],
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
    proofReferences: ["graston-growth-engine", "pike-medical"],
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
    proofReferences: ["pike-medical", "clinical-compass"],
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
    proofReferences: ["russell-painting"],
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
    proofReferences: ["pike-medical"],
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
    proofReferences: ["graston-qualified-leads", "317-bbq"],
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
    proofReferences: ["pike-medical", "russell-painting"],
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

type ServiceDisplayClusterId = "grow" | "scale" | "build";

type ServiceDisplayCluster = {
  label: "Grow" | "Scale" | "Build";
  descriptor: string;
  description: string;
  serviceSlugs: Service["slug"][];
};

export const SERVICE_DISPLAY_CLUSTER_ORDER: ServiceDisplayClusterId[] = [
  "grow",
  "scale",
  "build",
];

export const SERVICE_DISPLAY_CLUSTERS: Record<ServiceDisplayClusterId, ServiceDisplayCluster> = {
  grow: {
    label: "Grow",
    descriptor: "demand, visibility, and conversion",
    description:
      "For bottlenecks around acquisition quality, search presence, and conversion performance.",
    serviceSlugs: [
      "attribution-analytics",
      "content-seo-systems",
      "digital-marketing-strategy",
      "paid-media-management",
      "conversion-optimization",
    ],
  },
  scale: {
    label: "Scale",
    descriptor: "automation, CRM, and operational leverage",
    description:
      "For teams that need cleaner workflows, faster response loops, and less operational drag.",
    serviceSlugs: [
      "ai-automation",
      "automation-systems",
      "martech-stack-build",
      "crm-architecture",
    ],
  },
  build: {
    label: "Build",
    descriptor: "infrastructure, experience, and brand foundation",
    description:
      "For foundational system, experience, and architecture work that supports every downstream channel.",
    serviceSlugs: [
      "custom-infrastructure",
      "technical-roadmap",
      "brand-identity",
      "website-design",
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
