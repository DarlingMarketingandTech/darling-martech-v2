type OptionalEnvValue = string | undefined;

function readOptionalEnv(...names: string[]): OptionalEnvValue {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }

  return undefined;
}

function readBooleanEnv(name: string, defaultValue = false): boolean {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) {
    return defaultValue;
  }

  return value === "1" || value === "true" || value === "yes" || value === "on";
}

export const appEnv = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  vercelEnv: process.env.VERCEL_ENV,
  enableLiveIntegrations: readBooleanEnv("ENABLE_LIVE_INTEGRATIONS"),
  resendApiKey: readOptionalEnv("RESEND_API_KEY"),
  resendFromEmail: readOptionalEnv("RESEND_FROM_EMAIL") ?? "jacob@darlingmartech.com",
  loopsApiKey: readOptionalEnv("LOOPS_API_KEY"),
  n8nWebhookUrlContact: readOptionalEnv("N8N_WEBHOOK_URL_CONTACT"),
  n8nWebhookUrlTool: readOptionalEnv("N8N_WEBHOOK_URL_TOOL"),
  posthogKey: readOptionalEnv("NEXT_PUBLIC_POSTHOG_KEY"),
  posthogHost: (readOptionalEnv("NEXT_PUBLIC_POSTHOG_HOST") ?? "https://app.posthog.com").replace(
    /\/$/,
    ""
  ),
  supabaseUrl: readOptionalEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL"),
  supabaseAnonKey: readOptionalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: readOptionalEnv("SUPABASE_SERVICE_ROLE_KEY"),
} as const;

export function getMissingEnvVars(envMap: Record<string, OptionalEnvValue>) {
  return Object.entries(envMap)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

export function assertEnvPresent(context: string, envMap: Record<string, OptionalEnvValue>) {
  const missing = getMissingEnvVars(envMap);

  if (missing.length > 0) {
    throw new Error(`${context} is missing required environment variables: ${missing.join(", ")}`);
  }
}
