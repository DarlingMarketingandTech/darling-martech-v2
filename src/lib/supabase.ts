import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { appEnv, assertEnvPresent } from "@/lib/env";
import type { SiteEventName } from "@/types";

type ToolCompletionRecord = {
  distinct_id: string;
  tool_slug: string;
  result_id?: string;
  result_label?: string;
  email?: string;
  source?: string;
  answers?: Record<string, unknown>;
  submitted_at: string;
};

type ToolLeadRecord = {
  tool_slug: string;
  email: string;
  name?: string | null;
  company?: string | null;
  role?: string | null;
  result_summary?: Record<string, unknown> | null;
  source?: string | null;
  distinct_id?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
  page_path?: string | null;
};

type SiteEventRecord = {
  distinct_id: string;
  event_name: SiteEventName;
  idempotency_key?: string | null;
  route_path?: string | null;
  tool_slug?: string | null;
  proof_slug?: string | null;
  result_id?: string | null;
  properties?: Record<string, unknown> | null;
  created_at?: string | null;
};

type VisitorProfileUpsert = {
  distinct_id: string;
  email_normalized?: string | null;
  last_seen?: string | null;
  last_route_path?: string | null;
  last_tool_slug?: string | null;
  last_tool_result_id?: string | null;
};

/** Server-side client: prefers service role for writes, falls back to anon. */
export function createSupabaseServerClient(): SupabaseClient {
  const supabaseKey = appEnv.supabaseServiceRoleKey ?? appEnv.supabaseAnonKey;

  assertEnvPresent("Supabase", {
    NEXT_PUBLIC_SUPABASE_URL: appEnv.supabaseUrl,
    SUPABASE_KEY: supabaseKey,
  });

  return createClient(appEnv.supabaseUrl as string, supabaseKey as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Read-only anon client for public taxonomy (RLS `select` policies).
 * Returns null when URL/anon key are not configured.
 */
export function createSupabaseAnonReadClient(): SupabaseClient | null {
  if (!appEnv.supabaseUrl || !appEnv.supabaseAnonKey) {
    return null;
  }
  return createClient(appEnv.supabaseUrl, appEnv.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createSupabaseServiceRoleClient(): SupabaseClient {
  assertEnvPresent("Supabase service role", {
    NEXT_PUBLIC_SUPABASE_URL: appEnv.supabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: appEnv.supabaseServiceRoleKey,
  });

  return createClient(appEnv.supabaseUrl as string, appEnv.supabaseServiceRoleKey as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function insertToolCompletion(record: ToolCompletionRecord): Promise<{ id: string }> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from("tool_completions").insert(record).select("id").single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
  if (!data?.id) {
    throw new Error("Supabase insert did not return a row id.");
  }

  return { id: data.id as string };
}

export async function insertToolLead(record: ToolLeadRecord): Promise<{ id: string }> {
  const supabase = createSupabaseServiceRoleClient();
  const { data, error } = await supabase
    .from("tool_leads")
    .insert({
      tool_slug: record.tool_slug,
      email: record.email,
      name: record.name ?? null,
      company: record.company ?? null,
      role: record.role ?? null,
      result_summary: record.result_summary ?? null,
      source: record.source ?? "site",
      distinct_id: record.distinct_id ?? null,
      utm_source: record.utm_source ?? null,
      utm_medium: record.utm_medium ?? null,
      utm_campaign: record.utm_campaign ?? null,
      referrer: record.referrer ?? null,
      page_path: record.page_path ?? null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Supabase lead insert failed: ${error.message}`);
  }
  if (!data?.id) {
    throw new Error("Supabase lead insert did not return a row id.");
  }

  return { id: data.id as string };
}

export async function insertSiteEvent(record: SiteEventRecord): Promise<{ id?: string; deduped: boolean }> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_events")
    .insert({
      distinct_id: record.distinct_id,
      event_name: record.event_name,
      idempotency_key: record.idempotency_key ?? null,
      route_path: record.route_path ?? null,
      tool_slug: record.tool_slug ?? null,
      proof_slug: record.proof_slug ?? null,
      result_id: record.result_id ?? null,
      properties: record.properties ?? null,
      created_at: record.created_at ?? null,
    })
    .select("id")
    .single();

  if (error) {
    // Unique violation means we already captured this event; treat as success.
    if (error.code === "23505") {
      return { deduped: true };
    }
    throw new Error(`Supabase event insert failed: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error("Supabase event insert did not return a row id.");
  }

  return { id: data.id as string, deduped: false };
}

export async function upsertVisitorProfile(input: VisitorProfileUpsert): Promise<void> {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("visitor_profiles").upsert(
    {
      distinct_id: input.distinct_id,
      email_normalized: input.email_normalized ?? null,
      last_seen: input.last_seen ?? null,
      last_route_path: input.last_route_path ?? null,
      last_tool_slug: input.last_tool_slug ?? null,
      last_tool_result_id: input.last_tool_result_id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "distinct_id" }
  );

  if (error) {
    throw new Error(`Supabase visitor upsert failed: ${error.message}`);
  }
}

export type SaveReportForEmailInput = {
  toolCompletionId: string;
  emailDisplay: string;
  emailNormalized: string;
};

export class ReportNotFoundError extends Error {
  constructor() {
    super("Report not found");
    this.name = "ReportNotFoundError";
  }
}

/** Persists a soft-identity save row and optionally backfills completion email when empty. */
export async function saveReportForEmail(input: SaveReportForEmailInput): Promise<{ saveId: string }> {
  const supabase = createSupabaseServerClient();
  const { data: completion, error: loadError } = await supabase
    .from("tool_completions")
    .select("id,email")
    .eq("id", input.toolCompletionId)
    .maybeSingle();

  if (loadError) {
    throw new Error(`Supabase read failed: ${loadError.message}`);
  }
  if (!completion) {
    throw new ReportNotFoundError();
  }

  if (!completion.email) {
    await supabase.from("tool_completions").update({ email: input.emailNormalized }).eq("id", input.toolCompletionId);
  }

  const { data: saved, error: saveError } = await supabase
    .from("report_saves")
    .upsert(
      {
        tool_completion_id: input.toolCompletionId,
        email: input.emailDisplay,
        email_normalized: input.emailNormalized,
        user_id: null,
      },
      { onConflict: "tool_completion_id,email_normalized" }
    )
    .select("id")
    .single();

  if (saveError) {
    throw new Error(`Supabase save failed: ${saveError.message}`);
  }
  if (!saved?.id) {
    throw new Error("Supabase save did not return a row id.");
  }

  return { saveId: saved.id as string };
}
