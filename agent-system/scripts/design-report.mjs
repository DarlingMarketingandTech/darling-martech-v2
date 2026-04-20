#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");

function runAudit(scriptPath, targetDir) {
  const result = spawnSync("node", [scriptPath, targetDir, "--json"], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(`Audit failed: ${scriptPath}\n${result.stderr || result.stdout}`);
  }

  return JSON.parse(result.stdout);
}

function topIssueEntries(issueCounts, limit = 3) {
  return Object.entries(issueCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([issue, count]) => ({ issue, count }));
}

function mergeCounts(...maps) {
  const merged = {};
  for (const map of maps) {
    for (const [key, count] of Object.entries(map || {})) {
      merged[key] = (merged[key] || 0) + count;
    }
  }
  return merged;
}

function actionFromScore(score) {
  if (score >= 8) return "proceed";
  if (score >= 7) return "proceed_with_caution";
  return "block_and_rework";
}

function normalizeAuditResult(label, result) {
  const score = Number(result?.overallScore ?? result?.averageScore ?? 0);
  return {
    label,
    score,
    recommendedAction: result?.recommendedAction ?? actionFromScore(score),
    confidenceLevel: result?.confidenceLevel ?? "heuristic_medium",
    categoryScores: result?.categoryScores ?? {},
    topWeaknesses: result?.topWeaknesses ?? [],
    topStrengths: result?.topStrengths ?? [],
    topUpgrades: result?.topUpgrades ?? [],
    scanSummary: {
      scannedFiles: result?.scannedFiles,
      scannedPages: result?.scannedPages,
      filesWithIssues: result?.filesWithIssues,
    },
  };
}

const component = runAudit("agent-system/scripts/audit-component-quality.mjs", "src/components");
const page = runAudit("agent-system/scripts/audit-page-experience.mjs", "src/app");
const system = runAudit("agent-system/scripts/audit-design-consistency.mjs", "src");

const improvementCounts = mergeCounts(component.issueCounts, page.findingCounts, system.issueCounts);
const topImprovements = topIssueEntries(improvementCounts, 3);
const componentNormalized = normalizeAuditResult("component", component);
const pageNormalized = normalizeAuditResult("page", page);
const consistencyNormalized = normalizeAuditResult("consistency", system);

const compositeScore = Number(
  ((componentNormalized.score + pageNormalized.score + consistencyNormalized.score) / 3).toFixed(1),
);
const gateRecommendation = actionFromScore(compositeScore);

const payload = {
  generatedAt: new Date().toISOString(),
  heuristic: true,
  summary: {
    compositeScore,
    gateRecommendation,
    componentAverageScore: componentNormalized.score,
    pageAverageScore: pageNormalized.score,
    systemAverageScore: consistencyNormalized.score,
    systemFilesWithIssues: system.filesWithIssues ?? 0,
  },
  audits: {
    component: componentNormalized,
    page: pageNormalized,
    consistency: consistencyNormalized,
  },
  componentIssues: {
    scannedFiles: component.scannedFiles,
    issueCounts: component.issueCounts,
    worstFiles: component.items.filter((item) => item.issues.length > 0).slice(0, 10),
  },
  pageIssues: {
    scannedPages: page.scannedPages,
    issueCounts: page.findingCounts,
    worstPages: page.items.filter((item) => item.findings.length > 0).slice(0, 10),
  },
  systemLevelIssues: {
    scannedFiles: system.scannedFiles,
    filesWithIssues: system.filesWithIssues,
    issueCounts: system.issueCounts,
    examples: system.items.slice(0, 20),
  },
  top3Improvements: topImprovements,
};

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("Design Audit Report");
console.log("");
console.log("Component issues:");
console.log(`- Scanned: ${payload.componentIssues.scannedFiles}`);
console.log(`- Avg score: ${payload.summary.componentAverageScore} / 10`);
console.log(`- Action: ${payload.audits.component.recommendedAction}`);
for (const item of topIssueEntries(payload.componentIssues.issueCounts, 5)) {
  console.log(`  - ${item.issue}: ${item.count}`);
}

console.log("");
console.log("Page issues:");
console.log(`- Scanned: ${payload.pageIssues.scannedPages}`);
console.log(`- Avg score: ${payload.summary.pageAverageScore} / 10`);
console.log(`- Action: ${payload.audits.page.recommendedAction}`);
for (const item of topIssueEntries(payload.pageIssues.issueCounts, 5)) {
  console.log(`  - ${item.issue}: ${item.count}`);
}

console.log("");
console.log("System-level issues:");
console.log(`- Scanned: ${payload.systemLevelIssues.scannedFiles}`);
console.log(`- Files with issues: ${payload.systemLevelIssues.filesWithIssues}`);
console.log(`- Avg score: ${payload.summary.systemAverageScore} / 10`);
console.log(`- Action: ${payload.audits.consistency.recommendedAction}`);
for (const item of topIssueEntries(payload.systemLevelIssues.issueCounts, 5)) {
  console.log(`  - ${item.issue}: ${item.count}`);
}

console.log("");
console.log("Top 3 improvements:");
for (const item of payload.top3Improvements) {
  console.log(`- ${item.issue} (${item.count})`);
}
console.log("");
console.log(`Composite score: ${payload.summary.compositeScore} / 10`);
console.log(`Overall recommendation: ${payload.summary.gateRecommendation}`);
