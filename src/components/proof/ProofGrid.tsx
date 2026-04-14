import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ProofCard } from "@/components/proof/ProofCard";
import type { CaseStudy } from "@/types";

type ProofGridProps = {
  caseStudies: CaseStudy[];
  showSystems?: boolean;
};

export function ProofGrid({ caseStudies, showSystems = true }: ProofGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {caseStudies.map((study, index) => (
        <AnimateOnScroll key={study.slug} delay={index * 0.05}>
          <ProofCard caseStudy={study} showSystems={showSystems} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}
