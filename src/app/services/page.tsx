import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/button";
import {
  services,
  SERVICE_DISPLAY_CLUSTERS,
  SERVICE_DISPLAY_CLUSTER_ORDER,
  getServicesByCluster,
} from "@/data/services";
import { getPrimaryProofAnglesForService } from "@/data/proof-angles";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Revenue engineering, AI automation, and custom infrastructure — scoped after a real diagnosis. One accountable operator across every capability.",
  canonicalUrl: "https://darlingmartech.com/services",
});

export default function ServicesIndexPage() {
  const strategicLead = services.find((service) => service.slug === "fractional-cmo");
  const clusterSections = SERVICE_DISPLAY_CLUSTER_ORDER.map((clusterId) => ({
    id: clusterId,
    ...SERVICE_DISPLAY_CLUSTERS[clusterId],
    items: getServicesByCluster(clusterId),
  }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="CAPABILITIES"
        headline="Find the layer that is constraining growth."
        body="Use these clusters to self-sort by outcome: grow demand, remove operational drag, or strengthen the system underneath the business."
      />

      <SectionWrapper className="mt-14">
        <div className="rounded-3xl border border-[#F5F4F0]/8 px-6 py-6 md:px-8">
          <Eyebrow>How to use this page</Eyebrow>
          <p className="mt-3 max-w-3xl text-sm text-[#F5F4F0]/70">
            Start with the buyer problem, not the deliverable list. Choose the cluster that
            matches your current constraint, then review the services inside that lane.
          </p>
          <ul className="mt-5 grid gap-3 text-sm text-[#F5F4F0]/60 md:grid-cols-3">
            <li className="rounded-2xl border border-[#F5F4F0]/8 px-4 py-3">
              Need more qualified demand and stronger conversion flow.
            </li>
            <li className="rounded-2xl border border-[#F5F4F0]/8 px-4 py-3">
              Need less manual operations and cleaner lifecycle execution.
            </li>
            <li className="rounded-2xl border border-[#F5F4F0]/8 px-4 py-3">
              Need stronger infrastructure, site systems, and brand foundation.
            </li>
          </ul>
        </div>
      </SectionWrapper>

      {strategicLead && (
        <BandSection className="mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Strategic leadership across the stack</Eyebrow>
              <h2 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
                {strategicLead.title}
              </h2>
              <p className="mt-3 text-sm text-[#F5F4F0]/70">{strategicLead.headline}</p>
              <p className="mt-4 text-[#F5F4F0]/72">{strategicLead.description}</p>
              <ul className="mt-6 space-y-2">
                {strategicLead.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-[#F5F4F0]/60">
                    <span className="mt-0.5 text-[#0FD9C8]">→</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:shrink-0">
              <Button href={`/services/${strategicLead.slug}`} size="lg">
                Explore Fractional CMO →
              </Button>
              <Button href={siteConfig.calComLink} variant="ghost" size="lg">
                Book a strategy call
              </Button>
            </div>
          </div>
        </BandSection>
      )}

      {clusterSections.map((cluster, clusterIndex) => (
        <SectionWrapper key={cluster.id} className={clusterIndex === 0 ? "mt-16" : "mt-14"}>
          <div className="mb-8 border-b border-[#F5F4F0]/8 pb-6">
            <Eyebrow>Service cluster</Eyebrow>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
              {cluster.label}
            </h2>
            <p className="mt-2 text-sm text-[#F5F4F0]/60">
              {cluster.label} — {cluster.descriptor}
            </p>
            <p className="mt-3 max-w-3xl text-sm text-[#F5F4F0]/55">{cluster.description}</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cluster.items.map((service) => {
              const proofAngles = getPrimaryProofAnglesForService(service.slug, 3);
              return (
                <li key={service.slug} className="flex flex-col gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className={`block rounded-2xl border px-5 py-5 transition-colors hover:border-[#F05A28]/35 ${
                      service.isFeatured
                        ? "surface-card border-[#F5F4F0]/12"
                        : "border-[#F5F4F0]/8"
                    }`}
                  >
                    {service.slug === "technical-roadmap" ? (
                      <span className="mb-3 inline-block rounded-full border border-[#0FD9C8]/40 px-2.5 py-1 text-xs text-[#0FD9C8]">
                        Paid diagnostic entry offer
                      </span>
                    ) : null}
                    <h2 className="font-display text-lg font-semibold text-[#F5F4F0]">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#F5F4F0]/60">{service.headline}</p>
                    <span className="mt-4 inline-block text-sm text-[#F05A28]">View service →</span>
                  </Link>
                  {proofAngles.length ? (
                    <div className="rounded-2xl border border-[#F5F4F0]/6 px-4 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/40">
                        Related proof
                      </p>
                      <ul className="mt-2 space-y-2">
                        {proofAngles.map((angle) => (
                          <li key={angle.id}>
                            <Link
                              href={`/proof/${angle.parentProjectSlug}`}
                              className="text-sm text-[#F5F4F0]/55 transition-colors hover:text-[#0FD9C8]"
                            >
                              <span className="text-[#F5F4F0]/35">↳</span> {angle.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </SectionWrapper>
      ))}

      <SectionWrapper className="mt-14 text-center">
        <p className="font-display text-balance text-xl font-semibold text-[#F5F4F0] md:text-2xl">
          Not sure which capability applies? Start with a free diagnostic.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/tools/growth-bottleneck-quiz" size="lg">
            Run the Growth Bottleneck Quiz →
          </Button>
          <Button href="/problems" variant="ghost" size="lg">
            Browse problems instead
          </Button>
        </div>
      </SectionWrapper>
    </SiteShell>
  );
}
