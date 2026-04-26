"use client";

import { useEffect, useMemo, useState } from "react";
import { captureClientEvent } from "@/lib/analytics";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/button";

type ContactIntent = {
  label: string;
  clarifier: string;
  prefill: string;
};

type BudgetOption = { value: string; label: string };

const fieldClassName =
  "rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]";

type ContactFormProps = {
  intents: ContactIntent[];
  selectedIntent: string;
  formSectionLabel: string;
  budgetOptions: BudgetOption[];
  budgetIntentLabel: string;
  fitExpectations: string[];
};

export function ContactForm({
  intents,
  selectedIntent,
  formSectionLabel,
  budgetOptions,
  budgetIntentLabel,
  fitExpectations,
}: ContactFormProps) {
  const selected = useMemo(
    () => intents.find((intent) => intent.label === selectedIntent) ?? intents[0],
    [intents, selectedIntent]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [linkedin, setLinkedin] = useState("");
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
    const linkedinLine = linkedin.trim() ? `\n\nLinkedIn profile: ${linkedin.trim()}` : "";

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company: company.trim() || undefined,
        message: `${message}${budgetLine}${linkedinLine}`,
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
    setResponseMessage(null);
    captureClientEvent("contact_form_submitted", { intent: selected.label });
    setName("");
    setEmail("");
    setCompany("");
    setLinkedin("");
    setBudget("");
  }

  if (status === "success") {
    return (
      <div
        id="contact-form"
        className="surface-card rounded-4xl border border-[#0FD9C8]/25 bg-[#0FD9C8]/6 p-8 md:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="text-2xl text-[#0FD9C8]" aria-hidden>
          ✓
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-[#F5F4F0]">Message received.</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-[#F5F4F0]/72">
          I read every message personally. You&apos;ll hear back within one business day — usually the same day.
        </p>
      </div>
    );
  }

  return (
    <form id="contact-form" className="surface-card rounded-4xl p-7 md:p-8" onSubmit={handleSubmit}>
      <p className="text-sm text-[#F5F4F0]/55">{formSectionLabel}</p>
      <div className="mt-4 rounded-2xl border border-[#0FD9C8]/22 bg-[#0FD9C8]/6 px-4 py-4">
        <p className="meta-label text-[#0FD9C8]">Faster path</p>
        <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/70">
          If you prefer less typing, book directly and share context live in 30 minutes.
        </p>
        <div className="mt-3">
          <Button href={siteConfig.calComLink} size="sm">
            Book a diagnostic call →
          </Button>
        </div>
        <p className="mt-3 text-xs text-[#F5F4F0]/52">
          The direct booking link is the fastest path if you prefer to skip the form.
        </p>
      </div>
      <div className="mt-4 rounded-2xl border border-[#F5F4F0]/12 bg-[#13131A]/45 px-4 py-4">
        <p className="meta-label text-[#0FD9C8]">Fit and response expectations</p>
        <ul className="mt-3 space-y-2">
          {fitExpectations.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-[#F5F4F0]/68">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {status === "error" && responseMessage ? (
        <p className="mt-4 text-sm text-[#F05A28]" role="alert">
          {responseMessage}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Your name</span>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="What should I call you?"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClassName}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Your email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Where should I reply?"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2">
        <span className="text-sm text-[#F5F4F0]/62">Your company (optional)</span>
        <input
          name="organization"
          autoComplete="organization"
          placeholder="If relevant"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className={fieldClassName}
        />
      </label>

      <label className="mt-4 grid gap-2">
        <span className="text-sm text-[#F5F4F0]/62">LinkedIn profile (optional)</span>
        <input
          type="url"
          name="linkedin"
          autoComplete="url"
          inputMode="url"
          placeholder="https://www.linkedin.com/in/..."
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
          className={fieldClassName}
        />
      </label>

      {showBudget ? (
        <label className="mt-4 grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Approximate monthly budget range</span>
          <span className="text-xs text-[#F5F4F0]/45">This helps scope accurately — no pressure if you&apos;re not sure yet.</span>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={fieldClassName}>
            {budgetOptions.map((o) => (
              <option key={o.value || "unset"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-[#F5F4F0]/45">
            Estimate only. This is used for scoping context, not a commitment.
          </span>
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
          className={fieldClassName}
        />
      </label>

      <div className="mt-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-[#F5F4F0]/72">
            No obligation
          </span>
          <span className="rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-[#F5F4F0]/72">
            Human reply
          </span>
          <span className="rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-[#F5F4F0]/72">
            1 business day
          </span>
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-[#F05A28] px-7 py-3 text-sm font-bold text-[#0C0C0E] shadow-[0_14px_34px_rgba(240,90,40,0.24)] transition-colors hover:bg-[#ff6d40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Send it →"}
        </button>
        <p className="mt-3 text-xs text-[#F5F4F0]/50">I reply within one business day. Usually same day.</p>
      </div>
    </form>
  );
}
