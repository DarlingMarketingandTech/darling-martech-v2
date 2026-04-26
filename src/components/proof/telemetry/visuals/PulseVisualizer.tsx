import { cn } from "@/lib/utils";
import type { TelemetryVizBaseProps } from "../telemetry-viz-types";

export default function PulseVisualizer({ fixDeployed, reducedMotion }: TelemetryVizBaseProps) {
  const steady = fixDeployed || reducedMotion;
  return (
    <div className="flex h-[220px] items-center justify-center gap-4 md:h-[260px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-24 w-3 rounded-full bg-[#F05A28]/35 md:h-28 md:w-3.5",
            steady && "bg-[#0FD9C8]/40",
            !steady && !reducedMotion && "motion-safe:animate-pulse",
            i === 1 && !steady && !reducedMotion && "motion-safe:delay-150",
            i === 2 && !steady && !reducedMotion && "motion-safe:delay-300"
          )}
        />
      ))}
    </div>
  );
}
