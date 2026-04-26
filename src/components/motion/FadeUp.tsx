"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function FadeUp({ children, className, delay = 0, once = true }: FadeUpProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(rootRef, { once, margin: "-8% 0px -8% 0px" });

  return (
    <motion.div
      ref={rootRef}
      className={cn(className)}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(12px)" }}
      animate={
        inView
          ? prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 0.6, ease: [0.2, 0.85, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
