import { SiteShell } from "@/components/layout/site-shell";
import { AutomationCostSavingsCalculator } from "@/components/tools/automation/AutomationCostSavingsCalculator";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Automation Cost Savings Calculator",
  description:
    "See how much manual work is costing you — turn recurring process time into a hard annual cost and a real payback period.",
  canonicalUrl: "https://darlingmartech.com/tools/automation-cost-savings-calculator",
});

export default function AutomationCostSavingsCalculatorPage() {
  return (
    <SiteShell>
      <AutomationCostSavingsCalculator />
    </SiteShell>
  );
}
