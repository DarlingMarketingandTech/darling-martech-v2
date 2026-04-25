import Link from "next/link";
import type { NewsroomArticle } from "@/types";
import { formatBlogEyebrow } from "@/data/blog";

type NewsroomRelatedStripProps = {
  articles: NewsroomArticle[];
  eyebrow: string;
};

export function NewsroomRelatedStrip({ articles, eyebrow }: NewsroomRelatedStripProps) {
  if (articles.length === 0) return null;

  const list = articles.slice(0, 3);

  return (
    <section className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#13131A]/35 px-6 py-8 md:px-8 md:py-10" aria-labelledby="newsroom-related-heading">
      <p id="newsroom-related-heading" className="meta-label text-[#0FD9C8]/90">
        {eyebrow}
      </p>
      <div className="tech-divider my-4 max-w-sm" />
      <ul className="mt-2 flex flex-col gap-4">
        {list.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/newsroom/${article.slug}`}
              className="group block rounded-2xl border border-transparent px-0 py-1 transition-colors hover:border-[#F5F4F0]/8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#F5F4F0]/45">
                {formatBlogEyebrow(article.publishedAt, article.readingTime)}
              </p>
              <p className="font-display mt-1 text-base font-semibold text-[#F5F4F0] transition-colors group-hover:text-[#F05A28] md:text-lg">
                {article.title}
              </p>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#F5F4F0]/55">{article.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/newsroom" className="text-sm font-medium text-[#F05A28] transition-colors hover:text-[#ff6d40]">
          Newsroom hub →
        </Link>
      </div>
    </section>
  );
}
