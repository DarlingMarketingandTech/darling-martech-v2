# Tool & Report System — Darling MarTech

## Philosophy

Tools are not standalone gimmicks.

They are:
- diagnostic entry points
- data collection layers
- report generators
- conversion bridges into the system

---

## Tool role

Each tool should:
- identify a constraint
- structure output
- connect to a problem
- route into proof and services

Avoid tools that:
- feel disconnected from the rest of the system
- produce generic output

---

## Report system

Reports (e.g. `/report/[id]`) are a core product layer.

They should:
- explain the system failure
- show cost and consequences
- connect to proof
- guide execution

They must feel like:
- a product
- a system explanation
- a structured decision artifact

Not:
- a blog post
- a dashboard of metrics

---

## Save report layer

The “Save this report” feature is a soft identity layer.

It should:
- feel like a utility
- not block access
- store report + email
- prepare for future auth

---

## Future evolution

The system should be able to evolve into:
- authenticated report history
- automated follow-ups
- deeper diagnostics

Do not prematurely implement full auth or heavy backend systems until the front-end experience is fully validated.
