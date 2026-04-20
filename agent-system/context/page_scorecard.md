# Page Scorecard

## Scoring Method
- Score each dimension from 1 to 10.
- Overall score = average of all dimensions.
- Outputs are heuristic, based on code-structure and content-pattern signals.

## Dimensions
1. First-screen clarity (3-second comprehension)
2. Audience and offer clarity
3. CTA hierarchy and dominance
4. Section sequencing and narrative flow
5. Visual rhythm and pacing
6. Density vs restraint
7. Proof credibility and integration
8. Differentiation vs generic template feel
9. Mobile readability assumptions
10. Friction/confusion risk

## Diagnosis Prompts
- What is strongest and why?
- What is weak enough to block progression?
- What feels generic vs premium and differentiated?
- Which two issues most likely hurt conversion first?
- Which top three upgrades yield highest leverage?

## Threshold Interpretation
- `>= 8.0`: `proceed`
- `>= 7.0 and < 8.0`: `proceed_with_caution`
- `< 7.0`: `block_and_rework`

## Output Contract
- `overallScore`
- `categoryScores`
- `topWeaknesses`
- `topStrengths`
- `topUpgrades`
- `confidenceLevel`
- `recommendedAction`
