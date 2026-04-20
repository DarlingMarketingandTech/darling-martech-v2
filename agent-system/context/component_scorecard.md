# Component Scorecard

## Scoring Method
- Score each dimension from 1 to 10.
- Overall score = average of all dimensions.
- Outputs are heuristic, not deterministic.

## Dimensions
1. Single-purpose clarity
2. Hierarchy legibility
3. Spacing rhythm
4. Content density and readability
5. CTA clarity and dominance
6. Reuse quality and token alignment
7. Visual confidence vs generic template feel
8. Accessibility risk indicators
9. Persuasion utility (supports decisions vs filler)

## Interpretation
- `>= 8.0`: `proceed`
- `>= 7.0 and < 8.0`: `proceed_with_caution`
- `< 7.0`: `block_and_rework`

## Output Contract
- `overallScore`
- `categoryScores`
- `topWeaknesses`
- `topStrengths`
- `topUpgrades` (top 3)
- `confidenceLevel`
- `recommendedAction`
