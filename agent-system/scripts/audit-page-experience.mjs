#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const targetDir = args.find((arg) => !arg.startsWith("--")) || "src/app";
const pageFiles = [];
const DIMENSIONS = [
  "firstScreenClarity",
  "audienceOfferClarity",
  "ctaHierarchyDominance",
  "sectionSequencingFlow",
  "visualRhythmPacing",
  "densityVsRestraint",
  "proofCredibilityIntegration",
  "differentiationVsTemplateFeel",
  "mobileReadabilityAssumptions",
  "frictionConfusionRisk",
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toTenScale(score) {
  return Number(score.toFixed(1));
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

function auditPage(content) {
  const findings = [];
  const strengths = [];
  const upgrades = [];
  const sectionCount = (content.match(/<section\b/g) || []).length;
  const h1Count = (content.match(/<h1\b/g) || []).length;
  const h2Count = (content.match(/<h2\b/g) || []).length;
  const ctaCount = (content.match(/<(Button|a|Link)\b/g) || []).length;
  const proofSignalCount = (content.match(/\b(proof|metric|outcome|case study|testimonial|results?)\b/gi) || []).length;
  const genericSignalCount = (content.match(/\b(agency|solution|platform|experience|services?)\b/gi) || []).length;
  const heroSignalCount = (content.match(/\b(hero|headline|diagnostic|operator|problem|outcome)\b/gi) || []).length;
  const mobileSignalCount = (content.match(/\b(sm:|md:|lg:|xl:|mobile)\b/g) || []).length;
  const cardCount = (content.match(/<Card\b/g) || []).length;
  const paragraphCount = (content.match(/<p\b/g) || []).length;

  const categoryScores = {
    firstScreenClarity: 10,
    audienceOfferClarity: 10,
    ctaHierarchyDominance: 10,
    sectionSequencingFlow: 10,
    visualRhythmPacing: 10,
    densityVsRestraint: 10,
    proofCredibilityIntegration: 10,
    differentiationVsTemplateFeel: 10,
    mobileReadabilityAssumptions: 10,
    frictionConfusionRisk: 10,
  };

  if (h1Count === 0 || heroSignalCount < 2) {
    categoryScores.firstScreenClarity -= 4;
    findings.push("first-screen-clarity-risk");
    upgrades.push("Rewrite first-screen headline/subhead so value is legible in under 3 seconds.");
  } else {
    strengths.push("First-screen content includes explicit orientation cues.");
  }

  if (!/\b(for|help|solve|fix|diagnostic|growth|pipeline)\b/i.test(content)) {
    categoryScores.audienceOfferClarity -= 3;
    findings.push("audience-offer-clarity-risk");
    upgrades.push("State target audience and exact offer outcome near the top of the page.");
  } else {
    strengths.push("Audience/offer language appears present in the copy.");
  }

  if (ctaCount === 0) {
    categoryScores.ctaHierarchyDominance -= 4;
    findings.push("missing-cta-architecture");
    upgrades.push("Add a single dominant CTA path for the primary journey stage.");
  } else if (ctaCount > 6) {
    categoryScores.ctaHierarchyDominance -= 3;
    findings.push("cta-dominance-diluted");
    upgrades.push("Reduce CTA noise and preserve one dominant action per major section cluster.");
  } else {
    strengths.push("CTA volume likely allows a dominant action path.");
  }

  if (sectionCount < 4) {
    categoryScores.sectionSequencingFlow -= 3;
    findings.push("thin-page-structure");
    upgrades.push("Expand section sequence to move from context to proof to action with clear transitions.");
  } else if (sectionCount > 12) {
    categoryScores.sectionSequencingFlow -= 3;
    categoryScores.visualRhythmPacing -= 2;
    findings.push("possible-section-overload");
    upgrades.push("Consolidate repetitive sections to tighten narrative flow and reduce scroll fatigue.");
  } else {
    strengths.push("Section count is within a range that can support guided storytelling.");
  }

  if (h2Count > sectionCount + 2) {
    categoryScores.visualRhythmPacing -= 3;
    findings.push("headline-competition");
    upgrades.push("Reduce competing section headers and increase hierarchy contrast.");
  }

  if (cardCount >= 18) {
    categoryScores.densityVsRestraint -= 3;
    findings.push("brochure-page-structure-risk");
    upgrades.push("Cut decorative card repetition and retain only decision-helpful blocks.");
  }

  if (paragraphCount > 30 && sectionCount <= 6) {
    categoryScores.densityVsRestraint -= 2;
    categoryScores.frictionConfusionRisk -= 1;
    findings.push("dense-blocks-without-relief");
    upgrades.push("Introduce rhythm breaks (proof, CTA, hierarchy shifts) to avoid dense copy runs.");
  }

  if (proofSignalCount < 3) {
    categoryScores.proofCredibilityIntegration -= 4;
    findings.push("weak-proof-presence");
    upgrades.push("Integrate proof moments earlier to support claims before asking for action.");
  } else {
    strengths.push("Proof signals are present and likely support credibility.");
  }

  if (genericSignalCount > 12) {
    categoryScores.differentiationVsTemplateFeel -= 3;
    findings.push("generic-saas-template-feel-risk");
    upgrades.push("Replace generic section language with differentiated point-of-view and sharper claims.");
  } else {
    strengths.push("Language appears somewhat differentiated from generic agency templates.");
  }

  if (mobileSignalCount < 4) {
    categoryScores.mobileReadabilityAssumptions -= 3;
    findings.push("mobile-readability-risk");
    upgrades.push("Add explicit mobile-first constraints for spacing, text width, and CTA stacking.");
  } else {
    strengths.push("Includes responsive utility signals, improving mobile confidence.");
  }

  if (proofSignalCount === 0 && ctaCount > 0) {
    categoryScores.frictionConfusionRisk -= 3;
    findings.push("ask-without-proof-friction");
    upgrades.push("Place proof before strong asks to reduce trust friction.");
  }

  for (const key of Object.keys(categoryScores)) {
    categoryScores[key] = clamp(categoryScores[key], 2, 10);
  }

  const overallRaw =
    Object.values(categoryScores).reduce((sum, value) => sum + value, 0) / Object.values(categoryScores).length;
  const overallScore = toTenScale(overallRaw);
  const recommendedAction =
    overallScore >= 8 ? "proceed" : overallScore >= 7 ? "proceed_with_caution" : "block_and_rework";
  const confidenceSignals = [h1Count > 0, sectionCount > 0, ctaCount > 0, proofSignalCount > 0].filter(Boolean).length;
  const confidenceLevel =
    confidenceSignals >= 4 ? "medium_high_heuristic" : confidenceSignals >= 2 ? "medium_heuristic" : "low_heuristic";

  return {
    overallScore,
    score: Math.round(overallScore * 10),
    findings,
    issueTags: findings,
    topWeaknesses: findings.slice(0, 5),
    topStrengths: strengths.slice(0, 5),
    topUpgrades: upgrades.slice(0, 3),
    categoryScores,
    confidenceLevel,
    recommendedAction,
    sectionCount,
    h2Count,
    ctaCount,
    heuristicSignals: {
      sectionCount,
      h1Count,
      h2Count,
      ctaCount,
      proofSignalCount,
      cardCount,
      genericSignalCount,
      mobileSignalCount,
    },
  };
}

if (!fs.existsSync(targetDir)) {
  console.error(`Target directory not found: ${targetDir}`);
  process.exit(1);
}

walk(targetDir);

const results = pageFiles.map((file) => {
  const content = fs.readFileSync(file, "utf8");
  return { file, ...auditPage(content) };
});

results.sort((a, b) => a.overallScore - b.overallScore);
const avg = results.reduce((sum, row) => sum + row.overallScore, 0) / Math.max(1, results.length);
const findingCounts = results.flatMap((row) => row.findings).reduce((acc, finding) => {
  acc[finding] = (acc[finding] || 0) + 1;
  return acc;
}, {});

const categoryScores = DIMENSIONS.reduce((acc, key) => {
  const total = results.reduce((sum, item) => sum + (item.categoryScores[key] || 0), 0);
  acc[key] = Number((total / Math.max(results.length, 1)).toFixed(1));
  return acc;
}, {});

const actionCounts = results.reduce((acc, row) => {
  acc[row.recommendedAction] = (acc[row.recommendedAction] || 0) + 1;
  return acc;
}, {});

const payload = {
  audit: "page-experience",
  heuristic: true,
  targetDir,
  scannedPages: results.length,
  averageScore: Number(avg.toFixed(1)),
  overallScore: Number(avg.toFixed(1)),
  categoryScores,
  findingCounts,
  topWeaknesses: Object.entries(findingCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([issue, count]) => ({ issue, count })),
  topStrengths: results.flatMap((item) => item.topStrengths).slice(0, 10),
  topUpgrades: results.flatMap((item) => item.topUpgrades).slice(0, 3),
  confidenceLevel: "heuristic_medium",
  recommendedAction: avg >= 8 ? "proceed" : avg >= 7 ? "proceed_with_caution" : "block_and_rework",
  actionCounts,
  items: results,
};

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("Page Experience Audit");
console.log(`Scanned pages: ${results.length}`);
console.log("");

for (const row of results) {
  if (row.findings.length === 0) continue;
  console.log(`${row.overallScore}\t${row.file}`);
  console.log(`  - sections=${row.sectionCount}, h2=${row.h2Count}, cta=${row.ctaCount}`);
  console.log(`  - action=${row.recommendedAction}`);
  console.log(`  - weaknesses=${row.topWeaknesses.join(", ")}`);
  console.log(`  - upgrades=${row.topUpgrades.join(" | ")}`);
}

console.log("");
console.log(`Average score: ${avg.toFixed(1)} / 10`);
console.log(`Recommended action: ${payload.recommendedAction}`);
