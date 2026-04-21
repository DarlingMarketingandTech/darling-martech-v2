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
import { getProofAnglesForDisplayCluster } from "@/data/proof-angles";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import { ServicesIndexAmbient } from "@/components/services/ServicesIndexAmbient";
import { ServicesBuyerPathSplit } from "@/components/services/ServicesBuyerPathSplit";
import { FoundationPathwayMini } from "@/components/shared/FoundationPathwayMini";
import { caseStudies } from "@/data/work/work-index";

const PROOF_BRIDGE_SLUGS = [
  "barbershop-command-center",
  "graston-growth-engine",
  "primarycare-indy",
  "317-bbq",
] as const;

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Implementation lanes for marketing systems — from first foundation through scale and demand. Diagnose state, pick the lane, then build, connect, and validate with accountable execution.",
  canonicalUrl: "https://darlingmartech.com/services",
});

const HOW_STEPS = [
  {
    title: "Diagnose system state",
    body: "What exists, what leaks, and what is actually binding pipeline — named, not guessed.",
  },
  {
    title: "Isolate highest-leverage friction",
    body: "Rank fixes by revenue impact and dependency order so work compounds instead of churns.",
  },
  {
    title: "Choose the implementation lane",
    body: "Foundation, build, scale, or grow — each maps to a different system job, not a menu of extras.",
  },
  {
    title: "Build, connect, validate",
    body: "Ship integrations and surfaces with acceptance checks, then read performance like an operator.",
  },
] as const;

