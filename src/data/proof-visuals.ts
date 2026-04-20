import type { CaseStudy } from "@/types";

/**
 * Short list of the strongest generic stitch heroes. Only these rotate in for
 * case studies without a dedicated `studio/...` asset — keeps sub-pages visually consistent.
 */
const CURATED_PROOF_HERO_BEST = [
  "curated/proof-detail/modular-system-path",
  "curated/proof-detail/network-cluster-structured",
  "curated/proof-detail/automated-data-flow",
  "curated/proof-detail/macro-infrastructure-node",
] as const;

function slugCharSum(slug: string): number {
  let n = 0;
  for (let i = 0; i < slug.length; i += 1) {
    n += slug.charCodeAt(i);
  }
  return n;
}

/**
 * Single hero image per proof detail: client `studio/...` when present, otherwise
 * one curated asset from the short “best” list (deterministic per slug).
 */
export function getProofDetailHeroPublicId(study: CaseStudy): string {
  const first = study.cloudinaryImages?.[0];
  if (first) {
    return first;
  }
  const idx = slugCharSum(study.slug) % CURATED_PROOF_HERO_BEST.length;
  return CURATED_PROOF_HERO_BEST[idx]!;
}
