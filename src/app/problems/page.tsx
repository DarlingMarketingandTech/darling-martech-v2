import { SiteShell } from "@/components/layout/site-shell";
import { problemPages } from "@/data/problems";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/problems"]);

export default function ProblemsPage() {
  return (
    <SiteShell>
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
          Find your problem first
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold md:text-6xl">
          Most growth problems are fixable. The ones that aren&apos;t named aren&apos;t.
        </h1>
      </section>
      <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {problemPages.map((problem) => (
          <article key={problem.slug} className="surface-card rounded-3xl p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
              {problem.slug.replaceAll("-", " ")}
            </p>
            <h2 className="font-display mt-4 text-2xl font-semibold">{problem.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">
              {problem.heroSubhead}
            </p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
