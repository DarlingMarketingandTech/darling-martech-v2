"use client";

import { type ReactNode, useMemo } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticLinkProps = {
  children: ReactNode;
  className?: string;
  maxOffset?: number;
};

export function MagneticLink({ children, className, maxOffset = 6 }: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = useMemo(() => ({ stiffness: 240, damping: 18, mass: 0.4 }), []);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  if (prefersReducedMotion) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-flex will-change-transform", className)}
      style={{ x: smoothX, y: smoothY }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        x.set(px * (maxOffset * 2));
        y.set(py * (maxOffset * 2));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
