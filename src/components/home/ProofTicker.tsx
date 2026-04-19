import type { ProofMetric } from "@/types";

type ProofTickerProps = {
  metrics: ProofMetric[];
};

export function ProofTicker({ metrics }: ProofTickerProps) {
  return (
    <div
      className="border-y border-[#F5F4F0]/10 bg-[#161618] px-4 py-4 md:px-8"
      aria-label="Proof metrics"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-between">
        {metrics.map((metric) => (
          <li
            key={`${metric.value}-${metric.label}`}
            className="font-mono text-xs tracking-tight text-[#F5F4F0]/88 md:text-sm"
          >
            <span className="text-[#0FD9C8]">{metric.value}</span>
            <span className="text-[#F5F4F0]/55"> — {metric.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
