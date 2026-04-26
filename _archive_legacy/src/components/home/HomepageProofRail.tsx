"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/work/work-index";
import { HOMEPAGE_PROOF_RAIL_SLIDES } from "@/data/homepage-proof-rail";
import { cn } from "@/lib/utils";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type ResolvedSlide = (typeof HOMEPAGE_PROOF_RAIL_SLIDES)[number];

function resolveSlides(): ResolvedSlide[] {
  return HOMEPAGE_PROOF_RAIL_SLIDES.filter((slide) =>
    caseStudies.some((s) => s.slug === slide.slug)
  );
}

type HomepageProofRailProps = {
  className?: string;
};

export function HomepageProofRail({ className }: HomepageProofRailProps) {
  const slides = useMemo(() => resolveSlides(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = slides[activeIndex];

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6800);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (!active) return null;

  return (
    <section
      className={cn(
        "mt-6 border-y border-[#F5F4F0]/10 bg-[#0e0e12] px-4 py-16 md:mt-8 md:px-8 md:py-20",
        className
      )}
      aria-label="Documented system outcomes"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="meta-label text-[#F05A28]/90">Documented outcomes</p>
            <h2 className="font-display mt-2 max-w-2xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
              What broke → what shipped → what moved.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#F5F4F0]/55">
              Proof-first: stakes, pre-state, intervention, and results. Full case narratives (including context
              labels) live on{" "}
              <Link href="/proof" className="text-[#0FD9C8]/90 underline decoration-[#0FD9C8]/25 underline-offset-4">
                proof pages
              </Link>
              — this strip stays system-change, not client promotion.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <Link
              href="/proof"
              className="text-sm font-medium text-[#F5F4F0]/55 underline decoration-[#F5F4F0]/18 underline-offset-4 transition-colors hover:text-[#0FD9C8] hover:decoration-[#0FD9C8]/35"
            >
              Full proof index →
            </Link>
            <Link
              href="/problems"
              className="text-sm font-medium text-[#F5F4F0]/42 underline decoration-[#F5F4F0]/12 underline-offset-4 transition-colors hover:text-[#F5A428]/90 hover:decoration-[#F05A28]/30"
            >
              Problem taxonomy →
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#F5F4F0]/12 bg-[#101015]">
          <div className="absolute inset-0" aria-hidden>
            <CloudinaryImage
              publicId={active.backgroundPublicId}
              alt=""
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="ambient-visual-drift h-full w-full object-cover opacity-55 transition-opacity duration-700"
              transforms="e_blur:180"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#0C0C0E]/92 via-[#0C0C0E]/72 to-[#0C0C0E]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_10%_10%,rgba(15,217,200,0.18),transparent_50%)]" />
          </div>

          <div className="relative z-10 grid min-h-[460px] items-end gap-6 px-6 py-8 md:min-h-[540px] md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-10">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/50">Stakes</p>
              <h3 className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
                {active.stakes}
              </h3>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-[#F5F4F0]/45">Pre-state</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#F5F4F0]/72 md:text-base">{active.preState}</p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-[#F5F4F0]/45">Intervention</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#F5F4F0]/70 md:text-base">{active.intervention}</p>
              <p className="mt-5 text-lg font-semibold text-[#0FD9C8] md:text-2xl">{active.outcome}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/68">{active.outcomeContext}</p>
              <p className="mt-4 border-l-2 border-[#F05A28]/45 pl-3 text-sm italic leading-relaxed text-[#F5F4F0]/58">
                {active.principle}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/proof/${active.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F05A28]/50 bg-[#F05A28]/12 px-5 py-2.5 text-sm font-medium text-[#F5F4F0] transition-colors hover:bg-[#F05A28]/22"
                >
                  Read full proof
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="flex items-end justify-start gap-2 md:justify-end">
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F4F0]/20 bg-[#0f1015]/70 text-[#F5F4F0]/78 transition-colors hover:border-[#F5F4F0]/35 hover:text-[#F5F4F0]"
                aria-label="Previous outcome"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F4F0]/20 bg-[#0f1015]/70 text-[#F5F4F0]/78 transition-colors hover:border-[#F5F4F0]/35 hover:text-[#F5F4F0]"
                aria-label="Next outcome"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative z-10 border-t border-[#F5F4F0]/10 bg-[#0d0e13]/88 px-4 py-4 md:px-6">
            <ul className="grid gap-2 md:grid-cols-5">
              {slides.map((slide, index) => (
                <li key={slide.slug}>
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
                    <p className="line-clamp-2 text-xs font-semibold leading-snug text-[#F5F4F0]">{slide.outcome}</p>
                    <p
                      className={cn(
                        "mt-1 line-clamp-2 text-[11px] leading-snug",
                        index === activeIndex ? "text-[#0FD9C8]/90" : "text-[#F5F4F0]/48"
                      )}
                    >
                      {slide.stakes}
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
