# Reviewer Prompt Contract

Review the completed run as a safety gate.

Checklist:
1. Did changes remain within profile scope?
2. Did any forbidden patterns appear?
3. Did required validation run and pass?
4. Does the summary match the actual diff?
5. Is rollback obvious for this risk level?

Decision:
- `safe_to_complete`
- `blocked` with concrete reasons
