import { NextResponse } from "next/server";
import {
  asOptionalString,
  isJsonRecord,
  isValidEmail,
  normalizeEmail,
} from "@/lib/request-utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (!isJsonRecord(body)) {
    return NextResponse.json(
      { ok: false, error: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const email = asOptionalString(body.email);
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const record = {
    toolSlug: "cmo-simulator",
    email: normalizeEmail(email),
    name: asOptionalString(body.name),
    company: asOptionalString(body.company),
    grantedAt: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("[cmo-simulator-access]", record);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
