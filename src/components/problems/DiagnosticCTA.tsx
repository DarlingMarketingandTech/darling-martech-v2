import { Button } from "@/components/ui/button";
import type { ProblemPage } from "@/types";

type DiagnosticCTAProps = {
  problem: ProblemPage;
};

export function DiagnosticCTA({ problem }: DiagnosticCTAProps) {
  return (
    <section className="surface-band rounded-[2rem] p-8 md:p-10">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">Next step</p>
      <h2 className="font-display text-balance mt-4 text-3xl font-semibold md:text-5xl">
        If this is the bottleneck, the next move is diagnosis.
      </h2>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">
        Start with the tool if you want structured clarity first. Reach out directly if you already know the conversation needs to happen.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href={problem.cta.primary.href} size="lg">
          {problem.cta.primary.label}
        </Button>
        <Button href={problem.cta.secondary.href} variant="secondary" size="lg">
          {problem.cta.secondary.label}
        </Button>
      </div>
    </section>
  );
}
