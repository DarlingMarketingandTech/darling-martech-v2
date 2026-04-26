"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ProofTelemetryCanvas } from "./ProofTelemetryCanvas";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { cn } from "@/lib/utils";
import type { CaseStudy, ProofVisualizerType } from "@/types";

const DEFAULT_VIZ: ProofVisualizerType = "merge";

type ProofTelemetryRowProps = {
  caseStudy: CaseStudy;
};

export function ProofTelemetryRow({ caseStudy }: ProofTelemetryRowProps) {
  const canvasRootRef = useRef<HTMLDivElement>(null);
  const [loadCanvas, setLoadCanvas] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const [fixDeployed, setFixDeployed] = useState(false);
  const fixActive = reducedMotion || fixDeployed;
  const headlineId = `proof-tel-${caseStudy.slug}-headline`;

  useEffect(() => {
    const root = canvasRootRef.current;
    if (!root || loadCanvas) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadCanvas(true);
          io.disconnect();
        }
      },
      { rootMargin: "140px 0px" }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [loadCanvas]);

  const chips = caseStudy.systemsBuilt.slice(0, 5);
  const problemLine = caseStudy.whatWasBroken?.[0] ?? `Before: ${caseStudy.clientContext}`;
  const fixLine =
    caseStudy.buildSections?.[0]?.title != null
      ? `Deploy: ${caseStudy.buildSections[0].title}`
      : caseStudy.systemsBuilt[0] != null
        ? `Deploy: ${caseStudy.systemsBuilt[0]}`
        : "Deploy: consolidated operating loop";
  const vizType = caseStudy.proofVisualizerType ?? DEFAULT_VIZ;

  return (
    <article
      aria-labelledby={headlineId}
      className="panel-obsidian grain-mask relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10 px-5 py-6 md:rounded-4xl md:px-8 md:py-8"
    >
      <header className="flex flex-col gap-4 border-b border-[#F5F4F0]/8 pb-5 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="min-w-0">
          <p className="meta-label text-[#F05A28]/90">Proof log · {caseStudy.timeline}</p>
          <h3
            id={headlineId}
            className="font-display mt-2 max-w-xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl"
          >
            {caseStudy.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/58">{caseStudy.resultSummary}</p>
        </div>
        <div className="shrink-0 md:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F4F0]/40">Primary signal</p>
          <MonoMetric
            value={caseStudy.primaryMetric.value}
            label={caseStudy.primaryMetric.label}
            size="sm"
            className="mt-1 md:ml-auto md:text-right"
            animateValue={fixActive && loadCanvas}
          />
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)_minmax(0,1fr)] lg:items-start lg:gap-8">
        <div className="space-y-3 font-mono text-[11px] leading-relaxed text-[#F5F4F0]/62">
          <p>
            <span className="text-[#F05A28]/90">01 baseline</span> — {problemLine}
          </p>
          <p>
            <span className="text-[#0FD9C8]/90">02 intervention</span> — {fixLine}
          </p>
          <p>
            <span className="text-[#F5F4F0]/45">03 operating delta</span> —{" "}
            {caseStudy.operatingImpact ?? caseStudy.outcomeHeadline}
          </p>
        </div>

        <div
          ref={canvasRootRef}
          className="relative min-h-[220px] overflow-hidden rounded-2xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/55 md:min-h-[260px]"
          aria-label="Architecture preview"
        >
          {loadCanvas ? (
            <ProofTelemetryCanvas
              type={vizType}
              fixDeployed={fixActive}
              reducedMotion={reducedMotion}
              instanceId={caseStudy.slug}
            />
          ) : (
            <div
              className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(245,244,240,0.04)_50%,transparent_60%)] motion-safe:animate-pulse"
              aria-hidden
            />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/45">Stack signals</p>
          <ul className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip}>
                <span className="rounded-md border border-[#F5F4F0]/12 bg-[#0C0C0E]/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F5F4F0]/58 motion-safe:transition-colors motion-safe:duration-200 hover:border-[#0FD9C8]/25 hover:text-[#F5F4F0]/72">
                  {chip}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-[#F5F4F0]/8 pt-4">
            <button
              type="button"
              disabled={reducedMotion}
              aria-pressed={fixActive}
              onClick={() => setFixDeployed((v) => !v)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]",
                fixDeployed
                  ? "border-[#0FD9C8]/45 text-[#0FD9C8]"
                  : "border-[#F05A28]/40 text-[#F05A28]",
                reducedMotion && "cursor-not-allowed opacity-50"
              )}
            >
              {reducedMotion ? "After state (reduced motion)" : fixDeployed ? "Show baseline" : "Show operating fix"}
            </button>
            <Link
              href={`/proof/${caseStudy.slug}`}
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F5F4F0]/55 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#F05A28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FD9C8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]"
            >
              Open full dossier →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
