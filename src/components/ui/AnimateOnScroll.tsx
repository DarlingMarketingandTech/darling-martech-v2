"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimateOnScrollProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  /** `fade` keeps motion minimal; `rise` adds a short vertical travel */
  variant?: "rise" | "fade";
};

export function AnimateOnScroll({
  children,
  delay = 0,
  distance = 20,
  className,
  variant = "rise",
}: AnimateOnScrollProps) {
  const reduceMotion = useReducedMotion();
  const travel = variant === "fade" ? Math.min(distance, 12) : distance;
  const duration = variant === "fade" ? 0.38 : 0.44;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
