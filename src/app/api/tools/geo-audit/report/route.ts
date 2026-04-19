import { NextResponse } from "next/server";
import { appEnv } from "@/lib/env";
import { parseGeoAuditResponse } from "@/lib/geo-audit-parse";
import { validatePublicHttpUrl } from "@/lib/geo-audit-url";
import { createLoopsContact } from "@/lib/loops";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail } from "@/lib/request-utils";
import { sendGeoAuditReportEmail } from "@/lib/resend";

export const runtime = "nodejs";

const TOOL_SLUG = "geo-readiness-auditor";
const NOTE_MAX = 300;

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

  const honeypot = asOptionalString(payload.website);
  if (honeypot) {
    return NextResponse.json(
      { ok: true, mode: "ignored", message: "Thanks — if that was you, you are all set." },
      { status: 202 }
    );
  }

  const name = asOptionalString(payload.name);
  const email = asOptionalString(payload.email);
  const company = asOptionalString(payload.company);
  const noteRaw = asOptionalString(payload.note);
  const note = noteRaw ? noteRaw.slice(0, NOTE_MAX) : undefined;
  const targetUrlRaw = asOptionalString(payload.targetUrl);

  if (!name || !email || !targetUrlRaw) {
    return NextResponse.json({ ok: false, error: "Name, email, and audited URL are required." }, { status: 400 });
  }

  if (name.length > 120) {
    return NextResponse.json({ ok: false, error: "Name is too long." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
  }

  const normalizedEmail = normalizeEmail(email);

  const urlCheck = validatePublicHttpUrl(targetUrlRaw);
  if (!urlCheck.ok) {
    return NextResponse.json({ ok: false, error: urlCheck.error }, { status: 400 });
  }

  const audit = parseGeoAuditResponse(payload.audit);
  if (!audit) {
    return NextResponse.json({ ok: false, error: "Run the audit again, then email the fresh results." }, { status: 400 });
  }

  const firstName = name.split(/\s+/)[0]?.slice(0, 80) ?? name.slice(0, 80);
  const resultLabel = `GEO score ${audit.score}/100`;

  if (!appEnv.enableLiveIntegrations) {
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        email: normalizedEmail,
        toolSlug: TOOL_SLUG,
        message: "Live integrations are disabled. No email was sent.",
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
        toolSlug: TOOL_SLUG,
        resultLabel,
      });
    },
    warnings
  );

  await runStep(
    "resend",
    async () => {
      await sendGeoAuditReportEmail({
        email: normalizedEmail,
        name,
        company,
        note,
        targetUrl: urlCheck.url.toString(),
        audit,
      });
    },
    warnings
  );

  if (warnings.length === 2) {
    return NextResponse.json({ ok: false, mode: "live", warnings }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mode: "live", warnings }, { status: 200 });
}
