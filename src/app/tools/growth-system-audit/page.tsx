import type { Metadata } from "next";
import { GrowthBottleneckQuizClient } from "@/components/tools/GrowthBottleneckQuizClient";
import { SiteShell } from "@/components/layout/site-shell";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Growth System Audit",
  description:
    "A fast diagnostic that maps where the growth system is actually broken — structural, executional, or measurement-related — before you buy services or a call.",
  canonicalUrl: "https://darlingmartech.com/tools/growth-system-audit",
});

export default function GrowthSystemAuditPage() {
  return (
    <SiteShell>
      <GrowthBottleneckQuizClient />
    </SiteShell>
  );
}
