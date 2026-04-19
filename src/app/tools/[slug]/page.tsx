import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { QuizEngine } from "@/components/tools/QuizEngine";
import { tools } from "@/data/labs";
import { buildMetadata } from "@/lib/metadata";

type ToolSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tools.filter((tool) => tool.slug !== "attribution-snapshot").map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((entry) => entry.slug === slug);

  if (!tool) {
    return buildMetadata({ title: "Tool not found", description: "The requested tool does not exist.", noIndex: true });
  }

  return buildMetadata({
    title: tool.title,
    description: tool.description,
    canonicalUrl: `https://darlingmartech.com/tools/${tool.slug}`,
  });
}

export default async function ToolSlugPage({ params }: ToolSlugPageProps) {
  const { slug } = await params;
  const tool = tools.find((entry) => entry.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <SiteShell>
      <PageHero eyebrow="Diagnostic tool" headline={tool.title} body={tool.description} />
      <BandSection className="mt-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">{tool.estimatedTime}</p>
          <p className="text-sm text-[#F5F4F0]/56">
            {tool.isLive ? "Live tool" : "MVP diagnostic build"}
          </p>
        </div>
      </BandSection>
      <div className="mt-12">
        {tool.questions.length ? (
          <QuizEngine tool={tool} />
        ) : (
          <section className="surface-card rounded-4xl p-8 md:p-10">
            <p className="text-lg leading-8 text-[#F5F4F0]/72">
              This tool is still being wired into the new diagnostic engine. The page is live so the information architecture is in place, but the interactive flow is not complete yet.
            </p>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
