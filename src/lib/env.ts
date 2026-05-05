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
  commitSha: readOptionalEnv(
    "SOURCE_COMMIT",
    "COOLIFY_SOURCE_COMMIT",
    "VERCEL_GIT_COMMIT_SHA",
    "NEXT_PUBLIC_COMMIT_SHA",
    "GIT_COMMIT_SHA"
  ),
  branch: readOptionalEnv("COOLIFY_BRANCH", "VERCEL_GIT_COMMIT_REF", "NEXT_PUBLIC_BRANCH"),
  deployedAt: readOptionalEnv("DEPLOYED_AT", "NEXT_PUBLIC_DEPLOYED_AT", "VERCEL_DEPLOYMENT_CREATED_AT"),
  resendApiKey: readOptionalEnv("RESEND_API_KEY"),
  resendFromEmail: readOptionalEnv("RESEND_FROM_EMAIL") ?? "jacob@darlingmartech.com",
  contactToEmail: readOptionalEnv("CONTACT_TO_EMAIL") ?? "jacob@darlingmartech.com",
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
  plausibleDomain: readOptionalEnv("NEXT_PUBLIC_PLAUSIBLE_DOMAIN"),
  appBaseUrl: readOptionalEnv("APP_BASE_URL"),
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
