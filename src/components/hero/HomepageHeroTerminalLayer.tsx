"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FaultyTerminal = dynamic(() => import("@/components/FaultyTerminal"), {
  ssr: false,
  loading: () => null,
});

/**
 * CRT-style terminal wash over the existing `hero-mesh` background.
 * Client-only: underlying component reads `window` for DPR.
 */
export function HomepageHeroTerminalLayer() {
  const [disableForReducedMotion, setDisableForReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDisableForReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (disableForReducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22] mix-blend-soft-light contrast-[1.05] saturate-[1.08]"
      aria-hidden
    >
      <FaultyTerminal
        className="h-full min-h-full w-full"
        style={{ width: "100%", height: "100%", position: "relative", minHeight: "100%" }}
        scale={1.9}
        digitSize={2.7}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={0.3}
        noiseAmp={0.35}
        chromaticAberration={0.07}
        dither={0.25}
        curvature={0.15}
        tint="#d08753"
        mouseReact
        mouseStrength={0.5}
        brightness={0.6}
      />
    </div>
  );
}
