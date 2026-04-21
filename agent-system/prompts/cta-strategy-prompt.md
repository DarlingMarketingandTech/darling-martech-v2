# CTA Strategy Prompt Contract

Use this prompt in mode `cta_strategy` to audit and correct CTA sequencing so pages ask for the right trust at the right time.

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

Rules:
- One primary CTA per page; at most one secondary CTA.
- Primary CTA must align with page type + buyer state + trust stage.
- Do not remove buyer-path coverage; broken and missing paths must remain legible.

Required output:
1. **Scope declaration**
   - exact routes/components included
2. **CTA inventory**
   - per page: trust stage, buyer state, current primary CTA, current secondary CTA
3. **Findings**
   - high-trust CTA too early
   - missing next-step path
   - CTA overload / competing CTAs
   - anti-persona drift (size-based language)
4. **Recommendations (ranked smallest-first)**
   - exact CTA changes (label/href placement rules)
   - what stays unchanged (explicit)
5. **Validation + safety**
   - expected files to change
   - required validation mapped to active profile
   - stop checkpoints if CTA changes imply IA rewrites

