import { SiteShell } from "@/components/layout/site-shell";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { PageHero } from "@/components/hero/PageHero";
import { problemPages } from "@/data/problems";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/problems"]);

export default function ProblemsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Find your problem first"
        headline="Most growth problems are fixable. The ones that aren't named aren't."
        body="Each page below describes a pattern I see repeatedly in growth-stage companies. If one of them sounds uncomfortably specific, start there."
      />
      <div className="mt-14">
        <ProblemHubGrid problems={problemPages} />
      </div>
    </SiteShell>
  );
}
