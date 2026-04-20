import fs from "node:fs";
import path from "node:path";
import { execSync, spawnSync } from "node:child_process";

const DESIGN_MODE_AUDITS = {
  component_upgrade: ["component"],
  page_experience_upgrade: ["page"],
  asset_system: ["consistency"],
  design_system_enforcement: ["consistency", "component"],
};

const DESIGN_THRESHOLD = {
  proceed: 8.0,
  caution: 7.0,
};

const STRATEGIC_MODE_AUDITS = {
  implementation: true,
  page_experience_upgrade: true,
  component_upgrade: true,
  asset_system: true,
  design_system_enforcement: true,
};

const STRATEGIC_THRESHOLD = {
  proceed: 8.0,
  caution: 7.0,
};

const DESIGN_MEMORY_PATH = path.join(process.cwd(), "agent-system", "memory", "design_decisions.json");

function runDesignAudit(kind) {
  const map = {
    component: ["agent-system/scripts/audit-component-quality.mjs", "src/components"],
    page: ["agent-system/scripts/audit-page-experience.mjs", "src/app"],
    consistency: ["agent-system/scripts/audit-design-consistency.mjs", "src"],
  };
  const [scriptPath, targetDir] = map[kind] || [];
  if (!scriptPath) return null;

  const result = spawnSync("node", [scriptPath, targetDir, "--json"], { encoding: "utf8" });
  if (result.status !== 0) {
    return {
      kind,
      ok: false,
      error: (result.stderr || result.stdout || "Unknown audit failure").trim(),
    };
  }

  try {
    const parsed = JSON.parse(result.stdout);
    return {
      kind,
      ok: true,
      score: Number(parsed?.overallScore ?? parsed?.averageScore ?? 0),
      recommendedAction: parsed?.recommendedAction ?? "proceed_with_caution",
      topWeaknesses: parsed?.topWeaknesses ?? [],
      topStrengths: parsed?.topStrengths ?? [],
      topUpgrades: parsed?.topUpgrades ?? [],
      confidenceLevel: parsed?.confidenceLevel ?? "heuristic_medium",
      categoryScores: parsed?.categoryScores ?? {},
      raw: parsed,
    };
  } catch (error) {
    return {
      kind,
      ok: false,
      error: `Invalid audit JSON for ${kind}: ${error?.message || "parse failure"}`,
    };
  }
}

function runStrategicAudit(mode, diffAnalysis = {}) {
  const changedFiles = Array.isArray(diffAnalysis?.changedFiles) ? diffAnalysis.changedFiles : [];
  let targetDir = "src/app";
  if (mode === "component_upgrade" && changedFiles.some((file) => file.startsWith("src/components/"))) {
    targetDir = "src/components";
  }
  if (mode === "asset_system") {
    targetDir = "src/app";
  }

  const result = spawnSync("node", ["agent-system/scripts/audit-strategic-alignment.mjs", targetDir, "--json"], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return {
      ok: false,
      error: (result.stderr || result.stdout || "Unknown strategic audit failure").trim(),
    };
  }

  try {
    const parsed = JSON.parse(result.stdout);
    const strategicScore = Number(parsed?.strategicScore ?? 0);
    return {
      ok: true,
      strategicScore,
      positioningAlignment: strategicScore >= 7 ? "aligned" : "drifting",
      buyerPathCoverage:
        parsed?.items?.some((row) => row.buyerPathCoverage === "both_supported")
          ? "both_supported"
          : parsed?.items?.some((row) => row.buyerPathCoverage === "broken_system_only")
            ? "broken_system_only"
            : parsed?.items?.some((row) => row.buyerPathCoverage === "missing_system_only")
              ? "missing_system_only"
              : "insufficient",
      antiPersonaCheck:
        parsed?.items?.some((row) => row.antiPersonaCheck?.startsWith("failed_"))
          ? "failed_size_based_disqualification_detected"
          : "pass",
      trustStageAlignment:
        parsed?.items?.some((row) => row.trustStageAlignment === "weak") ? "weak" : "aligned",
      requiredImprovements: (parsed?.items || []).flatMap((row) => row.topUpgrades || []).slice(0, 5),
      topWeaknesses: (parsed?.items || []).flatMap((row) => row.topWeaknesses || []).slice(0, 6),
      raw: parsed,
    };
  } catch (error) {
    return { ok: false, error: `Invalid strategic audit JSON: ${error?.message || "parse failure"}` };
  }
}

function normalizeWeakness(entry) {
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  if (typeof entry === "object") return entry.issue || entry.label || JSON.stringify(entry);
  return String(entry);
}

