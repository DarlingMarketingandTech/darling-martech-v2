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
  const weights: Record<string, number> = {};
  for (const r of tool.results) {
    weights[r.problemCluster] = 0;
  }

  const leakMap: Record<string, string> = {
    strategy: "no-strategy-owner",
    website: "site-not-converting",
    systems: "disconnected-systems",
    visibility: "not-visible-enough",
    attribution: "pipeline-not-predictable",
    brand: "brand-system-broken",
  };

  const leak = answers.leak as string | undefined;
  if (leak && leakMap[leak]) {
    weights[leakMap[leak]] += 6;
  }

  const brandConsistency = answers.brandConsistency as string | undefined;
  if (brandConsistency === "weak") weights["brand-system-broken"] += 4;
  else if (brandConsistency === "mixed") weights["brand-system-broken"] += 2;

  const leadershipOwnership = answers.leadershipOwnership as string | undefined;
  if (leadershipOwnership === "none") weights["no-strategy-owner"] += 3;
  else if (leadershipOwnership === "split") weights["no-strategy-owner"] += 2;

  const siteTrustFirstSeconds = answers.siteTrustFirstSeconds as string | undefined;
  if (siteTrustFirstSeconds === "low") weights["site-not-converting"] += 3;
  else if (siteTrustFirstSeconds === "ok") weights["site-not-converting"] += 1;

  const manualFollowUp = answers.manualFollowUp as string | undefined;
  if (manualFollowUp === "mostly") weights["disconnected-systems"] += 3;
  else if (manualFollowUp === "mixed") weights["disconnected-systems"] += 1;

  const localSearchPresence = answers.localSearchPresence as string | undefined;
  if (localSearchPresence === "weak") weights["not-visible-enough"] += 3;
  else if (localSearchPresence === "mixed") weights["not-visible-enough"] += 1;

  const channelContributionConfidence = answers.channelContributionConfidence as string | undefined;
  if (channelContributionConfidence === "low") weights["pipeline-not-predictable"] += 3;
  else if (channelContributionConfidence === "mixed") weights["pipeline-not-predictable"] += 1;

  let winnerCluster = tool.results[0]?.problemCluster ?? "no-strategy-owner";
  let max = -1;
  for (const r of tool.results) {
    const score = weights[r.problemCluster] ?? 0;
    if (score > max) {
      max = score;
      winnerCluster = r.problemCluster;
    }
  }

  return tool.results.find((result) => result.problemCluster === winnerCluster) ?? tool.results[0];
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
  if (!tool.questions.length) {
    return tool.results[0];
  }

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
