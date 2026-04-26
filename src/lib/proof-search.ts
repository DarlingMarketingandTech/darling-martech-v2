import { create, insertMultiple, search, type AnyOrama, type Results } from "@orama/orama";
import {
  BUYER_SCENARIO_LABELS,
  OUTCOME_SLUG_LABELS,
  PROJECT_TYPE_ORDER,
  PROJECT_TYPE_LABELS,
} from "@/data/taxonomy";
import { getBuyerStateLabel, getCaseStudyBuyerState } from "@/lib/buyer-state";
import { isQuantitativeProofMetric } from "@/lib/proof-metric";
import type {
  BuyerScenarioId,
  CaseStudy,
  OutcomeSlug,
  OutcomeTag,
  ProjectComplexity,
  ProjectTypeId,
  ScopeShape,
} from "@/types";

/**
 * Lightweight Orama schema covering the fields the Proof Hub revamp brief calls
 * out as searchable: `title`, `outcomeHeadline`, `resultSummary`, `systemsBuilt`,
 * `clientContext`, `primaryOutcomeSlug`, plus the buyer-state label and the
 * narrative outcome tags so chip-style filters match free-text intent.
 */
const proofSchema = {
  slug: "string",
  title: "string",
  outcomeHeadline: "string",
  resultSummary: "string",
  clientName: "string",
  clientContext: "string",
  systemsBuilt: "string[]",
  outcomeTags: "string[]",
  primaryOutcomeSlug: "string",
  primaryOutcomeLabel: "string",
  buyerStateLabel: "string",
  projectType: "string",
  projectTypeLabel: "string",
  buyerScenario: "string",
  buyerScenarioLabel: "string",
  projectComplexity: "string",
  scopeShape: "string",
  primarySimilaritySummary: "string",
} as const;

export type ProofSearchDocument = {
  slug: string;
  title: string;
  outcomeHeadline: string;
  resultSummary: string;
  clientName: string;
  clientContext: string;
  systemsBuilt: string[];
  outcomeTags: string[];
  primaryOutcomeSlug: OutcomeSlug;
  primaryOutcomeLabel: string;
  buyerStateLabel: string;
  projectType: ProjectTypeId;
  projectTypeLabel: string;
  buyerScenario: BuyerScenarioId;
  buyerScenarioLabel: string;
  projectComplexity: ProjectComplexity;
  scopeShape: ScopeShape;
  primarySimilaritySummary: string;
};

export type ProofSearchIndex = AnyOrama;

function toDocument(study: CaseStudy): ProofSearchDocument {
  return {
    slug: study.slug,
    title: study.title,
    outcomeHeadline: study.outcomeHeadline,
    resultSummary: study.resultSummary,
    clientName: study.clientName,
    clientContext: study.clientContext,
    systemsBuilt: study.systemsBuilt,
    outcomeTags: study.outcomeTags,
    primaryOutcomeSlug: study.primaryOutcomeSlug,
    primaryOutcomeLabel: OUTCOME_SLUG_LABELS[study.primaryOutcomeSlug],
    buyerStateLabel: getBuyerStateLabel(getCaseStudyBuyerState(study)),
    projectType: study.projectType,
    projectTypeLabel: PROJECT_TYPE_LABELS[study.projectType],
    buyerScenario: study.buyerScenario,
    buyerScenarioLabel: BUYER_SCENARIO_LABELS[study.buyerScenario],
    projectComplexity: study.projectComplexity,
    scopeShape: study.scopeShape,
    primarySimilaritySummary: study.primarySimilaritySummary ?? "",
  };
}

/**
 * Builds the Orama search index over the case study collection. Cheap enough
 * (sub-millisecond for our dataset size) to call inside an effect on the
 * client without measurable jank.
 */
export async function buildProofSearchIndex(caseStudies: CaseStudy[]): Promise<ProofSearchIndex> {
  const db = create({ schema: proofSchema });
  await insertMultiple(db, caseStudies.map(toDocument));
  return db;
}

/**
 * Returns slugs that match the term, ranked by Orama relevance. Term-less
 * queries return `null` so callers can fall back to the unfiltered list.
 */
export async function searchProofIndex(
  index: ProofSearchIndex,
  term: string
): Promise<Set<string> | null> {
  const trimmed = term.trim();
  if (trimmed.length < 2) return null;

  const results = (await search(index, {
    term: trimmed,
    properties: [
      "title",
      "outcomeHeadline",
      "resultSummary",
      "clientName",
      "clientContext",
      "systemsBuilt",
      "outcomeTags",
      "primaryOutcomeLabel",
      "buyerStateLabel",
      "projectTypeLabel",
      "buyerScenarioLabel",
      "primarySimilaritySummary",
    ],
    tolerance: 1,
    limit: caseStudyHardLimit,
  })) as Results<ProofSearchDocument>;

  const slugs = new Set<string>();
  for (const hit of results.hits) {
    slugs.add(hit.document.slug);
  }
  return slugs;
}

/**
 * Hard cap on returned results — any plausible Proof Hub stays well under this
 * even with substantial portfolio growth.
 */
const caseStudyHardLimit = 200;

export type ProofSortMode = "default" | "extreme-outcome" | "newest" | "most-systems";

