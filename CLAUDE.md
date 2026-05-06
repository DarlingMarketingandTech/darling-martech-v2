# Darling MarTech v2 Notes

- Analytics client events are typed in `src/lib/analytics.ts`; add new events there before using them in JSX.
- Current allowlist includes `hero_cta_clicked`, `capability_card_clicked`, `proof_card_clicked`, `contact_form_submitted`, `tool_quiz_started`, `tool_completed`, `quiz_completed`, `geo_audit_completed`, `geo_audit_report_requested`, and `closing_cta_clicked`.
- Do not introduce ad hoc string event names outside that union.
