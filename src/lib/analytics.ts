import posthog from "posthog-js";

export const CLIENT_ANALYTICS_EVENTS = [
  "hero_cta_clicked",
  "capability_card_clicked",
  "proof_card_clicked",
  "contact_form_submitted",
  "tool_quiz_started",
  "tool_completed",
  "quiz_completed",
  "geo_audit_completed",
  "geo_audit_report_requested",
  "closing_cta_clicked",
] as const;

export type ClientAnalyticsEvent = (typeof CLIENT_ANALYTICS_EVENTS)[number];

const clientAnalyticsEventSet = new Set<string>(CLIENT_ANALYTICS_EVENTS);

let posthogClientInitialized = false;

export function ensurePosthogClientInitialized(): boolean {
  if (typeof window === "undefined" || posthogClientInitialized) {
    return posthogClientInitialized;
  }

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    return false;
  }

  const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com").replace(/\/$/, "");

  posthog.init(key, {
    api_host: host,
    capture_pageview: false,
    person_profiles: "identified_only",
  });

  posthogClientInitialized = true;
  return true;
}

export function captureClientEvent(event: ClientAnalyticsEvent, properties?: Record<string, unknown>) {
  if (!ensurePosthogClientInitialized()) {
    return;
  }

  try {
    if (!clientAnalyticsEventSet.has(event)) {
      return;
    }

    posthog.capture(event, properties);
  } catch {
    // ignore capture failures
  }
}

export function capturePageview(pathname: string, search: string) {
  if (!ensurePosthogClientInitialized()) {
    return;
  }

  let url = `${window.origin}${pathname}`;
  if (search) {
    url += `?${search}`;
  }

  posthog.capture("$pageview", { $current_url: url });
}
