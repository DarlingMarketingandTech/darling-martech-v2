import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { DiagnosticHudCard } from "@/components/animations/DiagnosticHudCard";
import { StudioHero } from "@/components/animations/StudioHero";
import { PageHero } from "@/components/hero/PageHero";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { studioMeta, studioPageData } from "@/data/studio";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata(studioMeta);

export default function StudioPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={studioPageData.hero.eyebrow}
        headline={studioPageData.hero.headline}
        body={studioPageData.hero.body}
        splitAside={<StudioHero />}
      />

      <SectionWrapper>
        <DiagnosticHudCard className="mb-14" />
        <div className="grid gap-12 md:grid-cols-2">
          {studioPageData.gallery.map((item) => (
            <figure key={item.publicId} className="space-y-4">
              <div className="overflow-hidden rounded-[1.75rem] border border-[#F5F4F0]/10 bg-[#13131A]/40">
                <CloudinaryImage
                  publicId={item.publicId}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="text-sm text-[#F5F4F0]/60">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </SectionWrapper>

      <BandSection className="text-center">
        <p className="text-lg text-[#F5F4F0]/75">Need this level of craft tied to pipeline outcomes?</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="/proof" size="lg">
            See proof
          </Button>
          <Button href={siteConfig.calComLink} variant="ghost" size="lg">
            Start a conversation
          </Button>
        </div>
      </BandSection>
    </SiteShell>
  );
}
