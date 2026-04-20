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

export async function collectContext({ classification, input } = {}) {
  const taskProfiles = await safeRead(path.join("profiles", "task_profiles.json"), {});
  const validationProfiles = await safeRead(path.join("profiles", "validation_profiles.json"), {});
  const sessionState = await safeRead(path.join("memory", "session_state.json"), {});
  const taskState = await safeRead(path.join("memory", "task_state.json"), {});

  const mode = classification?.mode ?? "implementation";
  const profile = taskProfiles?.[mode] ?? {};
  const validation = validationProfiles?.[mode] ?? {};

  return {
    mode,
    profile,
    validation,
    request: {
      prompt: input?.prompt ?? "",
      constraints: input?.constraints ?? [],
    },
    memory: {
      sessionState,
      taskState,
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
