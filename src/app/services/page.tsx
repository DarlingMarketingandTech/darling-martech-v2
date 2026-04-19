import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Capabilities across fractional leadership, MarTech stack builds, CRM architecture, automation, attribution, and SEO — scoped after diagnosis.",
  canonicalUrl: "https://darlingmartech.com/services",
});

export default function ServicesIndexPage() {
  const featured = services.filter((s) => s.isFeatured);
  const rest = services.filter((s) => !s.isFeatured);

  return (
    <SiteShell>
      <PageHero
        eyebrow="CAPABILITIES"
        headline="Full-stack marketing execution — scoped after the real bottleneck is named."
        body="These are the shapes work takes once diagnosis is clear. Most engagements combine more than one; the mix depends on what the system actually needs."
      />

      <SectionWrapper className="mt-14">
        <Eyebrow>Featured</Eyebrow>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="surface-card block rounded-[2rem] p-7 transition-colors hover:border-[#F05A28]/35"
              >
                <h2 className="font-display text-2xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-[#F5F4F0]/72">{service.headline}</p>
                <span className="mt-4 inline-block text-sm text-[#F05A28]">View service →</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper className="mt-14">
        <Eyebrow>Also available</Eyebrow>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {rest.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="flex flex-col rounded-2xl border border-[#F5F4F0]/10 px-5 py-4 transition-colors hover:border-[#F05A28]/25"
              >
                <span className="font-display text-lg font-semibold">{service.title}</span>
                <span className="mt-1 text-sm text-[#F5F4F0]/60">{service.headline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </SiteShell>
  );
}
