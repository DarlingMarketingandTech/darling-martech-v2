import { SiteShell } from "@/components/layout/site-shell";
import { BuildVsBuyStackCalculator } from "@/components/tools/build-vs-buy/BuildVsBuyStackCalculator";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Build vs Buy Stack Calculator",
  description:
    "Compare the real annual cost of building the internal team versus working with an operator-led partner.",
  canonicalUrl: "https://darlingmartech.com/tools/build-vs-buy-stack-calculator",
});

export default function BuildVsBuyStackCalculatorPage() {
  return (
    <SiteShell>
      <BuildVsBuyStackCalculator />
    </SiteShell>
  );
}
