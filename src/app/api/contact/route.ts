import { NextResponse } from "next/server";
import { appEnv } from "@/lib/env";
import { sendToN8n } from "@/lib/n8n";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail } from "@/lib/request-utils";
import { sendContactNotification } from "@/lib/resend";

export const runtime = "nodejs";

type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  company?: string;
  intent?: string;
};

async function runStep(label: string, action: () => Promise<void>, warnings: string[]) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown integration error";
    warnings.push(`${label}: ${message}`);
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isJsonRecord(payload)) {
    return NextResponse.json({ ok: false, error: "Request body must be a JSON object." }, { status: 400 });
  }

  const name = asOptionalString(payload.name);
  const email = asOptionalString(payload.email);
  const message = asOptionalString(payload.message);
  const company = asOptionalString(payload.company);
  const intent = asOptionalString(payload.intent);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Fields `name`, `email`, and `message` are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
  }

  const submission: ContactSubmission = {
    name,
    email: normalizeEmail(email),
    message,
    company,
    intent,
  };

  if (!appEnv.enableLiveIntegrations) {
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        submission,
        message: "Live integrations are disabled. No external services were called.",
      },
      { status: 202 }
    );
  }

  const warnings: string[] = [];

  await runStep(
    "resend",
    async () => {
      await sendContactNotification(submission);
    },
    warnings
  );

  await runStep(
    "n8n",
    async () => {
      await sendToN8n("contact", submission);
    },
    warnings
  );

  if (warnings.length === 2) {
    return NextResponse.json({ ok: false, mode: "live", warnings }, { status: 502 });
  }

  return NextResponse.json(
    {
      ok: true,
      mode: "live",
      warnings,
    },
    { status: 200 }
  );
}
