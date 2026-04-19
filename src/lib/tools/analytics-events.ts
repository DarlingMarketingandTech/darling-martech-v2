export type ToolAnalyticsEvent =
  | "tool_started"
  | "tool_completed"
  | "lead_gate_opened"
  | "lead_gate_submitted"
  | "cmo_simulator_unlocked"
  | "cmo_simulator_open_fullscreen";

export function trackToolEvent(event: ToolAnalyticsEvent, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const posthog = (window as unknown as { posthog?: { capture: (name: string, props?: Record<string, unknown>) => void } }).posthog;
  if (posthog?.capture) {
    try {
      posthog.capture(event, payload);
      return;
    } catch {
      // fall through to console fallback
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[tool-event]", event, payload);
  }
}