function evaluateDesignGate(mode, diffAnalysis = {}) {
  const auditsToRun = DESIGN_MODE_AUDITS[mode];
  if (!auditsToRun) return null;

  const auditResults = auditsToRun.map((kind) => runDesignAudit(kind)).filter(Boolean);
  const failedAudit = auditResults.find((result) => !result.ok);
  if (failedAudit) {
    return {
      enabled: true,
      mode,
      scoreThreshold: { proceed: DESIGN_THRESHOLD.proceed, caution: DESIGN_THRESHOLD.caution },
      scoreResult: null,
      requiredImprovements: [],
      blockReason: `Design gate could not run because ${failedAudit.kind} audit failed: ${failedAudit.error}`,
      designGate: "block_and_rework",
      auditResults,
    };
  }

  const scores = auditResults.map((result) => result.score);
  const compositeScore = Number((scores.reduce((sum, value) => sum + value, 0) / Math.max(scores.length, 1)).toFixed(1));
  const requiredImprovements = auditResults
    .flatMap((result) => result.topUpgrades.slice(0, 2))
    .filter(Boolean)
    .slice(0, 5);

  const weakestAudit = [...auditResults].sort((a, b) => a.score - b.score)[0];
  const weakestSignals = weakestAudit.topWeaknesses
    .map((entry) => normalizeWeakness(entry))
    .filter(Boolean)
    .slice(0, 2)
    .join(" / ");

  const resultLabel =
    compositeScore >= DESIGN_THRESHOLD.proceed
      ? "proceed"
      : compositeScore >= DESIGN_THRESHOLD.caution
        ? "proceed_with_caution"
        : "block_and_rework";

  const blockReason =
    resultLabel === "block_and_rework"
      ? `Blocked because ${mode} design score is ${compositeScore} and weakest area (${weakestAudit.kind}) signals: ${weakestSignals || "quality below threshold"}.`
      : null;

  const scoreResult = {
    compositeScore,
    auditScores: auditResults.map((result) => ({
      audit: result.kind,
      score: result.score,
      confidenceLevel: result.confidenceLevel,
      recommendedAction: result.recommendedAction,
    })),
  };

  const allowedAssetOnly = mode === "asset_system";
  const changedFiles = Array.isArray(diffAnalysis?.changedFiles) ? diffAnalysis.changedFiles : [];
  const nonAssetEdits = allowedAssetOnly
    ? changedFiles.filter((file) => file.startsWith("src/app/") || file.startsWith("src/components/")).length
    : 0;

  let finalGate = resultLabel;
  let finalBlockReason = blockReason;
  if (allowedAssetOnly && nonAssetEdits === 0 && finalGate === "block_and_rework" && compositeScore >= 6.5) {
    finalGate = "proceed_with_caution";
    finalBlockReason = null;
    requiredImprovements.unshift("Asset-system work may proceed, but improve consistency score before UI implementation.");
  }

  return {
    enabled: true,
    mode,
    scoreThreshold: { proceed: DESIGN_THRESHOLD.proceed, caution: DESIGN_THRESHOLD.caution },
    scoreResult,
    requiredImprovements,
    blockReason: finalBlockReason,
    designGate: finalGate,
    auditResults,
  };
}

function evaluateStrategicGate(mode, diffAnalysis = {}) {
  if (!STRATEGIC_MODE_AUDITS[mode]) return null;

  const audited = runStrategicAudit(mode, diffAnalysis);
  if (!audited.ok) {
    return {
      enabled: true,
      strategicScore: null,
      positioningAlignment: "unknown",
      buyerPathCoverage: "unknown",
      antiPersonaCheck: "unknown",
      trustStageAlignment: "unknown",
      requiredImprovements: [],
      blockReason: `Strategic gate could not run: ${audited.error}`,
      gate: "block_and_rework",
    };
  }

  let gate =
    audited.strategicScore >= STRATEGIC_THRESHOLD.proceed
      ? "proceed"
      : audited.strategicScore >= STRATEGIC_THRESHOLD.caution
        ? "proceed_with_caution"
        : "block_and_rework";

  if (audited.antiPersonaCheck !== "pass") {
    gate = "block_and_rework";
  }

  if (audited.buyerPathCoverage === "insufficient" && gate === "proceed") {
    gate = "proceed_with_caution";
  }

  const blockReason =
    gate === "block_and_rework"
      ? audited.antiPersonaCheck !== "pass"
        ? "Blocked because size-based anti-persona logic conflicts with strategic standards."
        : `Blocked because strategic score is ${audited.strategicScore} and strategic alignment is below threshold.`
      : null;

  return {
    enabled: true,
    strategicScore: audited.strategicScore,
    scoreThreshold: STRATEGIC_THRESHOLD,
    positioningAlignment: audited.positioningAlignment,
    buyerPathCoverage: audited.buyerPathCoverage,
    antiPersonaCheck: audited.antiPersonaCheck,
    trustStageAlignment: audited.trustStageAlignment,
    requiredImprovements: audited.requiredImprovements,
    blockReason,
    gate,
    topWeaknesses: audited.topWeaknesses,
    raw: audited.raw,
  };
}

