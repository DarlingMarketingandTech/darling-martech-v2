import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
import { AntiClaimRow } from "@/components/proof/AntiClaimRow";
import { ProofFilterClient } from "@/components/proof/ProofFilterClient";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/button";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { homepageData } from "@/data/homepage";
import { proofPageData } from "@/data/proof";
import { ProofIndexAmbient } from "@/components/proof/ProofIndexAmbient";
import { routeMetadata } from "@/data/routes";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata(routeMetadata["/proof"]);

const METRICS_STRIP = homepageData.proofBar.slice(0, 4);

export default function ProofPage() {
  return (
    <SiteShell>
      <div className="relative isolate">
        <ProofIndexAmbient />
        <div className="relative z-10">
          <PageHero
            eyebrow={proofPageData.hero.eyebrow}
            headline={proofPageData.hero.headline}
            body={proofPageData.hero.body}
            ctas={[
              { label: "Run the 3-minute diagnostic →", href: "/tools/growth-bottleneck-quiz" },
              { label: "Browse problems", href: "/problems", variant: "secondary" },
            ]}
          />

          <section
            className="mt-11 rounded-3xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/40 px-5 py-8 md:mt-14 md:px-9 md:py-10"
            aria-labelledby="proof-nav-heading"
          >
            <p className="meta-label text-[#F05A28]/90">{proofPageData.navigator.eyebrow}</p>
            <h2
              id="proof-nav-heading"
              className="font-display mt-3 max-w-2xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl"
            >
              {proofPageData.navigator.headline}
            </h2>
            <ol className="mt-8 hidden gap-8 md:grid md:grid-cols-3 md:gap-7">
              {proofPageData.navigator.steps.map((step) => (
                <li key={step.kicker} className="flex gap-4">
                  <span
                    className="font-mono mt-0.5 shrink-0 text-xs font-semibold tabular-nums tracking-[0.12em] text-[#0FD9C8]/85"
                    aria-hidden
                  >
                    {step.kicker}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F4F0]">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/56">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <details className="mt-6 rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/32 px-4 py-3 md:hidden">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#F5F4F0] [&::-webkit-details-marker]:hidden">
                Show 3-step guide
              </summary>
              <ol className="mt-4 grid gap-4">
                {proofPageData.navigator.steps.map((step) => (
                  <li key={step.kicker} className="flex gap-3">
                    <span className="font-mono mt-0.5 shrink-0 text-xs font-semibold tabular-nums tracking-[0.12em] text-[#0FD9C8]/85">
                      {step.kicker}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#F5F4F0]">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/56">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </details>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#F5F4F0]/8 pt-6 text-sm">
              <Link
                href="/services"
                className="text-[#F5F4F0]/52 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#F05A28] hover:decoration-[#F05A28]/40"
              >
                Capabilities overview →
              </Link>
              <Link
                href="/tools"
                className="text-[#F5F4F0]/52 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#0FD9C8] hover:decoration-[#0FD9C8]/40"
              >
                Diagnostics & tools →
              </Link>
              <Link
                href="#case-studies"
                className="text-[#F5F4F0]/52 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#F5F4F0]"
              >
                Skip to case studies →
              </Link>
            </div>
          </section>

          <section aria-label="Representative proof metrics" className="mt-12 md:mt-14">
            <p className="meta-label text-[#F5F4F0]/42">{proofPageData.metricsIntro}</p>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 border-y border-[#F5F4F0]/10 py-8 md:grid-cols-4 md:gap-x-6">
              {METRICS_STRIP.map((metric, index) => (
                <div
                  key={metric.label}
                  className={cn(
                    index < 3 && "md:border-r md:border-[#F5F4F0]/10 md:pr-5",
                    index % 2 === 0 && index < 3 && "max-md:border-r max-md:border-[#F5F4F0]/10 max-md:pr-3"
                  )}
                >
                  <MonoMetric value={metric.value} label={metric.label} size="sm" />
                </div>
              ))}
            </div>
          </section>

          <div id="case-studies" className="scroll-mt-28 pt-14 md:pt-16">
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
              Case studies
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/56">
              Filter by the outcome you care about. Each row opens a single engagement with full context
              — not blended averages.
            </p>
            <ProofFilterClient caseStudies={caseStudies} />
          </div>

          <details className="group mt-16 rounded-3xl border border-[#F5F4F0]/10 bg-[#13131A]/25 md:mt-20">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
              <div>
                <p className="meta-label text-[#F05A28]/90">For buyers who dig deeper</p>
                <p className="font-display mt-2 text-lg font-semibold text-[#F5F4F0] md:text-xl">
                  Documentation standards & how to read the numbers
                </p>
              </div>
              <span
                className="font-mono text-xs text-[#F5F4F0]/45 transition-transform duration-200 group-open:rotate-90"
                aria-hidden
              >
                ▸
              </span>
            </summary>
            <div className="space-y-12 border-t border-[#F5F4F0]/8 px-5 pb-8 pt-8 md:px-7 md:pb-10 md:pt-10">
              <div>
                <p className="meta-label text-[#F05A28]/90">{proofPageData.technicalTrust.eyebrow}</p>
                <h3 className="font-display mt-4 max-w-xl text-balance text-xl font-semibold text-[#F5F4F0]">
                  {proofPageData.technicalTrust.headline}
                </h3>
                <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
                  {proofPageData.technicalTrust.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/45 px-4 py-4 md:px-5 md:py-5"
                    >
                      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5F4F0]/78">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/54">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Eyebrow>{proofPageData.explanation.eyebrow}</Eyebrow>
                <h3 className="font-display mt-4 max-w-2xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
                  {proofPageData.explanation.headline}
                </h3>
                <div className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-[#F5F4F0]/62 md:text-base md:leading-7">
                  {proofPageData.explanation.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <AntiClaimRow antiClaims={proofPageData.antiClaims} />
                </div>
              </div>
            </div>
          </details>

          <section className="mt-14 rounded-3xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-6 py-12 text-center md:mt-16 md:py-14">
            <h2 className="font-display mx-auto max-w-xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
              Not sure which story fits your situation?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#F5F4F0]/52">
              Start with a structured diagnostic — it maps to problems and capabilities, not sales fluff.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/tools/growth-bottleneck-quiz" size="lg">
                Run the diagnostic →
              </Button>
              <Button href={siteConfig.calComLink} variant="secondary" size="lg">
                Book a 30-minute call
              </Button>
              <Button href="/process" variant="ghost" size="lg">
                See how engagements run
              </Button>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
