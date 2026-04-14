import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { PrinciplesGrid } from "@/components/process/PrinciplesGrid";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processData } from "@/data/process";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/process"]);

export default function ProcessPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="How I work"
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
    </SiteShell>
  );
}
