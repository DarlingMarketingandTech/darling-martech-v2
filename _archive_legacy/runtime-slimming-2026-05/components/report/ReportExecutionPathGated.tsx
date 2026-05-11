import { Button } from "@/components/ui/button";
import type { ReportExecutionLinks } from "@/components/report/report-types";

type ReportExecutionPathGatedProps = {
  reportId: string;
  accent: string;
  executionLinks: ReportExecutionLinks;
};

export function ReportExecutionPathGated({ reportId, accent, executionLinks }: ReportExecutionPathGatedProps) {
  return (
    <section data-accent={accent} className="rounded-3xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-6 py-9 sm:px-10 sm:py-11">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F4F0]/40">04 · Execute</p>
      <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-[1.7rem]">
        Move from diagnostic to build
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/56">
        This completion is now saved as <span className="font-mono text-[#F5F4F0]/70">{reportId}</span>. Choose the next
        step below.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {executionLinks.primary ? (
          <Button href={executionLinks.primary.href}>
            {executionLinks.primary.label}
          </Button>
        ) : null}
        {executionLinks.secondary ? (
          <Button href={executionLinks.secondary.href} variant="secondary">
            {executionLinks.secondary.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
