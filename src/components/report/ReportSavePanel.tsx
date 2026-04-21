"use client";

import { CheckCircle2 } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

const storageKey = (reportId: string) => `str-report-saved:${reportId}`;

type ReportSavePanelProps = {
  reportId: string;
  accent: string;
};

type PanelState = "idle" | "submitting" | "success" | "error";

export function ReportSavePanel({ reportId, accent }: ReportSavePanelProps) {
  const formId = useId();
  const emailFieldId = `${formId}-email`;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<PanelState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey(reportId)) === "1") {
        setState("success");
      }
    } catch {
      /* private mode */
    }
  }, [reportId]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);
      setState("submitting");

      try {
        const res = await fetch("/api/report-save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportId, email }),
        });
        const data: unknown = await res.json().catch(() => null);
        const ok = typeof data === "object" && data !== null && "ok" in data && (data as { ok: boolean }).ok === true;
        const err =
          typeof data === "object" && data !== null && "error" in data && typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : null;

        if (!res.ok || !ok) {
          setState("error");
          setErrorMessage(err ?? "Something went wrong. Try again.");
          return;
        }

        try {
          sessionStorage.setItem(storageKey(reportId), "1");
        } catch {
          /* ignore */
        }
        setState("success");
      } catch {
        setState("error");
        setErrorMessage("Network error. Check your connection and try again.");
      }
    },
    [email, reportId]
  );

  if (state === "success") {
    return (
      <section
        aria-labelledby="save-report-heading"
        className="relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/55 px-6 py-9 sm:px-10 sm:py-11"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.12]"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <CheckCircle2 className="h-9 w-9 shrink-0 text-[#0FD9C8]" aria-hidden />
          <div className="min-w-0 space-y-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0FD9C8]/90">Saved</p>
            <h2 id="save-report-heading" className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-[1.65rem]">
              This report is on file
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#F5F4F0]/58">
              Bookmark this URL anytime — access stays open without a password. When sign-in ships for saved diagnostics, this
              completion will be ready to attach to your account automatically.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="save-report-heading"
      className="relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-6 py-9 sm:px-10 sm:py-11"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-[0.08]"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 68%)` }}
        aria-hidden
      />
      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-end lg:gap-12">
        <div className="space-y-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5F4F0]/38">Keep this diagnostic</p>
          <h2 id="save-report-heading" className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-[1.65rem]">
            Save this report
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#F5F4F0]/52">
            Attach your email so this teardown stays recoverable as we add return links and account history. No newsletter, no
            gating — the page stays open either way.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-stretch lg:flex-col">
          <div className="min-w-0 flex-1">
            <label htmlFor={emailFieldId} className="sr-only">
              Email
            </label>
            <input
              id={emailFieldId}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              disabled={state === "submitting"}
              className={cn(
                "h-12 w-full rounded-xl border bg-[#0C0C0E]/65 px-4 text-sm text-[#F5F4F0] outline-none transition",
                "placeholder:text-[#F5F4F0]/28",
                "border-[#F5F4F0]/12 focus:border-[#0FD9C8]/45 focus:ring-1 focus:ring-[#0FD9C8]/25",
                state === "submitting" && "opacity-60"
              )}
            />
          </div>
          <button
            type="submit"
            disabled={state === "submitting"}
            className={cn(
              "h-12 shrink-0 rounded-xl px-6 text-sm font-medium tracking-wide transition sm:px-7",
              "bg-[#F5F4F0] text-[#0C0C0E] hover:bg-[#F5F4F0]/92",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {state === "submitting" ? "Saving…" : "Save this report"}
          </button>
        </form>
      </div>

      {state === "error" && errorMessage ? (
        <p className="relative mt-4 text-sm text-[#F05A28]/90" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
