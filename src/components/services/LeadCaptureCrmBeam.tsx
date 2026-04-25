"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/AnimatedBeam";

function Node({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="min-w-[120px] rounded-2xl border border-[#F5F4F0]/15 bg-[#111118]/90 px-4 py-3 text-center shadow-[0_0_0_1px_rgba(15,217,200,0.04)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#0FD9C8]/88">{subtitle}</p>
      <p className="mt-1 text-sm font-semibold text-[#F5F4F0]">{title}</p>
    </div>
  );
}

/**
 * Funnel replacement visual: shows how captured demand flows into CRM reliably.
 */
export function LeadCaptureCrmBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[300px] w-full items-center justify-between overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[radial-gradient(circle_at_20%_30%,rgba(240,90,40,0.12),transparent_46%),radial-gradient(circle_at_80%_75%,rgba(15,217,200,0.12),transparent_44%),#0C0C0E] px-5 sm:min-h-[340px] sm:px-8"
      aria-label="Lead Capture connected to CRM"
    >
      <div ref={leadRef}>
        <Node title="Lead Capture" subtitle="Source" />
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leadRef}
        toRef={crmRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div ref={crmRef}>
        <Node title="CRM" subtitle="Destination" />
      </div>
    </div>
  );
}
