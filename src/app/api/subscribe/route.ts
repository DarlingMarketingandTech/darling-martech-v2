import { NextResponse } from "next/server";
import { tools } from "@/data/labs";
import { appEnv } from "@/lib/env";
import { createLoopsContact } from "@/lib/loops";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail } from "@/lib/request-utils";
import { sendToolResultEmail } from "@/lib/resend";

export const runtime = "nodejs";

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

  const email = asOptionalString(payload.email);
  const firstName = asOptionalString(payload.firstName);
  const toolSlug = asOptionalString(payload.toolSlug);
  const resultLabel = asOptionalString(payload.resultLabel);
  const resultSummary = asOptionalString(payload.resultSummary);
  const ctaHref = asOptionalString(payload.ctaHref);

  if (!email || !toolSlug) {
    return NextResponse.json(
      { ok: false, error: "Fields `email` and `toolSlug` are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
  }

  const normalizedEmail = normalizeEmail(email);
  const tool = tools.find((entry) => entry.slug === toolSlug);

  if (!tool) {
    return NextResponse.json({ ok: false, error: "Unknown tool slug." }, { status: 400 });
  }

  if (!appEnv.enableLiveIntegrations) {
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        email: normalizedEmail,
        toolSlug,
        message: "Live integrations are disabled. No external services were called.",
      },
      { status: 202 }
    );
  }

  const warnings: string[] = [];

  await runStep(
    "loops",
    async () => {
      await createLoopsContact({
        email: normalizedEmail,
        firstName,
        source: "darlingmartech.com",
        userGroup: "tool-lead",
        subscribed: true,
        toolSlug,
        resultLabel,
      });
    },
    warnings
  );

  await runStep(
    "resend",
    async () => {
      await sendToolResultEmail({
        email: normalizedEmail,
        toolTitle: tool.title,
        resultLabel,
        resultSummary,
        ctaHref,
      });
    },
    warnings
  );

  if (warnings.length === 2) {
    return NextResponse.json({ ok: false, mode: "live", warnings }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mode: "live", warnings }, { status: 200 });
}
