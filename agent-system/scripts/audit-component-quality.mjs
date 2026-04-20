#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const targetDir = args.find((arg) => !arg.startsWith("--")) || "src/components";
const exts = new Set([".tsx", ".ts", ".jsx", ".js"]);

const DIMENSIONS = [
  "singlePurposeClarity",
  "hierarchyLegibility",
  "spacingRhythm",
  "contentDensity",
  "ctaClarity",
  "reuseQuality",
  "visualConfidence",
  "accessibilityRisk",
  "persuasionUtility",
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toTenScale(score) {
  return Number(score.toFixed(1));
}

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      results.push(...walk(full));
    } else if (exts.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

function scoreFile(content) {
  const weaknesses = [];
  const strengths = [];
  const upgrades = [];
  const issueTags = [];

  const headingCount = (content.match(/<h[1-4]\b/g) || []).length;
  const h2Count = (content.match(/<h2\b/g) || []).length;
  const h3Count = (content.match(/<h3\b/g) || []).length;
  const ctaCount = (content.match(/<(Button|a|Link)\b/g) || []).length;
  const cardCount = (content.match(/<Card\b/g) || []).length;
  const sectionCount = (content.match(/<section\b/g) || []).length;
  const paragraphCount = (content.match(/<p\b/g) || []).length;
  const listCount = (content.match(/<(ul|ol)\b/g) || []).length;
  const ariaCount = (content.match(/aria-[a-z-]+=/g) || []).length;
  const focusCount = (content.match(/focus-visible:|focus:/g) || []).length;
  const spacingTokenCount = (content.match(/\b(?:p|m|gap|space-[xy])-[0-9]+/g) || []).length;
  const genericClassHits = (content.match(/\b(card|feature|service|item|tile|grid|wrapper)\b/gi) || []).length;
  const persuasionSignals = (content.match(/\b(proof|case|metric|testimonial|result|cta|book|start|diagnostic)\b/gi) || []).length;
  const likelyDense = paragraphCount > 6 && listCount === 0;
  const siblingCardOverload = cardCount >= 6;
  const competingSubheads = h2Count > 0 && h3Count > h2Count * 2;

  const categoryScores = {
    singlePurposeClarity: 10,
    hierarchyLegibility: 10,
    spacingRhythm: 10,
    contentDensity: 10,
    ctaClarity: 10,
    reuseQuality: 10,
    visualConfidence: 10,
    accessibilityRisk: 10,
    persuasionUtility: 10,
  };

  if (headingCount === 0) {
    categoryScores.singlePurposeClarity -= 3;
    categoryScores.hierarchyLegibility -= 2;
    weaknesses.push("Component intent is unclear because there is no visible heading anchor.");
    issueTags.push("missing-heading-structure");
    upgrades.push("Add one dominant heading that states the component's job in plain language.");
  } else {
    strengths.push("Component has a heading anchor that helps users orient quickly.");
  }

  if (siblingCardOverload) {
    categoryScores.contentDensity -= 3;
    categoryScores.visualConfidence -= 2;
    weaknesses.push("Too many sibling cards likely create scan fatigue and a template-grid feel.");
    issueTags.push("card-overload-sibling-risk");
    upgrades.push("Group or collapse lower-value cards and keep only highest-impact blocks above the fold.");
  }

  if (competingSubheads) {
    categoryScores.hierarchyLegibility -= 3;
    weaknesses.push("Heading levels compete, making hierarchy harder to parse at a glance.");
    issueTags.push("competing-headline-levels");
    upgrades.push("Reduce same-level heading competition so one message leads and support content follows.");
  } else if (headingCount > 0) {
    strengths.push("Heading density appears controlled enough to preserve visual hierarchy.");
  }

  if (spacingTokenCount < 4) {
    categoryScores.spacingRhythm -= 2;
    weaknesses.push("Spacing rhythm appears weak, increasing the chance of cramped visual groups.");
    issueTags.push("weak-spacing-token-signals");
    upgrades.push("Apply a tighter spacing cadence so blocks breathe and grouping feels intentional.");
  } else {
    strengths.push("Spacing token usage suggests some rhythm rather than ad hoc layout spacing.");
  }

  if (likelyDense) {
    categoryScores.contentDensity -= 3;
    weaknesses.push("Text-heavy content blocks lack relief elements, likely reducing readability.");
    issueTags.push("dense-without-relief");
    upgrades.push("Break dense copy with proof chips, bullets, or contrast panels to restore pacing.");
  } else {
    strengths.push("Content density appears reasonably balanced for scanning.");
  }

  if (ctaCount === 0) {
    categoryScores.ctaClarity -= 4;
    categoryScores.persuasionUtility -= 2;
    weaknesses.push("No clear action path is present, so the component may occupy space without driving decisions.");
    issueTags.push("missing-action-affordance");
    upgrades.push("Introduce one dominant CTA tied to the component's purpose and user next step.");
  } else if (ctaCount > 2) {
    categoryScores.ctaClarity -= 2;
    weaknesses.push("Multiple CTAs may dilute action dominance and decision momentum.");
    issueTags.push("cta-competition");
    upgrades.push("Demote secondary actions and preserve one primary CTA with visual dominance.");
  } else {
    strengths.push("CTA count suggests potential for clear action hierarchy.");
  }

  if (sectionCount > 0 && genericClassHits > 12) {
    categoryScores.reuseQuality -= 2;
    categoryScores.visualConfidence -= 2;
    weaknesses.push("Pattern language appears generic, increasing risk of template feel over branded confidence.");
    issueTags.push("generic-template-feel-risk");
    upgrades.push("Strengthen component-specific framing so this reads as persuasive product UI, not a stock shell.");
  } else {
    strengths.push("Structure signals some reusable component intent beyond one-off markup.");
  }

  if (ariaCount === 0 || focusCount === 0) {
    categoryScores.accessibilityRisk -= 3;
    weaknesses.push("Accessibility cues are limited (ARIA/focus), increasing interaction risk.");
    issueTags.push("accessibility-risk-indicators");
    upgrades.push("Add explicit focus-visible and ARIA treatment for interactive controls.");
  } else {
    strengths.push("Accessibility signals are present for interactive affordances.");
  }

  if (persuasionSignals < 2) {
    categoryScores.persuasionUtility -= 3;
    weaknesses.push("Persuasion support is weak; component may present information without helping commitment.");
    issueTags.push("low-persuasion-utility");
    upgrades.push("Add proof, stakes, or outcome framing so the component contributes to conversion narrative.");
  } else {
    strengths.push("Includes at least some persuasion/proof language support.");
  }

  for (const key of Object.keys(categoryScores)) {
    categoryScores[key] = clamp(categoryScores[key], 2, 10);
  }

  const overallRaw =
    Object.values(categoryScores).reduce((sum, value) => sum + value, 0) / Object.values(categoryScores).length;
  const overallScore = toTenScale(overallRaw);
  const confidenceSignals = [
    headingCount > 0,
    ctaCount > 0,
    cardCount > 0 || sectionCount > 0,
    spacingTokenCount > 2,
  ].filter(Boolean).length;
  const confidence =
    confidenceSignals >= 4 ? "medium_high_heuristic" : confidenceSignals >= 2 ? "medium_heuristic" : "low_heuristic";

  const recommendedAction =
    overallScore >= 8 ? "proceed" : overallScore >= 7 ? "proceed_with_caution" : "block_and_rework";

  return {
    overallScore,
    categoryScores,
    topWeaknesses: weaknesses.slice(0, 4),
    topStrengths: strengths.slice(0, 4),
    topUpgrades: upgrades.slice(0, 3),
    confidence,
    recommendedAction,
    heuristicSignals: {
      headingCount,
      ctaCount,
      cardCount,
      sectionCount,
      spacingTokenCount,
      likelyDense,
      siblingCardOverload,
      competingSubheads,
    },
    issueTags,
    issues: issueTags,
    score: Math.round(overallScore * 10),
  };
}

if (!fs.existsSync(targetDir)) {
  console.error(`Target directory not found: ${targetDir}`);
  process.exit(1);
}

const files = walk(targetDir);
const report = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const evaluated = scoreFile(content);
  report.push({ file, ...evaluated });
}

