import { NextResponse } from "next/server";
import {
  DEFAULT_MONTHLY_RETAINER,
  DEFAULT_SEVERANCE_MONTHS,
  OVERHEAD_MULTIPLIER,
  ROLE_BENCHMARKS,
  type RoleBenchmarkKey,
} from "@/data/tools/build-vs-buy-benchmarks";
import { computeBuildVsBuy } from "@/lib/tools/formulas";
import { isJsonRecord } from "@/lib/request-utils";

export const runtime = "nodejs";

function toNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toRoleKeys(value: unknown): RoleBenchmarkKey[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is RoleBenchmarkKey =>
    typeof entry === "string" && entry in ROLE_BENCHMARKS
  );
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

  const roleKeys = toRoleKeys(body.selectedRoles);
  const retainer = Math.max(0, toNumber(body.monthlyAgencyRetainer, DEFAULT_MONTHLY_RETAINER));
  const severanceMonths = Math.max(0, toNumber(body.severanceMonths, DEFAULT_SEVERANCE_MONTHS));
  const equityCost = Math.max(0, toNumber(body.equityCost, 0));

  let roleCostTotal = 0;
  let recruitingCostTotal = 0;

  for (const key of roleKeys) {
    const role = ROLE_BENCHMARKS[key];
    roleCostTotal += role.base;
    recruitingCostTotal += role.base * role.recruitingPercent;
  }

  const severanceCost = (roleCostTotal / 12) * severanceMonths;
  const result = computeBuildVsBuy(
    roleCostTotal,
    recruitingCostTotal,
    OVERHEAD_MULTIPLIER,
    retainer,
    severanceCost,
    equityCost
  );

  return NextResponse.json(
    {
      ok: true,
      inputs: {
        selectedRoles: roleKeys,
        monthlyAgencyRetainer: retainer,
        severanceMonths,
        equityCost,
      },
      result,
    },
    { status: 200 }
  );
}
