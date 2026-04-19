import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ProblemPage } from "@/types";

type ProblemCardProps = {
  problem: ProblemPage;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <article className="surface-card surface-card-interactive group rounded-[2rem] p-7">
      <Eyebrow>{problem.hubCategory}</Eyebrow>
      <h3 className="font-display text-balance mt-4 text-2xl font-semibold">{problem.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{problem.heroSubhead}</p>
      <p className="mt-5 font-mono text-xs leading-relaxed text-[#22C55E]/95 md:text-sm">{problem.proofChip}</p>
      <Link
        href={`/problems/${problem.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#F05A28] transition-all group-hover:text-[#ff6d40] group-hover:gap-2"
      >
        {problem.hubCtaLabel}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}
