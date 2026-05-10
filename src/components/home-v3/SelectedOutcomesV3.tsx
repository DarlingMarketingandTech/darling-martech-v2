"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { caseStudies } from "@/data/work/work-index";
import { getProofDetailHeroPublicId } from "@/data/proof-visuals";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { useNetworkAware } from "@/hooks/useNetworkAware";

const studyBySlug = new Map(caseStudies.map((study) => [study.slug, study] as const));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function SelectedOutcomesV3() {
  const { featuredOutcomes } = homepageV4Data;
  const { shouldReduceMotion } = useNetworkAware();
  const featuredStudy = studyBySlug.get(featuredOutcomes.featuredSlug);

  if (!featuredStudy) {
    return null;
  }

  const featuredVisual = getProofDetailHeroPublicId(featuredStudy);

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
          {featuredOutcomes.eyebrow}
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl">
          {featuredOutcomes.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-body-muted md:text-lg">
          {featuredOutcomes.intro}
        </p>
      </div>

      {/* Modern Bento Grid Layout */}
      <motion.div 
        className="mt-10 grid gap-5 md:grid-cols-4 md:grid-rows-2"
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
      >
        {/* Featured Study - Large Left Card (2x2) */}
        <motion.div 
          className="md:col-span-2 md:row-span-2"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          <SectionSurface className="group h-full overflow-hidden">
            <div className="grid gap-0 h-full grid-rows-[minmax(200px,1fr)_auto]">
              <div className="relative overflow-hidden border-b border-border-subtle">
                <CloudinaryImage
                  publicId={featuredVisual}
                  alt={featuredStudy.proofDetailHeroAlt ?? featuredStudy.title}
                  width={1400}
                  height={1200}
                  sizes="(min-width: 1280px) 34vw, 100vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  postTransforms="e_sharpen"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.18)_0%,rgba(12,12,14,0.75)_100%)]" />
              </div>

              <div className="p-5 md:p-6">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-signal">
                  {featuredOutcomes.featuredLabel}
                </p>
                <h3 className="mt-2 max-w-[16ch] font-syne text-2xl md:text-[1.85rem] leading-tight text-foreground">
                  {featuredOutcomes.featuredTitle}
                </h3>
                <p className="mt-3 text-xs md:text-sm leading-relaxed text-body-muted">
                  {featuredOutcomes.featuredBody}
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-border-subtle bg-surface-muted p-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/50">
                      Primary result
                    </p>
                    <p className="mt-1.5 font-syne text-2xl leading-none text-foreground">
                      {featuredStudy.primaryMetric.value}
                    </p>
                    <p className="mt-1 text-xs text-body-muted">{featuredStudy.primaryMetric.label}</p>
                  </div>
                </div>

                <Link
                  href={featuredOutcomes.featuredCta.href}
                  className="mt-4 inline-flex items-center gap-2 text-xs md:text-sm text-foreground"
                  onClick={() =>
                    captureClientEvent("proof_card_clicked", {
                      slug: featuredOutcomes.featuredSlug,
                      surface: "featured",
                      href: featuredOutcomes.featuredCta.href,
                    })
                  }
                >
                  {featuredOutcomes.featuredCta.label}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </SectionSurface>
        </motion.div>

        {/* Highlight Cards - Right Column (2x1 each) */}
        {featuredOutcomes.highlights.map((highlight, index) => {
          const study = studyBySlug.get(highlight.slug);
          if (!study) {
            return null;
          }

          return (
            <motion.div
              key={highlight.slug}
              className="md:col-span-2"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <Link
                href={`/proof/${highlight.slug}`}
                className="group block"
                onClick={() =>
                  captureClientEvent("proof_card_clicked", {
                    slug: highlight.slug,
                    surface: "highlight",
                    href: `/proof/${highlight.slug}`,
                  })
                }
              >
                <SectionSurface className="h-full p-5 md:p-6 flex flex-col transition-all duration-200 group-hover:shadow-lg">
                  {/* Metric Highlight */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="font-syne text-3xl md:text-4xl leading-none text-signal font-bold">
                      {study.primaryMetric.value}
                    </p>
                    <p className="text-xs md:text-sm text-body-muted">{study.primaryMetric.label}</p>
                  </div>

                  {/* Category Label */}
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/50 mb-2">
                    {highlight.label}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-body-muted flex-grow">
                    {highlight.detail}
                  </p>

                  {/* CTA */}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs md:text-sm text-foreground group-hover:gap-2 transition-all">
                    View proof
                    <ArrowUpRight className="size-4" />
                  </span>
                </SectionSurface>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </BleedSection>
  );
}
