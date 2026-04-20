import fs from "node:fs/promises";
import path from "node:path";

const BASE = path.join(process.cwd(), "agent-system");
const STRATEGIC_FILE_MAP = {
  strategicStandards: path.join("context", "strategic_standards.md"),
  positioningRules: path.join("context", "positioning_rules.md"),
  buyerPsychology: path.join("context", "buyer_psychology.md"),
  systemFoundationPath: path.join("context", "system_foundation_path.md"),
  strategicScorecard: path.join("context", "strategic_scorecard.md"),
  serviceClusters: path.join("context", "service_clusters.md"),
  problemServiceMapping: path.join("context", "problem_service_mapping.md"),
  trustLadderCtas: path.join("context", "trust_ladder_ctas.md"),
  pageGenerationRules: path.join("context", "page_generation_rules.md"),
};

const STRATEGIC_CORE = ["strategicStandards", "positioningRules", "buyerPsychology", "systemFoundationPath"];
const STRATEGIC_SCORING = ["strategicScorecard"];
const STRATEGIC_PAGE_FLOW = ["pageGenerationRules", "trustLadderCtas", "problemServiceMapping"];
const STRATEGIC_ARCH = ["serviceClusters", "problemServiceMapping", "systemFoundationPath"];

const MODE_STRATEGIC_BUNDLES = {
  strategic_audit: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, ...STRATEGIC_PAGE_FLOW, "serviceClusters"],
  page_generation: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, ...STRATEGIC_PAGE_FLOW, "serviceClusters"],
  service_architecture: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, ...STRATEGIC_ARCH],
  problem_path_planning: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, "problemServiceMapping", "trustLadderCtas"],
  cta_strategy: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, "trustLadderCtas", "pageGenerationRules"],
  positioning_refinement: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, "serviceClusters"],
  page_experience_upgrade: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, ...STRATEGIC_PAGE_FLOW],
  component_upgrade: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, "pageGenerationRules"],
  implementation: [...STRATEGIC_CORE, ...STRATEGIC_SCORING, ...STRATEGIC_PAGE_FLOW],
};

const PROMPT_KEYWORD_BUNDLES = [
  {
    bundle: ["pageGenerationRules", "trustLadderCtas", "problemServiceMapping"],
    triggers: ["page", "homepage", "rewrite", "ia", "navigation", "structure"],
  },
  {
    bundle: ["serviceClusters", "problemServiceMapping", "systemFoundationPath"],
    triggers: ["service", "cluster", "offer", "architecture", "problem-service"],
  },
  {
    bundle: ["trustLadderCtas", "buyerPsychology", "positioningRules"],
    triggers: ["cta", "trust", "qualify", "buyer", "segmentation"],
  },
  {
    bundle: ["positioningRules", "strategicStandards", "buyerPsychology"],
    triggers: ["positioning", "anti-persona", "messaging", "generic agency"],
  },
];

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
  const prompt = String(input?.prompt ?? "").toLowerCase();
  const profileRequiredStrategicContext = Array.isArray(profile?.requiredStrategicContext)
    ? profile.requiredStrategicContext
    : [];

  const selectedStrategicKeys = new Set([
    ...STRATEGIC_CORE,
    ...(MODE_STRATEGIC_BUNDLES[mode] ?? []),
    ...profileRequiredStrategicContext,
  ]);

  for (const rule of PROMPT_KEYWORD_BUNDLES) {
    if (rule.triggers.some((trigger) => prompt.includes(trigger))) {
      for (const key of rule.bundle) selectedStrategicKeys.add(key);
    }
  }

  const strategicContext = {};
  for (const key of selectedStrategicKeys) {
    const relativePath = STRATEGIC_FILE_MAP[key];
    if (!relativePath) continue;
    strategicContext[key] = await safeReadText(relativePath);
  }

  const strategicContextPriority = [
    ...STRATEGIC_CORE,
    ...(MODE_STRATEGIC_BUNDLES[mode] ?? []),
    ...profileRequiredStrategicContext,
  ].filter((key, index, list) => list.indexOf(key) === index);

  return {
    mode,
    profile,
    validation,
    request: {
      prompt: input?.prompt ?? "",
      constraints: input?.constraints ?? [],
    },
    strategicContext,
    strategicContextMeta: {
      loadedKeys: Object.keys(strategicContext),
      priorityKeys: strategicContextPriority,
      profileRequiredKeys: profileRequiredStrategicContext,
      contextRoutingMode: mode,
    },
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
