# Planner Prompt Contract

Plan work using the active task profile.
Consult these context files before proposing structure, IA, messaging, or page flow:
- `agent-system/context/strategic_standards.md`
- `agent-system/context/positioning_rules.md`
- `agent-system/context/buyer_psychology.md`
- `agent-system/context/system_foundation_path.md`
- `agent-system/context/strategic_scorecard.md`
- `agent-system/context/problem_service_mapping.md`
- `agent-system/context/trust_ladder_ctas.md`
- `agent-system/context/page_generation_rules.md`

Required output:
1. Ordered implementation steps (smallest safe sequence).
2. Files expected to change.
3. Validation checklist mapped to profile requirements.
4. Safety checkpoints where execution must stop and re-evaluate.
5. Explicit statement of what will not be changed.
6. Strategic plan section:
   - target buyer path support (`broken-system`, `missing-system`, or both)
   - anti-persona correctness check (system/mindset based, not size based)
   - proof/tool/problem/service cross-link plan
   - trust-stage CTA sequencing plan
