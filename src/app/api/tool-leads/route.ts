import { NextResponse } from "next/server";
import {
  asOptionalString,
  isJsonRecord,
  isValidEmail,
  normalizeEmail,
} from "@/lib/request-utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (!isJsonRecord(payload)) {
    return NextResponse.json(
      { ok: false, error: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const email = asOptionalString(payload.email);
  const toolSlug = asOptionalString(payload.toolSlug);

  if (!email || !toolSlug) {
    return NextResponse.json(
      { ok: false, error: "Fields `email` and `toolSlug` are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const submission = {
    toolSlug,
    email: normalizeEmail(email),
    name: asOptionalString(payload.name),
    company: asOptionalString(payload.company),
    role: asOptionalString(payload.role),
    resultSummary: isJsonRecord(payload.resultSummary) ? payload.resultSummary : undefined,
    submittedAt: new Date().toISOString(),
  };

  // Minimal safe stub — wire into Supabase / Resend / Loops / n8n later.
  if (process.env.NODE_ENV !== "production") {
    console.log("[tool-leads]", submission);
  }

  return NextResponse.json({ ok: true, mode: "mock" }, { status: 200 });
}
