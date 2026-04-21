# Prompt Catalog + Gap Map

## Existing prompts (current)
- Intake: `agent-system/prompts/intake-prompt.md`
- Planner: `agent-system/prompts/planner-prompt.md`
- Implementer: `agent-system/prompts/implementer-prompt.md`
- Reviewer: `agent-system/prompts/reviewer-prompt.md`
- PR writer: `agent-system/prompts/pr-writer-prompt.md`
- Asset brief: `agent-system/prompts/asset-brief-prompt.md`
- Page visuals: `agent-system/prompts/page-visual-prompt.md`
- Component visuals: `agent-system/prompts/component-visual-prompt.md`

## Added prompts (strategic + page-type)
- Page generation: `agent-system/prompts/page-generation-prompt.md`
- Service architecture: `agent-system/prompts/service-architecture-prompt.md`
- Problem path planning: `agent-system/prompts/problem-path-planning-prompt.md`
- CTA strategy: `agent-system/prompts/cta-strategy-prompt.md`
- Positioning refinement: `agent-system/prompts/positioning-refinement-prompt.md`
- Proof page: `agent-system/prompts/proof-page-prompt.md`
- Problem page: `agent-system/prompts/problem-page-prompt.md`
- Service page: `agent-system/prompts/service-page-prompt.md`
- Tool page: `agent-system/prompts/tool-page-prompt.md`
- Service interior improvement: `agent-system/prompts/service-interior-improvement-prompt.md`
- Service media: `agent-system/prompts/service-media-prompt.md`
- Report page (`/report/[id]`): `agent-system/prompts/report-page-prompt.md`

## Areas likely needing unique prompts (confirm priorities)
1. **Homepage wayfinding prompt** (explicit broken vs missing entry UX; CTA + proof rail sequencing).
2. **Hub-page curation prompt** (Problems/Proof/Tools/Services hubs: featured logic + relationship caps).
3. **Industry page prompt** (industry-specific problems/proof without turning into “all services for industry”).
4. **“Foundation offer” prompt** (productized system foundation narrative + CTA ladder for missing-system buyers).
5. **Migration/redirect prompt** (route safety + metadata/canonical intent when reworking routes).
6. **Homepage media/hero prompt** (deferred until service interiors are strong).
7. **Resource/blog prompt** (deferred for later; not phase-1 scope).

## Asset tooling guidance (when to switch modes)
- If a page plan requires new visuals beyond simple wiring, switch to `asset_system` mode.
- Use `asset-brief-prompt.md` first, then `page-visual-prompt.md` / `component-visual-prompt.md`.
- Apply `agent-system/policies/asset_pipeline_policy.md` + `agent-system/context/cloudinary_mapping_rules.md`.
