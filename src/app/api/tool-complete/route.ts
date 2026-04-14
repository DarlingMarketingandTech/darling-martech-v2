import { NextResponse } from "next/server";
import { tools } from "@/data/labs";
import { appEnv } from "@/lib/env";
import { sendToN8n } from "@/lib/n8n";
import { capturePosthogEvent } from "@/lib/posthog";
import { asOptionalString, isJsonRecord, isValidEmail, normalizeEmail } from "@/lib/request-utils";
import { insertToolCompletion } from "@/lib/supabase";

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

  const toolSlug = asOptionalString(payload.toolSlug);
  const resultId = asOptionalString(payload.resultId);
  const resultLabel = asOptionalString(payload.resultLabel);
  const email = asOptionalString(payload.email);
  const source = asOptionalString(payload.source) ?? "site";
  const distinctId = asOptionalString(payload.distinctId) ?? (email ? normalizeEmail(email) : crypto.randomUUID());
  const answers = payload.answers;

  if (!toolSlug) {
    return NextResponse.json({ ok: false, error: "Field `toolSlug` is required." }, { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "If provided, `email` must be valid." }, { status: 400 });
  }

  if (answers !== undefined && !isJsonRecord(answers)) {
    return NextResponse.json(
      { ok: false, error: "If provided, `answers` must be a JSON object." },
      { status: 400 }
    );
  }

  const tool = tools.find((entry) => entry.slug === toolSlug);

  if (!tool) {
    return NextResponse.json({ ok: false, error: "Unknown tool slug." }, { status: 400 });
  }

  const normalizedEmail = email ? normalizeEmail(email) : undefined;
  const resolvedResult = resultId ? tool.results.find((result) => result.id === resultId) : undefined;
  const timestamp = new Date().toISOString();

  if (!appEnv.enableLiveIntegrations) {
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        toolSlug,
        distinctId,
        message: "Live integrations are disabled. No external services were called.",
      },
      { status: 202 }
    );
  }

  const warnings: string[] = [];

  await runStep(
    "posthog",
    async () => {
      await capturePosthogEvent({
        distinctId,
        event: "tool completed",
        timestamp,
        properties: {
          $process_person_profile: false,
          source,
          toolSlug,
          toolTitle: tool.title,
          resultId: resultId ?? resolvedResult?.id,
          resultLabel: resultLabel ?? resolvedResult?.label,
          emailProvided: Boolean(normalizedEmail),
        },
      });
    },
    warnings
  );

  await runStep(
    "supabase",
    async () => {
      await insertToolCompletion({
        distinct_id: distinctId,
        tool_slug: toolSlug,
        result_id: resultId ?? resolvedResult?.id,
        result_label: resultLabel ?? resolvedResult?.label,
        email: normalizedEmail,
        source,
        answers: answers && isJsonRecord(answers) ? answers : undefined,
        submitted_at: timestamp,
      });
    },
    warnings
  );

  await runStep(
    "n8n",
    async () => {
      await sendToN8n("tool", {
        distinctId,
        email: normalizedEmail,
        source,
        toolSlug,
        toolTitle: tool.title,
        resultId: resultId ?? resolvedResult?.id,
        resultLabel: resultLabel ?? resolvedResult?.label,
        answers: answers && isJsonRecord(answers) ? answers : undefined,
        submittedAt: timestamp,
      });
    },
    warnings
  );

  if (warnings.length === 3) {
    return NextResponse.json({ ok: false, mode: "live", warnings }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mode: "live", warnings }, { status: 200 });
}
