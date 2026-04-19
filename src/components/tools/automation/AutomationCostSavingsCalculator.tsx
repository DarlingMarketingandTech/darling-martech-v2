"use client";

import { useMemo, useState } from "react";
import { computeAutomationSavings } from "@/lib/tools/formulas";
import { formatCurrency, formatMonths } from "@/lib/tools/tool-formatters";
import { ToolShell } from "@/components/tools/shared/ToolShell";
import { ToolSection } from "@/components/tools/shared/ToolSection";
import { ToolInputRow } from "@/components/tools/shared/ToolInputRow";
import { ToolNumberInput } from "@/components/tools/shared/ToolNumberInput";
import { ToolStatCard } from "@/components/tools/shared/ToolStatCard";
import { ToolLeadGate } from "@/components/tools/shared/ToolLeadGate";
import { ToolResultsCta } from "@/components/tools/shared/ToolResultsCta";

export function AutomationCostSavingsCalculator() {
  const [employees, setEmployees] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(55);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(12);
  const [automatablePercent, setAutomatablePercent] = useState(0.65);
  const [implementationCost, setImplementationCost] = useState(18_000);

  const inputs = useMemo(
    () => ({
      employees,
      hourlyRate,
      manualHoursPerWeek,
      automatablePercent,
      implementationCost,
    }),
    [employees, hourlyRate, manualHoursPerWeek, automatablePercent, implementationCost]
  );

  const result = useMemo(() => computeAutomationSavings(inputs), [inputs]);

  return (
    <ToolShell
      eyebrow="Ops savings calculator"
      title="See how much manual work is costing you"
      description="This tool turns recurring manual process time into a hard annual cost so you can see whether automation is worth doing now."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ToolSection eyebrow="Inputs" title="Current manual load">
          <div className="space-y-5">
            <ToolInputRow label="Number of people involved" hint="Count everyone touching the process.">
              <ToolNumberInput value={employees} onChange={setEmployees} min={1} step={1} />
            </ToolInputRow>
            <ToolInputRow label="Average hourly cost" hint="Include realistic loaded labor cost if possible.">
              <ToolNumberInput value={hourlyRate} onChange={setHourlyRate} min={0} step={1} />
            </ToolInputRow>
            <ToolInputRow
              label="Manual hours per week"
              hint="Count copy-paste, re-entry, reporting, admin cleanup, and follow-up."
            >
              <ToolNumberInput
                value={manualHoursPerWeek}
                onChange={setManualHoursPerWeek}
                min={0}
                step={0.5}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Percent realistically automatable"
              hint="Use a real estimate, not 100%."
            >
              <ToolNumberInput
                value={automatablePercent}
                onChange={setAutomatablePercent}
                min={0}
                max={1}
                step={0.05}
              />
            </ToolInputRow>
            <ToolInputRow
              label="Estimated implementation cost"
              hint="Use the likely cost of fixing the process properly."
            >
              <ToolNumberInput
                value={implementationCost}
                onChange={setImplementationCost}
                min={0}
                step={500}
              />
            </ToolInputRow>
          </div>
        </ToolSection>

        <div className="space-y-6">
          <ToolSection eyebrow="Result intro" title="This is the visible cost">
            <p className="text-sm leading-6 text-[#F5F4F0]/72">
              The bigger issue is usually not the labor alone. It is the operating drag the manual system creates around
              speed, accuracy, and reporting.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#F5F4F0]/55">
              Manual work rarely stays small once the business grows.
            </p>
          </ToolSection>

          <ToolSection eyebrow="Output" title="Recoverable cost + payback">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard label="Weekly manual cost" value={formatCurrency(result.weeklyManualCost)} />
              <ToolStatCard label="Annual manual cost" value={formatCurrency(result.annualManualCost)} />
              <ToolStatCard
                label="Recoverable annual cost"
                value={formatCurrency(result.recoverableAnnualCost)}
                tone="positive"
              />
              <ToolStatCard
                label="Estimated payback period"
                value={formatMonths(result.paybackMonths)}
                tone={result.paybackMonths > 0 && result.paybackMonths <= 12 ? "positive" : "default"}
              />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#F5F4F0]/64">
              If the payback window is short, the real question is not whether to automate. It is whether the current
              system is already costing more than the rebuild.
            </p>
          </ToolSection>

          <ToolLeadGate
            toolSlug="automation-cost-savings-calculator"
            heading="Get the automation roadmap version"
            body="I'll send the full breakdown and the next-step framing for which tasks should be automated first."
            buttonLabel="Send me the full breakdown"
            reassurance="This is just to send the useful version."
            resultSummary={{ inputs, result }}
          />
        </div>
      </div>

      <ToolResultsCta
        heading="See how manual overhead was removed in practice"
        body="Need help deciding what should be automated first? These engagements show the operating system that replaced the manual workflow."
        links={[
          { label: "Graston Growth Engine proof", href: "/proof/graston-growth-engine" },
          {
            label: "Barbershop Command Center proof",
            href: "/proof/barbershop-command-center",
            tone: "ghost",
          },
          { label: "Automation systems service", href: "/services/automation-systems", tone: "ghost" },
        ]}
      />
    </ToolShell>
  );
}
