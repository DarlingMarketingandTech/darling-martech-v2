# Service Interior Improvement Prompt Contract

Use this prompt to upgrade an *existing* `/services/[slug]` page (or a dedicated service route under `src/app/services/<slug>/`) without changing IA or rewriting unrelated pages.

This is phase-1 scope: service interiors first, then homepage.

Before planning, load and apply:
- `agent-system/context/strategic_standards.md`
- `agent-system/context/positioning_rules.md`
- `agent-system/context/buyer_psychology.md`
- `agent-system/context/system_foundation_path.md`
- `agent-system/context/strategic_scorecard.md`
- `agent-system/context/service_clusters.md`
- `agent-system/context/problem_service_mapping.md`
- `agent-system/context/trust_ladder_ctas.md`
- `agent-system/context/page_generation_rules.md`
- `agent-system/context/page-purpose-boundaries.md`
- `agent-system/context/relationship_display_limits.md`
- `agent-system/context/proof_storytelling_rules.md`
- `agent-system/context/route_rules.md`

Hard scope rules:
- Do **not** change global navigation IA, homepage structure, or service slug taxonomy.
- Do **not** add new “report interior slugs” (keep reports scoped to `/report/[id]` if/when implemented).
- Do **not** expand into resources/blog work in this phase.
- Prefer smallest-first copy/layout improvements inside the single service route.
- Preserve the corrected anti-persona logic (system/mindset, not size).

Inputs (declare explicitly):
1. Target service slug(s)
2. Buyer-path support for this pass: `broken-system`, `missing-system`, or `both`
3. Current pain: what feels wrong (CTA overload, unclear fit, weak proof, generic copy, etc.)
4. Existing proof/tool/problem links available in repo (do not invent routes)

Required output:
1. **Scope declaration**
   - exact routes/components included
   - what will not be changed (explicit)
2. **Narrative standard**
   - “what this service changes” in system terms
   - commercial stakes (what it fixes in revenue/operations)
3. **Buyer-fit clarity**
   - broken vs missing system applicability (including “both” rules)
   - anti-persona correctness check (mindset/system behavior)
4. **Section plan (smallest safe upgrade)**
   - proposed section order (keep it compact)
   - each section’s job (diagnose/learn/evaluate) and trust stage
5. **CTA plan**
   - one primary CTA (evaluate-stage)
   - optional one secondary CTA (proof/learn)
   - placement rules (hero vs mid-page vs end-band)
6. **Cross-link plan (curated)**
   - related problems (max 2)
   - proof reinforcement (max 1 featured + max 2 additional links if necessary)
   - tool bridge (optional, only if trust-stage fits)
7. **Implementation notes**
   - expected files to change
   - component reuse preference (use existing section/band components)
8. **Validation + stop checkpoints**
   - map to the active task profile requirements
   - stop if the changes imply IA/taxonomy rewrites, more than 1 primary CTA, or size-based disqualification language

