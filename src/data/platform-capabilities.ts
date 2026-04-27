import type {
  PlatformCapabilityCategory,
  PlatformSlug,
  ProofStackGroupId,
  ServiceCluster,
} from "@/types";

export type PlatformAllowedUseCase =
  | "homepage-capability-module"
  | "proof-implementation-stack";

export interface PlatformDefinition {
  slug: PlatformSlug;
  label: string;
  category: PlatformCapabilityCategory;
  cloudinaryPublicId: string;
  proofStackGroup: ProofStackGroupId;
  allowedUseCases: PlatformAllowedUseCase[];
}

export const PROOF_STACK_GROUP_ORDER: ProofStackGroupId[] = [
  "analytics-data",
  "infrastructure-platform",
  "build-workflow",
  "crm-automation",
  "visibility-seo",
  "conversion-booking",
];

export const PROOF_STACK_GROUPS: Record<
  ProofStackGroupId,
  { label: string; description: string }
> = {
  "analytics-data": {
    label: "Analytics / data",
    description: "Measurement, reporting, and source visibility that made the system readable.",
  },
  "infrastructure-platform": {
    label: "Infrastructure / platform",
    description: "Runtime, storage, and delivery layers that kept the build stable and usable.",
  },
  "build-workflow": {
    label: "Build / workflow",
    description: "Design and production tools used to shape, ship, and maintain the build.",
  },
  "crm-automation": {
    label: "CRM / automation",
    description: "CRM, routing, and automation layers that moved records and follow-up forward.",
  },
  "visibility-seo": {
    label: "Visibility / SEO",
    description: "Search, discovery, and local-intent surfaces that brought the right people in.",
  },
  "conversion-booking": {
    label: "Conversion / booking",
    description: "Booking, registration, and decision-path layers that turned intent into action.",
  },
};

export const PLATFORM_CAPABILITY_CATEGORIES: Record<
  PlatformCapabilityCategory,
  { label: string; description: string }
> = {
  "revenue-crm": {
    label: "Revenue / CRM / Commerce",
    description:
      "Revenue systems, CRM architecture, and commerce infrastructure used in implementation work.",
  },
  "analytics-growth": {
    label: "Analytics / Data / Search",
    description:
      "Measurement, search, and data platforms used to instrument and optimize growth systems.",
  },
  "infrastructure-platform": {
    label: "Infrastructure / Platform",
    description:
      "Core runtime and backend platforms used for stability, performance, and operational reliability.",
  },
  "build-workflow-ai": {
    label: "Build / Workflow / Creative",
    description:
      "Build, collaboration, and creative systems used to execute and ship production work.",
  },
};

export const PLATFORM_CAPABILITY_CATEGORY_ORDER: PlatformCapabilityCategory[] = [
  "revenue-crm",
  "analytics-growth",
  "infrastructure-platform",
  "build-workflow-ai",
];

