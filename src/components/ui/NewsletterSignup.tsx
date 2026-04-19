"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type NewsletterSignupProps = {
  /** Defaults to resources hub copy. */
  headline?: string;
  /** Tighter strip for footer placement. */
  compact?: boolean;
};

export function NewsletterSignup({ headline, compact }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const title = headline ?? "One martech insight per week. No filler.";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // UI-only strip — no API call (see NewsletterEmailForm for live signup).
  }

  return (
    <div
      className={cn(
        "rounded-4xl border border-[#F5F4F0]/10 bg-[#13131A]/50",
        compact ? "px-5 py-6 md:px-8 md:py-7" : "px-6 py-8 md:px-10 md:py-10"
      )}
    >
      <p
        className={cn(
          "font-display font-semibold text-[#F5F4F0]",
          compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"
        )}
      >
        {title}
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-[#F5F4F0]/10 bg-[#18181F] px-4 py-3 text-sm text-[#F5F4F0] outline-none transition-colors placeholder:text-[#F5F4F0]/35 focus:border-[#F05A28]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-[#F05A28] px-6 py-3 text-sm font-bold text-[#0C0C0E] transition-colors hover:bg-[#ff6d40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13131A]"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
