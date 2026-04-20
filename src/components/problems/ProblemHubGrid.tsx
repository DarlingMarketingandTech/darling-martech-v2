import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ProblemCard } from "@/components/problems/ProblemCard";
import type { ProblemPage } from "@/types";

type ProblemHubGridProps = {
  problems: ProblemPage[];
  /** Use two columns on large screens (e.g. homepage 2×2). */
  layout?: "default" | "quad";
};

export function ProblemHubGrid({ problems, layout = "default" }: ProblemHubGridProps) {
  const gridClass =
    layout === "quad" ? "grid gap-6 md:grid-cols-2" : "grid gap-6 md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={gridClass}>
      {problems.map((problem, index) => (
        <AnimateOnScroll key={problem.slug} delay={index * 0.05} variant="fade">
          <ProblemCard problem={problem} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}
