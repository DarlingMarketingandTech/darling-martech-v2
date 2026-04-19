import { Button } from "@/components/ui/button";
import type { ProblemPage } from "@/types";

type ProblemClosingSectionProps = {
  closingBlock: ProblemPage["closingBlock"];
};

export function ProblemClosingSection({ closingBlock }: ProblemClosingSectionProps) {
  return (
    <section className="surface-band rounded-[2rem] p-8 md:p-10">
      <h2 className="font-display text-balance mt-1 text-3xl font-semibold md:text-4xl">{closingBlock.headline}</h2>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Button href={closingBlock.primary.href} size="lg">
          {closingBlock.primary.label}
        </Button>
        {closingBlock.secondary ? (
          <Button href={closingBlock.secondary.href} variant="secondary" size="lg">
            {closingBlock.secondary.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
