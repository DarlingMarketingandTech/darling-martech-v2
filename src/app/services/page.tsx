import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/button";
import { services, SERVICE_PILLARS } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Revenue engineering, AI automation, and custom infrastructure — scoped after a real diagnosis. One accountable operator across every capability.",
  canonicalUrl: "https://darlingmartech.com/services",
});

export default function ServicesIndexPage() {
  const roadmap = services.find((s) => s.slug === "technical-roadmap");
  const pillarServices = SERVICE_PILLARS.map((pillar) => ({
    ...pillar,
    items: services.filter((s) => s.pillar === pillar.id && s.slug !== "technical-roadmap"),
  }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="CAPABILITIES"
        headline="Full-stack technical marketing — built after the real problem is named."
        body="Revenue engineering, AI-enabled automation, and custom infrastructure. Most engagements span more than one pillar; the scope depends on what the system actually needs."
      />

      {/* Pillar sections */}
      {pillarServices.map((pillar, pillarIndex) => (
        <SectionWrapper key={pillar.id} className={pillarIndex === 0 ? "mt-14" : "mt-16"}>
          <div className="mb-8 border-b border-[#F5F4F0]/8 pb-6">
            <Eyebrow>{pillar.label}</Eyebrow>
            <p className="mt-2 max-w-2xl text-sm text-[#F5F4F0]/55">{pillar.description}</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {pillar.items.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`block rounded-2xl border px-5 py-5 transition-colors hover:border-[#F05A28]/35 ${
                    service.isFeatured
                      ? "surface-card border-[#F5F4F0]/12"
                      : "border-[#F5F4F0]/8"
                  }`}
                >
                  <h2 className="font-display text-lg font-semibold text-[#F5F4F0]">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#F5F4F0]/60">{service.headline}</p>
                  <span className="mt-4 inline-block text-sm text-[#F05A28]">View service →</span>
                </Link>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      ))}

      {/* Technical Roadmap entry offer */}
      {roadmap && (
        <BandSection className="mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Entry offer</Eyebrow>
              <h2 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
                {roadmap.title}
              </h2>
              <p className="mt-4 text-[#F5F4F0]/72">{roadmap.description}</p>
              <ul className="mt-6 space-y-2">
                {roadmap.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-[#F5F4F0]/60">
                    <span className="mt-0.5 text-[#0FD9C8]">→</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:shrink-0">
              <Button href={`/services/${roadmap.slug}`} size="lg">
                See how it works →
              </Button>
              <Button href={siteConfig.calComLink} variant="ghost" size="lg">
                Book a diagnostic call
              </Button>
            </div>
          </div>
        </BandSection>
      )}

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
