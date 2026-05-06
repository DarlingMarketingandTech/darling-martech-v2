"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { caseStudies } from "@/data/work/work-index";
import { getProofDetailHeroPublicId } from "@/data/proof-visuals";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const studyBySlug = new Map(caseStudies.map((study) => [study.slug, study] as const));

export function SelectedOutcomesV3() {
  const { featuredOutcomes } = homepageV4Data;
  const featuredStudy = studyBySlug.get(featuredOutcomes.featuredSlug);

  if (!featuredStudy) {
    return null;
  }

  const featuredVisual = getProofDetailHeroPublicId(featuredStudy);

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#0FD9C8]">
          {featuredOutcomes.eyebrow}
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
          {featuredOutcomes.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
          {featuredOutcomes.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <GlassPanel className="overflow-hidden border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.025),rgba(245,244,240,0.015))]">
          <div className="grid gap-0 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative min-h-[260px] overflow-hidden border-b border-[#F5F4F0]/10 lg:border-b-0 lg:border-r">
              <CloudinaryImage
                publicId={featuredVisual}
                alt={featuredStudy.proofDetailHeroAlt ?? featuredStudy.title}
                width={1400}
                height={1200}
                sizes="(min-width: 1280px) 34vw, 100vw"
                className="absolute inset-0 size-full object-cover"
                postTransforms="e_sharpen"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.18)_0%,rgba(12,12,14,0.75)_100%)]" />
            </div>

            <div className="p-6 md:p-7">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                {featuredOutcomes.featuredLabel}
              </p>
              <h3 className="mt-3 max-w-[18ch] font-syne text-3xl leading-tight text-[#F5F4F0]">
                {featuredOutcomes.featuredTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/70 md:text-[0.95rem]">
                {featuredOutcomes.featuredBody}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#F5F4F0]/10 bg-[#F5F4F0]/[0.03] p-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#F5F4F0]/50">
                    Primary result
                  </p>
                  <p className="mt-2 font-syne text-3xl leading-none text-[#F5F4F0]">
                    {featuredStudy.primaryMetric.value}
                  </p>
                  <p className="mt-2 text-sm text-[#F5F4F0]/66">{featuredStudy.primaryMetric.label}</p>
                </div>
                <div className="rounded-2xl border border-[#F5F4F0]/10 bg-[#F5F4F0]/[0.03] p-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#F5F4F0]/50">
                    Commercial shift
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/72">
                    {featuredStudy.resultSummary}
                  </p>
                </div>
              </div>

              <Link
                href={featuredOutcomes.featuredCta.href}
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#F5F4F0]"
                onClick={() =>
                  captureClientEvent("proof_card_clicked", {
                    slug: featuredOutcomes.featuredSlug,
                    surface: "featured",
                    href: featuredOutcomes.featuredCta.href,
                  })
                }
              >
                {featuredOutcomes.featuredCta.label}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-4">
          {featuredOutcomes.highlights.map((highlight) => {
            const study = studyBySlug.get(highlight.slug);
            if (!study) {
              return null;
            }

            return (
              <Link
                key={highlight.slug}
                href={`/proof/${highlight.slug}`}
                className="group block"
                onClick={() =>
                  captureClientEvent("proof_card_clicked", {
                    slug: highlight.slug,
                    surface: "highlight",
                    href: `/proof/${highlight.slug}`,
                  })
                }
              >
                <GlassPanel className="h-full border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.025),rgba(245,244,240,0.015))] p-5 transition-transform duration-200 group-hover:-translate-y-1">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                    {highlight.label}
                  </p>
                  <p className="mt-3 font-syne text-3xl leading-none text-[#F5F4F0]">
                    {study.primaryMetric.value}
                  </p>
                  <p className="mt-1 text-sm text-[#F5F4F0]/60">{study.primaryMetric.label}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/70">{highlight.detail}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#F5F4F0]">
                    View proof
                    <ArrowUpRight className="size-4" />
                  </span>
                </GlassPanel>
              </Link>
            );
          })}
        </div>
      </div>
    </BleedSection>
  );
}
