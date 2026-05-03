"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Button } from "@/components/ui/button";

const SIGNATURE_BEATS = [
  { label: "ownership", value: "One point of accountability from planning through implementation." },
  { label: "execution", value: "Practical work shipped in the real stack, not slideware." },
  { label: "continuity", value: "Adjustments based on real performance, not one-time handoff." },
] as const;

export function OwnerStatementV3() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <BleedSection className="relative overflow-hidden py-20 md:py-28">
      {/* Atmospherics */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(45% 35% at 80% 20%, rgba(15,217,200,0.08) 0%, rgba(15,217,200,0) 70%), radial-gradient(40% 35% at 15% 90%, rgba(240,90,40,0.10) 0%, rgba(240,90,40,0) 70%)",
        }}
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        {/* Portrait composition */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.85, 0.25, 1] }}
          className="relative mx-auto w-full max-w-[460px] lg:mx-0"
        >
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(240,90,40,0.18)_0%,rgba(240,90,40,0)_70%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-[#F5F4F0]/12 bg-[#0F1012]/70 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur">
            <div className="aspect-4/5 w-full">
              <CloudinaryImage
                publicId="studio/jacob-portrait"
                alt="Jacob Darling, founder and operating owner"
                width={920}
                height={1150}
                sizes="(min-width: 1024px) 460px, 90vw"
                className="size-full object-cover"
                postTransforms="e_sharpen"
              />
            </div>
            {/* Caption strip */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-[#F5F4F0]/10 bg-[#0C0C0E]/80 px-5 py-4 backdrop-blur">
              <div>
                <p className="font-syne text-base font-medium text-[#F5F4F0]">Jacob Darling</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#F5F4F0]/56">
                  Founder · Operating Owner
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#0FD9C8]/90">
                <MapPin className="size-3" />
                Indianapolis
              </span>
            </div>
            {/* Top scan line accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(15,217,200,0.6)_50%,transparent_100%)]" />
          </div>

          {/* Floating signature card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.2, 0.85, 0.25, 1] }}
            className="absolute -right-4 -top-4 hidden rotate-[2.5deg] rounded-xl border border-[#F05A28]/30 bg-[#0F1012]/85 px-3.5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#F05A28] shadow-[0_20px_50px_rgba(240,90,40,0.18)] backdrop-blur md:block"
          >
            <span className="block text-[#F5F4F0]/56">est.</span>
            <span className="block text-base font-medium tracking-tight text-[#F5F4F0]">15+ yrs</span>
          </motion.div>
        </motion.div>

        {/* Statement */}
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#0FD9C8]/80">Owner Statement</p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-[#F5F4F0] md:text-[3rem]">
            One accountable operator,{" "}
            <span className="bg-[linear-gradient(180deg,#FF7A4A_0%,#F05A28_100%)] bg-clip-text text-transparent">
              not a handoff chain.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#F5F4F0]/74 md:text-lg">
            I stay responsible from planning through implementation. No strategy deck
            handoff, no fragmented execution, and no confusion about who owns outcomes.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#F5F4F0]/72">
            That continuity keeps momentum intact: one operating owner, one clear
            scoreboard, and one plan that stays connected to real performance.
          </p>

          <ul className="mt-7 space-y-3">
            {SIGNATURE_BEATS.map((beat, idx) => (
              <motion.li
                key={beat.label}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: [0.2, 0.85, 0.25, 1] }}
                className="flex items-baseline gap-4 border-l border-[#F5F4F0]/12 pl-4"
              >
                <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#F05A28]">
                  {String(idx + 1).padStart(2, "0")} · {beat.label}
                </span>
                <span className="text-[0.95rem] leading-relaxed text-[#F5F4F0]/82">{beat.value}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={homepageData.closingCta.readyLink.href} size="lg" className="gap-2">
              {homepageData.closingCta.readyLink.label}
              <ArrowUpRight className="size-4" />
            </Button>
            <Button href="/about" variant="ghost" size="lg" className="text-[#F5F4F0]">
              How I work
            </Button>
          </div>
        </div>
      </div>
    </BleedSection>
  );
}
