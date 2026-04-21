import Link from "next/link";
import type { CaseStudy } from "@/types";

type ServiceProofConnectionProps = {
  serviceTitle: string;
  caseStudy: CaseStudy;
};

export function ServiceProofConnection({ serviceTitle, caseStudy }: ServiceProofConnectionProps) {
  if (!caseStudy) return null;

  return (
    <section
      className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-6 py-10 md:px-9 md:py-12"
      aria-labelledby="service-proof-heading"
    >
      <p className="meta-label text-[#F05A28]/90">Documented evidence</p>
      <h2
        id="service-proof-heading"
        className="font-display mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl"
      >
        Proof tied to {serviceTitle}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/58 md:text-[0.9375rem]">
        One relevant case study, selected for this capability, so proof supports the decision instead of competing with
        it.
      </p>

      <div className="mt-8 rounded-3xl border border-[#F5F4F0]/10 bg-[#111118]/65 p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5F4F0]/40">Featured proof</p>
        <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-[#0FD9C8] md:text-[2.3rem]">
          {caseStudy.outcomeHeadline}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/72 md:text-base">
          {caseStudy.resultSummary}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[#F5F4F0]/45">
          {caseStudy.clientName} · {caseStudy.clientContext}
        </p>
        <Link
          href={`/proof/${caseStudy.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#F05A28] transition-colors hover:text-[#ff6d40]"
        >
          Read full proof
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
