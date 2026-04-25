/**
 * Newsroom articles (`/newsroom`, `/newsroom/[slug]`).
 *
 * - `categories` — editorial groupings for hub filters (not the same as taxonomy `ProblemCluster`).
 * - `tags` — free-form discovery labels.
 * - `relatedProofSlugs` / `relatedProblemSlugs` / `relatedServiceSlugs` — must match real slugs in work/problems/services data.
 * - `relatedProcessAnchors` — ids on `/process` (see `ProcessNewsroomAnchor`); URLs are `/process#timeline`, etc.
 */
import type { NewsroomArticle, ProcessNewsroomAnchor } from "@/types";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";

const PROOF_SLUGS = new Set<string>(caseStudies.map((c) => c.slug));
const PROBLEM_SLUGS = new Set<string>(problemPages.map((p) => p.slug));
const SERVICE_SLUGS = new Set<string>(services.map((s) => s.slug));

const PROCESS_ANCHORS = new Set<ProcessNewsroomAnchor>([
  "principles",
  "timeline",
  "engagements",
  "fit",
  "scenarios",
]);

function assertNewsroomArticle(article: NewsroomArticle): void {
  for (const slug of article.relatedProofSlugs ?? []) {
    if (!PROOF_SLUGS.has(slug)) {
      throw new Error(`Newsroom "${article.slug}": unknown proof slug "${slug}"`);
    }
  }
  for (const slug of article.relatedProblemSlugs ?? []) {
    if (!PROBLEM_SLUGS.has(slug)) {
      throw new Error(`Newsroom "${article.slug}": unknown problem slug "${slug}"`);
    }
  }
  for (const slug of article.relatedServiceSlugs ?? []) {
    if (!SERVICE_SLUGS.has(slug)) {
      throw new Error(`Newsroom "${article.slug}": unknown service slug "${slug}"`);
    }
  }
  for (const anchor of article.relatedProcessAnchors ?? []) {
    if (!PROCESS_ANCHORS.has(anchor)) {
      throw new Error(`Newsroom "${article.slug}": unknown process anchor "${anchor}"`);
    }
  }
}

export function processNewsroomAnchorHref(anchor: ProcessNewsroomAnchor): string {
  return `/process#${anchor}`;
}

const articlesDraft: NewsroomArticle[] = [
  {
    slug: "digital-infrastructure-while-the-brand-is-still-writing",
    title: "Digital infrastructure while the brand is still writing its story",
    excerpt:
      "When an organization is building in public, digital is rarely “a channel.” It is how fans and partners experience one coherent narrative — and how you measure what is working.",
    publishedAt: "2026-04-22",
    readingTime: 7,
    categories: ["Strategy", "Operations"],
    tags: ["fan experience", "measurement", "partnerships", "content systems"],
    relatedProofSlugs: ["graston-qualified-leads"],
    relatedProblemSlugs: ["no-strategy-owner"],
    relatedServiceSlugs: ["fractional-cmo"],
    relatedProcessAnchors: ["principles", "timeline"],
    coverImage: "studio/jacob-portrait",
    body: [
      "High-attention categories do not reward noise. They reward continuity: a recognizable point of view, proof that matches the promise, and reporting leadership can trust when budgets tighten.",
      "That is why I think about digital as infrastructure — social, search, lifecycle, and performance surfaces orchestrated around one roadmap, not duplicated in competing fiefdoms.",
      "Content is the bridge between ambition in the market and commercial reality in the boardroom. Quality and volume only coexist when editorial standards and operational rigor are designed together.",
      "The teams that scale pair bold creative bets with boring fundamentals: clear hypotheses, clean instrumentation, and a culture that posts, measures, and refines without ego.",
    ],
  },
  {
    slug: "reporting-that-leadership-can-act-on",
    title: "Reporting that leadership can act on — not dashboards that look busy",
    excerpt:
      "Attribution arguments usually collapse into perfect models nobody maintains or last-click charts that lie politely. The sustainable path is operational: definitions, handoffs, and a cadence you can keep.",
    publishedAt: "2026-04-18",
    readingTime: 6,
    categories: ["Analytics", "Attribution"],
    tags: ["pipeline", "RevOps", "stakeholder reporting"],
    relatedProofSlugs: ["graston-growth-engine"],
    relatedProblemSlugs: ["pipeline-not-predictable"],
    relatedServiceSlugs: ["attribution-analytics"],
    relatedProcessAnchors: ["timeline", "engagements"],
    body: [
      "If leadership cannot answer which channels create qualified pipeline, the reporting stack is still a hobby.",
      "The middle path is operational: agree on the definition of a qualified lead, instrument the handoffs, and reconcile marketing-sourced pipeline with revenue on a cadence the team can maintain.",
      "Engagement shape matters too — diagnostics, scoped projects, and fractional ownership change what you measure and when. Pick the shape that matches the bottleneck, then align the scoreboard to it.",
    ],
  },
];

