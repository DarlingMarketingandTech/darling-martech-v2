"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type EmailGateProps = {
  toolName: string;
  onSubmit: (payload: { firstName: string; email: string }) => Promise<void>;
};

export function EmailGate({ toolName, onSubmit }: EmailGateProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage(null);

    try {
      await onSubmit({ firstName, email });
      setStatus("success");
      setMessage(`Results from ${toolName} are ready. I also sent them to your inbox.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="surface-card rounded-[2rem] p-7 md:p-8">
      <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">Get the result</p>
      <h2 className="font-display mt-4 text-3xl font-semibold">Send it to yourself so it doesn&apos;t disappear.</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#F5F4F0]/72">
        You&apos;ll get the result immediately, plus a clean follow-up email so you can come back to it when you&apos;re ready.
      </p>
      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">First name</span>
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            placeholder="Jacob"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-[#F5F4F0]/62">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[1.25rem] border border-[#F5F4F0]/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]"
            placeholder="you@company.com"
          />
        </label>
        <div className="md:col-span-2">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send me the result"}
          </Button>
        </div>
        {message ? (
          <p className={status === "error" ? "text-sm text-[#F05A28]" : "text-sm text-[#0FD9C8]"}>{message}</p>
        ) : null}
      </form>
    </section>
  );
}
