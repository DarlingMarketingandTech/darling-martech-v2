import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Darling MarTech handles information on this site.",
  canonicalUrl: "https://darlingmartech.com/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="LEGAL"
        headline="Privacy policy"
        body="This site collects only what you choose to submit (for example contact forms or newsletter signup). Messages are read in person; newsletter signups use the email provider configured in production. For questions, email jacob@darlingmt.com."
      />
    </SiteShell>
  );
}
