"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { geoAuditFormCopy } from "@/data/geo-readiness-auditor";
import { captureClientEvent } from "@/lib/analytics";
import type { GeoAuditResponse } from "@/types";

const NOTE_MAX = 300;

type GeoAuditEmailFormProps = {
  targetUrl: string;
  audit: GeoAuditResponse;
};

export function GeoAuditEmailForm({ targetUrl, audit }: GeoAuditEmailFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage(null);

    try {
      const response = await fetch("/api/tools/geo-audit/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company.trim() || undefined,
          note: note.trim().slice(0, NOTE_MAX) || undefined,
          website: honeypot.trim() || undefined,
          targetUrl,
          audit,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; mode?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send the report.");
      }

      if (data.mode === "ignored") {
        setStatus("success");
        setMessage("Request received.");
        return;
      }

      if (data.mode === "mock") {
        setStatus("success");
        setMessage(data.message ?? "Live email is not configured here — your audit still ran in the browser.");
        captureClientEvent("geo_audit_report_requested", { mode: "mock", targetUrl });
        return;
      }

      setStatus("success");
      setMessage("Check your inbox — the full report is on the way.");
      captureClientEvent("geo_audit_report_requested", { mode: "live", targetUrl });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="surface-card rounded-[2rem] p-7 md:p-8">
      <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">{geoAuditFormCopy.sectionEyebrow}</p>
      <h2 className="font-display mt-4 text-3xl font-semibold">{geoAuditFormCopy.title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#F5F4F0]/72">{geoAuditFormCopy.body}</p>

      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="absolute -left-[9999px] h-px w-px overflow-hidden" htmlFor="geo-audit-honeypot">
          {geoAuditFormCopy.honeypotLabel}
          <input
            id="geo-audit-honeypot"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>

        <label className="grid gap-2 md:col-span-1">
          <span className="text-sm text-[#F5F4F0]/62">{geoAuditFormCopy.nameLabel}</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            placeholder="Jordan Smith"
            maxLength={120}
          />
        </label>

        <label className="grid gap-2 md:col-span-1">
          <span className="text-sm text-[#F5F4F0]/62">{geoAuditFormCopy.emailLabel}</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            placeholder="you@company.com"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-[#F5F4F0]/62">{geoAuditFormCopy.companyLabel}</span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            placeholder="Acme Dental"
          />
        </label>

        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-[#F5F4F0]/62">{geoAuditFormCopy.noteLabel}</span>
          <textarea
            value={note}
            maxLength={NOTE_MAX}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            className="resize-y rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            placeholder="e.g. citations drift between GBP and the site"
          />
          <span className="text-xs text-[#F5F4F0]/40">{note.length}/{NOTE_MAX}</span>
        </label>

        <div className="md:col-span-2">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? geoAuditFormCopy.submitting : geoAuditFormCopy.submit}
          </Button>
        </div>

        {message ? (
          <p className={`md:col-span-2 text-sm ${status === "error" ? "text-[#F05A28]" : "text-[#0FD9C8]"}`}>{message}</p>
        ) : null}
      </form>
    </section>
  );
}
