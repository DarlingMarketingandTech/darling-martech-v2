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
    <BleedSection className="relative overflow-hidden pt-20 md:pt-24" innerClassName="pb-16 md:pb-20 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45% 30% at 100% 0%, rgba(15,217,200,0.08) 0%, rgba(15,217,200,0)_70%), radial-gradient(40% 35% at 0% 100%, rgba(240,90,40,0.08) 0%, rgba(240,90,40,0)_72%)",
        }}
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#0FD9C8]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[13ch] font-syne text-[clamp(3.1rem,7vw,6.2rem)] leading-[0.92] tracking-[-0.03em] text-[#F5F4F0]">
            {hero.title}
          </h1>

          <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-[#F5F4F0]/72 md:text-lg">
            {hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              className="gap-2"
              onClick={() => captureClientEvent("hero_cta_clicked", { cta: "primary", href: hero.primaryCta.href })}
            >
              {hero.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              size="lg"
              onClick={() => captureClientEvent("hero_cta_clicked", { cta: "secondary", href: hero.secondaryCta.href })}
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#F5F4F0]/46">
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
          <GlassPanel className="overflow-hidden border-[#F5F4F0]/12 bg-[linear-gradient(180deg,rgba(245,244,240,0.03),rgba(15,217,200,0.015))]">
            <div className="relative aspect-4/5 min-h-[360px]">
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
              <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_75%_20%,rgba(15,217,200,0.14)_0%,rgba(15,217,200,0)_70%)]" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                  {hero.visual.eyebrow}
                </p>
                <h2 className="mt-3 max-w-[16ch] font-syne text-2xl leading-tight text-[#F5F4F0] md:text-[2rem]">
                  {hero.visual.title}
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#F5F4F0]/72">
                  {hero.visual.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0FD9C8]" />
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
