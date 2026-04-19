import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { blogArticles, getBlogArticleBySlug } from "@/data/blog";
import { buildMetadata } from "@/lib/metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return buildMetadata({ title: "Post not found", description: "This article does not exist.", noIndex: true });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    canonicalUrl: `https://darlingmartech.com/resources/blog/${article.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <SiteShell>
      <SectionWrapper className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
          {article.publishedAt} · {article.readingTime} min read
        </p>
        <h1 className="font-display mt-4 text-balance text-4xl font-bold md:text-5xl">{article.title}</h1>
        <p className="mt-6 text-lg leading-8 text-[#F5F4F0]/78">{article.excerpt}</p>
        {article.coverImage ? (
          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-[#F5F4F0]/10">
            <CloudinaryImage
              publicId={article.coverImage}
              alt={article.title}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        ) : null}
        <div className="mt-12 max-w-none">
          {article.body.map((paragraph, index) => (
            <p key={`${article.slug}-${index}`} className="mb-6 text-base leading-8 text-[#F5F4F0]/85">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionWrapper>

      <BandSection className="text-center">
        <p className="font-display text-2xl font-semibold text-[#F5F4F0]">Want this applied to your stack?</p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#F5F4F0]/65">
          Run the bottleneck quiz or book a diagnostic call. Either path starts with clarity, not a pitch deck.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/tools/growth-bottleneck-quiz" size="lg">
            Run the quiz
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Contact
          </Button>
        </div>
      </BandSection>
    </SiteShell>
  );
}
