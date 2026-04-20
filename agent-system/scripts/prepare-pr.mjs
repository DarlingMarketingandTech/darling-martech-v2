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
      strategicAlignment: {
        strategicGate: validationResult?.strategicGate ?? "not_applicable",
        strategicScore: validationResult?.strategicScore ?? null,
        positioningAlignment: validationResult?.positioningAlignment ?? "not_applicable",
        buyerPathCoverage: validationResult?.buyerPathCoverage ?? "not_applicable",
        antiPersonaCheck: validationResult?.antiPersonaCheck ?? "not_applicable",
        trustStageAlignment: validationResult?.trustStageAlignment ?? "not_applicable",
        clusterCoherence: validationResult?.clusterCoherence ?? "not_applicable",
        proofPathCoherence: validationResult?.proofPathCoherence ?? "not_applicable",
      },
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
