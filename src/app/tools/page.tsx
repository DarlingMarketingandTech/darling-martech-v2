import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { tools } from "@/data/labs";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/tools"]);

export default function ToolsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Tools"
        headline="Start with a diagnosis, not a sales call."
        body="Each tool exists to answer one practical question before an engagement begins. Use the one that matches the decision you need to make."
      />
      <div className="mt-14">
        <ToolGrid tools={tools} />
      </div>
    </SiteShell>
  );
}
