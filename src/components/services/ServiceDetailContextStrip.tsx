import Link from "next/link";
import {
  SERVICE_DISPLAY_CLUSTERS,
  SERVICE_PILLARS,
  getDisplayClusterIdForServiceSlug,
  getServicesIndexLaneHash,
} from "@/data/services";
import type { EngagementFormat, Service, ServiceCluster } from "@/types";
import { cn } from "@/lib/utils";

const FORMAT_LABELS: Record<EngagementFormat, string> = {
  fractional: "Fractional",
  project: "Project",
  diagnostic: "Diagnostic",
};

function engagementChips(formats: EngagementFormat[]) {
  return formats.map((f) => FORMAT_LABELS[f]);
}

type ServiceDetailContextStripProps = {
  service: Service;
};

export function ServiceDetailContextStrip({ service }: ServiceDetailContextStripProps) {
  const clusterId = getDisplayClusterIdForServiceSlug(service.slug as ServiceCluster);
  const cluster = clusterId ? SERVICE_DISPLAY_CLUSTERS[clusterId] : null;
  const pillar = SERVICE_PILLARS.find((p) => p.id === service.pillar);
  const laneHref = clusterId ? `/services#${getServicesIndexLaneHash(clusterId)}` : "/services";
  const laneLabel = cluster?.label ?? "Services";

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/55 px-6 py-8 shadow-[0_20px_56px_rgba(0,0,0,0.35)] md:px-10 md:py-10">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#F05A28]/35 to-transparent"
        aria-hidden
      />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1">
          <p className="meta-label text-[#0FD9C8]/90">Implementation context</p>
          <p className="font-display mt-4 max-w-2xl text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
            {cluster ? `${cluster.label} lane` : "Cross-lane scope"}
          </p>
          <p className="mt-3 max-w-2xl text-base font-medium leading-snug text-[#F5F4F0]/78">{service.headline}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/62 md:text-[0.9375rem] md:leading-relaxed">
            {cluster
              ? `${cluster.laneTagline} Use the lane link to see sibling services in the same implementation chapter.`
              : "Strategic and build work that does not sit in a single lane card — still scoped with the same diagnostic discipline and proof-backed execution standards."}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 lg:max-w-sm">
          <div className="rounded-2xl border border-[#F5F4F0]/08 bg-[#12121a]/60 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5F4F0]/40">Lane & entry</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href={laneHref}
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  clusterId
                    ? "border-[#F05A28]/35 text-[#F05A28]/95 hover:border-[#F05A28]/55 hover:text-[#ff6d40]"
                    : "border-[#F5F4F0]/14 text-[#F5F4F0]/72 hover:border-[#0FD9C8]/35 hover:text-[#0FD9C8]"
                )}
              >
                {laneLabel} lane →
              </Link>
              <Link
                href="/services"
                className="text-xs font-medium text-[#F5F4F0]/45 underline decoration-[#F5F4F0]/15 underline-offset-4 transition-colors hover:text-[#F5F4F0]/70"
              >
                Full index
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#F5F4F0]/08 bg-[#12121a]/60 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5F4F0]/40">Formats · pillar</p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Engagement formats">
              {engagementChips(service.engagementFormats).map((label) => (
                <li key={label}>
                  <span className="inline-flex rounded-md border border-[#F5F4F0]/8 bg-[#F5F4F0]/3 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-[#F5F4F0]/58">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            {pillar ? (
              <p className="mt-3 border-t border-[#F5F4F0]/08 pt-3 text-xs leading-snug text-[#F5F4F0]/52">
                <span className="font-medium text-[#F5F4F0]/78">{pillar.label}</span>
                <span className="text-[#F5F4F0]/40"> — </span>
                {pillar.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
