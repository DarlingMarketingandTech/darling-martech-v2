import { SiteShell } from "@/components/layout/site-shell";
import { FunnelRoiForecaster } from "@/components/tools/funnel/FunnelRoiForecaster";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Funnel ROI Forecaster",
  description:
    "See how much revenue is trapped in your funnel when one stage underperforms.",
  canonicalUrl: "https://darlingmartech.com/tools/funnel-roi-forecaster",
});

export default function FunnelRoiForecasterPage() {
  return (
    <SiteShell>
      <FunnelRoiForecaster />
    </SiteShell>
  );
}