export const PLATFORM_CATALOG: PlatformDefinition[] = [
  {
    slug: "salesforce",
    label: "Salesforce",
    category: "revenue-crm",
    cloudinaryPublicId: "salesforce-original",
    proofStackGroup: "crm-automation",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "hubspot",
    label: "HubSpot",
    category: "revenue-crm",
    cloudinaryPublicId: "HubSpot_-_Copy",
    proofStackGroup: "crm-automation",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "woocommerce",
    label: "WooCommerce",
    category: "revenue-crm",
    cloudinaryPublicId: "woocommerce-original",
    proofStackGroup: "conversion-booking",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "wordpress",
    label: "WordPress",
    category: "revenue-crm",
    cloudinaryPublicId: "wordpress-original",
    proofStackGroup: "infrastructure-platform",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "google",
    label: "Google",
    category: "analytics-growth",
    cloudinaryPublicId: "google-original",
    proofStackGroup: "visibility-seo",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "googlecloud",
    label: "Google Cloud",
    category: "analytics-growth",
    cloudinaryPublicId: "googlecloud-original",
    proofStackGroup: "analytics-data",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "apache",
    label: "Apache",
    category: "infrastructure-platform",
    cloudinaryPublicId: "apache-original",
    proofStackGroup: "infrastructure-platform",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "mysql",
    label: "MySQL",
    category: "infrastructure-platform",
    cloudinaryPublicId: "mysql-original",
    proofStackGroup: "analytics-data",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "php",
    label: "PHP",
    category: "infrastructure-platform",
    cloudinaryPublicId: "php-original",
    proofStackGroup: "infrastructure-platform",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "cloudflare",
    label: "Cloudflare",
    category: "infrastructure-platform",
    cloudinaryPublicId: "CloudFlare",
    proofStackGroup: "infrastructure-platform",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "cloudflare-workers",
    label: "Cloudflare Workers",
    category: "infrastructure-platform",
    cloudinaryPublicId: "CloudFlare",
    proofStackGroup: "infrastructure-platform",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "github",
    label: "GitHub",
    category: "build-workflow-ai",
    cloudinaryPublicId: "github-original",
    proofStackGroup: "build-workflow",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "figma",
    label: "Figma",
    category: "build-workflow-ai",
    cloudinaryPublicId: "figma-original",
    proofStackGroup: "build-workflow",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "slack",
    label: "Slack",
    category: "build-workflow-ai",
    cloudinaryPublicId: "slack-original",
    proofStackGroup: "build-workflow",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "nextjs",
    label: "Next.js",
    category: "build-workflow-ai",
    cloudinaryPublicId: "nextjs-original",
    proofStackGroup: "infrastructure-platform",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "canva",
    label: "Canva",
    category: "build-workflow-ai",
    cloudinaryPublicId: "canva-original",
    proofStackGroup: "build-workflow",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
];

export const PLATFORM_ASSET_MAP: Record<PlatformSlug, PlatformDefinition> =
  PLATFORM_CATALOG.reduce((acc, platform) => {
    acc[platform.slug] = platform;
    return acc;
  }, {} as Record<PlatformSlug, PlatformDefinition>);

export const PLATFORM_SLUGS_BY_CATEGORY: Record<
  PlatformCapabilityCategory,
  PlatformSlug[]
> = PLATFORM_CAPABILITY_CATEGORY_ORDER.reduce((acc, category) => {
  acc[category] = PLATFORM_CATALOG.filter(
    (platform) => platform.category === category
  ).map((platform) => platform.slug);
  return acc;
}, {} as Record<PlatformCapabilityCategory, PlatformSlug[]>);

export const HOMEPAGE_CAPABILITY_SHORTLIST: PlatformSlug[] = PLATFORM_CATALOG.filter(
  (platform) => platform.allowedUseCases.includes("homepage-capability-module")
).map((platform) => platform.slug);

export const SERVICE_ECOSYSTEM_BY_SERVICE: Record<
  ServiceCluster,
  PlatformCapabilityCategory[]
> = {
  "fractional-cmo": ["revenue-crm", "analytics-growth", "infrastructure-platform"],
  "attribution-analytics": ["analytics-growth", "revenue-crm", "infrastructure-platform"],
  "content-seo-systems": ["analytics-growth", "infrastructure-platform"],
  "digital-marketing-strategy": ["revenue-crm", "analytics-growth"],
  "paid-media-management": ["analytics-growth", "revenue-crm"],
  "conversion-optimization": ["revenue-crm", "analytics-growth", "infrastructure-platform"],
  "technical-roadmap": [
    "revenue-crm",
    "analytics-growth",
    "infrastructure-platform",
    "build-workflow-ai",
  ],
  "ai-automation": ["build-workflow-ai", "revenue-crm", "infrastructure-platform"],
  "automation-systems": ["revenue-crm", "build-workflow-ai", "infrastructure-platform"],
  "martech-stack-build": [
    "revenue-crm",
    "analytics-growth",
    "infrastructure-platform",
    "build-workflow-ai",
  ],
  "crm-architecture": ["revenue-crm", "analytics-growth"],
  "custom-infrastructure": [
    "infrastructure-platform",
    "build-workflow-ai",
    "analytics-growth",
  ],
  "brand-identity": ["build-workflow-ai"],
  "website-design": ["infrastructure-platform", "build-workflow-ai", "analytics-growth"],
  "content-creation": ["build-workflow-ai", "analytics-growth"],
  "social-media-marketing": ["analytics-growth", "build-workflow-ai"],
};
