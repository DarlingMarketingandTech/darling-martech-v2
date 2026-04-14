export const verificationWorkflow = {
  local: [
    "pnpm lint",
    "pnpm typecheck",
    "pnpm build",
  ],
  browser: [
    "Open local route in browser automation",
    "Verify primary CTA destinations",
    "Verify heading hierarchy and visible nav/footer structure",
    "Check console for hydration or runtime errors",
  ],
  preview: [
    "Create preview deployment",
    "Fetch deployment and build logs if preview fails",
    "Re-run browser checks against preview URL",
  ],
};
