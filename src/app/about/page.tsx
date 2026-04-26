import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { FounderHero } from "@/components/about/FounderHero";
import { CredentialsBar } from "@/components/about/CredentialsBar";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { DifferentiatorGrid } from "@/components/about/DifferentiatorGrid";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { aboutMeta, aboutPageData } from "@/data/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(aboutMeta);

export default function AboutPage() {
  return (
    <SiteShell>
      <FounderHero
        eyebrow={aboutPageData.hero.eyebrow}
        headline={aboutPageData.hero.headline}
        body={aboutPageData.hero.body}
        imageId={aboutPageData.hero.imageId}
      />
      <div className="mt-16">
        <CredentialsBar credentials={aboutPageData.credentials} />
      </div>

      <BandSection className="mt-16">
        <SectionHeader
          eyebrow={aboutPageData.timelineIntro.eyebrow}
          title={aboutPageData.timelineIntro.headline}
          body={aboutPageData.timelineIntro.body}
        />
        <div className="mt-10">
          <CareerTimeline entries={aboutPageData.careerTimeline} />
        </div>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow={aboutPageData.differentiators.eyebrow} title={aboutPageData.differentiators.title} />
        <DifferentiatorGrid items={aboutPageData.differentiators.items} />
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader
          eyebrow="Where the work happens"
          title="Operating from Indianapolis, embedded with the team."
          body="Engagements run as a focused operating partnership — same operator from diagnosis through implementation, with weekly cadence and shared visibility."
        />
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[#13131A] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <CloudinaryImage
            publicId="curated/regenerated/storytelling-2026-04/team-strategy-02"
            alt="Operating partner mapping a growth system on a shared dashboard."
            width={1376}
            height={768}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="ambient-visual-drift h-auto w-full object-cover"
          />
        </div>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow="Industries served" title="Breadth without generic advice." />
        <div className="mt-8 flex flex-wrap gap-2">
          {aboutPageData.industries.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#F5F4F0]/10 px-4 py-2 text-sm text-[#F5F4F0]/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </BandSection>

      <div className="mt-16 text-center">
        <h2 className="font-display text-balance text-3xl font-semibold text-[#F5F4F0] md:text-4xl">
          {aboutPageData.closing.headline}
        </h2>
        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-8 text-[#F5F4F0]/72">
          {aboutPageData.closing.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={aboutPageData.closing.primaryCta.href} size="lg">
            {aboutPageData.closing.primaryCta.label}
          </Button>
          <Button href={aboutPageData.closing.secondaryCta.href} variant="secondary" size="lg">
            {aboutPageData.closing.secondaryCta.label}
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
