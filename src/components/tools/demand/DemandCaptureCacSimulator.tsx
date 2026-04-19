"use client";

import { useMemo, useState } from "react";
import { computeDemandCapture } from "@/lib/tools/formulas";
import { classifyLtvToCac, DEMAND_DEFAULTS } from "@/data/tools/demand-benchmarks";
import {
  formatCurrency,
  formatMultiplier,
  formatNumber,
} from "@/lib/tools/tool-formatters";
import { ToolShell } from "@/components/tools/shared/ToolShell";
import { ToolSection } from "@/components/tools/shared/ToolSection";
import { ToolInputRow } from "@/components/tools/shared/ToolInputRow";
import { ToolNumberInput } from "@/components/tools/shared/ToolNumberInput";
import { ToolStatCard } from "@/components/tools/shared/ToolStatCard";
import { ToolLeadGate } from "@/components/tools/shared/ToolLeadGate";
import { ToolResultsCta } from "@/components/tools/shared/ToolResultsCta";

export function DemandCaptureCacSimulator() {
  const [monthlySpend, setMonthlySpend] = useState(DEMAND_DEFAULTS.monthlySpend);
  const [cpc, setCpc] = useState(DEMAND_DEFAULTS.cpc);
  const [clickToLeadRate, setClickToLeadRate] = useState(DEMAND_DEFAULTS.clickToLeadRate);
  const [leadToCustomerRate, setLeadToCustomerRate] = useState(DEMAND_DEFAULTS.leadToCustomerRate);
  const [averageLtv, setAverageLtv] = useState(DEMAND_DEFAULTS.averageLtv);

  const inputs = useMemo(
    () => ({
      monthlySpend,
      cpc,
      clickToLeadRate,
      leadToCustomerRate,
      averageLtv,
    }),
    [monthlySpend, cpc, clickToLeadRate, leadToCustomerRate, averageLtv]
  );

  const result = useMemo(() => computeDemandCapture(inputs), [inputs]);
  const classification = useMemo(() => classifyLtvToCac(result.ltvToCac), [result.ltvToCac]);

  const ratioTone: "positive" | "warning" | "default" =
    classification.band === "healthy" || classification.band === "leveraged"
      ? "positive"
      : classification.band === "unhealthy"
        ? "warning"
        : "default";

  return (
    <ToolShell
      eyebrow="Demand efficiency simulator"
      title="See whether paid demand is actually working"
      description="This tool shows whether your spend is producing healthy customer acquisition cost and enough downstream value to justify the channel."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ToolSection eyebrow="Inputs" title="Current paid program">
          <div className="space-y-5">
            <ToolInputRow label="Monthly ad spend" hint="Use the real monthly number, not a target.">
              <ToolNumberInput value={monthlySpend} onChange={setMonthlySpend} min={0} step={100} />
            </ToolInputRow>
            <ToolInputRow label="Average cost per click" hint="Use current blended CPC if possible.">
              <ToolNumberInput value={cpc} onChange={setCpc} min={0} step={0.1} />
            </ToolInputRow>
            <ToolInputRow label="Click to lead rate" hint="This is where weak landing pages usually show up.">
              <ToolNumberInput
                value={clickToLeadRate}
                onChange={setClickToLeadRate}
                min={0}
                max={1}
                step={0.001}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Lead to customer rate"
              hint="This is where poor qualification and follow-up usually show up."
            >
              <ToolNumberInput
                value={leadToCustomerRate}
                onChange={setLeadToCustomerRate}
                min={0}
                max={1}
                step={0.001}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Average customer lifetime value"
              hint="Use real value, not optimistic projection."
            >
              <ToolNumberInput value={averageLtv} onChange={setAverageLtv} min={0} step={100} />
            </ToolInputRow>
          </div>
        </ToolSection>

        <div className="space-y-6">
          <ToolSection eyebrow="Result intro" title="This is the surface-level result">
            <p className="text-sm leading-6 text-[#F5F4F0]/72">
              If CAC looks unstable here, the problem is often not the ads alone. It is usually the system after the click.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#F5F4F0]/55">
              You can buy attention all day and still lose money if the handoff is weak.
            </p>
          </ToolSection>

          <ToolSection eyebrow="Output" title="Unit economics at current spend">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard label="Estimated clicks" value={formatNumber(result.clicks)} />
              <ToolStatCard label="Estimated leads" value={formatNumber(result.leads)} />
              <ToolStatCard label="Estimated customers" value={formatNumber(result.customers)} />
              <ToolStatCard
                label="Estimated CAC"
                value={formatCurrency(result.cac)}
                tone={ratioTone === "positive" ? "default" : ratioTone}
              />
              <ToolStatCard
                label="LTV to CAC ratio"
                value={formatMultiplier(result.ltvToCac)}
                tone={ratioTone}
                helper={classification.label}
              />
              <ToolStatCard
                label="Gross contribution"
                value={formatCurrency(result.grossValueMinusSpend)}
                helper="Monthly LTV value minus paid spend."
                tone={result.grossValueMinusSpend >= 0 ? "positive" : "warning"}
              />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#F5F4F0]/64">
              A healthy result here means demand capture is working. A bad result usually means the issue is one
              layer deeper than the channel.
            </p>
          </ToolSection>

          <ToolLeadGate
            toolSlug="demand-capture-cac-simulator"
            heading="Unlock the CAC breakdown"
            body="I'll send the full version, including spend efficiency, LTV:CAC interpretation, and the most likely next system to fix."
            buttonLabel="Send me the full breakdown"
            reassurance="No spam. No sales sequence. Just the useful analysis."
            resultSummary={{
              inputs,
              result,
              classification,
            }}
          />
        </div>
      </div>

      <ToolResultsCta
        heading="See proof that fixed the system after the click"
        body="Need a cleaner demand capture system? These engagements show how the post-click system was rebuilt to actually convert paid attention."
        links={[
          { label: "Graston Technique proof", href: "/proof/graston-technique" },
          { label: "Russell Painting proof", href: "/proof/russell-painting", tone: "ghost" },
          { label: "Paid media service", href: "/services/paid-media-management", tone: "ghost" },
        ]}
      />
    </ToolShell>
  );
}
