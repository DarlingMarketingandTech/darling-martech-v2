"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { caseStudies } from "@/data/work/work-index";
import { getProofDetailHeroPublicId } from "@/data/proof-visuals";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { cn } from "@/lib/utils";

const studyBySlug = new Map(caseStudies.map((study) => [study.slug, study] as const));

type OutcomeCardProps = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
  className?: string;
};

function OutcomeCard({ index, total, progress, children, className }: OutcomeCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Each card has its own "window" in the scroll progress
  const cardStart = index / total;
  const cardPeak = (index + 0.5) / total;
  const cardEnd = (index + 1) / total;

  // Opacity: fade in from 0, peak at 1, fade out to 0.3
  const opacity = useTransform(
    progress,
    [cardStart, cardPeak, cardEnd],
    [0.3, 1, index === total - 1 ? 1 : 0.3]
  );

  // Scale: subtle scale effect for depth
  const scale = useTransform(
    progress,
    [cardStart, cardPeak, cardEnd],
    [0.92, 1, index === total - 1 ? 1 : 0.92]
  );

  // Blur for extra polish
  const blur = useTransform(
    progress,
    [cardStart, cardPeak, cardEnd],
    [4, 0, index === total - 1 ? 0 : 4]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{
        opacity,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      {children}
    </motion.div>
  );
}

export function SelectedOutcomesV3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { featuredOutcomes } = homepageV4Data;
  const featuredStudy = studyBySlug.get(featuredOutcomes.featuredSlug);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll driven by vertical progress
  // We want to move from 0 to -(100% - viewport width) which we'll express as percentage
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  if (!featuredStudy) {
    return null;
  }

  const featuredVisual = getProofDetailHeroPublicId(featuredStudy);

  // Build array of all outcomes for the scroller
  const allOutcomes = [
    {
      type: "featured" as const,
      slug: featuredOutcomes.featuredSlug,
      study: featuredStudy,
      visual: featuredVisual,
    },
    ...featuredOutcomes.highlights
      .map((h) => {
        const study = studyBySlug.get(h.slug);
        if (!study) return null;
        return {
          type: "highlight" as const,
          slug: h.slug,
          study,
          highlight: h,
        };
      })
      .filter(Boolean),
  ];

  const totalCards = allOutcomes.length;

  return (
    <section
      ref={containerRef}
      className="relative"
      // Height creates the scroll runway: 100vh per card for smooth progression
      style={{ height: `${(totalCards + 1) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header - fades in at start */}
        <motion.div
          className="mx-auto w-full max-w-7xl px-6 pt-20 md:px-10 md:pt-28"
          style={{
            opacity: prefersReducedMotion
              ? 1
              : useTransform(scrollYProgress, [0, 0.08], [0, 1]),
            y: prefersReducedMotion
              ? 0
              : useTransform(scrollYProgress, [0, 0.08], [40, 0]),
          }}
        >
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
            {featuredOutcomes.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl">
            {featuredOutcomes.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body-muted md:text-lg">
            {featuredOutcomes.intro}
          </p>
        </motion.div>

        {/* Horizontal scroll track */}
        <div className="relative mt-10 flex flex-1 items-center overflow-hidden md:mt-12">
          <motion.div
            className="flex gap-6 pl-6 md:gap-8 md:pl-10"
            style={{
              x: prefersReducedMotion ? 0 : xTranslate,
            }}
          >
            {allOutcomes.map((outcome, index) => {
              if (!outcome) return null;

              if (outcome.type === "featured") {
                return (
                  <OutcomeCard
                    key={outcome.slug}
                    index={index}
                    total={totalCards}
                    progress={scrollYProgress}
                    className="w-[85vw] flex-shrink-0 md:w-[70vw] lg:w-[60vw]"
                  >
                    <div className="relative h-full overflow-hidden rounded-2xl border border-border-subtle bg-surface">
                      <div className="grid h-full lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)]">
                        {/* Visual */}
                        <div className="relative min-h-[240px] overflow-hidden border-b border-border-subtle lg:min-h-0 lg:border-b-0 lg:border-r">
                          <CloudinaryImage
                            publicId={outcome.visual}
                            alt={outcome.study.proofDetailHeroAlt ?? outcome.study.title}
                            width={1400}
                            height={1200}
                            sizes="(min-width: 1280px) 34vw, 100vw"
                            className="absolute inset-0 size-full object-cover"
                            postTransforms="e_sharpen"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.18)_0%,rgba(12,12,14,0.75)_100%)]" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center p-6 md:p-8">
                          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-signal">
                            {featuredOutcomes.featuredLabel}
                          </p>
                          <h3 className="mt-3 max-w-[18ch] font-syne text-2xl leading-tight text-foreground md:text-3xl">
                            {featuredOutcomes.featuredTitle}
                          </h3>
                          <p className="mt-4 text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
                            {featuredOutcomes.featuredBody}
                          </p>

                          {/* Metrics */}
                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-border-subtle bg-surface-muted p-4">
                              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/50">
                                Primary result
                              </p>
                              <p className="mt-2 font-syne text-3xl leading-none text-foreground">
                                {outcome.study.primaryMetric.value}
                              </p>
                              <p className="mt-2 text-sm text-body-muted">
                                {outcome.study.primaryMetric.label}
                              </p>
                            </div>
                            <div className="rounded-xl border border-border-subtle bg-surface-muted p-4">
                              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/50">
                                Commercial shift
                              </p>
                              <p className="mt-2 text-sm leading-relaxed text-body-muted">
                                {outcome.study.resultSummary}
                              </p>
                            </div>
                          </div>

                          <Link
                            href={featuredOutcomes.featuredCta.href}
                            className="group mt-6 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-signal"
                            onClick={() =>
                              captureClientEvent("proof_card_clicked", {
                                slug: featuredOutcomes.featuredSlug,
                                surface: "featured",
                                href: featuredOutcomes.featuredCta.href,
                              })
                            }
                          >
                            {featuredOutcomes.featuredCta.label}
                            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </OutcomeCard>
                );
              }

              // Highlight cards
              const { highlight } = outcome;
              return (
                <OutcomeCard
                  key={outcome.slug}
                  index={index}
                  total={totalCards}
                  progress={scrollYProgress}
                  className="w-[75vw] flex-shrink-0 sm:w-[50vw] md:w-[40vw] lg:w-[30vw]"
                >
                  <Link
                    href={`/proof/${outcome.slug}`}
                    className="group block h-full"
                    onClick={() =>
                      captureClientEvent("proof_card_clicked", {
                        slug: outcome.slug,
                        surface: "highlight",
                        href: `/proof/${outcome.slug}`,
                      })
                    }
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-6 transition-colors hover:border-signal/30 md:p-7">
                      <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-signal">
                        {highlight.label}
                      </p>
                      <p className="mt-4 font-syne text-4xl leading-none text-foreground md:text-5xl">
                        {outcome.study.primaryMetric.value}
                      </p>
                      <p className="mt-2 text-sm text-foreground/60">
                        {outcome.study.primaryMetric.label}
                      </p>
                      <p className="mt-5 flex-1 text-sm leading-relaxed text-body-muted">
                        {highlight.detail}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-signal">
                        View proof
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </OutcomeCard>
              );
            })}

            {/* End spacer for scroll runway */}
            <div className="w-[20vw] flex-shrink-0" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {allOutcomes.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 rounded-full bg-foreground/20"
              style={{
                width: prefersReducedMotion
                  ? 24
                  : useTransform(
                      scrollYProgress,
                      [index / totalCards, (index + 0.5) / totalCards, (index + 1) / totalCards],
                      [12, 32, 12]
                    ),
                backgroundColor: prefersReducedMotion
                  ? "rgba(245,244,240,0.2)"
                  : useTransform(
                      scrollYProgress,
                      [index / totalCards, (index + 0.5) / totalCards, (index + 1) / totalCards],
                      [
                        "rgba(245,244,240,0.2)",
                        "rgba(15,217,200,0.9)",
                        "rgba(245,244,240,0.2)",
                      ]
                    ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
