# Intake Prompt Contract

Given an incoming request:
0. Load strategic source context before classification:
   - `agent-system/context/strategic_standards.md`
   - `agent-system/context/positioning_rules.md`
   - `agent-system/context/buyer_psychology.md`
   - `agent-system/context/system_foundation_path.md`
1. Classify into one of: `audit`, `surgical_fix`, `implementation`, `design_media`, `refactor`, `component_upgrade`, `page_experience_upgrade`, `asset_system`, `design_system_enforcement`.
2. Assign risk level and explain in one sentence.
3. Declare expected scope boundary (file groups allowed / disallowed).
4. Declare stop conditions from active profile.
5. Produce a concise execution packet:
   - mode
   - risk
   - in-scope
   - out-of-scope
   - validation plan
  - buyer path relevance (`broken-system`, `missing-system`, `both`)

Strategic checks at intake:
- Reject size-based qualification framing.
- Identify whether request should support one or both buyer entry states.
- Flag if requested work risks reverting to generic agency positioning.
