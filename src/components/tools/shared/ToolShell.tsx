import type { ReactNode } from "react";

interface ToolShellProps {
  title: string;
  eyebrow?: string;
  description: string;
  children: ReactNode;
}

export function ToolShell({ title, eyebrow, description, children }: ToolShellProps) {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        {eyebrow ? (
          <p className="text-xs font-normal uppercase tracking-widest text-[#F05A28]">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-balance max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-[#F5F4F0] md:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{description}</p>
      </div>
      {children}
    </section>
  );
}
