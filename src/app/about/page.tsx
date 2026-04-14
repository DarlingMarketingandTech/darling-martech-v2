import { SiteShell } from "@/components/layout/site-shell";
import { FounderHero } from "@/components/about/FounderHero";
import { CredentialsBar } from "@/components/about/CredentialsBar";
import { aboutMeta, aboutPageData } from "@/data/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(aboutMeta);

export default function AboutPage() {
  return (
    <SiteShell>
      <FounderHero
        eyebrow={aboutPageData.hero.eyebrow}
        headline={aboutPageData.hero.headline}
        body={aboutPageData.hero.body}
        imageId={aboutPageData.hero.imageId}
      />
      <div className="mt-16">
        <CredentialsBar credentials={aboutPageData.credentials} />
      </div>
    </SiteShell>
  );
}
