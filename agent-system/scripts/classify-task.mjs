import fs from "node:fs/promises";
import path from "node:path";

const TASK_PROFILES_PATH = path.join(process.cwd(), "agent-system", "profiles", "task_profiles.json");

const MODE_KEYWORDS = {
  audit: ["audit", "review", "inspect", "analyze", "assessment", "health check"],
  strategic_audit: [
    "strategic audit",
    "strategy audit",
    "positioning audit",
    "buyer-state audit",
    "anti-persona audit",
    "trust-stage audit",
  ],
  surgical_fix: ["fix", "typo", "redirect", "metadata", "link", "route", "slug", "single-line", "small"],
  implementation: ["implement", "build", "add", "create", "improve", "feature", "upgrade"],
  page_generation: ["page generation", "generate page", "page rewrite", "page structure", "homepage split", "ia planning"],
  service_architecture: ["service architecture", "service cluster", "service map", "offer architecture"],
  problem_path_planning: ["problem path", "problem mapping", "problem-service mapping", "buyer path planning"],
  cta_strategy: ["cta strategy", "trust ladder cta", "cta alignment", "cta planning"],
  positioning_refinement: ["positioning refinement", "positioning update", "anti-persona", "messaging strategy"],
  design_media: ["design", "media", "asset", "cloudinary", "image", "visual", "canva", "stitch"],
  component_upgrade: ["component upgrade", "component polish", "component quality", "component hierarchy"],
  page_experience_upgrade: ["page experience", "page flow", "page hierarchy", "landing page quality"],
  asset_system: ["asset system", "asset brief", "asset mapping", "visual specs"],
  design_system_enforcement: ["design system", "consistency audit", "token consistency", "design enforcement"],
  refactor: ["refactor", "restructure", "rewrite", "re-architect", "cleanup", "overhaul"],
};

function scoreMode(text, mode) {
  const lowered = text.toLowerCase();
  return MODE_KEYWORDS[mode].reduce((score, keyword) => (lowered.includes(keyword) ? score + 1 : score), 0);
}

export async function classifyTask(input = {}) {
  const rawPrompt = typeof input?.prompt === "string" ? input.prompt : "";
  const requestedMode = typeof input?.requestedMode === "string" ? input.requestedMode : "";
  const text = `${requestedMode} ${rawPrompt}`.trim();

  let mode = "implementation";
  if (requestedMode && MODE_KEYWORDS[requestedMode]) {
    mode = requestedMode;
  } else if (text) {
    const scored = Object.keys(MODE_KEYWORDS)
      .map((candidate) => ({ candidate, score: scoreMode(text, candidate) }))
      .sort((a, b) => b.score - a.score);
    if (scored[0]?.score > 0) {
      mode = scored[0].candidate;
    }
  }

  let risk = "medium";
  try {
    const taskProfiles = JSON.parse(await fs.readFile(TASK_PROFILES_PATH, "utf8"));
    risk = taskProfiles?.[mode]?.riskLevel ?? "medium";
  } catch {
    risk = mode === "refactor" ? "high" : mode === "audit" ? "low" : "medium";
  }

  return {
    mode,
    riskLevel: risk,
    confidence: text ? "medium" : "low",
    classifiedAt: new Date().toISOString(),
    source: requestedMode ? "explicit" : "heuristic",
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  classifyTask(input)
    .then((result) => process.stdout.write(JSON.stringify(result, null, 2)))
    .catch(() => process.stdout.write(JSON.stringify({ mode: "implementation", riskLevel: "medium" }, null, 2)));
}
