import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proof | Darling MarTech",
  description: "Real results, honest data. See how Darling MarTech delivers measurable outcomes.",
};

export default function ProofPage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm text-foreground/50 hover:text-foreground transition-colors mb-10 inline-block"
      >
        ← Back home
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        Proof
      </h1>

      <p className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-2xl">
        Talk is cheap. This hub is where outcomes live — case studies, metrics,
        and documented results that show what&rsquo;s actually possible when
        strategy meets execution.
      </p>

      <div className="rounded-xl border border-dashed border-foreground/20 p-10 text-center text-foreground/40">
        <p className="font-[family-name:var(--font-mono)] text-sm">
          Case studies coming soon
        </p>
      </div>
    </main>
  );
}
