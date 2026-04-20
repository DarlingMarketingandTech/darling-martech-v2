import { PageHero } from "@/components/hero/PageHero";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SiteShell } from "@/components/layout/site-shell";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/resources/newsletter"]);

export default function NewsletterPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="NEWSLETTER"
        headline="One practical martech insight per week."
        body="Short, tactical notes on diagnosing bottlenecks and building cleaner strategy, systems, and execution."
      />

      <SectionWrapper>
        <NewsletterSignup />
      </SectionWrapper>

      <BandSection>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-sm text-[#F5F4F0]/65">
            Prefer a broader index of long-form resources first?
          </p>
          <Button href="/resources" variant="ghost">
            Browse resources hub
          </Button>
        </div>
      </BandSection>
    </SiteShell>
  );
}
