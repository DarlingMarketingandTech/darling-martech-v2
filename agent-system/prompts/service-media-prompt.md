# Service Media Prompt Contract

Use this prompt to define and implement the media plan for service interior pages *after* the problem-path and CTA strategy are scoped.

This is a media + wiring prompt, not a copy rewrite prompt.

Before planning, load and apply:
- `agent-system/context/visual_hierarchy_rules.md`
- `agent-system/context/visual_priority_rules.md`
- `agent-system/context/design_rules.md`
- `agent-system/context/component_quality_bar.md`
- `agent-system/context/cloudinary_mapping_rules.md`
- `agent-system/context/asset_naming_rules.md`
- `agent-system/context/relationship_display_limits.md`
- `agent-system/context/page-purpose-boundaries.md`

Hard rules:
- Use only existing approved assets and existing Cloudinary mapping rules (do not source new logos or external media).
- Prefer one strong hero visual + one supporting visual per service page (unless the page blueprint explicitly requires more).
- Media must *support the narrative* (problem → change → proof), not decorate.
- No screenshot stacks; no dense collage sections.

Inputs (declare explicitly):
1. Target service slug(s) and routes
2. The already-approved section plan (from service interior improvement + CTA strategy)
3. Current available assets/public IDs (repo + Cloudinary)
4. Constraints (desktop vs mobile emphasis, motion allowed/avoided, accessibility requirements)

Required output:
1. **Scope declaration**
   - exact routes/components included
2. **Media inventory**
   - current images/visuals used (by component + public ID)
   - gaps (missing hero/supporting assets)
3. **Media plan (smallest-first)**
   - per section: asset purpose + asset type (photo, diagram, UI frame, illustration)
   - desktop vs mobile behavior (crop, opacity, placement)
4. **Asset brief(s)**
   - if new assets are needed: create briefs using `agent-system/prompts/asset-brief-prompt.md`
5. **Implementation plan**
   - expected files to change
   - wiring approach (existing components first)
6. **Validation + stop checkpoints**
   - stop if the plan requires new external sourcing, excessive media volume, or undermines readability

