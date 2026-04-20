import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { getProofAnglesForTool } from "@/data/proof-angles";
import { tools } from "@/data/labs";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";
import { TOOL_META } from "@/data/tools";

export const metadata = buildMetadata(routeMetadata["/tools"]);

const SIMULATION_SLUGS = new Set(
  TOOL_META.filter((tool) => tool.kind === "simulation").map((tool) => tool.slug)
);

export default function ToolsPage() {
  const diagnosticTools = tools.filter((tool) => !SIMULATION_SLUGS.has(tool.slug));
  const simulationTools = tools.filter((tool) => SIMULATION_SLUGS.has(tool.slug));

  const proofAnglesByToolSlug = Object.fromEntries(
    tools.map((tool) => [tool.slug, getProofAnglesForTool(tool.slug, 2)])
  );

  return (
    <SiteShell>
      <PageHero
        eyebrow="Tools"
        headline="Start with a diagnosis, not a sales call."
        body="Each tool exists to answer one practical question before an engagement begins. Use the one that matches the decision you need to make."
      />
      <div className="mt-14 space-y-16">
        <section className="space-y-6">
          <header className="flex flex-col gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#F05A28]">
              Audits · calculators · analyzers
            </p>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Proof-linked diagnostics
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#F5F4F0]/64">
              Each one maps to a real problem, a matching proof, and the service that fixes it. Use
              the one that matches the decision you need to make.
            </p>
          </header>
          <ToolGrid tools={diagnosticTools} proofAnglesByToolSlug={proofAnglesByToolSlug} />
        </section>

        {simulationTools.length ? (
          <section className="space-y-6">
            <header className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
                Simulation experience
              </p>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Standalone strategy simulation
              </h2>
              <p className="max-w-3xl text-base leading-7 text-[#F5F4F0]/64">
                A separate simulation app. Not a diagnostic tool. Not part of the proof-linked system.
                Explore tradeoffs, priorities, and operator thinking in a more open-ended format.
              </p>
            </header>
            <ToolGrid tools={simulationTools} proofAnglesByToolSlug={proofAnglesByToolSlug} />
          </section>
        ) : null}
      </div>
    </SiteShell>
  );
}
