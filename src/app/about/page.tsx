import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { FounderHero } from "@/components/about/FounderHero";
import { CredentialsBar } from "@/components/about/CredentialsBar";
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
        <ol className="relative mt-10 border-l border-[#F5F4F0]/12 pl-8">
          {aboutPageData.timeline.map((entry) => (
            <li key={entry.range} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#F05A28]" aria-hidden />
              <p className="font-mono text-sm text-[#0FD9C8]">{entry.range}</p>
              <p className="mt-1 font-display text-lg font-semibold">
                {entry.role} · {entry.location}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#F5F4F0]/72">{entry.description}</p>
            </li>
          ))}
        </ol>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow={aboutPageData.differentiators.eyebrow} title="How this is different" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {aboutPageData.differentiators.items.map((item) => (
            <article key={item.title}>
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{item.body}</p>
            </article>
          ))}
        </div>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow="Industries served" title="Breadth without generic advice." />
        <div className="mt-8 flex flex-wrap gap-2">
          {aboutPageData.industries.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#F5F4F0]/12 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#F5F4F0]/65"
            >
              {tag}
            </span>
          ))}
        </div>
      </BandSection>

      <div className="mt-16 text-center">
        <h2 className="font-display text-balance text-3xl font-semibold md:text-4xl">{aboutPageData.closing.headline}</h2>
        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-8 text-[#F5F4F0]/72">
          {aboutPageData.closing.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={aboutPageData.closing.primaryCta.href} size="lg">
            {aboutPageData.closing.primaryCta.label}
          </Button>
          <Button href={aboutPageData.closing.secondaryCta.href} variant="ghost" size="lg">
            {aboutPageData.closing.secondaryCta.label}
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
