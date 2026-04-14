import { appEnv, assertEnvPresent } from "@/lib/env";

type CaptureEventInput = {
  distinctId: string;
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
};

export async function capturePosthogEvent(input: CaptureEventInput) {
  assertEnvPresent("PostHog", {
    NEXT_PUBLIC_POSTHOG_KEY: appEnv.posthogKey,
    NEXT_PUBLIC_POSTHOG_HOST: appEnv.posthogHost,
  });

  const response = await fetch(`${appEnv.posthogHost}/i/v0/e/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: appEnv.posthogKey,
      distinct_id: input.distinctId,
      event: input.event,
      properties: input.properties,
      timestamp: input.timestamp,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PostHog capture failed with ${response.status}: ${errorText}`);
  }
}
