import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-foreground/10 bg-[linear-gradient(135deg,rgba(245,244,240,0.04),rgba(15,217,200,0.02))] backdrop-blur-md md:backdrop-blur-[18px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/45 to-transparent" />
      {children}
    </div>
  );
}
