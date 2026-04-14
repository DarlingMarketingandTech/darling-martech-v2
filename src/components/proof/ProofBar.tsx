import { MonoMetric } from "@/components/ui/MonoMetric";
import type { ProofMetric } from "@/types";

type ProofBarProps = {
  metrics: ProofMetric[];
};

export function ProofBar({ metrics }: ProofBarProps) {
  return (
    <section className="surface-band grain-mask rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MonoMetric key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </div>
    </section>
  );
}
