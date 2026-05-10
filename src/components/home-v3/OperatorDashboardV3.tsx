"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  Database,
  Zap,
  BarChart3,
  Users,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { homepageV4Data } from "@/data/homepage";
import { caseStudies } from "@/data/work/work-index";
import { testimonials } from "@/data/testimonials";
import { captureClientEvent } from "@/lib/posthog";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { useNetworkAware } from "@/hooks/useNetworkAware";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion-easings";

const studyBySlug = new Map(caseStudies.map((s) => [s.slug, s] as const));

// ---------------------------------------------------------------------------
// Revenue Growth chart — animated SVG path with sparkline + axis ticks
// ---------------------------------------------------------------------------

const REVENUE_SERIES = [
  18, 22, 24, 23, 27, 31, 30, 35, 41, 44, 49, 56, 62, 71, 79, 86, 93, 102, 110,
];
const REVENUE_LABELS = ["Q1 '23", "Q2", "Q3", "Q4", "Q1 '24", "Q2", "Q3"];

function RevenueChart({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const width = 720;
  const height = 240;
  const paddingX = 28;
  const paddingY = 30;

  const min = Math.min(...REVENUE_SERIES);
  const max = Math.max(...REVENUE_SERIES);
  const range = Math.max(1, max - min);
  const stepX = (width - paddingX * 2) / (REVENUE_SERIES.length - 1);

  const points = REVENUE_SERIES.map((v, i) => {
    const x = paddingX + i * stepX;
    const y = height - paddingY - ((v - min) / range) * (height - paddingY * 2);
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1][0]},${height - paddingY} L${points[0][0]},${height - paddingY} Z`;

  return (
    <div ref={ref} className="relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">
            Revenue Trajectory · Composite
          </p>
          <p className="mt-1 font-syne text-xl text-foreground">
            +212% qualified pipeline
          </p>
        </div>
        <div className="flex items-center gap-3 text-[0.62rem]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-2.5 py-1 font-mono uppercase tracking-[0.18em] text-foreground/60">
            <span className="size-1.5 rounded-full bg-signal" /> Pipeline
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-2.5 py-1 font-mono uppercase tracking-[0.18em] text-foreground/60">
            <span className="size-1.5 rounded-full bg-brand" /> Booked
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="rev-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(15,217,200,0.32)" />
            <stop offset="100%" stopColor="rgba(15,217,200,0)" />
          </linearGradient>
          <linearGradient id="rev-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(245,244,240,0.7)" />
            <stop offset="60%" stopColor="rgba(15,217,200,0.95)" />
            <stop offset="100%" stopColor="rgba(15,217,200,1)" />
          </linearGradient>
        </defs>

        {/* Y axis grid */}
        {[0, 1, 2, 3].map((i) => {
          const y = paddingY + ((height - paddingY * 2) / 3) * i;
          return (
            <g key={`grid-${i}`}>
              <line
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="rgba(245,244,240,0.06)"
                strokeWidth={1}
                strokeDasharray="2 4"
              />
            </g>
          );
        })}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#rev-area)"
          initial={{ opacity: 0 }}
          animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#rev-line)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={inView || reduce ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
        />

        {/* End point marker */}
        {points.length > 0 ? (
          <motion.g
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            <circle
              cx={points[points.length - 1][0]}
              cy={points[points.length - 1][1]}
              r={8}
              fill="rgba(15,217,200,0.18)"
            />
            <circle
              cx={points[points.length - 1][0]}
              cy={points[points.length - 1][1]}
              r={4}
              fill="#0FD9C8"
            />
          </motion.g>
        ) : null}
      </svg>

      {/* Footer ticks */}
      <div className="mt-1 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/40">
        {REVENUE_LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stack Map — interconnected platform nodes
// ---------------------------------------------------------------------------

type StackNode = {
  id: string;
  label: string;
  category: string;
  icon: LucideIcon;
  /** position on a 0..100 grid */
  cx: number;
  cy: number;
  isHub?: boolean;
};

const STACK_NODES: StackNode[] = [
  { id: "site", label: "Website", category: "Capture", icon: Globe, cx: 14, cy: 28 },
  { id: "crm", label: "CRM", category: "Lifecycle", icon: Database, cx: 14, cy: 72 },
  { id: "auto", label: "Automation", category: "Routing", icon: Zap, cx: 86, cy: 28 },
  { id: "report", label: "Reporting", category: "Decisions", icon: BarChart3, cx: 86, cy: 72 },
  { id: "hub", label: "Operator", category: "Layer", icon: Sparkles, cx: 50, cy: 50, isHub: true },
];

const STACK_EDGES: Array<[string, string]> = [
  ["site", "hub"],
  ["crm", "hub"],
  ["auto", "hub"],
  ["report", "hub"],
];

function StackMap({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const find = (id: string) => STACK_NODES.find((n) => n.id === id)!;

  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center justify-between pb-3">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">
          Implementation Stack · Connected
        </p>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-signal">
          5 / 5 synced
        </span>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-subtle bg-[radial-gradient(circle_at_50%_50%,rgba(15,217,200,0.06),transparent_70%)]">
        {/* Schematic grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,244,240,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,240,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* SVG edges */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stack-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(245,244,240,0.4)" />
              <stop offset="100%" stopColor="rgba(15,217,200,0.85)" />
            </linearGradient>
          </defs>
          {STACK_EDGES.map(([a, b], i) => {
            const fa = find(a);
            const fb = find(b);
            // curved cubic path
            const mx = (fa.cx + fb.cx) / 2;
            const my = (fa.cy + fb.cy) / 2;
            const offset = (fa.cy < fb.cy ? -1 : 1) * 6;
            const d = `M${fa.cx},${fa.cy} C${mx},${my + offset} ${mx},${my + offset} ${fb.cx},${fb.cy}`;
            return (
              <motion.path
                key={`${a}-${b}`}
                d={d}
                fill="none"
                stroke="url(#stack-edge)"
                strokeWidth={0.4}
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 0.85 : 0 }}
                animate={
                  inView || reduce
                    ? { pathLength: 1, opacity: 0.85 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: EASE_OUT_EXPO }}
              />
            );
          })}
        </svg>

        {/* Node chips (positioned with percent so they scale with the container) */}
        {STACK_NODES.map((node, idx) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2",
                "rounded-xl border bg-surface px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                "flex items-center gap-2",
                node.isHub
                  ? "border-signal/45 bg-[linear-gradient(180deg,rgba(15,42,46,0.95),rgba(8,18,22,0.95))]"
                  : "border-border-subtle"
              )}
              style={{ left: `${node.cx}%`, top: `${node.cy}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={inView || reduce ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.05 + idx * 0.08, ease: EASE_OUT_EXPO }}
            >
              <span
                className={cn(
                  "inline-flex size-6 items-center justify-center rounded-md border",
                  node.isHub ? "border-signal/40 bg-signal/15 text-signal" : "border-border-subtle bg-surface-muted text-foreground/70"
                )}
              >
                <Icon className="size-3.5" />
              </span>
              <div className="leading-tight">
                <div className={cn("font-syne text-[0.78rem]", node.isHub ? "text-foreground" : "text-foreground/85")}>
                  {node.label}
                </div>
                <div className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-foreground/45">
                  {node.category}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Pulsing data-stream dots on each edge */}
        {!reduce
          ? STACK_EDGES.map(([a, b], i) => {
              const fa = find(a);
              const fb = find(b);
              return (
                <motion.span
                  key={`pulse-${a}-${b}`}
                  aria-hidden
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: "rgba(15,217,200,0.9)",
                    boxShadow: "0 0 14px 2px rgba(15,217,200,0.6)",
                  }}
                  animate={{
                    left: [`${fa.cx}%`, `${fb.cx}%`],
                    top: [`${fa.cy}%`, `${fb.cy}%`],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.85, 1],
                  }}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated impact stat with count-up
// ---------------------------------------------------------------------------

function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  reduce,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(reduce ? value : 0);
  const display = useTransform(mv, (v) =>
    `${prefix}${Math.round(v).toLocaleString()}${suffix}`
  );
  const [out, setOut] = useState(reduce ? `${prefix}${value}${suffix}` : `${prefix}0${suffix}`);

  useEffect(() => {
    const unsub = display.on("change", (v) => setOut(v));
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(mv, value, { duration, ease: EASE_OUT_EXPO });
    return () => controls.stop();
  }, [inView, mv, value, duration, reduce]);

  return <span ref={ref}>{out}</span>;
}

