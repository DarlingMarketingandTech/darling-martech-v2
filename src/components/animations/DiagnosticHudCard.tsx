"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SIGNALS = [
  "[DIAGNOSE]",
  "[STACK]",
  "[PIPELINE]",
  "[READY]",
] as const;

export type DiagnosticHudCardProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  signals?: readonly string[];
  className?: string;
};

/**
 * Learning reference: Framer Motion handles staged UI motion; GSAP ScrollTrigger
 * drives the signal trace when this block crosses the viewport. If you later
 * enable `useSmoothScroll()` on a layout, keep `ScrollTrigger.update` wired in
 * `src/lib/lenis.ts` so scrubbed tweens stay in sync.
 */
export function DiagnosticHudCard({
  eyebrow = "Motion stack",
  title = "Scroll-synced diagnostic readout",
  body = "Framer Motion staggers the tags. GSAP fills the trace bar the first time this card enters view.",
  signals = DEFAULT_SIGNALS,
  className,
}: DiagnosticHudCardProps) {
  const rootRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar) return;

    if (reduceMotion) {
      gsap.set(bar, { scaleX: 1, transformOrigin: "left center" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(bar, {
        scaleX: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 12,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#2a2a2e] bg-[#13131A] p-6 md:p-8",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-4 top-4 block h-5 w-5 border-l-2 border-t-2 border-[#F05A28]/40" />
        <span className="absolute right-4 top-4 block h-5 w-5 border-r-2 border-t-2 border-[#F05A28]/40" />
        <span className="absolute bottom-4 left-4 block h-5 w-5 border-b-2 border-l-2 border-[#0FD9C8]/35" />
        <span className="absolute bottom-4 right-4 block h-5 w-5 border-b-2 border-r-2 border-[#0FD9C8]/35" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="relative max-w-xl"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs font-normal uppercase tracking-widest text-[#F05A28]"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="font-display mt-3 text-balance text-2xl font-semibold tracking-tight text-[#F5F4F0] md:text-3xl"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-3 text-pretty text-sm leading-relaxed text-[#F5F4F0]/60 md:text-base"
        >
          {body}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap gap-2"
        >
          {signals.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-md border-[#0FD9C8]/35 bg-[#0C0C0E]/60 font-mono text-[11px] font-medium tracking-wide text-[#0FD9C8]"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#F5F4F0]/40">
            <span>Signal trace</span>
            <span>ScrollTrigger</span>
          </div>
          <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-[#2a2a2e]">
            <div
              ref={barRef}
              className="h-full w-full bg-linear-to-r from-[#F05A28] via-[#F05A28] to-[#0FD9C8]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
