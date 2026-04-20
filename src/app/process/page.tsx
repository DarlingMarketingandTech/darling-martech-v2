import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { PrinciplesGrid } from "@/components/process/PrinciplesGrid";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { EngagementFormatsRow } from "@/components/process/EngagementFormatsRow";
import { WhatIDontDoList } from "@/components/process/WhatIDontDoList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { processData } from "@/data/process";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";

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
        <div className="tech-grid-bg mt-8 rounded-3xl p-3 md:p-4">
          <ProcessTimeline steps={processData.steps} />
        </div>
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader
          eyebrow="ENGAGEMENT SHAPES"
          title="Three ways this works, depending on what you need."
          body="Every engagement gets scoped individually based on the diagnostic. But most of them fit one of these three shapes."
        />
        <EngagementFormatsRow formats={processData.engagementFormats} />
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow="HONEST ABOUT FIT" title="A few things I'm clear about upfront." />
        <WhatIDontDoList items={processData.whatIDontDo} />
      </BandSection>

      <BandSection className="mt-14">
        <SectionHeader eyebrow="IS THIS RIGHT FOR YOU?" title="The work looks different depending on where you are." />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {processData.whatGoodLooksLike.map((scenario, i) => (
            <article key={scenario.title} className="panel-obsidian grain-mask rounded-4xl p-6 md:p-7">
              <p className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.14em] text-[#F5F4F0]/36">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-3 text-lg font-semibold leading-snug tracking-[-0.02em]">
                {scenario.title}
              </h3>
              <div className="tech-divider my-4" />
              <p className="text-sm leading-7 text-[#F5F4F0]/72">{scenario.body}</p>
            </article>
          ))}
        </div>
      </BandSection>

      <div className="mt-14 md:mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-[#F5F4F0] md:text-4xl">
            The first conversation doesn&apos;t cost you anything.
          </h2>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Button href="/contact" size="lg">
              Start a conversation
            </Button>
            <Button href="/tools/growth-bottleneck-quiz" variant="secondary" size="lg">
              Or run a free diagnostic
            </Button>
          </div>
          <p className="mt-6">
            <Link
              href="/tools"
              className="text-sm text-[#F5F4F0]/55 underline-offset-4 transition-colors hover:text-[#F5F4F0]/75 hover:underline"
            >
              Not ready to talk yet? Browse the tools →
            </Link>
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
