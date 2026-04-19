"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/lib/lenis";

/**
 * Opt-in smooth-scroll wrapper. Mount on a single route layout (e.g. the
 * Studio route) to pair Lenis with scroll-scrubbed GSAP surfaces like
 * `DiagnosticHudCard`. The underlying hook is reduced-motion aware and
 * wires `ScrollTrigger.update` internally.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
