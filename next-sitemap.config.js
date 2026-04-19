/** @type {import('next-sitemap').IConfig} */
/**
 * next-sitemap reads routes from the Next.js build output (static + SSG paths).
 * Verified route families in generated sitemap:
 * - /problems + /problems/[6 cluster slugs]
 * - /proof + /proof/[case slugs]
 * - /services + /services/[slug] + /services/technical-roadmap (dedicated page)
 * - /industries + /industries/[sector slugs]
 * - /tools + /tools/[slug] (hub + QuizEngine slugs + dedicated tool routes)
 * - /resources, /resources/blog, /resources/blog/[article slugs], /resources/frameworks
 * - /about, /process, /contact, /studio, /privacy-policy
 */
module.exports = {
  siteUrl: "https://darlingmartech.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  outDir: "public",
  exclude: ["/api/*"],
};
