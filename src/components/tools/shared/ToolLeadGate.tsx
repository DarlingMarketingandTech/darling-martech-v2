"use client";

import { useState } from "react";
import { submitToolLead } from "@/lib/tools/lead-gate";
import { trackToolEvent } from "@/lib/tools/analytics-events";

interface ToolLeadGateProps {
  toolSlug: string;
  resultSummary?: Record<string, unknown>;
  heading?: string;
  body?: string;
  successMessage?: string;
  buttonLabel?: string;
  reassurance?: string;
}

export function ToolLeadGate({
  toolSlug,
  resultSummary,
  heading = "Get the full report",
  body = "I'll email a clean, shareable version plus the next best step for your situation.",
  successMessage = "Thanks — your result has been saved. Check your inbox for the full report.",
  buttonLabel = "Unlock full result",
  reassurance = "No spam. No sequence. Just the result.",
}: ToolLeadGateProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    trackToolEvent("lead_gate_submitted", { toolSlug });

    try {
      await submitToolLead({
        toolSlug,
        email,
        name: name || undefined,
        company: company || undefined,
        resultSummary,
      });
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#F05A28]/40 bg-[#13131A] p-6 text-[#F5F4F0]">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">Sent</p>
        <p className="mt-3 text-base leading-7">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => trackToolEvent("lead_gate_opened", { toolSlug })}
      className="space-y-4 rounded-2xl border border-[#F05A28]/30 bg-[#13131A] p-6"
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-[#F5F4F0]">{heading}</h3>
        <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/64">{body}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label="Your name"
        />
        <input
          className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
          placeholder="Company (optional)"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          aria-label="Company"
        />
      </div>
      <input
        type="email"
        required
        className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl bg-[#F05A28] px-5 py-3 text-sm font-semibold text-[#0C0C0E] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending..." : buttonLabel}
      </button>
      {reassurance ? <p className="text-xs text-[#F5F4F0]/48">{reassurance}</p> : null}
      {error ? <p className="text-sm text-[#F05A28]">{error}</p> : null}
    </form>
  );
}
