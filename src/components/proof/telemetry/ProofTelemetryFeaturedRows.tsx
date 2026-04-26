import { ProofTelemetryRow } from "./ProofTelemetryRow";
import type { CaseStudy } from "@/types";

type ProofTelemetryFeaturedRowsProps = {
  caseStudies: CaseStudy[];
};

/**
 * Featured-only “proof log” telemetry blocks for the hub (max 3).
 * Non-featured work stays on {@link ProofCard} in the grid below.
 */
export function ProofTelemetryFeaturedRows({ caseStudies }: ProofTelemetryFeaturedRowsProps) {
  const rows = caseStudies.filter((c) => c.featured).slice(0, 3);
  if (rows.length === 0) return null;

  return (
    <div className="mt-10 space-y-8 md:mt-12 md:space-y-10" aria-label="Featured proof telemetry">
      <div>
        <p className="meta-label text-[#F05A28]/90">Featured telemetry</p>
        <p className="font-display mt-2 max-w-2xl text-balance text-lg font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-xl">
          Operating outcomes with architecture context — full dossiers stay one click away.
        </p>
      </div>
      {rows.map((study) => (
        <ProofTelemetryRow key={study.slug} caseStudy={study} />
      ))}
    </div>
  );
}
