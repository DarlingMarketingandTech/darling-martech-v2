/** @type {import('next-sitemap').IConfig} */
/**
 * next-sitemap reads routes from the Next.js build output (static + SSG paths).
 * Verified route families in generated sitemap:
 * - /problems + /problems/[6 cluster slugs]
 * - /proof + /proof/[case slugs]
 * - /tools + /tools/[slug] (hub + QuizEngine slugs + dedicated tool routes)
 * - /resources, /resources/blog, /resources/blog/[article slugs], /resources/frameworks
 */
module.exports = {
  siteUrl: "https://darlingmartech.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  outDir: "public",
  exclude: ["/api/*"],
};
