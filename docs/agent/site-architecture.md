# Site Architecture — Darling MarTech

## Core model

This site is not a traditional agency site.

It is a structured system designed to move a visitor through:

1. Problem recognition
2. System diagnosis
3. Proof validation
4. Implementation understanding
5. Action

---

## Primary routes

### /problems

The diagnostic layer.

Purpose:
- help users identify their constraint
- frame issues as system failures, not surface symptoms
- route to tools, proof, and services

Must:
- support both buyer states (broken system / missing system)
- provide strong next-step routing

---

### /proof

The validation layer.

Purpose:
- show real outcomes
- connect work to specific system failures

Must:
- tie each case to a system break
- avoid gallery-style presentation

---

### /tools

The diagnostic engine.

Purpose:
- allow users to evaluate their own system
- produce structured outputs (reports)

---

### /services

The implementation layer.

Purpose:
- explain how systems are built, fixed, and expanded
- not a list of capabilities

Current structure:
- Foundation
- Build
- Scale
- Grow

Must:
- connect directly to problems
- show outcomes, not features
- route into proof and tools

---

### /report/[id]

The system teardown layer.

Purpose:
- convert a diagnostic into a structured, persuasive artifact
- explain system failure, cost, and fix
- guide action

Must:
- feel like a product, not a page
- maintain clear execution sequence
- tie proof to system logic

---

## Buyer states

The system supports two entry states:

### Broken system
- tools exist
- systems are fragmented or inefficient

### Missing system
- no real infrastructure
- inconsistent or manual processes

Every major surface must account for both states.

---

## Trust ladder

Users should be guided through:

- Diagnose
- Validate (proof)
- Understand (system)
- Evaluate (services)
- Act

Do not collapse this into a single step.
