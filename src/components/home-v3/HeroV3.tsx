"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNetworkAware } from "@/hooks/useNetworkAware";
import { LivingEngineDiagram } from "@/components/home-v3/LivingEngineDiagram";
import { EASE_OUT_EXPO } from "@/lib/motion-easings";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

/** Splits a string into words/spaces and renders each character with a stagger. */
function StaggeredHeadline({ text, reduce }: { text: string; reduce: boolean }) {
  if (reduce) {
    return <>{text}</>;
  }

  // Preserve spaces while splitting so word-break stays natural.
  const words = text.split(/(\s+)/);

  let charIndex = 0;
  return (
    <span aria-label={text}>
      {words.map((word, wIdx) => {
        if (/^\s+$/.test(word)) {
          return (
            <span key={`s-${wIdx}`} aria-hidden>
              {" "}
            </span>
          );
        }
        return (
          <span
            key={`w-${wIdx}`}
            className="inline-block whitespace-nowrap"
            aria-hidden
          >
            {Array.from(word).map((ch) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={`c-${i}`}
                  initial={{ opacity: 0, y: "0.6em", filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.018,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export function HeroV3() {
  const { hero } = homepageV4Data;
  const { shouldReduceMotion } = useNetworkAware();
  const prefersReducedMotion = useReducedMotion();
  const reduce = shouldReduceMotion || prefersReducedMotion === true;

  return (
    <BleedSection
      className="relative overflow-hidden pt-14 sm:pt-18 md:pt-24"
      innerClassName="pb-12 sm:pb-14 md:pb-20 lg:pb-24"
    >
      {/* Atmospheric backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 35% at 100% 0%, rgba(15,217,200,0.10) 0%, rgba(15,217,200,0) 70%), radial-gradient(45% 35% at 0% 100%, rgba(240,90,40,0.10) 0%, rgba(240,90,40,0) 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,244,240,0.18) 30%, rgba(245,244,240,0.18) 70%, transparent)",
        }}
      />

      <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        {/* Left content */}
        <div className="max-w-3xl">
          {/* Status row */}
          <motion.div
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "visible"}
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/8 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-signal">
              <span className="relative inline-flex size-1.5 rounded-full bg-signal">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal/70" />
              </span>
              {hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline with staggered character reveal */}
          <h1 className="mt-5 max-w-[14ch] font-syne text-[clamp(2.4rem,9vw,5.6rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
            <StaggeredHeadline text={hero.title} reduce={reduce} />
          </h1>

          <motion.div
            className="mt-5 max-w-2xl space-y-3 text-[0.98rem] leading-7 text-body-muted md:mt-6 md:text-lg md:leading-8"
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "visible"}
            variants={fadeUp}
            transition={{ delay: 0.4 }}
          >
            {hero.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* CTAs with magnetic pull */}
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "visible"}
            variants={fadeUp}
            transition={{ delay: 0.55 }}
          >
            <MagneticButton glowColor="rgba(240, 90, 40, 0.35)">
              <Button
                href={hero.primaryCta.href}
                size="lg"
                className="w-full justify-center gap-2 sm:w-auto"
                onClick={() =>
                  captureClientEvent("hero_cta_clicked", {
                    cta: "primary",
                    href: hero.primaryCta.href,
                  })
                }
              >
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </MagneticButton>

            <MagneticButton glowColor="rgba(15, 217, 200, 0.22)">
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="w-full justify-center gap-2 sm:w-auto"
                onClick={() =>
                  captureClientEvent("hero_cta_clicked", {
                    cta: "secondary",
                    href: hero.secondaryCta.href,
                  })
                }
              >
                {hero.secondaryCta.label}
                <ArrowUpRight className="size-4" />
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/45 sm:text-[0.66rem]"
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "visible"}
            variants={fadeUp}
            transition={{ delay: 0.7 }}
          >
            {hero.trustItems.map((item, idx) => (
              <div key={item} className="flex items-center gap-3">
                <span>{item}</span>
                {idx < hero.trustItems.length - 1 ? (
                  <span aria-hidden className="size-1 rounded-full bg-foreground/25" />
                ) : null}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Living Engine Diagram */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.25 }}
          className="relative"
        >
          <LivingEngineDiagram />
          {/* Caption */}
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/40">
            Fig. 01 — Operator layer reconciling website, CRM, and reporting
          </p>
        </motion.div>
      </div>
    </BleedSection>
  );
}
