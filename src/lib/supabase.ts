import { createClient } from "@supabase/supabase-js";
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

function getSupabaseClient() {
  const supabaseKey = appEnv.supabaseServiceRoleKey ?? appEnv.supabaseAnonKey;

  assertEnvPresent("Supabase", {
    NEXT_PUBLIC_SUPABASE_URL: appEnv.supabaseUrl,
    SUPABASE_KEY: supabaseKey,
  });

  const resolvedSupabaseUrl = appEnv.supabaseUrl as string;
  const resolvedSupabaseKey = supabaseKey as string;

  return createClient(resolvedSupabaseUrl, resolvedSupabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function insertToolCompletion(record: ToolCompletionRecord) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("tool_completions").insert(record);

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
}
