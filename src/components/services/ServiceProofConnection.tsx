import { ProofGrid } from "@/components/proof/ProofGrid";
import type { CaseStudy } from "@/types";

type ServiceProofConnectionProps = {
  serviceTitle: string;
  caseStudies: CaseStudy[];
};

export function ServiceProofConnection({ serviceTitle, caseStudies }: ServiceProofConnectionProps) {
  if (!caseStudies.length) return null;

  return (
    <section className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-5 py-10 md:px-9 md:py-12" aria-labelledby="service-proof-heading">
      <p className="meta-label text-[#F05A28]/90">Documented evidence</p>
      <h2 id="service-proof-heading" className="font-display mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
        Proof tied to {serviceTitle}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/58 md:text-[0.9375rem]">
        These engagements are indexed against this capability — not a generic portfolio grid. Open a case for metrics,
        constraints, and what was actually shipped.
      </p>
      <div className="mt-10">
        <ProofGrid caseStudies={caseStudies} />
      </div>
    </section>
  );
}
