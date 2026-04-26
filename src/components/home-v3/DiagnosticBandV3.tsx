"use client";

import { ArrowRight, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { Button } from "@/components/ui/button";

export function DiagnosticBandV3() {
  const prefersReducedMotion = useReducedMotion();
  const data = homepageData.diagnosticBand;

  return (
    <BleedSection tone="orange" className="relative overflow-hidden py-16 md:py-24">
      {/* Sweep highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_20%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_60%)]"
        initial={prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.85, 0.25, 1] }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(180deg, black 30%, transparent 100%)",
        }}
      />

      {/* Animated waveform on the right */}
      {!prefersReducedMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 hidden h-24 -translate-y-1/2 items-end gap-1 md:flex"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="block w-1 origin-bottom rounded-full bg-white/55"
              animate={{ scaleY: [0.25, 0.95, 0.4, 0.7, 0.25] }}
              transition={{
                duration: 1.8 + (i % 4) * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.06,
              }}
              style={{ height: 12 + (i % 6) * 8 }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-white">
            <Activity className="size-3.5" />
            Free diagnostic intake
          </p>
          <h2 className="mt-4 font-syne text-3xl leading-[1.04] tracking-[-0.01em] text-white md:text-[3.4rem]">
            {data.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {data.body}
          </p>
        </div>
        <Button
          href={data.cta.href}
          size="lg"
          className="group gap-2 border-0 bg-white text-[#F05A28] shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:bg-white/95 hover:text-[#F05A28]"
        >
          {data.cta.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </BleedSection>
  );
}
