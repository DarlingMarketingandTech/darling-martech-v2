import type { ProblemCluster, ServiceCluster } from "@/types";

export type ToolKind = "diagnostic" | "calculator" | "scanner" | "simulation";

export interface ToolLeadPayload {
  name?: string;
  email: string;
  company?: string;
  role?: string;
  toolSlug: string;
  resultSummary?: Record<string, unknown>;
}

export interface ToolRecommendationLink {
  problemSlug?: ProblemCluster;
  serviceSlug?: ServiceCluster;
  proofSlug?: string;
}

export interface ToolResultCta {
  label: string;
  href: string;
}

export interface DiagnosticToolMeta {
  slug: string;
  title: string;
  kind: ToolKind;
  isProofLinked: boolean;
  relatedProblemSlugs: ProblemCluster[];
  relatedServiceSlugs: ServiceCluster[];
  relatedProofSlugs: string[];
  primaryCta?: ToolResultCta;
}

export interface BuildSection {
  title: string;
  description: string;
}

export interface FunnelInputs {
  monthlyTraffic: number;
  /** decimal 0–1 */
  visitorToLeadRate: number;
  /** decimal 0–1 */
  leadToOppRate: number;
  /** decimal 0–1 */
  oppToDealRate: number;
  averageDealValue: number;
}

export interface DemandInputs {
  monthlySpend: number;
  cpc: number;
  /** decimal 0–1 */
  clickToLeadRate: number;
  /** decimal 0–1 */
  leadToCustomerRate: number;
  averageLtv: number;
}

export interface AutomationInputs {
  employees: number;
  hourlyRate: number;
  manualHoursPerWeek: number;
  /** decimal 0–1 */
  automatablePercent: number;
  implementationCost: number;
}

export interface BuildVsBuyInputs {
  selectedRoles: string[];
  monthlyAgencyRetainer: number;
  equityPercent?: number;
  severanceMonths?: number;
}

export interface AttributionInputs {
  adSpend: number;
  visits: number;
  leads: number;
  qualifiedLeads: number;
  opportunities: number;
  customers: number;
  revenue: number;
  /** 0–100 */
  trackingConfidence: number;
  /** 0–100 */
  unattributedPercent: number;
}

export interface FragmentationInputs {
  crm: string | null;
  booking: string | null;
  analytics: string[];
  ads: string[];
  automation: string[];
  reporting: string[];
  manualExportsPerWeek: number;
  duplicateEntryPoints: number;
}
