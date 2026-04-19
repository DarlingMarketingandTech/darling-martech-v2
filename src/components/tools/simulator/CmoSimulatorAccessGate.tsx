"use client";

import { useEffect, useState } from "react";
import { CMO_SIMULATOR_SESSION_KEY } from "@/data/tools/simulator";
import { trackToolEvent } from "@/lib/tools/analytics-events";
import { CmoSimulatorEmbed } from "./CmoSimulatorEmbed";

export function CmoSimulatorAccessGate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(CMO_SIMULATOR_SESSION_KEY)) {
        setUnlocked(true);
      }
    } catch {
      // sessionStorage may be unavailable in some browsers; silently ignore.
    }
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    trackToolEvent("lead_gate_submitted", { toolSlug: "cmo-simulator" });

    try {
      const response = await fetch("/api/tools/cmo-simulator-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "We couldn't launch the simulator. Please try again.");
      }

      try {
        sessionStorage.setItem(CMO_SIMULATOR_SESSION_KEY, "1");
      } catch {
        // ignore storage failures
      }
      trackToolEvent("cmo_simulator_unlocked", { toolSlug: "cmo-simulator" });
      setUnlocked(true);
    } catch (accessError) {
      setError(accessError instanceof Error ? accessError.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  if (unlocked) {
    return (
      <div className="space-y-6">
        <header className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
            Simulation experience
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
            Play the CMO Simulator
          </h1>
          <p className="text-base leading-7 text-[#F5F4F0]/68">
            This is a standalone strategy simulation. It is separate from the diagnostic tool system and is here to
            let you explore tradeoffs, priorities, and operator thinking in a more open-ended format.
          </p>
        </header>
        <CmoSimulatorEmbed />
      </div>
    );
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
      <header className="max-w-2xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
          Simulation experience
        </p>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          Play the CMO Simulator
        </h1>
        <p className="text-lg leading-8 text-[#F5F4F0]/72">
          This is a standalone strategy simulation. It is separate from the diagnostic tool system and is here to
          let you explore tradeoffs, priorities, and operator thinking in a more open-ended format.
        </p>
        <ul className="space-y-2 text-sm leading-6 text-[#F5F4F0]/58">
          <li>— Runs in its own deployment, loaded inline below.</li>
          <li>— Progress is held inside the simulator, not this page.</li>
          <li>— You can also open it full screen once access is granted.</li>
        </ul>
      </header>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-3xl border border-white/10 bg-[#13131A] p-6 md:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#F05A28]">Launch</p>
        <h2 className="font-display text-2xl font-semibold text-[#F5F4F0]">Launch the simulator</h2>
        <p className="text-sm leading-6 text-[#F5F4F0]/64">
          Drop your name and email and I&apos;ll open the simulation. No login wall. No weird sequence. Just access.
        </p>
        <input
          className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label="Your name"
        />
        <input
          required
          type="email"
          className="w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[#F05A28] px-5 py-3 text-sm font-semibold text-[#0C0C0E] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Launching..." : "Launch simulator"}
        </button>
        <p className="text-xs text-[#F5F4F0]/48">No spam. No sequence. Just access to the simulation.</p>
        {error ? <p className="text-sm text-[#F05A28]">{error}</p> : null}
      </form>
    </section>
  );
}
