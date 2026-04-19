"use client";

import { useMemo, useState } from "react";
import { computeFragmentationScore } from "@/lib/tools/validation";
import type { FragmentationInputs } from "@/types/tools";
import { ToolShell } from "@/components/tools/shared/ToolShell";
import { ToolSection } from "@/components/tools/shared/ToolSection";
import { ToolInputRow } from "@/components/tools/shared/ToolInputRow";
import { ToolNumberInput } from "@/components/tools/shared/ToolNumberInput";
import { ToolStatCard } from "@/components/tools/shared/ToolStatCard";
import { ToolLeadGate } from "@/components/tools/shared/ToolLeadGate";
import { ToolResultsCta } from "@/components/tools/shared/ToolResultsCta";

const CRM_OPTIONS = [
  { value: "hubspot", label: "HubSpot" },
  { value: "salesforce", label: "Salesforce" },
  { value: "twenty", label: "Twenty" },
  { value: "attio", label: "Attio" },
  { value: "pipedrive", label: "Pipedrive" },
  { value: "zoho", label: "Zoho" },
  { value: "other", label: "Other" },
];

const BOOKING_OPTIONS = [
  { value: "cal", label: "Cal.com" },
  { value: "calendly", label: "Calendly" },
  { value: "chili_piper", label: "Chili Piper" },
  { value: "savvycal", label: "SavvyCal" },
  { value: "native_form", label: "Native form / contact" },
  { value: "other", label: "Other" },
];

const ANALYTICS_OPTIONS = [
  { value: "ga4", label: "Google Analytics 4" },
  { value: "plausible", label: "Plausible" },
  { value: "posthog", label: "PostHog" },
  { value: "amplitude", label: "Amplitude" },
  { value: "mixpanel", label: "Mixpanel" },
  { value: "vercel", label: "Vercel Analytics" },
];

const ADS_OPTIONS = [
  { value: "google", label: "Google Ads" },
  { value: "meta", label: "Meta" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "microsoft", label: "Microsoft Ads" },
  { value: "youtube", label: "YouTube" },
];

const AUTOMATION_OPTIONS = [
  { value: "n8n", label: "n8n" },
  { value: "zapier", label: "Zapier" },
  { value: "make", label: "Make" },
  { value: "hubspot_workflows", label: "HubSpot Workflows" },
  { value: "native_crm", label: "Native CRM workflows" },
  { value: "custom", label: "Custom code / API" },
];

const REPORTING_OPTIONS = [
  { value: "looker", label: "Looker / Looker Studio" },
  { value: "hex", label: "Hex" },
  { value: "sheets", label: "Spreadsheet reviews" },
  { value: "dashboard", label: "CRM-native dashboards" },
  { value: "custom", label: "Custom data layer / warehouse" },
];

interface CheckboxGroupProps {
  values: string[];
  onChange: (next: string[]) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
}

