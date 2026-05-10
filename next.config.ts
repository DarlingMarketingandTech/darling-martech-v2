import type { NextConfig } from "next";

/**
 * Permanent redirects for SEO and legacy URLs.
 * - /work → /proof: old case-study path before proof hub rename.
 * - /lab → /tools: old diagnostics hub path before tools rename.
 * - /proof/pike-medical: removed parent-style proof URL; canonical slug is clinical-compass.
 * - /tools/growth-bottleneck-quiz: quiz slug renamed to growth-system-audit.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/proof", permanent: true },
      { source: "/work/:slug", destination: "/proof/:slug", permanent: true },
      { source: "/lab", destination: "/tools", permanent: true },
      { source: "/lab/:slug", destination: "/tools/:slug", permanent: true },
      {
        source: "/proof/pike-medical",
        destination: "/proof/clinical-compass",
        permanent: true,
      },
      {
        source: "/tools/growth-bottleneck-quiz",
        destination: "/tools/growth-system-audit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
