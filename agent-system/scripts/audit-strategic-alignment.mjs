#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const targetDir = args.find((arg) => !arg.startsWith("--")) || "src/app";
const candidateFiles = [];

const DIMENSIONS = [
  "systemsThinking",
  "revenueClarity",
  "proofIntegration",
  "differentiation",
  "brokenSystemFit",
  "missingSystemFit",
  "trustStageAlignment",
  "clusterCoherence",
  "proofPathCoherence",
  "operatorAccountability",
  "commercialUsefulness",
];

const STRATEGY_THRESHOLD = { proceed: 8, caution: 7 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git", "api"].includes(entry.name)) continue;
      walk(full);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts") || entry.name.endsWith(".md")) {
      candidateFiles.push(full);
    }
  }
}

function safeRead(relativePath) {
  try {
    return fs.readFileSync(path.join(process.cwd(), "agent-system", "context", relativePath), "utf8");
  } catch {
    return "";
  }
}

function parseBacktickTerms(markdown) {
  const matches = markdown.match(/`([^`]+)`/g) || [];
  return matches.map((value) => value.replace(/`/g, "").toLowerCase()).filter(Boolean);
}

const strategicContext = {
  strategicStandards: safeRead("strategic_standards.md"),
  positioningRules: safeRead("positioning_rules.md"),
  buyerPsychology: safeRead("buyer_psychology.md"),
  systemFoundationPath: safeRead("system_foundation_path.md"),
  strategicScorecard: safeRead("strategic_scorecard.md"),
  serviceClusters: safeRead("service_clusters.md"),
  problemServiceMapping: safeRead("problem_service_mapping.md"),
  trustLadderCtas: safeRead("trust_ladder_ctas.md"),
  pageGenerationRules: safeRead("page_generation_rules.md"),
};

const CLUSTER_TERMS = [
  ...parseBacktickTerms(strategicContext.serviceClusters),
  "revenue engineering",
  "intelligent automation",
  "custom infrastructure",
  "brand",
  "experience systems",
].filter(Boolean);

const PROOF_TERMS = [
  ...parseBacktickTerms(strategicContext.problemServiceMapping),
  "proof",
  "case study",
  "metric",
  "outcome",
  "tool",
  "problem",
  "service",
];

