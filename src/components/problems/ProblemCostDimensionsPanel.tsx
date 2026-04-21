import type { ProblemCostDimensions } from "@/types";
import { cn } from "@/lib/utils";

const COST_ROWS: { key: keyof ProblemCostDimensions; label: string }[] = [
  { key: "lostRevenue", label: "Lost revenue" },
  { key: "missedLeads", label: "Missed leads" },
  { key: "operationalDrag", label: "Operational drag" },
  { key: "strategicConfusion", label: "Strategic confusion" },
];

type ProblemCostDimensionsPanelProps = {
  stakes: string;
  dimensions: ProblemCostDimensions;
  className?: string;
};

export function ProblemCostDimensionsPanel({ stakes, dimensions, className }: ProblemCostDimensionsPanelProps) {
  return (
    <div className={cn("rounded-3xl border border-[#F05A28]/26 bg-gradient-to-b from-[#F05A28]/8 to-[#13131A]/65 p-6 sm:rounded-4xl sm:p-8", className)}>
      <p className="meta-label text-[#F05A28]">What this actually costs</p>
      <h2 className="font-display mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-3xl">
        Four ways this shows up on revenue, pipeline, and throughput.
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/78 sm:text-[0.9375rem]">{stakes}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {COST_ROWS.map(({ key, label }) => (
          <li
            key={key}
            className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/40 px-4 py-4 sm:px-5 sm:py-5"
          >
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#0FD9C8]/88">{label}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/84">{dimensions[key]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
