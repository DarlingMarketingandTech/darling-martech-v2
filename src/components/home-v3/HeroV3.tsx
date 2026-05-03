"use client";

import { ArrowRight, Cpu, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { Button } from "@/components/ui/button";
import { GradientMesh, MagneticLink } from "@/components/motion";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const DIAGNOSTIC_LINES = [
  { label: "align", value: "brand, website, leads, follow-up, and reporting should work together" },
  { label: "start", value: "begin with what your business needs next" },
  { label: "connect", value: "build the right piece now, then connect the full system over time" },
] as const;

export function HeroV3() {
  const { hero } = homepageData;
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 16, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } };

  return (
    <BleedSection
      className="relative min-h-[92svh] overflow-hidden"
      innerClassName="relative pt-20 pb-24 md:pt-28 md:pb-32"
    >
      {/* Layered atmospherics */}
      <GradientMesh className="opacity-90" />

      {/* Cinematic infrastructure visual — right rail on desktop, faint behind on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
      >
        <div className="absolute inset-y-0 right-[-10%] hidden w-[78%] lg:block">
          <div className="relative h-full w-full">
            <CloudinaryImage
              publicId="curated/homepage/core-infrastructure-engine"
              alt=""
              width={1600}
              height={1200}
              priority
              sizes="(min-width: 1024px) 78vw, 100vw"
              className="h-full w-full object-cover object-left opacity-[0.42] mix-blend-screen"
              postTransforms="e_sharpen"
            />
            {/* Vignette so the visual blends into hero copy */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0C0C0E_4%,rgba(12,12,14,0.92)_28%,rgba(12,12,14,0.55)_55%,rgba(12,12,14,0.25)_85%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_50%,rgba(240,90,40,0.22)_0%,rgba(240,90,40,0)_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,rgba(15,217,200,0.18)_0%,rgba(15,217,200,0)_60%)]" />
          </div>
        </div>

        {/* Mobile: faint backdrop blur of the same image */}
        <div className="absolute inset-0 lg:hidden">
          <CloudinaryImage
            publicId="curated/homepage/core-infrastructure-engine"
            alt=""
            width={900}
            height={1200}
            sizes="100vw"
            className="h-full w-full object-cover object-center opacity-[0.18]"
            transforms="e_blur:600"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.6)_0%,rgba(12,12,14,0.95)_100%)]" />
        </div>

        {/* Scan-line grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,244,240,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,240,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
          }}
        />

        {/* Spotlight that pans subtly */}
        <motion.div
          className="absolute -top-32 left-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(240,90,40,0.32)_0%,rgba(240,90,40,0)_60%)] blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 80, -20, 0],
                  y: [0, 30, -10, 0],
                  opacity: [0.55, 0.85, 0.55],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { delayChildren: 0.04, staggerChildren: 0.08 } } }}
      >
        <div className="max-w-[760px] space-y-7">
          <motion.div variants={itemVariants} transition={{ duration: 0.45 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#F5F4F0]/18 bg-[#0F1012]/70 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#F5F4F0]/80 backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#0FD9C8]/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0FD9C8]" />
              </span>
              {hero.eyebrow}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
            <h1 className="font-syne text-[clamp(3rem,7.6vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.02em] text-[#F5F4F0]">
              {hero.headline.beforeAccent}
              <span className="relative inline-block">
                <em className="relative z-10 bg-[linear-gradient(180deg,#FF7A4A_0%,#F05A28_60%,#C9381A_100%)] bg-clip-text not-italic text-transparent">
                  {hero.headline.accent}
                </em>
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-1 h-[6px] origin-left rounded-full bg-[linear-gradient(90deg,#F05A28_0%,rgba(240,90,40,0)_100%)]"
                  initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.85, 0.25, 1] }}
                />
              </span>
              {hero.headline.afterAccent}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} transition={{ duration: 0.55 }}>
            <p className="max-w-[580px] text-pretty text-sm leading-relaxed text-[#F5F4F0]/74 md:text-base">
              {hero.subhead}
            </p>
            <p className="mt-4 max-w-[620px] text-pretty text-sm leading-relaxed text-[#F5F4F0]/62 md:text-base">
              {hero.scopeLine}
            </p>
          </motion.div>

          {/* Buttons + trust row — visible on mobile/tablet, hidden on desktop (moved below diagnostic card) */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 pt-1 lg:hidden"
          >
            <MagneticLink>
              <Button href={hero.primaryCta.href} size="lg" className="gap-2">
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </MagneticLink>
            <MagneticLink>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg" className="gap-2 text-[#F5F4F0]">
                {hero.secondaryCta.label}
              </Button>
            </MagneticLink>
          </motion.div>

          {/* Trust micro-row — visible on mobile/tablet, hidden on desktop */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.65 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#F5F4F0]/52 lg:hidden"
          >
            <span className="inline-flex items-center gap-2">
              <Cpu className="size-3.5 text-[#0FD9C8]" /> Owner-operated
            </span>
            <span className="inline-flex items-center gap-2">
              <Activity className="size-3.5 text-[#0FD9C8]" /> Healthcare · Legal · B2B
            </span>
            <span className="hidden sm:inline">15+ years · Indianapolis, IN</span>
          </motion.div>
        </div>

        {/* Live-diagnostic terminal card */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-md justify-self-end lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#F5F4F0]/12 bg-[#0F1012]/72 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(15,217,200,0.6)_50%,transparent_100%)]" />
            <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#F5F4F0]/56">
              <span>diagnostic.live</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#0FD9C8]" />
                streaming
              </span>
            </div>
            <ul className="mt-4 space-y-3 font-mono text-[0.78rem] leading-relaxed text-[#F5F4F0]/82">
              {DIAGNOSTIC_LINES.map((line, idx) => (
                <motion.li
                  key={line.label}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.18, ease: [0.2, 0.85, 0.25, 1] }}
                  className="flex gap-3"
                >
                  <span className="shrink-0 text-[#0FD9C8]">›</span>
                  <span className="shrink-0 uppercase tracking-[0.16em] text-[#F5F4F0]/46">{line.label}</span>
                  <span className="text-[#F5F4F0]/82">{line.value}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-[#F5F4F0]/10 pt-4 text-[0.72rem]">
              <span className="font-mono uppercase tracking-[0.18em] text-[#F5F4F0]/52">ready_state</span>
              <span className="font-mono text-[#F05A28]">→ scope_a_rebuild</span>
            </div>
          </div>
          {/* Glow under the card */}
          <div className="pointer-events-none absolute -inset-x-6 -bottom-10 h-24 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(240,90,40,0.25)_0%,rgba(240,90,40,0)_70%)] blur-2xl" />

          {/* Buttons + trust row — desktop only, placed below the diagnostic card */}
          <div className="mt-6 hidden lg:block">
            <div className="flex flex-wrap items-center gap-3">
              <MagneticLink>
                <Button href={hero.primaryCta.href} size="lg" className="gap-2">
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Button>
              </MagneticLink>
              <MagneticLink>
                <Button href={hero.secondaryCta.href} variant="ghost" size="lg" className="gap-2 text-[#F5F4F0]">
                  {hero.secondaryCta.label}
                </Button>
              </MagneticLink>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#F5F4F0]/52">
              <span className="inline-flex items-center gap-2">
                <Cpu className="size-3.5 text-[#0FD9C8]" /> Owner-operated
              </span>
              <span className="inline-flex items-center gap-2">
                <Activity className="size-3.5 text-[#0FD9C8]" /> Healthcare · Legal · B2B
              </span>
              <span>15+ years · Indianapolis, IN</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </BleedSection>
  );
}
