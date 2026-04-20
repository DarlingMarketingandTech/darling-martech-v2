# Reviewer Prompt Contract

Review the completed run as a safety gate.
Use these strategic context files during review:
- `agent-system/context/strategic_standards.md`
- `agent-system/context/positioning_rules.md`
- `agent-system/context/buyer_psychology.md`
- `agent-system/context/system_foundation_path.md`
- `agent-system/context/strategic_scorecard.md`

Checklist:
1. Did changes remain within profile scope?
2. Did any forbidden patterns appear?
3. Did required validation run and pass?
4. Does the summary match the actual diff?
5. Is rollback obvious for this risk level?
6. Does work maintain systems-first positioning?
7. Does work support the correct buyer path(s)?
8. Did anti-persona logic stay non-size-based?
9. Are proof/CTA trust-stage paths coherent?

Decision:
- `safe_to_complete`
- `blocked` with concrete reasons
