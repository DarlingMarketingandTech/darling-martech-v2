import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  );
}
