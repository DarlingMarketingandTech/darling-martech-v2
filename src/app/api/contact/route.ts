import { NextResponse } from "next/server";
import { getRequestId, logApiEvent, runLoggedStep } from "@/lib/api-logging";
import { appEnv } from "@/lib/env";
import { sendToN8n } from "@/lib/n8n";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail, type JsonRecord } from "@/lib/request-utils";
import { sendContactNotification } from "@/lib/resend";

export const runtime = "nodejs";

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  company?: string;
  intent?: string;
  problemCluster?: string;
  source?: string;
};

function buildAttributionSnapshotSubmission(payload: JsonRecord): ContactSubmission | null {
  const email = asOptionalString(payload.email);
  if (!email || !isValidEmail(email)) {
    return null;
  }

  const intent = asOptionalString(payload.intent);
  const problemCluster = asOptionalString(payload.problemCluster);
  const timestamp = new Date().toISOString();

  const message = [
    intent ?? "Attribution Snapshot — Measurement Gap report request",
    problemCluster ? `Problem cluster: ${problemCluster}` : undefined,
    `Submitted at: ${timestamp}`,
    "Source: attribution-snapshot",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    name: "Attribution Snapshot",
    email: normalizeEmail(email),
    message,
    intent: intent ?? undefined,
    problemCluster: problemCluster ?? undefined,
    source: "attribution-snapshot",
  };
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  let payload: unknown;

  logApiEvent("api/contact", requestId, "request_received");

  try {
    payload = await request.json();
  } catch {
    logApiEvent("api/contact", requestId, "invalid_json", {}, "warn");
    return NextResponse.json({ ok: false, requestId, error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isJsonRecord(payload)) {
    logApiEvent("api/contact", requestId, "invalid_shape", { reason: "not_json_object" }, "warn");
    return NextResponse.json(
      { ok: false, requestId, error: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const source = asOptionalString(payload.source);

  let submission: ContactSubmission;

  if (source === "attribution-snapshot") {
    const built = buildAttributionSnapshotSubmission(payload);
    if (!built) {
      logApiEvent("api/contact", requestId, "validation_failed", { source, field: "email" }, "warn");
      return NextResponse.json(
        { ok: false, requestId, error: "A valid email address is required." },
        { status: 400 }
      );
    }
    submission = built;
  } else {
    const name = asOptionalString(payload.name);
    const email = asOptionalString(payload.email);
    const message = asOptionalString(payload.message);
    const company = asOptionalString(payload.company);
    const intent = asOptionalString(payload.intent);

    if (!name || !email || !message) {
      logApiEvent("api/contact", requestId, "validation_failed", {
        fields: ["name", "email", "message"].filter((field) => {
          if (field === "name") return !name;
          if (field === "email") return !email;
          return !message;
        }),
      }, "warn");
      return NextResponse.json(
        { ok: false, requestId, error: "Fields `name`, `email`, and `message` are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      logApiEvent("api/contact", requestId, "validation_failed", { field: "email" }, "warn");
      return NextResponse.json(
        { ok: false, requestId, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    submission = {
      name,
      email: normalizeEmail(email),
      message,
      company,
      intent,
    };
  }

  if (!appEnv.enableLiveIntegrations) {
    logApiEvent("api/contact", requestId, "mock_response", { source: submission.source ?? "contact-form" });
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        requestId,
        submission,
        message: "Live integrations are disabled. No external services were called.",
      },
      { status: 202 }
    );
  }

  const warnings: string[] = [];

  await runLoggedStep(
    "api/contact",
    requestId,
    "resend",
    async () => {
      await sendContactNotification({
        name: submission.name,
        email: submission.email,
        message: submission.message,
        company: submission.company,
        intent: submission.intent,
        problemCluster: submission.problemCluster,
      });
    },
    warnings
  );

  await runLoggedStep(
    "api/contact",
    requestId,
    "n8n",
    async () => {
      await sendToN8n("contact", submission as Record<string, unknown>);
    },
    warnings
  );

  if (warnings.length === 2) {
    logApiEvent("api/contact", requestId, "live_failed", { warnings }, "error");
    return NextResponse.json({ ok: false, mode: "live", requestId, warnings }, { status: 502 });
  }

  logApiEvent("api/contact", requestId, "live_success", { warnings });
  return NextResponse.json(
    {
      ok: true,
      mode: "live",
      requestId,
      warnings,
    },
    { status: 200 }
  );
}
