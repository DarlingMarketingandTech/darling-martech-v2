import { SiteShell } from "@/components/3d/core/SiteShell";
import { HeroBackground } from "@/components/3d/scenes/home/HeroBackground";
import { BentoDiagnosisGrid } from "@/components/interactive/BentoDiagnosisGrid";

export default function HomeV2Page() {
  return (
    <SiteShell>
      <HeroBackground />
      <BentoDiagnosisGrid />
    </SiteShell>
  );
}
