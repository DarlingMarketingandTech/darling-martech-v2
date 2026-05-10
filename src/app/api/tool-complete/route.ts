import { NextResponse } from "next/server";
import { tools } from "@/data/labs";
import { getRequestId, logApiEvent, runLoggedStep } from "@/lib/api-logging";
import { appEnv } from "@/lib/env";
import { sendToN8n } from "@/lib/n8n";
import { capturePosthogEvent } from "@/lib/posthog";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail } from "@/lib/request-utils";
import { insertSiteEvent, insertToolCompletion, upsertVisitorProfile } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  let payload: unknown;

  logApiEvent("api/tool-complete", requestId, "request_received");

  try {
    payload = await request.json();
  } catch {
    logApiEvent("api/tool-complete", requestId, "invalid_json", {}, "warn");
    return NextResponse.json({ ok: false, error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isJsonRecord(payload)) {
    logApiEvent("api/tool-complete", requestId, "invalid_shape", { reason: "not_json_object" }, "warn");
    return NextResponse.json({ ok: false, error: "Request body must be a JSON object." }, { status: 400 });
  }

  const toolSlug = asOptionalString(payload.toolSlug);
  const resultId = asOptionalString(payload.resultId);
  const resultLabel = asOptionalString(payload.resultLabel);
  const email = asOptionalString(payload.email);
  const source = asOptionalString(payload.source) ?? "site";
  const distinctId = asOptionalString(payload.distinctId) ?? (email ? normalizeEmail(email) : crypto.randomUUID());
  const answers = payload.answers;

  if (!toolSlug) {
    logApiEvent("api/tool-complete", requestId, "validation_failed", { missing: ["toolSlug"] }, "warn");
    return NextResponse.json({ ok: false, error: "Field `toolSlug` is required." }, { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    logApiEvent("api/tool-complete", requestId, "validation_failed", { field: "email" }, "warn");
    return NextResponse.json({ ok: false, error: "If provided, `email` must be valid." }, { status: 400 });
  }

  if (answers !== undefined && !isJsonRecord(answers)) {
    logApiEvent("api/tool-complete", requestId, "validation_failed", { field: "answers" }, "warn");
    return NextResponse.json(
      { ok: false, error: "If provided, `answers` must be a JSON object." },
      { status: 400 }
    );
  }

  const tool = tools.find((entry) => entry.slug === toolSlug);

  if (!tool) {
    logApiEvent("api/tool-complete", requestId, "validation_failed", { reason: "unknown_tool_slug", toolSlug }, "warn");
    return NextResponse.json({ ok: false, error: "Unknown tool slug." }, { status: 400 });
  }

  const normalizedEmail = email ? normalizeEmail(email) : undefined;
  const resolvedResult = resultId ? tool.results.find((result) => result.id === resultId) : undefined;
  const timestamp = new Date().toISOString();
  const resolvedResultId = resultId ?? resolvedResult?.id ?? null;

  const referrerHeader = request.headers.get("referer") ?? request.headers.get("referrer") ?? undefined;
  const routePathFromReferrer = (() => {
    if (!referrerHeader) {
      return undefined;
    }

    try {
      const referrerUrl = new URL(referrerHeader);
      return `${referrerUrl.pathname}${referrerUrl.search}`;
    } catch {
      return undefined;
    }
  })();

  // Retry-safe key: prevent duplicate event rows from refresh/retry on the same day.
  const idempotencyKey = [
    "tool_completed",
    distinctId,
    toolSlug,
    resolvedResultId ?? "",
    timestamp.slice(0, 10),
  ].join(":");

  if (!appEnv.enableLiveIntegrations) {
    logApiEvent("api/tool-complete", requestId, "mock_response", { toolSlug });
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        toolSlug,
        distinctId,
        message: "Live integrations are disabled. No external services were called.",
      },
      { status: 202 }
    );
  }

  const warnings: string[] = [];

  await runLoggedStep(
    "api/tool-complete",
    requestId,
    "posthog",
    async () => {
      await capturePosthogEvent({
        distinctId,
        event: "tool completed",
        timestamp,
        properties: {
          $process_person_profile: false,
          source,
          toolSlug,
          toolTitle: tool.title,
          resultId: resultId ?? resolvedResult?.id,
          resultLabel: resultLabel ?? resolvedResult?.label,
          emailProvided: Boolean(normalizedEmail),
        },
      });
    },
    warnings
  );

  await runLoggedStep(
    "api/tool-complete",
    requestId,
    "supabase",
    async () => {
      await insertSiteEvent({
        distinct_id: distinctId,
        event_name: "tool_completed",
        idempotency_key: idempotencyKey,
        route_path: routePathFromReferrer,
        tool_slug: toolSlug,
        result_id: resolvedResultId,
        properties: {
          source,
          resultLabel: resultLabel ?? resolvedResult?.label ?? null,
          emailProvided: Boolean(normalizedEmail),
        },
        created_at: timestamp,
      });

      await upsertVisitorProfile({
        distinct_id: distinctId,
        email_normalized: normalizedEmail ?? null,
        last_seen: timestamp,
        last_route_path: routePathFromReferrer ?? null,
        last_tool_slug: toolSlug,
        last_tool_result_id: resolvedResultId,
      });

      await insertToolCompletion({
        distinct_id: distinctId,
        tool_slug: toolSlug,
        result_id: resultId ?? resolvedResult?.id,
        result_label: resultLabel ?? resolvedResult?.label,
        email: normalizedEmail,
        source,
        answers: answers && isJsonRecord(answers) ? answers : undefined,
        submitted_at: timestamp,
      });
    },
    warnings
  );

  await runLoggedStep(
    "api/tool-complete",
    requestId,
    "n8n",
    async () => {
      await sendToN8n("tool", {
        distinctId,
        email: normalizedEmail,
        source,
        toolSlug,
        toolTitle: tool.title,
        resultId: resultId ?? resolvedResult?.id,
        resultLabel: resultLabel ?? resolvedResult?.label,
        answers: answers && isJsonRecord(answers) ? answers : undefined,
        submittedAt: timestamp,
      });
    },
    warnings
  );

  if (warnings.length === 3) {
    logApiEvent("api/tool-complete", requestId, "all_integrations_failed", { toolSlug }, "error");
    return NextResponse.json({ ok: false, mode: "live", warnings }, { status: 502 });
  }

  logApiEvent("api/tool-complete", requestId, "completed", { toolSlug, warnings: warnings.length });
  return NextResponse.json({ ok: true, mode: "live", warnings }, { status: 200 });
}
