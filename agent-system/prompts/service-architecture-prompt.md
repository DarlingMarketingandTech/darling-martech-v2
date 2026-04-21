# Service Architecture Prompt Contract

Use this prompt for service IA work in mode `service_architecture` or tightly scoped `implementation` changes affecting service taxonomy, clustering, featured offers, or cross-linking.

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
- Do not guess slugs, routes, or taxonomy; repo data is source of truth.
- Prefer derived display layers (grouping/ordering) over changing canonical slugs.
- Maintain cluster coherence: each service belongs to one primary cluster.
- Preserve anti-persona correctness (system/mindset based, not size based).
- Maintain buyer-path coverage: broken-system and missing-system must both remain supported across the service system.

Required inventory (must happen before proposing changes):
1. Canonical service data sources (file paths + key fields used for routing).
2. Current service clusters and display grouping logic (where it lives).
3. Current CTA patterns for service pages (trust stage alignment).
4. Current cross-links: services ↔ problems ↔ proof ↔ tools.

Required output:
1. **Architecture proposal (bounded)**
   - what changes and why (commercial + system logic)
   - what stays the same (explicit)
2. **Cluster plan**
   - cluster definitions used (Build/Scale/Grow/Foundation)
   - per-service mapping (one primary cluster each)
3. **Buyer path support**
   - how broken-system vs missing-system are served (where each starts, where each routes)
4. **Cross-link plan**
   - top 1–2 problems per service (max)
   - top 1–3 proofs per service (max)
   - top 0–1 tools per service (max)
5. **CTA sequencing plan**
   - primary CTA (evaluate-stage)
   - optional secondary CTA (proof/learn)
6. **Implementation packet**
   - smallest safe steps
   - expected files to change
   - validation checklist mapped to active profile
   - safety stop checkpoints

