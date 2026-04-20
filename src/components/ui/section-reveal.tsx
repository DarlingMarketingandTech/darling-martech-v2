"use client";

import type { ReactNode } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  motion?: "rise" | "fade";
};

export function SectionReveal({ children, className, delay = 0, motion = "fade" }: SectionRevealProps) {
  return (
    <AnimateOnScroll className={className} delay={delay} variant={motion}>
      {children}
    </AnimateOnScroll>
  );
}
