# External Cursor Hook Config (Backup)

`C:\Users\hoosi\.cursor\hooks.json` is outside this repository and will not be included in git commits.

Use this file as the canonical backup/reference for the expected hook wiring.

## Expected `hooks.json`

```json
{
  "version": 1,
  "hooks": {
    "beforeSubmitPrompt": [
      {
        "command": "powershell -NoProfile -Command \"try { node 'C:\\\\dev\\\\darling-martech-v2\\\\agent-system\\\\scripts\\\\hook-worker.mjs' beforeSubmitPrompt } catch { exit 0 }\""
      }
    ],
    "afterMCPExecution": [
      {
        "command": "powershell -NoProfile -Command \"try { node 'C:\\\\dev\\\\darling-martech-v2\\\\agent-system\\\\scripts\\\\hook-worker.mjs' afterMCPExecution } catch { exit 0 }\""
      }
    ],
    "afterShellExecution": [
      {
        "command": "powershell -NoProfile -Command \"try { node 'C:\\\\dev\\\\darling-martech-v2\\\\agent-system\\\\scripts\\\\hook-worker.mjs' afterShellExecution } catch { exit 0 }\""
      }
    ],
    "afterFileEdit": [
      {
        "command": "powershell -NoProfile -Command \"try { node 'C:\\\\dev\\\\darling-martech-v2\\\\agent-system\\\\scripts\\\\hook-worker.mjs' afterFileEdit } catch { exit 0 }\""
      }
    ],
    "stop": [
      {
        "command": "powershell -NoProfile -Command \"try { node 'C:\\\\dev\\\\darling-martech-v2\\\\agent-system\\\\scripts\\\\hook-worker.mjs' stop } catch { exit 0 }\""
      }
    ]
  }
}
```

## Verification Notes

- Commands are absolute-path based for working-directory resilience.
- `try/catch` wrapper ensures hook failures do not break sessions.
- Update this backup whenever the external `hooks.json` changes.
