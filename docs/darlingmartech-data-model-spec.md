// darlingmartech-data-model-spec.md  
// TypeScript data model interfaces for the Darling MarTech site rebuild  
// All data models live in /src/data/ as .ts files  
// Convention: PascalCase interfaces, camelCase properties, snake\_UPPER for enum-style constants

// ─────────────────────────────────────────────────────────  
// TAXONOMY / CONSTANTS  
// File: src/data/taxonomy.ts  
// ─────────────────────────────────────────────────────────

export const PROBLEM\_CLUSTERS \= \[  
  'pipeline-not-converting',  
  'attribution-is-broken',  
  'systems-disconnected',  
  'no-marketing-infrastructure',  
  'cant-scale-without-hiring',  
  'strategy-without-execution',  
\] as const;

export type ProblemCluster \= typeof PROBLEM\_CLUSTERS\[number\];

export const TRUST\_LADDER\_STAGES \= \[  
  'browse',        // Just landed — offer free tool or resource  
  'evaluate',      // Considering — offer proof, case study, process  
  'qualify',       // Ready to talk — offer diagnostic call  
  'commit',        // Ready to engage — offer contact/booking  
  'return',        // Existing relationship — nurture/update  
\] as const;

export type TrustLadderStage \= typeof TRUST\_LADDER\_STAGES\[number\];

export const OUTCOME\_TAGS \= \[  
  'Pipeline Growth',  
  'Systems Built',  
  'MarTech Integration',  
  'Attribution & Analytics',  
  'Automation',  
  'CRM Architecture',  
\] as const;

export type OutcomeTag \= typeof OUTCOME\_TAGS\[number\];

export const SERVICE\_CLUSTERS \= \[  
  'fractional-cmo',  
  'martech-stack-build',  
  'crm-architecture',  
  'automation-systems',  
  'attribution-analytics',  
  'content-seo-systems',  
\] as const;

export type ServiceCluster \= typeof SERVICE\_CLUSTERS\[number\];

export const ENGAGEMENT\_FORMATS \= \[  
  'fractional',    // Ongoing / fractional CMO engagement  
  'project',       // Defined scope, fixed timeline  
  'diagnostic',    // One-time audit/diagnostic session  
\] as const;

export type EngagementFormat \= typeof ENGAGEMENT\_FORMATS\[number\];

// ─────────────────────────────────────────────────────────  
// CASE STUDY / PROOF  
// File: src/data/work/work-index.ts \+ src/data/work/\[slug\].ts  
// ─────────────────────────────────────────────────────────

export interface ProofMetric {  
  value: string;           // e.g. "+212%", "4.9★", "95%", "81"  
  label: string;           // e.g. "Qualified leads generated"  
  isHighlighted?: boolean; // Primary metric for the card display  
}

export interface CaseStudy {  
  slug: string;                    // URL slug: "graston-growth-engine"  
  title: string;                   // "Full MarTech Ecosystem Build"  
  clientName: string;              // "Graston Technique®"  
  clientContext: string;           // Brief client description  
  location?: string;               // "Indianapolis, IN"  
  timeline: string;                // "18-month fractional engagement"  
  engagementFormat: EngagementFormat;  
  outcomeTags: OutcomeTag\[\];  
  problemClusters: ProblemCluster\[\]; // Which problem pages this proof appears on  
  trustLadderStage: TrustLadderStage; // Primary trust stage this serves  
  metrics: ProofMetric\[\];  
  primaryMetric: ProofMetric;      // The headline number  
  resultSummary: string;           // 2-sentence result description (for cards)  
  fullStory?: string;              // Long-form content for the case study page  
  systemsBuilt: string\[\];          // \["HubSpot", "Cloudflare Workers", ...\]  
  liveUrl?: string;                // Optional: link to live demo/tool  
  cloudinaryImages?: string\[\];     // Cloudinary public IDs for project images  
  featured: boolean;               // Show in homepage proof strip  
  publishedAt: string;             // ISO date string  
}

// ─────────────────────────────────────────────────────────  
// SERVICES  
// File: src/data/services.ts  
// ─────────────────────────────────────────────────────────

export interface ServiceTier {  
  name: string;                    // "Starter", "Growth", "Full-Stack"  
  price?: string;                  // Optional — may be "Starting at $X/mo" or omitted  
  description: string;  
  included: string\[\];  
  isPopular?: boolean;  
}

export interface Service {  
  slug: ServiceCluster;  
  title: string;                   // "Fractional CMO"  
  headline: string;                // One-liner for card/list display  
  description: string;             // 2–3 sentence full description  
  outcomes: string\[\];              // What the client gets  
  proofReferences: string\[\];       // CaseStudy slugs that demonstrate this service  
  problemClusters: ProblemCluster\[\]; // Which problem pages link to this service  
  engagementFormats: EngagementFormat\[\];  
  tiers?: ServiceTier\[\];  
  isFeatured: boolean;  
}

// ─────────────────────────────────────────────────────────  
// TOOLS / INTERACTIVE DIAGNOSTICS  
// File: src/data/labs.ts  
// ─────────────────────────────────────────────────────────

export interface ToolQuestion {  
  id: string;  
  question: string;  
  type: 'single' | 'multi' | 'scale' | 'text';  
  options?: { value: string; label: string; }\[\];  
  scaleMin?: number;  
  scaleMax?: number;  
  scaleLabels?: { min: string; max: string; };  
  required: boolean;  
}

