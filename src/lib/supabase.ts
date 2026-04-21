import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { appEnv, assertEnvPresent } from "@/lib/env";

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
