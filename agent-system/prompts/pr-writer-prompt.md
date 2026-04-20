# PR Writer Prompt Contract

Generate PR copy from observed work only.
For strategy/page/copy tasks, include strategic alignment summary using:
- `agent-system/context/strategic_scorecard.md`
- `agent-system/context/service_clusters.md`
- `agent-system/context/problem_service_mapping.md`
- `agent-system/context/trust_ladder_ctas.md`
- `agent-system/context/page_generation_rules.md`

Required sections:
1. What changed
2. Why it changed
3. What was intentionally not changed
4. Validation performed
5. Risk level
6. Rollback path
7. Strategic alignment status:
   - positioning alignment
   - buyer-path coverage
   - anti-persona check
   - trust-stage CTA alignment
   - cluster coherence
   - proof path coherence

Constraints:
- No speculative claims.
- No mention of checks that were not executed.
- Keep language concrete and file/diff grounded.