function CheckboxGroup({ values, onChange, options, ariaLabel }: CheckboxGroupProps) {
  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value]);
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const checked = values.includes(option.value);
        return (
          <label
            key={option.value}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors ${
              checked
                ? "border-[#F05A28] bg-[#F05A28]/10 text-[#F5F4F0]"
                : "border-white/10 bg-[#101014] text-[#F5F4F0]/72 hover:border-white/25"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(option.value)}
              className="h-4 w-4 accent-[#F05A28]"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

export function MartechFragmentationScorecard() {
  const [crm, setCrm] = useState<string>("");
  const [booking, setBooking] = useState<string>("");
  const [analytics, setAnalytics] = useState<string[]>(["ga4"]);
  const [ads, setAds] = useState<string[]>(["google"]);
  const [automation, setAutomation] = useState<string[]>(["zapier"]);
  const [reporting, setReporting] = useState<string[]>([]);
  const [manualExportsPerWeek, setManualExportsPerWeek] = useState(2);
  const [duplicateEntryPoints, setDuplicateEntryPoints] = useState(1);

  const inputs: FragmentationInputs = useMemo(
    () => ({
      crm: crm || null,
      booking: booking || null,
      analytics,
      ads,
      automation,
      reporting,
      manualExportsPerWeek,
      duplicateEntryPoints,
    }),
    [crm, booking, analytics, ads, automation, reporting, manualExportsPerWeek, duplicateEntryPoints]
  );

  const result = useMemo(() => computeFragmentationScore(inputs), [inputs]);

  const tone: "positive" | "default" | "warning" =
    result.band.severity === "healthy"
      ? "positive"
      : result.band.severity === "watch"
        ? "default"
        : "warning";

  return (
    <ToolShell
      eyebrow="Stack diagnostic"
      title="See how fragmented your stack really is"
      description="This tool scores how many disconnected systems, manual workarounds, and duplicate layers are making your reporting and operations harder than they should be."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <ToolSection eyebrow="Core systems" title="What's in the stack today">
            <div className="grid gap-5 md:grid-cols-2">
              <ToolInputRow label="CRM" hint="Choose the system of record, if you have one.">
                <select
                  className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
                  value={crm}
                  onChange={(event) => setCrm(event.target.value)}
                >
                  <option value="">None / unclear</option>
                  {CRM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </ToolInputRow>

              <ToolInputRow
                label="Booking or scheduling system"
                hint="Leave blank if this is managed manually or across multiple tools."
              >
                <select
                  className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
                  value={booking}
                  onChange={(event) => setBooking(event.target.value)}
                >
                  <option value="">None / manual follow-up</option>
                  {BOOKING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </ToolInputRow>
            </div>
          </ToolSection>

          <ToolSection eyebrow="Layers" title="Tools running in each layer">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[#F5F4F0]">Analytics tools</p>
                <p className="text-xs leading-5 text-[#F5F4F0]/48">
                  Select everything in real use, not everything installed once.
                </p>
                <div className="mt-2">
                  <CheckboxGroup
                    values={analytics}
                    onChange={setAnalytics}
                    options={ANALYTICS_OPTIONS}
                    ariaLabel="Analytics tools"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F4F0]">Ad platforms</p>
                <p className="text-xs leading-5 text-[#F5F4F0]/48">
                  Include only channels currently driving meaningful activity.
                </p>
                <div className="mt-2">
                  <CheckboxGroup
                    values={ads}
                    onChange={setAds}
                    options={ADS_OPTIONS}
                    ariaLabel="Advertising channels"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F4F0]">Automation tools</p>
                <p className="text-xs leading-5 text-[#F5F4F0]/48">
                  Include Zapier, Make, n8n, native flows, and similar systems.
                </p>
                <div className="mt-2">
                  <CheckboxGroup
                    values={automation}
                    onChange={setAutomation}
                    options={AUTOMATION_OPTIONS}
                    ariaLabel="Automation tools"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F4F0]">Reporting tools</p>
                <p className="text-xs leading-5 text-[#F5F4F0]/48">
                  If reporting lives in spreadsheets, treat that as manual.
                </p>
                <div className="mt-2">
                  <CheckboxGroup
                    values={reporting}
                    onChange={setReporting}
                    options={REPORTING_OPTIONS}
                    ariaLabel="Reporting layer"
                  />
                </div>
              </div>
            </div>
          </ToolSection>

          <ToolSection eyebrow="Operational load" title="How much manual effort is in the system">
            <div className="grid gap-5 md:grid-cols-2">
              <ToolInputRow
                label="Manual exports per week"
                hint="Count recurring exports, uploads, and re-entry tasks."
              >
                <ToolNumberInput
                  value={manualExportsPerWeek}
                  onChange={setManualExportsPerWeek}
                  min={0}
                  step={1}
                />
              </ToolInputRow>
              <ToolInputRow
                label="Duplicate lead capture paths"
                hint="Count forms, inboxes, and intake paths that are not properly reconciled."
              >
                <ToolNumberInput
                  value={duplicateEntryPoints}
                  onChange={setDuplicateEntryPoints}
                  min={0}
                  step={1}
                />
              </ToolInputRow>
            </div>
          </ToolSection>
        </div>

        <div className="space-y-6">
          <ToolSection eyebrow="Result intro" title="Here is your stack score">
            <p className="text-sm leading-6 text-[#F5F4F0]/72">
              A stack problem is not about having too many tools by itself. It is about weak connections, duplicated effort,
              and no trustworthy reporting layer.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#F5F4F0]/55">
              When the stack is fragmented, every metric becomes harder to trust.
            </p>
          </ToolSection>

          <ToolSection eyebrow="Output" title="Fragmentation signal">
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolStatCard
                label="Fragmentation score"
                value={`${result.score}/100`}
                tone={tone}
              />
              <ToolStatCard label="Current risk level" value={result.band.label} tone={tone} />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#F5F4F0]/64">
              A moderate or high score usually means the business does not have one clean operating system. It has tools,
              workarounds, and reporting gaps pretending to be a system.
            </p>
          </ToolSection>

          <ToolLeadGate
            toolSlug="martech-fragmentation-scorecard"
            heading="Unlock the missing-connection breakdown"
            body="I'll send the full version, including which missing connections are most likely hurting reporting, handoff, and speed."
            buttonLabel="Show me the missing links"
            reassurance="No spam. Just the result and what it means."
            resultSummary={{ inputs, result }}
          />
        </div>
      </div>

      <ToolResultsCta
        heading="See proof that replaced disconnected tools with a real system"
        body="Need help figuring out what to consolidate first? These engagements show the architecture that replaced the patchwork."
        links={[
          { label: "Graston Growth Engine proof", href: "/proof/graston-growth-engine" },
          { label: "The Compass proof", href: "/proof/the-compass", tone: "ghost" },
          { label: "MarTech stack build service", href: "/services/martech-stack-build", tone: "ghost" },
        ]}
      />
    </ToolShell>
  );
}
