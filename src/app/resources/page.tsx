import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogArticles } from "@/data/blog";
import { downloadableFrameworks } from "@/data/frameworks";
import { resourcesMeta, resourcesPageData } from "@/data/resources-hub";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(resourcesMeta);

export default function ResourcesPage() {
  const featuredPosts = blogArticles.filter((article) => article.featured);

  return (
    <SiteShell>
      <PageHero
        eyebrow={resourcesPageData.hero.eyebrow}
        headline={resourcesPageData.hero.headline}
        body={resourcesPageData.hero.body}
      />

      <SectionWrapper>
        <SectionHeader eyebrow="Blog" title="Field notes and long-form breakdowns." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredPosts.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between rounded-[1.75rem] border border-[#F5F4F0]/10 bg-[#13131A]/60 p-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
                  {article.readingTime} min read · {article.publishedAt}
                </p>
                <h2 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0]">{article.title}</h2>
                <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{article.excerpt}</p>
              </div>
              <div className="mt-6">
                <Button href={`/resources/blog/${article.slug}`} variant="ghost">
                  Read article
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/resources/blog" variant="ghost">
            View all posts
          </Button>
        </div>
      </SectionWrapper>

      <BandSection>
        <SectionHeader
          eyebrow="Frameworks"
          title="Downloadable templates for diagnosis and alignment."
          body="Each asset is email-gated so I can send updates when the underlying playbooks change—no spam, no surprise sequences."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {downloadableFrameworks.map((item) => (
            <article key={item.slug} className="rounded-[1.75rem] border border-[#F5F4F0]/10 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">{item.fileType}</p>
              <h2 className="font-display mt-3 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#F5F4F0]/72">{item.description}</p>
              <p className="mt-4 text-sm text-[#F5F4F0]/50">
                {item.emailGated ? "Email-gated delivery — request via contact with the framework name." : "Available on request."}
              </p>
              <div className="mt-6">
                <Button href="/contact#contact-form" size="lg">
                  Request this framework
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/resources/frameworks" className="text-sm text-[#0FD9C8] hover:text-[#F5F4F0]">
            Frameworks hub →
          </Link>
        </div>
      </BandSection>
    </SiteShell>
  );
}
