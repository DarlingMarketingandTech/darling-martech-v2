import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { industrySectors } from "@/data/industries";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";

type IndustrySlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return industrySectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: IndustrySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = industrySectors.find((s) => s.slug === slug);
  if (!sector) {
    return buildMetadata({ title: "Industry not found", description: "", noIndex: true });
  }
  return buildMetadata({
    title: sector.name,
    description: `${sector.tagline} ${sector.primaryOutcome}`,
    canonicalUrl: `https://darlingmartech.com/industries/${sector.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: IndustrySlugPageProps) {
  const { slug } = await params;
  const sector = industrySectors.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  const relatedProblems = problemPages.filter((p) => sector.relatedProblems.includes(p.slug));
  const relatedServices = services.filter((s) => sector.relatedServices.includes(s.slug));
  const proof = caseStudies.filter((c) => sector.proofReferences.includes(c.slug));

  return (
    <SiteShell>
      <PageHero eyebrow={`INDUSTRY · ${sector.name.toUpperCase()}`} headline={sector.tagline} body={sector.description} />

      {/* Primary outcome */}
      <BandSection className="mt-10">
        <Eyebrow>What clients in this sector buy for</Eyebrow>
        <p className="mt-4 text-lg text-[#F5F4F0]/80">{sector.primaryOutcome}</p>
      </BandSection>

      {/* Pain points */}
      <SectionWrapper className="mt-14">
        <Eyebrow>Where the friction shows up</Eyebrow>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {sector.painPoints.map((pain) => (
            <div key={pain.title} className="rounded-2xl border border-[#F5F4F0]/8 px-5 py-6">
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">{pain.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/55">{pain.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Solution angles */}
      <BandSection className="mt-14">
        <Eyebrow>How the work gets shaped</Eyebrow>
        <ul className="mt-6 space-y-3">
          {sector.solutionAngles.map((angle) => (
            <li key={angle} className="flex items-start gap-3 text-sm text-[#F5F4F0]/72">
              <span className="mt-0.5 text-[#F05A28]">→</span>
              <span>{angle}</span>
            </li>
          ))}
        </ul>
      </BandSection>

      {/* Related problems */}
      {relatedProblems.length > 0 && (
        <SectionWrapper className="mt-14">
          <Eyebrow>Problems this usually maps to</Eyebrow>
          <ul className="mt-5 flex flex-col gap-3">
            {relatedProblems.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/problems/${p.slug}`}
                  className="text-sm text-[#F05A28] hover:underline"
                >
                  {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Related services */}
      {relatedServices.length > 0 && (
        <SectionWrapper className="mt-14">
          <Eyebrow>Capabilities involved</Eyebrow>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {relatedServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-[#F5F4F0]/8 px-4 py-3 text-sm text-[#F5F4F0]/72 transition-colors hover:border-[#F05A28]/30 hover:text-[#F5F4F0]"
                >
                  <span className="text-[#F05A28]">→</span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Proof */}
      {proof.length > 0 && (
        <div className="mt-14">
          <Eyebrow>Proof from this sector</Eyebrow>
          <div className="mt-8">
            <ProofGrid caseStudies={proof} />
          </div>
        </div>
      )}

      {proof.length === 0 && (
        <BandSection className="mt-14">
          <p className="text-sm text-[#F5F4F0]/40">
            Documented case studies for this sector are in progress. The underlying work exists — the proof page is being updated.
          </p>
        </BandSection>
      )}

      {/* CTA */}
      <SectionWrapper className="mt-14">
        <h2 className="font-display max-w-xl text-balance text-2xl font-semibold text-[#F5F4F0]">
          If this matches what you are navigating, the next step is a conversation.
        </h2>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Button href={siteConfig.calComLink} size="lg">
            Start a conversation →
          </Button>
          <Button href="/services/technical-roadmap" variant="secondary" size="lg">
            Start with a paid roadmap
          </Button>
          <Button href="/tools/growth-bottleneck-quiz" variant="ghost" size="lg">
            Free diagnostic first
          </Button>
        </div>
      </SectionWrapper>
    </SiteShell>
  );
}
