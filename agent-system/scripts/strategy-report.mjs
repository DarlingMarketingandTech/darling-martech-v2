#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const jsonMode = process.argv.slice(2).includes("--json");

function run(scriptPath, targetDir) {
  const result = spawnSync("node", [scriptPath, targetDir, "--json"], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`Failed: ${scriptPath}\n${result.stderr || result.stdout}`);
  }
  return JSON.parse(result.stdout);
}

const strategic = run("agent-system/scripts/audit-strategic-alignment.mjs", "src/app");
const design = run("agent-system/scripts/audit-page-experience.mjs", "src/app");

const payload = {
  generatedAt: new Date().toISOString(),
  summary: {
    strategicScore: strategic.strategicScore,
    strategicGate: strategic.recommendedAction,
    designScore: design.overallScore,
    designGate: design.recommendedAction,
  },
  strategic,
  design,
};

if (jsonMode) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log("Strategy Audit Report");
console.log(`Strategic score: ${payload.summary.strategicScore} (${payload.summary.strategicGate})`);
console.log(`Design score: ${payload.summary.designScore} (${payload.summary.designGate})`);
