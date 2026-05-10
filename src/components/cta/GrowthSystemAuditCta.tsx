"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Signal,
  Target,
  Timer,
} from "lucide-react";

const diagnosticChecks = [
  { id: "01", label: "ICP & demand mapping", status: "Mapped" as const },
  { id: "02", label: "Funnel velocity & drop-off", status: "Scanning" as const },
  { id: "03", label: "Stack overlap & cost drift", status: "Flagged" as const },
  { id: "04", label: "Attribution coverage", status: "Mapped" as const },
  { id: "05", label: "Pipeline → revenue handoff", status: "Pending" as const },
];

const checklist = [
  "Strategy + ICP fit",
  "Funnel + revenue velocity",
  "Stack + workflow drift",
  "Attribution + measurement gaps",
];

const metrics = [
  { label: "Avg. audit time", value: "12", suffix: "min", Icon: Timer },
  { label: "Systems mapped", value: "42", suffix: "checks", Icon: Cpu },
  { label: "Bottlenecks surfaced", value: "5–9", suffix: "per audit", Icon: Target },
];

export function GrowthSystemAuditCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  const [clock, setClock] = useState("00:00");

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      setClock(`${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="growth-audit-heading"
      className="relative w-full overflow-hidden bg-[#0c0c0e] py-20 md:py-28 lg:py-32"
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,244,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,240,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.85), transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.85), transparent 78%)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 82% 0%, rgba(15,217,200,0.10), transparent 70%), radial-gradient(40% 32% at 6% 100%, rgba(240,90,40,0.10), transparent 70%)",
        }}
      />

      {/* Hairline top/bottom rules */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-foreground/55 md:text-[0.7rem]"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0fd9c8] opacity-60" />
              <span className="relative size-2 rounded-full bg-[#0fd9c8]" />
            </span>
            <span>System.Diagnostic / Online</span>
          </div>
          <div className="flex items-center gap-4 text-foreground/45">
            <span>Build 2.4.1</span>
            <span className="hidden sm:inline">Runtime {clock}</span>
            <span className="hidden md:inline">DM // OPS</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: copy & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#0fd9c8]">
              <Signal className="size-3.5" />
              <span>Growth System Audit</span>
            </div>

            <h2
              id="growth-audit-heading"
              className="mt-6 max-w-[18ch] font-syne text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.025em] text-foreground text-balance"
            >
              Find the bottleneck{" "}
              <span className="text-[#f05a28]">before</span> you buy a fix.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
              A 12-minute structural diagnostic that pinpoints where your growth
              system is leaking — across strategy, execution, and measurement —
              so the next dollar lands on the right move.
            </p>

            {/* Inline checklist */}
            <ul className="mt-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6">
              {checklist.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-[#0fd9c8]" />
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/tools/growth-system-audit"
                className="group inline-flex items-center gap-2 rounded-md bg-[#f05a28] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(240,90,40,0.55)] ring-1 ring-[#f05a28]/40 transition-all hover:bg-[#f05a28]/90 hover:shadow-[0_12px_42px_-8px_rgba(240,90,40,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f05a28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]"
              >
                Run free 12-min audit
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-medium text-foreground/90 transition-colors hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]"
              >
                Talk to an operator
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/45 md:text-[0.65rem]">
              <span>No card required</span>
              <span aria-hidden className="text-foreground/20">
                /
              </span>
              <span>Instant report</span>
              <span aria-hidden className="text-foreground/20">
                /
              </span>
              <span>Private & gate-free</span>
            </div>
          </motion.div>

          {/* RIGHT: diagnostic preview panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Corner brackets */}
              <CornerBracket position="tl" />
              <CornerBracket position="tr" />
              <CornerBracket position="bl" />
              <CornerBracket position="br" />

              <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#13131a]/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-sm">
                {/* Panel header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Gauge className="size-3.5 text-[#0fd9c8]" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/70">
                      diag.preview / output
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="size-1.5 rounded-full bg-[#f05a28]/70" />
                    <span className="size-1.5 rounded-full bg-[#0fd9c8]/70" />
                    <span className="size-1.5 rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Rows */}
                <ul className="divide-y divide-white/[0.05]">
                  {diagnosticChecks.map((row, i) => (
                    <motion.li
                      key={row.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : undefined}
                      transition={{ duration: 0.45, delay: 0.4 + i * 0.08 }}
                      className="flex items-center justify-between gap-3 px-5 py-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="font-mono text-[0.6rem] tracking-widest text-foreground/40">
                          {row.id}
                        </span>
                        <span className="truncate text-sm text-foreground/85">
                          {row.label}
                        </span>
                      </div>
                      <StatusPill status={row.status} />
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom waveform */}
                <div className="border-t border-white/[0.06] bg-black/25 px-5 py-4">
                  <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/55">
                    <div className="flex items-center gap-2">
                      <Activity className="size-3.5 text-[#0fd9c8]" />
                      Signal integrity
                    </div>
                    <span className="text-foreground/80">94.2%</span>
                  </div>
                  <Waveform inView={inView} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Metric strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {metrics.map(({ label, value, suffix, Icon }) => (
            <div
              key={label}
              className="group relative flex items-center justify-between gap-4 bg-[#0c0c0e] p-5 transition-colors hover:bg-[#13131a]"
            >
              <div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/45">
                  {label}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5 font-syne text-3xl font-medium tracking-tight text-foreground">
                  {value}
                  <span className="text-xs font-normal text-foreground/45">
                    {suffix}
                  </span>
                </div>
              </div>
              <Icon className="size-5 text-[#0fd9c8]/70 transition-colors group-hover:text-[#0fd9c8]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CornerBracket({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const base =
    "absolute size-3 border-[#0fd9c8]/55 pointer-events-none";
  const map: Record<typeof position, string> = {
    tl: "-left-px -top-px border-l border-t",
    tr: "-right-px -top-px border-r border-t",
    bl: "-left-px -bottom-px border-l border-b",
    br: "-right-px -bottom-px border-r border-b",
  };
  return <span aria-hidden className={`${base} ${map[position]}`} />;
}

function StatusPill({
  status,
}: {
  status: "Mapped" | "Scanning" | "Flagged" | "Pending";
}) {
  const styles =
    status === "Mapped"
      ? "border-[#0fd9c8]/30 bg-[#0fd9c8]/10 text-[#0fd9c8]"
      : status === "Flagged"
        ? "border-[#f05a28]/35 bg-[#f05a28]/10 text-[#f05a28]"
        : status === "Scanning"
          ? "border-white/15 bg-white/[0.04] text-foreground/80"
          : "border-white/10 bg-white/[0.02] text-foreground/55";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] ${styles}`}
    >
      <span
        className={`size-1 rounded-full bg-current ${status === "Scanning" ? "animate-pulse" : ""}`}
      />
      {status}
    </span>
  );
}

function Waveform({ inView }: { inView: boolean }) {
  const bars = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className="mt-3 flex h-10 items-end gap-[2px]">
      {bars.map((i) => {
        const raw = 14 + Math.sin(i * 0.55) * 10 + ((i * 7) % 13);
        const h = Math.max(8, Math.min(40, raw));
        const isAccent = i % 7 === 0;
        return (
          <motion.span
            key={i}
            initial={{ scaleY: 0.15, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.012 }}
            style={{ height: `${h}px`, transformOrigin: "bottom" }}
            className={`w-1 rounded-sm ${isAccent ? "bg-[#f05a28]" : "bg-[#0fd9c8]/55"}`}
          />
        );
      })}
    </div>
  );
}
