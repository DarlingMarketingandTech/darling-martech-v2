import type { ReactNode } from "react";
import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import type { ProcessNewsroomAnchor } from "@/types";
import { processNewsroomAnchorHref } from "@/data/newsroom";
import { cn } from "@/lib/utils";

export type NewsroomArticleEditorialProps = {
  title: string;
  excerpt: string;
  /** e.g. `Apr 22, 2026` */
  publishedLine: string;
  /** e.g. `7 min read` */
  readingLine: string;
  coverImage?: string;
  categories: string[];
  tags: string[];
  body: string[];
  proofLinks: { slug: string; label: string }[];
  problemLinks: { slug: string; label: string }[];
  serviceLinks: { slug: string; label: string }[];
  processAnchors?: ProcessNewsroomAnchor[];
  anchorLabel: Record<string, string>;
};

function railHeading(text: string) {
  return (
    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F4F0]/38">{text}</p>
  );
}

function railLink(href: string, children: ReactNode) {
  return (
    <Link
      href={href}
      className="group block border-b border-[#F5F4F0]/6 py-2.5 text-sm leading-snug text-[#F5F4F0]/72 transition-colors last:border-b-0 hover:text-[#F05A28]"
    >
      <span className="inline-flex items-baseline gap-2">
        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#F05A28]/50 transition-colors group-hover:bg-[#F05A28]" aria-hidden />
        <span>{children}</span>
      </span>
    </Link>
  );
}

export function NewsroomArticleEditorial({
  title,
  excerpt,
  publishedLine,
  readingLine,
  coverImage,
  categories,
  tags,
  body,
  proofLinks,
  problemLinks,
  serviceLinks,
  processAnchors,
  anchorLabel,
}: NewsroomArticleEditorialProps) {
  const hasConnections =
    proofLinks.length > 0 || problemLinks.length > 0 || serviceLinks.length > 0 || (processAnchors?.length ?? 0) > 0;

  return (
    <article className="relative">
      {/* Masthead */}
      <header className="border-b border-[#F5F4F0]/10 pb-10 md:pb-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Link
            href="/newsroom"
            className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5F4F0]/45 transition-colors hover:text-[#0FD9C8]"
          >
            <span className="text-[#0FD9C8]" aria-hidden>
              ←
            </span>
            Newsroom
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#F05A28]/80">Editorial</p>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-14">
          {/* Lead column: headline + deck */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="font-display text-balance text-[2.125rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#F5F4F0] sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
              {title}
            </h1>
            <p
              className={cn(
                "mt-6 max-w-2xl font-display text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-[#F5F4F0]/72 sm:text-2xl sm:leading-snug md:text-[1.65rem] md:leading-[1.35]"
              )}
            >
              {excerpt}
            </p>
          </div>

          {/* Meta rail — stacks under deck on small screens */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:border-l lg:border-[#F5F4F0]/10 lg:pl-8 xl:pl-10">
            <div className="surface-card grain-mask rounded-2xl border border-[#F5F4F0]/8 p-5 md:p-6 lg:sticky lg:top-28">
              <div className="flex gap-8">
                <div>
                  {railHeading("Published")}
                  <p className="mt-2 font-mono text-xs tabular-nums text-[#F5F4F0]/78">{publishedLine}</p>
                </div>
                <div>
                  {railHeading("Length")}
                  <p className="mt-2 font-mono text-xs text-[#F5F4F0]/78">{readingLine}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </header>

      {/* Media + body — reading column only */}
      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
        <div className="lg:col-span-7 xl:col-span-8">
          {coverImage ? (
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-[#F5F4F0]/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <CloudinaryImage
                publicId={coverImage}
                alt={title}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                priority
              />
              <figcaption className="sr-only">Hero image for this article.</figcaption>
            </figure>
          ) : null}

          <div
            className={cn(
              "newsroom-prose mt-12 max-w-2xl space-y-6 text-[1.0625rem] leading-[1.78] text-[#F5F4F0]/86 md:text-lg md:leading-[1.75]",
              coverImage ? "" : "mt-0 lg:mt-0"
            )}
          >
            {body.map((paragraph, index) => (
              <p key={`p-${index}`}>{paragraph}</p>
            ))}
          </div>

          {(categories.length > 0 || tags.length > 0) && (
            <div className="mt-14 max-w-2xl border-t border-[#F5F4F0]/10 pt-10">
              {categories.length > 0 ? (
                <div className={tags.length > 0 ? "mb-8" : ""}>
                  {railHeading("Topic")}
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <li key={c}>
                        <Link
                          href={`/newsroom?category=${encodeURIComponent(c)}`}
                          className="inline-flex rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/45 px-3 py-1.5 text-sm text-[#F5F4F0]/72 transition-colors hover:border-[#F05A28]/35 hover:text-[#F05A28]"
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {tags.length > 0 ? (
                <div>
                  {railHeading("Tags")}
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <li key={t}>
                        <Link
                          href={`/newsroom?tag=${encodeURIComponent(t)}`}
                          className="inline-flex rounded-full border border-[#F5F4F0]/8 px-3 py-1.5 text-xs text-[#F5F4F0]/52 transition-colors hover:border-[#0FD9C8]/35 hover:text-[#0FD9C8]"
                        >
                          #{t}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}

          {hasConnections ? (
            <div className="mt-10 max-w-2xl border-t border-[#F5F4F0]/10 pt-10">
              {railHeading("On site")}
              <nav className="mt-3" aria-label="Related site sections">
                {proofLinks.map((c) => (
                  <div key={c.slug}>{railLink(`/proof/${c.slug}`, c.label)}</div>
                ))}
                {problemLinks.map((p) => (
                  <div key={p.slug}>{railLink(`/problems/${p.slug}`, p.label)}</div>
                ))}
                {serviceLinks.map((s) => (
                  <div key={s.slug}>{railLink(`/services/${s.slug}`, s.label)}</div>
                ))}
                {processAnchors?.map((a) => (
                  <div key={a}>{railLink(processNewsroomAnchorHref(a), anchorLabel[a] ?? a)}</div>
                ))}
                {processAnchors && processAnchors.length > 0 ? (
                  <div>{railLink("/process", "Full process overview")}</div>
                ) : null}
              </nav>
            </div>
          ) : null}
        </div>

        {/* Empty column on large screens keeps grid alignment with masthead */}
        <div className="hidden lg:col-span-5 lg:block xl:col-span-4" aria-hidden />
      </div>
    </article>
  );
}
