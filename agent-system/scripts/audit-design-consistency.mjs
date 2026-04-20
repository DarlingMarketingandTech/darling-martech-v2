#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const targetDir = args.find((arg) => !arg.startsWith("--")) || "src";
const codeFiles = [];
const DIMENSIONS = [
  "headingScaleConsistency",
  "spacingTokenRhythm",
  "ctaPatternConsistency",
  "cardShellConsistency",
  "sectionShellConsistency",
  "visualHierarchyConsistency",
  "repeatedWeakPatterns",
  "genericGridCardOveruse",
  "premiumBrandStructureAlignment",
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
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      codeFiles.push(full);
    }
  }
}

function audit(content) {
  const issues = [];
  const strengths = [];
  const upgrades = [];
  const headingCount = (content.match(/<h[1-4]\b/g) || []).length;
  const h1Count = (content.match(/<h1\b/g) || []).length;
  const ctaCount = (content.match(/<(Button|a|Link)\b/g) || []).length;
  const cardCount = (content.match(/<Card\b/g) || []).length;
  const sectionCount = (content.match(/<section\b/g) || []).length;
  const gridCount = (content.match(/\bgrid\b/g) || []).length;
  const spacingTokenCount = (content.match(/\b(?:p|m|gap|space-[xy])-[0-9]+/g) || []).length;

  const categoryScores = {
    headingScaleConsistency: 10,
    spacingTokenRhythm: 10,
    ctaPatternConsistency: 10,
    cardShellConsistency: 10,
    sectionShellConsistency: 10,
    visualHierarchyConsistency: 10,
    repeatedWeakPatterns: 10,
    genericGridCardOveruse: 10,
    premiumBrandStructureAlignment: 10,
  };

  if (/#000000|#fff\b|#ffffff/i.test(content)) {
    issues.push("non-system-hardcoded-color");
    categoryScores.premiumBrandStructureAlignment -= 3;
    upgrades.push("Replace non-system color literals with design token equivalents.");
  } else {
    strengths.push("No obvious hardcoded black/white color token drift.");
  }

  if (/(rounded-\[|px-\[|py-\[|m-\[|p-\[)/.test(content)) {
    issues.push("excess-arbitrary-token-usage");
    categoryScores.spacingTokenRhythm -= 2;
    categoryScores.sectionShellConsistency -= 1;
    upgrades.push("Reduce arbitrary spacing/shape tokens to restore predictable rhythm.");
  }

  if (cardCount > 10) {
    issues.push("card-overload-risk");
    categoryScores.cardShellConsistency -= 3;
    categoryScores.genericGridCardOveruse -= 3;
    upgrades.push("Collapse repetitive card shells and vary section treatments for hierarchy.");
  } else if (cardCount > 0) {
    strengths.push("Card usage appears constrained enough to support consistent shells.");
  }

  if (!/focus-visible:|focus:/.test(content) && /<Button\b|<a\b|<Link\b/.test(content)) {
    issues.push("interactive-focus-style-missing");
    categoryScores.ctaPatternConsistency -= 2;
    categoryScores.visualHierarchyConsistency -= 1;
    upgrades.push("Add consistent focus treatment across interactive elements.");
  }

  if (headingCount === 0) {
    issues.push("heading-scale-missing");
    categoryScores.headingScaleConsistency -= 4;
    categoryScores.visualHierarchyConsistency -= 2;
  } else if (h1Count > 1) {
    issues.push("multiple-h1-competition");
    categoryScores.headingScaleConsistency -= 3;
    categoryScores.visualHierarchyConsistency -= 2;
  } else {
    strengths.push("Heading structure exists and likely supports hierarchy.");
  }

  if (spacingTokenCount < 3 && sectionCount > 0) {
    issues.push("weak-spacing-token-rhythm");
    categoryScores.spacingTokenRhythm -= 3;
  }

  if (ctaCount > 5) {
    issues.push("cta-pattern-fragmentation");
    categoryScores.ctaPatternConsistency -= 3;
  } else if (ctaCount > 0) {
    strengths.push("CTA count suggests manageable consistency patterns.");
  }

  if (sectionCount > 8 && gridCount > sectionCount) {
    issues.push("repeated-section-shell-pattern");
    categoryScores.sectionShellConsistency -= 2;
    categoryScores.repeatedWeakPatterns -= 2;
    categoryScores.genericGridCardOveruse -= 2;
  } else if (sectionCount > 0) {
    strengths.push("Section shell volume appears moderate and potentially differentiated.");
  }

  if (/\b(agency|saas|template|feature-grid|service-grid)\b/i.test(content) && gridCount > 3) {
    issues.push("generic-grid-template-signals");
    categoryScores.genericGridCardOveruse -= 3;
    categoryScores.premiumBrandStructureAlignment -= 2;
    upgrades.push("Replace generic grid-template motifs with differentiated premium structure.");
  }

  for (const key of Object.keys(categoryScores)) {
    categoryScores[key] = clamp(categoryScores[key], 2, 10);
  }

  const overallRaw =
    Object.values(categoryScores).reduce((sum, value) => sum + value, 0) / Object.values(categoryScores).length;
  const overallScore = toTenScale(overallRaw);
  const confidenceSignals = [headingCount > 0, sectionCount > 0, spacingTokenCount > 0, ctaCount > 0].filter(Boolean).length;
  const confidenceLevel =
    confidenceSignals >= 4 ? "medium_high_heuristic" : confidenceSignals >= 2 ? "medium_heuristic" : "low_heuristic";

  return {
    overallScore,
    score: Math.round(overallScore * 10),
    issues,
    categoryScores,
    topWeaknesses: issues.slice(0, 5),
    topStrengths: strengths.slice(0, 4),
    topUpgrades: upgrades.slice(0, 3),
    confidenceLevel,
    recommendedAction:
      overallScore >= 8 ? "proceed" : overallScore >= 7 ? "proceed_with_caution" : "block_and_rework",
    heuristicSignals: {
      headingCount,
      h1Count,
      ctaCount,
      cardCount,
      sectionCount,
      gridCount,
      spacingTokenCount,
    },
  };
}

if (!fs.existsSync(targetDir)) {
  console.error(`Target directory not found: ${targetDir}`);
  process.exit(1);
}

walk(targetDir);

const issuesByFile = [];
for (const file of codeFiles) {
  const content = fs.readFileSync(file, "utf8");
  const evaluated = audit(content);
  if (evaluated.issues.length > 0) issuesByFile.push({ file, ...evaluated });
}

const issueCounts = issuesByFile.flatMap((item) => item.issues).reduce((acc, issue) => {
  acc[issue] = (acc[issue] || 0) + 1;
  return acc;
}, {});

const averageScore = Number(
  (
    issuesByFile.reduce((sum, item) => sum + item.overallScore, 0) /
    Math.max(issuesByFile.length, 1)
  ).toFixed(1),
);

const categoryScores = DIMENSIONS.reduce((acc, key) => {
  const total = issuesByFile.reduce((sum, item) => sum + (item.categoryScores[key] || 0), 0);
  acc[key] = Number((total / Math.max(issuesByFile.length, 1)).toFixed(1));
  return acc;
}, {});

const payload = {
  audit: "design-consistency",
  heuristic: true,
  targetDir,
  scannedFiles: codeFiles.length,
  filesWithIssues: issuesByFile.length,
  averageScore,
  overallScore: averageScore,
  categoryScores,
  issueCounts,
  topWeaknesses: Object.entries(issueCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([issue, count]) => ({ issue, count })),
  topStrengths: issuesByFile.flatMap((item) => item.topStrengths).slice(0, 10),
  topUpgrades: issuesByFile.flatMap((item) => item.topUpgrades).slice(0, 3),
  confidenceLevel: "heuristic_medium",
  recommendedAction:
    averageScore >= 8 ? "proceed" : averageScore >= 7 ? "proceed_with_caution" : "block_and_rework",
  items: issuesByFile,
};

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("Design Consistency Audit");
console.log(`Scanned files: ${codeFiles.length}`);
console.log(`Files with issues: ${issuesByFile.length}`);
console.log("");

for (const item of issuesByFile.slice(0, 40)) {
  console.log(`${item.overallScore}\t${item.file}`);
  console.log(`  - action: ${item.recommendedAction}`);
  console.log(`  - weaknesses: ${item.topWeaknesses.join(", ")}`);
  console.log(`  - upgrades: ${item.topUpgrades.join(" | ")}`);
}
console.log("");
console.log(`Average score: ${averageScore} / 10`);
console.log(`Recommended action: ${payload.recommendedAction}`);
