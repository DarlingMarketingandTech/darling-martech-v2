import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { Button } from "@/components/ui/button";
import { downloadableFrameworks } from "@/data/frameworks";
import { frameworksMeta } from "@/data/resources-hub";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(frameworksMeta);

export default function FrameworksPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="FRAMEWORKS"
        headline="Downloadable systems for diagnosis and alignment."
        body="These are working documents I use with clients. They are email-gated so I can notify you when versions change and so every request has a human on the other side."
      />

      <SectionWrapper>
        <div className="grid gap-8">
          {downloadableFrameworks.map((item) => (
            <article
              key={item.slug}
              className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#13131A]/50 p-8 md:p-10"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
                {item.fileType} · Email-gated
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold">{item.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#F5F4F0]/75">{item.description}</p>
              <p className="mt-4 text-sm text-[#F5F4F0]/50">
                Request delivery by emailing with the subject line{" "}
                <span className="font-mono text-[#F5F4F0]/80">{item.slug}</span> or use the contact form and mention
                this framework by name.
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Request framework
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <BandSection>
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-[#F5F4F0]/60">Prefer to self-serve first?</p>
          <Button href="/tools/martech-stack-grader" variant="ghost">
            Run the MarTech Stack Grader
          </Button>
        </div>
      </BandSection>
    </SiteShell>
  );
}
