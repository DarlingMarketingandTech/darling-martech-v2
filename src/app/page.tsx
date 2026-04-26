import type { Metadata } from "next";
import { HomeV3 } from "@/components/home-v3/HomeV3";
import { HomeShell } from "@/components/layout/HomeShell";
import { homepageMeta } from "@/data/homepage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(homepageMeta);

export default function HomePage() {
  return (
    <HomeShell>
      <HomeV3 />
    </HomeShell>
  );
}
