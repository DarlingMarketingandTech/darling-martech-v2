import type { CaseStudy } from "@/types";

const DEFAULT_LIMIT = 4;

const SIMILARITY_WEIGHTS = {
  projectType: 6,
  buyerScenario: 3,
  primaryOutcomeSlug: 3,
  engagementFormat: 2,
  systemsBuilt: 1,
} as const;

function normalizeSystemName(system: string) {
  return system.trim().toLowerCase();
}

function getSharedSystemsCount(left: string[], right: string[]) {
  if (left.length === 0 || right.length === 0) {
    return 0;
  }

  const leftSystems = new Set(left.map(normalizeSystemName));

  return right.reduce((count, system) => {
    return leftSystems.has(normalizeSystemName(system)) ? count + 1 : count;
  }, 0);
}

function getSimilarityScore(current: CaseStudy, candidate: CaseStudy) {
  const sharedSystemsCount = getSharedSystemsCount(current.systemsBuilt, candidate.systemsBuilt);

  let score = 0;

  if (candidate.projectType === current.projectType) {
    score += SIMILARITY_WEIGHTS.projectType;
  }

  if (candidate.buyerScenario === current.buyerScenario) {
    score += SIMILARITY_WEIGHTS.buyerScenario;
  }

  if (candidate.primaryOutcomeSlug === current.primaryOutcomeSlug) {
    score += SIMILARITY_WEIGHTS.primaryOutcomeSlug;
  }

  if (candidate.engagementFormat === current.engagementFormat) {
    score += SIMILARITY_WEIGHTS.engagementFormat;
  }

  score += Math.min(sharedSystemsCount, 2) * SIMILARITY_WEIGHTS.systemsBuilt;

  return { score, sharedSystemsCount };
}

function comparePublishedAtDescending(left: CaseStudy, right: CaseStudy) {
  return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
}

function clampLimit(limit: number) {
  if (!Number.isFinite(limit)) {
    return DEFAULT_LIMIT;
  }

  return Math.max(1, Math.min(Math.floor(limit), DEFAULT_LIMIT));
}

export function getSimilarProof(
  caseStudy: CaseStudy,
  allCaseStudies: CaseStudy[],
  limit = DEFAULT_LIMIT
): CaseStudy[] {
  const safeLimit = clampLimit(limit);
  const studiesBySlug = new Map(allCaseStudies.map((study) => [study.slug, study]));

  const manualMatches = (caseStudy.relatedProofSlugs ?? [])
    .filter((slug) => slug !== caseStudy.slug)
    .map((slug) => studiesBySlug.get(slug))
    .filter((study): study is CaseStudy => Boolean(study));

  const manualSlugs = new Set(manualMatches.map((study) => study.slug));

  const scoredMatches = allCaseStudies
    .filter((candidate) => candidate.slug !== caseStudy.slug && !manualSlugs.has(candidate.slug))
    .map((candidate) => {
      const { score, sharedSystemsCount } = getSimilarityScore(caseStudy, candidate);

      return { candidate, score, sharedSystemsCount };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.sharedSystemsCount !== left.sharedSystemsCount) {
        return right.sharedSystemsCount - left.sharedSystemsCount;
      }

      return comparePublishedAtDescending(left.candidate, right.candidate);
    })
    .map(({ candidate }) => candidate);

  return [...manualMatches, ...scoredMatches].slice(0, safeLimit);
}
