import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools | Darling MarTech",
  description: "The tech stack and frameworks we use to build smarter marketing systems.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm text-foreground/50 hover:text-foreground transition-colors mb-10 inline-block"
      >
        ← Back home
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        Tools
      </h1>

      <p className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-2xl">
        Every recommendation we make is built on a tested, purposeful stack.
        This hub documents the tools, frameworks, and integrations we rely on
        to deliver scalable marketing systems.
      </p>

      <div className="rounded-xl border border-dashed border-foreground/20 p-10 text-center text-foreground/40">
        <p className="font-[family-name:var(--font-mono)] text-sm">
          Tool categories coming soon
        </p>
      </div>
    </main>
  );
}
