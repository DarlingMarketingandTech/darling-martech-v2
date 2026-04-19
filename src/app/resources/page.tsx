import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogArticles, formatBlogEyebrow } from "@/data/blog";
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
              className="surface-card grain-mask flex h-full flex-col rounded-[2rem] border border-[#F5F4F0]/8 p-7"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
                {formatBlogEyebrow(article.publishedAt, article.readingTime)}
              </p>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[#F5F4F0] md:text-3xl">
                {article.title}
              </h2>
              <p className="mt-4 flex-1 text-base leading-7 text-[#F5F4F0]/72">{article.excerpt}</p>
              <Link
                href={`/resources/blog/${article.slug}`}
                className="mt-6 inline-flex text-sm font-medium text-[#F05A28] transition-colors hover:text-[#ff6d40]"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <NewsletterSignup />
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
            <article
              key={item.slug}
              className="surface-card grain-mask flex h-full flex-col rounded-[2rem] border border-[#F5F4F0]/8 p-7"
            >
              <span className="w-fit rounded-full border border-[#F5F4F0]/10 bg-[#101014]/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#F05A28]">
                {item.fileType}
              </span>
              <h2 className="font-display mt-4 text-xl font-semibold text-[#F5F4F0] md:text-2xl">{item.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#F5F4F0]/72 md:text-base">{item.description}</p>
              <p className="mt-4 text-sm text-[#F5F4F0]/50">
                {item.emailGated
                  ? "Email-gated delivery — request via contact with the framework name."
                  : "Available on request."}
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
