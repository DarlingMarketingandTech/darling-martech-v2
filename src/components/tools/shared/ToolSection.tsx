import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ToolSection({ eyebrow, title, description, children, className }: ToolSectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);
  return (
    <section className={cn("surface-card rounded-3xl border border-white/5 p-6 md:p-8", className)}>
      {hasHeader ? (
        <header className="mb-6 space-y-2">
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#F05A28]">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2 className="font-display text-xl font-semibold text-[#F5F4F0] md:text-2xl">{title}</h2>
          ) : null}
          {description ? (
            <p className="text-sm leading-6 text-[#F5F4F0]/64 md:text-base md:leading-7">{description}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
