"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

export function HeroV3() {
  const { hero } = homepageV4Data;
  const prefersReducedMotion = useReducedMotion();

  return (
    <BleedSection className="relative overflow-hidden pt-16 sm:pt-18 md:pt-24" innerClassName="pb-12 sm:pb-14 md:pb-20 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45% 30% at 100% 0%, rgba(15,217,200,0.08) 0%, rgba(15,217,200,0)_70%), radial-gradient(40% 35% at 0% 100%, rgba(240,90,40,0.08) 0%, rgba(240,90,40,0)_72%)",
        }}
      />

      <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[14ch] font-syne text-[clamp(2.2rem,10vw,6.2rem)] leading-[0.94] tracking-[-0.025em] text-foreground">
            {hero.title}
          </h1>

          <div className="mt-5 max-w-2xl space-y-3 text-[0.98rem] leading-6 text-body-muted sm:space-y-4 md:mt-6 md:text-lg md:leading-7">
            {hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 grid w-full grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-3">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              className="w-full justify-center gap-2 sm:w-auto"
              onClick={() => captureClientEvent("hero_cta_clicked", { cta: "primary", href: hero.primaryCta.href })}
            >
              {hero.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              size="lg"
              className="w-full justify-center sm:w-auto"
              onClick={() => captureClientEvent("hero_cta_clicked", { cta: "secondary", href: hero.secondaryCta.href })}
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/50 sm:mt-6 sm:gap-x-5 sm:text-[0.68rem] sm:tracking-[0.16em]">
            {hero.trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <GlassPanel className="overflow-hidden border-foreground/12 bg-[linear-gradient(180deg,rgba(245,244,240,0.03),rgba(15,217,200,0.015))]">
            <div className="relative aspect-5/6 min-h-[300px] sm:aspect-4/5 sm:min-h-[360px]">
              <CloudinaryImage
                publicId={hero.visual.publicId}
                alt={hero.visual.alt}
                width={1200}
                height={1500}
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="absolute inset-0 size-full object-cover object-center opacity-45 mix-blend-screen"
                postTransforms="e_sharpen"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.28)_0%,rgba(12,12,14,0.78)_58%,rgba(12,12,14,0.96)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(58%_52%_at_72%_18%,rgba(15,217,200,0.14)_0%,rgba(15,217,200,0)_72%)] sm:bg-[radial-gradient(55%_45%_at_75%_20%,rgba(15,217,200,0.14)_0%,rgba(15,217,200,0)_70%)]" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal">
                  {hero.visual.eyebrow}
                </p>
                <h2 className="mt-3 max-w-[16ch] font-syne text-2xl leading-tight text-foreground md:text-[2rem]">
                  {hero.visual.title}
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-body-muted">
                  {hero.visual.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </BleedSection>
  );
}
