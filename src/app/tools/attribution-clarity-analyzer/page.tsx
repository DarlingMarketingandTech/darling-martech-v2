import { SiteShell } from "@/components/layout/site-shell";
import { AttributionClarityAnalyzer } from "@/components/tools/attribution/AttributionClarityAnalyzer";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Attribution Clarity Analyzer",
  description:
    "See how much of your revenue you can actually explain — attributable revenue versus hidden behind weak tracking.",
  canonicalUrl: "https://darlingmartech.com/tools/attribution-clarity-analyzer",
});

export default function AttributionClarityAnalyzerPage() {
  return (
    <SiteShell>
      <AttributionClarityAnalyzer />
    </SiteShell>
  );
}
