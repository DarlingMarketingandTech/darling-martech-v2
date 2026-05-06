import Link from "next/link";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import { problemPages } from "@/data/problems";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";
import { Badge } from "@/components/ui/badge";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { RevealItem, RevealStagger } from "@/components/motion";

const featuredProblems = problemPages.slice(0, 4);

export function ProblemGridV3() {
  return (
    <BleedSection className="relative py-20 md:py-28">
      {/* Section atmospherics */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 40% at 100% 0%, rgba(15,217,200,0.08) 0%, rgba(15,217,200,0) 70%), radial-gradient(40% 35% at 0% 100%, rgba(240,90,40,0.06) 0%, rgba(240,90,40,0) 70%)",
        }}
      />

      <div className="relative mb-12 grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal/80">
            {homepageData.problemSection.eyebrow}
          </p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl">
            {homepageData.problemSection.headline}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body-muted md:text-lg">
            {homepageData.problemSection.body}
          </p>
        </div>
        <Link
          href={homepageData.problemSection.diagnosticCta.href}
          className="group inline-flex items-center gap-2 self-start rounded-full border border-brand/30 bg-brand/8 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand transition-colors hover:bg-brand/14"
        >
          <span className="relative inline-flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          {homepageData.problemSection.diagnosticCta.label}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <RevealStagger className="relative grid gap-5 md:grid-cols-2" staggerChildren={0.1}>
        {featuredProblems.map((problem, idx) => (
          <RevealItem key={problem.slug}>
            <Link
              href={`/problems/${problem.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-2xl"
            >
              <SectionSurface className="relative isolate h-full transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-brand/40 group-hover:shadow-[0_30px_80px_rgba(240,90,40,0.16)]">
                {/* Visual artifact, top-right */}
                {problem.imagePublicId ? (
                  <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-[0.55] transition-opacity duration-500 group-hover:opacity-90">
                    <CloudinaryImage
                      publicId={problem.imagePublicId}
                      alt=""
                      width={520}
                      height={520}
                      sizes="280px"
                      className="size-full object-contain mix-blend-screen"
                      postTransforms="e_sharpen"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(240,90,40,0.22)_0%,rgba(240,90,40,0)_70%)] mix-blend-screen" />
                  </div>
                ) : null}

                <div className="relative z-10 flex h-full flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline" className="border-foreground/22 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-body-muted">
                      {problem.hubCategory}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-foreground/40">
                      <CircleAlert className="size-3.5 text-brand" />
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 max-w-[18ch] font-syne text-2xl leading-[1.1] text-foreground md:text-[1.7rem]">
                    {problem.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-body-muted">
                    {problem.heroSubhead}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <span className="max-w-[60%] font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-signal/90">
                      {problem.proofChip}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-foreground/90">
                      <span className="border-b border-current/0 transition-colors group-hover:border-current/60">
                        Explore
                      </span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-brand to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </SectionSurface>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </BleedSection>
  );
}
