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
        ctas={contactPageData.hero.ctas}
      />
      <ContactExperience />
      <p className="mx-auto mt-16 max-w-xl text-center text-sm text-[#F5F4F0]/48">
        There&apos;s no commitment attached to sending a message. I&apos;m not going to pressure you into an engagement
        that isn&apos;t right for your situation. If it&apos;s not a fit, I&apos;ll tell you — and I&apos;ll point you
        toward something that might be.
      </p>
    </SiteShell>
  );
}
