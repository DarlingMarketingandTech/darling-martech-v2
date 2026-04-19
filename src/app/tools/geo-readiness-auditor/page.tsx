import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { GeoAuditorEngine } from "@/components/tools/geo/GeoAuditorEngine";
import { tools } from "@/data/labs";
import { buildMetadata } from "@/lib/metadata";

const geoTool = tools.find((entry) => entry.slug === "geo-readiness-auditor");

export const metadata: Metadata = buildMetadata({
  title: geoTool?.title ?? "GEO Readiness Auditor",
  description:
    geoTool?.description ??
    "Audit crawl signals, schema, metadata, headings, and citations for a public URL.",
  canonicalUrl: "https://darlingmartech.com/tools/geo-readiness-auditor",
});

export default function GeoReadinessAuditorPage() {
  const tool = tools.find((entry) => entry.slug === "geo-readiness-auditor");
  if (!tool) {
    notFound();
  }

  return (
    <SiteShell>
      <PageHero eyebrow="Diagnostic tool" headline={tool.title} body={tool.description} />
      <BandSection className="mt-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">{tool.estimatedTime}</p>
          <p className="text-sm text-[#F5F4F0]/56">{tool.isLive ? "Live tool" : "MVP diagnostic build"}</p>
        </div>
      </BandSection>
      <div className="mt-12">
        <GeoAuditorEngine />
      </div>
    </SiteShell>
  );
}
