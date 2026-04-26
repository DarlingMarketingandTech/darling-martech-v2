import type { CaseStudy } from "@/types";

/**
 * Surfaces structurally similar proof (project type + scope) for mid-trust discovery.
 * Excludes the current slug and manual related list is unioned in the page when needed.
 */
export function getSimilarCaseStudies(
  study: CaseStudy,
  all: CaseStudy[],
  limit = 4
): CaseStudy[] {
  const others = all.filter((c) => c.slug !== study.slug);
  const sameType = others.filter(
    (c) => c.projectType === study.projectType && c.scopeShape === study.scopeShape
  );
  const sameTypeOnly = others.filter((c) => c.projectType === study.projectType);
  const ranked = sameType.length > 0 ? sameType : sameTypeOnly;
  return ranked.slice(0, limit);
}
