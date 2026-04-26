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

const PRIMARY_AUDIT_SLUG = "growth-system-audit";

export default function ToolsPage() {
  const diagnosticTools = tools.filter((tool) => !SIMULATION_SLUGS.has(tool.slug));
  const primaryAudit = diagnosticTools.find((t) => t.slug === PRIMARY_AUDIT_SLUG);
  const otherDiagnostics = diagnosticTools.filter((t) => t.slug !== PRIMARY_AUDIT_SLUG);
  const simulationTools = tools.filter((tool) => SIMULATION_SLUGS.has(tool.slug));

  const proofAnglesByToolSlug = Object.fromEntries(
    tools.map((tool) => [tool.slug, getProofAnglesForTool(tool.slug, 2)])
  );

  return (
    <SiteShell>
      <PageHero
        eyebrow="Tools"
        headline="Start with a diagnosis, not a sales call."
        body="The Growth System Audit is the default low-trust entry — map what is broken before you buy tactics. Specialist calculators sit below for specific decisions."
      />
      <div className="mt-14 space-y-16">
        {primaryAudit ? (
          <section className="space-y-6">
            <header className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#F05A28]">
                Start here
              </p>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Growth System Audit</h2>
              <p className="max-w-3xl text-base leading-7 text-[#F5F4F0]/64">
                One structured pass across strategy, conversion, systems, visibility, and attribution. Routes to
                problems, proof, and project paths based on what you surface — not a pitch.
              </p>
            </header>
            <ToolGrid tools={[primaryAudit]} proofAnglesByToolSlug={proofAnglesByToolSlug} />
          </section>
        ) : null}

        <section className="space-y-6">
          <header className="flex flex-col gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#F05A28]">
              Specialist diagnostics
            </p>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Calculators & focused analyzers
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#F5F4F0]/64">
              Use these when you already know the question — e.g. stack economics, attribution shape, or
              channel ROI. They still link out to problems and services; proof stays on case study pages.
            </p>
          </header>
          <ToolGrid tools={otherDiagnostics} proofAnglesByToolSlug={proofAnglesByToolSlug} />
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
