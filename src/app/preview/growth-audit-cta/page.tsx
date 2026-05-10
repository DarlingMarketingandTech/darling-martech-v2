import type { Metadata } from "next";
import { GrowthSystemAuditCta } from "@/components/cta/GrowthSystemAuditCta";
import { SiteShell } from "@/components/layout/site-shell";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Growth System Audit — Section Preview",
  description:
    "Operator-grade CTA section preview for the Growth System Audit diagnostic.",
  canonicalUrl: "https://darlingmartech.com/preview/growth-audit-cta",
});

export default function GrowthAuditCtaPreviewPage() {
  return (
    <SiteShell>
      <GrowthSystemAuditCta />
    </SiteShell>
  );
}
