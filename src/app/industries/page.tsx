import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/metadata";
import { industrySectors } from "@/data/industries";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Healthcare, B2B SaaS, and legal/professional services — sector-specific pain points, solution architecture, and proof from real engagements.",
  canonicalUrl: "https://darlingmartech.com/industries",
});

export default function IndustriesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="INDUSTRIES"
        headline="Sector fluency isn't a tagline. It's the difference between generic advice and actually useful work."
        body="The same technical capability means different things in different industries. HIPAA compliance, bar association constraints, SaaS CAC math — the context shapes the solution. Here's where the proof is real."
      />

      <SectionWrapper className="mt-14">
        <ul className="grid gap-6 md:grid-cols-3">
          {industrySectors.map((sector) => (
            <li key={sector.slug}>
              <Link
                href={`/industries/${sector.slug}`}
                className="surface-card flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-[#F05A28]/35"
              >
                <Eyebrow className="text-[#0FD9C8]">{sector.name}</Eyebrow>
                <h2 className="font-display mt-3 text-xl font-semibold text-[#F5F4F0]">
                  {sector.tagline}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#F5F4F0]/55">
                  {sector.whyTheyBuy}
                </p>
                <span className="mt-6 text-sm text-[#F05A28]">See the approach →</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <BandSection className="mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <Eyebrow>Not on this list?</Eyebrow>
            <p className="mt-3 text-[#F5F4F0]/72">
              The three sectors above reflect where the proof is strongest. The underlying problems — attribution blindness, disconnected systems, weak acquisition — show up across industries. If the economics fit, the work translates.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button href={siteConfig.calComLink} size="lg">
              Start a conversation →
            </Button>
            <Button href="/tools/growth-bottleneck-quiz" variant="ghost" size="lg">
              Run the free diagnostic first
            </Button>
          </div>
        </div>
      </BandSection>
    </SiteShell>
  );
}
