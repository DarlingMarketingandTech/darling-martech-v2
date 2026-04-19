"use client";

import { useMemo, useState } from "react";
import { computeAttributionClarity, safePercent } from "@/lib/tools/formulas";
import { classifyClarityScore } from "@/data/tools/attribution-models";
import {
  formatCurrency,
  formatPercent,
} from "@/lib/tools/tool-formatters";
import { ToolShell } from "@/components/tools/shared/ToolShell";
import { ToolSection } from "@/components/tools/shared/ToolSection";
import { ToolInputRow } from "@/components/tools/shared/ToolInputRow";
import { ToolNumberInput } from "@/components/tools/shared/ToolNumberInput";
import { ToolRangeInput } from "@/components/tools/shared/ToolRangeInput";
import { ToolStatCard } from "@/components/tools/shared/ToolStatCard";
import { ToolLeadGate } from "@/components/tools/shared/ToolLeadGate";
import { ToolResultsCta } from "@/components/tools/shared/ToolResultsCta";

export function AttributionClarityAnalyzer() {
  const [adSpend, setAdSpend] = useState(15_000);
  const [visits, setVisits] = useState(12_000);
  const [leads, setLeads] = useState(800);
  const [qualifiedLeads, setQualifiedLeads] = useState(280);
  const [opportunities, setOpportunities] = useState(95);
  const [customers, setCustomers] = useState(26);
  const [revenue, setRevenue] = useState(480_000);
  const [trackingConfidence, setTrackingConfidence] = useState(55);
  const [unattributedPercent, setUnattributedPercent] = useState(35);

  const inputs = useMemo(
    () => ({
      adSpend,
      visits,
      leads,
      qualifiedLeads,
      opportunities,
      customers,
      revenue,
      trackingConfidence,
      unattributedPercent,
    }),
    [
      adSpend,
      visits,
      leads,
      qualifiedLeads,
      opportunities,
      customers,
      revenue,
      trackingConfidence,
      unattributedPercent,
    ]
  );

  const result = useMemo(
    () =>
      computeAttributionClarity({
        leads,
        qualifiedLeads,
        opportunities,
        customers,
        revenue,
        trackingConfidence,
        unattributedPercent,
      }),
    [
      leads,
      qualifiedLeads,
      opportunities,
      customers,
      revenue,
      trackingConfidence,
      unattributedPercent,
    ]
  );

  const band = useMemo(() => classifyClarityScore(result.clarityScore), [result.clarityScore]);
  const clarityTone: "positive" | "warning" | "default" =
    band.severity === "healthy" ? "positive" : band.severity === "critical" ? "warning" : "default";

  const visitToLeadRate = useMemo(() => safePercent(leads, visits), [leads, visits]);
  const paidCac = useMemo(() => (customers > 0 ? adSpend / customers : 0), [adSpend, customers]);

  return (
    <ToolShell
      eyebrow="Attribution diagnostic"
      title="See how much of your revenue you can actually explain"
      description="This tool estimates how much of your pipeline and revenue is truly attributable versus hidden behind weak tracking confidence and unattributed activity."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ToolSection eyebrow="Inputs" title="Last period's pipeline and reporting">
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <ToolInputRow label="Monthly ad spend" hint="Include the channels you actually expect to measure.">
                <ToolNumberInput value={adSpend} onChange={setAdSpend} min={0} step={100} />
              </ToolInputRow>
              <ToolInputRow label="Monthly visits" hint="Use a recent average.">
                <ToolNumberInput value={visits} onChange={setVisits} min={0} step={100} />
              </ToolInputRow>
              <ToolInputRow
                label="Monthly leads"
                hint="Count only real inbound or sales-accepted leads, depending on your process."
              >
                <ToolNumberInput value={leads} onChange={setLeads} min={0} step={10} />
              </ToolInputRow>
              <ToolInputRow
                label="Qualified leads"
                hint="This is where weak lead quality usually becomes visible."
              >
                <ToolNumberInput value={qualifiedLeads} onChange={setQualifiedLeads} min={0} step={5} />
              </ToolInputRow>
              <ToolInputRow label="Opportunities" hint="Use the stage where sales agrees the deal is real.">
                <ToolNumberInput value={opportunities} onChange={setOpportunities} min={0} step={1} />
              </ToolInputRow>
              <ToolInputRow label="Customers won" hint="Use recent monthly average if needed.">
                <ToolNumberInput value={customers} onChange={setCustomers} min={0} step={1} />
              </ToolInputRow>
              <ToolInputRow
                label="Revenue from won deals"
                hint="Use attributed or booked revenue for the same period."
                className="md:col-span-2"
              >
                <ToolNumberInput value={revenue} onChange={setRevenue} min={0} step={1000} />
              </ToolInputRow>
            </div>

            <ToolInputRow
              label={`Tracking confidence score (${trackingConfidence}%)`}
              hint="Be honest. Most teams overestimate this."
            >
              <ToolRangeInput
                value={trackingConfidence}
                onChange={setTrackingConfidence}
                min={0}
                max={100}
                step={1}
              />
            </ToolInputRow>

            <ToolInputRow
              label={`Unattributed revenue percent (${unattributedPercent}%)`}
              hint="Estimate how much revenue currently lacks a trustworthy source path."
            >
              <ToolRangeInput
                value={unattributedPercent}
                onChange={setUnattributedPercent}
                min={0}
                max={100}
                step={1}
              />
            </ToolInputRow>
          </div>
        </ToolSection>

        <div className="space-y-6">
          <ToolSection eyebrow="Result intro" title="This is the high-level picture">
            <p className="text-sm leading-6 text-[#F5F4F0]/72">
              If your clarity score is low, the issue is not just reporting. It is decision quality.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#F5F4F0]/55">
              Bad attribution does not just hide what is working. It trains you to invest in the wrong things.
            </p>
          </ToolSection>

          <ToolSection eyebrow="Output" title="Clarity signal">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard
                label="Clarity score"
                value={`${Math.round(result.clarityScore)}/100`}
                tone={clarityTone}
                helper={band.label}
              />
              <ToolStatCard
                label="Estimated attributable revenue"
                value={formatCurrency(result.attributableRevenue)}
                helper="Period revenue with a credible source attached."
              />
              <ToolStatCard
                label="Visit → Lead rate"
                value={formatPercent(visitToLeadRate)}
                helper="Derived from monthly visits and leads."
              />
              <ToolStatCard
                label="Blended paid CAC"
                value={formatCurrency(paidCac)}
                helper="Monthly ad spend divided by customers won."
              />
              <ToolStatCard label="Lead → Qualified" value={formatPercent(result.leadToQualified)} />
              <ToolStatCard label="Qualified → Opportunity" value={formatPercent(result.qualifiedToOpp)} />
              <ToolStatCard label="Opportunity → Customer" value={formatPercent(result.oppToCustomer)} />
              <ToolStatCard
                label="Revenue per customer"
                value={formatCurrency(result.revenuePerCustomer)}
              />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#F5F4F0]/64">
              A low clarity score means you are not really running a feedback system. You are running guesses with nicer charts.
            </p>
          </ToolSection>

          <ToolLeadGate
            toolSlug="attribution-clarity-analyzer"
            heading="Unlock the attribution cleanup view"
            body="I'll send the full version, including where clarity breaks down and what to fix first."
            buttonLabel="Send me the full analysis"
            reassurance="No spam. No weird funnel. Just the useful version."
            resultSummary={{
              inputs,
              result,
              band,
              derived: { visitToLeadRate, paidCac },
            }}
          />
        </div>
      </div>

      <ToolResultsCta
        heading="See proof that improved attribution clarity and operational visibility"
        body="Need a clearer measurement system? These engagements show how attribution was rebuilt so channel decisions could finally be defended."
        links={[
          { label: "Graston Technique proof", href: "/proof/graston-technique" },
          { label: "Graston Growth Engine proof", href: "/proof/graston-growth-engine", tone: "ghost" },
          { label: "Attribution analytics service", href: "/services/attribution-analytics", tone: "ghost" },
        ]}
      />
    </ToolShell>
  );
}
