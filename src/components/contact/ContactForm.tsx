"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { captureClientEvent } from "@/lib/analytics";

type ContactIntent = {
  label: string;
  clarifier: string;
  prefill: string;
};

type ContactFormProps = {
  intents: ContactIntent[];
  selectedIntent: string;
};

export function ContactForm({ intents, selectedIntent }: ContactFormProps) {
  const selected = useMemo(
    () => intents.find((intent) => intent.label === selectedIntent) ?? intents[0],
    [intents, selectedIntent]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(selected.prefill);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(selected.prefill);
  }, [selected.prefill]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setResponseMessage(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        intent: selected.label,
      }),
    });

    const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok) {
      setStatus("error");
      setResponseMessage(payload.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setResponseMessage(payload.message ?? "Message received. Jacob will respond directly.");
    captureClientEvent("contact_form_submitted", { intent: selected.label });
    setName("");
    setEmail("");
    setCompany("");
  }

  return (
    <form className="surface-card rounded-4xl p-7 md:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Name</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2">
        <span className="text-sm text-[#F5F4F0]/62">Company</span>
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
        />
      </label>

      <label className="mt-4 grid gap-2">
        <span className="text-sm text-[#F5F4F0]/62">What&apos;s going on?</span>
        <textarea
          required
          rows={7}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>
        <p className="text-sm text-[#F5F4F0]/56">No automation theater. You send it. I read it.</p>
      </div>

      {responseMessage ? (
        <p className={status === "error" ? "mt-4 text-sm text-[#F05A28]" : "mt-4 text-sm text-[#0FD9C8]"}>
          {responseMessage}
        </p>
      ) : null}
    </form>
  );
}
