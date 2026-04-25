"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import { cn } from "@/lib/utils";

type ViewCanvasProps = {
  className?: string;
  eventSource?: HTMLElement;
};

export function ViewCanvas({ className, eventSource }: ViewCanvasProps) {
  return (
    <Canvas
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
      dpr={[1, 2]}
      shadows
      eventSource={eventSource}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
