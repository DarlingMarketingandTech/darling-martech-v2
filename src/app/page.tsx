import Link from "next/link";

const hubs = [
  {
    href: "/problems",
    label: "Problems",
    description: "Diagnose the real marketing and tech challenges holding you back.",
  },
  {
    href: "/proof",
    label: "Proof",
    description: "See the results that matter — real outcomes, honest data.",
  },
  {
    href: "/tools",
    label: "Tools",
    description: "Explore the stack we use to build and scale smarter systems.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 gap-16">
      <section className="text-center max-w-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Darling MarTech
        </h1>
        <p className="text-lg text-foreground/70 leading-relaxed">
          Before we prescribe, we diagnose. Tell us where it hurts — we&rsquo;ll
          show you exactly what&rsquo;s broken and how to fix it.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {hubs.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-foreground/10 p-6 hover:border-foreground/30 transition-colors"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2 group-hover:underline">
              {label} →
            </h2>
            <p className="text-sm text-foreground/60">{description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
