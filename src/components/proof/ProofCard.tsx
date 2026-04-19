import Link from "next/link";
import { OUTCOME_SLUG_LABELS } from "@/data/taxonomy";
import type { CaseStudy } from "@/types";

type ProofCardProps = {
  caseStudy: CaseStudy;
  showSystems?: boolean;
};

export function ProofCard({ caseStudy, showSystems = true }: ProofCardProps) {
  const outcomeLabel = OUTCOME_SLUG_LABELS[caseStudy.primaryOutcomeSlug];

  return (
    <article className="surface-card surface-card-interactive grain-mask group flex h-full flex-col rounded-[2rem] border border-[#F5F4F0]/8 p-7">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#0FD9C8]">{outcomeLabel}</p>

      <p className="font-display mt-4 text-3xl font-semibold tracking-tight text-[#22C55E] md:text-4xl">
        {caseStudy.outcomeHeadline}
      </p>

      <p className="mt-4 flex-1 text-base leading-7 text-[#F5F4F0]/72">{caseStudy.resultSummary}</p>

      <p className="mt-5 text-sm text-[#F5F4F0]/48">
        {caseStudy.clientName} · {caseStudy.clientContext}
      </p>

      {showSystems ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.systemsBuilt.map((system) => (
            <span
              key={system}
              className="rounded-full border border-[#F5F4F0]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#F5F4F0]/56"
            >
              {system}
            </span>
          ))}
        </div>
      ) : null}

      <Link
        href={`/proof/${caseStudy.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#F05A28] transition-all group-hover:text-[#ff6d40] group-hover:gap-2"
      >
        Read full proof
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}
