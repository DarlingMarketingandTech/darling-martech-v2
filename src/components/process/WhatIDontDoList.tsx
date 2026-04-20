import type { ProcessWhatNot } from "@/types";

type WhatIDontDoListProps = {
  items: ProcessWhatNot[];
};

function splitLeadingSentence(title: string, body: string): { lead: string; rest: string } {
  const combined = `${title} ${body}`.trim();
  const dot = combined.indexOf(".");
  if (dot === -1) {
    return { lead: combined, rest: "" };
  }
  return {
    lead: combined.slice(0, dot + 1).trim(),
    rest: combined.slice(dot + 1).trim(),
  };
}

export function WhatIDontDoList({ items }: WhatIDontDoListProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {items.map((item, index) => {
        const { lead, rest } = splitLeadingSentence(item.title, item.body);
        return (
          <div key={item.title} className="panel-obsidian grain-mask rounded-3xl p-6 md:p-7">
            <p className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.16em] text-[#F5F4F0]/38">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="tech-divider my-4 max-w-xs" />
            <p className="text-base leading-7">
              <span className="font-semibold text-[#F5F4F0]">{lead}</span>
              {rest ? <span className="text-[#F5F4F0]/52"> {rest}</span> : null}
            </p>
          </div>
        );
      })}
    </div>
  );
}
