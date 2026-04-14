import { SiteShell } from "@/components/layout/site-shell";
import { tools } from "@/data/labs";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/tools"]);

export default function ToolsPage() {
  return (
    <SiteShell>
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">Tools</p>
        <h1 className="font-display mt-5 text-4xl font-semibold md:text-6xl">
          Start with a diagnosis, not a sales call.
        </h1>
      </section>
      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.slug} className="surface-card rounded-3xl p-7">
            <h2 className="font-display text-2xl font-semibold">{tool.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">{tool.description}</p>
            <p className="mt-4 text-sm text-[#0FD9C8]">
              {tool.estimatedTime} · {tool.isLive ? "Live" : "Planned"}
            </p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
