import type { ProofMetric } from "@/types";

type ProofTickerProps = {
  metrics: ProofMetric[];
};

export function ProofTicker({ metrics }: ProofTickerProps) {
  return (
    <div
      className="border-y border-[#F5F4F0]/10 bg-[#121216] px-4 py-5 md:px-8"
      aria-label="Proof metrics"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
        {metrics.map((metric) => (
          <li
            key={`${metric.value}-${metric.label}`}
            className="font-mono text-[11px] font-medium tracking-tight text-[#F5F4F0]/82 md:text-xs"
          >
            <span className="font-bold tabular-nums text-[#0FD9C8]">{metric.value}</span>
            <span className="text-[#F5F4F0]/50"> — {metric.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
