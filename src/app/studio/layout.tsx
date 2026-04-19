import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

/**
 * Route-scoped layout that enables Lenis smooth scroll for the Studio only.
 * Pairs with the scroll-scrubbed `DiagnosticHudCard` and the R3F hero on
 * `/studio`. Other routes remain native-scroll so header anchors, modals,
 * and mobile gestures stay untouched.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
