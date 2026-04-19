export type ProblemCluster =
  | "no-strategy-owner"
  | "site-not-converting"
  | "disconnected-systems"
  | "not-visible-enough"
  | "brand-system-broken"
  | "pipeline-not-predictable";

export type TrustLadderStage =
  | "browse"
  | "evaluate"
  | "qualify"
  | "commit"
  | "return";

export type OutcomeTag =
  | "Pipeline Growth"
  | "Systems Built"
  | "MarTech Integration"
  | "Attribution & Analytics"
  | "Automation"
  | "CRM Architecture";

export type ServiceCluster =
  | "fractional-cmo"
  | "martech-stack-build"
  | "crm-architecture"
  | "automation-systems"
  | "attribution-analytics"
  | "content-seo-systems";

export type EngagementFormat = "fractional" | "project" | "diagnostic";

/** URL-safe keys for /proof?outcome= — aligned with site blueprint. */
export type OutcomeSlug =
  | "lead-gen"
  | "conversion-lift"
  | "time-saved"
  | "traffic-growth"
  | "brand-awareness"
  | "pipeline-automation"
  | "system-consolidation";

export interface ProofMetric {
  value: string;
  label: string;
  isHighlighted?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  clientName: string;
  clientContext: string;
  location?: string;
  timeline: string;
  engagementFormat: EngagementFormat;
  outcomeTags: OutcomeTag[];
  problemClusters: ProblemCluster[];
  trustLadderStage: TrustLadderStage;
  metrics: ProofMetric[];
  primaryMetric: ProofMetric;
  /** Filter key for proof hub */
  primaryOutcomeSlug: OutcomeSlug;
  /** Metric-first line on proof cards, e.g. "+212% qualified leads" */
  outcomeHeadline: string;
  resultSummary: string;
  fullStory?: string;
  systemsBuilt: string[];
  liveUrl?: string;
  cloudinaryImages?: string[];
  featured: boolean;
  publishedAt: string;
}

export interface ServiceTier {
  name: string;
  price?: string;
  description: string;
  included: string[];
  isPopular?: boolean;
}

export interface Service {
  slug: ServiceCluster;
  title: string;
  headline: string;
  description: string;
  outcomes: string[];
  proofReferences: string[];
  problemClusters: ProblemCluster[];
  engagementFormats: EngagementFormat[];
  tiers?: ServiceTier[];
  isFeatured: boolean;
}

export interface ToolQuestionOption {
  value: string;
  label: string;
}

export interface ToolQuestionScaleLabels {
  min: string;
  max: string;
}

export interface ToolQuestion {
  id: string;
  question: string;
  type: "single" | "multi" | "scale" | "text";
  options?: ToolQuestionOption[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: ToolQuestionScaleLabels;
  required: boolean;
}

export interface ToolResult {
  id: string;
  label: string;
  headline: string;
  description: string;
  problemCluster: ProblemCluster;
  recommendedService: ServiceCluster;
  ctaLabel: string;
  ctaHref: string;
}

export interface Tool {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  estimatedTime: string;
  questions: ToolQuestion[];
  results: ToolResult[];
  emailGated: boolean;
  emailGatePosition?: "before_results" | "after_results";
  trustLadderStage: TrustLadderStage;
  isLive: boolean;
  cloudinaryThumbnail?: string;
}

export type GeoAuditCheckKey =
  | "crawler"
  | "schema"
  | "metadata"
  | "structure"
  | "faq"
  | "authority";

export interface GeoAuditCheck {
  passed: boolean;
  score: number;
  max: number;
}

export interface GeoAuditExtractedData {
  title: string;
  metaDescription: string;
  h1: string;
  entities: string[];
}

export interface GeoAuditHeadingItem {
  level: 1 | 2 | 3;
  text: string;
}

export interface GeoAuditRawXray {
  canonical: string | null;
  metaRobots: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  twitterCard: string | null;
  jsonLdBlockCount: number;
  jsonLdTypes: string[];
  jsonLdSnippet: string | null;
  headingOutline: GeoAuditHeadingItem[];
  stats: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    internalLinkCount: number;
    externalLinkCount: number;
    visibleTextChars: number;
  };
}

export interface GeoAuditResponse {
  score: number;
  extractedData: GeoAuditExtractedData;
  checks: Record<GeoAuditCheckKey, GeoAuditCheck>;
  rawXray: GeoAuditRawXray;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface EngagementFormatDetail {
  format: EngagementFormat;
  name: string;
  oneLiner: string;
  rightFor: string;
  included: string[];
  proofReference?: string;
}

export interface ProcessPrinciple {
  title: string;
  description: string;
}

export interface ProcessWhatNot {
  title: string;
  body: string;
}

export interface ProcessScenario {
  title: string;
  body: string;
}

export interface ProcessData {
  principles: ProcessPrinciple[];
  steps: ProcessStep[];
  engagementFormats: EngagementFormatDetail[];
  whatIDontDo: ProcessWhatNot[];
  whatGoodLooksLike: ProcessScenario[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating?: number;
  caseStudySlug?: string;
  featured: boolean;
  trustLadderStage: TrustLadderStage;
}

export interface ProblemPageCtaLink {
  label: string;
  href: string;
}

export interface ProblemPageCta {
  primary: ProblemPageCtaLink;
  secondary: ProblemPageCtaLink;
}

export interface ProblemPage {
  slug: ProblemCluster;
  title: string;
  /** Hub / SEO short line */
  heroSubhead: string;
  /** Category label for hero and hub cards, e.g. STRATEGY & LEADERSHIP */
  pageEyebrow: string;
  /** Hub grid: STRATEGY, WEBSITE & CONVERSION, etc. */
  hubCategory: string;
  /** Proof line for hub cards, e.g. "+212% qualified leads — …" */
  proofChip: string;
  hubCtaLabel: string;
  heroHeadline: string;
  introParagraphs: string[];
  /** Short diagnostic bullets for the symptom card. */
  symptoms: string[];
  whyItHappens: string;
  stakes: string;
  whatTheFixLooksLike: string;
  relatedProof: string[];
  relevantTools: ProblemPageCtaLink[];
  relatedService: ServiceCluster;
  closingBlock: {
    headline: string;
    primary: ProblemPageCtaLink;
    secondary?: ProblemPageCtaLink;
  };
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
  children?: NavItem[];
}

export interface FooterNavigationColumn {
  heading: string;
  links: NavItem[];
}

export interface SiteNavigation {
  primary: NavItem[];
  footer: {
    columns: FooterNavigationColumn[];
  };
  cta: {
    label: string;
    href: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  categories: string[];
  problemClusters: ProblemCluster[];
  trustLadderStage: TrustLadderStage;
  featured: boolean;
  coverImage?: string;
}

export type DownloadableResourceFileType = "PDF" | "Spreadsheet" | "Template";

export interface DownloadableResource {
  slug: string;
  title: string;
  description: string;
  fileType: DownloadableResourceFileType;
  emailGated: boolean;
  problemClusters: ProblemCluster[];
  cloudinaryAssetId?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface SiteFounder {
  name: string;
  email: string;
  location: string;
  title: string;
  linkedIn?: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  founder: SiteFounder;
  calComLink: string;
  defaultMeta: PageMeta;
}
