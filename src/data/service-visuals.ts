import type { ServiceCluster } from "@/types";

/**
 * Curated Cloudinary public IDs (see `darling martech v2` curated folders in Cloudinary).
 * Reuses problem/tool/homepage art direction — one memorable system language site-wide.
 */
export const SERVICE_VISUAL_BY_SLUG: Record<
  ServiceCluster,
  { visualPublicId: string; visualAlt: string }
> = {
  "fractional-cmo": {
    visualPublicId: "curated/problems/no-strategy-owner-unified-ownership",
    visualAlt: "Modular systems aligning into one accountable strategic structure.",
  },
  "attribution-analytics": {
    visualPublicId: "curated/tools/attribution-snapshot",
    visualAlt: "Attribution paths converging — revenue signal clarity.",
  },
  "content-seo-systems": {
    visualPublicId: "curated/tools/geo-readiness-auditor",
    visualAlt: "Stacked data layers — structured visibility and entity clarity.",
  },
  "ai-automation": {
    visualPublicId: "curated/tools/attribution-clarity-analyzer",
    visualAlt: "Parallel system clusters resolving into one interpretable signal.",
  },
  "automation-systems": {
    visualPublicId: "curated/tools/automation-cost-savings-calculator",
    visualAlt: "Floating modules seeking connection — manual work waiting to be automated.",
  },
  "martech-stack-build": {
    visualPublicId: "curated/tools/martech-fragmentation-scorecard",
    visualAlt: "Interlocked gears — integrated stack execution under strain.",
  },
  "crm-architecture": {
    visualPublicId: "curated/problems/disconnected-systems-fractured-pipeline",
    visualAlt: "Fractured conduit — CRM and handoff gaps in the flow.",
  },
  "custom-infrastructure": {
    visualPublicId: "curated/homepage/core-infrastructure-engine",
    visualAlt: "Core infrastructure engine — custom integrations and platform depth.",
  },
  "digital-marketing-strategy": {
    visualPublicId: "curated/tools/build-vs-buy-stack-calculator",
    visualAlt: "Structural strain — build-versus-buy and system economics.",
  },
  "paid-media-management": {
    visualPublicId: "curated/tools/demand-capture-cac-simulator",
    visualAlt: "Straight-line demand paths — paid capture and signal flow.",
  },
  "conversion-optimization": {
    visualPublicId: "curated/tools/funnel-roi-forecaster",
    visualAlt: "Static engine assembly — funnel friction and locked-in conversion.",
  },
  "technical-roadmap": {
    visualPublicId: "curated/tools/cmo-roadmap-generator",
    visualAlt: "Priority drift under control — sequenced roadmap and tradeoffs.",
  },
  "brand-identity": {
    visualPublicId: "curated/problems/brand-system-broken-identity-disconnect",
    visualAlt: "Two systems out of sync — brand and business identity realignment.",
  },
  "website-design": {
    visualPublicId: "curated/problems/site-not-converting-messaging-decay",
    visualAlt: "Core module under strain — trust decay on the conversion surface.",
  },
  "content-creation": {
    visualPublicId: "curated/tools/growth-bottleneck-quiz",
    visualAlt: "Diagnostic modular grid — content mapped to bottleneck and intent.",
  },
  "social-media-marketing": {
    visualPublicId: "curated/tools/cmo-simulator",
    visualAlt: "Spiraling live pipeline — distribution and engagement systems.",
  },
};
