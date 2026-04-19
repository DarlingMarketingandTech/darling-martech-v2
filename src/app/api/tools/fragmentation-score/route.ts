import { NextResponse } from "next/server";
import { computeFragmentationScore } from "@/lib/tools/validation";
import type { FragmentationInputs } from "@/types/tools";
import { isJsonRecord } from "@/lib/request-utils";

export const runtime = "nodejs";

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string");
}

function toNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

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

  const inputs: FragmentationInputs = {
    crm: toNullableString(body.crm),
    booking: toNullableString(body.booking),
    analytics: toStringArray(body.analytics),
    ads: toStringArray(body.ads),
    automation: toStringArray(body.automation),
    reporting: toStringArray(body.reporting),
    manualExportsPerWeek: Math.max(0, toNumber(body.manualExportsPerWeek)),
    duplicateEntryPoints: Math.max(0, toNumber(body.duplicateEntryPoints)),
  };

  const result = computeFragmentationScore(inputs);

  return NextResponse.json({ ok: true, inputs, result }, { status: 200 });
}
