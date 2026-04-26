import { ProofTelemetryRow } from "./ProofTelemetryRow";
import type { CaseStudy, ProjectTypeId } from "@/types";

type ProofTelemetryFeaturedRowsProps = {
  caseStudies: CaseStudy[];
};

const FEATURED_ROW_LIMIT = 4;

const PRIORITY_PROJECT_TYPES: ProjectTypeId[] = [
  "crm-automation-system",
  "custom-infrastructure-product",
  "local-growth-system",
  "brand-identity-system",
];

function selectFeaturedRows(caseStudies: CaseStudy[], limit = FEATURED_ROW_LIMIT) {
  const clientFrequency = caseStudies.reduce<Map<string, number>>((counts, study) => {
    counts.set(study.clientName, (counts.get(study.clientName) ?? 0) + 1);
    return counts;
  }, new Map());

  const selectedSlugs = new Set<string>();
  const rows: CaseStudy[] = [];

  const sortedByDiversity = [...caseStudies].sort((left, right) => {
    const leftClientFrequency = clientFrequency.get(left.clientName) ?? 0;
    const rightClientFrequency = clientFrequency.get(right.clientName) ?? 0;

    if (leftClientFrequency !== rightClientFrequency) {
      return leftClientFrequency - rightClientFrequency;
    }

    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    return 0;
  });

  for (const projectType of PRIORITY_PROJECT_TYPES) {
    const match = sortedByDiversity.find(
      (study) => study.projectType === projectType && !selectedSlugs.has(study.slug)
    );

    if (!match) {
      continue;
    }

    selectedSlugs.add(match.slug);
    rows.push(match);

    if (rows.length >= limit) {
      return rows;
    }
  }

  const featuredByProjectType = sortedByDiversity.filter(
    (study) => study.featured && !selectedSlugs.has(study.slug)
  );

  for (const study of featuredByProjectType) {
    selectedSlugs.add(study.slug);
    rows.push(study);

    if (rows.length >= limit) {
      break;
    }
  }

  return rows;
}

/**
 * Representative “proof log” telemetry blocks for the hub.
 * First pass prioritizes one-per-project-type variety, then falls back to featured anchors.
 */
export function ProofTelemetryFeaturedRows({ caseStudies }: ProofTelemetryFeaturedRowsProps) {
  const rows = selectFeaturedRows(caseStudies);
  if (rows.length === 0) return null;

  return (
    <div className="mt-10 space-y-8 md:mt-12 md:space-y-10" aria-label="Featured proof telemetry">
      <div>
        <p className="meta-label text-[#F05A28]/90">Featured projects</p>
        <p className="font-display mt-2 max-w-2xl text-balance text-lg font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-xl">
          Outcomes with implementation context — full case studies stay one click away.
        </p>
      </div>
      {rows.map((study) => (
        <ProofTelemetryRow key={study.slug} caseStudy={study} />
      ))}
    </div>
  );
}