function appendDesignMemory(mode, designGate, designGateResult) {
  if (!designGateResult?.enabled) return;
  const noteTargets = designGateResult.auditResults
    .flatMap((result) => result.topWeaknesses.slice(0, 1))
    .map((entry) => normalizeWeakness(entry))
    .filter(Boolean);
  if (noteTargets.length === 0) return;

  const baseline = {
    approvedPatterns: [],
    rejectedPatterns: [],
    preferredLayouts: [],
    antiPatterns: [],
    notes: [],
    lastUpdatedAt: null,
  };

  let current = baseline;
  try {
    const raw = fs.readFileSync(DESIGN_MEMORY_PATH, "utf8");
    current = { ...baseline, ...JSON.parse(raw) };
  } catch {
    current = baseline;
  }

  const note = {
    at: new Date().toISOString(),
    mode,
    gate: designGate,
    note: noteTargets.join(" | "),
  };
  current.notes = [...(Array.isArray(current.notes) ? current.notes : []), note].slice(-40);
  current.lastUpdatedAt = note.at;
  fs.writeFileSync(DESIGN_MEMORY_PATH, `${JSON.stringify(current, null, 2)}\n`);
}

function execute(command) {
  try {
    const output = execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { ok: true, output: output.trim() };
  } catch (error) {
    const stderr = error?.stderr?.toString?.() ?? error?.message ?? "Validation command failed.";
    return { ok: false, output: stderr.trim() };
  }
}

function needsChecks(validation = {}) {
  return {
    lint: Boolean(validation?.lint),
    typecheck: Boolean(validation?.typecheck),
    build: Boolean(validation?.build),
  };
}

export function runValidation({ validationProfile = {}, mode = "implementation", diffAnalysis = {} } = {}) {
  const checks = needsChecks(validationProfile);
  const results = [];
  const warnings = [];

  if (checks.lint) {
    results.push({ name: "lint", ...execute("pnpm lint") });
  }
  if (checks.typecheck) {
    results.push({ name: "typecheck", ...execute("pnpm typecheck") });
  }
  if (checks.build) {
    results.push({ name: "build", ...execute("pnpm build") });
  }

  const failures = [];
  for (const result of results) {
    if (!result.ok) failures.push(`Validation failed: ${result.name}`);
  }

  if (diffAnalysis.unexpectedFiles?.length && (mode === "surgical_fix" || mode === "audit")) {
    failures.push("Unexpected file edits detected for constrained mode.");
  }
  if (diffAnalysis.exceedsBudget) {
    failures.push("Diff exceeds configured task profile budget.");
  }
  if (diffAnalysis.blockedFiles?.length) {
    failures.push("Blocked file patterns were modified for current task profile.");
  }
  if (diffAnalysis.removedComments && (mode === "surgical_fix" || mode === "implementation")) {
    failures.push("Comment removal detected in constrained task.");
  }
  if (diffAnalysis.hasPlaceholder && (mode === "audit" || mode === "surgical_fix")) {
    failures.push("Placeholder or truncation markers detected in diff.");
  }

  const designGateResult = evaluateDesignGate(mode, diffAnalysis);
  if (designGateResult?.designGate === "block_and_rework") {
    failures.push("Design quality gate blocked completion for current mode.");
  }

  if (designGateResult?.designGate === "proceed_with_caution") {
    warnings.push("Design quality marked proceed_with_caution; improvement notes are required.");
  }

  appendDesignMemory(mode, designGateResult?.designGate, designGateResult);

  const strategicGateResult = evaluateStrategicGate(mode, diffAnalysis);
  if (strategicGateResult?.gate === "block_and_rework") {
    failures.push("Strategic quality gate blocked completion for current mode.");
  }
  if (strategicGateResult?.gate === "proceed_with_caution") {
    warnings.push("Strategic alignment marked proceed_with_caution; strategic improvements are required.");
  }

  return {
    mode,
    checksRun: results.map((r) => ({ name: r.name, ok: r.ok })),
    designGate: designGateResult?.designGate ?? "not_applicable",
    scoreThreshold: designGateResult?.scoreThreshold ?? null,
    scoreResult: designGateResult?.scoreResult ?? null,
    requiredImprovements: designGateResult?.requiredImprovements ?? [],
    blockReason: designGateResult?.blockReason ?? null,
    designAuditResults: designGateResult?.auditResults ?? [],
    strategicScore: strategicGateResult?.strategicScore ?? null,
    positioningAlignment: strategicGateResult?.positioningAlignment ?? "not_applicable",
    buyerPathCoverage: strategicGateResult?.buyerPathCoverage ?? "not_applicable",
    antiPersonaCheck: strategicGateResult?.antiPersonaCheck ?? "not_applicable",
    trustStageAlignment: strategicGateResult?.trustStageAlignment ?? "not_applicable",
    strategicGate: strategicGateResult?.gate ?? "not_applicable",
    strategicThreshold: strategicGateResult?.scoreThreshold ?? null,
    strategicRequiredImprovements: strategicGateResult?.requiredImprovements ?? [],
    strategicBlockReason: strategicGateResult?.blockReason ?? null,
    warnings,
    failureReasons: failures,
    isSafeToComplete: failures.length === 0,
    validatedAt: new Date().toISOString(),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const payload = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  process.stdout.write(JSON.stringify(runValidation(payload), null, 2));
}
