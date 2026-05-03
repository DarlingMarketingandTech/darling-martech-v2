"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { Button } from "@/components/ui/button";
import { MagneticLink } from "@/components/motion";

export function ClosingCtaV3() {
  const data = homepageData.closingCta;
  const prefersReducedMotion = useReducedMotion();
  const isReadyLinkExternal = /^https?:\/\//.test(data.readyLink.href);

  return (
    <BleedSection className="relative overflow-hidden py-24 md:py-36">
      {/* Layer 1 — large warm sun glow, bottom-center */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full h-[820px] w-[1200px] -translate-x-1/2 -translate-y-[58%] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,90,40,0.55)_0%,rgba(240,90,40,0.18)_35%,rgba(240,90,40,0)_70%)] blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 2 — cool teal counter-glow, top-right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(15,217,200,0.28)_0%,rgba(15,217,200,0)_60%)] blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -30, 0], y: [0, 20, 0], opacity: [0.6, 0.9, 0.6] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3 — fine grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,244,240,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,240,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Layer 4 — orange horizon line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-1/3 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(240,90,40,0.45)_50%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Status pill */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/30 bg-[#F05A28]/8 px-4 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#F05A28] backdrop-blur"
        >
          <span className="relative inline-flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#F05A28]/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F05A28]" />
          </span>
          Trust ladder
        </motion.p>

        <motion.h2
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.85, 0.25, 1] }}
          className="mt-6 font-syne text-[clamp(2.5rem,6vw,5.2rem)] font-medium leading-[0.96] tracking-[-0.02em] text-[#F5F4F0]"
        >
          {data.headline}
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#F5F4F0]/78 md:text-lg"
        >
          {data.body}
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticLink>
            <Button href={data.primaryCta.href} size="lg" className="gap-2">
              {data.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </MagneticLink>
          <MagneticLink>
            <Button href={data.secondaryCta.href} variant="ghost" size="lg" className="text-[#F5F4F0]">
              {data.secondaryCta.label}
            </Button>
          </MagneticLink>
        </motion.div>

        <motion.a
          href={data.readyLink.href}
          target={isReadyLinkExternal ? "_blank" : undefined}
          rel={isReadyLinkExternal ? "noreferrer" : undefined}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#F05A28] underline-offset-[6px] transition-colors hover:underline"
        >
          {data.readyLink.label}
          <ArrowRight className="size-3.5" />
        </motion.a>
      </div>
    </BleedSection>
  );
}
