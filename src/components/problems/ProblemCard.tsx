import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ProblemPage } from "@/types";

type ProblemCardProps = {
  problem: ProblemPage;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <article className="panel-obsidian panel-interactive grain-mask group rounded-4xl p-7 md:p-8">
      <Eyebrow>{problem.hubCategory}</Eyebrow>
      <div className="tech-divider mt-3 max-w-xs" />
      <h3 className="font-display mt-4 text-balance text-2xl font-semibold leading-snug tracking-[-0.02em]">
        {problem.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-[#F5F4F0]/72">{problem.heroSubhead}</p>
      <div className="tech-divider mt-6" />
      <p className="mt-4 font-mono text-xs font-medium leading-relaxed tracking-tight text-[#0FD9C8] md:text-[0.8125rem]">
        {problem.proofChip}
      </p>
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
