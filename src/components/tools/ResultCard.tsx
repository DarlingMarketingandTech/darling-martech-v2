import { Button } from "@/components/ui/button";
import type { Tool, ToolResult } from "@/types";

type ResultCardProps = {
  tool: Tool;
  result: ToolResult;
  onRestart: () => void;
};

export function ResultCard({ tool, result, onRestart }: ResultCardProps) {
  return (
    <section className="surface-band rounded-[2.25rem] p-8 md:p-10">
      <p className="inline-flex rounded-full border border-[#0FD9C8]/30 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
        {result.label}
      </p>
      <h2 className="font-display text-balance mt-6 text-4xl font-semibold md:text-5xl">
        {result.headline}
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{result.description}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href={result.ctaHref} size="lg">
          {result.ctaLabel}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={onRestart}>
          Run {tool.title} again
        </Button>
      </div>
    </section>
  );
}
