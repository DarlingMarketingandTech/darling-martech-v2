import type { ToolLeadPayload } from "@/types/tools";

type ToolLeadApiSuccessResponse =
  | { ok: true; mode: "mock"; toolSlug: string }
  | { ok: true; mode: "live"; leadId: string; warnings: string[] };

type ToolLeadApiErrorResponse = {
  ok: false;
  error?: string;
};

export async function submitToolLead(payload: ToolLeadPayload) {
  const res = await fetch("/api/tool-leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await res.json().catch(() => null)) as
    | ToolLeadApiSuccessResponse
    | ToolLeadApiErrorResponse
    | null;

  if (!res.ok) {
    const message =
      body && typeof body === "object" && "error" in body && typeof body.error === "string"
        ? body.error
        : "Could not save your result right now. Please try again.";
    throw new Error(message);
  }

  if (!body || typeof body !== "object" || !("ok" in body) || body.ok !== true) {
    throw new Error("Lead submission response was invalid.");
  }

  return body;
}
