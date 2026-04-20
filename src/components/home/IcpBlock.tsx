"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface IcpItem {
  title: string;
  body: string;
}

interface IcpBlockProps {
  eyebrow: string;
  headline: string;
  body: string;
  items: IcpItem[];
  notAFit: string;
  cta?: { label: string; href: string };
}

export function IcpBlock({ eyebrow, headline, body, items, notAFit, cta }: IcpBlockProps) {
  return (
    <AnimateOnScroll variant="fade">
      <div className="panel-obsidian grain-mask rounded-4xl px-6 py-10 md:px-10 md:py-12">
        <p className="meta-label text-[#F05A28]/90">{eyebrow}</p>
        <h2 className="font-display mt-5 max-w-xl text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
          {headline}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/58">{body}</p>

        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-semibold tabular-nums tracking-wider text-[#0FD9C8]">
                  0{i + 1}
                </span>
                <span className="text-sm font-semibold text-[#F5F4F0]">{item.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#F5F4F0]/58">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 border-t border-[#F5F4F0]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta-label max-w-md leading-relaxed text-[#F5F4F0]/42">{notAFit}</p>
          {cta && (
            <a
              href={cta.href}
              className="text-sm text-[#F05A28] transition-opacity hover:opacity-75"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
