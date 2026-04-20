import type { PlatformCapabilityCategory, PlatformSlug, ServiceCluster } from "@/types";

export type PlatformAllowedUseCase =
  | "homepage-capability-module"
  | "proof-implementation-stack";

export interface PlatformDefinition {
  slug: PlatformSlug;
  label: string;
  category: PlatformCapabilityCategory;
  cloudinaryPublicId: string;
  allowedUseCases: PlatformAllowedUseCase[];
}

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
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "woocommerce",
    label: "WooCommerce",
    category: "revenue-crm",
    cloudinaryPublicId: "woocommerce-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "wordpress",
    label: "WordPress",
    category: "revenue-crm",
    cloudinaryPublicId: "wordpress-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "google",
    label: "Google",
    category: "analytics-growth",
    cloudinaryPublicId: "google-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "googlecloud",
    label: "Google Cloud",
    category: "analytics-growth",
    cloudinaryPublicId: "googlecloud-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "apache",
    label: "Apache",
    category: "infrastructure-platform",
    cloudinaryPublicId: "apache-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "mysql",
    label: "MySQL",
    category: "infrastructure-platform",
    cloudinaryPublicId: "mysql-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "php",
    label: "PHP",
    category: "infrastructure-platform",
    cloudinaryPublicId: "php-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "github",
    label: "GitHub",
    category: "build-workflow-ai",
    cloudinaryPublicId: "github-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "figma",
    label: "Figma",
    category: "build-workflow-ai",
    cloudinaryPublicId: "figma-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "slack",
    label: "Slack",
    category: "build-workflow-ai",
    cloudinaryPublicId: "slack-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "nextjs",
    label: "Next.js",
    category: "build-workflow-ai",
    cloudinaryPublicId: "nextjs-original",
    allowedUseCases: ["homepage-capability-module", "proof-implementation-stack"],
  },
  {
    slug: "canva",
    label: "Canva",
    category: "build-workflow-ai",
    cloudinaryPublicId: "canva-original",
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
