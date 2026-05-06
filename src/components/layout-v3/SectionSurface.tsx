import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionSurfaceProps = {
  children: ReactNode;
  className?: string;
};

/** Solid section card — use instead of GlassPanel for grids and routine content; reserve glass for hero + closing CTA. */
export function SectionSurface({ children, className }: SectionSurfaceProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-foreground/8 bg-surface",
        className
      )}
    >
      {children}
    </div>
  );
}
