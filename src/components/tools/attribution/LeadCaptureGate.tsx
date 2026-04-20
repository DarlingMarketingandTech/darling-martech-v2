"use client";

import { useState } from "react";

export default function LeadCaptureGate({ insightSeverity }: { insightSeverity: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "attribution-snapshot",
          email,
          intent: "Attribution Snapshot Output - Requesting Measurement Gap Report",
          problemCluster: "pipeline-not-predictable",
        }),
      });
      if (!res.ok) {
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-8 rounded border-l-4 border-[#0FD9C8] bg-[#161618] p-6">
        <h4 className="mb-2 font-bold text-white font-display">Report Unlocked & Sent</h4>
        <p className="text-sm text-gray-400">Check your inbox shortly. Next step: let&apos;s get your actual tracking fixed.</p>
      </div>
    );
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#161618] p-8">
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 blur-3xl opacity-20 ${insightSeverity === "high" ? "bg-[#F05A28]" : "bg-white"}`}
      />

      <h3 className="mb-2 font-display text-2xl font-bold text-white">Want the full Measurement Gap report?</h3>
      <p className="mb-6 text-sm text-gray-400">
        Enter your email to save these results and get a step-by-step breakdown of how to fix attribution tracking in Google and Meta so
        you can trust your numbers.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Where should I send it?"
          className="flex-1 rounded-md border border-white/20 bg-black px-4 py-3 text-white outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-[#F05A28] px-6 py-3 font-bold text-white transition-all hover:bg-opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Unlock Report →"}
        </button>
      </form>
    </div>
  );
}
