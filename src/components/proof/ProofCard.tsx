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
    <article className="panel-obsidian panel-interactive grain-mask group flex h-full flex-col rounded-4xl p-7 md:p-8">
      <p className="meta-label-accent">{outcomeLabel}</p>
      <p className="font-mono mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/38">
        ref · {caseStudy.slug}
      </p>

      <div className="tech-divider mt-5" />

      <p className="font-display mt-5 text-3xl font-semibold tracking-[-0.02em] text-[#0FD9C8] md:text-[2.125rem] md:leading-tight">
        {caseStudy.outcomeHeadline}
      </p>

      <div className="tech-divider my-5 max-w-md" />

      <p className="flex-1 text-base leading-7 text-[#F5F4F0]/74">{caseStudy.resultSummary}</p>

      <p className="meta-label mt-8 text-[#F5F4F0]/42">
        {caseStudy.clientName} · {caseStudy.clientContext}
      </p>

      {showSystems ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.systemsBuilt.map((system) => (
            <span
              key={system}
              className="rounded-md border border-[#F5F4F0]/12 bg-[#0C0C0E]/35 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/58"
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
