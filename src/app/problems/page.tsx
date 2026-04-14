import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Problems | Darling MarTech",
  description: "Diagnose the real marketing and technology challenges holding your business back.",
};

export default function ProblemsPage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm text-foreground/50 hover:text-foreground transition-colors mb-10 inline-block"
      >
        ← Back home
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        Problems
      </h1>

      <p className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-2xl">
        Most marketing problems aren&rsquo;t what they appear to be. This hub
        is a diagnostic starting point — identifying the root causes behind
        broken funnels, stalled growth, and wasted spend.
      </p>

      <div className="rounded-xl border border-dashed border-foreground/20 p-10 text-center text-foreground/40">
        <p className="font-[family-name:var(--font-mono)] text-sm">
          Problem categories coming soon
        </p>
      </div>
    </main>
  );
}
