"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimateOnScrollProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
};

export function AnimateOnScroll({
  children,
  delay = 0,
  distance = 24,
  className,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
