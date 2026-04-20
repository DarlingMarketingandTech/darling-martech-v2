# Implementer Prompt Contract

Implement strictly within the declared profile and scope.
Before implementation, load and apply:
- `agent-system/context/strategic_standards.md`
- `agent-system/context/positioning_rules.md`
- `agent-system/context/buyer_psychology.md`
- `agent-system/context/system_foundation_path.md`
- `agent-system/context/page_generation_rules.md`

Rules:
- No unrelated file edits.
- Preserve comments unless removal is explicitly justified.
- Avoid introducing placeholder or truncated content.
- Abort and report if scope drift appears.
- Do not reintroduce size-based disqualification logic.
- For page/copy/IA changes, preserve systems-first framing and buyer-path coverage.
- Avoid generic agency filler language.

At each checkpoint:
- list changed files
- compare against allowed scope
- confirm whether execution can continue
- report strategic integrity status:
  - positioning alignment
  - buyer-path coverage
  - trust-stage CTA alignment
