# Page Generation Prompt Contract

Use this prompt when planning or generating a new page (or a major page plan) in modes like `page_generation` or `page_experience_upgrade`.

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

Inputs (must be explicitly declared before generating):
1. **Page type:** service / problem / proof / tool / resource / hub / homepage / industry / contact / other
2. **Route + canonical intent:** exact path (do not guess slugs; inventory repo sources of truth first)
3. **Primary buyer state:** `broken-system`, `missing-system`, or `both` (only use `both` when the page job requires it)
4. **Trust stage:** browse / diagnose / learn / evaluate / ready
5. **Primary service cluster:** Build / Scale / Grow / Foundation
6. **Primary object + question + CTA:** per `page-purpose-boundaries.md`
7. **Proof plan:** what proof route(s) support the page promise (curated; no relationship overload)
8. **Tool plan (if applicable):** the one diagnostic step this page should route to (if any)
9. **Display limits plan:** enforce caps from `relationship_display_limits.md`
10. **Asset plan (if applicable):** whether a new asset is required; if yes, switch to `asset_system` and use:
    - `agent-system/prompts/asset-brief-prompt.md`
    - `agent-system/prompts/page-visual-prompt.md`

Rules:
- Do not generate generic agency pages or capability menus.
- Do not imply size-based disqualification; anti-persona is mindset/system behavior.
- Preserve “systems-first” framing and explain commercial stakes (revenue clarity).
- One primary CTA + (optional) one secondary CTA max.
- Curate related entities; route to hubs instead of enumerating connections.
- Do not propose route/slug changes without verifying typed data sources.

Required output:
1. **Page brief**
   - page job (primary object, primary question)
   - buyer state + trust stage
   - cluster alignment
   - primary CTA + secondary CTA (if any)
2. **Section plan (ordered)**
   - each section: purpose, headline intent, “what it must answer”, and the CTA (if any)
3. **Proof/tool/problem/service cross-link plan**
   - explicit curated links (and why each is included)
4. **Relationship reduction plan**
   - what will be shown vs what routes to hubs
5. **Implementation plan**
   - smallest safe sequence
   - expected files to change
   - validation checklist mapped to the active profile
   - safety stop checkpoints
   - explicit “will not change” list

