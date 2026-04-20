#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const targetDir = args.find((arg) => !arg.startsWith("--")) || "src/app";
const pageFiles = [];

const DIMENSIONS = [
  "systemsThinking",
  "revenueClarity",
  "proofIntegration",
  "differentiation",
  "brokenSystemFit",
  "missingSystemFit",
  "trustStageAlignment",
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
    } else if (entry.name === "page.tsx") {
      pageFiles.push(full);
    }
  }
}

function scorePage(content) {
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

  const categoryScores = {
    systemsThinking: 10,
    revenueClarity: 10,
    proofIntegration: 10,
    differentiation: 10,
    brokenSystemFit: 10,
    missingSystemFit: 10,
    trustStageAlignment: 10,
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
  };
}

if (!fs.existsSync(targetDir)) {
  console.error(`Target directory not found: ${targetDir}`);
  process.exit(1);
}

walk(targetDir);

const items = pageFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  return { file, ...scorePage(content) };
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