report.sort((a, b) => a.overallScore - b.overallScore);
const avg = report.reduce((sum, item) => sum + item.overallScore, 0) / Math.max(report.length, 1);
const issueCounts = report.flatMap((item) => item.issueTags).reduce((acc, issue) => {
  acc[issue] = (acc[issue] || 0) + 1;
  return acc;
}, {});

const actionCounts = report.reduce((acc, row) => {
  acc[row.recommendedAction] = (acc[row.recommendedAction] || 0) + 1;
  return acc;
}, {});

const aggregateCategoryScores = DIMENSIONS.reduce((acc, key) => {
  const total = report.reduce((sum, item) => sum + (item.categoryScores[key] || 0), 0);
  acc[key] = Number((total / Math.max(report.length, 1)).toFixed(1));
  return acc;
}, {});

const topWeaknesses = Object.entries(issueCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([issue, count]) => ({ issue, count }));

const payload = {
  audit: "component-quality",
  heuristic: true,
  targetDir,
  scannedFiles: report.length,
  averageScore: Number(avg.toFixed(1)),
  overallScore: Number(avg.toFixed(1)),
  categoryScores: aggregateCategoryScores,
  issueCounts,
  topWeaknesses,
  topStrengths: report.flatMap((item) => item.topStrengths).slice(0, 8),
  topUpgrades: report.flatMap((item) => item.topUpgrades).slice(0, 3),
  confidenceLevel: "heuristic_medium",
  recommendedAction:
    avg >= 8 ? "proceed" : avg >= 7 ? "proceed_with_caution" : "block_and_rework",
  actionCounts,
  items: report,
};

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("Component Quality Audit");
console.log(`Scanned files: ${report.length}`);
console.log("");

for (const item of report.slice(0, 20)) {
  if (item.issueTags.length === 0) continue;
  console.log(`${item.overallScore}\t${item.file}`);
  console.log(`  - action: ${item.recommendedAction}`);
  console.log(`  - weaknesses: ${item.topWeaknesses.join(" | ")}`);
  console.log(`  - upgrades: ${item.topUpgrades.join(" | ")}`);
}

console.log("");
console.log(`Average score: ${avg.toFixed(1)} / 10`);
console.log(`Recommended action: ${payload.recommendedAction}`);
