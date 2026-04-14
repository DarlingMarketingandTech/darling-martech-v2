import { SiteShell } from "@/components/layout/site-shell";
import { ContactExperience } from "@/components/contact/ContactExperience";
import { PageHero } from "@/components/hero/PageHero";
import { contactMeta, contactPageData } from "@/data/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(contactMeta);

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={contactPageData.hero.eyebrow}
        headline={contactPageData.hero.headline}
        body={contactPageData.hero.body}
      />
      <ContactExperience />
    </SiteShell>
  );
}
