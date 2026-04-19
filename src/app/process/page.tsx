import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { PrinciplesGrid } from "@/components/process/PrinciplesGrid";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { EngagementFormatCards } from "@/components/process/EngagementFormatCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { processData } from "@/data/process";
import { routeMetadata } from "@/data/routes";
import { siteConfig } from "@/data/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/process"]);

export default function ProcessPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="HOW I WORK"
        headline="Every engagement starts with a diagnosis, not a proposal."
        body="The process is structured so the real bottleneck gets named before anything is scoped, built, or measured."
      />
      <div className="mt-14">
        <PrinciplesGrid principles={processData.principles} />
      </div>
      <BandSection className="mt-14">
        <SectionHeader eyebrow="Process timeline" title="What the engagement actually looks like." />
        <div className="mt-8">
          <ProcessTimeline steps={processData.steps} />
        </div>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader
          eyebrow="ENGAGEMENT SHAPES"
          title="Three ways this works, depending on what you need."
          body="Every engagement gets scoped individually based on the diagnostic. But most of them fit one of these three shapes."
        />
        <EngagementFormatCards formats={processData.engagementFormats} />
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow="HONEST ABOUT FIT" title="A few things I'm clear about upfront." />
        <ul className="mt-8 space-y-8">
          {processData.whatIDontDo.map((item) => (
            <li key={item.title}>
              <p className="font-display text-lg font-semibold">{item.title}</p>
              <p className="mt-2 max-w-3xl text-base leading-7 text-[#F5F4F0]/72">{item.body}</p>
            </li>
          ))}
        </ul>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow="IS THIS RIGHT FOR YOU?" title="The work looks different depending on where you are." />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {processData.whatGoodLooksLike.map((scenario) => (
            <article key={scenario.title} className="rounded-[1.75rem] border border-[#F5F4F0]/10 p-6">
              <h3 className="font-display text-lg font-semibold leading-snug">{scenario.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#F5F4F0]/72">{scenario.body}</p>
            </article>
          ))}
        </div>
      </BandSection>

      <div className="mt-14 rounded-4xl border border-[#F5F4F0]/8 bg-[#101014]/30 px-6 py-10 text-center md:px-10">
        <p className="text-sm text-[#F5F4F0]/55">
          Not ready to talk yet? Every tool on this site was built for this moment. Run a diagnostic, get a real answer,
          and come back when the time is right.
        </p>
        <div className="mt-4">
          <Button href="/tools" variant="ghost">
            Browse the tools →
          </Button>
        </div>
      </div>

      <div className="mt-14 text-center">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">The first conversation doesn&apos;t cost you anything.</h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-[#F5F4F0]/68">
          If what you&apos;ve read here matches what you&apos;re dealing with, send a message. I&apos;ll read it and get back
          the same day with something useful.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={siteConfig.calComLink} size="lg">
            Start a conversation →
          </Button>
          <Button href="/tools/growth-bottleneck-quiz" variant="ghost" size="lg">
            Or run a free diagnostic first →
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
