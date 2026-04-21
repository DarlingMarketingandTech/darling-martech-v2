import Link from "next/link";
import { OUTCOME_SLUG_LABELS } from "@/data/taxonomy";
import type { CaseStudy } from "@/types";
import { getBuyerStateLabel, getCaseStudyBuyerState } from "@/lib/buyer-state";
import { cn } from "@/lib/utils";

type ProofCardProps = {
  caseStudy: CaseStudy;
  showSystems?: boolean;
};

export function ProofCard({ caseStudy, showSystems = true }: ProofCardProps) {
  const outcomeLabel = OUTCOME_SLUG_LABELS[caseStudy.primaryOutcomeSlug];
  const buyerStateTag = getBuyerStateLabel(getCaseStudyBuyerState(caseStudy));

  return (
    <Link
      href={`/proof/${caseStudy.slug}`}
      className={cn(
        "ui-card-motion group block h-full rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]"
      )}
    >
      <article
        className={cn(
          "panel-obsidian panel-interactive grain-mask relative flex h-full flex-col overflow-hidden rounded-4xl p-7 md:p-8",
          "shadow-[0_18px_48px_rgba(0,0,0,0.36)] transition-shadow duration-300",
          "group-hover:shadow-[0_24px_56px_rgba(0,0,0,0.45),0_0_40px_-12px_rgba(240,90,40,0.12)]"
        )}
      >
        <span
          className="absolute left-6 top-0 z-1 block h-0.5 w-10 rounded-full bg-linear-to-r from-[#F05A28]/85 to-[#F05A28]/10 transition-[width,opacity] duration-300 ease-out group-hover:w-20 group-hover:opacity-100 md:left-8"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_0%_0%,rgba(240,90,40,0.06),transparent_50%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />

        <div className="relative z-2 flex flex-wrap items-center gap-2">
          <p className="meta-label-accent">{outcomeLabel}</p>
          <span className="rounded-full border border-[#F5F4F0]/14 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#F5F4F0]/68">
            {buyerStateTag}
          </span>
        </div>
        <p className="relative z-2 font-mono mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/38">
          ref · {caseStudy.slug}
        </p>

        <div className="relative z-2 tech-divider mt-5" />

        <p className="relative z-2 font-display mt-5 text-3xl font-semibold tracking-[-0.02em] text-[#0FD9C8] md:text-[2.125rem] md:leading-tight">
          {caseStudy.outcomeHeadline}
        </p>

        <div className="relative z-2 tech-divider my-5 max-w-md" />

        <p className="relative z-2 flex-1 text-base leading-7 text-[#F5F4F0]/74">{caseStudy.resultSummary}</p>

        <p className="relative z-2 meta-label mt-8 text-[#F5F4F0]/42">
          {caseStudy.clientName} · {caseStudy.clientContext}
        </p>

        {showSystems ? (
          <div className="relative z-2 mt-4 flex flex-wrap gap-2">
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

        <span className="ui-link-motion relative z-2 mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#F05A28] duration-200 group-hover:gap-2 group-hover:text-[#ff6d40]">
          Read full proof
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </article>
    </Link>
  );
}
