import fs from "node:fs/promises";
import path from "node:path";

const BASE = path.join(process.cwd(), "agent-system");

async function safeRead(relativePath, fallback) {
  try {
    const file = await fs.readFile(path.join(BASE, relativePath), "utf8");
    return JSON.parse(file);
  } catch {
    return fallback;
  }
}

async function safeReadText(relativePath, fallback = "") {
  try {
    return await fs.readFile(path.join(BASE, relativePath), "utf8");
  } catch {
    return fallback;
  }
}

export async function collectContext({ classification, input } = {}) {
  const taskProfiles = await safeRead(path.join("profiles", "task_profiles.json"), {});
  const validationProfiles = await safeRead(path.join("profiles", "validation_profiles.json"), {});
  const sessionState = await safeRead(path.join("memory", "session_state.json"), {});
  const taskState = await safeRead(path.join("memory", "task_state.json"), {});

  const mode = classification?.mode ?? "implementation";
  const profile = taskProfiles?.[mode] ?? {};
  const validation = validationProfiles?.[mode] ?? {};
  const strategicContext = {
    strategicStandards: await safeReadText(path.join("context", "strategic_standards.md")),
    positioningRules: await safeReadText(path.join("context", "positioning_rules.md")),
    buyerPsychology: await safeReadText(path.join("context", "buyer_psychology.md")),
    systemFoundationPath: await safeReadText(path.join("context", "system_foundation_path.md")),
    strategicScorecard: await safeReadText(path.join("context", "strategic_scorecard.md")),
    serviceClusters: await safeReadText(path.join("context", "service_clusters.md")),
    problemServiceMapping: await safeReadText(path.join("context", "problem_service_mapping.md")),
    trustLadderCtas: await safeReadText(path.join("context", "trust_ladder_ctas.md")),
    pageGenerationRules: await safeReadText(path.join("context", "page_generation_rules.md")),
  };

  return {
    mode,
    profile,
    validation,
    request: {
      prompt: input?.prompt ?? "",
      constraints: input?.constraints ?? [],
    },
    strategicContext,
    memory: {
      sessionState: {
        sessionId: sessionState?.sessionId ?? null,
        runCount: sessionState?.runCount ?? 0,
        lastEvent: sessionState?.lastEvent ?? null,
        profile: sessionState?.profile ?? null,
      },
      taskState: {
        activeTask: taskState?.activeTask ?? null,
        changedFilesCount: Array.isArray(taskState?.changedFiles) ? taskState.changedFiles.length : 0,
        observationCount: Array.isArray(taskState?.observations) ? taskState.observations.length : 0,
        lastRunStatus: taskState?.lastRunStatus ?? "idle",
      },
    },
    collectedAt: new Date().toISOString(),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const payload = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  collectContext(payload)
    .then((result) => process.stdout.write(JSON.stringify(result, null, 2)))
    .catch(() => process.stdout.write(JSON.stringify({ mode: "implementation" }, null, 2)));
}
