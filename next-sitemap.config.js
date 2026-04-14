/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://darlingmartech.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  outDir: "public",
  exclude: ["/api/*"],
};
