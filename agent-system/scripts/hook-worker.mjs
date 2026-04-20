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
  try {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    const joined = Buffer.concat(chunks).toString("utf8").trim();
    if (!joined) return {};
    return JSON.parse(joined);
  } catch {
    return {};
  }
}

function summarizeObservation(payload = {}) {
  const source = payload?.toolName || payload?.command || payload?.source || "unknown";
  const detail = payload?.summary || payload?.result || payload?.output || "";
  return { source, detail: String(detail).slice(0, 500) };
}

function dedupe(observations, record) {
  const hash = crypto
    .createHash("sha1")
    .update(`${record.source}:${record.detail}`)
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
  };
  const nextDecisions = {
    decisions: [
      ...(decisions.decisions ?? []),
      {
        at: new Date().toISOString(),
        type: "classification",
        mode: classification.mode,
        riskLevel: classification.riskLevel,
      },
    ].slice(-50),
  };

  await writeJson("task_state.json", nextTaskState);
  await writeJson("session_state.json", nextSession);
  await writeJson("recent_decisions.json", nextDecisions);
}

async function handleObservation(payload, eventName) {
  const taskState = await readJson("task_state.json", {});
  const observations = Array.isArray(taskState.observations) ? taskState.observations : [];
  const record = summarizeObservation({ ...payload, source: eventName });
  const next = { ...taskState, observations: dedupe(observations, record) };
  await writeJson("task_state.json", next);
}

async function handleAfterFileEdit(payload) {
  const taskState = await readJson("task_state.json", {});
  const existing = new Set(Array.isArray(taskState.changedFiles) ? taskState.changedFiles : []);
  const edited = payload?.filePath || payload?.path;
  if (typeof edited === "string" && edited.length > 0) existing.add(edited.replaceAll("\\", "/"));
  const next = { ...taskState, changedFiles: [...existing], lastEvent: "afterFileEdit" };
  await writeJson("task_state.json", next);
}

async function handleStop() {
  const taskState = await readJson("task_state.json", {});
  const mode = taskState?.activeTask?.mode ?? "implementation";
  const context = taskState?.context ?? {};
  const profile = context?.profile ?? {};
  const validationProfile = context?.validation ?? {};

  const diffAnalysis = analyzeDiff({ mode, profile });
  const validationResult = runValidation({ mode, validationProfile, diffAnalysis });
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
  .catch(() => process.exit(0));
