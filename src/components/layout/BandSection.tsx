import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BandSectionProps = {
  children: ReactNode;
  className?: string;
  /** Anchor id for in-page links (e.g. `/process#timeline`). */
  id?: string;
};

export function BandSection({ children, className, id }: BandSectionProps) {
  return (
    <section
      id={id}
      className={cn("surface-band grain-mask rounded-4xl px-6 py-8 md:px-10 md:py-10", className)}
    >
      {children}
    </section>
  );
}
