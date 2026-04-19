import { SiteShell } from "@/components/layout/site-shell";
import { DemandCaptureCacSimulator } from "@/components/tools/demand/DemandCaptureCacSimulator";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Demand Capture & CAC Simulator",
  description:
    "See whether paid demand is actually working — healthy CAC and enough downstream value to justify the channel.",
  canonicalUrl: "https://darlingmartech.com/tools/demand-capture-cac-simulator",
});

export default function DemandCaptureCacSimulatorPage() {
  return (
    <SiteShell>
      <DemandCaptureCacSimulator />
    </SiteShell>
  );
}
