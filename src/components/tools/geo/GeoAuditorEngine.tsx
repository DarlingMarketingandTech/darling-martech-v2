"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Cpu, Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  GEO_AUDIT_CHECK_KEYS,
  geoAuditCheckLabels,
  geoAuditUiCopy,
  getGeoAuditOverviewLines,
} from "@/data/geo-readiness-auditor";
import { captureClientEvent } from "@/lib/analytics";
import type { GeoAuditCheckKey, GeoAuditResponse } from "@/types";
import { GeoAuditEmailForm } from "./GeoAuditEmailForm";

function isGeoAuditResponse(value: unknown): value is GeoAuditResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const v = value as Record<string, unknown>;
  if (typeof v.score !== "number" || !v.extractedData || !v.checks || !v.rawXray) {
    return false;
  }

  const extracted = v.extractedData as Record<string, unknown>;
  if (typeof extracted.metaDescription !== "string") {
    return false;
  }

  return true;
}

export function GeoAuditorEngine() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [results, setResults] = useState<GeoAuditResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [auditedUrl, setAuditedUrl] = useState("");

  const passedCount = useMemo(() => {
    if (!results) {
      return 0;
    }

    return GEO_AUDIT_CHECK_KEYS.filter((key) => results.checks[key].passed).length;
  }, [results]);

  const overviewLines = useMemo(() => {
    if (!results) {
      return [];
    }

    return getGeoAuditOverviewLines(results.score, passedCount, results.extractedData.entities[0]);
  }, [results, passedCount]);

  const scoreStroke = useMemo(() => {
    if (!results) {
      return 0;
    }

    return Math.round((results.score / 100) * 289);
  }, [results]);

  async function runAudit(event: React.FormEvent) {
    event.preventDefault();
    if (!url.trim()) {
      return;
    }

    const formattedUrl = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`;
    setUrl(formattedUrl);
    setAuditedUrl(formattedUrl);

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/tools/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const err = data as { error?: string };
        throw new Error(err.error ?? "Failed to analyze URL.");
      }

      if (!isGeoAuditResponse(data)) {
        throw new Error("Unexpected response from the audit service.");
      }

      setResults(data);
      setStatus("success");
      captureClientEvent("geo_audit_completed", { score: data.score, url: formattedUrl });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const scoreAccent = results && results.score > 70 ? "#22C55E" : "#F05A28";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="surface-card mb-10 rounded-[2rem] p-7 md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">{geoAuditUiCopy.inputEyebrow}</p>
        <form onSubmit={runAudit} className="mt-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F5F4F0]/40" />
            <input
              type="text"
              required
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder={geoAuditUiCopy.urlPlaceholder}
              className="w-full rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] py-4 pl-12 pr-4 font-mono text-sm text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            />
          </div>
          <Button type="submit" size="lg" disabled={status === "loading"} className="shrink-0 md:self-stretch">
            {status === "loading" ? geoAuditUiCopy.scanning : geoAuditUiCopy.runCta}
          </Button>
        </form>
        {status === "error" ? <p className="mt-4 text-sm text-[#F05A28]">{errorMessage}</p> : null}
      </div>

      {status === "success" && results ? (
        <div className="flex flex-col gap-10">
          <section className="surface-card rounded-[2rem] border border-[#F05A28]/25 p-7 md:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">{geoAuditUiCopy.overviewEyebrow}</p>
            <div className="mt-4 space-y-3 text-base leading-7 text-[#F5F4F0]/80">
              {overviewLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-[2rem] border border-[#0FD9C8]/20 p-7 md:p-8">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[#0FD9C8]" aria-hidden />
              <h2 className="font-display text-xl font-semibold text-[#F5F4F0]">{geoAuditUiCopy.intelligenceTitle}</h2>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#F5F4F0]/50">
                  {geoAuditUiCopy.entitiesLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {results.extractedData.entities.length > 0 ? (
                    results.extractedData.entities.map((entity) => (
                      <span
                        key={entity}
                        className="rounded-full border border-[#F5F4F0]/12 bg-[#101014] px-3 py-1 text-sm capitalize text-[#F5F4F0]"
                      >
                        {entity}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[#F05A28]">No clear term signals from visible text.</span>
                  )}
                </div>
                <p className="mt-3 text-xs italic text-[#F5F4F0]/45">{geoAuditUiCopy.entitiesHint}</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#F5F4F0]/50">{geoAuditUiCopy.h1Label}</p>
                <p className="mt-3 break-words rounded-[1rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 font-mono text-sm text-[#F5F4F0]">
                  &lt;h1&gt;{results.extractedData.h1}&lt;/h1&gt;
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-3">
            <section className="surface-band flex flex-col items-center justify-center rounded-[2rem] p-8 text-center md:col-span-1">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#F5F4F0]/50">
                {geoAuditUiCopy.scoreLabel}
              </span>
              <div className="relative mt-6 flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#13131A]">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#13131A" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke={scoreAccent}
                    strokeWidth="8"
                    strokeDasharray={`${scoreStroke} 289`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="font-display relative text-5xl font-semibold text-[#F5F4F0]">{results.score}</span>
              </div>
              <p className="mt-2 font-mono text-sm text-[#0FD9C8]">
                {passedCount}
                <span className="text-[#F5F4F0]/50">/6</span> {geoAuditUiCopy.passedChecksLabel}
              </p>
            </section>

            <section className="surface-card rounded-[2rem] p-7 md:col-span-2 md:p-8">
              <h2 className="font-display text-2xl font-semibold text-[#F5F4F0]">{geoAuditUiCopy.diagnosticsTitle}</h2>
              <div className="mt-6 space-y-4">
                {GEO_AUDIT_CHECK_KEYS.map((key: GeoAuditCheckKey) => {
                  const data = results.checks[key];
                  const label = geoAuditCheckLabels[key];

                  return (
                    <div
                      key={key}
                      className="flex items-start gap-4 rounded-2xl border border-[#F5F4F0]/8 bg-[#101014] p-4 md:p-5"
                    >
                      <div className="mt-0.5 shrink-0">
                        {data.passed ? (
                          <CheckCircle2 className="h-5 w-5 text-[#0FD9C8]" aria-hidden />
                        ) : data.score > 0 ? (
                          <AlertTriangle className="h-5 w-5 text-[#F05A28]" aria-hidden />
                        ) : (
                          <XCircle className="h-5 w-5 text-[#F05A28]" aria-hidden />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-[#F5F4F0]">{label.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#F5F4F0]/55">{label.whyItMatters}</p>
                      </div>
                      <div className="shrink-0 text-right font-mono text-sm text-[#F5F4F0]">
                        {data.score}
                        <span className="text-[#F5F4F0]/45">/{data.max}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <details className="surface-card rounded-[2rem] p-7 md:p-8">
            <summary className="cursor-pointer font-display text-lg font-semibold text-[#F5F4F0]">
              {geoAuditUiCopy.rawXrayTitle}
            </summary>
            <p className="mt-2 text-sm text-[#F5F4F0]/55">{geoAuditUiCopy.rawXrayHint}</p>
            <dl className="mt-6 space-y-5 font-mono text-xs leading-relaxed text-[#F5F4F0]/82">
              <div>
                <dt className="text-[#F05A28]">Title</dt>
                <dd className="mt-1 break-words">{results.extractedData.title}</dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">Meta description</dt>
                <dd className="mt-1 break-words">{results.extractedData.metaDescription}</dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">Canonical</dt>
                <dd className="mt-1 break-words">{results.rawXray.canonical ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">Meta robots</dt>
                <dd className="mt-1 break-words">{results.rawXray.metaRobots ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">OG title / description</dt>
                <dd className="mt-1 break-words">
                  {(results.rawXray.ogTitle ?? "—") + " / " + (results.rawXray.ogDescription ?? "—")}
                </dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">Twitter card</dt>
                <dd className="mt-1 break-words">{results.rawXray.twitterCard ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">JSON-LD</dt>
                <dd className="mt-1 break-words">
                  {results.rawXray.jsonLdBlockCount} block(s)
                  {results.rawXray.jsonLdTypes.length
                    ? ` — @type: ${results.rawXray.jsonLdTypes.join(", ")}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">Heading outline</dt>
                <dd className="mt-1 break-words">
                  {results.rawXray.headingOutline.length
                    ? results.rawXray.headingOutline.map((h) => `[H${h.level}] ${h.text}`).join(" · ")
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-[#F05A28]">Link counts</dt>
                <dd className="mt-1">
                  Internal {results.rawXray.stats.internalLinkCount} · External {results.rawXray.stats.externalLinkCount}{" "}
                  · Visible text ~{results.rawXray.stats.visibleTextChars} chars
                </dd>
              </div>
              {results.rawXray.jsonLdSnippet ? (
                <div>
                  <dt className="text-[#F05A28]">JSON-LD snippet (truncated)</dt>
                  <dd className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-[#F5F4F0]/10 bg-[#0C0C0E] p-3 text-[11px] text-[#F5F4F0]/70">
                    {results.rawXray.jsonLdSnippet}
                  </dd>
                </div>
              ) : null}
            </dl>
          </details>

          <GeoAuditEmailForm targetUrl={auditedUrl} audit={results} />
        </div>
      ) : null}
    </div>
  );
}
