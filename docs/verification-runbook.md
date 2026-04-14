# Darling MarTech Verification Runbook

## Local Verification
Run these commands for every implementation batch:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Browser Verification
Use browser automation after any visible route changes:
- Load the route locally.
- Verify primary and secondary CTA destinations.
- Check heading hierarchy and nav/footer presence.
- Check browser console for runtime or hydration errors.

## Preview Verification
Once Vercel is linked:
1. Trigger a preview deployment.
2. Fetch deployment and build logs if it fails.
3. Re-run browser checks against the preview URL.

## Route Checklist
- Metadata export exists.
- Canonical URL is correct.
- Content comes from `src/data`.
- No template copy remains.
- Trust-ladder CTA is appropriate for the page's role.
