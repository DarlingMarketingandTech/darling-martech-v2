# Problem Path Planning Prompt Contract

Use this prompt when creating or refining “problem-first” paths, in mode `problem_path_planning`.

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
- `agent-system/context/route_rules.md`

Rules:
- Preserve problem-first architecture: problem → proof/tools → service → contact.
- Do not collapse broken-system and missing-system into one vague path.
- Do not expand relationship maps; curate and route to hubs.
- CTAs must match trust stage and buyer state; avoid asking for “Ready” too early.

Required output:
1. **Two-path map**
   - Path A: broken-system buyers
   - Path B: missing-system buyers
2. **For each path**
   - entry point(s) (page + CTA)
   - top problems to feature (curated)
   - top diagnostic tool to route to (one primary)
   - proof reinforcement (curated)
   - implementation/service bridge (curated)
   - high-trust conversion endpoint (contact/roadmap call)
3. **Anti-persona check**
   - system/mindset disqualifiers only; no size-based filters
4. **Service-cluster coherence**
   - confirm each step maps cleanly to Build/Scale/Grow/Foundation logic
5. **Implementation packet**
   - smallest safe steps
   - expected files to change
   - validation checklist mapped to profile requirements
   - safety checkpoints and stop conditions
   - explicit “will not change” list

