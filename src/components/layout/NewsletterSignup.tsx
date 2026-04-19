"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-[#F5F4F0]/45">Newsletter</p>
      <p className="text-sm text-[#F5F4F0]/55">One martech insight per week. No filler.</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="min-h-11 flex-1 rounded-xl border border-[#F5F4F0]/12 bg-[#0C0C0E] px-4 text-sm text-[#F5F4F0] placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]/50 focus:outline-none"
          disabled={status === "loading"}
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "…" : "Subscribe"}
        </Button>
      </div>
      {status === "done" ? (
        <p className="text-sm text-[#0FD9C8]">You&apos;re on the list.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-[#f87171]">Something went wrong. Try again or email directly.</p>
      ) : null}
    </form>
  );
}
