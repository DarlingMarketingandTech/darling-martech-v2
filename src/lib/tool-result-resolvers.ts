import type { Tool, ToolResult } from "@/types";

export type ToolAnswers = Record<string, string | number>;

function scoreFromKeys(answers: ToolAnswers, keys: string[]): number {
  return keys.reduce((total, key) => {
    const raw = answers[key];
    const value = typeof raw === "string" ? Number.parseInt(raw, 10) : Number(raw);
    return total + (Number.isFinite(value) ? value : 0);
  }, 0);
}

function resolveGrowthBottleneckResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  const leak = answers.leak;
  const brandConsistency = answers.brandConsistency;

  if (leak === "brand") {
    return tool.results.find((result) => result.id === "brand-cohesion-gap");
  }

  if (
    brandConsistency === "weak" &&
    leak !== "strategy" &&
    leak !== "attribution" &&
    typeof leak === "string"
  ) {
    return tool.results.find((result) => result.id === "brand-cohesion-gap");
  }

  if (leak === "strategy") return tool.results.find((result) => result.id === "strategy-gap");
  if (leak === "website") return tool.results.find((result) => result.id === "conversion-gap");
  if (leak === "systems") return tool.results.find((result) => result.id === "systems-gap");
  if (leak === "visibility") return tool.results.find((result) => result.id === "visibility-gap");
  if (leak === "attribution") return tool.results.find((result) => result.id === "attribution-gap");

  return tool.results[0];
}

function resolveMartechStackResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  const total = scoreFromKeys(answers, ["crmMaturity", "automationMaturity", "attributionMaturity", "integrationMaturity"]);

  if (total <= 4) return tool.results.find((result) => result.id === "martech-fragile");
  if (total <= 8) return tool.results.find((result) => result.id === "martech-emerging");
  return tool.results.find((result) => result.id === "martech-integrated");
}

function resolveCmoSimulatorResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  const execClarity = answers.execClarity;
  const programLoad = answers.programLoad;
  const evidenceCadence = answers.evidenceCadence;
  const killSwitch = answers.killSwitch;

  if (killSwitch === "runs_undead" || programLoad === "five_plus") {
    return tool.results.find((result) => result.id === "cmo-portfolio-debt");
  }

  if (execClarity === "split" || evidenceCadence === "never") {
    return tool.results.find((result) => result.id === "cmo-measurement-gap");
  }

  return tool.results.find((result) => result.id === "cmo-operating-rhythm");
}

function resolveGeoReadinessResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  const total = scoreFromKeys(answers, ["geoNap", "geoReviews", "geoProof", "geoStructured"]);

  if (total <= 4) return tool.results.find((result) => result.id === "geo-invisible");
  if (total <= 8) return tool.results.find((result) => result.id === "geo-building");
  return tool.results.find((result) => result.id === "geo-ready");
}

function resolveAttributionSnapshotResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  const definitionOwner = answers.definitionOwner;
  const crmCampaignField = answers.crmCampaignField;
  const channelStoryConflict = answers.channelStoryConflict;
  const budgetDecisionSource = answers.budgetDecisionSource;

  if (channelStoryConflict === "always" || definitionOwner === "nobody") {
    return tool.results.find((result) => result.id === "attr-definition-chaos");
  }

  if (budgetDecisionSource === "last_click_only" || crmCampaignField === "messy") {
    return tool.results.find((result) => result.id === "attr-last-click-trap");
  }

  return tool.results.find((result) => result.id === "attr-model-ready");
}

function resolveCmoRoadmapResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  const runway = answers.runway;
  const dominantBlocker = answers.dominantBlocker;
  const instrumentationLevel = answers.instrumentationLevel;
  const northStarClarity = answers.northStarClarity;

  if (runway === "tight" || dominantBlocker === "team_bandwidth") {
    return tool.results.find((result) => result.id === "roadmap-stabilize");
  }

  if (dominantBlocker === "pipeline" && instrumentationLevel === "none") {
    return tool.results.find((result) => result.id === "roadmap-systems-wave");
  }

  if (
    (northStarClarity === "absent" || northStarClarity === "fuzzy") &&
    instrumentationLevel === "none"
  ) {
    return tool.results.find((result) => result.id === "roadmap-systems-wave");
  }

  return tool.results.find((result) => result.id === "roadmap-velocity-sprint");
}

export function resolveToolResult(tool: Tool, answers: ToolAnswers): ToolResult | undefined {
  if (!tool.results.length) {
    return undefined;
  }

  switch (tool.slug) {
    case "growth-bottleneck-quiz":
      return resolveGrowthBottleneckResult(tool, answers);
    case "martech-stack-grader":
      return resolveMartechStackResult(tool, answers);
    case "cmo-simulator":
      return resolveCmoSimulatorResult(tool, answers);
    case "geo-readiness-auditor":
      return resolveGeoReadinessResult(tool, answers);
    case "attribution-snapshot":
      return resolveAttributionSnapshotResult(tool, answers);
    case "cmo-roadmap-generator":
      return resolveCmoRoadmapResult(tool, answers);
    default:
      return tool.results[0];
  }
}
