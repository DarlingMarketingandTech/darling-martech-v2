# Intake Prompt Contract

Given an incoming request:
1. Classify into one of: `audit`, `surgical_fix`, `implementation`, `design_media`, `refactor`.
2. Assign risk level and explain in one sentence.
3. Declare expected scope boundary (file groups allowed / disallowed).
4. Declare stop conditions from active profile.
5. Produce a concise execution packet:
   - mode
   - risk
   - in-scope
   - out-of-scope
   - validation plan