for (const article of articlesDraft) {
  assertNewsroomArticle(article);
}

export const newsroomArticles: NewsroomArticle[] = articlesDraft;

export function getNewsroomArticleBySlug(slug: string): NewsroomArticle | undefined {
  return newsroomArticles.find((a) => a.slug === slug);
}

export function getNewsroomArticlesByProofSlug(proofSlug: string): NewsroomArticle[] {
  return newsroomArticles.filter((a) => a.relatedProofSlugs?.includes(proofSlug));
}

export function getNewsroomArticlesByProblemSlug(problemSlug: string): NewsroomArticle[] {
  return newsroomArticles.filter((a) => a.relatedProblemSlugs?.includes(problemSlug));
}

export function getNewsroomArticlesByServiceSlug(serviceSlug: string): NewsroomArticle[] {
  return newsroomArticles.filter((a) => a.relatedServiceSlugs?.includes(serviceSlug));
}

/** Articles that link to any `/process` section (for the process page “related reading” strip). */
export function getNewsroomArticlesLinkedToProcess(): NewsroomArticle[] {
  return newsroomArticles.filter((a) => (a.relatedProcessAnchors?.length ?? 0) > 0);
}

export function getNewsroomCategoryList(): string[] {
  const set = new Set<string>();
  for (const a of newsroomArticles) {
    for (const c of a.categories) set.add(c);
  }
  return [...set].sort((x, y) => x.localeCompare(y));
}

export function getNewsroomTagList(): string[] {
  const set = new Set<string>();
  for (const a of newsroomArticles) {
    for (const t of a.tags) set.add(t);
  }
  return [...set].sort((x, y) => x.localeCompare(y));
}

export type NewsroomHubFilters = {
  category?: string;
  tag?: string;
  proof?: string;
  problem?: string;
  service?: string;
  process?: "1";
};

export function filterNewsroomArticles(
  articles: NewsroomArticle[],
  filters: NewsroomHubFilters
): NewsroomArticle[] {
  return articles.filter((a) => {
    if (filters.category && !a.categories.includes(filters.category)) return false;
    if (filters.tag && !a.tags.includes(filters.tag)) return false;
    if (filters.proof && !a.relatedProofSlugs?.includes(filters.proof)) return false;
    if (filters.problem && !a.relatedProblemSlugs?.includes(filters.problem)) return false;
    if (filters.service && !a.relatedServiceSlugs?.includes(filters.service)) return false;
    if (filters.process === "1" && !(a.relatedProcessAnchors && a.relatedProcessAnchors.length > 0)) {
      return false;
    }
    return true;
  });
}

export function buildNewsroomHubQuery(next: Partial<NewsroomHubFilters>, current: NewsroomHubFilters): string {
  const merged: NewsroomHubFilters = { ...current, ...next };
  const params = new URLSearchParams();
  if (merged.category) params.set("category", merged.category);
  if (merged.tag) params.set("tag", merged.tag);
  if (merged.proof) params.set("proof", merged.proof);
  if (merged.problem) params.set("problem", merged.problem);
  if (merged.service) params.set("service", merged.service);
  if (merged.process === "1") params.set("process", "1");
  const s = params.toString();
  return s ? `?${s}` : "";
}
