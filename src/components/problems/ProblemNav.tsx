import Link from "next/link";
import type { ProblemCluster, ProblemPage } from "@/types";
import { problemHubMetaLabel } from "@/lib/problem-hub-label";
import { cn } from "@/lib/utils";

type ProblemNavProps = {
  problems: ProblemPage[];
  activeProblem: ProblemCluster;
};

export function ProblemNav({ problems, activeProblem }: ProblemNavProps) {
  return (
    <nav
      aria-label="Other buyer problems"
      className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {problems.map((problem) => (
        <Link
          key={problem.slug}
          href={`/problems/${problem.slug}`}
          title={problem.title}
          aria-current={problem.slug === activeProblem ? "page" : undefined}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors min-[480px]:py-2",
            problem.slug === activeProblem
              ? "border-[#F05A28] bg-[#F05A28]/10 text-[#F05A28]"
              : "border-[#F5F4F0]/10 text-[#F5F4F0]/64 hover:border-[#F05A28]/40 hover:text-[#F05A28]"
          )}
        >
          {problemHubMetaLabel(problem.slug)}
        </Link>
      ))}
    </nav>
  );
}
