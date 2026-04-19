import type { ToolLeadPayload } from "@/types/tools";

export async function submitToolLead(payload: ToolLeadPayload) {
  const res = await fetch("/api/tool-leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Lead submission failed");
  }

  return res.json() as Promise<{ ok: boolean }>;
}
