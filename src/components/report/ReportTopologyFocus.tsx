import type { CaseStudy } from "@/types";
import type { ProblemReportStackTool } from "@/data/taxonomy-db";
import type { ReportServiceBrief } from "@/components/report/report-types";

type ReportTopologyFocusProps = {
  accent: string;
  problemSlug: string;
  problemEyebrow: string;
  problemTitle: string;
  primaryServiceSlug: string;
  servicesForSystem: ReportServiceBrief[];
  stackTools: ProblemReportStackTool[];
  caseStudies: CaseStudy[];
};

export function ReportTopologyFocus({
  accent,
  problemSlug,
  problemEyebrow,
  problemTitle,
  primaryServiceSlug,
  servicesForSystem,
  stackTools,
  caseStudies,
}: ReportTopologyFocusProps) {
  return (
    <div data-accent={accent} className="grid gap-5 md:grid-cols-3">
      <article className="rounded-2xl border border-[#F5F4F0]/8 bg-[#13131A]/28 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F4F0]/42">Problem node</p>
        <p className="mt-2 text-sm text-[#F5F4F0]/60">{problemEyebrow}</p>
        <p className="mt-1 font-medium text-[#F5F4F0]">{problemTitle}</p>
        <p className="mt-2 font-mono text-xs text-[#F5F4F0]/45">{problemSlug}</p>
      </article>

      <article className="rounded-2xl border border-[#F5F4F0]/8 bg-[#13131A]/28 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F4F0]/42">Service layer</p>
        <p className="mt-2 font-mono text-xs text-[#0FD9C8]">{primaryServiceSlug}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-[#F5F4F0]/62">
          {servicesForSystem.slice(0, 4).map((service) => (
            <li key={service.slug}>• {service.title}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-2xl border border-[#F5F4F0]/8 bg-[#13131A]/28 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F4F0]/42">Connected evidence</p>
        <p className="mt-2 text-sm text-[#F5F4F0]/62">
          {stackTools.length} tools · {caseStudies.length} proof links
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-[#F5F4F0]/62">
          {stackTools.slice(0, 3).map((tool) => (
            <li key={tool.slug}>• {tool.title}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
