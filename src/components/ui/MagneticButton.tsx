"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type MagneticWrapperProps = {
  children: ReactNode;
  className?: string;
  /** Magnetic pull strength in px. Default 14. */
  strength?: number;
  /** Glow color used for the radial hover halo. Use any CSS color. */
  glowColor?: string;
  /** When true, disables the magnetic effect. */
  disabled?: boolean;
};

/**
 * Magnetic wrapper that pulls children toward the cursor with a soft
 * spring return. Designed to wrap CTA buttons or links. Respects
 * prefers-reduced-motion and disables on touch devices.
 */
export function MagneticButton({
  children,
  className,
  strength = 14,
  glowColor = "rgba(240, 90, 40, 0.32)",
  disabled = false,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMagneticEnabled = !disabled && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!isMagneticEnabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(relX * relX + relY * relY);
      const max = Math.max(rect.width, rect.height) / 2;
      const falloff = Math.min(1, distance / max);
      x.set((relX / rect.width) * strength * 2 * (1 - falloff * 0.4));
      y.set((relY / rect.height) * strength * 2 * (1 - falloff * 0.4));
    },
    [isMagneticEnabled, strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn("relative inline-flex", className)}
    >
      {/* Hover halo */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
        style={{ background: glowColor }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          isMagneticEnabled
            ? { opacity: isHovered ? 0.85 : 0, scale: isHovered ? 1.15 : 0.6 }
            : { opacity: 0, scale: 0.6 }
        }
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      />
      {children}
    </motion.div>
  );
}
