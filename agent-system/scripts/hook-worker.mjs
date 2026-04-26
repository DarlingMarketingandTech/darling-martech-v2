import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { classifyTask } from "./classify-task.mjs";
import { collectContext } from "./collect-context.mjs";
import { analyzeDiff } from "./analyze-diff.mjs";
import { runValidation } from "./run-validation.mjs";
import { preparePR } from "./prepare-pr.mjs";

const BASE = path.join(process.cwd(), "agent-system");
const MEMORY = path.join(BASE, "memory");

/**
 * 2026 REVAMP GUARDRAILS
 * These rules enforce the architectural integrity of the new cinematic engine.
 */
const REVAMP_RULES = [
  {
    id: "NO_LEGACY_IMPORTS",
    severity: "CRITICAL",
    message: "Regressive import detected from _archive_legacy. Use new RootSystemScene components instead.",
    test: (content) => /from ['"].*\/_archive_legacy\//.test(content),
  },
  {
    id: "CONTRAST_VIOLATION",
    severity: "WARNING",
    message: "Text opacity below 82% detected. Use solid muted colors (#A1A1AA) to meet WCAG AA 4.5:1.",
    test: (content, filePath) => 
      (filePath.endsWith(".tsx") || filePath.endsWith(".css")) && 
      /\/(?:[0-7][0-9]|4[0-8])\b/.test(content),
  },
  {
    id: "STACKING_RISK",
    severity: "WARNING",
    message: "Z-index > 100 detected. Protect the SiteHeader (z-50) and MobileNav (z-100) hierarchy.",
    test: (content) => /\bz-(?:\[?(?:10[1-9]|[2-9][0-9]{2,})\]?)\b/.test(content),
  },
  {
    id: "THREE_DEPRECATION",
    severity: "WARNING",
    message: "THREE.Clock is deprecated. Upgrade to THREE.Timer for modern R3F performance.",
    test: (content) => /THREE\.Clock/.test(content),
  }
];

async function ensureMemoryFiles() {
  await fs.mkdir(MEMORY, { recursive: true });
  const defaults = {
    "task_state.json": { activeTask: null, changedFiles: [], observations: [], lastRunStatus: "idle" },
    "session_state.json": { sessionId: null, runCount: 0, lastEvent: null, profile: null },
    "recent_decisions.json": { decisions: [] },
  };

  for (const [name, value] of Object.entries(defaults)) {
    const target = path.join(MEMORY, name);
    try {
      await fs.access(target);
    } catch {
      await fs.writeFile(target, JSON.stringify(value, null, 2));
    }
  }
}

async function readJson(fileName, fallback = {}) {
  try {
    const raw = await fs.readFile(path.join(MEMORY, fileName), "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(fileName, data) {
  await fs.writeFile(path.join(MEMORY, fileName), `${JSON.stringify(data, null, 2)}\n`);
}

async function readPayload() {
  if (process.stdin.isTTY) return {};
  try {
    const readAll = async () => {
      const chunks = [];
      for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
      return Buffer.concat(chunks).toString("utf8").trim();
    };

    const joined = await Promise.race([
      readAll(),
      new Promise((resolve) => setTimeout(() => resolve(""), 40)),
    ]);

    if (!joined) return {};
    return JSON.parse(String(joined));
  } catch {
    return {};
  }
}

function summarizeObservation(payload = {}) {
  const source = payload?.toolName || payload?.command || "unknown";
  const detail = payload?.summary || payload?.result || payload?.output || "";
  return { source, detail: String(detail).slice(0, 500) };
}

function dedupe(observations, record) {
  const hash = crypto
    .createHash("sha1")
    .update(`${record.detail}`)
    .digest("hex");
  if (observations.some((entry) => entry.hash === hash)) return observations;
  return [...observations, { ...record, hash, at: new Date().toISOString() }].slice(-100);
}

async function handleBeforeSubmitPrompt(payload) {
  const classification = await classifyTask(payload);
  const context = await collectContext({ classification, input: payload });
  const taskState = await readJson("task_state.json", {});
  const sessionState = await readJson("session_state.json", {});
  const decisions = await readJson("recent_decisions.json", { decisions: [] });

  const nextTaskState = {
    ...taskState,
    activeTask: {
      mode: classification.mode,
      riskLevel: classification.riskLevel,
      prompt: payload?.prompt ?? "",
      startedAt: new Date().toISOString(),
    },
    changedFiles: [],
    observations: [],
    context,
    lastRunStatus: "running",
  };
  const nextSession = {
    ...sessionState,
    sessionId: sessionState.sessionId ?? crypto.randomUUID(),
    runCount: Number(sessionState.runCount ?? 0) + 1,
    lastEvent: "beforeSubmitPrompt",
    profile: classification.mode,
    lastUpdatedAt: new Date().toISOString(),
  };
  
  await writeJson("task_state.json", nextTaskState);
  await writeJson("session_state.json", nextSession);
}

async function handleObservation(payload, eventName) {
  const taskState = await readJson("task_state.json", {});
  const observations = Array.isArray(taskState.observations) ? taskState.observations : [];
  const record = summarizeObservation({ ...payload, source: eventName });
  if (!record.detail) return;
  const next = { ...taskState, observations: dedupe(observations, record) };
  await writeJson("task_state.json", next);
}

async function handleAfterFileEdit(payload) {
  const taskState = await readJson("task_state.json", {});
  const observations = Array.isArray(taskState.observations) ? taskState.observations : [];
  const editedPath = payload?.filePath || payload?.path;
  
  if (typeof editedPath !== "string") return;

  const normalizedPath = editedPath.replaceAll("\\", "/");
  let revampObservations = [];

  // Content Audit for 2026 Standards
  try {
    const content = await fs.readFile(editedPath, "utf8");
    for (const rule of REVAMP_RULES) {
      if (rule.test(content, normalizedPath)) {
        revampObservations.push({
          source: "REVAMP_AUDITOR",
          detail: `[${rule.severity}] ${rule.id} in ${normalizedPath}: ${rule.message}`,
          at: new Date().toISOString()
        });
      }
    }
  } catch (err) { /* File might be deleted or inaccessible */ }

  const existingFiles = new Set(Array.isArray(taskState.changedFiles) ? taskState.changedFiles : []);
  existingFiles.add(normalizedPath);

  const next = { 
    ...taskState, 
    changedFiles: [...existingFiles], 
    observations: [...observations, ...revampObservations],
    lastEvent: "afterFileEdit" 
  };
  
  await writeJson("task_state.json", next);
}

async function handleStop() {
  const taskState = await readJson("task_state.json", {});
  const mode = taskState?.activeTask?.mode ?? "implementation";
  const context = taskState?.context ?? {};
  const observations = taskState?.observations ?? [];

  const diffAnalysis = analyzeDiff({ mode, context });
  const validationResult = runValidation({ mode, diffAnalysis, observations });
  
  // Flag revamp violations in the final report
  const hasCritical = observations.some(obs => obs.detail?.includes("[CRITICAL]"));
  if (hasCritical) {
    validationResult.isSafeToComplete = false;
    validationResult.errors.push("Revamp architecture violation detected. See observations.");
  }

  const prSummary = preparePR({
    diffAnalysis,
    validationResult,
    context,
    classification: taskState?.activeTask ?? {},
  });

  const report = {
    mode,
    status: validationResult.isSafeToComplete ? "safe" : "blocked",
    diffAnalysis,
    validationResult,
    prSummary,
    completedAt: new Date().toISOString(),
  };

  await fs.writeFile(path.join(BASE, "last-run-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await writeJson("task_state.json", {
    ...taskState,
    lastRunStatus: report.status,
    lastReportPath: "agent-system/last-run-report.json",
  });
}

async function main() {
  await ensureMemoryFiles();
  const eventName = process.argv[2] ?? "";
  const payload = await readPayload();
  
  if (eventName === "beforeSubmitPrompt") await handleBeforeSubmitPrompt(payload);
  if (eventName === "afterMCPExecution" || eventName === "afterShellExecution") await handleObservation(payload, eventName);
  if (eventName === "afterFileEdit") await handleAfterFileEdit(payload);
  if (eventName === "stop") await handleStop();
}

main()
  .then(() => process.exit(0))
  .catch(async (error) => {
    try {
      const message = error?.stack || error?.message || String(error);
      await fs.writeFile(path.join(BASE, "hook-worker-error.log"), `${message}\n`);
    } catch { /* swallow */ }
    process.exit(0);
  });