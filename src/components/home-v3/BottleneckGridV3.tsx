"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Workflow, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { homepageV4Data } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { useNetworkAware } from "@/hooks/useNetworkAware";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion-easings";

/**
 * Diagnostic metrics shown on hover. These pair 1:1 with the homepage data
 * `bottlenecks.cards` order. They simulate operator-grade telemetry for each
 * common failure mode (intent, system, visibility).
 */
const DIAGNOSTIC_BY_INDEX: Array<{
  metric: string;
  unit: string;
  label: string;
  trendLabel: string;
  trendDirection: "down" | "up" | "flat";
  series: number[];
  icon: LucideIcon;
  toneClass: string;
}> = [
  {
    metric: "75",
    unit: "%",
    label: "Drop-off detected before primary CTA",
    trendLabel: "vs. industry baseline 38%",
    trendDirection: "down",
    series: [78, 74, 80, 71, 68, 75, 73, 70, 76, 73, 71, 75],
    icon: AlertTriangle,
    toneClass: "text-brand",
  },
  {
    metric: "1.4",
    unit: "d",
    label: "Median follow-up latency on captured leads",
    trendLabel: "Target ≤ 2h to stay competitive",
    trendDirection: "flat",
    series: [22, 28, 24, 30, 26, 34, 28, 32, 30, 36, 32, 34],
    icon: Workflow,
    toneClass: "text-brand",
  },
  {
    metric: "0.6",
    unit: "x",
    label: "Share-of-search vs. local category leader",
    trendLabel: "Authority signals under-indexed",
    trendDirection: "down",
    series: [40, 38, 36, 34, 35, 32, 30, 31, 28, 26, 24, 22],
    icon: Compass,
    toneClass: "text-signal",
  },
];

/** Span class for the bento layout — first card is wider on lg+. */
const SPANS = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-3"] as const;

/** Tiny inline sparkline rendered with raw SVG. */
function Sparkline({
  series,
  className,
}: {
  series: number[];
  className?: string;
}) {
  const width = 120;
  const height = 32;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = Math.max(1, max - min);
  const stepX = width / (series.length - 1);
  const points = series
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("block w-full", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(240,90,40,0.35)" />
          <stop offset="100%" stopColor="rgba(240,90,40,0)" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,${height} ${points} ${width},${height}`}
        fill="url(#spark-fill)"
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BottleneckGridV3() {
  const { bottlenecks } = homepageV4Data;
  const { shouldReduceMotion } = useNetworkAware();
  const prefersReducedMotion = useReducedMotion();
  const reduce = shouldReduceMotion || prefersReducedMotion === true;

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      {/* Section header — operator schematic style */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
            {bottlenecks.eyebrow}
          </p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl">
            {bottlenecks.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body-muted md:text-lg">
            {bottlenecks.intro}
          </p>
        </div>
        {/* Section index/legend */}
        <div className="flex items-center gap-2 self-end md:justify-end">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-foreground/45">
            Hover any tile · diagnostic appears
          </span>
        </div>
      </div>

      {/* Bento grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bottlenecks.cards.map((card, index) => {
          const diagnostic = DIAGNOSTIC_BY_INDEX[index];
          const Icon = diagnostic.icon;
          const span = SPANS[index] ?? "";
          return (
            <motion.article
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT_EXPO }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border-subtle bg-surface",
                "transition-[border-color,box-shadow,transform] duration-300 ease-out",
                "hover:-translate-y-0.5 hover:border-foreground/16",
                "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_28px_60px_rgba(0,0,0,0.45)]",
                span
              )}
            >
              {/* Glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    index === 2
                      ? "radial-gradient(60% 50% at 50% 0%, rgba(15,217,200,0.16) 0%, transparent 70%)"
                      : "radial-gradient(60% 50% at 50% 0%, rgba(240,90,40,0.16) 0%, transparent 70%)",
                }}
              />

              {/* Schematic top strip */}
              <div className="flex items-center justify-between border-b border-border-subtle/80 px-6 py-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "inline-flex size-7 items-center justify-center rounded-md border",
                      index === 2
                        ? "border-signal/40 bg-signal/10 text-signal"
                        : "border-brand/40 bg-brand/10 text-brand"
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">
                    Failure {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-foreground/40">
                  {index === 2 ? "Visibility" : index === 1 ? "Operations" : "Conversion"}
                </span>
              </div>

              {/* Body */}
              <div className="relative p-6 md:p-7">
                <h3 className="max-w-[22ch] font-syne text-xl leading-tight text-foreground md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
                  {card.body}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-border-subtle pt-4 text-sm text-body-muted">
                  {card.symptoms.map((symptom) => (
                    <li key={symptom} className="flex gap-3">
                      <span
                        className={cn(
                          "mt-2 size-1.5 shrink-0 rounded-full",
                          index === 2 ? "bg-signal" : "bg-brand"
                        )}
                      />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>

                {/* Diagnostic metric — revealed on hover */}
                <div
                  className={cn(
                    "mt-5 overflow-hidden rounded-2xl border border-border-subtle bg-surface-muted/60",
                    "transition-[border-color,background-color] duration-300 group-hover:border-foreground/14",
                    "group-hover:bg-surface-muted"
                  )}
                >
                  <div className="flex items-start justify-between gap-4 px-4 pt-4">
                    <div>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-foreground/45">
                        Diagnostic metric
                      </span>
                      <div className="mt-2 flex items-baseline gap-1">
                        <motion.span
                          className={cn("font-syne text-3xl leading-none", diagnostic.toneClass)}
                          initial={false}
                          animate={
                            reduce
                              ? undefined
                              : {
                                  scale: [1, 1.04, 1],
                                }
                          }
                          transition={{
                            duration: 0.6,
                            ease: EASE_OUT_EXPO,
                            repeat: 0,
                          }}
                        >
                          {diagnostic.metric}
                        </motion.span>
                        <span className={cn("font-syne text-base", diagnostic.toneClass)}>
                          {diagnostic.unit}
                        </span>
                      </div>
                      <p className="mt-1 max-w-[22ch] text-xs leading-snug text-body-muted">
                        {diagnostic.label}
                      </p>
                    </div>

                    {/* Sparkline */}
                    <div className={cn("w-28 shrink-0 self-center", diagnostic.toneClass)}>
                      <Sparkline series={diagnostic.series} />
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-3 flex items-center justify-between border-t border-border-subtle/80 px-4 py-2.5",
                      "font-mono text-[0.58rem] uppercase tracking-[0.2em] text-foreground/45"
                    )}
                  >
                    <span>{diagnostic.trendLabel}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
                        diagnostic.trendDirection === "down"
                          ? "bg-brand/10 text-brand"
                          : diagnostic.trendDirection === "up"
                            ? "bg-signal/10 text-signal"
                            : "bg-foreground/8 text-foreground/55"
                      )}
                    >
                      <span className="size-1 rounded-full bg-current" />
                      {diagnostic.trendDirection === "down"
                        ? "Leak"
                        : diagnostic.trendDirection === "up"
                          ? "Lift"
                          : "Slow"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {bottlenecks.ctaSupporting ? (
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-body-muted md:text-base">
          {bottlenecks.ctaSupporting}
        </p>
      ) : null}
    </BleedSection>
  );
}
