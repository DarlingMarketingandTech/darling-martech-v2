import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/button";
import { NewsroomArticleEditorial } from "@/components/newsroom/NewsroomArticleEditorial";
import { newsroomTruncateWords } from "@/lib/newsroom-truncate";
import { formatBlogEyebrow } from "@/data/blog";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";
import { getNewsroomArticleBySlug, newsroomArticles } from "@/data/newsroom";
import { buildMetadata } from "@/lib/metadata";

type NewsroomArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsroomArticlePageProps) {
  const { slug } = await params;
  const article = getNewsroomArticleBySlug(slug);

  if (!article) {
    return buildMetadata({ title: "Article not found", description: "This newsroom piece does not exist.", noIndex: true });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    canonicalUrl: `https://darlingmartech.com/newsroom/${article.slug}`,
  });
}

const anchorLabel: Record<string, string> = {
  principles: "Principles",
  timeline: "Engagement timeline",
  engagements: "Engagement shapes",
  fit: "Honest about fit",
  scenarios: "Is this right for you?",
};

function splitEyebrow(eyebrow: string): { publishedLine: string; readingLine: string } {
  const idx = eyebrow.indexOf(" · ");
  if (idx === -1) return { publishedLine: eyebrow, readingLine: "" };
  return {
    publishedLine: eyebrow.slice(0, idx),
    readingLine: eyebrow.slice(idx + 3),
  };
}

export default async function NewsroomArticlePage({ params }: NewsroomArticlePageProps) {
  const { slug } = await params;
  const article = getNewsroomArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const eyebrow = formatBlogEyebrow(article.publishedAt, article.readingTime);
  const { publishedLine, readingLine } = splitEyebrow(eyebrow);

  const proofLinks = (article.relatedProofSlugs ?? [])
    .map((s) => {
      const c = caseStudies.find((x) => x.slug === s);
      return c ? { slug: c.slug, label: newsroomTruncateWords(c.clientName, 8) } : undefined;
    })
    .filter((x): x is { slug: string; label: string } => x != null);

  const problemLinks: { slug: string; label: string }[] = (article.relatedProblemSlugs ?? []).flatMap((s) => {
    const p = problemPages.find((x) => x.slug === s);
    return p ? [{ slug: p.slug, label: newsroomTruncateWords(p.title, 10) }] : [];
  });

  const serviceLinks: { slug: string; label: string }[] = (article.relatedServiceSlugs ?? []).flatMap((s) => {
    const x = services.find((y) => y.slug === s);
    return x ? [{ slug: x.slug, label: newsroomTruncateWords(x.title, 6) }] : [];
  });

  return (
    <SiteShell>
      <SectionWrapper className="max-w-none px-0 py-10 md:py-14">
        <NewsroomArticleEditorial
          title={article.title}
          excerpt={article.excerpt}
          publishedLine={publishedLine}
          readingLine={readingLine}
          coverImage={article.coverImage}
          categories={article.categories}
          tags={article.tags}
          body={article.body}
          proofLinks={proofLinks}
          problemLinks={problemLinks}
          serviceLinks={serviceLinks}
          processAnchors={article.relatedProcessAnchors}
          anchorLabel={anchorLabel}
        />
      </SectionWrapper>

      <BandSection className="mt-6 border-t border-[#F05A28]/12 bg-[linear-gradient(145deg,rgba(240,90,40,0.06),rgba(12,12,14,0.65))]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">More in the newsroom</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#F5F4F0]/52">
            Browse by topic, tag, or which proof and service pages each piece supports.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/newsroom" variant="secondary" size="lg">
              Back to hub
            </Button>
            <Button href="/contact" size="lg">
              Start a conversation
            </Button>
          </div>
          <p className="mt-8">
            <Link
              href="/proof"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/40 transition-colors hover:text-[#0FD9C8]"
            >
              Proof index →
            </Link>
          </p>
        </div>
      </BandSection>
    </SiteShell>
  );
}
