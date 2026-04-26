"use client";

import Link from "next/link";
import { useReducedMotion, useSpring, useMotionValue, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_OFFSET = 3;
const SPRING = { stiffness: 380, damping: 32, mass: 0.35 };

type HomepageHeroPrimaryCtaProps = {
  href: string;
  children: React.ReactNode;
};

/**
 * Subtle magnetic pull toward cursor for the homepage primary CTA only.
 * Magnetic offset is off until after mount and when `prefers-reduced-motion` is false, so the hero hydrates cleanly.
 */
export function HomepageHeroPrimaryCta({ href, children }: HomepageHeroPrimaryCtaProps) {
  const [motionReady, setMotionReady] = useState(false);
  useEffect(() => {
    setMotionReady(true);
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  /** Same DOM on server + first client paint; magnetic spring only after mount and only when motion is allowed. */
  const magneticEnabled = motionReady && prefersReducedMotion === false;

  const onMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!magneticEnabled || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = ((event.clientX - cx) / rect.width) * 2 * MAX_OFFSET;
      const ny = ((event.clientY - cy) / rect.height) * 2 * MAX_OFFSET;
      x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, nx)));
      y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, ny)));
    },
    [magneticEnabled, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const classes = cn(buttonVariants({ variant: "primary", size: "lg" }));

  return (
    <motion.div
      ref={wrapRef}
      className="inline-flex will-change-transform"
      style={{ x: magneticEnabled ? springX : 0, y: magneticEnabled ? springY : 0 }}
      onMouseMove={magneticEnabled ? onMove : undefined}
      onMouseLeave={magneticEnabled ? onLeave : undefined}
    >
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.div>
  );
}
