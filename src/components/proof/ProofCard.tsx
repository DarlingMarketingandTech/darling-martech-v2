import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoMetric } from "@/components/ui/MonoMetric";
import type { CaseStudy } from "@/types";

type ProofCardProps = {
  caseStudy: CaseStudy;
  showSystems?: boolean;
};

export function ProofCard({ caseStudy, showSystems = true }: ProofCardProps) {
  return (
    <article className="surface-card grain-mask rounded-[2rem] border-l-4 border-l-[#F05A28] p-7">
      <p className="text-sm text-[#0FD9C8]">{caseStudy.clientName}</p>
      <h3 className="font-display text-balance mt-3 text-2xl font-semibold">{caseStudy.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/58">{caseStudy.clientContext}</p>

      <div className="mt-6">
        <MonoMetric value={caseStudy.primaryMetric.value} label={caseStudy.primaryMetric.label} size="md" />
      </div>

      <p className="mt-5 text-base leading-7 text-[#F5F4F0]/72">{caseStudy.resultSummary}</p>

      {showSystems ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {caseStudy.systemsBuilt.map((system) => (
            <span
              key={system}
              className="rounded-full border border-[#F5F4F0]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#F5F4F0]/56"
            >
              {system}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-4">
        <Eyebrow accent="teal">{caseStudy.outcomeTags.join(" · ")}</Eyebrow>
        <Link href={`/proof/${caseStudy.slug}`} className="text-sm text-[#F05A28] transition-colors hover:text-[#ff6d40]">
          Read the full proof
        </Link>
      </div>
    </article>
  );
}
