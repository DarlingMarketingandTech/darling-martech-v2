"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Database, BarChart3, Download } from "lucide-react";
import ModelBar from "./ModelBar";
import LeadCaptureGate from "./LeadCaptureGate";
import { calculateModels, type AttributionResults } from "@/lib/tools/attribution/attributionLogic";
import { processAttributionCsv } from "@/lib/tools/attribution/parseCsv";
import { generateOperatorInsight } from "@/lib/tools/attribution/generateInsight";

type AdPlatform = "google" | "meta";

const TEMPLATE_PATHS: Record<AdPlatform, { href: string; download: string }> = {
  google: {
    href: "/templates/attribution-snapshot-google-ads.csv",
    download: "attribution-snapshot-google-ads-template.csv",
  },
  meta: {
    href: "/templates/attribution-snapshot-meta.csv",
    download: "attribution-snapshot-meta-template.csv",
  },
};

const COLUMN_TAGS = ["Date", "Conversions", "Conversion value", "Click ID"] as const;

export default function AttributionSnapshotEngine() {
  const [platform, setPlatform] = useState<AdPlatform>("google");
  const [results, setResults] = useState<AttributionResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const template = TEMPLATE_PATHS[platform];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setError(null);
      const data = await processAttributionCsv(file);
      setResults(calculateModels(data));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to parse CSV");
    }
  };

  const loadDemo = () => {
    setError(null);
    setResults({
      firstTouch: 4550,
      lastTouch: 1800,
      linear: 3175,
      timeDecay: 2200,
      averageDaysToClose: 14.5,
      averageTouchpoints: 4.2,
      totalJourneys: 124,
    });
  };

  const resetAll = () => {
    setError(null);
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const maxValue = results ? Math.max(results.firstTouch, results.lastTouch, results.linear, results.timeDecay) : 0;
  const insight = results ? generateOperatorInsight(results.firstTouch, results.lastTouch) : null;

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Input + interpretation */}
      {!results && (
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#161618] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <p className="font-mono text-xs tracking-[0.24em] text-[#F05A28] uppercase">Input source</p>
              <Database className="h-5 w-5 shrink-0 text-[#F5F4F0]/35" aria-hidden />
            </div>

            <h2 className="mt-6 font-display text-xl font-semibold text-white">Choose a CSV template</h2>

            <div className="mt-4 inline-flex rounded-full bg-black/50 p-1 ring-1 ring-white/10">
              <button
                type="button"
                onClick={() => setPlatform("google")}
                aria-pressed={platform === "google"}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  platform === "google"
                    ? "bg-[#F05A28] text-white shadow-sm"
                    : "text-[#F5F4F0]/50 hover:text-[#F5F4F0]/80"
                }`}
              >
                Google Ads
              </button>
              <button
                type="button"
                onClick={() => setPlatform("meta")}
                aria-pressed={platform === "meta"}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  platform === "meta"
                    ? "bg-[#F05A28] text-white shadow-sm"
                    : "text-[#F5F4F0]/50 hover:text-[#F5F4F0]/80"
                }`}
              >
                Meta Ads
              </button>
            </div>

            <div className="mt-8">
              <p className="font-mono text-xs tracking-[0.2em] text-[#F05A28] uppercase">Template</p>
              <p className="mt-2 text-sm text-[#F5F4F0]/56">Use this column structure.</p>
              <a
                href={template.href}
                download={template.download}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#F05A28] px-4 py-2.5 text-sm font-semibold text-[#F05A28] transition-colors hover:bg-[#F05A28]/10"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download template
              </a>
              <div className="mt-4 flex flex-wrap gap-2">
                {COLUMN_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-xs text-[#F5F4F0]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className="mt-8 flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#F05A28]/70 bg-black/20 px-6 py-12 transition-colors hover:border-[#F05A28] hover:bg-black/30"
            >
              <Upload className="mb-4 h-9 w-9 text-[#F05A28]" aria-hidden />
              <p className="text-center font-display text-lg font-semibold text-white">Upload a CSV export</p>
              <p className="mt-2 max-w-sm text-center text-sm leading-6 text-[#F5F4F0]/56">
                Use a campaign export that includes Date, Conversions, Conversion value, and Click ID.
              </p>
              <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={loadDemo}
                className="rounded-lg bg-[#F05A28] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Load demo journeys
              </button>
              <button type="button" onClick={resetAll} className="text-sm text-[#F5F4F0]/45 underline-offset-4 hover:text-white hover:underline">
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#161618] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <p className="font-mono text-xs tracking-[0.24em] text-[#F05A28] uppercase">Interpretation</p>
              <BarChart3 className="h-5 w-5 shrink-0 text-[#F5F4F0]/35" aria-hidden />
            </div>
            <h2 className="mt-6 font-display text-xl font-semibold leading-snug text-white">
              Read it like an operator, not an attribution vendor.
            </h2>
            <ul className="mt-8 flex flex-1 flex-col divide-y divide-white/10">
              <li className="flex flex-col gap-1 py-5 first:pt-0">
                <span className="font-semibold text-white">Agreement matters</span>
                <span className="text-sm leading-6 text-[#F5F4F0]/60">
                  If multiple models still point to the same channel, that signal is usually worth trusting more.
                </span>
              </li>
              <li className="flex flex-col gap-1 py-5">
                <span className="font-semibold text-white">Spread matters</span>
                <span className="text-sm leading-6 text-[#F5F4F0]/60">
                  If a channel swings hard between models, your measurement or journey stitching is likely still thin.
                </span>
              </li>
              <li className="flex flex-col gap-1 py-5">
                <span className="font-semibold text-white">Context matters</span>
                <span className="text-sm leading-6 text-[#F5F4F0]/60">
                  This MVP compares model logic against exported rows. It does not claim user-level or warehouse-grade attribution.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {error && <div className="mb-8 rounded border border-red-500 bg-red-900/50 p-4 text-red-200">{error}</div>}

      {/* Output Stage */}
      {results && insight && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid gap-12 md:grid-cols-5"
        >
          <div className="rounded-xl border border-white/5 bg-[#0f0f11] p-8 md:col-span-3">
            <h3 className="mb-6 border-b border-white/10 pb-4 font-display text-xl font-bold text-white">Revenue Credit by Model</h3>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-[#161618] p-4">
                <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">Sales Velocity</span>
                <p className="mt-1 text-2xl font-bold text-white">
                  {results.averageDaysToClose.toFixed(1)} <span className="text-base font-normal text-gray-500">days to close</span>
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#161618] p-4">
                <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">Journey Density</span>
                <p className="mt-1 text-2xl font-bold text-white">
                  {results.averageTouchpoints.toFixed(1)} <span className="text-base font-normal text-gray-500">touches per lead</span>
                </p>
              </div>
            </div>

            <ModelBar label="First-Touch" value={results.firstTouch} maxValue={maxValue} color="#F05A28" />
            <ModelBar label="Linear" value={results.linear} maxValue={maxValue} color="#a1a1aa" />
            <ModelBar label="Time-Decay" value={results.timeDecay} maxValue={maxValue} color="#71717a" />
            <ModelBar label="Last-Touch" value={results.lastTouch} maxValue={maxValue} color="#52525b" />

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={resetAll} className="text-sm text-gray-500 underline hover:text-white">
                Start over
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center md:col-span-2">
            <div className="border-l-2 border-[#F05A28] py-2 pl-6">
              <h4 className="mb-3 font-mono text-sm text-[#F05A28] uppercase">Operator Insight</h4>
              <h5 className="mb-2 text-xl font-bold text-white">{insight.title}</h5>
              <p className="text-sm leading-relaxed text-gray-300">{insight.message}</p>
            </div>

            <LeadCaptureGate insightSeverity={insight.severity} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
