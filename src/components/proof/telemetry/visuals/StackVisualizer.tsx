import { cn } from "@/lib/utils";
import type { TelemetryVizBaseProps } from "../telemetry-viz-types";

const HEIGHTS = [38, 52, 64, 72];

export default function StackVisualizer({ fixDeployed, reducedMotion }: TelemetryVizBaseProps) {
  const collapsed = fixDeployed || reducedMotion;
  return (
    <div
      className="flex h-[220px] items-end justify-center gap-2 pb-2 md:h-[260px] md:gap-3"
      aria-hidden
    >
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          style={{ height: collapsed ? undefined : `${h}%` }}
          className={cn(
            "w-11 rounded-t-md border md:w-12",
            collapsed
              ? i === 0
                ? "h-[72%] border-[#0FD9C8]/40 bg-[#0FD9C8]/12 shadow-[0_0_24px_-8px_rgba(15,217,200,0.35)]"
                : "h-[6%] border-[#F5F4F0]/10 bg-[#0C0C0E]/40 opacity-25"
              : "border-[#F05A28]/35 bg-[#F05A28]/12",
            !reducedMotion && "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out"
          )}
        />
      ))}
    </div>
  );
}
