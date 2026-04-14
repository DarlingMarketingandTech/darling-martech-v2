export const implementationPacketTemplate = {
  checklist: [
    "Read CLAUDE.md and relevant page copy docs before making edits.",
    "Update or create data files before page or component JSX.",
    "Verify metadata exists for every route touched.",
    "Run lint, typecheck, and build before closing the batch.",
    "Validate CTA paths against the trust ladder stage.",
  ],
  promptTemplate: [
    "Phase:",
    "Target routes:",
    "Relevant copy docs:",
    "Data files to create or update first:",
    "Components to implement:",
    "Verification required:",
  ],
  definitionOfDone: [
    "No template defaults remain in touched files.",
    "No hardcoded marketing copy in JSX.",
    "Metadata present and canonicalized.",
    "pnpm lint passes.",
    "pnpm typecheck passes.",
    "pnpm build passes.",
  ],
};
