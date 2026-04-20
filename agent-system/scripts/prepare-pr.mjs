export function preparePR({ diffAnalysis = {}, validationResult = {}, context = {}, classification = {} } = {}) {
  const changed = diffAnalysis.changedFiles ?? [];
  const mode = classification.mode ?? context.mode ?? "implementation";
  const risk = classification.riskLevel ?? "medium";

  const intentionallyNotChanged = context?.profile?.intentionallyNotChanged ?? [
    "Core architecture outside declared task scope",
    "Unrelated routes, media, and content records",
  ];

  return {
    title: `[${mode}] ${changed.length} file change${changed.length === 1 ? "" : "s"}`,
    body: {
      whatChanged: changed,
      whyChanged:
        context?.request?.prompt ||
        "Changes align with scoped task profile and repo safety policies.",
      intentionallyNotChanged,
      validationPerformed: validationResult?.checksRun ?? [],
      riskLevel: risk,
      rollbackPath:
        risk === "high"
          ? "Revert the branch commit(s) and restore prior route/config/data artifacts."
          : "Revert changed files or branch commit(s); no schema migration required.",
    },
    preparedAt: new Date().toISOString(),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const payload = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  process.stdout.write(JSON.stringify(preparePR(payload), null, 2));
}
