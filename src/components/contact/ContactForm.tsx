"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { captureClientEvent } from "@/lib/analytics";

type ContactIntent = {
  label: string;
  clarifier: string;
  prefill: string;
};

type BudgetOption = { value: string; label: string };

type ContactFormProps = {
  intents: ContactIntent[];
  selectedIntent: string;
  formSectionLabel: string;
  budgetOptions: BudgetOption[];
  budgetIntentLabel: string;
};

export function ContactForm({
  intents,
  selectedIntent,
  formSectionLabel,
  budgetOptions,
  budgetIntentLabel,
}: ContactFormProps) {
  const selected = useMemo(
    () => intents.find((intent) => intent.label === selectedIntent) ?? intents[0],
    [intents, selectedIntent]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(selected.prefill);
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const showBudget = selected.label === budgetIntentLabel;

  useEffect(() => {
    setMessage(selected.prefill);
  }, [selected.prefill]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setResponseMessage(null);

    const budgetLine =
      showBudget && budget
        ? `\n\nApproximate monthly budget: ${budgetOptions.find((o) => o.value === budget)?.label ?? budget}`
        : "";

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message: `${message}${budgetLine}`,
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
    setBudget("");
  }

  return (
    <form id="contact-form" className="surface-card rounded-4xl p-7 md:p-8" onSubmit={handleSubmit}>
      <p className="text-sm text-[#F5F4F0]/55">{formSectionLabel}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Your name</span>
          <input
            required
            placeholder="What should I call you?"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Your email</span>
          <input
            required
            type="email"
            placeholder="Where should I reply?"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2">
        <span className="text-sm text-[#F5F4F0]/62">Your company (optional)</span>
        <input
          placeholder="If relevant"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]"
        />
      </label>

      {showBudget ? (
        <label className="mt-4 grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Approximate monthly budget range</span>
          <span className="text-xs text-[#F5F4F0]/45">This helps scope accurately — no pressure if you&apos;re not sure yet.</span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none focus:border-[#F05A28]"
          >
            {budgetOptions.map((o) => (
              <option key={o.value || "unset"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="mt-4 grid gap-2">
        <span className="text-sm text-[#F5F4F0]/62">What&apos;s going on?</span>
        <textarea
          required
          rows={7}
          placeholder="The more specific, the more useful my response will be. You do not have to have it all figured out — just tell me where you are."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]"
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send it →"}
        </Button>
        <p className="text-sm text-[#F5F4F0]/56">I reply within one business day. Usually the same day.</p>
      </div>

      {responseMessage ? (
        <p className={status === "error" ? "mt-4 text-sm text-[#F05A28]" : "mt-4 text-sm text-[#0FD9C8]"}>
          {responseMessage}
        </p>
      ) : null}
    </form>
  );
}
