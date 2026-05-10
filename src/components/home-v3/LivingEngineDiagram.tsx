"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * The Living Engine
 * ------------------
 * Scroll-driven SVG diagram of the Darling MarTech "operating layer".
 *
 * Visual story (driven by the host element's scroll progress):
 *   - 0%   Nodes are scattered. Connections are dashed and dim — the system is
 *          fragmented (Website / CRM / Reporting drift apart).
 *   - 50%  Nodes ease toward their canonical positions around an Operator core.
 *   - 100% Connections snap solid and a glowing teal data stream travels along
 *          each edge, expressing the "accountable operating layer".
 *
 * Implementation notes:
 *   - Uses pure SVG + Framer Motion `useTransform` so it stays GPU-light.
 *   - No external assets. No image deps.
 *   - Respects `prefers-reduced-motion` — falls back to the connected end-state.
 */

type DiagramNode = {
  id: "website" | "crm" | "reporting" | "operator";
  label: string;
  meta: string;
  /** Final X / Y on a 0..1 grid (centered around the SVG viewBox). */
  finalX: number;
  finalY: number;
  /** Initial scattered offset (delta in viewBox units). */
  scatterX: number;
  scatterY: number;
  /** Visual size of the rounded chip. */
  width: number;
  height: number;
  /** Whether this node is the central operator core. */
  isCore?: boolean;
};

const VIEW_W = 560;
const VIEW_H = 560;

// Final positions are arranged around a central "operator" node so the resolved
// graph reads as one connected operating layer with three input streams.
const NODES: DiagramNode[] = [
  {
    id: "website",
    label: "Website",
    meta: "Conversion",
    finalX: 90,
    finalY: 140,
    scatterX: -56,
    scatterY: -72,
    width: 132,
    height: 52,
  },
  {
    id: "crm",
    label: "CRM",
    meta: "Lifecycle",
    finalX: 410,
    finalY: 100,
    scatterX: 84,
    scatterY: -86,
    width: 132,
    height: 52,
  },
  {
    id: "reporting",
    label: "Reporting",
    meta: "Attribution",
    finalX: 360,
    finalY: 410,
    scatterX: 92,
    scatterY: 88,
    width: 138,
    height: 52,
  },
  {
    id: "operator",
    label: "Operator Layer",
    meta: "Accountable",
    finalX: 220,
    finalY: 270,
    scatterX: 0,
    scatterY: 0,
    width: 168,
    height: 64,
    isCore: true,
  },
];

const EDGES: Array<{ from: DiagramNode["id"]; to: "operator" }> = [
  { from: "website", to: "operator" },
  { from: "crm", to: "operator" },
  { from: "reporting", to: "operator" },
];

function nodeById(id: DiagramNode["id"]): DiagramNode {
  const found = NODES.find((n) => n.id === id);
  if (!found) throw new Error(`LivingEngine: missing node ${id}`);
  return found;
}

/** Animated rounded-rect node chip whose position interpolates along progress. */
function NodeChip({
  node,
  progress,
  reduce,
}: {
  node: DiagramNode;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const cx = node.finalX;
  const cy = node.finalY;
  const startX = cx + node.scatterX;
  const startY = cy + node.scatterY;

  const x = useTransform(progress, [0, 1], [startX, cx]);
  const y = useTransform(progress, [0, 1], [startY, cy]);
  const opacity = useTransform(progress, [0, 0.2, 1], [0.55, 0.78, 1]);
  const tilt = useTransform(progress, [0, 1], [node.scatterX > 0 ? 4 : -4, 0]);

  // Per-node center offsets so we can draw from chip top-left while the
  // motion values represent the chip *center*.
  const left = node.width / 2;
  const top = node.height / 2;

  if (reduce) {
    return (
      <g transform={`translate(${cx - left} ${cy - top})`}>
        <ChipBody node={node} />
      </g>
    );
  }

  return (
    <motion.g
      style={{ x, y, opacity, rotate: tilt, originX: "50%", originY: "50%" }}
      transform={`translate(${-left} ${-top})`}
    >
      <ChipBody node={node} />
    </motion.g>
  );
}

function ChipBody({ node }: { node: DiagramNode }) {
  const radius = 14;
  const isCore = node.isCore;
  return (
    <g>
      {/* Soft outer halo on the core node */}
      {isCore ? (
        <rect
          x={-6}
          y={-6}
          width={node.width + 12}
          height={node.height + 12}
          rx={radius + 4}
          fill="url(#core-halo)"
          opacity={0.55}
        />
      ) : null}

      <rect
        width={node.width}
        height={node.height}
        rx={radius}
        fill={isCore ? "url(#core-fill)" : "url(#node-fill)"}
        stroke={isCore ? "rgba(15,217,200,0.55)" : "rgba(245,244,240,0.14)"}
        strokeWidth={1}
      />

      {/* status dot */}
      <circle
        cx={14}
        cy={node.height / 2}
        r={3}
        fill={isCore ? "#0FD9C8" : "rgba(245,244,240,0.55)"}
      />
      {isCore ? (
        <circle
          cx={14}
          cy={node.height / 2}
          r={6}
          fill="none"
          stroke="rgba(15,217,200,0.45)"
          strokeWidth={1}
        />
      ) : null}

      <text
        x={28}
        y={node.height / 2 - 5}
        fill="#F5F4F0"
        fontFamily="var(--font-syne)"
        fontSize={isCore ? 16 : 14}
        fontWeight={600}
        dominantBaseline="middle"
      >
        {node.label}
      </text>
      <text
        x={28}
        y={node.height / 2 + 11}
        fill={isCore ? "rgba(15,217,200,0.92)" : "rgba(245,244,240,0.55)"}
        fontFamily="var(--font-mono)"
        fontSize={9}
        letterSpacing={1.4}
        dominantBaseline="middle"
      >
        {node.meta.toUpperCase()}
      </text>
    </g>
  );
}

/** A connection line that morphs from broken/dashed to solid + traveling pulse. */
function ConnectionEdge({
  from,
  progress,
  reduce,
  delay,
}: {
  from: DiagramNode;
  progress: MotionValue<number>;
  reduce: boolean;
  delay: number;
}) {
  const to = nodeById("operator");
  const x1 = from.finalX;
  const y1 = from.finalY;
  const x2 = to.finalX;
  const y2 = to.finalY;

  // Initial scattered endpoints
  const sx1 = x1 + from.scatterX;
  const sy1 = y1 + from.scatterY;

  const startX = useTransform(progress, [0, 1], [sx1, x1]);
  const startY = useTransform(progress, [0, 1], [sy1, y1]);

  // Dashed → solid feeling. We morph stroke-dasharray length & opacity.
  const dashGap = useTransform(progress, [0, 0.6, 1], [22, 8, 0]);
  const dashLen = useTransform(progress, [0, 0.6, 1], [4, 8, 200]);
  const lineOpacity = useTransform(progress, [0, 0.4, 1], [0.18, 0.42, 0.85]);

  if (reduce) {
    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="url(#edge-stroke)"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </g>
    );
  }

  return (
    <g>
      <motion.line
        x1={startX}
        y1={startY}
        x2={x2}
        y2={y2}
        stroke="url(#edge-stroke)"
        strokeWidth={1.4}
        strokeLinecap="round"
        style={{
          strokeDasharray: useTransform(
            [dashLen, dashGap] as [MotionValue<number>, MotionValue<number>],
            ([len, gap]) => `${len} ${gap}`
          ),
          opacity: lineOpacity,
        }}
      />

      {/* Traveling glow pulse along the edge — kicks in once connected */}
      <motion.circle
        r={3.2}
        fill="#0FD9C8"
        filter="url(#stream-blur)"
        style={{ opacity: useTransform(progress, [0.5, 1], [0, 1]) }}
        animate={{
          // Move along the line by interpolating the offsetDistance via cx/cy
          cx: [sx1, x1, x2, x2],
          cy: [sy1, y1, y2, y2],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
          times: [0, 0.2, 1, 1],
        }}
      />
    </g>
  );
}

export function LivingEngineDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start when the diagram enters the viewport, finish when it leaves the top.
    offset: ["start end", "end start"],
  });

  // We map the raw scroll progress into a "snap" curve: nodes start broken,
  // settle around 30%-70%, then stay connected.
  const connect = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.45, 1, 1]);

  const edges = useMemo(
    () => EDGES.map((e) => ({ ...e, fromNode: nodeById(e.from) })),
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative isolate overflow-hidden rounded-3xl border border-border-subtle bg-[linear-gradient(180deg,rgba(20,20,28,0.95)_0%,rgba(12,12,14,0.96)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_28px_80px_rgba(0,0,0,0.45)]"
    >
      {/* Top schematic header */}
      <div className="flex items-center justify-between border-b border-border-subtle/80 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex size-2 rounded-full bg-signal">
            <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-foreground/60">
            Operating Layer · Live
          </span>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/40">
          v3 · sync 12 / 12
        </span>
      </div>

      {/* Diagram body */}
      <div className="relative aspect-square w-full">
        {/* Schematic grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,244,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,240,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.95), rgba(0,0,0,0.2) 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.95), rgba(0,0,0,0.2) 75%)",
          }}
        />

        {/* Soft accent washes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 55%, rgba(15,217,200,0.10) 0%, rgba(15,217,200,0) 70%), radial-gradient(40% 35% at 18% 18%, rgba(240,90,40,0.10) 0%, rgba(240,90,40,0) 70%)",
          }}
        />

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="edge-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(245,244,240,0.5)" />
              <stop offset="55%" stopColor="rgba(15,217,200,0.85)" />
              <stop offset="100%" stopColor="rgba(15,217,200,0.4)" />
            </linearGradient>
            <linearGradient id="node-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(28,28,36,0.95)" />
              <stop offset="100%" stopColor="rgba(18,18,24,0.95)" />
            </linearGradient>
            <linearGradient id="core-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(30,42,46,0.98)" />
              <stop offset="100%" stopColor="rgba(15,22,26,0.98)" />
            </linearGradient>
            <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(15,217,200,0.35)" />
              <stop offset="100%" stopColor="rgba(15,217,200,0)" />
            </radialGradient>
            <filter id="stream-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          {/* Edges first so nodes render on top */}
          {edges.map((edge, idx) => (
            <ConnectionEdge
              key={edge.from}
              from={edge.fromNode}
              progress={connect}
              reduce={reduce}
              delay={idx * 0.6}
            />
          ))}

          {/* Nodes */}
          {NODES.map((node) => (
            <NodeChip key={node.id} node={node} progress={connect} reduce={reduce} />
          ))}
        </svg>
      </div>

      {/* Footer telemetry strip */}
      <div className="grid grid-cols-3 divide-x divide-border-subtle/70 border-t border-border-subtle/80 text-center">
        <Telemetry label="Capture" value="Routed" />
        <Telemetry label="Follow-up" value="On rails" />
        <Telemetry label="Reporting" value="Trusted" />
      </div>
    </div>
  );
}

function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-3">
      <div className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-foreground/45">
        {label}
      </div>
      <div className="mt-1 font-syne text-[0.85rem] text-signal">{value}</div>
    </div>
  );
}
