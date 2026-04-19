---
name: site-launcher
description: Triggered by /launch. Use to verify builds, clean up code, and prepare for production deployment.
allowed-tools: [run_terminal_command, read_file, write_file]
---
# INSTRUCTIONS
Act as an owner-operator agent ensuring a high-quality production release.

## WORKFLOW: /launch
1. **Quality Audit**: Run `pnpm lint` and `pnpm build`.
2. **Clean-Up**: Identify any `console.log` statements or `TODO` comments in `src/`.
3. **Visual Check**: In Cursor, open the browser to `localhost:3000` and verify the `SiteHeader` is transparent at the top.
4. **Summary**: Generate a 3-sentence summary of technical changes for the Git commit message.

## RULES
- Never bypass a linting error.
- Ensure all metadata exports in `src/app/` follow the SEO requirements in `CLAUDE.md`.
- Verify that every case study links to its relevant problem page.
