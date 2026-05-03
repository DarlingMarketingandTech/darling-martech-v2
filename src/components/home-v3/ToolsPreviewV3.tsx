import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { tools } from "@/data/labs";
import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const PRIORITIZED_TOOL_SLUGS = [
  "growth-system-audit",
  "cmo-simulator",
  "geo-readiness-auditor",
  "attribution-snapshot",
] as const;

const featuredTools = PRIORITIZED_TOOL_SLUGS
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

export function ToolsPreviewV3() {
  const [hero, ...rest] = featuredTools;
  const section = homepageData.toolsSection;

  return (
    <BleedSection className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(45% 35% at 100% 0%, rgba(15,217,200,0.06) 0%, rgba(15,217,200,0) 70%), radial-gradient(40% 35% at 0% 100%, rgba(240,90,40,0.08) 0%, rgba(240,90,40,0) 70%)",
        }}
      />

      <div className="relative mb-12 grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#0FD9C8]/80">
            <Sparkles className="size-3.5" />
            {section.eyebrow}
          </p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
            {section.headline}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
            {section.body}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start">
          <Button href={section.primaryCta.href} size="lg">
            {section.primaryCta.label}
            <ArrowUpRight className="ml-2 size-4" />
          </Button>
          <Button href={section.secondaryCta.href} variant="ghost" size="lg" className="text-[#F5F4F0]">
            {section.secondaryCta.label}
          </Button>
        </div>
      </div>

      <div className="relative grid gap-5 md:grid-cols-3 md:grid-rows-2">
        {/* Hero tile (spans 2 cols + 2 rows on md) */}
        {hero ? (
          <Link
            href={`/tools/${hero.slug}`}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] focus-visible:rounded-2xl md:col-span-2 md:row-span-2"
          >
            <GlassPanel className="relative isolate flex h-full min-h-[420px] flex-col overflow-hidden p-0 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-[#0FD9C8]/30 group-hover:shadow-[0_30px_80px_rgba(15,217,200,0.16)]">
              {/* Background visual */}
              <div className="absolute inset-0">
                <CloudinaryImage
                  publicId={hero.cloudinaryThumbnail ?? "curated/tools/growth-bottleneck-quiz"}
                  alt=""
                  width={1400}
                  height={1100}
                  sizes="(min-width: 768px) 65vw, 100vw"
                  className="size-full object-cover opacity-[0.42] mix-blend-screen transition-opacity duration-500 group-hover:opacity-60"
                  postTransforms="e_sharpen"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.4)_0%,rgba(12,12,14,0.92)_85%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_30%,rgba(240,90,40,0.18)_0%,rgba(240,90,40,0)_65%)]" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-9">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#0FD9C8]/30 bg-[#0FD9C8]/8 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                    <span className="size-1.5 rounded-full bg-[#0FD9C8]" />
                    Featured · {hero.estimatedTime}
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#F5F4F0]/40">
                    01
                  </span>
                </div>
                <h3 className="mt-5 max-w-[18ch] font-syne text-3xl leading-[1.05] tracking-[-0.01em] text-[#F5F4F0] md:text-[2.6rem]">
                  {hero.title}
                </h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-[#F5F4F0]/74">
                  {hero.tagline}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#F5F4F0]">
                  <span className="border-b border-current/0 transition-colors group-hover:border-current/60">
                    {section.primaryCta.label}
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#0FD9C8_0%,rgba(15,217,200,0)_100%)] transition-transform duration-500 group-hover:scale-x-100" />
            </GlassPanel>
          </Link>
        ) : null}

        {/* Companion tiles */}
        {rest.map((tool, idx) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] focus-visible:rounded-2xl"
          >
            <GlassPanel className="relative isolate flex h-full min-h-[200px] flex-col overflow-hidden p-0 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-[#F05A28]/30 group-hover:shadow-[0_24px_60px_rgba(240,90,40,0.16)]">
              {/* Thumbnail strip on the right */}
              <div className="absolute inset-y-0 right-0 w-[42%] overflow-hidden">
                <CloudinaryImage
                  publicId={tool.cloudinaryThumbnail ?? "curated/tools/growth-bottleneck-quiz"}
                  alt=""
                  width={600}
                  height={600}
                  sizes="(min-width: 768px) 20vw, 50vw"
                  className="size-full object-cover opacity-50 mix-blend-screen transition-opacity duration-500 group-hover:opacity-80"
                  postTransforms="e_sharpen"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,14,0.95)_0%,rgba(12,12,14,0.55)_100%)]" />
              </div>

              <div className="relative z-10 flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                    {tool.estimatedTime}
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#F5F4F0]/40">
                    0{idx + 2}
                  </span>
                </div>
                <h3 className="mt-3 max-w-[14ch] font-syne text-xl leading-[1.1] text-[#F5F4F0] md:text-[1.4rem]">
                  {tool.title}
                </h3>
                <p className="mt-2 max-w-[24ch] text-[0.85rem] leading-relaxed text-[#F5F4F0]/68">
                  {tool.tagline}
                </p>
                <div className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-[#F5F4F0]/90">
                  <span className="border-b border-current/0 transition-colors group-hover:border-current/60">
                    Open
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </BleedSection>
  );
}
