import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";
import { caseStudies } from "@/data/work/work-index";
import { homepageData, homepageMeta } from "@/data/homepage";
import { problemPages } from "@/data/problems";
import { tools } from "@/data/labs";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(homepageMeta);

export default function HomePage() {
  const featuredProblems = problemPages.slice(0, 4);
  const featuredTools = tools.slice(0, 4);
  const featuredProof = caseStudies.slice(0, 3);

  return (
    <SiteShell>
      <section className="grid gap-10 border-b border-[#F5F4F0]/10 pb-16 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
            {homepageData.hero.eyebrow}
          </p>
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            {homepageData.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F5F4F0]/75">
            {homepageData.hero.subhead}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={homepageData.hero.primaryCta.href} size="lg">
              {homepageData.hero.primaryCta.label}
            </Button>
            <Button href={homepageData.hero.secondaryCta.href} variant="secondary" size="lg">
              {homepageData.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="surface-card rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">Proof bar</p>
          <div className="mt-5 space-y-5">
            {homepageData.proofBar.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-3xl font-bold text-[#22C55E]">{metric.value}</p>
                <p className="mt-1 text-sm text-[#F5F4F0]/60">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
              {homepageData.problemSection.eyebrow}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
              {homepageData.problemSection.headline}
            </h2>
          </div>
          <Button href={homepageData.problemSection.diagnosticCta.href} variant="ghost">
            {homepageData.problemSection.diagnosticCta.label}
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProblems.map((problem) => (
            <article key={problem.slug} className="surface-card rounded-3xl p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
                {problem.slug.replaceAll("-", " ")}
              </p>
              <h3 className="font-display mt-4 text-2xl font-semibold">{problem.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">
                {problem.heroSubhead}
              </p>
              <p className="mt-6 text-sm text-[#22C55E]">
                Related proof: {problem.relatedProof.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card rounded-[2rem] p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
          {homepageData.processSection.eyebrow}
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
          {homepageData.processSection.headline}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#F5F4F0]/75">
          {homepageData.processSection.body}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homepageData.processSection.columns.map((column) => (
            <article key={column.number} className="rounded-3xl border border-[#F5F4F0]/10 p-6">
              <p className="font-mono text-xl text-[#F05A28]">{column.number}</p>
              <h3 className="font-display mt-3 text-2xl font-semibold">{column.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">{column.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
            {homepageData.toolsPreview.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold md:text-5xl">
            {homepageData.toolsPreview.headline}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-[#F5F4F0]/75">
            {homepageData.toolsPreview.body}
          </p>
          <div className="mt-8">
            <Button href={homepageData.toolsPreview.cta.href} variant="secondary">
              {homepageData.toolsPreview.cta.label}
            </Button>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredTools.map((tool) => (
            <article key={tool.slug} className="surface-card rounded-3xl p-6">
              <h3 className="font-display text-2xl font-semibold">{tool.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">{tool.tagline}</p>
              <p className="mt-4 text-sm text-[#0FD9C8]">{tool.estimatedTime}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#F5F4F0]/10 py-16">
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
          Selected proof
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredProof.map((study) => (
            <article key={study.slug} className="surface-card rounded-3xl p-6">
              <p className="text-sm text-[#0FD9C8]">{study.clientName}</p>
              <h3 className="font-display mt-3 text-2xl font-semibold">{study.title}</h3>
              <p className="font-mono mt-6 text-4xl font-bold text-[#22C55E]">
                {study.primaryMetric.value}
              </p>
              <p className="mt-2 text-sm text-[#F5F4F0]/60">{study.primaryMetric.label}</p>
              <p className="mt-4 text-base leading-7 text-[#F5F4F0]/70">
                {study.resultSummary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card rounded-[2rem] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
          {homepageData.ownerOperator.eyebrow}
        </p>
        <h2 className="font-display mx-auto mt-4 max-w-4xl text-3xl font-semibold md:text-5xl">
          {homepageData.ownerOperator.headline}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#F5F4F0]/75">
          {homepageData.ownerOperator.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <Button href={homepageData.ownerOperator.cta.href} variant="ghost">
            {homepageData.ownerOperator.cta.label}
          </Button>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="font-display mx-auto max-w-4xl text-3xl font-semibold md:text-5xl">
          {homepageData.closingCta.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#F5F4F0]/70">
          {homepageData.closingCta.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={homepageData.closingCta.primaryCta.href} size="lg">
            {homepageData.closingCta.primaryCta.label}
          </Button>
          <Button href={homepageData.closingCta.secondaryCta.href} variant="ghost" size="lg">
            {homepageData.closingCta.secondaryCta.label}
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
