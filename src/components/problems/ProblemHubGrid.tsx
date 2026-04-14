import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ProblemCard } from "@/components/problems/ProblemCard";
import type { ProblemPage } from "@/types";

type ProblemHubGridProps = {
  problems: ProblemPage[];
};

export function ProblemHubGrid({ problems }: ProblemHubGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {problems.map((problem, index) => (
        <AnimateOnScroll key={problem.slug} delay={index * 0.05}>
          <ProblemCard problem={problem} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}
