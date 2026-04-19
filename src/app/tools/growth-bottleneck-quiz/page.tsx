import type { Metadata } from "next";
import { GrowthBottleneckQuizClient } from "@/components/tools/GrowthBottleneckQuizClient";
import { SiteShell } from "@/components/layout/site-shell";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Growth Bottleneck Quiz",
  description:
    "Answer 5 honest questions about where your marketing is stuck. Identify the real constraint and find out exactly where to start.",
  canonicalUrl: "https://darlingmartech.com/tools/growth-bottleneck-quiz",
});

export default function GrowthBottleneckQuizPage() {
  return (
    <SiteShell>
      <GrowthBottleneckQuizClient />
    </SiteShell>
  );
}
