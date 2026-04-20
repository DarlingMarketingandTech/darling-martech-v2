# Component Quality Bar

## Purpose
Define what "top-tier" component quality means for Darling Martech. Used by `component_upgrade` mode and design audits.

## Quality Levels

### Tier 4: Top Tier
- Intent is immediately clear in less than 3 seconds.
- Visual hierarchy is obvious without scanning effort.
- Spacing rhythm aligns to system cadence; no cramped clusters.
- CTA is clear, singular, and context-appropriate.
- Interaction states (default, hover, focus, active, disabled) are intentional.
- Mobile layout preserves narrative and action without loss.
- Accessibility baseline met (semantic structure, contrast, keyboard support).
- Distinctive visual identity while remaining reusable.

### Tier 3: Strong
- Clear purpose and usable hierarchy.
- Mostly consistent spacing and typography.
- CTA is present but may be under-framed.
- Responsive behavior is acceptable with minor rough edges.
- Good accessibility fundamentals, limited polish gaps.

### Tier 2: Functional
- Works technically but feels generic or template-like.
- Hierarchy requires effort to parse.
- Spacing and visual grouping are inconsistent.
- CTA competes with adjacent elements or lacks urgency.
- Interaction quality is basic; weak affordance cues.

### Tier 1: Weak
- Unclear purpose and cluttered signal.
- No reliable hierarchy; poor text-to-action flow.
- Visual rhythm breaks across breakpoints.
- Accessibility and responsiveness issues are visible.
- Component degrades trust and conversion quality.

## Component Review Criteria
- Layout clarity and compositional balance.
- Typographic hierarchy and scannability.
- Spacing rhythm and grouping integrity.
- CTA framing and action clarity.
- Interaction quality (states, motion, feedback).
- Responsive adaptation and mobile stacking.
- Accessibility and semantic correctness.
- Reuse fitness and token/system alignment.

## Upgrade Triggers
Any component scoring Tier 1 or Tier 2 on two or more criteria should enter `component_upgrade` mode with bounded scope:
- Fix hierarchy first.
- Fix spacing and grouping second.
- Fix CTA framing third.
- Add visual polish only after structural quality is sound.
