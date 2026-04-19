import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { buildMetadata } from "@/lib/metadata";
import { blogArticles } from "@/data/blog";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Articles on martech strategy, attribution, and execution from Darling MarTech.",
  canonicalUrl: "https://darlingmartech.com/resources/blog",
});

export default function BlogIndexPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="BLOG"
        headline="Field notes for operators."
        body="Longer writing on diagnosis, systems, and what actually holds growth together."
      />
      <SectionWrapper>
        <ul className="grid gap-4">
          {blogArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/resources/blog/${article.slug}`}
                className="block rounded-[1.5rem] border border-[#F5F4F0]/10 bg-[#13131A]/40 px-6 py-5 transition-colors hover:border-[#F05A28]/35"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
                  {article.publishedAt} · {article.readingTime} min
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold text-[#F5F4F0]">{article.title}</h2>
                <p className="mt-2 text-sm text-[#F5F4F0]/65">{article.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </SiteShell>
  );
}
