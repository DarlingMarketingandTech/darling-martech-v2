import { cn } from "@/lib/utils";
import type { TelemetryVizBaseProps } from "../telemetry-viz-types";

export default function TargetVisualizer({ fixDeployed, reducedMotion }: TelemetryVizBaseProps) {
  const locked = fixDeployed || reducedMotion;
  return (
    <div className="flex h-[220px] items-center justify-center md:h-[260px]" aria-hidden>
      <div className="relative flex h-40 w-40 items-center justify-center md:h-44 md:w-44">
        {[72, 54, 36].map((size, ring) => (
          <span
            key={ring}
            style={{ width: size, height: size }}
            className={cn(
              "absolute rounded-full border",
              locked
                ? "border-[#0FD9C8]/35 bg-[#0FD9C8]/05"
                : "border-[#F05A28]/25 bg-transparent",
              !reducedMotion && "motion-safe:transition-all motion-safe:duration-700",
              locked && ring === 0 && "shadow-[0_0_28px_-10px_rgba(15,217,200,0.45)]"
            )}
          />
        ))}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/45">icp</span>
      </div>
    </div>
  );
}
