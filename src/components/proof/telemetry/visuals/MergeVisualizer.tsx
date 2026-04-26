import { cn } from "@/lib/utils";
import type { TelemetryVizBaseProps } from "../telemetry-viz-types";

export default function MergeVisualizer({ fixDeployed, reducedMotion }: TelemetryVizBaseProps) {
  const merged = fixDeployed || reducedMotion;
  return (
    <div className="flex h-[220px] flex-col items-center justify-center gap-3 md:h-[260px]" aria-hidden>
      <div className="flex w-full max-w-xs justify-between gap-4 px-4">
        <div
          className={cn(
            "h-16 flex-1 rounded-xl border border-dashed border-[#F05A28]/40 bg-[#F05A28]/08",
            !reducedMotion && "motion-safe:transition-all motion-safe:duration-700",
            merged && "motion-safe:translate-x-6 motion-safe:scale-90 opacity-30"
          )}
        />
        <div
          className={cn(
            "h-16 flex-1 rounded-xl border border-dashed border-[#F05A28]/40 bg-[#F05A28]/08",
            !reducedMotion && "motion-safe:transition-all motion-safe:duration-700",
            merged && "motion-safe:-translate-x-6 motion-safe:scale-90 opacity-30"
          )}
        />
      </div>
      <div
        className={cn(
          "h-14 w-2/3 max-w-56 rounded-xl border border-[#0FD9C8]/40 bg-[#0FD9C8]/10",
          !reducedMotion && "motion-safe:transition-all motion-safe:duration-700",
          merged ? "opacity-100" : "motion-safe:scale-75 opacity-20"
        )}
      />
    </div>
  );
}