function countSignals(text, terms) {
  let count = 0;
  for (const term of terms) {
    if (!term) continue;
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${safe}\\b`, "g");
    count += (text.match(regex) || []).length;
  }
  return count;
}

function scoreCandidate(content) {
  const weaknesses = [];
  const strengths = [];
  const upgrades = [];

  const lowered = content.toLowerCase();
  const systemsSignals = (lowered.match(/\b(system|infrastructure|workflow|automation|crm|stack|integration)\b/g) || []).length;
  const revenueSignals = (lowered.match(/\b(revenue|pipeline|qualified|demand|conversion|attribution)\b/g) || []).length;
  const proofSignals = (lowered.match(/\b(proof|case study|result|metric|outcome|testimonial)\b/g) || []).length;
  const genericAgencySignals = (lowered.match(/\b(full-service|tailored solutions|agency|best-in-class|holistic)\b/g) || []).length;
  const brokenSystemSignals = (lowered.match(/\b(broken|fragmented|disconnected|leakage|manual drag|handoff)\b/g) || []).length;
  const missingSystemSignals = (lowered.match(/\b(foundation|starting point|first system|no system|baseline|setup)\b/g) || []).length;
  const trustStageSignals = (lowered.match(/\b(quiz|diagnostic|learn|proof|roadmap|book|contact)\b/g) || []).length;
  const operatorSignals = (lowered.match(/\b(i |jacob|owner-operator|accountable)\b/g) || []).length;
  const antiPersonaSizeSignals = (lowered.match(/\b(too small|enterprise only|not for small|minimum revenue|team size)\b/g) || []).length;
  const clusterSignals = countSignals(lowered, CLUSTER_TERMS);
  const mappingSignals = countSignals(lowered, PROOF_TERMS);

  const categoryScores = {
    systemsThinking: 10,
    revenueClarity: 10,
    proofIntegration: 10,
    differentiation: 10,
    brokenSystemFit: 10,
    missingSystemFit: 10,
    trustStageAlignment: 10,
    clusterCoherence: 10,
    proofPathCoherence: 10,
    operatorAccountability: 10,
    commercialUsefulness: 10,
  };

  if (systemsSignals < 4) {
    categoryScores.systemsThinking -= 4;
    weaknesses.push("Systems-first framing is weak or inconsistent.");
    upgrades.push("Explicitly describe system diagnosis -> build -> operating outcome.");
  } else {
    strengths.push("Systems-first language is materially present.");
  }

  if (revenueSignals < 2) {
    categoryScores.revenueClarity -= 3;
    weaknesses.push("Revenue/pipeline impact is under-specified.");
    upgrades.push("Tie value claims to pipeline, conversion, or demand outcomes.");
  } else {
    strengths.push("Commercial/revenue language supports practical value.");
  }

  if (proofSignals < 2) {
    categoryScores.proofIntegration -= 4;
    weaknesses.push("Proof linkage is thin for strategic claims.");
    upgrades.push("Add proof hooks near claims before strong asks.");
  } else {
    strengths.push("Proof signals are present and support credibility.");
  }

  if (genericAgencySignals > 1) {
    categoryScores.differentiation -= 4;
    weaknesses.push("Copy risks drifting toward generic agency framing.");
    upgrades.push("Replace generic agency terms with mechanism-level system language.");
  } else {
    strengths.push("Differentiation avoids obvious generic agency filler.");
  }

  if (brokenSystemSignals < 1) {
    categoryScores.brokenSystemFit -= 3;
    weaknesses.push("Broken-system buyer path is not clearly represented.");
    upgrades.push("Add explicit broken-system symptoms and path-to-fix framing.");
  }

  if (missingSystemSignals < 1) {
    categoryScores.missingSystemFit -= 4;
    weaknesses.push("Missing-system/foundation buyer path is underdeveloped.");
    upgrades.push("Add practical foundation-path messaging for system-starved buyers.");
  }

  if (trustStageSignals < 3) {
    categoryScores.trustStageAlignment -= 3;
    weaknesses.push("CTA trust-stage progression appears thin.");
    upgrades.push("Add clearer browse/diagnose/learn/evaluate/ready CTA progression.");
  }

  if (clusterSignals < 2) {
    categoryScores.clusterCoherence -= 4;
    weaknesses.push("Service-cluster architecture is weakly represented.");
    upgrades.push("Anchor recommendations to service clusters and system-foundation path.");
  } else if (clusterSignals < 4) {
    categoryScores.clusterCoherence -= 2;
    upgrades.push("Strengthen cluster-level mapping clarity for implementation planning.");
  } else {
    strengths.push("Service-cluster architecture signals are present.");
  }

  if (mappingSignals < 3) {
    categoryScores.proofPathCoherence -= 4;
    weaknesses.push("Problem/tool/proof/service path is not explicit enough.");
    upgrades.push("Add explicit bridges between problem diagnosis, proof, tools, and service next step.");
  } else if (mappingSignals < 6) {
    categoryScores.proofPathCoherence -= 2;
    upgrades.push("Clarify proof and next-step path with tighter problem-service mapping.");
  } else {
    strengths.push("Problem/proof/tool/service path is meaningfully connected.");
  }

  if (operatorSignals < 1) {
    categoryScores.operatorAccountability -= 3;
    weaknesses.push("Operator accountability signal is weak.");
    upgrades.push("Clarify accountable operator path and delivery ownership.");
  } else {
    strengths.push("Operator/accountability cues are present.");
  }

  if (antiPersonaSizeSignals > 0) {
    categoryScores.missingSystemFit -= 4;
    categoryScores.commercialUsefulness -= 3;
    weaknesses.push("Size-based disqualification logic conflicts with current strategic standards.");
    upgrades.push("Remove size-based qualification logic; qualify by system state and mindset.");
  }

  if (systemsSignals < 3 && revenueSignals < 2) {
    categoryScores.commercialUsefulness -= 3;
    weaknesses.push("Commercial usefulness is too abstract for implementation decisions.");
  }

  for (const key of Object.keys(categoryScores)) {
    categoryScores[key] = clamp(categoryScores[key], 2, 10);
  }

  const strategicScore = Number(
    (
      Object.values(categoryScores).reduce((sum, value) => sum + value, 0) /
      Object.values(categoryScores).length
    ).toFixed(1),
  );

  const gate =
    strategicScore >= STRATEGY_THRESHOLD.proceed
      ? "proceed"
      : strategicScore >= STRATEGY_THRESHOLD.caution
        ? "proceed_with_caution"
        : "block_and_rework";

  return {
    strategicScore,
    categoryScores,
    topStrengths: strengths.slice(0, 5),
    topWeaknesses: weaknesses.slice(0, 5),
    topUpgrades: upgrades.slice(0, 3),
    recommendedAction: gate,
    confidenceLevel: "heuristic_medium",
    positioningAlignment: categoryScores.differentiation >= 7 && categoryScores.systemsThinking >= 7 ? "aligned" : "drifting",
    buyerPathCoverage:
      categoryScores.brokenSystemFit >= 7 && categoryScores.missingSystemFit >= 7
        ? "both_supported"
        : categoryScores.brokenSystemFit >= 7
          ? "broken_system_only"
          : categoryScores.missingSystemFit >= 7
            ? "missing_system_only"
            : "insufficient",
    antiPersonaCheck: antiPersonaSizeSignals > 0 ? "failed_size_based_disqualification_detected" : "pass",
    trustStageAlignment: categoryScores.trustStageAlignment >= 7 ? "aligned" : "weak",
    clusterCoherence:
      categoryScores.clusterCoherence >= 8 ? "aligned" : categoryScores.clusterCoherence >= 7 ? "partial" : "weak",
    proofPathCoherence:
      categoryScores.proofPathCoherence >= 8
        ? "aligned"
        : categoryScores.proofPathCoherence >= 7
          ? "partial"
          : "weak",
  };
}

if (!fs.existsSync(targetDir)) {
  console.error(`Target directory not found: ${targetDir}`);
  process.exit(1);
}

walk(targetDir);

const items = candidateFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  return { file, ...scoreCandidate(content) };
});

items.sort((a, b) => a.strategicScore - b.strategicScore);

const average = Number(
  (items.reduce((sum, item) => sum + item.strategicScore, 0) / Math.max(items.length, 1)).toFixed(1),
);

const payload = {
  audit: "strategic-alignment",
  heuristic: true,
  targetDir,
  scannedPages: items.length,
  strategicScore: average,
  scoreThreshold: STRATEGY_THRESHOLD,
  recommendedAction:
    average >= STRATEGY_THRESHOLD.proceed
      ? "proceed"
      : average >= STRATEGY_THRESHOLD.caution
        ? "proceed_with_caution"
        : "block_and_rework",
  items,
};

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("Strategic Alignment Audit");
console.log(`Scanned pages: ${items.length}`);
console.log(`Average strategic score: ${average} / 10`);
console.log(`Gate: ${payload.recommendedAction}`);
console.log("");

for (const row of items.slice(0, 20)) {
  console.log(`${row.strategicScore}\t${row.file}`);
  console.log(`  - buyerPathCoverage=${row.buyerPathCoverage}, antiPersonaCheck=${row.antiPersonaCheck}`);
  console.log(`  - weaknesses=${row.topWeaknesses.join(" | ")}`);
}
