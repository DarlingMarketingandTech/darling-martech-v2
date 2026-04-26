"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { RevealItem, RevealStagger } from "@/components/motion";

export function ProcessColumnsV3() {
  const prefersReducedMotion = useReducedMotion();
  const { processSection } = homepageData;

  return (
    <BleedSection
      tone="metal"
      className="relative overflow-hidden border-y border-[#F5F4F0]/8 py-20 md:py-28"
    >
      {/* Background grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,244,240,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,240,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 100% at 50% 50%, black 30%, transparent 75%)",
        }}
      />
      {/* Soft diagonal beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(240,90,40,0.14)_0%,rgba(240,90,40,0)_70%)] blur-3xl"
      />

      <div className="relative mb-12 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#0FD9C8]/80">
          {processSection.eyebrow}
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
          {processSection.headline}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
          {processSection.body}
        </p>
      </div>

      <div className="relative">
        {/* Horizontal connector line — desktop only */}
        <motion.div
          className="absolute left-0 right-0 top-[44px] hidden h-px origin-left bg-[linear-gradient(90deg,rgba(240,90,40,0.6)_0%,rgba(240,90,40,0.15)_50%,rgba(15,217,200,0.4)_100%)] md:block"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 1.1, ease: [0.2, 0.85, 0.25, 1] }}
        />
        {/* Pulse traveling along the line */}
        {!prefersReducedMotion ? (
          <motion.div
            aria-hidden
            className="absolute top-[40px] hidden h-2.5 w-2.5 rounded-full bg-[#F05A28] shadow-[0_0_28px_rgba(240,90,40,0.85)] md:block"
            initial={{ left: "-2%" }}
            animate={{ left: ["-2%", "100%"] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          />
        ) : null}

        <RevealStagger className="grid gap-12 md:grid-cols-3 md:gap-8" staggerChildren={0.18}>
          {processSection.columns.map((column, index) => (
            <RevealItem key={column.number} className="relative">
              {/* Numbered node */}
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative inline-flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-2xl border border-[#F05A28]/30 bg-[#0F1012]/85 font-mono text-3xl font-medium text-[#F05A28] shadow-[inset_0_1px_0_rgba(245,244,240,0.06),0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur">
                  {column.number}
                  <span className="absolute -inset-px rounded-2xl bg-[radial-gradient(60%_60%_at_50%_50%,rgba(240,90,40,0.25)_0%,rgba(240,90,40,0)_70%)] opacity-70" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#F5F4F0]/52">
                    Step 0{index + 1}
                  </span>
                  <h3 className="font-syne text-2xl leading-tight text-[#F5F4F0] md:text-[1.7rem]">
                    {column.title}
                  </h3>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#F5F4F0]/68 md:text-[0.95rem]">
                {column.body}
              </p>

              {/* Decorative micro-bracket */}
              <div className="mt-6 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#F5F4F0]/36">
                <span className="h-px w-10 bg-[#F5F4F0]/14" />
                <span>{index === 0 ? "system_intake" : index === 1 ? "system_build" : "system_run"}</span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </BleedSection>
  );
}
