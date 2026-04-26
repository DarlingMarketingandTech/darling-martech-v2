import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ProofCard, type ProofCardSize } from "@/components/proof/ProofCard";
import { isQuantitativeProofMetric } from "@/lib/proof-metric";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";

type ProofGridProps = {
  caseStudies: CaseStudy[];
  showSystems?: boolean;
  /**
   * When true, renders a Bento-inspired weighted grid: hero outcomes occupy
   * larger tiles, supporting/narrative outcomes shrink. Defaults to false so
   * downstream contexts (problem pages, industry pages, related-proof rails)
   * keep their balanced 2-column rhythm.
   */
  weighted?: boolean;
};

/**
 * Combines magnitude (numeric primary metric), build complexity, and curation
 * priority into a single comparable score. Used purely for layout weighting —
 * source data and ordering are untouched.
 */
function studyWeight(study: CaseStudy): number {
  const metric = study.primaryMetric ?? study.metrics?.[0];
  let magnitude = 0;
  if (metric && isQuantitativeProofMetric(metric)) {
    const numericMatch = metric.value.match(/-?\d+(?:\.\d+)?/);
    if (numericMatch) magnitude = Math.abs(Number(numericMatch[0]));
  }
  const systemsScore = study.systemsBuilt.length * 6;
  const layersScore = (study.implementationLayers?.length ?? 0) * 2;
  const featuredBoost = study.featured ? 60 : 0;
  return magnitude + systemsScore + layersScore + featuredBoost;
}

function hasNumericPrimary(study: CaseStudy): boolean {
  const metric = study.primaryMetric ?? study.metrics?.[0];
  return Boolean(metric && isQuantitativeProofMetric(metric));
}

/**
 * Maps each visible study to a size variant. The first ranked entry becomes
 * the hero (`lg`) when there is enough breadth in the result set; very small
 * filtered subsets fall back to balanced `md` cards so layout never feels
 * unbalanced.
 */
function computeSizeMap(studies: CaseStudy[]): Map<string, ProofCardSize> {
  const map = new Map<string, ProofCardSize>();
  if (studies.length < 3) {
    studies.forEach((study) => map.set(study.slug, "md"));
    return map;
  }

  const ranked = [...studies].sort((a, b) => studyWeight(b) - studyWeight(a));
  const heroSlug = ranked[0]?.slug;

  studies.forEach((study) => {
    if (study.slug === heroSlug && hasNumericPrimary(study)) {
      map.set(study.slug, "lg");
      return;
    }
    if (!hasNumericPrimary(study)) {
      map.set(study.slug, "sm");
      return;
    }
    map.set(study.slug, "md");
  });
  return map;
}

export function ProofGrid({ caseStudies, showSystems, weighted = false }: ProofGridProps) {
  const sizeMap = weighted ? computeSizeMap(caseStudies) : null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-2",
        weighted && "grid-flow-dense"
      )}
    >
      {caseStudies.map((study, index) => {
        const size: ProofCardSize = sizeMap?.get(study.slug) ?? "md";
        const colSpan = size === "lg" ? "lg:col-span-2" : "lg:col-span-1";
        return (
          <AnimateOnScroll
            key={study.slug}
            delay={Math.min(index * 0.05, 0.25)}
            variant="fade"
            className={cn("h-full", weighted && colSpan)}
          >
            <ProofCard caseStudy={study} showSystems={showSystems} size={size} />
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
