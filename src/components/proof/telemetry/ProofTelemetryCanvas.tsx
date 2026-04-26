"use client";

import dynamic from "next/dynamic";
import type { ProofVisualizerType } from "@/types";
import type { TelemetryVizBaseProps } from "./telemetry-viz-types";

const StackVisualizer = dynamic(() => import("./visuals/StackVisualizer"), { ssr: false });
const LogicVisualizer = dynamic(() => import("./visuals/LogicVisualizer"), { ssr: false });
const TargetVisualizer = dynamic(() => import("./visuals/TargetVisualizer"), { ssr: false });
const MergeVisualizer = dynamic(() => import("./visuals/MergeVisualizer"), { ssr: false });
const PulseVisualizer = dynamic(() => import("./visuals/PulseVisualizer"), { ssr: false });
const TrendVisualizer = dynamic(() => import("./visuals/TrendVisualizer"), { ssr: false });

export type ProofTelemetryCanvasProps = TelemetryVizBaseProps & {
  type: ProofVisualizerType;
  instanceId: string;
};

export function ProofTelemetryCanvas({ type, fixDeployed, reducedMotion, instanceId }: ProofTelemetryCanvasProps) {
  const common: TelemetryVizBaseProps = { fixDeployed, reducedMotion, instanceId };
  switch (type) {
    case "stack":
      return <StackVisualizer {...common} />;
    case "logic":
      return <LogicVisualizer {...common} />;
    case "target":
      return <TargetVisualizer {...common} />;
    case "merge":
      return <MergeVisualizer {...common} />;
    case "pulse":
      return <PulseVisualizer {...common} />;
    case "trend":
      return <TrendVisualizer {...common} />;
    default:
      return <MergeVisualizer {...common} />;
  }
}
