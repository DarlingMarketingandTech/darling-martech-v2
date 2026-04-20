import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ProblemPage } from "@/types";

type ProblemPathwayStripProps = {
  eyebrow: string;
  headline: string;
  problems: ProblemPage[];
};

export function ProblemPathwayStrip({ eyebrow, headline, problems }: ProblemPathwayStripProps) {
  return (
    <section aria-labelledby="pathway-heading" className="mt-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="pathway-heading" className="font-display mt-3 text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {headline}
          </h2>
        </div>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {problems.map((problem) => (
          <Link
            key={problem.slug}
            href={`/problems/${problem.slug}`}
            className="surface-card surface-card-interactive group min-w-[min(100%,17.5rem)] shrink-0 snap-start rounded-4xl border border-[#F05A28]/20 p-5 md:min-w-0"
          >
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#F05A28]">{problem.hubCategory}</p>
            <p className="font-display mt-2 text-lg font-semibold leading-snug tracking-tight text-white">{problem.title}</p>
            <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-[#0FD9C8]/95 md:text-xs">{problem.proofChip}</p>
            <span className="mt-4 inline-flex text-sm font-medium text-[#F05A28] transition-colors group-hover:text-[#ff6d40]">
              {problem.hubCtaLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
