import type { Metadata } from "next";
import AttributionSnapshotEngine from "@/components/tools/attribution/AttributionSnapshotEngine";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
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
      <PageHero
        eyebrow="Free diagnostic tool"
        headline="Attribution Snapshot"
        body="See exactly where your channel story changes depending on the model. This is a practical tool for spotting where your reporting setup is too thin to trust."
      />
      <div className="mt-14">
        <AttributionSnapshotEngine />
      </div>
    </SiteShell>
  );
}
