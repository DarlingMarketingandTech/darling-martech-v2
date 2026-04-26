import { cn } from "@/lib/utils";
import type { TelemetryVizBaseProps } from "../telemetry-viz-types";

export default function TrendVisualizer({
  fixDeployed,
  reducedMotion,
  instanceId = "trend",
}: TelemetryVizBaseProps) {
  const up = fixDeployed || reducedMotion;
  const fillId = `${instanceId}-trend-fill`;
  return (
    <div className="flex h-[220px] items-end justify-center px-6 pb-4 md:h-[260px]" aria-hidden>
      <svg viewBox="0 0 240 100" className="h-full w-full max-w-md" preserveAspectRatio="none">
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0FD9C8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0FD9C8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 80 L40 75 L80 78 L120 55 L160 50 L200 35 L240 20 L240 100 L0 100 Z"
          fill={`url(#${fillId})`}
          className={cn(!reducedMotion && "motion-safe:transition-opacity motion-safe:duration-700", up ? "opacity-100" : "opacity-35")}
        />
        <path
          d="M0 80 L40 75 L80 78 L120 55 L160 50 L200 35 L240 20"
          fill="none"
          stroke="#0FD9C8"
          strokeWidth="2"
          className={cn(!reducedMotion && "motion-safe:transition-opacity motion-safe:duration-700", up ? "opacity-100" : "opacity-25")}
        />
        <path
          d="M0 80 L40 82 L80 88 L120 92 L160 88 L200 90 L240 85"
          fill="none"
          stroke="#F05A28"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={cn(!reducedMotion && "motion-safe:transition-opacity motion-safe:duration-700", up ? "opacity-25" : "opacity-80")}
        />
      </svg>
    </div>
  );
}
