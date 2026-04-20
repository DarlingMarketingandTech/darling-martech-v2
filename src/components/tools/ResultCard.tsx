import { Button } from "@/components/ui/button";
import type { Tool, ToolResult } from "@/types";
import { caseStudies } from "@/data/work/work-index";
import { services } from "@/data/services";

type ResultCardProps = {
  tool: Tool;
  result: ToolResult;
  onRestart: () => void;
};

export function ResultCard({ tool, result, onRestart }: ResultCardProps) {
  const proof = caseStudies.find((study) => study.slug === result.recommendedProofSlug);
  const service = services.find((entry) => entry.slug === result.recommendedService);

  return (
    <section className="surface-band rounded-[2.25rem] p-8 md:p-10">
      <p className="inline-flex rounded-full border border-[#0FD9C8]/30 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
        {result.label}
      </p>
      <h2 className="font-display text-balance mt-6 text-4xl font-semibold md:text-5xl">
        {result.headline}
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{result.description}</p>
      <div className="mt-7 rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/30 p-4">
        <p className="meta-label text-[#F05A28]">Routing path</p>
        <ul className="mt-3 space-y-2 text-sm text-[#F5F4F0]/74">
          <li>Problem: {result.problemCluster}</li>
          <li>Proof: {proof?.title ?? result.recommendedProofSlug}</li>
          <li>Service: {service?.title ?? result.recommendedService}</li>
        </ul>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href={result.ctaHref} size="lg">
          Primary next step: {result.ctaLabel}
        </Button>
        {proof ? (
          <Button href={`/proof/${proof.slug}`} variant="secondary" size="lg">
            Secondary: see related proof
          </Button>
        ) : (
          <Button type="button" variant="secondary" size="lg" onClick={onRestart}>
            Run {tool.title} again
          </Button>
        )}
      </div>
    </section>
  );
}
