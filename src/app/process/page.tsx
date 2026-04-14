import { SiteShell } from "@/components/layout/site-shell";
import { processData } from "@/data/process";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/process"]);

export default function ProcessPage() {
  return (
    <SiteShell>
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">How I work</p>
        <h1 className="font-display mt-5 text-4xl font-semibold md:text-6xl">
          Every engagement starts with a diagnosis, not a proposal.
        </h1>
      </section>
      <section className="mt-14 grid gap-6 md:grid-cols-2">
        {processData.principles.map((principle) => (
          <article key={principle.title} className="surface-card rounded-3xl p-7">
            <h2 className="font-display text-2xl font-semibold">{principle.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">
              {principle.description}
            </p>
          </article>
        ))}
      </section>
      <section className="mt-14 grid gap-5">
        {processData.steps.map((step) => (
          <article key={step.number} className="surface-card rounded-3xl p-7">
            <p className="font-mono text-xl text-[#F05A28]">{step.number}</p>
            <h2 className="font-display mt-3 text-2xl font-semibold">{step.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">{step.description}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
