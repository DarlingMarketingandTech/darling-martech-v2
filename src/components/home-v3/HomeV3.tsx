import { HeroV3 } from "@/components/home-v3/HeroV3";
import { BottleneckGridV3 } from "@/components/home-v3/BottleneckGridV3";
import { CapabilityProofGridV3 } from "@/components/home-v3/CapabilityProofGridV3";
import { SelectedOutcomesV3 } from "@/components/home-v3/SelectedOutcomesV3";
import { ToolsPreviewV3 } from "@/components/home-v3/ToolsPreviewV3";
import { ClosingCtaV3 } from "@/components/home-v3/ClosingCtaV3";

export function HomeV3() {
  return (
    <>
      <HeroV3 />
      <BottleneckGridV3 />
      <CapabilityProofGridV3 />
      <SelectedOutcomesV3 />
      <ToolsPreviewV3 />
      <ClosingCtaV3 />
    </>
  );
}
