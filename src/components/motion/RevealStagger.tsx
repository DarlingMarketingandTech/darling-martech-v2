"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
};

export function RevealStagger({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
}: RevealStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={
        prefersReducedMotion
          ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }
      }
      transition={{ duration: 0.52, ease: [0.2, 0.85, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
