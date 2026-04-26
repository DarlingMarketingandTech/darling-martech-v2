import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { HomepageHero } from "@/components/hero/HomepageHero";
import { HomepageProofRail } from "@/components/home/HomepageProofRail";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/section-reveal";
import { HomepageCapabilityModule } from "@/components/capabilities/CapabilityPanels";
import { homepageData, homepageMeta } from "@/data/homepage";
import { problemPages } from "@/data/problems";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(homepageMeta);

export default function HomePage() {
  const featuredProblems = problemPages.slice(0, 4);
  const brokenSystemPath = homepageData.buyerPathSection.paths[0];
  const missingSystemPath = homepageData.buyerPathSection.paths[1];
  const triggerMoments = [...brokenSystemPath.signals.slice(0, 2), ...missingSystemPath.signals.slice(0, 2)].slice(0, 4);

  return (
    <SiteShell>
      {/* 1) Hero */}
      <HomepageHero />

      {/* 2) Qualification */}
      <SectionWrapper className="mt-12 md:mt-16">
        <SectionReveal>
          <SectionHeader
            eyebrow="FIT CHECK"
            title="Who this is for — and who it's not for."
            body="Fit depends on system state and operating behavior — not company size."
          />
          <div className="mt-8 grid gap-5 md:mt-10 md:gap-6 lg:grid-cols-2">
            <article className="panel-obsidian rounded-4xl p-5 md:p-7">
              <p className="meta-label text-[#0FD9C8]">{brokenSystemPath.stateLabel}</p>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0]">
                {brokenSystemPath.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/70">{brokenSystemPath.body}</p>
            </article>
            <article className="panel-obsidian rounded-4xl p-5 md:p-7">
              <p className="meta-label text-[#0FD9C8]">{missingSystemPath.stateLabel}</p>
              <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0]">
                {missingSystemPath.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/70">{missingSystemPath.body}</p>
            </article>
          </div>

          <div className="mt-6 grid gap-5 md:mt-8 md:gap-6 lg:grid-cols-[1.4fr_1fr]">
            <article className="rounded-4xl border border-[#F5F4F0]/10 bg-[#0F1015]/70 p-5 md:p-7">
              <p className="meta-label text-[#F05A28]/90">Common trigger moments</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#F5F4F0]/62">
                {triggerMoments.map((signal) => (
                  <li key={signal} className="flex items-start gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0FD9C8]/70" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-4xl border border-[#F5F4F0]/10 bg-[#0F1015]/58 p-5 md:p-7">
              <p className="meta-label text-[#F05A28]/90">Not a fit</p>
              <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/58">{homepageData.icpSection.notAFit}</p>
            </article>
          </div>
        </SectionReveal>
      </SectionWrapper>

      {/* 3) Core problems */}
      <SectionWrapper className="mt-12 md:mt-16">
        <SectionReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow={homepageData.problemSection.eyebrow} title={homepageData.problemSection.headline} />
            <Button href={homepageData.problemSection.diagnosticCta.href} variant="secondary">
              {homepageData.problemSection.diagnosticCta.label}
            </Button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/58">{homepageData.problemSection.body}</p>
          <div className="mt-10">
            <ProblemHubGrid problems={featuredProblems} layout="quad" />
          </div>
        </SectionReveal>
      </SectionWrapper>

      {/* 4) Proof */}
      <HomepageProofRail />

      {/* 5) How this works */}
      <BandSection className="mt-16 py-10 md:mt-20 md:py-14">
        <SectionReveal delay={0.04}>
          <SectionHeader
            eyebrow={homepageData.processSection.eyebrow}
            title={homepageData.processSection.headline}
            body={homepageData.processSection.body}
            bodyClassName="mt-5 max-w-2xl text-sm leading-snug text-[#F5F4F0]/70 md:text-[0.9375rem] md:leading-snug"
          />
          <div className="mt-10 md:mt-12">
            <ProcessTimeline
              layout="featured"
              steps={homepageData.processSection.columns.map((column) => ({
                number: column.number,
                title: column.title,
                description: column.body,
              }))}
            />
          </div>
        </SectionReveal>
      </BandSection>

      {/* 6) Services */}
      <SectionWrapper className="mt-12 md:mt-16">
        <SectionReveal>
          <SectionHeader
            eyebrow="IMPLEMENTATION PATHS"
            title="Choose the service lane your system needs now."
            body="From first-working foundations to stack repair and expansion, each lane is built as a measurable system engagement."
          />
          <div className="mt-10">
            <HomepageCapabilityModule />
          </div>
          <div className="mt-8">
            <Button href="/services" variant="secondary">
              See all service paths
            </Button>
          </div>
        </SectionReveal>
      </SectionWrapper>

      {/* 7) Final CTA */}
      <SectionWrapper className="mt-12 text-center md:mt-16">
        <SectionReveal delay={0.06}>
          <SectionHeader title={homepageData.closingCta.headline} body={homepageData.closingCta.body} align="center" />
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href={homepageData.closingCta.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {homepageData.closingCta.primaryCta.label}
            </Button>
            <Button
              href={homepageData.closingCta.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="w-full border border-[#F5F4F0]/12 sm:w-auto"
            >
              {homepageData.closingCta.secondaryCta.label}
            </Button>
          </div>
          <div className="mt-5">
            <Link
              href={homepageData.closingCta.readyLink.href}
              className="text-sm font-medium text-[#F05A28] transition-colors hover:text-[#ff6d40]"
            >
              {homepageData.closingCta.readyLink.label}
            </Link>
          </div>
        </SectionReveal>
      </SectionWrapper>
    </SiteShell>
  );
}
