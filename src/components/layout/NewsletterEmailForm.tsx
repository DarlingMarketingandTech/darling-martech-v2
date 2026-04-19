"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsletterEmailFormProps = {
  /** Optional layout tweaks for homepage band vs footer */
  variant?: "default" | "band";
  className?: string;
};

export function NewsletterEmailForm({ variant = "default", className }: NewsletterEmailFormProps) {
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

  const isBand = variant === "band";

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <div className={cn("flex flex-col gap-2", isBand ? "sm:flex-row sm:items-stretch" : "sm:flex-row")}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className={cn(
            "min-h-11 flex-1 rounded-xl border border-[#F5F4F0]/12 bg-[#0C0C0E] px-4 text-sm text-[#F5F4F0] placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]/50 focus:outline-none",
            isBand && "md:min-h-12 md:text-base",
          )}
          disabled={status === "loading"}
        />
        <Button type="submit" disabled={status === "loading"} size={isBand ? "lg" : "md"} className={cn(isBand && "shrink-0")}>
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