type ImpactStat = {
  value: string;
  countNumeric: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  href: string;
  tone: "signal" | "brand" | "default";
};

function getImpactStats(): ImpactStat[] {
  // Pull from real proof data
  const graston = studyBySlug.get("graston-growth-engine");
  const primary = studyBySlug.get("primarycare-indy");
  const barber = studyBySlug.get("barbershop-command-center");

  return [
    {
      value: graston?.primaryMetric.value ?? "95%",
      countNumeric: 95,
      suffix: "%",
      label: graston?.primaryMetric.label ?? "Manual overhead reduced",
      icon: Zap,
      href: "/proof/graston-growth-engine",
      tone: "brand",
    },
    {
      value: primary?.primaryMetric.value ?? "75%",
      countNumeric: 75,
      suffix: "%",
      label: primary?.primaryMetric.label ?? "Increase in online bookings",
      icon: TrendingUp,
      href: "/proof/primarycare-indy",
      tone: "signal",
    },
    {
      value: barber?.primaryMetric.value ?? "3×",
      countNumeric: 3,
      suffix: "×",
      label: barber?.primaryMetric.label ?? "Increase in repeat booking rate",
      icon: Users,
      href: "/proof/barbershop-command-center",
      tone: "default",
    },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function OperatorDashboardV3() {
  const { featuredOutcomes } = homepageV4Data;
  const { shouldReduceMotion } = useNetworkAware();
  const prefersReducedMotion = useReducedMotion();
  const reduce = shouldReduceMotion || prefersReducedMotion === true;
  const stats = getImpactStats();
  const featuredTestimonial = testimonials.find((t) => t.featured) ?? testimonials[0];

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      {/* Section header */}
      <div className="grid items-end gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
            Operator Proof · Command Center
          </p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl">
            {featuredOutcomes.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body-muted md:text-lg">
            {featuredOutcomes.intro}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/8 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-signal">
            <span className="relative inline-flex size-1.5 rounded-full bg-signal">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal/70" />
            </span>
            Live · 12 / 12 systems healthy
          </span>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-foreground/45">
            Composite from active engagements
          </span>
        </div>
      </div>

      {/* Top row: Revenue chart + Stack map */}
      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        {/* Revenue chart panel */}
        <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 md:p-6">
          <RevenueChart reduce={reduce} />
        </div>

        {/* Stack map panel */}
        <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 md:p-6">
          <StackMap reduce={reduce} />
        </div>
      </div>

      {/* Impact stat cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_OUT_EXPO }}
            >
              <Link
                href={stat.href}
                onClick={() =>
                  captureClientEvent("proof_card_clicked", {
                    surface: "operator_dashboard",
                    href: stat.href,
                  })
                }
                className={cn(
                  "group relative block h-full overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 md:p-6",
                  "transition-[border-color,transform,box-shadow] duration-300",
                  "hover:-translate-y-0.5 hover:border-foreground/16",
                  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.4)]"
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      stat.tone === "signal"
                        ? "radial-gradient(70% 50% at 50% 0%, rgba(15,217,200,0.18), transparent 70%)"
                        : stat.tone === "brand"
                          ? "radial-gradient(70% 50% at 50% 0%, rgba(240,90,40,0.16), transparent 70%)"
                          : "radial-gradient(70% 50% at 50% 0%, rgba(245,244,240,0.06), transparent 70%)",
                  }}
                />

                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-lg border",
                      stat.tone === "signal" && "border-signal/40 bg-signal/10 text-signal",
                      stat.tone === "brand" && "border-brand/40 bg-brand/10 text-brand",
                      stat.tone === "default" && "border-border-subtle bg-surface-muted text-foreground/70"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <ArrowUpRight className="size-4 text-foreground/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>

                <div
                  className={cn(
                    "mt-6 font-syne text-5xl leading-none tracking-[-0.02em] md:text-6xl",
                    stat.tone === "signal" && "text-signal",
                    stat.tone === "brand" && "text-brand",
                    stat.tone === "default" && "text-foreground"
                  )}
                >
                  {/* Use literal value for non-numeric formatting (e.g. "3×"), but for percent we count up */}
                  {stat.value === "3×" || stat.value === "Top 3" ? (
                    stat.value
                  ) : (
                    <CountUp
                      value={stat.countNumeric}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      reduce={reduce}
                    />
                  )}
                </div>
                <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
                  {stat.label}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom row: Featured case + Testimonial */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Featured case study summary */}
        <Link
          href={featuredOutcomes.featuredCta.href}
          onClick={() =>
            captureClientEvent("proof_card_clicked", {
              slug: featuredOutcomes.featuredSlug,
              surface: "operator_dashboard_featured",
              href: featuredOutcomes.featuredCta.href,
            })
          }
          className={cn(
            "group relative block overflow-hidden rounded-3xl border border-border-subtle bg-surface",
            "transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-foreground/16",
            "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_28px_60px_rgba(0,0,0,0.4)]"
          )}
        >
          <div className="flex items-center justify-between border-b border-border-subtle/80 px-6 py-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-signal">
              {featuredOutcomes.featuredLabel}
            </p>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-foreground/45">
              Case file · 01
            </span>
          </div>
          <div className="grid gap-4 p-6 md:p-7 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
            <div>
              <h3 className="max-w-[26ch] font-syne text-2xl leading-tight text-foreground md:text-[1.85rem]">
                {featuredOutcomes.featuredTitle}
              </h3>
              <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
                {featuredOutcomes.featuredBody}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-foreground transition-[gap] duration-300 group-hover:gap-3">
                {featuredOutcomes.featuredCta.label}
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            {/* Mini stat callout */}
            <div className="rounded-2xl border border-border-subtle bg-surface-muted/60 p-4">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-foreground/45">
                Primary result
              </p>
              <p className="mt-2 font-syne text-3xl leading-none text-signal">
                {studyBySlug.get(featuredOutcomes.featuredSlug)?.primaryMetric.value ?? "95%"}
              </p>
              <p className="mt-2 text-xs text-body-muted">
                {studyBySlug.get(featuredOutcomes.featuredSlug)?.primaryMetric.label ?? "Manual overhead reduced"}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { k: "Sync", v: "Stable" },
                  { k: "Latency", v: "Low" },
                  { k: "Owner", v: "1" },
                  { k: "Surfaces", v: "5" },
                ].map((cell) => (
                  <div
                    key={cell.k}
                    className="rounded-md border border-border-subtle/80 bg-surface px-2 py-1.5"
                  >
                    <div className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-foreground/45">
                      {cell.k}
                    </div>
                    <div className="font-syne text-xs text-foreground">{cell.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* Testimonial pull-quote */}
        <article className="relative overflow-hidden rounded-3xl border border-border-subtle bg-[linear-gradient(180deg,rgba(20,20,28,1),rgba(12,12,14,1))] p-6 md:p-7">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 80% 0%, rgba(240,90,40,0.10), transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">
              Operator feedback
            </p>
            <svg
              aria-hidden
              className="mt-4 size-6 text-brand/80"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 7h4v4H7c0 2.5 1.5 4 4 4v2c-3.866 0-7-3.134-7-7V7zm9 0h4v4h-4c0 2.5 1.5 4 4 4v2c-3.866 0-7-3.134-7-7V7z" />
            </svg>
            <blockquote className="mt-3 font-syne text-xl leading-snug text-foreground md:text-[1.45rem]">
              {featuredTestimonial.quote}
            </blockquote>
            <footer className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-5">
              <div className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-surface-muted font-syne text-sm text-foreground">
                {featuredTestimonial.author.charAt(0)}
              </div>
              <div className="leading-tight">
                <div className="text-sm text-foreground">{featuredTestimonial.author}</div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/55">
                  {featuredTestimonial.title} · {featuredTestimonial.company}
                </div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </BleedSection>
  );
}
