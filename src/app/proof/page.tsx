import { SiteShell } from "@/components/layout/site-shell";
import { proofPageData } from "@/data/proof";
import { routeMetadata } from "@/data/routes";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/proof"]);

export default function ProofPage() {
  return (
    <SiteShell>
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
          {proofPageData.hero.eyebrow}
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold md:text-6xl">
          {proofPageData.hero.headline}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F5F4F0]/75">
          {proofPageData.hero.body}
        </p>
      </section>
      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        {caseStudies.map((study) => (
          <article key={study.slug} className="surface-card rounded-3xl border-l-4 border-[#F05A28] p-7">
            <p className="text-sm text-[#0FD9C8]">{study.outcomeTags.join(" · ")}</p>
            <h2 className="font-display mt-4 text-2xl font-semibold">{study.title}</h2>
            <p className="mt-2 text-sm text-[#F5F4F0]/60">{study.clientContext}</p>
            <p className="font-mono mt-6 text-4xl font-bold text-[#22C55E]">
              {study.primaryMetric.value}
            </p>
            <p className="mt-2 text-sm text-[#F5F4F0]/60">{study.primaryMetric.label}</p>
            <p className="mt-4 text-base leading-7 text-[#F5F4F0]/70">
              {study.resultSummary}
            </p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
