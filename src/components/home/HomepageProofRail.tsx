"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/work/work-index";
import { cn } from "@/lib/utils";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import type { CaseStudy } from "@/types";

const RAIL_SLUGS = [
  "graston-technique",
  "primarycare-indy",
  "urgentcare-indy",
  "barbershop-command-center",
  "russell-painting",
] as const;

function getRailCaseStudies(): CaseStudy[] {
  return RAIL_SLUGS.map((slug) => caseStudies.find((s) => s.slug === slug)).filter(
    (study): study is CaseStudy => Boolean(study)
  );
}

type HomepageProofRailProps = {
  className?: string;
};

export function HomepageProofRail({ className }: HomepageProofRailProps) {
  const studies = useMemo(() => getRailCaseStudies(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStudy = studies[activeIndex];

  useEffect(() => {
    if (studies.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % studies.length);
    }, 6800);
    return () => window.clearInterval(interval);
  }, [studies.length]);

  if (!activeStudy) return null;

  const activeImage = activeStudy.cloudinaryImages?.[0];

  return (
    <section
      className={cn(
        "mt-6 border-y border-[#F5F4F0]/10 bg-[#0e0e12] px-4 py-16 md:mt-8 md:px-8 md:py-20",
        className
      )}
      aria-label="Selected client work"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="meta-label text-[#F05A28]/90">Proof in practice</p>
            <h2 className="font-display mt-2 max-w-xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
              A cinematic proof showcase with live signal.
            </h2>
          </div>
          <Link
            href="/proof"
            className="shrink-0 text-sm font-medium text-[#F5F4F0]/55 underline decoration-[#F5F4F0]/18 underline-offset-4 transition-colors hover:text-[#0FD9C8] hover:decoration-[#0FD9C8]/35"
          >
            Full proof index →
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#F5F4F0]/12 bg-[#101015]">
          <div className="absolute inset-0">
            {activeImage ? (
              <CloudinaryImage
                publicId={activeImage}
                alt={activeStudy.clientName}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="h-full w-full object-cover opacity-55 transition-opacity duration-700"
                transforms="e_blur:180"
              />
            ) : null}
            <div className="absolute inset-0 bg-linear-to-r from-[#0C0C0E]/92 via-[#0C0C0E]/72 to-[#0C0C0E]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_10%_10%,rgba(15,217,200,0.18),transparent_50%)]" />
          </div>

          <div className="relative z-10 grid min-h-[460px] items-end gap-6 px-6 py-8 md:min-h-[540px] md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-10">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/50">Featured engagement</p>
              <h3 className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-4xl">
                {activeStudy.clientName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/70 md:text-base">{activeStudy.heroSubhead}</p>
              <p className="mt-5 text-lg font-semibold text-[#0FD9C8] md:text-2xl">{activeStudy.outcomeHeadline}</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#F5F4F0]/72">{activeStudy.resultSummary}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/proof/${activeStudy.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/50 bg-[#F05A28]/12 px-5 py-2.5 text-sm font-medium text-[#F5F4F0] transition-colors hover:bg-[#F05A28]/22"
                >
                  Read proof
                  <span aria-hidden>→</span>
                </Link>
                <p className="text-xs uppercase tracking-[0.13em] text-[#F5F4F0]/48">{activeStudy.clientContext}</p>
              </div>
            </div>

            <div className="flex items-end justify-start gap-2 md:justify-end">
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current - 1 + studies.length) % studies.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F4F0]/20 bg-[#0f1015]/70 text-[#F5F4F0]/78 transition-colors hover:border-[#F5F4F0]/35 hover:text-[#F5F4F0]"
                aria-label="Previous proof"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % studies.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F4F0]/20 bg-[#0f1015]/70 text-[#F5F4F0]/78 transition-colors hover:border-[#F5F4F0]/35 hover:text-[#F5F4F0]"
                aria-label="Next proof"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative z-10 border-t border-[#F5F4F0]/10 bg-[#0d0e13]/88 px-4 py-4 md:px-6">
            <ul className="grid gap-2 md:grid-cols-5">
              {studies.map((study, index) => (
                <li key={study.slug}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-full rounded-xl border px-3 py-3 text-left transition-colors",
                      index === activeIndex
                        ? "border-[#F05A28]/55 bg-[#F05A28]/12"
                        : "border-[#F5F4F0]/10 bg-[#12131a]/70 hover:border-[#F5F4F0]/20"
                    )}
                  >
                    <p className="line-clamp-1 text-xs font-semibold text-[#F5F4F0]">{study.clientName}</p>
                    <p
                      className={cn(
                        "mt-1 line-clamp-1 text-[11px]",
                        index === activeIndex ? "text-[#0FD9C8]" : "text-[#F5F4F0]/52"
                      )}
                    >
                      {study.outcomeHeadline}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
