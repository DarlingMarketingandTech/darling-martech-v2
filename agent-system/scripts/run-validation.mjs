import { execSync } from "node:child_process";

function execute(command) {
  try {
    const output = execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { ok: true, output: output.trim() };
  } catch (error) {
    const stderr = error?.stderr?.toString?.() ?? error?.message ?? "Validation command failed.";
    return { ok: false, output: stderr.trim() };
  }
}

function needsChecks(validation = {}) {
  return {
    lint: Boolean(validation?.lint),
    typecheck: Boolean(validation?.typecheck),
    build: Boolean(validation?.build),
  };
}

export function runValidation({ validationProfile = {}, mode = "implementation", diffAnalysis = {} } = {}) {
  const checks = needsChecks(validationProfile);
  const results = [];

  if (checks.lint) {
    results.push({ name: "lint", ...execute("pnpm lint") });
  }
  if (checks.typecheck) {
    results.push({ name: "typecheck", ...execute("pnpm typecheck") });
  }
  if (checks.build) {
    results.push({ name: "build", ...execute("pnpm build") });
  }

  const failures = [];
  for (const result of results) {
    if (!result.ok) failures.push(`Validation failed: ${result.name}`);
  }

  if (diffAnalysis.unexpectedFiles?.length && (mode === "surgical_fix" || mode === "audit")) {
    failures.push("Unexpected file edits detected for constrained mode.");
  }
  if (diffAnalysis.exceedsBudget) {
    failures.push("Diff exceeds configured task profile budget.");
  }
  if (diffAnalysis.blockedFiles?.length) {
    failures.push("Blocked file patterns were modified for current task profile.");
  }
  if (diffAnalysis.removedComments && (mode === "surgical_fix" || mode === "implementation")) {
    failures.push("Comment removal detected in constrained task.");
  }
  if (diffAnalysis.hasPlaceholder && (mode === "audit" || mode === "surgical_fix")) {
    failures.push("Placeholder or truncation markers detected in diff.");
  }

  return {
    mode,
    checksRun: results.map((r) => ({ name: r.name, ok: r.ok })),
    failureReasons: failures,
    isSafeToComplete: failures.length === 0,
    validatedAt: new Date().toISOString(),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const payload = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  process.stdout.write(JSON.stringify(runValidation(payload), null, 2));
}
