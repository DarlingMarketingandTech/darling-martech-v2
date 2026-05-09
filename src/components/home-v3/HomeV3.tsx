"use client";

import { Suspense, lazy } from "react";
import { HeroV3 } from "@/components/home-v3/HeroV3";
import { ProofTickerV3 } from "@/components/home-v3/ProofTickerV3";
import { BottleneckGridV3 } from "@/components/home-v3/BottleneckGridV3";
import { CapabilityProofGridV3 } from "@/components/home-v3/CapabilityProofGridV3";
import { DiagnosticBandV3 } from "@/components/home-v3/DiagnosticBandV3";
import {
  ToolsPreviewSkeleton,
  SelectedOutcomesSkeleton,
  ClosingCtaSkeleton,
} from "@/components/home-v3/skeletons";

// Lazy load below-fold sections for better initial page load
const SelectedOutcomesV3 = lazy(() =>
  import("@/components/home-v3/SelectedOutcomesV3").then((mod) => ({
    default: mod.SelectedOutcomesV3,
  }))
);

const ToolsPreviewV3 = lazy(() =>
  import("@/components/home-v3/ToolsPreviewV3").then((mod) => ({
    default: mod.ToolsPreviewV3,
  }))
);

const ClosingCtaV3 = lazy(() =>
  import("@/components/home-v3/ClosingCtaV3").then((mod) => ({
    default: mod.ClosingCtaV3,
  }))
);

export function HomeV3() {
  return (
    <>
      {/* Above-fold: eager load for fast LCP */}
      <HeroV3 />
      {/* Proof bar: immediate credibility below the hero */}
      <ProofTickerV3 />
      <BottleneckGridV3 />
      <CapabilityProofGridV3 />

      {/* Mid-page diagnostic band: low-trust audit CTA before proof/tools */}
      <DiagnosticBandV3 />

      {/* Below-fold: lazy load with skeleton fallbacks */}
      <Suspense fallback={<SelectedOutcomesSkeleton />}>
        <SelectedOutcomesV3 />
      </Suspense>

      <Suspense fallback={<ToolsPreviewSkeleton />}>
        <ToolsPreviewV3 />
      </Suspense>

      <Suspense fallback={<ClosingCtaSkeleton />}>
        <ClosingCtaV3 />
      </Suspense>
    </>
  );
}
