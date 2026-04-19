import { NextResponse } from "next/server";
import { computeAttributionClarity } from "@/lib/tools/formulas";
import { isJsonRecord } from "@/lib/request-utils";

export const runtime = "nodejs";

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

  const inputs = {
    leads: Math.max(0, toNumber(body.leads)),
    qualifiedLeads: Math.max(0, toNumber(body.qualifiedLeads)),
    opportunities: Math.max(0, toNumber(body.opportunities)),
    customers: Math.max(0, toNumber(body.customers)),
    revenue: Math.max(0, toNumber(body.revenue)),
    trackingConfidence: toNumber(body.trackingConfidence),
    unattributedPercent: toNumber(body.unattributedPercent),
  };

  const result = computeAttributionClarity(inputs);

  return NextResponse.json({ ok: true, inputs, result }, { status: 200 });
}
