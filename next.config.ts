import type { NextConfig } from "next";

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
