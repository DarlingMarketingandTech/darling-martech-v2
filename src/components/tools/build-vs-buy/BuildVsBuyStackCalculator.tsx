"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_MONTHLY_RETAINER,
  DEFAULT_SEVERANCE_MONTHS,
  OVERHEAD_MULTIPLIER,
  ROLE_BENCHMARKS,
  type RoleBenchmarkKey,
} from "@/data/tools/build-vs-buy-benchmarks";
import { computeBuildVsBuy } from "@/lib/tools/formulas";
import { formatCurrency } from "@/lib/tools/tool-formatters";
import { ToolShell } from "@/components/tools/shared/ToolShell";
import { ToolSection } from "@/components/tools/shared/ToolSection";
import { ToolInputRow } from "@/components/tools/shared/ToolInputRow";
import { ToolNumberInput } from "@/components/tools/shared/ToolNumberInput";
import { ToolStatCard } from "@/components/tools/shared/ToolStatCard";
import { ToolLeadGate } from "@/components/tools/shared/ToolLeadGate";
import { ToolResultsCta } from "@/components/tools/shared/ToolResultsCta";

const ROLE_KEYS = Object.keys(ROLE_BENCHMARKS) as RoleBenchmarkKey[];

export function BuildVsBuyStackCalculator() {
  const [selectedRoles, setSelectedRoles] = useState<RoleBenchmarkKey[]>([
    "senior_dev",
    "growth_marketer",
  ]);
  const [retainer, setRetainer] = useState(DEFAULT_MONTHLY_RETAINER);
  const [severanceMonths, setSeveranceMonths] = useState(DEFAULT_SEVERANCE_MONTHS);
  const [equityCost, setEquityCost] = useState(0);

  const result = useMemo(() => {
    let roleCostTotal = 0;
    let recruitingCostTotal = 0;

    for (const key of selectedRoles) {
      const role = ROLE_BENCHMARKS[key];
      roleCostTotal += role.base;
      recruitingCostTotal += role.base * role.recruitingPercent;
    }

    const severanceCost = (roleCostTotal / 12) * severanceMonths;

    return computeBuildVsBuy(
      roleCostTotal,
      recruitingCostTotal,
      OVERHEAD_MULTIPLIER,
      retainer,
      severanceCost,
      equityCost
    );
  }, [selectedRoles, retainer, severanceMonths, equityCost]);

  function toggleRole(key: RoleBenchmarkKey) {
    setSelectedRoles((previous) =>
      previous.includes(key) ? previous.filter((role) => role !== key) : [...previous, key]
    );
  }

  const savingsTone: "positive" | "warning" | "default" =
    result.annualSavings > 0 ? "positive" : result.annualSavings < 0 ? "warning" : "default";

  return (
    <ToolShell
      eyebrow="Founder calculator"
      title="See what it really costs to build this team in-house"
      description="This tool compares internal hiring cost, recruiting cost, overhead, and optional severance/equity drag against a partner model built around one accountable operator."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ToolSection eyebrow="In-house plan" title="Team roles to hire">
          <p className="mb-4 text-sm leading-6 text-[#F5F4F0]/55">
            Select the roles you believe you need in-house.
          </p>
          <div className="space-y-3">
            {ROLE_KEYS.map((key) => {
              const role = ROLE_BENCHMARKS[key];
              const checked = selectedRoles.includes(key);
              return (
                <label
                  key={key}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    checked
                      ? "border-[#F05A28] bg-[#F05A28]/10 text-[#F5F4F0]"
                      : "border-white/10 bg-[#101014] text-[#F5F4F0]/72 hover:border-white/25"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-medium text-[#F5F4F0]">{role.label}</span>
                    <span className="text-xs text-[#F5F4F0]/55">
                      Base {formatCurrency(role.base)} · +{Math.round(role.recruitingPercent * 100)}% recruiting
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRole(key)}
                    className="h-4 w-4 accent-[#F05A28]"
                  />
                </label>
              );
            })}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ToolInputRow
              label="Monthly partner cost"
              hint="Use the realistic monthly investment range you want to compare."
            >
              <ToolNumberInput value={retainer} onChange={setRetainer} min={0} step={500} />
            </ToolInputRow>
            <ToolInputRow
              label="Severance assumption"
              hint="Keep this realistic. Hiring risk is part of the model."
            >
              <ToolNumberInput value={severanceMonths} onChange={setSeveranceMonths} min={0} step={1} />
            </ToolInputRow>
            <ToolInputRow
              label="Estimated annualized equity cost"
              hint="Optional, but useful if senior hires would likely require equity."
              className="md:col-span-2"
            >
              <ToolNumberInput value={equityCost} onChange={setEquityCost} min={0} step={500} />
            </ToolInputRow>
          </div>
        </ToolSection>

        <div className="space-y-6">
          <ToolSection eyebrow="Result intro" title="Here is the headline difference">
            <p className="text-sm leading-6 text-[#F5F4F0]/72">
              The obvious salary cost is usually not the real number. The real number includes recruiting drag, overhead,
              coordination cost, and execution risk.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#F5F4F0]/55">
              The team you think you need is often much more expensive than the system you actually need.
            </p>
          </ToolSection>

          <ToolSection eyebrow="Output" title="Annual comparison">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard
                label="Estimated in-house annual cost"
                value={formatCurrency(result.totalInternal)}
                helper="Base + overhead + recruiting + severance + equity."
              />
              <ToolStatCard
                label="Estimated partner annual cost"
                value={formatCurrency(result.totalAgency)}
                helper="Retainer × 12."
              />
              <ToolStatCard
                label="Estimated annual difference"
                value={formatCurrency(Math.abs(result.annualSavings))}
                tone={savingsTone}
                helper={
                  result.annualSavings > 0
                    ? "Partner model costs less than the in-house plan."
                    : result.annualSavings < 0
                      ? "In-house plan costs less at this spec."
                      : "Even at this spec."
                }
              />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#F5F4F0]/64">
              This is not an argument against hiring. It is a way to compare the true cost of building the function
              internally versus structuring it differently.
            </p>
          </ToolSection>

          <ToolLeadGate
            toolSlug="build-vs-buy-stack-calculator"
            heading="Get the board-ready forecast"
            body="I'll send the fuller version so you can use it in an actual internal budget discussion."
            buttonLabel="Send me the full forecast"
            reassurance="No spam. Just the forecast and supporting assumptions."
            resultSummary={{
              inputs: { selectedRoles, retainer, severanceMonths, equityCost },
              result,
            }}
          />
        </div>
      </div>

      <ToolResultsCta
        heading="See proof of what one accountable operator model can actually deliver"
        body="Need help deciding what should be built internally and what should not? These engagements show what the operator-led model produced."
        links={[
          { label: "Graston Technique proof", href: "/proof/graston-technique" },
          { label: "See similar proof", href: "/proof/clinical-compass", tone: "ghost" },
          { label: "Fractional CMO service", href: "/services/fractional-cmo", tone: "ghost" },
        ]}
      />
    </ToolShell>
  );
}