export interface ToolResult {  
  id: string;  
  label: string;                   // "Pipeline Problem", "Attribution Gap", etc.  
  headline: string;                // Result headline shown to user  
  description: string;             // 2–3 sentence explanation  
  problemCluster: ProblemCluster;  // Maps result to the relevant /problems page  
  recommendedService: ServiceCluster;  
  ctaLabel: string;  
  ctaHref: string;  
}

export interface Tool {  
  slug: string;                    // "growth-bottleneck-quiz"  
  title: string;                   // "Growth Bottleneck Quiz"  
  tagline: string;                 // Short description for tool cards  
  description: string;  
  estimatedTime: string;           // "3 minutes"  
  questions: ToolQuestion\[\];  
  results: ToolResult\[\];  
  emailGated: boolean;             // Whether email is required for full results  
  emailGatePosition?: 'before\_results' | 'after\_results';  
  trustLadderStage: TrustLadderStage;  
  isLive: boolean;  
  cloudinaryThumbnail?: string;  
}

// ─────────────────────────────────────────────────────────  
// PROCESS STEPS  
// File: src/data/process.ts  
// ─────────────────────────────────────────────────────────

export interface ProcessStep {  
  number: string;                  // "01", "02", etc.  
  title: string;  
  description: string;             // 3–4 sentences  
}

export interface EngagementFormatDetail {  
  format: EngagementFormat;  
  name: string;                    // "Fractional Engagement"  
  oneLiner: string;  
  rightFor: string;  
  included: string\[\];  
  proofReference?: string;         // CaseStudy slug  
}

export interface ProcessData {  
  principles: {  
    title: string;  
    description: string;  
  }\[\];  
  steps: ProcessStep\[\];  
  engagementFormats: EngagementFormatDetail\[\];  
  whatIDontDo: string\[\];  
  whatGoodLooksLike: string\[\];  
}

// ─────────────────────────────────────────────────────────  
// TESTIMONIALS  
// File: src/data/testimonials.ts  
// ─────────────────────────────────────────────────────────

export interface Testimonial {  
  id: string;  
  quote: string;  
  author: string;  
  title: string;                   // "VP Marketing, Graston Technique®"  
  company: string;  
  rating?: number;                 // 1–5, optional  
  caseStudySlug?: string;          // Links to full case study  
  featured: boolean;  
  trustLadderStage: TrustLadderStage; // Where this testimonial appears  
}

// ─────────────────────────────────────────────────────────  
// PROBLEMS HUB  
// File: src/data/problems.ts  
// ─────────────────────────────────────────────────────────

export interface ProblemPage {  
  slug: ProblemCluster;  
  title: string;  
  heroHeadline: string;  
  heroSubhead: string;  
  symptoms: string\[\];              // "Does this sound familiar?" bullet list  
  cause: string;                   // What's actually causing the problem  
  solution: string;                // How Darling MarTech addresses it  
  relatedProof: string\[\];          // CaseStudy slugs  
  relatedService: ServiceCluster;  
  relatedTool?: string;            // Tool slug that maps to this problem  
  cta: {  
    primary: { label: string; href: string; };  
    secondary: { label: string; href: string; };  
  };  
}

// ─────────────────────────────────────────────────────────  
// NAVIGATION  
// File: src/data/navigation.ts  
// ─────────────────────────────────────────────────────────

export interface NavItem {  
  label: string;  
  href: string;  
  isExternal?: boolean;  
  badge?: string;                  // Optional badge text e.g. "New"  
  children?: NavItem\[\];            // Dropdown items  
}

export interface SiteNavigation {  
  primary: NavItem\[\];              // Main nav links  
  footer: {  
    columns: {  
      heading: string;  
      links: NavItem\[\];  
    }\[\];  
  };  
  cta: {  
    label: string;  
    href: string;  
  };  
}

// ─────────────────────────────────────────────────────────  
// BLOG / RESOURCES  
// File: src/data/resources.ts (or generated from MDX)  
// ─────────────────────────────────────────────────────────

export interface BlogPost {  
  slug: string;  
  title: string;  
  excerpt: string;  
  publishedAt: string;             // ISO date  
  updatedAt?: string;  
  readingTime: number;             // Minutes  
  categories: string\[\];  
  problemClusters: ProblemCluster\[\]; // Which problem pages this supports  
  trustLadderStage: TrustLadderStage;  
  featured: boolean;  
  coverImage?: string;             // Cloudinary public ID  
}

export interface DownloadableResource {  
  slug: string;  
  title: string;  
  description: string;  
  fileType: 'PDF' | 'Spreadsheet' | 'Template';  
  emailGated: boolean;  
  problemClusters: ProblemCluster\[\];  
  cloudinaryAssetId?: string;  
}

// ─────────────────────────────────────────────────────────  
// SITE METADATA  
// File: src/data/site-meta.ts  
// ─────────────────────────────────────────────────────────

export interface PageMeta {  
  title: string;  
  description: string;  
  ogImage?: string;                // Cloudinary public ID or absolute URL  
  canonicalUrl?: string;  
  noIndex?: boolean;  
}

export interface SiteConfig {  
  name: string;                    // "Darling MarTech"  
  url: string;                     // "https://darlingmartech.com"  
  founder: {  
    name: string;                  // "Jacob Darling"  
    email: string;                 // "jacob@darlingmt.com"  
    location: string;              // "Indianapolis, IN"  
    title: string;                 // "Founder, Darling MarTech"  
    linkedIn?: string;  
  };  
  calComLink: string;              // Cal.com booking URL  
  defaultMeta: PageMeta;  
}  
