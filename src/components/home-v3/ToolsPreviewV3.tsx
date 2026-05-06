import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homepageV4Data } from "@/data/homepage";
import { tools } from "@/data/labs";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool] as const));

export function ToolsPreviewV3() {
  const section = homepageV4Data.tools;
  const cards = section.cards
    .map((card) => {
      const tool = toolBySlug.get(card.slug);
      return tool ? { tool, card } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const [featured, ...supporting] = cards;

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#0FD9C8]">
            {section.eyebrow}
          </p>
          <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
            {section.intro}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href={section.primaryCta.href} size="lg">
            {section.primaryCta.label}
          </Button>
          <Button href={section.secondaryCta.href} variant="secondary" size="lg">
            {section.secondaryCta.label}
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {featured ? (
          <Link href={`/tools/${featured.tool.slug}`} className="group block">
            <GlassPanel className="h-full overflow-hidden border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.025),rgba(245,244,240,0.015))] transition-transform duration-200 group-hover:-translate-y-1">
              <div className="grid gap-0 lg:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.15fr)]">
                <div className="relative min-h-[260px] overflow-hidden border-b border-[#F5F4F0]/10 lg:border-b-0 lg:border-r">
                  <CloudinaryImage
                    publicId={featured.tool.cloudinaryThumbnail ?? "curated/tools/growth-bottleneck-quiz"}
                    alt=""
                    width={1200}
                    height={900}
                    sizes="(min-width: 1280px) 32vw, 100vw"
                    className="absolute inset-0 size-full object-cover opacity-70"
                    postTransforms="e_sharpen"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.18)_0%,rgba(12,12,14,0.78)_100%)]" />
                </div>
                <div className="p-6 md:p-7">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                    {featured.card.label}
                  </p>
                  <h3 className="mt-3 max-w-[16ch] font-syne text-3xl leading-tight text-[#F5F4F0]">
                    {featured.tool.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/68 md:text-[0.95rem]">
                    {featured.card.body}
                  </p>
                  <p className="mt-4 text-sm text-[#F5F4F0]/52">{featured.tool.estimatedTime}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#F5F4F0]">
                    {featured.card.ctaLabel}
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </GlassPanel>
          </Link>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
          {supporting.map(({ tool, card }) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
              <GlassPanel className="h-full border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.025),rgba(245,244,240,0.015))] p-5 transition-transform duration-200 group-hover:-translate-y-1">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0FD9C8]">
                  {card.label}
                </p>
                <h3 className="mt-3 font-syne text-2xl leading-tight text-[#F5F4F0]">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/68">{card.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#F5F4F0]">
                  {card.ctaLabel}
                  <ArrowUpRight className="size-4" />
                </span>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </div>
    </BleedSection>
  );
}
