import { Sparkles } from "lucide-react";

const highlights = [
  "See where different models agree",
  "Flag channels with unstable credit spread",
  "Use the result to scope better measurement work",
];

export function AttributionSnapshotHero() {
  return (
    <section className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
      <div>
        <p className="font-mono text-xs tracking-[0.28em] text-[#F5F4F0]/56 uppercase">
          <span className="text-[#F05A28]">Marketing</span> 2026
        </p>
        <h1 className="mt-4 font-display text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
          Attribution Snapshot
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-lg leading-8 text-[#F5F4F0]/88 italic md:text-xl md:leading-9">
          A fast, directional read on which channels look closer to revenue when you compare first-touch, last-touch, linear, and
          time-decay models side by side.
        </p>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[#F5F4F0]/64 md:text-lg md:leading-8">
          This is not a full attribution warehouse. It is a practical operator tool for spotting where the story changes depending on
          the model, where budget confidence is stronger, and where your reporting setup is still too thin to trust.
        </p>
      </div>

      <aside className="surface-card rounded-3xl border border-white/[0.08] p-6 md:p-8">
        <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-display text-2xl font-semibold text-[#F05A28]">4</p>
            <p className="mt-1 text-xs leading-5 text-[#F5F4F0]/56">model views compared</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-[#F05A28]">CSV</p>
            <p className="mt-1 text-xs leading-5 text-[#F5F4F0]/56">demo or ad export input</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-[#F05A28]">Fast</p>
            <p className="mt-1 text-xs leading-5 text-[#F5F4F0]/56">directional answer, not a rebuild</p>
          </div>
        </div>
        <ul className="mt-6 space-y-4">
          {highlights.map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-6 text-[#F5F4F0]/72">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#F5F4F0]/50" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
