import type { Metadata } from "next";
import AttributionSnapshotEngine from "@/components/tools/attribution/AttributionSnapshotEngine";
import { AttributionSnapshotHero } from "@/components/tools/attribution/AttributionSnapshotHero";
import { SiteShell } from "@/components/layout/site-shell";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Attribution Snapshot",
  description:
    "A fast, directional read on which channels look closer to revenue when you compare first-touch, last-touch, linear, and time-decay models side by side.",
  canonicalUrl: "https://darlingmartech.com/tools/attribution-snapshot",
});

export default function AttributionSnapshotPage() {
  return (
    <SiteShell>
      <AttributionSnapshotHero />
      <div className="mt-14 md:mt-20">
        <AttributionSnapshotEngine />
      </div>
    </SiteShell>
  );
}
