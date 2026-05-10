"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Eye,
  LineChart,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion-easings";

type CardMetric = {
  label: string;
  value: string;
  delta?: string; // e.g. "+18%"
};

type CardViz = "lineChart" | "barChart" | "dots" | null;

type OperatingCard = {
  id: string;
  icon: LucideIcon;
  iconBg?: string;
  label: string;
  metrics: CardMetric[];
  viz: CardViz;
  // Position in % of the container (0-100)
  cx: number;
  cy: number;
  // Connection point on chip (0-100 of container)
  // We connect from card center to fixed chip center.
  // Side hint helps the curve flow nicely.
  side: "tl" | "tr" | "l" | "r" | "b";
};

const CARDS: OperatingCard[] = [
  {
    id: "website",
    icon: LineChart,
    label: "Website Conversion",
    viz: "lineChart",
    metrics: [{ label: "Conversion Rate", value: "24%", delta: "+24%" }],
    cx: 28,
    cy: 18,
    side: "tl",
  },
  {
    id: "crm",
    icon: User,
    label: "CRM",
    viz: null,
    metrics: [
      { label: "New Opportunities", value: "128", delta: "+18%" },
      { label: "Pipeline Value", value: "$842K" },
    ],
    cx: 80,
    cy: 16,
    side: "tr",
  },
  {
    id: "automation",
    icon: Zap,
    label: "Automation",
    viz: null,
    metrics: [
      { label: "Workflows Active", value: "24", delta: "+30%" },
      { label: "Time Saved", value: "42 hrs" },
    ],
    cx: 88,
    cy: 50,
    side: "r",
  },
  {
    id: "reporting",
    icon: BarChart3,
    label: "Reporting",
    viz: "barChart",
    metrics: [{ label: "Revenue Influence", value: "$1.2M", delta: "+27%" }],
    cx: 18,
    cy: 56,
    side: "l",
  },
  {
    id: "visibility",
    icon: Eye,
    label: "Visibility",
    viz: "dots",
    metrics: [{ label: "Data Connected", value: "100%" }],
    cx: 60,
    cy: 88,
    side: "b",
  },
];

// Chip center in container percentages (matches OperatingLayerScene origin).
const CHIP_CX = 52;
const CHIP_CY = 56;

/* -------------------------------------------------------------------------- */
/* Mini visualizations                                                         */
/* -------------------------------------------------------------------------- */

function MiniLineChart() {
  return (
    <svg viewBox="0 0 80 30" className="h-7 w-full opacity-90" aria-hidden>
      <defs>
        <linearGradient id="ml-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0FD9C8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0FD9C8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M2 24 L12 22 L20 19 L28 18 L36 14 L44 12 L52 8 L60 5 L70 3 L78 2 L78 28 L2 28 Z"
        fill="url(#ml-fill)"
      />
      <path
        d="M2 24 L12 22 L20 19 L28 18 L36 14 L44 12 L52 8 L60 5 L70 3 L78 2"
        fill="none"
        stroke="#0FD9C8"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniBarChart() {
  const heights = [8, 12, 10, 16, 14, 20, 18, 24, 22];
  return (
    <svg viewBox="0 0 80 30" className="h-7 w-full opacity-90" aria-hidden>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 9 + 2}
          y={28 - h}
          width={6}
          height={h}
          rx={1}
          fill="#0FD9C8"
          fillOpacity={0.85}
        />
      ))}
    </svg>
  );
}

function MiniDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {[1, 1, 1, 1, 1, 0, 0].map((on, i) => (
        <span
          key={i}
          className={cn(
            "block size-1.5 rounded-full transition-colors",
            on ? "bg-signal" : "bg-foreground/15",
          )}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Card                                                                        */
/* -------------------------------------------------------------------------- */

function FloatingCard({
  card,
  index,
  reduce,
}: {
  card: OperatingCard;
  index: number;
  reduce: boolean;
}) {
  const Icon = card.icon;

  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${card.cx}%`, top: `${card.cy}%` }}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.92 }}
      animate={reduce ? false : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.55 + index * 0.12,
        ease: EASE_OUT_EXPO,
      }}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        whileHover={
          reduce
            ? undefined
            : {
                scale: 1.04,
                transition: { duration: 0.25 },
              }
        }
        className="group relative w-[148px] cursor-default sm:w-[170px] md:w-[180px]"
      >
        {/* Glow ring on hover */}
        <div className="pointer-events-none absolute -inset-2 rounded-[20px] bg-signal/0 opacity-0 blur-xl transition-all duration-300 group-hover:bg-signal/20 group-hover:opacity-100" />

        {/* Card body */}
        <div className="relative overflow-hidden rounded-2xl border border-foreground/15 bg-[rgba(12,18,24,0.78)] p-3.5 shadow-[0_18px_44px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(245,244,240,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:border-signal/55 group-hover:bg-[rgba(15,30,36,0.85)]">
          {/* Inner glass sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(140deg, rgba(15,217,200,0.10) 0%, rgba(245,244,240,0.02) 35%, transparent 60%)",
            }}
          />

          {/* Icon bubble - floats above card */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <div className="flex size-7 items-center justify-center rounded-full border border-foreground/20 bg-[rgba(20,28,34,0.95)] shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              <Icon className="size-3.5 text-signal" strokeWidth={1.8} />
            </div>
          </div>

          <div className="relative pt-2">
            <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/55">
              {card.label}
            </p>

            {/* Mini viz */}
            {card.viz === "lineChart" && (
              <div className="mt-1.5">
                <MiniLineChart />
              </div>
            )}
            {card.viz === "barChart" && (
              <div className="mt-1.5">
                <MiniBarChart />
              </div>
            )}

            {/* Metrics */}
            <div className="mt-2 space-y-1.5">
              {card.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[0.54rem] uppercase tracking-[0.12em] text-foreground/50">
                      {metric.label}
                    </span>
                    {metric.delta ? (
                      <span className="font-mono text-[0.55rem] font-medium text-signal">
                        {"\u2191"} {metric.delta.replace("+", "")}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 font-syne text-base leading-none tracking-tight text-foreground">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots viz */}
            {card.viz === "dots" && (
              <div className="mt-2 flex justify-center">
                <MiniDots />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Connecting lines                                                            */
/* -------------------------------------------------------------------------- */

function ConnectingLines({ reduce }: { reduce: boolean }) {
  const gradId = useId();

  // For each card, we draw a curved line from the chip center to the card.
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 size-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${gradId}-stroke`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0FD9C8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0FD9C8" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={`${gradId}-pulse`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0FD9C8" stopOpacity="1" />
          <stop offset="100%" stopColor="#0FD9C8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {CARDS.map((card, i) => {
        // Curve control point - bend slightly toward the chip's vertical axis
        const sx = card.cx;
        const sy = card.cy;
        const ex = CHIP_CX;
        const ey = CHIP_CY;
        const mx = (sx + ex) / 2;
        const my = (sy + ey) / 2;
        // Add a small curvature based on side
        const curveOffset =
          card.side === "tl" || card.side === "l"
            ? -4
            : card.side === "tr" || card.side === "r"
              ? 4
              : 0;
        const cx = mx + curveOffset;
        const cy = my - 2;

        const pathD = `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;

        return (
          <g key={card.id}>
            {/* Glow underlay */}
            <path
              d={pathD}
              fill="none"
              stroke="#0FD9C8"
              strokeOpacity={0.25}
              strokeWidth={0.7}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Main stroke */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={`url(#${gradId}-stroke)`}
              strokeWidth={0.35}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={reduce ? false : { pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.4 + i * 0.12,
                ease: EASE_OUT_EXPO,
              }}
            />

            {/* Endpoint dots */}
            <circle cx={sx} cy={sy} r={0.7} fill="#0FD9C8" opacity={0.95} />
            <circle cx={ex} cy={ey} r={0.6} fill="#0FD9C8" opacity={0.7} />

            {/* Travelling pulse along the path */}
            {!reduce ? (
              <motion.circle
                cx={0}
                cy={0}
                r={0.9}
                fill={`url(#${gradId}-pulse)`}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration: 2.6 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1 + i * 0.4,
                }}
                style={{
                  offsetPath: `path('${pathD}')`,
                  offsetRotate: "0deg",
                }}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Public                                                                      */
/* -------------------------------------------------------------------------- */

export function OperatingLayerCards() {
  const reduce = useReducedMotion() === true;

  return (
    <>
      <ConnectingLines reduce={reduce} />
      {CARDS.map((card, i) => (
        <FloatingCard key={card.id} card={card} index={i} reduce={reduce} />
      ))}
    </>
  );
}
