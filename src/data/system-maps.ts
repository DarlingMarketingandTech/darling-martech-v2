import type { ProblemCluster, ServiceCluster } from "@/types";
import type { SystemMapProps } from "@/components/shared/SystemMap";

type SystemMapEntry = Omit<SystemMapProps, "id" | "className">;

/**
 * Flagship problem-page system maps. Curated where the "fragmented stack →
 * one operating layer" story is the cleanest visual pay-off. Pages without
 * an entry simply render without the module, so we can expand coverage
 * incrementally without changing component contracts.
 */
export const PROBLEM_SYSTEM_MAPS: Partial<Record<ProblemCluster, SystemMapEntry>> = {
  "disconnected-systems": {
    eyebrow: "Before / after system state",
    headline: "Eight disconnected tools collapse into one connected operating layer.",
    description:
      "Most teams hit this problem because every channel has its own dashboard. The fix is not a new tool — it is fewer surfaces with shared identifiers and shared automation triggers.",
    before: {
      badge: "Before",
      countLabel: "8 disconnected surfaces",
      description:
        "Identifiers do not match across systems, lifecycle context is rebuilt by hand each week, and every report needs reconciling before it can be trusted.",
      nodes: [
        { label: "CRM (manual list)", iconKey: "crm" },
        { label: "Email tool", iconKey: "workflow" },
        { label: "Forms / capture", iconKey: "site" },
        { label: "Scheduler", iconKey: "branch" },
        { label: "Spreadsheet ops", iconKey: "database" },
        { label: "Reporting decks", iconKey: "analytics" },
        { label: "Support inbox", iconKey: "support" },
        { label: "Ad platform exports", iconKey: "analytics" },
      ],
    },
    after: {
      badge: "After",
      countLabel: "1 connected operating layer",
      description:
        "Capture, identity, lifecycle, and reporting share one source of truth. New work plugs into existing automation instead of becoming another manual handoff.",
      nodes: [
        { label: "Unified CRM", iconKey: "crm" },
        { label: "Lifecycle automation", iconKey: "workflow" },
        { label: "Identity-stitched analytics", iconKey: "analytics" },
        { label: "Operator dashboards", iconKey: "infra" },
      ],
    },
    outcome: {
      value: "95%",
      label: "Manual reconciliation effort eliminated across reporting and lifecycle work.",
    },
  },
  "pipeline-not-predictable": {
    eyebrow: "Before / after system state",
    headline: "From volatile pipeline to a predictable, instrumented signal.",
    description:
      "Predictability is a system property, not a willpower problem. The before-state has channel volume but no honest pipeline picture; the after-state ties capture, qualification, and follow-up to one shared definition of progress.",
    before: {
      badge: "Before",
      countLabel: "Disconnected revenue motions",
      description:
        "Lead volume looks healthy in isolation, but stage definitions disagree across teams, and follow-up depends on whoever has time that week.",
      nodes: [
        { label: "Channel campaigns", iconKey: "analytics" },
        { label: "Sporadic outbound", iconKey: "branch" },
        { label: "Manual qualification", iconKey: "workflow" },
        { label: "Spreadsheet pipeline", iconKey: "database" },
        { label: "Email-thread follow-up", iconKey: "support" },
      ],
    },
    after: {
      badge: "After",
      countLabel: "1 instrumented pipeline",
      description:
        "Stage definitions are written down once. Capture, scoring, and follow-up automation reinforce the same model so leadership can read the pipeline as a single picture.",
      nodes: [
        { label: "Unified capture + scoring", iconKey: "pipeline" },
        { label: "Lifecycle automation", iconKey: "workflow" },
        { label: "Attribution model", iconKey: "analytics" },
        { label: "Operator review cadence", iconKey: "infra" },
      ],
    },
    outcome: {
      value: "+212%",
      label: "Qualified lead volume on the same channel mix once the pipeline became one connected system.",
    },
  },
};

/**
 * Service-page system maps. Currently just `martech-stack-build`, which is the
 * cleanest "consolidation" story; expand alongside problem coverage as more
 * services land flagship treatments.
 */
export const SERVICE_SYSTEM_MAPS: Partial<Record<ServiceCluster, SystemMapEntry>> = {
  "martech-stack-build": {
    eyebrow: "Before / after system state",
    headline: "Replace the duct-taped stack with one platform you can actually operate.",
    description:
      "MarTech stack builds fail when they layer new tools on top of broken integrations. The intent here is to consolidate to fewer surfaces, with shared identifiers, automation, and reporting baked in.",
    before: {
      badge: "Before",
      countLabel: "Disjointed point tools",
      description:
        "Every team picked a tool that solved its slice. Nothing shares an identifier; reporting is rebuilt by hand and breaks the moment a tool is swapped.",
      nodes: [
        { label: "Forms tool", iconKey: "site" },
        { label: "Standalone CRM list", iconKey: "crm" },
        { label: "Email blasts", iconKey: "workflow" },
        { label: "Scheduling tool", iconKey: "branch" },
        { label: "Reporting spreadsheets", iconKey: "database" },
        { label: "Ad-platform reports", iconKey: "analytics" },
      ],
    },
    after: {
      badge: "After",
      countLabel: "1 operating system",
      description:
        "Capture, identity, lifecycle automation, and reporting are wired through one platform. New work extends the system instead of forking another tool.",
      nodes: [
        { label: "CRM as source of truth", iconKey: "crm" },
        { label: "Lifecycle automation", iconKey: "workflow" },
        { label: "Identity-stitched analytics", iconKey: "analytics" },
        { label: "Shared infrastructure", iconKey: "infra" },
      ],
    },
    outcome: {
      value: "8 → 1",
      label: "Manual workflows replaced by a single automated operating layer.",
    },
  },
};
