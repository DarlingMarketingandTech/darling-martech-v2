import { SiteShell } from "@/components/layout/site-shell";
import { CmoSimulatorAccessGate } from "@/components/tools/simulator/CmoSimulatorAccessGate";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Play the CMO Simulator",
  description:
    "A standalone strategy simulation. Explore tradeoffs, priorities, and operator thinking in an open-ended format.",
  canonicalUrl: "https://darlingmartech.com/tools/cmo-simulator",
});

export default function CmoSimulatorPage() {
  return (
    <SiteShell>
      <CmoSimulatorAccessGate />
    </SiteShell>
  );
}
