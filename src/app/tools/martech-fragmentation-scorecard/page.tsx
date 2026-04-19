import { SiteShell } from "@/components/layout/site-shell";
import { MartechFragmentationScorecard } from "@/components/tools/fragmentation/MartechFragmentationScorecard";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "MarTech Fragmentation Scorecard",
  description:
    "Score how fragmented your current stack is and see which missing connections are creating reporting and workflow problems.",
  canonicalUrl: "https://darlingmartech.com/tools/martech-fragmentation-scorecard",
});

export default function MartechFragmentationScorecardPage() {
  return (
    <SiteShell>
      <MartechFragmentationScorecard />
    </SiteShell>
  );
}
