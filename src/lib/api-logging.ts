type ApiLogLevel = "info" | "warn" | "error";

type ApiLogContext = Record<string, unknown>;

export function getRequestId(request: Request) {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

export function logApiEvent(
  route: string,
  requestId: string,
  event: string,
  context: ApiLogContext = {},
  level: ApiLogLevel = "info"
) {
  const entry = JSON.stringify({
    route,
    requestId,
    event,
    ...context,
  });

  if (level === "error") {
    console.error(entry);
    return;
  }

  if (level === "warn") {
    console.warn(entry);
    return;
  }

  console.info(entry);
}

export async function runLoggedStep(
  route: string,
  requestId: string,
  label: string,
  action: () => Promise<void>,
  warnings: string[]
) {
  try {
    await action();
    logApiEvent(route, requestId, "step_succeeded", { step: label });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown integration error";
    warnings.push(`${label}: ${message}`);
    logApiEvent(route, requestId, "step_failed", { step: label, error: message }, "warn");
  }
}
