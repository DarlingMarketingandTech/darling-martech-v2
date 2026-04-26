import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/work/work-index";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { getProofDetailHeroPublicId } from "@/data/proof-visuals";
import type { CaseStudy } from "@/types";

const featuredProof = caseStudies.slice(0, 4);

function ProofCard({ study }: { study: CaseStudy }) {
  const heroPublicId = getProofDetailHeroPublicId(study);

  return (
    <Link
      href={`/proof/${study.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] focus-visible:rounded-2xl"
    >
      <GlassPanel className="relative isolate h-full min-h-72 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-[#0FD9C8]/30 group-hover:shadow-[0_30px_80px_rgba(15,217,200,0.16)]">
        {/* Hover-reveal proof visual */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <CloudinaryImage
            publicId={heroPublicId}
            alt=""
            width={900}
            height={900}
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 50vw, 80vw"
            className="size-full object-cover opacity-50 mix-blend-screen"
            postTransforms="e_sharpen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.5)_0%,rgba(12,12,14,0.92)_100%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-6">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[#0FD9C8]">
            {study.timeline}
          </p>
          <p className="mt-5 font-syne text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.02em] text-[#F5F4F0]">
            {study.primaryMetric.value}
          </p>
          <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#F5F4F0]/52">
            {study.primaryMetric.label}
          </p>

          <div className="mt-6 border-t border-[#F5F4F0]/10 pt-4">
            <h3 className="text-lg font-semibold leading-tight text-[#F5F4F0]">
              {study.clientName}
            </h3>
            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[#F5F4F0]/68">
              {study.outcomeHeadline}
            </p>
          </div>

          <div className="mt-auto flex items-end justify-between pt-6">
            <span className="max-w-[60%] font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#F5F4F0]/40">
              {study.clientContext}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-[#F5F4F0]/90">
              <span>Case study</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </GlassPanel>
    </Link>
  );
}

export function ProofStripV3() {
  return (
    <BleedSection className="relative py-20 md:py-28">
      <div className="mb-12 grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#0FD9C8]/80">Proof</p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
            Documented outcomes from live systems.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
            Each result tied to a system rebuild, not a campaign. Hover for the
            client context. Click for the operating playbook.
          </p>
        </div>
        <Link
          href="/proof"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-[#F5F4F0]/16 bg-[#F5F4F0]/4 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#F5F4F0]/82 transition-colors hover:border-[#F05A28]/40 hover:text-[#F5F4F0]"
        >
          All proof
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
        {featuredProof.map((study) => (
          <ProofCard key={study.slug} study={study} />
        ))}
      </div>

      <ScrollArea className="md:hidden">
        <div className="flex gap-4 pb-5">
          {featuredProof.map((study) => (
            <div key={study.slug} className="w-[80vw] shrink-0 snap-start">
              <ProofCard study={study} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </BleedSection>
  );
}
