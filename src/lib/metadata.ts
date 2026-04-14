import type { Metadata } from "next";
import type { PageMeta } from "@/types";
import { siteConfig } from "@/data/site-config";

export function buildMetadata(meta: PageMeta): Metadata {
  const title = `${meta.title} | ${siteConfig.name}`;
  const description = meta.description;
  const canonicalPath = meta.canonicalUrl ?? siteConfig.url;
  const image = meta.ogImage ?? siteConfig.defaultMeta.ogImage ?? "/og-default.svg";

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: meta.noIndex ? { index: false, follow: false } : undefined,
  };
}
