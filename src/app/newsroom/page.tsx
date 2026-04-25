import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { NewsroomFilterBar } from "@/components/newsroom/NewsroomFilterBar";
import { newsroomTruncateWords } from "@/lib/newsroom-truncate";
import { formatBlogEyebrow } from "@/data/blog";
import {
  filterNewsroomArticles,
  getNewsroomCategoryList,
  getNewsroomTagList,
  newsroomArticles,
} from "@/data/newsroom";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Newsroom",
  description:
    "Notes on strategy, systems, and execution — organized by topic and linked to proof, problems, services, and how engagements run.",
  canonicalUrl: "https://darlingmartech.com/newsroom",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewsroomIndexPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const pick = (key: string) => {
    const v = sp[key];
    return typeof v === "string" ? v : undefined;
  };

  const filters = {
    category: pick("category"),
    tag: pick("tag"),
    proof: pick("proof"),
    problem: pick("problem"),
    service: pick("service"),
    process: pick("process") === "1" ? ("1" as const) : undefined,
  };

  const filtered = filterNewsroomArticles(newsroomArticles, filters);
  const categories = getNewsroomCategoryList();
  const tags = getNewsroomTagList();

  const proofOptions = caseStudies.map((study) => ({
    slug: study.slug,
    label: newsroomTruncateWords(study.clientName, 6),
  }));

  const problemOptions = problemPages.map((p) => ({
    slug: p.slug,
    label: newsroomTruncateWords(p.title, 8),
  }));

  const serviceOptions = services.map((s) => ({
    slug: s.slug,
    label: newsroomTruncateWords(s.title, 5),
  }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="NEWSROOM"
        headline="Editorial notes — wired into how the site thinks."
        body="Shareable filters tie each piece to proof, problems, services, and process — so the library grows with the rest of the site."
      />

      <SectionWrapper>
        <NewsroomFilterBar
          categories={categories}
          tags={tags}
          proofOptions={proofOptions}
          problemOptions={problemOptions}
          serviceOptions={serviceOptions}
          initial={filters}
        />

        <p className="mt-10 text-sm text-[#F5F4F0]/50">
          Showing {filtered.length} of {newsroomArticles.length} article{newsroomArticles.length === 1 ? "" : "s"}.
        </p>

        <ul className="mt-8 grid gap-4">
          {filtered.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/newsroom/${article.slug}`}
                className="block rounded-3xl border border-[#F5F4F0]/10 bg-[#13131A]/40 px-6 py-5 transition-colors hover:border-[#F05A28]/35"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
                  {formatBlogEyebrow(article.publishedAt, article.readingTime)}
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold text-[#F5F4F0]">{article.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#F5F4F0]/55">{article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[#F5F4F0]/10 px-2.5 py-0.5 text-[11px] text-[#F5F4F0]/50"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-[#F5F4F0]/55">Nothing matches these filters yet.</p>
        ) : null}
      </SectionWrapper>
    </SiteShell>
  );
}
