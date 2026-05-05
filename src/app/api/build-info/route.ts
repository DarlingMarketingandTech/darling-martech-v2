import { NextResponse } from "next/server";
import { appEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      appName: "darling-martech-v2",
      nodeEnv: appEnv.nodeEnv,
      appBaseUrl: appEnv.appBaseUrl ?? null,
      enableLiveIntegrations: appEnv.enableLiveIntegrations,
      commitSha: appEnv.commitSha ?? null,
      branch: appEnv.branch ?? null,
      deployedAt: appEnv.deployedAt ?? null,
      hasSupabaseUrl: Boolean(appEnv.supabaseUrl),
      hasSupabaseAnonKey: Boolean(appEnv.supabaseAnonKey),
      hasSupabaseServiceRole: Boolean(appEnv.supabaseServiceRoleKey),
      hasPosthogKey: Boolean(appEnv.posthogKey),
      hasResendKey: Boolean(appEnv.resendApiKey),
      hasN8nContactWebhook: Boolean(appEnv.n8nWebhookUrlContact),
      hasN8nToolWebhook: Boolean(appEnv.n8nWebhookUrlTool),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
