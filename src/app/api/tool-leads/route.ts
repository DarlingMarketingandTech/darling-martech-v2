import { NextResponse } from "next/server";
import { appEnv } from "@/lib/env";
import {
  asOptionalString,
  isJsonRecord,
  isValidEmail,
  normalizeEmail,
} from "@/lib/request-utils";
import { sendToolLeadNotification } from "@/lib/resend";
import { insertToolLead } from "@/lib/supabase";

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

  const resultSummaryValue = payload.resultSummary;
  if (resultSummaryValue !== undefined && !isJsonRecord(resultSummaryValue)) {
    return NextResponse.json(
      { ok: false, error: "Field `resultSummary` must be a JSON object when provided." },
      { status: 400 }
    );
  }

  const referrerHeader = request.headers.get("referer") ?? request.headers.get("referrer") ?? undefined;
  const pagePathFromReferrer = (() => {
    if (!referrerHeader) {
      return undefined;
    }

    try {
      const referrerUrl = new URL(referrerHeader);
      return `${referrerUrl.pathname}${referrerUrl.search}`;
    } catch {
      return undefined;
    }
  })();

  const lead = {
    tool_slug: toolSlug,
    email: normalizeEmail(email),
    name: asOptionalString(payload.name),
    company: asOptionalString(payload.company),
    role: asOptionalString(payload.role),
    result_summary: isJsonRecord(resultSummaryValue) ? resultSummaryValue : undefined,
    source: asOptionalString(payload.source) ?? "site",
    distinct_id: asOptionalString(payload.distinctId),
    utm_source: asOptionalString(payload.utmSource),
    utm_medium: asOptionalString(payload.utmMedium),
    utm_campaign: asOptionalString(payload.utmCampaign),
    referrer: asOptionalString(payload.referrer) ?? referrerHeader,
    page_path: asOptionalString(payload.pagePath) ?? pagePathFromReferrer,
  };

  if (!appEnv.enableLiveIntegrations) {
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        toolSlug: lead.tool_slug,
      },
      { status: 200 }
    );
  }

  try {
    const saved = await insertToolLead(lead);
    const warnings: string[] = [];

    try {
      await sendToolLeadNotification({
        leadId: saved.id,
        submittedAt: new Date().toISOString(),
        toolSlug: lead.tool_slug,
        email: lead.email,
        name: lead.name,
        company: lead.company,
        role: lead.role,
        source: lead.source,
        pagePath: lead.page_path,
        referrer: lead.referrer,
        utmSource: lead.utm_source,
        utmMedium: lead.utm_medium,
        utmCampaign: lead.utm_campaign,
        resultSummary: lead.result_summary ?? null,
      });
    } catch (error) {
      console.error("Tool lead notification failed", error);
      warnings.push("Lead saved, but notification email could not be sent.");
    }

    return NextResponse.json(
      {
        ok: true,
        mode: "live",
        leadId: saved.id,
        warnings,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Supabase error.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
