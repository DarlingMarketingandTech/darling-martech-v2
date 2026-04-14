import { appEnv, assertEnvPresent } from "@/lib/env";

type N8nWebhookTarget = "contact" | "tool";

export async function sendToN8n(target: N8nWebhookTarget, payload: Record<string, unknown>) {
  const webhookUrl =
    target === "contact" ? appEnv.n8nWebhookUrlContact : appEnv.n8nWebhookUrlTool;

  assertEnvPresent(`n8n ${target} webhook`, {
    [target === "contact" ? "N8N_WEBHOOK_URL_CONTACT" : "N8N_WEBHOOK_URL_TOOL"]: webhookUrl,
  });

  const resolvedWebhookUrl = webhookUrl as string;

  const response = await fetch(resolvedWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`n8n ${target} webhook failed with ${response.status}: ${errorText}`);
  }
}
