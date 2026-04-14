import Link from "next/link";
import type { ProblemCluster, ProblemPage } from "@/types";
import { cn } from "@/lib/utils";

type ProblemNavProps = {
  problems: ProblemPage[];
  activeProblem: ProblemCluster;
};

export function ProblemNav({ problems, activeProblem }: ProblemNavProps) {
  return (
    <nav className="flex flex-wrap gap-3">
      {problems.map((problem) => (
        <Link
          key={problem.slug}
          href={`/problems/${problem.slug}`}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            problem.slug === activeProblem
              ? "border-[#F05A28] bg-[#F05A28]/10 text-[#F05A28]"
              : "border-[#F5F4F0]/10 text-[#F5F4F0]/64 hover:border-[#F05A28]/40 hover:text-[#F05A28]"
          )}
        >
          {problem.title}
        </Link>
      ))}
    </nav>
  );
}
