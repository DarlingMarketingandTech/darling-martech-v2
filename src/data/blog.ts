import type { BlogPost, ProblemCluster, TrustLadderStage } from "@/types";

export type BlogArticle = BlogPost & {
  body: string[];
};

const browse: TrustLadderStage = "browse";

export const blogArticles: BlogArticle[] = [
  {
    slug: "one-operator-martech-accountability",
    title: "Why one accountable operator beats a fragmented martech bench",
    excerpt:
      "When strategy, systems, and execution live in different hands, nothing compounds. Here is how I think about closing that gap without hiring a department.",
    publishedAt: "2026-04-01",
    readingTime: 6,
    categories: ["Strategy", "Operations"],
    problemClusters: ["no-strategy-owner", "systems-disconnected"] as ProblemCluster[],
    trustLadderStage: browse,
    featured: true,
    coverImage: "studio/jacob-portrait",
    body: [
      "Most growth-stage businesses do not fail because they lack tools. They fail because nobody owns the full loop from signal to revenue.",
      "A CRM without follow-up logic is a database. A website without measurement is a brochure. Paid media without attribution is a donation.",
      "I built Darling MarTech to sit in one seat across that loop: diagnose the real bottleneck, build the minimum viable system, and run it long enough to prove it.",
    ],
  },
  {
    slug: "attribution-without-theatre",
    title: "Attribution without the spreadsheet theatre",
    excerpt:
      "If leadership cannot answer which channels create qualified pipeline, the reporting stack is still a hobby. A practical checklist for tightening it.",
    publishedAt: "2026-04-08",
    readingTime: 8,
    categories: ["Analytics", "Attribution"],
    problemClusters: ["pipeline-not-predictable"] as ProblemCluster[],
    trustLadderStage: browse,
    featured: true,
    body: [
      "Attribution arguments usually collapse into two camps: perfect multi-touch models nobody maintains, or last-click dashboards that lie politely.",
      "The middle path is operational: agree on the definition of a qualified lead, instrument the handoffs, and reconcile marketing-sourced pipeline with revenue on a cadence you can keep.",
      "If that sounds boring, good. Boring reporting is what scales.",
    ],
  },
  {
    slug: "geo-readiness-beyond-the-map-pack",
    title: "GEO readiness beyond the map pack",
    excerpt:
      "Local discoverability is no longer only maps. It is structured data, reviews, site trust signals, and how AI-assisted search summarizes you.",
    publishedAt: "2026-04-14",
    readingTime: 5,
    categories: ["Local", "Search"],
    problemClusters: ["not-visible-enough"] as ProblemCluster[],
    trustLadderStage: browse,
    featured: false,
    body: [
      "If AI-generated summaries flatten your category into three names, differentiation has to live in proof, specificity, and consistent identity signals.",
      "That is not a single tactic. It is a system: listings, on-site schema, creative that matches the promise, and a CRM that captures how people actually found you.",
    ],
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
