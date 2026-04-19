"use client";

import { useMemo, useState } from "react";
import {
  computeFunnelRevenue,
  computeRevenueLiftFromStageChange,
} from "@/lib/tools/formulas";
import { formatCurrency, formatNumber } from "@/lib/tools/tool-formatters";
import { ToolShell } from "@/components/tools/shared/ToolShell";
import { ToolSection } from "@/components/tools/shared/ToolSection";
import { ToolInputRow } from "@/components/tools/shared/ToolInputRow";
import { ToolNumberInput } from "@/components/tools/shared/ToolNumberInput";
import { ToolStatCard } from "@/components/tools/shared/ToolStatCard";
import { ToolLeadGate } from "@/components/tools/shared/ToolLeadGate";
import { ToolResultsCta } from "@/components/tools/shared/ToolResultsCta";

export function FunnelRoiForecaster() {
  const [monthlyTraffic, setMonthlyTraffic] = useState(10_000);
  const [visitorToLeadRate, setVisitorToLeadRate] = useState(0.03);
  const [leadToOppRate, setLeadToOppRate] = useState(0.12);
  const [oppToDealRate, setOppToDealRate] = useState(0.25);
  const [averageDealValue, setAverageDealValue] = useState(5_000);
  const [improvedLeadToOppRate, setImprovedLeadToOppRate] = useState(0.16);

  const base = useMemo(
    () => ({
      monthlyTraffic,
      visitorToLeadRate,
      leadToOppRate,
      oppToDealRate,
      averageDealValue,
    }),
    [monthlyTraffic, visitorToLeadRate, leadToOppRate, oppToDealRate, averageDealValue]
  );

  const current = useMemo(() => computeFunnelRevenue(base), [base]);
  const lift = useMemo(
    () => computeRevenueLiftFromStageChange(base, "leadToOppRate", improvedLeadToOppRate),
    [base, improvedLeadToOppRate]
  );

  return (
    <ToolShell
      eyebrow="Conversion system diagnostic"
      title="See where your funnel is leaking revenue"
      description="This tool shows how a weak middle step can quietly cap revenue, even when traffic looks healthy."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ToolSection eyebrow="Inputs" title="Current funnel assumptions">
          <div className="space-y-5">
            <ToolInputRow label="Monthly traffic" hint="Use a realistic recent monthly average.">
              <ToolNumberInput value={monthlyTraffic} onChange={setMonthlyTraffic} min={0} step={100} />
            </ToolInputRow>
            <ToolInputRow label="Visitor to lead rate" hint="Enter as a decimal. Example: 0.03 = 3%.">
              <ToolNumberInput
                value={visitorToLeadRate}
                onChange={setVisitorToLeadRate}
                min={0}
                max={1}
                step={0.001}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Lead to opportunity rate"
              hint="This is usually where weak handoff or poor qualification hides."
            >
              <ToolNumberInput
                value={leadToOppRate}
                onChange={setLeadToOppRate}
                min={0}
                max={1}
                step={0.001}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Improved lead to opportunity rate"
              hint="Try a realistic improvement, not a fantasy jump."
            >
              <ToolNumberInput
                value={improvedLeadToOppRate}
                onChange={setImprovedLeadToOppRate}
                min={0}
                max={1}
                step={0.001}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Opportunity to deal rate"
              hint="Keep this grounded in your current sales reality."
            >
              <ToolNumberInput
                value={oppToDealRate}
                onChange={setOppToDealRate}
                min={0}
                max={1}
                step={0.001}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Average deal value"
              hint="Use actual average deal value, not best-case revenue."
            >
              <ToolNumberInput
                value={averageDealValue}
                onChange={setAverageDealValue}
                min={0}
                step={100}
              />
            </ToolInputRow>
          </div>
        </ToolSection>

        <div className="space-y-6">
          <ToolSection eyebrow="Result intro" title="Here's the high-level picture">
            <p className="text-sm leading-6 text-[#F5F4F0]/72">
              You do not need more traffic first. You need a cleaner conversion path through the middle.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#F5F4F0]/55">
              A small improvement at the wrong bottleneck can be worth more than a much larger increase in traffic.
            </p>
          </ToolSection>

          <ToolSection eyebrow="Current output" title="What this funnel produces today">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard label="Leads / month" value={formatNumber(current.leads)} />
              <ToolStatCard label="Opportunities / month" value={formatNumber(current.opps)} />
              <ToolStatCard label="Deals / month" value={formatNumber(current.deals)} />
              <ToolStatCard
                label="Current annual revenue"
                value={formatCurrency(current.annualRevenue)}
              />
            </div>
          </ToolSection>

          <ToolSection eyebrow="After the fix" title="Mid-funnel lift forecast">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard
                label="Improved annual revenue"
                value={formatCurrency(lift.updated.annualRevenue)}
              />
              <ToolStatCard
                label="Projected annual lift"
                value={formatCurrency(lift.annualLift)}
                tone="positive"
              />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#F5F4F0]/64">
              This does not prove your traffic is bad. It shows how much revenue is being capped by structure,
              handoff, or friction inside the funnel.
            </p>
          </ToolSection>

          <ToolLeadGate
            toolSlug="funnel-roi-forecaster"
            heading="Unlock the funnel leak report"
            body="I'll send you the full breakdown, including which stage is doing the most damage and what to fix first."
            buttonLabel="Send me the full report"
            reassurance="No spam. Just the useful version."
            resultSummary={{
              inputs: base,
              improvedLeadToOppRate,
              current,
              improved: lift.updated,
              annualLift: lift.annualLift,
            }}
          />
        </div>
      </div>

      <ToolResultsCta
        heading="See how this kind of conversion gap was fixed"
        body="Want help finding the real bottleneck? These proofs show what a conversion-system rebuild actually changes, and the service behind it."
        links={[
          { label: "317 BBQ proof", href: "/proof/317-bbq" },
          { label: "Pike Medical proof", href: "/proof/pike-medical", tone: "ghost" },
          { label: "Conversion optimization service", href: "/services/conversion-optimization", tone: "ghost" },
        ]}
      />
    </ToolShell>
  );
}
