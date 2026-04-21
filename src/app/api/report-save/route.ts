import { NextResponse } from "next/server";
import { appEnv, getMissingEnvVars } from "@/lib/env";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail } from "@/lib/request-utils";
import { ReportNotFoundError, saveReportForEmail } from "@/lib/supabase";

export const runtime = "nodejs";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string): boolean {
  return UUID_RE.test(value.trim());
}

function supabaseReadyForReportSave(): boolean {
  const key = appEnv.supabaseServiceRoleKey ?? appEnv.supabaseAnonKey;
  const missing = getMissingEnvVars({
    NEXT_PUBLIC_SUPABASE_URL: appEnv.supabaseUrl,
    SUPABASE_KEY: key,
  });
  return missing.length === 0;
}

export async function POST(request: Request) {
  if (!supabaseReadyForReportSave()) {
    return NextResponse.json(
      { ok: false, error: "Report saving is not available in this environment." },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isJsonRecord(payload)) {
    return NextResponse.json({ ok: false, error: "Request body must be a JSON object." }, { status: 400 });
  }

  const reportId = asOptionalString(payload.reportId);
  const emailRaw = asOptionalString(payload.email);

  if (!reportId || !isUuid(reportId)) {
    return NextResponse.json({ ok: false, error: "Field `reportId` must be a valid report UUID." }, { status: 400 });
  }

  if (!emailRaw) {
    return NextResponse.json({ ok: false, error: "Field `email` is required." }, { status: 400 });
  }

  if (!isValidEmail(emailRaw)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const emailNormalized = normalizeEmail(emailRaw);
  const emailDisplay = emailRaw.trim();

  try {
    const { saveId } = await saveReportForEmail({
      toolCompletionId: reportId,
      emailDisplay,
      emailNormalized,
    });

    return NextResponse.json({ ok: true, saveId }, { status: 200 });
  } catch (error) {
    if (error instanceof ReportNotFoundError) {
      return NextResponse.json({ ok: false, error: "This report could not be found." }, { status: 404 });
    }

    return NextResponse.json({ ok: false, error: "Could not save right now. Try again in a moment." }, { status: 500 });
  }
}
