import { execSync } from "node:child_process";

function run(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

export function analyzeDiff({ mode, profile } = {}) {
  const changedFiles = run("git diff --name-only").split("\n").map((x) => x.trim()).filter(Boolean);
  const stagedFiles = run("git diff --cached --name-only").split("\n").map((x) => x.trim()).filter(Boolean);
  const statRaw = run("git diff --shortstat");
  const patch = run("git diff");

  const hasPlaceholder = /(TODO|TBD|lorem ipsum|\.\.\.)/i.test(patch);
  const removedComments = /^\-\s*(\/\/|\/\*|\*)/m.test(patch);

  const allowedPrefixes = profile?.allowedFileGlobs ?? [];
  const unexpectedFiles =
    allowedPrefixes.length === 0
      ? []
      : changedFiles.filter((file) => !allowedPrefixes.some((prefix) => file.startsWith(prefix)));

  const budget = Number(profile?.maxFiles ?? 999);
  const exceedsBudget = changedFiles.length > budget;

  return {
    mode: mode ?? "implementation",
    changedFiles,
    stagedFiles,
    unexpectedFiles,
    exceedsBudget,
    diffStat: statRaw || "No diff stats available.",
    hasPlaceholder,
    removedComments,
    analyzedAt: new Date().toISOString(),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const payload = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  process.stdout.write(JSON.stringify(analyzeDiff(payload), null, 2));
}
