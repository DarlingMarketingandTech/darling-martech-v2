import posthog from "posthog-js";

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

export function captureClientEvent(event: string, properties?: Record<string, unknown>) {
  if (!ensurePosthogClientInitialized()) {
    return;
  }

  try {
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
