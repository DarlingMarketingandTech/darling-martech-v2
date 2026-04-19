export function safePercent(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return 0;
  }
  return numerator / denominator;
}

export function currency(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value);
}

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export interface FunnelRevenueResult {
  leads: number;
  opps: number;
  deals: number;
  monthlyRevenue: number;
  annualRevenue: number;
}

export function computeFunnelRevenue(inputs: {
  monthlyTraffic: number;
  visitorToLeadRate: number;
  leadToOppRate: number;
  oppToDealRate: number;
  averageDealValue: number;
}): FunnelRevenueResult {
  const leads = inputs.monthlyTraffic * inputs.visitorToLeadRate;
  const opps = leads * inputs.leadToOppRate;
  const deals = opps * inputs.oppToDealRate;
  const monthlyRevenue = deals * inputs.averageDealValue;
  return {
    leads,
    opps,
    deals,
    monthlyRevenue,
    annualRevenue: monthlyRevenue * 12,
  };
}

export function computeRevenueLiftFromStageChange(
  base: {
    monthlyTraffic: number;
    visitorToLeadRate: number;
    leadToOppRate: number;
    oppToDealRate: number;
    averageDealValue: number;
  },
  stage: "visitorToLeadRate" | "leadToOppRate" | "oppToDealRate",
  newRate: number
) {
  const current = computeFunnelRevenue(base);
  const updated = computeFunnelRevenue({ ...base, [stage]: newRate });
  return {
    current,
    updated,
    lift: updated.monthlyRevenue - current.monthlyRevenue,
    annualLift: (updated.monthlyRevenue - current.monthlyRevenue) * 12,
  };
}

export interface DemandCaptureResult {
  clicks: number;
  leads: number;
  customers: number;
  cac: number;
  ltvToCac: number;
  grossValue: number;
  grossValueMinusSpend: number;
}

export function computeDemandCapture(inputs: {
  monthlySpend: number;
  cpc: number;
  clickToLeadRate: number;
  leadToCustomerRate: number;
  averageLtv: number;
}): DemandCaptureResult {
  const clicks = inputs.cpc > 0 ? inputs.monthlySpend / inputs.cpc : 0;
  const leads = clicks * inputs.clickToLeadRate;
  const customers = leads * inputs.leadToCustomerRate;
  const cac = customers > 0 ? inputs.monthlySpend / customers : 0;
  const ltvToCac = cac > 0 ? inputs.averageLtv / cac : 0;
  const grossValue = customers * inputs.averageLtv;
  return {
    clicks,
    leads,
    customers,
    cac,
    ltvToCac,
    grossValue,
    grossValueMinusSpend: grossValue - inputs.monthlySpend,
  };
}

export interface AutomationSavingsResult {
  weeklyManualCost: number;
  annualManualCost: number;
  recoverableAnnualCost: number;
  monthlyRecoverable: number;
  paybackMonths: number;
}

export function computeAutomationSavings(inputs: {
  employees: number;
  hourlyRate: number;
  manualHoursPerWeek: number;
  automatablePercent: number;
  implementationCost: number;
}): AutomationSavingsResult {
  const weeklyManualCost = inputs.manualHoursPerWeek * inputs.hourlyRate * Math.max(1, inputs.employees);
  const annualManualCost = weeklyManualCost * 52;
  const recoverableAnnualCost = annualManualCost * inputs.automatablePercent;
  const monthlyRecoverable = recoverableAnnualCost / 12;
  const paybackMonths = monthlyRecoverable > 0 ? inputs.implementationCost / monthlyRecoverable : 0;
  return {
    weeklyManualCost,
    annualManualCost,
    recoverableAnnualCost,
    monthlyRecoverable,
    paybackMonths,
  };
}

export interface BuildVsBuyResult {
  totalInternal: number;
  totalAgency: number;
  annualSavings: number;
}

export function computeBuildVsBuy(
  roleCostTotal: number,
  recruitingCostTotal: number,
  overheadMultiplier: number,
  monthlyAgencyRetainer: number,
  severanceCost = 0,
  equityCost = 0
): BuildVsBuyResult {
  const internalBase = roleCostTotal;
  const overheadCost = roleCostTotal * (overheadMultiplier - 1);
  const totalInternal =
    internalBase + overheadCost + recruitingCostTotal + severanceCost + equityCost;
  const totalAgency = monthlyAgencyRetainer * 12;
  return {
    totalInternal,
    totalAgency,
    annualSavings: totalInternal - totalAgency,
  };
}

export interface AttributionClarityResult {
  leadToQualified: number;
  qualifiedToOpp: number;
  oppToCustomer: number;
  revenuePerCustomer: number;
  attributableRevenue: number;
  /** 0–100 */
  clarityScore: number;
}

export function computeAttributionClarity(inputs: {
  leads: number;
  qualifiedLeads: number;
  opportunities: number;
  customers: number;
  revenue: number;
  trackingConfidence: number;
  unattributedPercent: number;
}): AttributionClarityResult {
  const leadToQualified = safePercent(inputs.qualifiedLeads, inputs.leads);
  const qualifiedToOpp = safePercent(inputs.opportunities, inputs.qualifiedLeads);
  const oppToCustomer = safePercent(inputs.customers, inputs.opportunities);
  const revenuePerCustomer = safePercent(inputs.revenue, inputs.customers);
  const unattributedPct = clamp(inputs.unattributedPercent, 0, 100);
  const trackingPct = clamp(inputs.trackingConfidence, 0, 100);
  const attributableRevenue = inputs.revenue * (1 - unattributedPct / 100);
  const clarityScore = clamp(trackingPct * 0.6 + (100 - unattributedPct) * 0.4, 0, 100);
  return {
    leadToQualified,
    qualifiedToOpp,
    oppToCustomer,
    revenuePerCustomer,
    attributableRevenue,
    clarityScore,
  };
}
