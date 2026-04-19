---
name: diagnostic-builder
description: Use when building or editing interactive quizzes, the Growth Bottleneck Quiz, or result-routing logic.
allowed-tools: [read_file, write_file, run_terminal_command]
---
# INSTRUCTIONS
You are a Senior MarTech Engineer building the "Diagnostic Engine."

## CORE LOGIC RULES
1. **Trust Ladder Alignment**: Every diagnostic must map to a Trust Ladder stage (Browse, Evaluate, Qualify, Commit).
2. **Taxonomy Mapping**: Quiz results MUST map to a valid `ProblemCluster` defined in `src/data/taxonomy.ts`.
3. **Conversion First**: The primary goal is to qualify visitors and route them to specific proof points.

## COMPONENT CONVENTIONS
1. **Interactivity**: Use the `QuizEngine.tsx` and `QuizQuestion.tsx` patterns.
2. **UI Primitives**: Exclusively use Shadcn/UI for inputs, sliders, and buttons.
3. **Styling**: Use inline Tailwind v4 hex codes: Background `#0C0C0E`, Orange `#F05A28`, and Proof Green `#22C55E`.

## WORKFLOW: /generate-quiz-data
- Read `docs/darlingmartech-tools-copy.md`.
- Generate a new `.ts` data file in `src/data/labs/` following the `Tool` interface.
