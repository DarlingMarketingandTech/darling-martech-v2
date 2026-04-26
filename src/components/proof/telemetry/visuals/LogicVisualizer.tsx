import { cn } from "@/lib/utils";
import type { TelemetryVizBaseProps } from "../telemetry-viz-types";

export default function LogicVisualizer({ fixDeployed, reducedMotion }: TelemetryVizBaseProps) {
  const merged = fixDeployed || reducedMotion;
  return (
    <div className="relative flex h-[220px] items-center justify-center md:h-[260px]" aria-hidden>
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-md text-[#F5F4F0]/25">
        <path
          d="M20 60 L70 30 L70 90 L20 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn(!reducedMotion && "motion-safe:transition-opacity motion-safe:duration-500", merged && "opacity-30")}
        />
        <path
          d="M20 60 L70 60 L120 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn(!reducedMotion && "motion-safe:transition-all motion-safe:duration-500", merged ? "opacity-100 text-[#0FD9C8]/55" : "opacity-40")}
        />
        <path
          d="M130 60 L180 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn("text-[#0FD9C8]", merged ? "opacity-100" : "opacity-25")}
        />
        <circle cx="180" cy="60" r="8" className={cn("fill-[#0FD9C8]/25", merged && "fill-[#0FD9C8]/55")} />
      </svg>
    </div>
  );
}