export default function ServicesIndexPage() {
  const strategicLead = services.find((service) => service.slug === "fractional-cmo");
  const clusterSections = SERVICE_DISPLAY_CLUSTER_ORDER.map((clusterId) => ({
    id: clusterId,
    ...SERVICE_DISPLAY_CLUSTERS[clusterId],
    items: getServicesByCluster(clusterId),
  }));

  const proofBridgeCases = PROOF_BRIDGE_SLUGS.map((slug) => caseStudies.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );

  return (
    <SiteShell hideNewsletterSignup>
      <div className="relative isolate">
        <ServicesIndexAmbient />
        <div className="relative z-10">
          <PageHero
            eyebrow="IMPLEMENTATION"
            headline="Pick the lane. Build the system."
            body={[
              "/problems names what is wrong. /services shows how the system gets built, repaired, or expanded — organized as implementation lanes, not a flat capability list.",
              "Whether the system is missing or fragmented, the sequence stays the same: diagnose state, choose leverage, execute in one accountable build motion.",
            ]}
            ctas={[
              { label: "Start with the Technical Roadmap →", href: "/services/technical-roadmap", variant: "primary" },
              { label: "Map symptoms on /problems →", href: "/problems", variant: "secondary" },
            ]}
          />
          <div className="mt-4">
            <Link
              href="/proof"
              className="text-sm text-[#F5F4F0]/58 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#0FD9C8] hover:decoration-[#0FD9C8]/35"
            >
              Prefer evidence-first? Review proof →
            </Link>
          </div>

          <SectionWrapper className="pt-0 md:pt-4">
            <ServicesBuyerPathSplit />
          </SectionWrapper>

          {strategicLead ? (
            <BandSection className="mt-12 md:mt-16">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <Eyebrow>Cross-lane leadership</Eyebrow>
                  <h2 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
                    {strategicLead.title}
                  </h2>
                  <p className="mt-3 text-sm text-[#F5F4F0]/70">{strategicLead.headline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/72">{strategicLead.description}</p>
                  <ul className="mt-6 space-y-2">
                    {strategicLead.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-[#F5F4F0]/62">
                        <span className="mt-0.5 text-[#0FD9C8]">→</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 md:shrink-0">
                  <Button href={`/services/${strategicLead.slug}`} size="lg">
                    Review Fractional CMO fit →
                  </Button>
                  <Button href={siteConfig.calComLink} variant="ghost" size="lg">
                    Book a strategic conversation
                  </Button>
                </div>
              </div>
            </BandSection>
          ) : null}

          {clusterSections.map((cluster, clusterIndex) => {
            const laneProof = getProofAnglesForDisplayCluster(cluster.id, 4);
            return (
              <SectionWrapper
                key={cluster.id}
                id={cluster.id === "foundation" ? "lane-foundation" : `lane-${cluster.id}`}
                className={clusterIndex === 0 ? "mt-14 md:mt-20" : "mt-12 md:mt-16"}
              >
                <header className="border-b border-[#F5F4F0]/10 pb-8">
                  <p className="meta-label text-[#F5F4F0]/45">Implementation lane</p>
                  <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <h2 className="font-display text-balance text-3xl font-semibold tracking-[-0.03em] text-[#F5F4F0] md:text-4xl">
                      {cluster.label}
                    </h2>
                    <p className="max-w-xl text-sm font-medium leading-relaxed text-[#0FD9C8]/90 md:text-right">
                      {cluster.laneTagline}
                    </p>
                  </div>

                  <div className="mt-8 hidden gap-8 lg:grid lg:grid-cols-2">
                    <div>
                      <p className="meta-label text-[#F05A28]/85">What it solves</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/74">{cluster.solvesFor}</p>
                    </div>
                    <div>
                      <p className="meta-label text-[#F05A28]/85">Who it is for</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/74">{cluster.whoFor}</p>
                    </div>
                  </div>

                  <ul className="mt-8 hidden gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-4">
                    {cluster.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/28 px-4 py-3 text-sm leading-snug text-[#F5F4F0]/78"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <details className="mt-6 rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-4 py-3 lg:hidden">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-[#F5F4F0] [&::-webkit-details-marker]:hidden">
                      View lane guidance and outcomes
                    </summary>
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="meta-label text-[#F05A28]/85">What it solves</p>
                        <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/74">{cluster.solvesFor}</p>
                      </div>
                      <div>
                        <p className="meta-label text-[#F05A28]/85">Who it is for</p>
                        <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/74">{cluster.whoFor}</p>
                      </div>
                      <ul className="grid gap-2">
                        {cluster.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/30 px-3 py-2 text-sm leading-snug text-[#F5F4F0]/75"
                          >
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button href={cluster.nextStep.href} size="lg">
                      {cluster.nextStep.label}
                    </Button>
                    {cluster.optionalStep ? (
                      <Button href={cluster.optionalStep.href} variant="ghost" size="lg">
                        {cluster.optionalStep.label}
                      </Button>
                    ) : null}
                  </div>

                  {cluster.id === "foundation" ? (
                    <div className="mt-10 max-w-3xl">
                      <FoundationPathwayMini />
                    </div>
                  ) : null}
                </header>

                <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {cluster.items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className={`flex h-full flex-col rounded-2xl border px-5 py-5 transition-colors hover:border-[#F05A28]/35 ${
                          service.isFeatured ? "surface-card border-[#F5F4F0]/12" : "border-[#F5F4F0]/8"
                        }`}
                      >
                        {service.slug === "technical-roadmap" ? (
                          <span className="mb-3 inline-block w-fit rounded-full border border-[#0FD9C8]/40 px-2.5 py-1 text-xs text-[#0FD9C8]">
                            Paid diagnostic entry
                          </span>
                        ) : null}
                        <h3 className="font-display text-lg font-semibold text-[#F5F4F0]">{service.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#F5F4F0]/60">{service.headline}</p>
                        <span className="mt-4 inline-block text-sm font-medium text-[#F05A28]">Open service →</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {laneProof.length ? (
                  <div className="mt-10 rounded-3xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/25 px-5 py-5 md:px-6">
                    <p className="meta-label text-[#F5F4F0]/50">Evidence in this lane</p>
                    <ul className="mt-3 flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-2">
                      {laneProof.map((angle) => (
                        <li key={angle.id}>
                          <Link
                            href={`/proof/${angle.parentProjectSlug}`}
                            className="text-sm text-[#F5F4F0]/70 transition-colors hover:text-[#0FD9C8]"
                          >
                            <span className="text-[#F5F4F0]/35">↳</span> {angle.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </SectionWrapper>
            );
          })}

          <SectionWrapper className="mt-12 md:mt-16">
            <div className="rounded-3xl border border-[#F5F4F0]/10 bg-[#13131A]/22 px-6 py-8 md:px-10 md:py-10">
              <p className="meta-label text-[#0FD9C8]/90">Operating model</p>
              <h2 className="font-display mt-3 text-balance text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
                How the work happens
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/65">
                One accountable build motion — scoped after the real constraint is named, not after a generic retainer template.
              </p>
              <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {HOW_STEPS.map((step, i) => (
                  <li key={step.title} className="relative rounded-2xl border border-[#F5F4F0]/8 px-4 py-4">
                    <span className="font-mono text-xs text-[#F05A28]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="font-display mt-2 text-base font-semibold text-[#F5F4F0]">{step.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#F5F4F0]/58">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </SectionWrapper>

          <SectionWrapper className="mt-4 md:mt-6">
            <div className="flex flex-col gap-6 border-b border-[#F5F4F0]/8 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="meta-label text-[#F05A28]/85">Proof bridge</p>
                <h2 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
                  Outcomes behind the lanes
                </h2>
                <p className="mt-2 max-w-xl text-sm text-[#F5F4F0]/62">
                  Local operators, clinical groups, and complex stacks — same implementation discipline, different constraints.
                </p>
              </div>
              <Button href="/proof" variant="ghost" size="lg">
                Browse all proof →
              </Button>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {proofBridgeCases.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/proof/${study.slug}`}
                    className="group block rounded-3xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/30 p-5 transition-colors hover:border-[#0FD9C8]/35 md:p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/40">{study.clientName}</p>
                    <p className="font-display mt-2 text-lg font-semibold text-[#F5F4F0] group-hover:text-[#0FD9C8]">
                      {study.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-[#F5F4F0]/60">{study.resultSummary}</p>
                    <p className="mt-4 font-mono text-xl font-semibold tabular-nums text-[#0FD9C8]">
                      {study.primaryMetric.value}
                      <span className="ml-2 text-sm font-normal text-[#F5F4F0]/55">{study.primaryMetric.label}</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper className="mt-10 pb-20 text-center md:mt-14">
            <p className="font-display text-balance text-xl font-semibold text-[#F5F4F0] md:text-2xl">
              Evaluating fit? Choose depth before scope creep.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#F5F4F0]/60">
              Roadmap for a named plan, quiz for a fast self-read, proof for evidence, conversation when you are ready to
              compare notes on your stack.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button href="/services/technical-roadmap" size="lg">
                Request the Technical Roadmap →
              </Button>
              <Button href="/tools/growth-bottleneck-quiz" variant="secondary" size="lg">
                Diagnose with the quiz →
              </Button>
              <Button href="/proof" variant="ghost" size="lg">
                See the proof →
              </Button>
              <Button href={siteConfig.calComLink} variant="ghost" size="lg">
                Book a strategic conversation
              </Button>
            </div>
            <p className="mt-6 text-sm text-[#F5F4F0]/45">
              Prefer symptoms first?{" "}
              <Link href="/problems" className="text-[#F05A28] hover:underline">
                Start on /problems →
              </Link>
            </p>
          </SectionWrapper>
        </div>
      </div>
    </SiteShell>
  );
}