export const PROOF_SORT_OPTIONS: { value: ProofSortMode; label: string }[] = [
  { value: "default", label: "Curated order" },
  { value: "extreme-outcome", label: "Most extreme outcome" },
  { value: "newest", label: "Most recent" },
  { value: "most-systems", label: "Most systems built" },
];

/**
 * Pulls a comparable magnitude out of the primary metric. Falls back to 0 for
 * narrative outcomes so they sort below numeric ones when "extreme" is active.
 */
function metricMagnitude(study: CaseStudy): number {
  const metric = study.primaryMetric ?? study.metrics?.[0];
  if (!metric || !isQuantitativeProofMetric(metric)) return 0;
  const numericMatch = metric.value.match(/-?\d+(?:\.\d+)?/);
  if (!numericMatch) return 0;
  return Math.abs(Number(numericMatch[0]));
}

function complexityScore(study: CaseStudy): number {
  const layers = study.implementationLayers?.length ?? 0;
  return study.systemsBuilt.length * 2 + layers;
}

export function sortCaseStudies(
  studies: CaseStudy[],
  mode: ProofSortMode,
  rankBySlug: Map<string, number> | null = null
): CaseStudy[] {
  const next = [...studies];
  if (mode === "default") {
    if (rankBySlug) {
      next.sort((a, b) => (rankBySlug.get(a.slug) ?? 0) - (rankBySlug.get(b.slug) ?? 0));
    }
    return next;
  }

  if (mode === "extreme-outcome") {
    next.sort((a, b) => metricMagnitude(b) - metricMagnitude(a));
    return next;
  }

  if (mode === "newest") {
    next.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    return next;
  }

  next.sort((a, b) => complexityScore(b) - complexityScore(a));
  return next;
}

export type ProofHubFacets = {
  outcomes: Set<OutcomeSlug>;
  outcomeTags: Set<OutcomeTag>;
  projectTypes: Set<ProjectTypeId>;
  buyerScenarios: Set<BuyerScenarioId>;
  complexity: Set<ProjectComplexity>;
  scopeShapes: Set<ScopeShape>;
};

function comparePublishedAtDescending(left: CaseStudy, right: CaseStudy) {
  return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
}

/**
 * Default Proof Hub order should help buyers scan across project shapes before
 * they encounter a second proof from the same cluster. We round-robin through
 * project types, prefer featured anchors inside each type, and lightly
 * penalize repeated client names to reduce company clustering.
 */
export function buildProofHubDefaultRankMap(caseStudies: CaseStudy[]): Map<string, number> {
  const clientFrequency = caseStudies.reduce<Map<string, number>>((counts, study) => {
    counts.set(study.clientName, (counts.get(study.clientName) ?? 0) + 1);
    return counts;
  }, new Map());

  const studiesByProjectType = new Map(
    PROJECT_TYPE_ORDER.map((projectType) => [projectType, [] as CaseStudy[]])
  );

  for (const study of caseStudies) {
    const bucket = studiesByProjectType.get(study.projectType);
    if (bucket) {
      bucket.push(study);
    }
  }

  for (const bucket of studiesByProjectType.values()) {
    bucket.sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      const leftClientFrequency = clientFrequency.get(left.clientName) ?? 0;
      const rightClientFrequency = clientFrequency.get(right.clientName) ?? 0;
      if (leftClientFrequency !== rightClientFrequency) {
        return leftClientFrequency - rightClientFrequency;
      }

      return comparePublishedAtDescending(left, right);
    });
  }

  const rankBySlug = new Map<string, number>();
  let rank = 0;
  let added = true;

  while (added) {
    added = false;

    for (const projectType of PROJECT_TYPE_ORDER) {
      const nextStudy = studiesByProjectType.get(projectType)?.shift();
      if (!nextStudy) {
        continue;
      }

      rankBySlug.set(nextStudy.slug, rank);
      rank += 1;
      added = true;
    }
  }

  return rankBySlug;
}

/**
 * Applies the multi-select facet predicates without touching search ordering,
 * so search-driven order is preserved when active.
 */
export function applyFacets(studies: CaseStudy[], facets: ProofHubFacets): CaseStudy[] {
  const { outcomes, outcomeTags, projectTypes, buyerScenarios, complexity, scopeShapes } = facets;
  if (
    outcomes.size === 0 &&
    outcomeTags.size === 0 &&
    projectTypes.size === 0 &&
    buyerScenarios.size === 0 &&
    complexity.size === 0 &&
    scopeShapes.size === 0
  ) {
    return studies;
  }
  return studies.filter((study) => {
    if (outcomes.size > 0 && !outcomes.has(study.primaryOutcomeSlug)) return false;
    if (outcomeTags.size > 0) {
      const hasMatch = study.outcomeTags.some((tag) => outcomeTags.has(tag));
      if (!hasMatch) return false;
    }
    if (projectTypes.size > 0 && !projectTypes.has(study.projectType)) return false;
    if (buyerScenarios.size > 0 && !buyerScenarios.has(study.buyerScenario)) return false;
    if (complexity.size > 0 && !complexity.has(study.projectComplexity)) return false;
    if (scopeShapes.size > 0 && !scopeShapes.has(study.scopeShape)) return false;
    return true;
  });
}
