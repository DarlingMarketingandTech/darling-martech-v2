import { appEnv, assertEnvPresent } from "@/lib/env";

type LoopsContactInput = {
  email: string;
  firstName?: string;
  source?: string;
  userGroup?: string;
  subscribed?: boolean;
  toolSlug?: string;
  resultLabel?: string;
};

export async function createLoopsContact(input: LoopsContactInput) {
  assertEnvPresent("Loops", {
    LOOPS_API_KEY: appEnv.loopsApiKey,
  });

  const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${appEnv.loopsApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      firstName: input.firstName,
      source: input.source,
      userGroup: input.userGroup,
      subscribed: input.subscribed,
      toolSlug: input.toolSlug,
      resultLabel: input.resultLabel,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Loops request failed with ${response.status}: ${errorText}`);
  }

  return response.json().catch(() => null);
}
