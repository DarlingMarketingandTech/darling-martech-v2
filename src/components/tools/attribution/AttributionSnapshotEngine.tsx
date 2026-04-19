"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Play } from "lucide-react";
import ModelBar from "./ModelBar";
import LeadCaptureGate from "./LeadCaptureGate";
import { calculateModels, type AttributionResults } from "@/lib/tools/attribution/attributionLogic";
import { processAttributionCsv } from "@/lib/tools/attribution/parseCsv";
import { generateOperatorInsight } from "@/lib/tools/attribution/generateInsight";

export default function AttributionSnapshotEngine() {
  const [results, setResults] = useState<AttributionResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const maxValue = results ? Math.max(results.firstTouch, results.lastTouch, results.linear, results.timeDecay) : 0;
  const insight = results ? generateOperatorInsight(results.firstTouch, results.lastTouch) : null;

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Input Stage */}
      {!results && (
        <div className="mb-12 grid gap-6 md:grid-cols-2">
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
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#161618] p-10 transition-colors hover:border-[#F05A28]"
          >
            <Upload className="mb-4 h-8 w-8 text-gray-400" />
            <h4 className="mb-2 font-bold text-white">Upload CSV Export</h4>
            <p className="text-center text-sm text-gray-400">Must include Date, Conversion Value, and Click ID.</p>
            <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={loadDemo}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                loadDemo();
              }
            }}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-transparent bg-[#161618] p-10 transition-colors hover:bg-[#1a1a1d]"
          >
            <Play className="mb-4 h-8 w-8 text-[#F05A28]" />
            <h4 className="mb-2 font-bold text-white">Load Demo Journeys</h4>
            <p className="text-center text-sm text-gray-400">See how the tool works with a pre-loaded sample dataset.</p>
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

            {/* Advanced Journey Insights */}
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

            <button type="button" onClick={() => setResults(null)} className="mt-6 text-sm text-gray-500 underline hover:text-white">
              Start over
            </button>
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
