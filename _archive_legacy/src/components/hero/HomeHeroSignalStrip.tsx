import { cn } from "@/lib/utils";

export type HomeHeroSignalItem = {
  value: string;
  label: string;
};

type HomeHeroSignalStripProps = {
  items: HomeHeroSignalItem[];
  className?: string;
};

/**
 * Compact verified-metric strip for the homepage hero — proof green for values only,
 * restrained typography, no motion.
 */
export function HomeHeroSignalStrip({ items, className }: HomeHeroSignalStripProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "relative border-t border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(19,19,26,0.55)_0%,rgba(12,12,14,0.08)_100%)] px-1 py-5 md:px-3 md:py-6",
        className
      )}
    >
      <p className="meta-label-accent mb-4 px-2 md:px-3">Verified signals</p>
      <ul className="grid gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#F5F4F0]/08">
        {items.map((item) => (
          <li key={item.label} className="px-2 sm:px-4 md:px-5">
            <p className="font-mono text-lg font-bold leading-none tracking-tight text-[#22C55E] md:text-xl">
              {item.value}
            </p>
            <p className="mt-2 text-pretty text-xs leading-relaxed text-[#F5F4F0]/52 md:text-[0.8125rem] md:leading-snug">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
